import type { LandmarkPOI } from '@/config/coordinates';

export interface InfoDisplayData {
  badge: string;
  title: string;
  subtitle: string;
  stats?: Array<{ label: string; value: string | number }>;
  description: string;
  descriptionEn?: string;
}

/**
 * Slide-out glassmorphic panel presenting detailed architectural, district & commune information
 */
export class InfoPanel {
  public element: HTMLElement;
  private isVisible = false;

  constructor() {
    this.element = document.createElement('aside');
    this.element.className = 'dn-info-panel hidden';
  }

  public show(data: LandmarkPOI | InfoDisplayData): void {
    this.isVisible = true;
    this.element.classList.remove('hidden');

    let badge = 'ĐỊA ĐIỂM';
    let title = '';
    let subtitle = '';
    let stats: Array<{ label: string; value: string | number }> = [];
    let description = '';
    let descriptionEn = '';

    if ('category' in data) {
      // LandmarkPOI
      badge = data.category.toUpperCase();
      title = data.name;
      subtitle = data.nameEn;
      if (data.yearBuilt) {
        stats.push({ label: 'Năm khánh thành', value: data.yearBuilt });
      }
      stats.push({
        label: 'Tọa độ GPS',
        value: `${data.lat.toFixed(4)}°N, ${data.lng.toFixed(4)}°E`,
      });
      description = data.description;
      descriptionEn = data.descriptionEn;
    } else {
      // Generic InfoDisplayData
      badge = data.badge;
      title = data.title;
      subtitle = data.subtitle;
      stats = data.stats || [];
      description = data.description;
      descriptionEn = data.descriptionEn || '';
    }

    const statsHtml = stats
      .map(
        (s) => `
        <div class="dn-stat-item">
          <span class="dn-stat-label">${s.label}</span>
          <span class="dn-stat-value">${s.value}</span>
        </div>
      `
      )
      .join('');

    this.element.innerHTML = `
      <div class="dn-info-header">
        <div class="dn-info-badge">${badge}</div>
        <button class="dn-info-close" id="dn-info-close" title="Đóng thông tin">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <h2 class="dn-info-title">${title}</h2>
      <div class="dn-info-subtitle">${subtitle}</div>

      <div class="dn-info-stats">
        ${statsHtml}
      </div>

      <div class="dn-info-body">
        <p class="dn-info-desc">${description}</p>
        ${descriptionEn ? `<p class="dn-info-desc-en">${descriptionEn}</p>` : ''}
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
