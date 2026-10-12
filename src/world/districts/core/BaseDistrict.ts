import * as THREE from 'three';
import type { BaseWard } from './BaseWard';

export interface DistrictBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface DistrictMetadata {
  id: string;
  name: string;
  nameEn: string;
  type: 'urban_district' | 'rural_district' | 'island_district';
  areaKm2: number;
  centerCoordinates: {
    lat: number;
    lng: number;
  };
  cameraPreset: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

/**
 * Abstract Base Class for any District (Quận / Huyện)
 * Aggregates and manages a collection of individual Wards / Communes (Phường / Xã)
 */
export abstract class BaseDistrict {
  public metadata: DistrictMetadata;
  public bounds: DistrictBounds;
  public group = new THREE.Group();
  public wards: Map<string, BaseWard> = new Map();
  public isLoaded = false;
  public isVisible = true;

  constructor(metadata: DistrictMetadata, bounds: DistrictBounds) {
    this.metadata = metadata;
    this.bounds = bounds;
    this.group.name = `district-${metadata.id}`;
  }

  /**
   * Registers a Ward (Phường) or Commune (Xã) under this District
   */
  public registerWard(ward: BaseWard): void {
    ward.initialize();
    this.wards.set(ward.metadata.id, ward);
    this.group.add(ward.group);
  }

  public getWard(id: string): BaseWard | undefined {
    return this.wards.get(id);
  }

  public getAllWards(): BaseWard[] {
    return Array.from(this.wards.values());
  }

  /**
   * Initializes district-level infrastructure and child wards
   */
  public abstract initialize(): void;

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    this.wards.forEach((ward) => {
      if (ward.isVisible) {
        ward.update(delta, elapsed, nightGlowIntensity);
      }
    });
  }

  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.group.visible = visible;
  }

  public dispose(): void {
    this.wards.forEach((w) => w.dispose());
    this.wards.clear();

    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else if (child.material) {
          child.material.dispose();
        }
      }
    });
    this.isLoaded = false;
  }
}
