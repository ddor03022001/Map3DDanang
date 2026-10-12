import { Sizes } from './Sizes';
import { Time } from './Time';
import { SceneManager } from './SceneManager';
import { CameraManager } from './CameraManager';
import { RendererManager } from './RendererManager';

/**
 * Core Engine orchestrator singleton for the Da Nang 3D experience
 */
export class Engine {
  public static instance: Engine | null = null;

  public canvas: HTMLCanvasElement;
  public sizes: Sizes;
  public time: Time;
  public sceneManager: SceneManager;
  public cameraManager: CameraManager;
  public rendererManager: RendererManager;

  private unsubscribeTick: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager(this.sizes, this.canvas);
    this.rendererManager = new RendererManager(this.sizes, this.canvas);

    Engine.instance = this;

    // Main render loop
    this.unsubscribeTick = this.time.subscribe(() => {
      this.update();
    });
  }

  public update(): void {
    this.cameraManager.update(this.time.delta);
    this.rendererManager.render(this.sceneManager.scene, this.cameraManager.camera);
  }

  public dispose(): void {
    if (this.unsubscribeTick) this.unsubscribeTick();
    this.cameraManager.dispose();
    this.rendererManager.dispose();
    this.sizes.dispose();
    this.time.dispose();
    Engine.instance = null;
  }
}
