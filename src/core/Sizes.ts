import { RENDERER_CONFIG } from '@/config/constants';

type ResizeCallback = (width: number, height: number, pixelRatio: number) => void;

/**
 * Handles window dimensions, pixel ratio capping, and resize subscriptions
 */
export class Sizes {
  public width: number = 0;
  public height: number = 0;
  public pixelRatio: number = 1;
  public aspect: number = 1;

  private listeners: ResizeCallback[] = [];

  constructor() {
    this.update();
    window.addEventListener('resize', this.onResize);
  }

  private update(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / Math.max(this.height, 1);
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, RENDERER_CONFIG.PIXEL_RATIO_CAP);
  }

  private onResize = (): void => {
    this.update();
    for (const listener of this.listeners) {
      listener(this.width, this.height, this.pixelRatio);
    }
  };

  public subscribe(callback: ResizeCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.listeners = [];
  }
}
