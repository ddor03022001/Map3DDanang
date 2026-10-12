/**
 * Visual & Application Constants
 */

export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface EnvironmentPreset {
  name: string;
  skyColor: number;
  groundColor: number;
  sunPosition: [number, number, number];
  sunIntensity: number;
  sunColor: number;
  ambientIntensity: number;
  ambientColor: number;
  fogColor: number;
  fogDensity: number;
  waterColor: number;
  waterRoughness: number;
  nightLightsIntensity: number;
  dragonLedGlow: number;
}

export const ENVIRONMENT_PRESETS: Record<TimeOfDay, EnvironmentPreset> = {
  day: {
    name: 'Daylight',
    skyColor: 0x87ceeb,
    groundColor: 0x243224,
    sunPosition: [120, 250, 100],
    sunIntensity: 2.2,
    sunColor: 0xffffff,
    ambientIntensity: 0.65,
    ambientColor: 0xddeeff,
    fogColor: 0xb5d6ee,
    fogDensity: 0.0008,
    waterColor: 0x0a5b82,
    waterRoughness: 0.15,
    nightLightsIntensity: 0.0,
    dragonLedGlow: 0.1,
  },
  sunset: {
    name: 'Sunset (Golden Hour)',
    skyColor: 0xf37055,
    groundColor: 0x1f1a18,
    sunPosition: [-250, 60, -100],
    sunIntensity: 2.8,
    sunColor: 0xff8c42,
    ambientIntensity: 0.45,
    ambientColor: 0xb55a30,
    fogColor: 0xda6f4e,
    fogDensity: 0.0011,
    waterColor: 0x1d3d54,
    waterRoughness: 0.2,
    nightLightsIntensity: 0.4,
    dragonLedGlow: 0.7,
  },
  night: {
    name: 'Da Nang By Night',
    skyColor: 0x050814,
    groundColor: 0x080a0e,
    sunPosition: [-50, -100, -50],
    sunIntensity: 0.05,
    sunColor: 0x4466aa,
    ambientIntensity: 0.22,
    ambientColor: 0x1a263f,
    fogColor: 0x090f1e,
    fogDensity: 0.0014,
    waterColor: 0x04111d,
    waterRoughness: 0.1,
    nightLightsIntensity: 1.0,
    dragonLedGlow: 1.8,
  },
};

export const CAMERA_CONFIG = {
  FOV: 45,
  NEAR: 0.5,
  FAR: 3000,
  DEFAULT_POSITION: [48, 32, 58] as [number, number, number],
  DEFAULT_TARGET: [0, 4, 0] as [number, number, number],
  MIN_DISTANCE: 10,
  MAX_DISTANCE: 1800,
  MAX_POLAR_ANGLE: Math.PI / 2 - 0.04, // Avoid clipping below ground
};

export const RENDERER_CONFIG = {
  ANTIALIAS: true,
  POWER_PREFERENCE: 'high-performance' as const,
  SHADOWS_ENABLED: true,
  PIXEL_RATIO_CAP: 2,
};
