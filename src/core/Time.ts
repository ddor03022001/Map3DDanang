type TickCallback = (delta: number, elapsed: number) => void;

/**
 * High-precision animation clock and game loop scheduler with FPS tracking
 */
export class Time {
  public start: number;
  public current: number;
  public elapsed: number = 0;
  public delta: number = 0.016;
  public fps: number = 60;

  private frameCount = 0;
  private lastFpsUpdate = 0;
  private animationFrameId: number | null = null;
  private listeners: TickCallback[] = [];

  constructor() {
    this.start = performance.now();
    this.current = this.start;
    this.lastFpsUpdate = this.start;

    this.tick = this.tick.bind(this);
    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  private tick(now: number): void {
    // Delta in seconds, clamped to avoid physics glitches on tab switch
    const rawDelta = (now - this.current) / 1000;
    this.delta = Math.min(Math.max(rawDelta, 0.001), 0.1);
    this.current = now;
    this.elapsed = (now - this.start) / 1000;

    // Track real FPS
    this.frameCount++;
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // Notify tick listeners
    for (const listener of this.listeners) {
      listener(this.delta, this.elapsed);
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  public subscribe(callback: TickCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.listeners = [];
  }
}
