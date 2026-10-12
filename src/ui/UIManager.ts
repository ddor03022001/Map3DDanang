import type { Engine } from '@/core/Engine';
import type { World } from '@/world/World';
import { NavigationBar } from './components/NavigationBar';
import { LandmarkMenu } from './components/LandmarkMenu';
import { InfoPanel } from './components/InfoPanel';
import { StatsOverlay } from './components/StatsOverlay';
import { NavControls } from './components/NavControls';
import { LANDMARKS, type LandmarkPOI } from '@/config/coordinates';

/**
 * Main UI orchestrator managing HUD overlays, user interactions, and 3D camera sync
 */
export class UIManager {
  public container: HTMLElement;
  public navBar: NavigationBar;
  public landmarkMenu: LandmarkMenu;
  public infoPanel: InfoPanel;
  public statsOverlay: StatsOverlay;
  public navControls: NavControls;

  private engine: Engine;
  private world: World;

  constructor(engine: Engine, world: World) {
    this.engine = engine;
    this.world = world;

    this.container = document.createElement('div');
    this.container.className = 'dn-ui-overlay';

    // 1. Navigation Header
    this.navBar = new NavigationBar({
      onTimeChange: (time) => {
        this.world.setTimeOfDay(time);
      },
      onFireToggle: (active) => {
        this.world.landmarks.triggerDragonFire(active);
        if (active) {
          // Auto fly to Dragon Bridge to view the fire show!
          this.selectLandmark(LANDMARKS.DRAGON_BRIDGE);
        }
      },
    });

    // 2. Info slide-out panel
    this.infoPanel = new InfoPanel();

    // 3. Landmark quick selector
    this.landmarkMenu = new LandmarkMenu({
      onSelect: (landmark) => {
        this.selectLandmark(landmark);
      },
    });

    // 4. Stats HUD
    this.statsOverlay = new StatsOverlay();

    // 5. On-screen Camera Navigation D-Pad & Zoom Controls
    this.navControls = new NavControls(this.engine.cameraManager);

    // Assemble DOM hierarchy
    this.container.appendChild(this.navBar.element);
    this.container.appendChild(this.infoPanel.element);
    this.container.appendChild(this.landmarkMenu.element);
    this.container.appendChild(this.statsOverlay.element);
    this.container.appendChild(this.navControls.element);
    document.body.appendChild(this.container);

    // Initial landmark focus (Dragon Bridge)
    this.infoPanel.show(LANDMARKS.DRAGON_BRIDGE);

    // Subscribe to engine tick for real-time HUD updates
    this.engine.time.subscribe(() => {
      this.statsOverlay.update(
        this.engine.time.fps,
        this.engine.cameraManager.camera.position.y
      );
    });
  }

  public selectLandmark(landmark: LandmarkPOI): void {
    this.landmarkMenu.setActive(landmark.id);
    this.infoPanel.show(landmark);
    this.engine.cameraManager.flyTo(
      landmark.cameraPreset.position,
      landmark.cameraPreset.target
    );
  }
}
