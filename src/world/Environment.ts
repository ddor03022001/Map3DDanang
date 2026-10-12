import * as THREE from 'three';
import { ENVIRONMENT_PRESETS, type TimeOfDay } from '@/config/constants';
import type { Engine } from '@/core/Engine';
import { ColorUtils } from '@/utils/ColorUtils';

/**
 * Manages atmospheric lighting, sun position, shadows, and smooth day/sunset/night cycles
 */
export class Environment {
  public group = new THREE.Group();

  public sunLight: THREE.DirectionalLight;
  public hemiLight: THREE.HemisphereLight;
  public moonLight: THREE.DirectionalLight;

  private engine: Engine;
  private currentTimeOfDay: TimeOfDay = 'day';
  private targetTimeOfDay: TimeOfDay = 'day';
  private transitionProgress = 1.0;

  constructor(engine: Engine) {
    this.engine = engine;

    const initial = ENVIRONMENT_PRESETS.day;

    // Hemisphere ambient light (sky/ground color bleed)
    this.hemiLight = new THREE.HemisphereLight(
      initial.skyColor,
      initial.groundColor,
      initial.ambientIntensity
    );
    this.group.add(this.hemiLight);

    // Primary Sun Light with optimized soft city shadow bounds
    this.sunLight = new THREE.DirectionalLight(initial.sunColor, initial.sunIntensity);
    this.sunLight.position.set(...initial.sunPosition);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 800;

    // Shadow frustum covering the central core of Da Nang
    const shadowDist = 220;
    this.sunLight.shadow.camera.left = -shadowDist;
    this.sunLight.shadow.camera.right = shadowDist;
    this.sunLight.shadow.camera.top = shadowDist;
    this.sunLight.shadow.camera.bottom = -shadowDist;
    this.sunLight.shadow.bias = -0.0005;
    this.group.add(this.sunLight);

    // Secondary cool moonlight for night ambiance
    this.moonLight = new THREE.DirectionalLight(0x5577bb, 0.0);
    this.moonLight.position.set(-100, 150, -80);
    this.group.add(this.moonLight);
  }

  /**
   * Sets the target time of day with smooth interpolation
   */
  public setTimeOfDay(time: TimeOfDay): void {
    if (this.targetTimeOfDay === time) return;
    this.currentTimeOfDay = this.targetTimeOfDay;
    this.targetTimeOfDay = time;
    this.transitionProgress = 0.0;
  }

  public update(delta: number): void {
    if (this.transitionProgress < 1.0) {
      this.transitionProgress = Math.min(this.transitionProgress + delta * 0.8, 1.0);
      this.applyTransition(this.currentTimeOfDay, this.targetTimeOfDay, this.transitionProgress);
    }
  }

  private applyTransition(from: TimeOfDay, to: TimeOfDay, t: number): void {
    const pFrom = ENVIRONMENT_PRESETS[from];
    const pTo = ENVIRONMENT_PRESETS[to];

    // Lerp Sun position
    this.sunLight.position.x = THREE.MathUtils.lerp(pFrom.sunPosition[0], pTo.sunPosition[0], t);
    this.sunLight.position.y = THREE.MathUtils.lerp(pFrom.sunPosition[1], pTo.sunPosition[1], t);
    this.sunLight.position.z = THREE.MathUtils.lerp(pFrom.sunPosition[2], pTo.sunPosition[2], t);

    // Lerp Sun intensity & color
    this.sunLight.intensity = THREE.MathUtils.lerp(pFrom.sunIntensity, pTo.sunIntensity, t);
    ColorUtils.lerpColor(this.sunLight.color, pFrom.sunColor, pTo.sunColor, t);

    // Lerp Ambient / Hemisphere
    this.hemiLight.intensity = THREE.MathUtils.lerp(pFrom.ambientIntensity, pTo.ambientIntensity, t);
    ColorUtils.lerpColor(this.hemiLight.color, pFrom.skyColor, pTo.skyColor, t);
    ColorUtils.lerpColor(this.hemiLight.groundColor, pFrom.groundColor, pTo.groundColor, t);

    // Lerp Moonlight
    this.moonLight.intensity = THREE.MathUtils.lerp(
      from === 'night' ? 0.35 : 0.0,
      to === 'night' ? 0.35 : 0.0,
      t
    );

    // Update Atmosphere & Fog
    const currentSky = ColorUtils.lerpHex(pFrom.skyColor, pTo.skyColor, t);
    const currentFog = ColorUtils.lerpHex(pFrom.fogColor, pTo.fogColor, t);
    const currentDensity = THREE.MathUtils.lerp(pFrom.fogDensity, pTo.fogDensity, t);
    this.engine.sceneManager.setAtmosphere(currentSky, currentFog, currentDensity);
  }

  public getNightGlowIntensity(): number {
    const current = ENVIRONMENT_PRESETS[this.targetTimeOfDay].nightLightsIntensity;
    return current;
  }
}
