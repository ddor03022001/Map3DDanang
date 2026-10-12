import type { CameraManager } from '@/core/CameraManager';

interface TopRightBarProps {
  cameraManager: CameraManager;
  onHelpClick?: () => void;
}

/**
 * Top-Right Quick Action Toolbar (matching duancuulong.com circle buttons)
 * Contains Search, Share, Compass (Reset North), Help, and Language
 */
export class TopRightBar {
  public element: HTMLElement;
  private cameraManager: CameraManager;
  private currentLang: 'VI' | 'EN' = 'VI';

  constructor(props: TopRightBarProps) {
    this.cameraManager = props.cameraManager;

    this.element = document.createElement('div');
    this.element.className = 'dcl-topbar-actions';

    this.element.innerHTML = `
      <!-- Search Button -->
      <button class="dcl-circle-btn" id="dcl-search-btn" title="Tìm kiếm địa danh">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <!-- Share Button -->
      <button class="dcl-circle-btn" id="dcl-share-btn" title="Chia sẻ bản đồ">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      </button>

      <!-- Compass / Reset North -->
      <button class="dcl-circle-btn" id="dcl-compass-btn" title="Quay về hướng Bắc">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
        </svg>
      </button>

      <!-- Help Button -->
      <button class="dcl-circle-btn" id="dcl-help-btn" title="Hướng dẫn điều khiển">
        <span style="font-weight: 700; font-size: 15px;">?</span>
      </button>

      <!-- Language Toggle -->
      <button class="dcl-circle-btn dcl-lang-btn" id="dcl-lang-btn" title="Chuyển ngôn ngữ">
        <span>EN</span>
      </button>
    `;

    this.bindEvents(props);
  }

  private bindEvents(props: TopRightBarProps): void {
    // Reset North / Compass
    const compassBtn = this.element.querySelector('#dcl-compass-btn');
    compassBtn?.addEventListener('click', () => {
      const curTarget = this.cameraManager.controls.target;
      const curDist = this.cameraManager.camera.position.distanceTo(curTarget);
      this.cameraManager.flyTo(
        [curTarget.x, Math.max(30, curDist * 0.45), curTarget.z + curDist * 0.75],
        [curTarget.x, curTarget.y, curTarget.z]
      );
    });

    // Share Button
    const shareBtn = this.element.querySelector('#dcl-share-btn');
    shareBtn?.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép liên kết bản đồ 3D vào bộ nhớ tạm!');
      }
    });

    // Help Button
    const helpBtn = this.element.querySelector('#dcl-help-btn');
    helpBtn?.addEventListener('click', () => {
      props.onHelpClick?.();
    });

    // Language Toggle
    const langBtn = this.element.querySelector<HTMLButtonElement>('#dcl-lang-btn');
    langBtn?.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'VI' ? 'EN' : 'VI';
      langBtn.querySelector('span')!.textContent = this.currentLang === 'VI' ? 'EN' : 'VI';
    });
  }
}
