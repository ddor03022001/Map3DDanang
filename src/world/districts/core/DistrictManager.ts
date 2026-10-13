import * as THREE from 'three';
import { BaseDistrict } from './BaseDistrict';
import { HaiChauDistrict } from '../hai-chau/HaiChauDistrict';
import { SonTraDistrict } from '../son-tra/SonTraDistrict';
import { NguHanhSonDistrict } from '../ngu-hanh-son/NguHanhSonDistrict';
import { HoaVangDistrict } from '../hoa-vang/HoaVangDistrict';
import { NuiThanhDistrict } from '../nui-thanh/NuiThanhDistrict';

/**
 * Enterprise District Manager coordinating provincial districts and child wards/communes
 */
export class DistrictManager {
  public group = new THREE.Group();
  private districts: Map<string, BaseDistrict> = new Map();

  constructor() {
    this.registerDistrict(new HaiChauDistrict());
    this.registerDistrict(new SonTraDistrict());
    this.registerDistrict(new NguHanhSonDistrict());
    this.registerDistrict(new HoaVangDistrict());
    this.registerDistrict(new NuiThanhDistrict());
  }

  public registerDistrict(district: BaseDistrict): void {
    district.initialize();
    this.districts.set(district.metadata.id, district);
    this.group.add(district.group);
  }

  public getDistrict(id: string): BaseDistrict | undefined {
    return this.districts.get(id);
  }

  public get nuiThanhDistrict(): NuiThanhDistrict {
    return this.districts.get('nui-thanh') as NuiThanhDistrict;
  }

  public getAllDistricts(): BaseDistrict[] {
    return Array.from(this.districts.values());
  }

  public toggleDistrict(id: string, visible: boolean): void {
    const district = this.districts.get(id);
    if (district) {
      district.setVisible(visible);
    }
  }

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    this.districts.forEach((d) => {
      if (d.isVisible) {
        d.update(delta, elapsed, nightGlowIntensity);
      }
    });
  }

  public dispose(): void {
    this.districts.forEach((d) => d.dispose());
    this.districts.clear();
  }
}
