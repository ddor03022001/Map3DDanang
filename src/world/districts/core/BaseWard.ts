import * as THREE from 'three';
import type { DistrictBounds } from './BaseDistrict';

export interface WardSubLandmark {
  id: string;
  name: string;
  category?: string;
  cameraPreset: {
    position: [number, number, number];
    target: [number, number, number];
  };
  description?: string;
}

export interface WardMetadata {
  id: string;
  name: string;
  nameEn: string;
  type: 'ward' | 'commune' | 'town'; // Phường | Xã | Thị trấn
  areaKm2?: number;
  description?: string;
  cameraPreset?: {
    position: [number, number, number];
    target: [number, number, number];
  };
  subLandmarks?: WardSubLandmark[];
}

/**
 * Abstract Base Class for any Ward (Phường) or Commune (Xã)
 * Enables ultra-granular modularization down to neighbourhood, street block, and village levels.
 */
export abstract class BaseWard {
  public metadata: WardMetadata;
  public bounds: DistrictBounds;
  public group = new THREE.Group();
  public isLoaded = false;
  public isVisible = true;

  constructor(metadata: WardMetadata, bounds: DistrictBounds) {
    this.metadata = metadata;
    this.bounds = bounds;
    this.group.name = `ward-${metadata.id}`;
  }

  public abstract initialize(): void;
  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {
    // Default implementation: overridden by wards with animated components
  }

  public getCameraPreset(): {
    position: [number, number, number];
    target: [number, number, number];
  } {
    if (this.metadata.cameraPreset) {
      return this.metadata.cameraPreset;
    }
    const cx = (this.bounds.minX + this.bounds.maxX) / 2;
    const cz = (this.bounds.minZ + this.bounds.maxZ) / 2;
    const span = Math.max(this.bounds.maxX - this.bounds.minX, this.bounds.maxZ - this.bounds.minZ);
    const height = Math.max(40, span * 0.45);
    return {
      position: [cx, height, cz + height * 0.65],
      target: [cx, 2, cz],
    };
  }

  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.group.visible = visible;
  }

  public dispose(): void {
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
