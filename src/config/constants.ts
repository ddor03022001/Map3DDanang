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
    name: 'Daylight (Parchment Atlas)',
    skyColor: 0xefe6d2, // DuAnCuuLong signature antique parchment paper
    groundColor: 0xd9cca9,
    sunPosition: [160, 280, 160],
    sunIntensity: 2.3,
    sunColor: 0xfff7ea, // Warm golden sunlight
    ambientIntensity: 0.9,
    ambientColor: 0xf5ede0,
    fogColor: 0xefe6d2, // Warm parchment horizon fog
    fogDensity: 0.00028, // Soft seamless falloff
    waterColor: 0x1a6b94,
    waterRoughness: 0.18,
    nightLightsIntensity: 0.0,
    dragonLedGlow: 0.1,
  },
  sunset: {
    name: 'Sunset (Golden Atlas)',
    skyColor: 0xe8cfb0,
    groundColor: 0xc2a885,
    sunPosition: [-250, 80, -100],
    sunIntensity: 2.6,
    sunColor: 0xff8f43,
    ambientIntensity: 0.7,
    ambientColor: 0xdcb896,
    fogColor: 0xe8cfb0,
    fogDensity: 0.00038,
    waterColor: 0x1d3d54,
    waterRoughness: 0.2,
    nightLightsIntensity: 0.4,
    dragonLedGlow: 0.7,
  },
  night: {
    name: 'Night (Dark Atlas)',
    skyColor: 0x0f1412, // DuAnCuuLong dark mode --bg: #0f1412
    groundColor: 0x141b19,
    sunPosition: [-50, -100, -50],
    sunIntensity: 0.05,
    sunColor: 0x4466aa,
    ambientIntensity: 0.35,
    ambientColor: 0x1a263f,
    fogColor: 0x0f1412,
    fogDensity: 0.0006,
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
  DEFAULT_POSITION: [200, 320, 1080] as [number, number, number],
  DEFAULT_TARGET: [200, 0, 750] as [number, number, number],
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
