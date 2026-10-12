import * as THREE from 'three';
import { TextureGenerator } from '@/utils/TextureGenerator';

interface RoadSegment {
  name: string;
  start: [number, number]; // [X, Z]
  end: [number, number];
  width: number;
}

/**
 * Procedural road network, roundabouts, riverside promenades, and interchanges for Da Nang
 * Seamlessly connects Thuan Phuoc Bridge into Hai Chau and Son Tra urban grids
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
    this.buildRoundabouts();
    this.buildRiversidePromenades();
    this.buildApecParkPlaza();
  }

  private buildRoadNetwork(): void {
    const primaryRoads: RoadSegment[] = [
      // 1. Vo Van Kiet (Dragon Bridge East to My Khe Beach)
      { name: 'Vo Van Kiet', start: [24, 0], end: [180, 0], width: 7 },

      // 2. Nguyen Van Linh (Airport to Dragon Bridge West)
      { name: 'Nguyen Van Linh', start: [-160, 0], end: [-24, 0], width: 7 },

      // 3. Pham Van Dong (Han River Bridge East to My Khe Beach)
      { name: 'Pham Van Dong', start: [22, -125], end: [180, -125], width: 6.5 },

      // 4. Le Duan (City center to Han River Bridge West)
      { name: 'Le Duan', start: [-160, -125], end: [-25, -125], width: 6.5 },

      // 5. Bach Dang (Scenic riverfront boulevard West bank)
      { name: 'Bach Dang', start: [-26, 120], end: [-26, -240], width: 5.5 },

      // 6. Tran Phu (Parallel commercial boulevard)
      { name: 'Tran Phu', start: [-38, 120], end: [-38, -240], width: 5.5 },

      // 7. Tran Hung Dao (Scenic riverfront boulevard East bank)
      { name: 'Tran Hung Dao', start: [26, 120], end: [26, -240], width: 5.5 },

      // 8. Vo Nguyen Giap (Premier coastal boulevard along My Khe beach)
      { name: 'Vo Nguyen Giap', start: [175, 180], end: [175, -390], width: 7.5 },

      // === THUAN PHUOC BRIDGE AREA CORRIDORS ===
      // 9. Nhu Nguyet (Bach Dang extension leading straight to West Thuan Phuoc roundabout)
      { name: 'Nhu Nguyet', start: [-26, -240], end: [-76, -390], width: 6.5 },

      // 10. Nguyen Tat Thanh (Bay coastal highway connecting directly to West Thuan Phuoc roundabout)
      { name: 'Nguyen Tat Thanh', start: [-240, -390], end: [-78, -390], width: 7.5 },

      // 11. Le Van Duyet (Tran Hung Dao extension leading to East Thuan Phuoc roundabout)
      { name: 'Le Van Duyet', start: [26, -240], end: [76, -390], width: 6.5 },

      // 12. Le Duc Tho (Major boulevard from East Thuan Phuoc roundabout across Son Tra to beach)
      { name: 'Le Duc Tho', start: [78, -390], end: [205, -390], width: 7.5 },

      // 13. Hoang Sa / Son Tra Coastal Highway (Linking Le Duc Tho to Vo Nguyen Giap)
      { name: 'Hoang Sa', start: [205, -390], end: [175, -390], width: 7 },

      // 14. Tran Thanh Tong (Nai Hien Dong arterial cross street)
      { name: 'Tran Thanh Tong', start: [42, -310], end: [175, -310], width: 6 },

      // 15. Ngo Quyen Extended (North-South artery through Son Tra district)
      { name: 'Ngo Quyen North', start: [105, -200], end: [105, -390], width: 6.5 },
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
   * Distinct circular traffic roundabouts at both footings of Thuan Phuoc Bridge
   */
  private buildRoundabouts(): void {
    const roundaboutMat = new THREE.MeshStandardMaterial({
      color: 0x22262c,
      roughness: 0.8,
    });
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2e6b3e, // Green traffic island
      roughness: 0.9,
    });

    const roundabouts = [
      { x: -78, z: -390, name: 'West Thuan Phuoc Interchange' },
      { x: 78, z: -390, name: 'East Thuan Phuoc Interchange' },
    ];

    roundabouts.forEach((rb) => {
      // Outer asphalt roundabout ring
      const ringGeo = new THREE.RingGeometry(5.0, 10.5, 32);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, roundaboutMat);
      ringMesh.position.set(rb.x, 0.36, rb.z);
      ringMesh.receiveShadow = true;
      this.group.add(ringMesh);

      // Center green grass island
      const centerGeo = new THREE.CircleGeometry(4.8, 32);
      centerGeo.rotateX(-Math.PI / 2);
      const centerMesh = new THREE.Mesh(centerGeo, grassMat);
      centerMesh.position.set(rb.x, 0.38, rb.z);
      centerMesh.receiveShadow = true;
      this.group.add(centerMesh);
    });
  }

  /**
   * Granite riverside walkways along Bach Dang, Nhu Nguyet, Tran Hung Dao, and Le Van Duyet
   */
  private buildRiversidePromenades(): void {
    const graniteMat = new THREE.MeshStandardMaterial({
      color: 0x9fa8a3,
      roughness: 0.65,
      metalness: 0.1,
    });

    const curbMat = new THREE.MeshStandardMaterial({
      color: 0xd4dad8,
      roughness: 0.4,
      metalness: 0.1,
    });

    // West Promenade extending all the way to Thuan Phuoc (Length: 520 units from z = 120 to z = -400)
    const westWalkGeo = new THREE.PlaneGeometry(3.5, 520);
    westWalkGeo.rotateX(-Math.PI / 2);
    const westWalk = new THREE.Mesh(westWalkGeo, graniteMat);
    westWalk.position.set(-23.5, 0.38, -140);
    westWalk.receiveShadow = true;
    this.group.add(westWalk);

    const westCurbGeo = new THREE.BoxGeometry(0.35, 0.45, 520);
    const westCurb = new THREE.Mesh(westCurbGeo, curbMat);
    westCurb.position.set(-22, 0.45, -140);
    this.group.add(westCurb);

    // East Promenade extending to Thuan Phuoc
    const eastWalkGeo = new THREE.PlaneGeometry(3.5, 520);
    eastWalkGeo.rotateX(-Math.PI / 2);
    const eastWalk = new THREE.Mesh(eastWalkGeo, graniteMat);
    eastWalk.position.set(23.5, 0.38, -140);
    eastWalk.receiveShadow = true;
    this.group.add(eastWalk);

    const eastCurbGeo = new THREE.BoxGeometry(0.35, 0.45, 520);
    const eastCurb = new THREE.Mesh(eastCurbGeo, curbMat);
    eastCurb.position.set(22, 0.45, -140);
    this.group.add(eastCurb);
  }

  /**
   * APEC Sculpture Park Plaza & Iconic Wing Pavilion (near West end of Dragon Bridge)
   */
  private buildApecParkPlaza(): void {
    const plazaGeo = new THREE.PlaneGeometry(30, 24);
    plazaGeo.rotateX(-Math.PI / 2);
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0x2e6b3e,
      roughness: 0.85,
    });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(-36, 0.36, 20);
    plaza.receiveShadow = true;
    this.group.add(plaza);

    const canopyGeo = new THREE.TorusGeometry(3.8, 0.25, 8, 24, Math.PI);
    canopyGeo.rotateX(Math.PI / 2.5);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa,
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
