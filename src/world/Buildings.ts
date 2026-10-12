import * as THREE from 'three';
import { TextureGenerator } from '@/utils/TextureGenerator';

export type BuildingType = 'hotel_tower' | 'shophouse' | 'office_commercial';

interface BuildingInstance {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  rotation: number;
  type: BuildingType;
  color: THREE.Color;
}

/**
 * Authentic Vietnamese urban architecture system modeling Da Nang
 * Distinguishes between coastal luxury glass hotels, commercial towers,
 * and dense residential shophouses with terracotta/blue roof tones and warm plaster facades.
 */
export class Buildings {
  public group = new THREE.Group();

  private buildingMesh: THREE.InstancedMesh;
  private buildingMaterial: THREE.MeshStandardMaterial;

  constructor() {
    const { diffuseMap, emissiveMap } = TextureGenerator.createBuildingTextureAtlas();

    this.buildingMaterial = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      emissiveMap: emissiveMap,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.0,
      roughness: 0.55,
      metalness: 0.25,
    });

    // Box geometry with pivot at the base
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.translate(0, 0.5, 0);

    const instances = this.generateUrbanDistribution();
    this.buildingMesh = new THREE.InstancedMesh(geometry, this.buildingMaterial, instances.length);
    this.buildingMesh.castShadow = true;
    this.buildingMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    instances.forEach((b, idx) => {
      dummy.position.set(b.x, 0.35, b.z);
      dummy.scale.set(b.width, b.height, b.depth);
      dummy.rotation.y = b.rotation;
      dummy.updateMatrix();

      this.buildingMesh.setMatrixAt(idx, dummy.matrix);
      this.buildingMesh.setColorAt(idx, b.color);
    });

    this.buildingMesh.instanceMatrix.needsUpdate = true;
    if (this.buildingMesh.instanceColor) {
      this.buildingMesh.instanceColor.needsUpdate = true;
    }

    this.group.add(this.buildingMesh);
  }

  private generateUrbanDistribution(): BuildingInstance[] {
    const buildings: BuildingInstance[] = [];

    // Authentic Da Nang Architectural Color Palettes
    // 1. Coastal & Riverside Hotels (Sleek Glass & Luxury White)
    const hotelPalettes = [
      new THREE.Color(0xdce7f0), // Pristine white concrete
      new THREE.Color(0x3882a5), // Coastal ocean teal glass
      new THREE.Color(0x2d688a), // Deep azure curtain glass
      new THREE.Color(0x5ca9c9), // Sky cyan reflective
      new THREE.Color(0xe6edf5), // Modern champagne silver
    ];

    // 2. Vietnamese Shophouses (Warm Plaster & Roof Accents)
    const shophousePalettes = [
      new THREE.Color(0xf4ebd9), // Warm Hanoi/Da Nang French yellow plaster
      new THREE.Color(0xe8d5b5), // Cream beige plaster
      new THREE.Color(0xd9755b), // Terracotta clay red roof accent
      new THREE.Color(0xb8432f), // Deep baked tile orange-red
      new THREE.Color(0x4a819c), // Blue corrugated zinc roof tone
      new THREE.Color(0xe2ded4), // Light off-white stucco
      new THREE.Color(0xd0e0d6), // Pale pastel mint green plaster
    ];

    // 3. Commercial Offices
    const commercialPalettes = [
      new THREE.Color(0x324456), // Corporate slate steel
      new THREE.Color(0x566d85), // Mirrored blue-gray
      new THREE.Color(0xe0e6ed), // Clean metallic panel
    ];

    // Zone 1: Hai Chau Urban Core (West Bank: Bach Dang, Tran Phu, Le Duan, Nguyen Van Linh)
    this.populateZone(buildings, {
      minX: -130,
      maxX: -32,
      minZ: -200,
      maxZ: 100,
      density: 0.85,
      baseHeight: 5,
      maxHeight: 26,
      avgSize: 4.5,
      palettes: [...shophousePalettes, ...commercialPalettes],
      type: 'shophouse',
    });

    // Zone 2: Son Tra Commercial Sector (East Bank: Tran Hung Dao to Ngo Quyen)
    this.populateZone(buildings, {
      minX: 32,
      maxX: 155,
      minZ: -200,
      maxZ: 100,
      density: 0.82,
      baseHeight: 4.5,
      maxHeight: 20,
      avgSize: 4.8,
      palettes: shophousePalettes,
      type: 'shophouse',
    });

    // Zone 3: Premier Coastal Resort & Hotel Strip (Vo Nguyen Giap / My Khe Beach)
    this.populateZone(buildings, {
      minX: 160,
      maxX: 195,
      minZ: -240,
      maxZ: 120,
      density: 0.72,
      baseHeight: 18,
      maxHeight: 46, // Tall 25-35 floor beachfront hotel towers
      avgSize: 7.2,
      palettes: hotelPalettes,
      type: 'hotel_tower',
    });

    // Zone 4: Upstream Southern Residential Sector (Hoa Cuong / Cam Le)
    this.populateZone(buildings, {
      minX: -110,
      maxX: 90,
      minZ: 110,
      maxZ: 260,
      density: 0.65,
      baseHeight: 3.5,
      maxHeight: 11, // Tube house residential
      avgSize: 4.0,
      palettes: shophousePalettes,
      type: 'shophouse',
    });

    return buildings;
  }

  private populateZone(
    target: BuildingInstance[],
    options: {
      minX: number;
      maxX: number;
      minZ: number;
      maxZ: number;
      density: number;
      baseHeight: number;
      maxHeight: number;
      avgSize: number;
      palettes: THREE.Color[];
      type: BuildingType;
    }
  ): void {
    const step = options.avgSize * 1.85;

    for (let x = options.minX; x < options.maxX; x += step) {
      for (let z = options.minZ; z < options.maxZ; z += step) {
        // Clear Han River channel
        if (Math.abs(x) < 28 && z > -350 && z < 210) continue;

        if (Math.random() > options.density) continue;

        const jitterX = (Math.random() - 0.5) * (step * 0.4);
        const jitterZ = (Math.random() - 0.5) * (step * 0.4);
        const w = options.avgSize * (0.75 + Math.random() * 0.5);
        const d = options.avgSize * (0.75 + Math.random() * 0.5);

        const heightFactor = Math.pow(Math.random(), 2.8);
        const h = options.baseHeight + heightFactor * (options.maxHeight - options.baseHeight);

        const color = options.palettes[Math.floor(Math.random() * options.palettes.length)].clone();

        target.push({
          x: x + jitterX,
          z: z + jitterZ,
          width: w,
          depth: d,
          height: h,
          rotation: (Math.random() - 0.5) * 0.12,
          type: options.type,
          color,
        });
      }
    }
  }

  public setNightGlow(intensity: number): void {
    this.buildingMaterial.emissiveIntensity = intensity * 1.35;
  }
}
