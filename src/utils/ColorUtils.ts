import * as THREE from 'three';

/**
 * Color interpolation & shading utilities for smooth environmental transitions
 */
export class ColorUtils {
  private static tempColorA = new THREE.Color();
  private static tempColorB = new THREE.Color();

  /**
   * Linearly interpolates between two hex colors by t (0.0 to 1.0)
   */
  public static lerpHex(hexA: number, hexB: number, t: number): number {
    this.tempColorA.setHex(hexA);
    this.tempColorB.setHex(hexB);
    this.tempColorA.lerp(this.tempColorB, Math.min(Math.max(t, 0), 1));
    return this.tempColorA.getHex();
  }

  /**
   * Applies lerp directly to an existing THREE.Color instance
   */
  public static lerpColor(target: THREE.Color, hexFrom: number, hexTo: number, t: number): void {
    this.tempColorA.setHex(hexFrom);
    this.tempColorB.setHex(hexTo);
    target.copy(this.tempColorA).lerp(this.tempColorB, Math.min(Math.max(t, 0), 1));
  }
}
