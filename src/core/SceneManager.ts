import * as THREE from 'three';
import { ENVIRONMENT_PRESETS } from '@/config/constants';

/**
 * Manages the Three.js root scene, background atmospheric coloring, and exponential fog
 */
export class SceneManager {
  public scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    const defaultEnv = ENVIRONMENT_PRESETS.day;

    this.scene.background = new THREE.Color(defaultEnv.skyColor);
    this.scene.fog = new THREE.FogExp2(defaultEnv.fogColor, defaultEnv.fogDensity);
  }

  public setAtmosphere(skyHex: number, fogHex: number, fogDensity: number): void {
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.setHex(skyHex);
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(fogHex);
      this.scene.fog.density = fogDensity;
    }
  }

  public add(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  public remove(object: THREE.Object3D): void {
    this.scene.remove(object);
  }
}
