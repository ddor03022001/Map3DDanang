import * as THREE from 'three';
import type { Engine } from '@/core/Engine';
import { Environment } from './Environment';
import { Terrain } from './Terrain';
import { Water } from './Water';
import { CityGrid } from './CityGrid';
import { Buildings } from './Buildings';
import { Vegetation } from './Vegetation';
import { LandmarkManager } from './landmarks/LandmarkManager';
import { DistrictManager } from './districts';
import { LabelManager } from './labels/LabelManager';
import type { TimeOfDay } from '@/config/constants';

/**
 * World container aggregating all 3D scene actors, terrain, waterways, and urban structures
 */
export class World {
  public group = new THREE.Group();

  public environment: Environment;
  public terrain: Terrain;
  public water: Water;
  public cityGrid: CityGrid;
  public buildings: Buildings;
  public vegetation: Vegetation;
  public landmarks: LandmarkManager;
  public districtManager: DistrictManager;
  public labelManager: LabelManager;

  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;

    // 1. Lighting & Atmospheric Environment
    this.environment = new Environment(this.engine);
    this.group.add(this.environment.group);

    // 2. Geographic Terrain (Son Tra, Marble Mountains, Plains)
    this.terrain = new Terrain();
    this.group.add(this.terrain.group);

    // 3. Han River & East Sea (My Khe) Waterways
    this.water = new Water();
    this.group.add(this.water.group);

    // 4. Urban Road Arteries & Streetlamps
    this.cityGrid = new CityGrid();
    this.group.add(this.cityGrid.group);

    // 5. Instanced City Buildings with Night Window Glow
    this.buildings = new Buildings();
    this.group.add(this.buildings.group);

    // 6. Riverside Shade Trees & Coastal Palm Groves
    this.vegetation = new Vegetation();
    this.group.add(this.vegetation.group);

    // 7. Iconic Da Nang Landmarks (Dragon Bridge, Han Bridge, Admin Center, Thuan Phuoc)
    this.landmarks = new LandmarkManager();
    this.group.add(this.landmarks.group);

    // 8. Modular Provincial Districts (Hai Chau, Son Tra, Ngu Hanh Son, Hoa Vang / Ba Na)
    this.districtManager = new DistrictManager();
    this.group.add(this.districtManager.group);

    // 9. 3D Floating Labels System (duancuulong.com style)
    this.labelManager = new LabelManager();
    this.group.add(this.labelManager.group);

    // Add everything to main Scene
    this.engine.sceneManager.add(this.group);

    // Register World update tick
    this.engine.time.subscribe((delta, elapsed) => {
      this.update(delta, elapsed);
    });
  }

  public setTimeOfDay(time: TimeOfDay): void {
    this.environment.setTimeOfDay(time);
  }

  public update(delta: number, elapsed: number): void {
    this.environment.update(delta);

    const nightGlow = this.environment.getNightGlowIntensity();
    this.water.update(delta, elapsed);
    this.cityGrid.setNightIntensity(nightGlow);
    this.buildings.setNightGlow(nightGlow);
    this.landmarks.update(delta, elapsed, nightGlow);
    this.districtManager.update(delta, elapsed, nightGlow);
  }
}
