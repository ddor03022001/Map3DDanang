import * as THREE from 'three';
import { RENDERER_CONFIG } from '@/config/constants';
import type { Sizes } from './Sizes';

/**
 * Manages WebGLRenderer configuration, shadows, and high-fidelity tone mapping
 */
export class RendererManager {
  public renderer: THREE.WebGLRenderer;

  constructor(sizes: Sizes, canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: RENDERER_CONFIG.ANTIALIAS,
      powerPreference: RENDERER_CONFIG.POWER_PREFERENCE,
      alpha: false,
    });

    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(sizes.pixelRatio);

    // Color management & high dynamic range tone mapping
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Soft shadow configuration
    if (RENDERER_CONFIG.SHADOWS_ENABLED) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
    }

    // Subscribe to resize
    sizes.subscribe((width, height, pixelRatio) => {
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(pixelRatio);
    });
  }

  public render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
  }

  public setExposure(exposure: number): void {
    this.renderer.toneMappingExposure = exposure;
  }

  public dispose(): void {
    this.renderer.dispose();
  }
}
