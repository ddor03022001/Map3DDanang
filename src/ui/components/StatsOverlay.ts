/**
 * Real-time HUD displaying render frame rates, active geometry count, and camera altitude
 */
export class StatsOverlay {
  public element: HTMLElement;
  private fpsDisplay: HTMLElement | null = null;
  private altitudeDisplay: HTMLElement | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'dn-stats-hud';

    this.element.innerHTML = `
      <div class="dn-hud-row">
        <span class="dn-hud-dot"></span>
        <span class="dn-hud-label">FPS:</span>
        <span class="dn-hud-val" id="dn-fps-val">60</span>
      </div>
      <div class="dn-hud-row">
        <span class="dn-hud-label">Độ cao Camera:</span>
        <span class="dn-hud-val" id="dn-alt-val">850m</span>
      </div>
      <div class="dn-hud-row">
        <span class="dn-hud-label">Hệ thống:</span>
        <span class="dn-hud-val">WebGL2 / PBR</span>
      </div>
    `;

    this.fpsDisplay = this.element.querySelector('#dn-fps-val');
    this.altitudeDisplay = this.element.querySelector('#dn-alt-val');
  }

  public update(fps: number, cameraY: number): void {
    if (this.fpsDisplay) {
      this.fpsDisplay.textContent = `${fps}`;
      if (fps < 30) {
        this.fpsDisplay.style.color = '#ff5555';
      } else if (fps < 50) {
        this.fpsDisplay.style.color = '#ffbb33';
      } else {
        this.fpsDisplay.style.color = '#00e676';
      }
    }

    if (this.altitudeDisplay) {
      const meters = Math.round(cameraY * 10);
      this.altitudeDisplay.textContent = `${meters}m`;
    }
  }
}
