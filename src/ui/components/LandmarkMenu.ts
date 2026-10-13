import type { DistrictManager } from '@/world/districts';
import type { CameraManager } from '@/core/CameraManager';
import type { BaseDistrict } from '@/world/districts/core/BaseDistrict';
import type { BaseWard, WardSubLandmark } from '@/world/districts/core/BaseWard';
import type { InfoDisplayData } from './InfoPanel';

interface LandmarkMenuProps {
  districtManager: DistrictManager;
  cameraManager: CameraManager;
  onSelectInfo: (info: InfoDisplayData) => void;
}

const DISTRICT_ICONS: Record<string, string> = {
  'nui-thanh': '🏭',
  'hai-chau': '🏢',
  'son-tra': '🌊',
  'ngu-hanh-son': '⛰️',
  'hoa-vang': '🚡',
};

/**
 * Hierarchical District & Ward Navigation Menu
 * Enables clean 2-level administrative drill-down:
 * Level 1: Chọn Quận / Huyện (District Selection)
 * Level 2: Chọn cụ thể Xã / Phường (Commune / Ward Selection)
 * Level 3: Xem các điểm nổi bật cụ thể của Xã / Phường đang chọn
 */
export class LandmarkMenu {
  public element: HTMLElement;
  private districtManager: DistrictManager;
  private cameraManager: CameraManager;
  private onSelectInfo: (info: InfoDisplayData) => void;

  private activeDistrictId = 'nui-thanh';
  private activeWardId = 'tam-hiep-commune';
  private activeSubLandmarkId: string | null = 'tam-hiep-overview';

  constructor(props: LandmarkMenuProps) {
    this.districtManager = props.districtManager;
    this.cameraManager = props.cameraManager;
    this.onSelectInfo = props.onSelectInfo;

    this.element = document.createElement('nav');
    this.element.className = 'dn-landmark-menu dn-hierarchical-menu';

    this.render();
  }

  public render(): void {
    const districts = this.districtManager.getAllDistricts();
    const activeDistrict =
      this.districtManager.getDistrict(this.activeDistrictId) || districts[0];

    const activeWard = activeDistrict ? activeDistrict.getWard(this.activeWardId) : undefined;

    // 1. District Switcher Tabs
    const districtTabsHtml = districts
      .map((d) => {
        const icon = DISTRICT_ICONS[d.metadata.id] || '📍';
        const wardCount = d.getAllWards().length;
        const isActive = d.metadata.id === this.activeDistrictId;
        return `
          <button class="dn-district-tab ${isActive ? 'active' : ''}" data-district-id="${d.metadata.id}">
            <span class="dn-tab-icon">${icon}</span>
            <span class="dn-tab-name">${d.metadata.name}</span>
            <span class="dn-tab-badge">${wardCount}</span>
          </button>
        `;
      })
      .join('');

    // 2. Commune / Ward Cards for Active District
    const wards = activeDistrict ? activeDistrict.getAllWards() : [];
    const wardCardsHtml = wards
      .map((w) => {
        const isActive = w.metadata.id === this.activeWardId;
        const typeLabel =
          w.metadata.id === 'tam-hiep-commune'
            ? '3D CHI TIẾT'
            : w.metadata.type === 'ward'
            ? 'PHƯỜNG'
            : w.metadata.type === 'town'
            ? 'THỊ TRẤN'
            : 'XÃ';

        const areaStr = w.metadata.areaKm2 ? `${w.metadata.areaKm2} km²` : '';

        return `
          <button class="dn-ward-card ${isActive ? 'active' : ''}" data-ward-id="${w.metadata.id}">
            <div class="dn-ward-card-header">
              <span class="dn-ward-tag ${w.metadata.id === 'tam-hiep-commune' ? 'special' : ''}">${typeLabel}</span>
              ${areaStr ? `<span class="dn-ward-area">${areaStr}</span>` : ''}
            </div>
            <div class="dn-ward-name">${w.metadata.name}</div>
            <div class="dn-ward-en">${w.metadata.nameEn}</div>
          </button>
        `;
      })
      .join('');

    // 3. Sub-landmarks of Active Ward (if available)
    const subLandmarks = activeWard?.metadata.subLandmarks || [];
    const subLandmarksHtml =
      subLandmarks.length > 0
        ? `
        <div class="dn-sublandmark-bar">
          <span class="dn-sub-label">ĐIỂM NGẮM ${activeWard?.metadata.name.toUpperCase()}:</span>
          <div class="dn-sub-scroll">
            ${subLandmarks
              .map(
                (sub) => `
                <button class="dn-sub-chip ${sub.id === this.activeSubLandmarkId ? 'active' : ''}" data-sub-id="${sub.id}">
                  <span>${sub.name}</span>
                </button>
              `
              )
              .join('')}
          </div>
        </div>
      `
        : '';

    // Full Assembly
    this.element.innerHTML = `
      <div class="dn-menu-topbar">
        <div class="dn-menu-title-wrap">
          <span class="dn-menu-pulse"></span>
          <span class="dn-menu-title">ĐIỀU HƯỚNG QUẬN HUYỆN & XÃ PHƯỜNG</span>
          <div class="dn-menu-breadcrumb">
            <span class="dn-bc-dist">${activeDistrict?.metadata.name || ''}</span>
            <span class="dn-bc-sep">▸</span>
            <span class="dn-bc-ward">${activeWard?.metadata.name || 'Chọn xã/phường'}</span>
          </div>
        </div>

        <button class="dn-district-overview-btn" id="dn-district-overview-btn" title="Bay toàn cảnh ${activeDistrict?.metadata.name}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>Toàn Cảnh Huyện</span>
        </button>
      </div>

      <!-- Level 1: District Selector Tabs -->
      <div class="dn-district-tabs-scroll">
        ${districtTabsHtml}
      </div>

      <!-- Level 2: Commune / Ward Cards -->
      <div class="dn-ward-scroll">
        ${wardCardsHtml}
      </div>

      <!-- Level 3: Specific Sub-landmarks of the selected commune -->
      ${subLandmarksHtml}
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // 1. District Tabs Click
    const districtTabs = this.element.querySelectorAll<HTMLButtonElement>('.dn-district-tab');
    districtTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const distId = tab.dataset.districtId;
        if (distId && distId !== this.activeDistrictId) {
          this.selectDistrict(distId);
        }
      });
    });

    // 2. Ward Cards Click
    const wardCards = this.element.querySelectorAll<HTMLButtonElement>('.dn-ward-card');
    wardCards.forEach((card) => {
      card.addEventListener('click', () => {
        const wardId = card.dataset.wardId;
        if (wardId) {
          this.selectWard(wardId);
        }
      });
    });

    // 3. Sub-landmark Chips Click
    const subChips = this.element.querySelectorAll<HTMLButtonElement>('.dn-sub-chip');
    subChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const subId = chip.dataset.subId;
        if (subId) {
          this.selectSubLandmark(subId);
        }
      });
    });

    // 4. District Overview Button
    const overviewBtn = this.element.querySelector('#dn-district-overview-btn');
    if (overviewBtn) {
      overviewBtn.addEventListener('click', () => {
        const district = this.districtManager.getDistrict(this.activeDistrictId);
        if (district) {
          this.cameraManager.flyTo(
            district.metadata.cameraPreset.position,
            district.metadata.cameraPreset.target
          );
          this.onSelectInfo({
            badge: district.metadata.type === 'urban_district' ? 'QUẬN' : 'HUYỆN',
            title: district.metadata.name,
            subtitle: district.metadata.nameEn,
            stats: [
              { label: 'Diện tích', value: `${district.metadata.areaKm2} km²` },
              {
                label: 'Tọa độ trung tâm',
                value: `${district.metadata.centerCoordinates.lat}°N, ${district.metadata.centerCoordinates.lng}°E`,
              },
              { label: 'Số đơn vị hành chính', value: `${district.getAllWards().length} xã/phường` },
            ],
            description: `Khu vực hành chính ${district.metadata.name}. Bấm vào từng xã/phường ở danh sách phía dưới để di chuyển camera đến chi tiết từng địa bàn.`,
          });
        }
      });
    }
  }

  /**
   * Switches active district, selects its first ward, and animates camera
   */
  public selectDistrict(districtId: string): void {
    const district = this.districtManager.getDistrict(districtId);
    if (!district) return;

    this.activeDistrictId = districtId;
    const wards = district.getAllWards();
    const firstWard = wards[0];
    this.activeWardId = firstWard ? firstWard.metadata.id : '';
    this.activeSubLandmarkId = firstWard?.metadata.subLandmarks?.[0]?.id || null;

    this.render();

    // Fly to first ward or district center
    if (firstWard) {
      const preset = firstWard.getCameraPreset();
      this.cameraManager.flyTo(preset.position, preset.target);
      this.showWardInfo(firstWard, district);
    } else {
      this.cameraManager.flyTo(
        district.metadata.cameraPreset.position,
        district.metadata.cameraPreset.target
      );
    }
  }

  /**
   * Switches active ward, animates camera to ward center, and updates InfoPanel
   */
  public selectWard(wardId: string): void {
    const district = this.districtManager.getDistrict(this.activeDistrictId);
    if (!district) return;

    const ward = district.getWard(wardId);
    if (!ward) return;

    this.activeWardId = wardId;
    this.activeSubLandmarkId = ward.metadata.subLandmarks?.[0]?.id || null;

    this.render();

    const preset = ward.getCameraPreset();
    this.cameraManager.flyTo(preset.position, preset.target);
    this.showWardInfo(ward, district);
  }

  /**
   * Selects a sub-landmark inside the current ward and animates camera
   */
  public selectSubLandmark(subId: string): void {
    const district = this.districtManager.getDistrict(this.activeDistrictId);
    if (!district) return;

    const ward = district.getWard(this.activeWardId);
    if (!ward) return;

    const sub = ward.metadata.subLandmarks?.find((s) => s.id === subId);
    if (!sub) return;

    this.activeSubLandmarkId = subId;
    this.render();

    this.cameraManager.flyTo(sub.cameraPreset.position, sub.cameraPreset.target);

    this.onSelectInfo({
      badge: sub.category?.toUpperCase() || 'CÔNG TRÌNH',
      title: sub.name,
      subtitle: `${ward.metadata.name} • ${district.metadata.name}`,
      description:
        sub.description ||
        `Địa điểm ${sub.name} thuộc ${ward.metadata.name}, ${district.metadata.name}.`,
    });
  }

  private showWardInfo(ward: BaseWard, district: BaseDistrict): void {
    const typeLabel =
      ward.metadata.type === 'ward'
        ? 'PHƯỜNG'
        : ward.metadata.type === 'town'
        ? 'THỊ TRẤN'
        : 'XÃ';

    this.onSelectInfo({
      badge: `${typeLabel} • ${district.metadata.name.toUpperCase()}`,
      title: ward.metadata.name,
      subtitle: ward.metadata.nameEn,
      stats: [
        ...(ward.metadata.areaKm2
          ? [{ label: 'Diện tích', value: `${ward.metadata.areaKm2} km²` }]
          : []),
        { label: 'Trực thuộc', value: district.metadata.name },
      ],
      description:
        ward.metadata.description ||
        `Địa bàn ${ward.metadata.name} thuộc ${district.metadata.name}.`,
    });
  }
}
