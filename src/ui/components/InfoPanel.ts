import type { LandmarkPOI } from '@/config/coordinates';

/**
 * Slide-out glassmorphic panel presenting detailed architectural & historical information of selected landmark
 */
export class InfoPanel {
  public element: HTMLElement;
  private isVisible = false;

  constructor() {
    this.element = document.createElement('aside');
    this.element.className = 'dn-info-panel hidden';
  }

  public show(landmark: LandmarkPOI): void {
    this.isVisible = true;
    this.element.classList.remove('hidden');

    this.element.innerHTML = `
      <div class="dn-info-header">
        <div class="dn-info-badge">${landmark.category.toUpperCase()}</div>
        <button class="dn-info-close" id="dn-info-close" title="Đóng thông tin">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <h2 class="dn-info-title">${landmark.name}</h2>
      <div class="dn-info-subtitle">${landmark.nameEn}</div>

      <div class="dn-info-stats">
        ${
          landmark.yearBuilt
            ? `
          <div class="dn-stat-item">
            <span class="dn-stat-label">Năm khánh thành</span>
            <span class="dn-stat-value">${landmark.yearBuilt}</span>
          </div>
        `
            : ''
        }
        <div class="dn-stat-item">
          <span class="dn-stat-label">Tọa độ GPS</span>
          <span class="dn-stat-value">${landmark.lat.toFixed(4)}°N, ${landmark.lng.toFixed(4)}°E</span>
        </div>
      </div>

      <div class="dn-info-body">
        <p class="dn-info-desc">${landmark.description}</p>
        <p class="dn-info-desc-en">${landmark.descriptionEn}</p>
      </div>

      <div class="dn-info-footer">
        <div class="dn-tips">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Phím <b>W, A, S, D</b> (hoặc phím mũi tên) để bay tự do. Chuột phải để kéo vị trí. Hoặc bấm cụm điều hướng D-Pad ở góc phải.</span>
        </div>
      </div>
    `;

    const closeBtn = this.element.querySelector('#dn-info-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hide();
      });
    }
  }

  public hide(): void {
    this.isVisible = false;
    this.element.classList.add('hidden');
  }
}
