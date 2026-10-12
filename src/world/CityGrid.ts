import * as THREE from 'three';
import { TextureGenerator } from '@/utils/TextureGenerator';

interface RoadSegment {
  name: string;
  start: [number, number]; // [X, Z]
  end: [number, number];
  width: number;
}

/**
 * Procedural road network, riverside promenades, APEC Park, and street lighting for Da Nang
 */
export class CityGrid {
  public group = new THREE.Group();

  private roadMaterial: THREE.MeshStandardMaterial;
  private streetLampGlows: THREE.InstancedMesh | null = null;

  constructor() {
    const roadTexture = TextureGenerator.createRoadTexture();

    this.roadMaterial = new THREE.MeshStandardMaterial({
      map: roadTexture,
      roughness: 0.75,
      metalness: 0.1,
    });

    this.buildRoadNetwork();
    this.buildRiversidePromenades();
    this.buildApecParkPlaza();
  }

  private buildRoadNetwork(): void {
    const primaryRoads: RoadSegment[] = [
      // 1. Vo Van Kiet (From Dragon Bridge East abutment to My Khe Beach)
      { name: 'Vo Van Kiet', start: [24, 0], end: [180, 0], width: 7 },

      // 2. Nguyen Van Linh (From Airport through city center to Dragon Bridge West abutment)
      { name: 'Nguyen Van Linh', start: [-160, 0], end: [-24, 0], width: 7 },

      // 3. Pham Van Dong (From Han River Bridge East to My Khe Beach)
      { name: 'Pham Van Dong', start: [22, -125], end: [180, -125], width: 6.5 },

      // 4. Le Duan (Major shopping street leading to Han River Bridge West)
      { name: 'Le Duan', start: [-160, -125], end: [-25, -125], width: 6.5 },

      // 5. Bach Dang (Scenic riverfront boulevard along West bank)
      { name: 'Bach Dang', start: [-26, 120], end: [-26, -240], width: 5.5 },

      // 6. Tran Phu (Parallel one-way commercial boulevard)
      { name: 'Tran Phu', start: [-38, 120], end: [-38, -240], width: 5.5 },

      // 7. Tran Hung Dao (Scenic riverfront boulevard along East bank)
      { name: 'Tran Hung Dao', start: [26, 120], end: [26, -240], width: 5.5 },

      // 8. Vo Nguyen Giap (Premier coastal boulevard along My Khe beach)
      { name: 'Vo Nguyen Giap', start: [175, 180], end: [175, -280], width: 7.5 },

      // 9. Nguyen Tat Thanh (Bay coastal highway leading to Thuan Phuoc)
      { name: 'Nguyen Tat Thanh', start: [-180, -380], end: [-45, -380], width: 6 },
    ];

    const lampPositions: [number, number, number][] = [];

    primaryRoads.forEach((road) => {
      const dx = road.end[0] - road.start[0];
      const dz = road.end[1] - road.start[1];
      const length = Math.hypot(dx, dz);
      const angle = Math.atan2(dx, dz);

      const geometry = new THREE.PlaneGeometry(road.width, length);
      geometry.rotateX(-Math.PI / 2);
      geometry.rotateY(angle);

      const mesh = new THREE.Mesh(geometry, this.roadMaterial);
      mesh.position.set(
        (road.start[0] + road.end[0]) / 2,
        0.35,
        (road.start[1] + road.end[1]) / 2
      );
      mesh.receiveShadow = true;
      this.group.add(mesh);

      // Collect street lamp coordinates
      const lampStep = 18;
      const count = Math.floor(length / lampStep);
      for (let i = 1; i < count; i++) {
        const factor = i / count;
        const lx = road.start[0] + dx * factor;
        const lz = road.start[1] + dz * factor;
        const perpX = -Math.cos(angle) * (road.width / 2 + 0.8);
        const perpZ = Math.sin(angle) * (road.width / 2 + 0.8);
        lampPositions.push([lx + perpX, 1.8, lz + perpZ]);
        lampPositions.push([lx - perpX, 1.8, lz - perpZ]);
      }
    });

    this.createStreetLamps(lampPositions);
  }

  /**
   * Granite riverside walkways along Bach Dang & Tran Hung Dao with stone embankments
   */
  private buildRiversidePromenades(): void {
    const graniteMat = new THREE.MeshStandardMaterial({
      color: 0x9fa8a3, // Light polished granite tiles
      roughness: 0.65,
      metalness: 0.1,
    });

    const curbMat = new THREE.MeshStandardMaterial({
      color: 0xd4dad8, // White stone river embankment curb
      roughness: 0.4,
      metalness: 0.1,
    });

    // West Promenade (Bach Dang: 360 units length, width 3.2 units)
    const westWalkGeo = new THREE.PlaneGeometry(3.5, 360);
    westWalkGeo.rotateX(-Math.PI / 2);
    const westWalk = new THREE.Mesh(westWalkGeo, graniteMat);
    westWalk.position.set(-23.5, 0.38, -60);
    westWalk.receiveShadow = true;
    this.group.add(westWalk);

    // West Embankment Balustrade
    const westCurbGeo = new THREE.BoxGeometry(0.35, 0.45, 360);
    const westCurb = new THREE.Mesh(westCurbGeo, curbMat);
    westCurb.position.set(-22, 0.45, -60);
    this.group.add(westCurb);

    // East Promenade (Tran Hung Dao)
    const eastWalkGeo = new THREE.PlaneGeometry(3.5, 360);
    eastWalkGeo.rotateX(-Math.PI / 2);
    const eastWalk = new THREE.Mesh(eastWalkGeo, graniteMat);
    eastWalk.position.set(23.5, 0.38, -60);
    eastWalk.receiveShadow = true;
    this.group.add(eastWalk);

    // East Embankment Balustrade
    const eastCurbGeo = new THREE.BoxGeometry(0.35, 0.45, 360);
    const eastCurb = new THREE.Mesh(eastCurbGeo, curbMat);
    eastCurb.position.set(22, 0.45, -60);
    this.group.add(eastCurb);
  }

  /**
   * APEC Sculpture Park Plaza & Iconic Wing Pavilion (near West end of Dragon Bridge)
   */
  private buildApecParkPlaza(): void {
    // Green grass lawn & paved plaza
    const plazaGeo = new THREE.PlaneGeometry(30, 24);
    plazaGeo.rotateX(-Math.PI / 2);
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0x2e6b3e, // Lush park green lawn
      roughness: 0.85,
    });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(-36, 0.36, 20);
    plaza.receiveShadow = true;
    this.group.add(plaza);

    // Iconic APEC "Giant Kite / Wing" canopy architecture
    const canopyGeo = new THREE.TorusGeometry(3.8, 0.25, 8, 24, Math.PI);
    canopyGeo.rotateX(Math.PI / 2.5);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa, // White futuristic steel wing
      metalness: 0.8,
      roughness: 0.2,
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(-36, 1.8, 20);
    canopy.castShadow = true;
    this.group.add(canopy);
  }

  private createStreetLamps(positions: [number, number, number][]): void {
    const sphereGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const lampMat = new THREE.MeshBasicMaterial({
      color: 0xffe6a3,
      transparent: true,
      opacity: 0.85,
    });

    this.streetLampGlows = new THREE.InstancedMesh(sphereGeo, lampMat, positions.length);
    const dummy = new THREE.Object3D();

    positions.forEach((pos, idx) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      this.streetLampGlows!.setMatrixAt(idx, dummy.matrix);
    });

    this.streetLampGlows.instanceMatrix.needsUpdate = true;
    this.group.add(this.streetLampGlows);
  }

  public setNightIntensity(intensity: number): void {
    if (this.streetLampGlows && this.streetLampGlows.material instanceof THREE.MeshBasicMaterial) {
      this.streetLampGlows.material.opacity = Math.max(0.1, intensity);
    }
  }
}
