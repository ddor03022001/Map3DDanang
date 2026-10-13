import type { Engine } from '@/core/Engine';
import type { World } from '@/world/World';
import { SidebarMenu, VIEWPOINTS } from './components/SidebarMenu';
import { TopRightBar } from './components/TopRightBar';
import { GuideToast } from './components/GuideToast';
import { InfoPanel } from './components/InfoPanel';
import { StatsOverlay } from './components/StatsOverlay';
import { NavControls } from './components/NavControls';
import { Minimap } from './components/Minimap';
import type { LandmarkPOI } from '@/config/coordinates';

/**
 * Main UI orchestrator restructured to match duancuulong.com
 * Features Left Sidebar (Brand, Modes, 2-Column Grid), Top-Right actions, and Bottom-Right Guide Toast
 */
export class UIManager {
  public container: HTMLElement;
  public sidebarMenu: SidebarMenu;
  public topRightBar: TopRightBar;
  public guideToast: GuideToast;
  public infoPanel: InfoPanel;
  public statsOverlay: StatsOverlay;
  public navControls: NavControls;
  public minimap: Minimap;

  private engine: Engine;
  private world: World;

  constructor(engine: Engine, world: World) {
    this.engine = engine;
    this.world = world;

    this.container = document.createElement('div');
    this.container.className = 'dn-ui-overlay dcl-theme';

    // 1. Info slide-out panel
    this.infoPanel = new InfoPanel();

    // 2. Left Sidebar Menu (matching duancuulong.com)
    this.sidebarMenu = new SidebarMenu({
      cameraManager: this.engine.cameraManager,
      onSelectInfo: (info) => {
        this.infoPanel.show(info);
      },
      onModeChange: (mode) => {
        if (mode === 'explore') {
          // Switch to close-up Tam Hiep street level view
          const tamHiepVP = VIEWPOINTS.find((v) => v.id === 'tam-hiep');
          if (tamHiepVP) this.sidebarMenu.selectViewpoint(tamHiepVP);
        } else {
          // Switch to broader study overview
          const toanTinhVP = VIEWPOINTS.find((v) => v.id === 'toan-tinh');
          if (toanTinhVP) this.sidebarMenu.selectViewpoint(toanTinhVP);
        }
      },
      onSelectViewpoint: (item) => {
        if (item.id.startsWith('commune-')) {
          this.world.districtManager.nuiThanhDistrict.territoryManager.highlightCommune(item.id);
        }
      },
    });

    // 3. Top-Right Toolbar (Search, Share, Compass, Help, Language)
    this.topRightBar = new TopRightBar({
      cameraManager: this.engine.cameraManager,
      onHelpClick: () => {
        this.guideToast.show();
      },
    });

    // 4. Bottom-Right Guide Toast
    this.guideToast = new GuideToast({
      onControlsClick: () => {
        this.infoPanel.show({
          badge: 'HƯỚNG DẪN',
          title: 'Cách Điều Khiển Bản Đồ 3D',
          subtitle: 'Phím tắt và thao tác chuột',
          description:
            '• Chuột trái: Nhấn giữ và kéo để xoay góc nhìn 3D.\n• Chuột phải: Nhấn giữ và kéo để di chuyển vị trí (Pan).\n• Cuộn chuột: Phóng to / Thu nhỏ (Zoom).\n• Bàn phím: W, A, S, D hoặc Mũi tên để di chuyển.\n• Phím E / Q: Tăng / giảm độ cao bay. Giữ Shift để tăng tốc độ lướt.',
        });
      },
    });

    // 5. Stats HUD
    this.statsOverlay = new StatsOverlay();

    // 6. On-screen Navigation Controls (D-Pad & Zoom)
    this.navControls = new NavControls(this.engine.cameraManager);

    // 7. Interactive 2D Radar Minimap with District Hopping
    this.minimap = new Minimap(
      this.engine.cameraManager,
      this.world.districtManager,
      (districtId) => {
        const vp = VIEWPOINTS.find((v) => v.districtId === districtId || v.id === districtId);
        if (vp) {
          this.sidebarMenu.selectViewpoint(vp);
        }
      }
    );

    // Assemble DOM hierarchy
    this.container.appendChild(this.sidebarMenu.element);
    this.container.appendChild(this.topRightBar.element);
    this.container.appendChild(this.guideToast.element);
    this.container.appendChild(this.infoPanel.element);
    this.container.appendChild(this.statsOverlay.element);
    this.container.appendChild(this.navControls.element);
    this.container.appendChild(this.minimap.element);
    document.body.appendChild(this.container);

    // Initial camera position: focus on Huyện Núi Thành comprehensive district overview
    const initialVP = VIEWPOINTS.find((v) => v.id === 'nui-thanh') || VIEWPOINTS.find((v) => v.id === 'tam-hiep');
    if (initialVP) {
      this.sidebarMenu.selectViewpoint(initialVP);
    }

    // Subscribe to engine tick for real-time updates
    this.engine.time.subscribe(() => {
      this.statsOverlay.update(
        this.engine.time.fps,
        this.engine.cameraManager.camera.position.y
      );
      this.minimap.update();
    });
  }

  public selectLandmark(landmark: LandmarkPOI): void {
    this.infoPanel.show(landmark);
    this.engine.cameraManager.flyTo(
      landmark.cameraPreset.position,
      landmark.cameraPreset.target
    );
  }
}
