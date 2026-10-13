import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Đảo Tam Hải (Huyện Núi Thành) - "Ốc Đảo Dừa Miền Trung"
 * Renowned geological & maritime gem in Quang Nam:
 * - Ghềnh Đá Đen Bàn Than: Hàng triệu năm trầm tích đá đen tuyền kỳ vĩ nhô ra sóng biển
 * - Cổng Tò Vò tự nhiên bằng đá đen & các đảo đá nhỏ Hòn Mang, Hòn Dứa
 * - Ốc Đảo Dừa Tam Hải: Hàng chục rặng dừa xiêm thân cao rủ bóng che chở xóm đảo
 * - Làng Chài ven biển Tam Hải: Nhà ngói đỏ, sân phơi mực nang, thuyền nan & thúng chai
 * - Bến Phà Tam Hải & Con phà khách nối xã đảo sang bờ Tam Quang
 */
export class TamHaiCommune extends BaseWard {
  private waveFoams: THREE.Mesh[] = [];
  private ferryBoat: THREE.Group | null = null;
  private ferryX = 370;
  private ferryDirection = 1;

  constructor() {
    super(
      {
        id: 'tam-hai-commune',
        name: 'Xã Đảo Tam Hải',
        nameEn: 'Tam Hai Island Commune',
        type: 'commune',
        areaKm2: 15.6,
        description:
          'Xã đảo biệt lập ba mặt sông ôm ấp, một mặt giáp Biển Đông. Tuyệt tác thiên nhiên với Ghềnh đá đen Bàn Than trầm tích kỳ ảo, ốc đảo dừa bạt ngàn và làng chài mộc mạc.',
        cameraPreset: {
          position: [445, 120, 770],
          target: [445, 4, 875],
        },
        subLandmarks: [
          {
            id: 'tam-hai-overview',
            name: '👁️ Toàn Cảnh Xã Đảo Tam Hải',
            category: 'nature',
            cameraPreset: { position: [420, 110, 780], target: [445, 4, 875] },
            description: 'Toàn cảnh xã đảo Tam Hải nằm giữa biển Đông, sông Trường Giang và cửa biển An Hòa.',
          },
          {
            id: 'ban-than-rocks',
            name: '🪨 Ghềnh Đá Đen Bàn Than',
            category: 'nature',
            cameraPreset: { position: [465, 30, 850], target: [485, 4, 895] },
            description: 'Tuyệt tác địa chất trầm tích đá đen nhánh triệu năm tuổi, vòm Cổng Tò Vò và sóng biển rì rào.',
          },
          {
            id: 'coconut-island',
            name: '🌴 Ốc Đảo Dừa Xiêm',
            category: 'nature',
            cameraPreset: { position: [425, 35, 830], target: [445, 4, 870] },
            description: 'Rặng dừa xiêm ngút ngàn che mát các nếp nhà làng chài ven biển thanh bình.',
          },
          {
            id: 'tam-hai-fishing-village',
            name: '⛵ Làng Chài & Thuyền Thúng',
            category: 'cultural',
            cameraPreset: { position: [415, 25, 825], target: [435, 3, 860] },
            description: 'Làng chài truyền thống với sân phơi mực, bãi thuyền thúng nan tre và ghe câu mực đêm.',
          },
          {
            id: 'tam-hai-ferry',
            name: '⛴️ Bến Phà Tam Hải',
            category: 'transport',
            cameraPreset: { position: [380, 22, 835], target: [405, 2, 855] },
            description: 'Tuyến phà khách vượt kênh nước Vịnh An Hòa kết nối xã đảo Tam Hải với đất liền xã Tam Quang.',
          },
        ],
      },
      {
        minX: 380,
        maxX: 515,
        minZ: 810,
        maxZ: 950,
      }
    );

    this.buildIslandGroundAndBeaches();
    this.buildBanThanBlackRockCliffs();
    this.buildCoconutOasisGroves();
    this.buildIslandFishingVillage();
    this.buildFerryTerminalAndBoat();
  }

  /**
   * 1. Crescent Island Natural Shorelines & Sandy Beaches
   */
  private buildIslandGroundAndBeaches(): void {
    // Natural island topography is accurately formed by ReliefTerrain DEM.
    // Here we embellish the seaward sandy foreshore and beaches.
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xd6c29c, roughness: 0.95 });

    // Sand beach strip along the western sheltered lagoon
    const beachGeo = new THREE.PlaneGeometry(16, 95);
    beachGeo.rotateX(-Math.PI / 2);
    const beach = new THREE.Mesh(beachGeo, sandMat);
    beach.position.set(418, 0.42, 875);
    beach.receiveShadow = true;
    this.group.add(beach);
  }

  /**
   * 2. Ghềnh Đá Đen Bàn Than & Vòm Đá Cổng Tò Vò (Black Volcanic Rock Formations)
   */
  private buildBanThanBlackRockCliffs(): void {
    const cliffGroup = new THREE.Group();
    cliffGroup.position.set(485, 0.45, 895);

    const blackRockMat = new THREE.MeshStandardMaterial({
      color: 0x1f2326, // Jet black basaltic sedimentary stone
      roughness: 0.75,
      metalness: 0.25,
    });
    const whiteFoamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    // 12 Jagged basalt sedimentary slabs layered out into the sea
    for (let i = 0; i < 12; i++) {
      const rx = (i % 3) * 6;
      const rz = Math.floor(i / 3) * 8 - 12;
      const h = 2.5 + Math.random() * 4.5;

      const rockGeo = new THREE.BoxGeometry(7.5, h, 6.0);
      rockGeo.rotateY((Math.random() - 0.5) * 0.4);
      rockGeo.rotateZ(0.1); // Natural tilted stratum angle
      const rock = new THREE.Mesh(rockGeo, blackRockMat);
      rock.position.set(rx, h / 2, rz);
      rock.castShadow = true;
      rock.receiveShadow = true;
      cliffGroup.add(rock);

      // Sea spray / surf foam around rock base
      const foamGeo = new THREE.RingGeometry(3.5, 5.5, 12);
      foamGeo.rotateX(-Math.PI / 2);
      const foam = new THREE.Mesh(foamGeo, whiteFoamMat);
      foam.position.set(rx, 0.08, rz);
      this.waveFoams.push(foam);
      cliffGroup.add(foam);
    }

    // Natural Stone Arch (Cổng Tò Vò Đá Đen Bàn Than)
    const archGroup = new THREE.Group();
    archGroup.position.set(12, 0, 5);

    // Left & Right stone pillars
    [-3.2, 3.2].forEach((px) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 5.5, 3.0), blackRockMat);
      pillar.position.set(px, 2.75, 0);
      pillar.castShadow = true;
      archGroup.add(pillar);
    });

    // Overhead lintel rock spanning the arch
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(8.5, 2.2, 3.2), blackRockMat);
    lintel.position.set(0, 5.5 + 1.1, 0);
    lintel.castShadow = true;
    archGroup.add(lintel);

    cliffGroup.add(archGroup);

    // Off-shore Islets: Hòn Mang & Hòn Dứa
    const islet1 = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5), blackRockMat);
    islet1.scale.set(1.4, 0.7, 1.2);
    islet1.position.set(28, 2.5, -20);
    islet1.castShadow = true;
    cliffGroup.add(islet1);

    const islet2 = new THREE.Mesh(new THREE.DodecahedronGeometry(5.0), blackRockMat);
    islet2.scale.set(1.2, 0.6, 1.1);
    islet2.position.set(24, 2.0, 25);
    islet2.castShadow = true;
    cliffGroup.add(islet2);

    this.group.add(cliffGroup);
  }

  /**
   * 3. Ốc Đảo Dừa Xiêm Tam Hải (Extensive Coconut Palm Canopy)
   */
  private buildCoconutOasisGroves(): void {
    const groveGroup = new THREE.Group();

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x544332, roughness: 0.9 });
    const frondMat = new THREE.MeshStandardMaterial({ color: 0x226b2d, roughness: 0.65 });

    // Plant 60 tall curved coconut trees across the island (X: 415 to 475, Z: 835 to 915)
    for (let i = 0; i < 60; i++) {
      const cx = 418 + Math.random() * 55;
      const cz = 835 + Math.random() * 80;

      const coconut = new THREE.Group();
      coconut.position.set(cx, 0.7, cz);

      // Curved trunk using spline
      const tiltX = (Math.random() - 0.5) * 1.5;
      const tiltZ = (Math.random() - 0.5) * 1.5;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(tiltX * 0.4, 4.0, tiltZ * 0.4),
        new THREE.Vector3(tiltX, 8.5, tiltZ),
      ]);

      const trunkGeo = new THREE.TubeGeometry(curve, 12, 0.22, 7, false);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.castShadow = true;
      coconut.add(trunk);

      // Fronds canopy
      const crown = new THREE.Group();
      crown.position.set(tiltX, 8.5, tiltZ);
      for (let f = 0; f < 8; f++) {
        const frond = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.25, 4.0, 5), frondMat);
        frond.rotation.z = 0.8;
        frond.rotation.y = (f * Math.PI * 2) / 8;
        frond.position.y = -0.4;
        crown.add(frond);
      }
      coconut.add(crown);

      groveGroup.add(coconut);
    }

    this.group.add(groveGroup);
  }

  /**
   * 4. Làng Chài Tam Hải & Thuyền Thúng (Organic Fishing Village & Coracles)
   */
  private buildIslandFishingVillage(): void {
    const villageGroup = new THREE.Group();

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.7 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb53528, roughness: 0.5 });
    const coracleMat = new THREE.MeshStandardMaterial({ color: 0x183d25, roughness: 0.8 });

    // Organic village settlement along the sheltered inner coast (Thôn Thuận An)
    const villageSpots = [
      { x: 425, z: 845, rot: 0.1 },
      { x: 432, z: 852, rot: -0.25 },
      { x: 428, z: 865, rot: 0.15 },
      { x: 436, z: 872, rot: -0.1 },
      { x: 424, z: 885, rot: 0.3 },
      { x: 435, z: 895, rot: -0.2 },
      { x: 442, z: 860, rot: 0.4 },
      { x: 448, z: 878, rot: -0.35 },
      { x: 440, z: 905, rot: 0.05 },
      { x: 430, z: 915, rot: 0.2 },
    ];

    villageSpots.forEach((spot) => {
      const house = new THREE.Group();
      house.position.set(spot.x, 0.7, spot.z);
      house.rotation.y = spot.rot;

      const body = new THREE.Mesh(new THREE.BoxGeometry(7.5, 3.6, 6.0), wallMat);
      body.position.y = 1.8;
      body.castShadow = true;
      house.add(body);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(5.8, 1.8, 4), roofMat);
      roof.rotateY(Math.PI / 4);
      roof.position.y = 3.6 + 0.9;
      roof.scale.set(1.2, 1, 0.85);
      roof.castShadow = true;
      house.add(roof);

      villageGroup.add(house);
    });

    // Bamboo coracles (thúng chai) resting naturally along beach sands
    for (let b = 0; b < 10; b++) {
      const coracle = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        coracleMat
      );
      coracle.rotateX(Math.PI);
      coracle.position.set(420 + Math.sin(b * 1.4) * 3, 0.5, 840 + b * 8);
      villageGroup.add(coracle);
    }

    this.group.add(villageGroup);
  }

  /**
   * 5. Bến Phà Tam Hải & Tàu Phà Vượt Sông (Tam Hai Ferry Terminal & Boat)
   */
  private buildFerryTerminalAndBoat(): void {
    const ferryGroup = new THREE.Group();

    const jettyMat = new THREE.MeshStandardMaterial({ color: 0x757f87, roughness: 0.8 });
    const ferryMat = new THREE.MeshStandardMaterial({ color: 0x224c6e, roughness: 0.5 });
    const deckMat = new THREE.MeshStandardMaterial({ color: 0xdde3e8, roughness: 0.6 });

    // Concrete Ferry Slip / Jetty at island western shore (X: 405, Z: 855)
    const jetty = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 8.0), jettyMat);
    jetty.position.set(405, 0.5, 855);
    jetty.receiveShadow = true;
    ferryGroup.add(jetty);

    // Dynamic passenger ferry boat shuttling between Tam Quang (X: 340) and Tam Hải (X: 405)
    this.ferryBoat = new THREE.Group();
    this.ferryBoat.position.set(370, 0.35, 855);

    // Ferry hull (flat-bottom river ferry)
    const hull = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.4, 14), ferryMat);
    hull.position.y = 0.7;
    hull.castShadow = true;
    this.ferryBoat.add(hull);

    // Ferry deck with canopy
    const deck = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.2, 8.0), deckMat);
    deck.position.set(0, 1.4 + 1.1, 0);
    deck.castShadow = true;
    this.ferryBoat.add(deck);

    ferryGroup.add(this.ferryBoat);
    this.group.add(ferryGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(delta: number, elapsed: number, _nightGlowIntensity: number): void {
    // 1. Gently pulse surf foams against Ban Than black rocks
    this.waveFoams.forEach((f, idx) => {
      const s = 1.0 + Math.sin(elapsed * 2.5 + idx) * 0.15;
      f.scale.set(s, s, s);
    });

    // 2. Slow river ferry shuttle across An Hòa Bay water channel
    if (this.ferryBoat) {
      this.ferryX += this.ferryDirection * delta * 4.5;
      if (this.ferryX > 402) this.ferryDirection = -1;
      if (this.ferryX < 342) this.ferryDirection = 1;
      this.ferryBoat.position.x = this.ferryX;
      this.ferryBoat.rotation.y = this.ferryDirection > 0 ? 0 : Math.PI;
      this.ferryBoat.rotation.z = Math.sin(elapsed * 2.0) * 0.02;
    }
  }
}
