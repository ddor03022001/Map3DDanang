import * as THREE from 'three';
import { DragonBridge } from './DragonBridge';
import { HanRiverBridge } from './HanRiverBridge';
import { ThuanPhuocBridge } from './ThuanPhuocBridge';
import { AdminCenter } from './AdminCenter';

/**
 * Manages landmark lifecycles, real-time animation loops, and special visual effects
 */
export class LandmarkManager {
  public group = new THREE.Group();

  public dragonBridge: DragonBridge;
  public hanRiverBridge: HanRiverBridge;
  public thuanPhuocBridge: ThuanPhuocBridge;
  public adminCenter: AdminCenter;

  constructor() {
    this.dragonBridge = new DragonBridge();
    this.hanRiverBridge = new HanRiverBridge();
    this.thuanPhuocBridge = new ThuanPhuocBridge();
    this.adminCenter = new AdminCenter();

    this.group.add(this.dragonBridge.group);
    this.group.add(this.hanRiverBridge.group);
    this.group.add(this.thuanPhuocBridge.group);
    this.group.add(this.adminCenter.group);
  }

  public triggerDragonFire(enable: boolean): void {
    this.dragonBridge.triggerFire(enable);
  }

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    this.dragonBridge.update(delta, elapsed, nightGlowIntensity);
  }
}
