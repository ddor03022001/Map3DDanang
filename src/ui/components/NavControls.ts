import type { CameraManager } from '@/core/CameraManager';
import { LANDMARKS } from '@/config/coordinates';

/**
 * On-screen Navigation Compass & D-Pad Widget
 * Enables full touch/mouse camera movement, panning, zooming, and 2D top-down view
 */
export class NavControls {
  public element: HTMLElement;
  private cameraManager: CameraManager;

  constructor(cameraManager: CameraManager) {
    this.cameraManager = cameraManager;

    this.element = document.createElement('div');
    this.element.className = 'dn-nav-dpad';

    this.element.innerHTML = `
      <div class="dn-dpad-circle">
        <button class="dn-dpad-btn dn-dpad-up" data-dir="forward" title="Tiến tới (W / Mũi tên lên)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button class="dn-dpad-btn dn-dpad-left" data-dir="left" title="Dịch sang trái (A / Mũi tên trái)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="dn-dpad-center" id="dn-nav-home" title="Trở về trung tâm Cầu Rồng">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        <button class="dn-dpad-btn dn-dpad-right" data-dir="right" title="Dịch sang phải (D / Mũi tên phải)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <button class="dn-dpad-btn dn-dpad-down" data-dir="backward" title="Lùi lại (S / Mũi tên xuống)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div class="dn-zoom-bar">
        <button class="dn-zoom-btn" id="dn-zoom-in" title="Phóng to gần hơn (+)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button class="dn-zoom-btn" id="dn-zoom-out" title="Thu nhỏ ra xa (-)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button class="dn-zoom-btn" id="dn-topdown" title="Xem thẳng từ trên cao xuống 2D">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
          </svg>
        </button>
      </div>
    `;

    // Directional buttons
    const dirButtons = this.element.querySelectorAll<HTMLButtonElement>('.dn-dpad-btn');
    dirButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.dir as 'forward' | 'backward' | 'left' | 'right';
        this.cameraManager.moveDirection(dir);
      });
    });

    // Zoom buttons
    this.element.querySelector('#dn-zoom-in')?.addEventListener('click', () => {
      this.cameraManager.moveDirection('in');
    });

    this.element.querySelector('#dn-zoom-out')?.addEventListener('click', () => {
      this.cameraManager.moveDirection('out');
    });

    // Top-down view button
    this.element.querySelector('#dn-topdown')?.addEventListener('click', () => {
      this.cameraManager.switchTopDownView();
    });

    // Home button
    this.element.querySelector('#dn-nav-home')?.addEventListener('click', () => {
      const dragonBridge = LANDMARKS.DRAGON_BRIDGE;
      this.cameraManager.flyTo(
        dragonBridge.cameraPreset.position,
        dragonBridge.cameraPreset.target
      );
    });
  }
}
