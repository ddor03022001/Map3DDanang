import * as THREE from 'three';
import { ReliefTerrain } from './terrain/ReliefTerrain';

/**
 * Topographical terrain mesh featuring true 3D DEM relief (Son Tra, Marble Mountains, Ba Na, and Nui Thanh)
 * Underlaid with antique parchment map and glowing territorial boundary
 */
export class Terrain {
  public group = new THREE.Group();
  public relief: ReliefTerrain;

  constructor() {
    this.relief = new ReliefTerrain();
    this.group.add(this.relief.group);
  }
}
