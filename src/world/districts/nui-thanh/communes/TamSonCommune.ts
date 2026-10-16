import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';
import { getNuiThanhElevation } from '@/world/terrain/ReliefTerrain';

/**
 * Xã Tam Sơn (Huyện Núi Thành) - "Lòng Hồ Thủy Lợi Sinh Thái & Rừng Đầu Nguồn"
 * Xã miền núi phía Tây Bắc huyện sở hữu hệ thống sinh thái hồ nước ngọt lớn nhất:
 * - Vùng mặt nước hồ thủy lợi mênh mông (Hồ Hố Khế & nhánh nam Hồ Phú Ninh) ở cao độ 12m
 * - Đập bê tông trọng lực & cống xả tràn kiên cố điều tiết lũ, cung cấp nước ngọt toàn vùng Chu Lai
 * - Bến thuyền du lịch sinh thái, cano khám phá lòng hồ
 * - Đảo nổi sinh thái giữa hồ với rừng thông và lầu vọng cảnh ngắm mây trời
 */
export class TamSonCommune extends BaseWard {
  private readonly LAKE_WATER_Y = 12.0;

  constructor() {
    super(
      {
        id: 'tam-son-commune',
        name: 'Xã Tam Sơn',
        nameEn: 'Tam Son Eco-Lake Commune',
        type: 'commune',
        areaKm2: 54.2,
        description:
          'Xã sinh thái hồ nước ngọt lớn nhất huyện Núi Thành, sở hữu cảnh quan lòng hồ Hố Khế thơ mộng, đập tràn thủy lợi kiên cố và nguồn nước ngọt dồi dào nuôi sống cả vùng công nghiệp Chu Lai.',
        cameraPreset: {
          position: [32, 42, 660],
          target: [-60, 12, 712],
        },
        subLandmarks: [
          {
            id: 'dap-tran-tam-son',
            name: '🧱 Đập Tràn Thủy Lợi Hố Khế',
            category: 'cultural',
            cameraPreset: { position: [-10, 36, 680], target: [-34, 12, 712] },
            description: 'Công trình đập ngăn nước bê tông cốt thép kiên cố và cống xả tràn bậc thang điều tiết lũ.',
          },
          {
            id: 'ben-thuyen-tam-son',
            name: '🚤 Bến Thuyền Sinh Thái Lòng Hồ',
            category: 'transport',
            cameraPreset: { position: [-40, 24, 755], target: [-56, 12, 725] },
            description: 'Bến đỗ cano du lịch phục vụ du khách khám phá các ốc đảo nổi và ngắm hoàng hôn sơn thủy.',
          },
          {
            id: 'dao-sinh-thai-tam-son',
            name: '🏝️ Đảo Nổi Sinh Thái Giữa Hồ',
            category: 'nature',
            cameraPreset: { position: [-65, 30, 685], target: [-85, 13, 712] },
            description: 'Hòn đảo xanh ngát giữa lòng hồ với rừng thông bạt ngàn và chòi nghỉ chân vọng cảnh.',
          },
        ],
      },
      {
        minX: -160,
        maxX: -20,
        minZ: 640,
        maxZ: 770,
      }
    );

    this.buildElevatedReservoirWater();
    this.buildDamAndSpillway();
    this.buildEcoBoatDock();
    this.buildLakeIsletSanctuary();
  }

  /**
   * 1. Mặt nước hồ chứa nước ngọt trên cao (y = 12.0)
   */
  private buildElevatedReservoirWater(): void {
    const waterGroup = new THREE.Group();

    // High quality mountain lake water material
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x15758f,
      roughness: 0.12,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92,
    });

    // Circular/oval mountain lake water disc
    const waterGeo = new THREE.CylinderGeometry(45.5, 45.5, 0.4, 48);
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(-72, this.LAKE_WATER_Y, 712);
    waterMesh.receiveShadow = true;
    waterGroup.add(waterMesh);

    // Lake water subtle sun glistening ripple ring
    const ringGeo = new THREE.RingGeometry(15, 38, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0x80deea,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(ringGeo, rippleMat);
    rippleMesh.position.set(-72, this.LAKE_WATER_Y + 0.22, 712);
    waterGroup.add(rippleMesh);

    this.group.add(waterGroup);
  }

  /**
   * 2. Đập ngăn nước bê tông trọng lực & cống xả tràn Hố Khế
   */
  private buildDamAndSpillway(): void {
    const damGroup = new THREE.Group();
    damGroup.position.set(-34, 0, 712);

    const damConcreteMat = new THREE.MeshStandardMaterial({ color: 0x9eabb5, roughness: 0.65 });
    const controlHouseMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5 });
    const whiteWaterMat = new THREE.MeshStandardMaterial({ color: 0xe0f7fa, roughness: 0.25, metalness: 0.4 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.9 });

    // Main gravity dam concrete wall (X: 5.5 thickness, Height: 12m from y=3.5 to y=15.0, Length Z: 46m)
    const damWall = new THREE.Mesh(new THREE.BoxGeometry(5.5, 11.5, 46), damConcreteMat);
    damWall.position.set(0, 9.25, 0);
    damWall.castShadow = true;
    damWall.receiveShadow = true;
    damGroup.add(damWall);

    // Crest roadway with parapet rails on top (y = 15.0)
    const crestRoad = new THREE.Mesh(
      new THREE.BoxGeometry(6.2, 0.6, 46),
      new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.8 })
    );
    crestRoad.position.set(0, 15.3, 0);
    damGroup.add(crestRoad);

    // Safety guardrails along crest
    [-2.9, 2.9].forEach((rx) => {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.9, 46),
        new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.5 })
      );
      rail.position.set(rx, 16.0, 0);
      damGroup.add(rail);
    });

    // Central stepped spillway chute discharging downstream to the east (X: -31..-15)
    const chuteGeo = new THREE.BoxGeometry(16, 2.0, 18);
    chuteGeo.rotateZ(0.38); // Sloping downwards downstream
    const chute = new THREE.Mesh(chuteGeo, damConcreteMat);
    chute.position.set(7.5, 9.0, 0);
    chute.castShadow = true;
    damGroup.add(chute);

    // Cascading white-water foam over the spillway chute
    const foamGeo = new THREE.BoxGeometry(16.5, 0.4, 16);
    foamGeo.rotateZ(0.38);
    const foam = new THREE.Mesh(foamGeo, whiteWaterMat);
    foam.position.set(7.5, 9.8, 0);
    damGroup.add(foam);

    // Baffle dissipation teeth at the base of the chute
    [-6, 0, 6].forEach((bz) => {
      const block = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 2.5), damConcreteMat);
      block.position.set(15, 4.5, bz);
      damGroup.add(block);
    });

    // Downstream rocky discharge stream bed
    const streamPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 20),
      new THREE.MeshStandardMaterial({ color: 0x1d6a80, roughness: 0.2, metalness: 0.6 })
    );
    streamPlane.rotateX(-Math.PI / 2);
    streamPlane.position.set(22, 3.8, 0);
    damGroup.add(streamPlane);

    // Hydraulic control house on the crest
    const house = new THREE.Mesh(new THREE.BoxGeometry(7.0, 4.2, 9.0), controlHouseMat);
    house.position.set(0, 17.4, 0);
    house.castShadow = true;
    damGroup.add(house);

    // Pitched tile roof on control house
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(8.0, 1.4, 10.2),
      new THREE.MeshStandardMaterial({ color: 0xb71c1c, roughness: 0.5 })
    );
    roof.position.set(0, 19.9, 0);
    roof.castShadow = true;
    damGroup.add(roof);

    this.group.add(damGroup);
  }

  /**
   * 3. Bến thuyền du lịch sinh thái và cano tham quan lòng hồ
   */
  private buildEcoBoatDock(): void {
    const dockGroup = new THREE.Group();
    dockGroup.position.set(-56, this.LAKE_WATER_Y, 725);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });
    const boatHullMat = new THREE.MeshStandardMaterial({ color: 0x0277bd, roughness: 0.35, metalness: 0.2 });
    const boatCanopyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

    // Wooden walkway pier floating on the water
    const pier = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.45, 24), woodMat);
    pier.position.set(0, 0.25, 0);
    pier.castShadow = true;
    dockGroup.add(pier);

    // Floating pontoon barrels underneath
    for (let pz = -10; pz <= 10; pz += 5) {
      [-1.6, 1.6].forEach((px) => {
        const barrel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8),
          new THREE.MeshStandardMaterial({ color: 0x1e3a5f })
        );
        barrel.rotateX(Math.PI / 2);
        barrel.position.set(px, -0.2, pz);
        dockGroup.add(barrel);
      });
    }

    // Wooden ticket & lifejacket shelter at pier head
    const shelter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 4.0), woodMat);
    shelter.position.set(0, 1.6, -9.5);
    shelter.castShadow = true;
    dockGroup.add(shelter);

    const shelterRoof = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.6, 4.8),
      new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5 })
    );
    shelterRoof.position.set(0, 3.2, -9.5);
    dockGroup.add(shelterRoof);

    // 3 Tour Speedboats / Canos moored along the pier
    const boatPositions = [
      { x: -3.8, z: -3 },
      { x: -3.8, z: 6 },
      { x: 3.8, z: 2 },
    ];

    boatPositions.forEach((bp) => {
      const boat = new THREE.Group();
      boat.position.set(bp.x, 0.1, bp.z);

      // Hull
      const hull = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 7.2), boatHullMat);
      hull.position.y = 0.35;
      hull.castShadow = true;
      boat.add(hull);

      // White sun canopy
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 4.2), boatCanopyMat);
      canopy.position.set(0, 1.5, 0);
      boat.add(canopy);

      // Canopy poles
      [-0.9, 0.9].forEach((cx) => {
        [-1.8, 1.8].forEach((cz) => {
          const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6),
            new THREE.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.8 })
          );
          pole.position.set(cx, 0.9, cz);
          boat.add(pole);
        });
      });

      dockGroup.add(boat);
    });

    this.group.add(dockGroup);
  }

  /**
   * 4. Đảo nổi sinh thái giữa lòng hồ với rừng thông và lầu vọng cảnh
   */
  private buildLakeIsletSanctuary(): void {
    const isletGroup = new THREE.Group();
    isletGroup.position.set(-85, this.LAKE_WATER_Y, 712);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x33691e, roughness: 0.85 });
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.8 });
    const gazeboRoofMat = new THREE.MeshStandardMaterial({ color: 0xc62828, roughness: 0.5 });

    // Island landform rising from water up to y = 15.5 (+3.5m above water)
    const islet = new THREE.Mesh(new THREE.CylinderGeometry(10, 16, 4.0, 20), grassMat);
    islet.position.set(0, 1.2, 0);
    islet.receiveShadow = true;
    isletGroup.add(islet);

    // Pine trees on the island
    for (let t = 0; t < 9; t++) {
      const angle = (t / 9) * Math.PI * 2 + 0.3;
      const dist = 4.2 + (t % 3) * 2.2;
      const tree = new THREE.Group();
      tree.position.set(Math.cos(angle) * dist, 3.2, Math.sin(angle) * dist);

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.25, 2.0, 6),
        new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })
      );
      trunk.position.y = 1.0;
      tree.add(trunk);

      // 2 tiers of pine foliage
      const foliage1 = new THREE.Mesh(new THREE.ConeGeometry(2.0, 3.6, 7), pineMat);
      foliage1.position.y = 3.2;
      foliage1.castShadow = true;
      tree.add(foliage1);

      const foliage2 = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.6, 7), pineMat);
      foliage2.position.y = 5.0;
      foliage2.castShadow = true;
      tree.add(foliage2);

      isletGroup.add(tree);
    }

    // Octagonal wooden gazebo / lookout pavilion on island summit
    const gazebo = new THREE.Group();
    gazebo.position.set(0, 3.2, 0);

    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.5, 8), woodMat);
    platform.position.y = 0.25;
    gazebo.add(platform);

    // 8 pillars
    for (let p = 0; p < 8; p++) {
      const pa = (p / 8) * Math.PI * 2;
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 3.2, 6),
        woodMat
      );
      pillar.position.set(Math.cos(pa) * 2.8, 1.85, Math.sin(pa) * 2.8);
      gazebo.add(pillar);
    }

    // Curved Asian gazebo roof
    const gRoof = new THREE.Mesh(new THREE.ConeGeometry(4.2, 2.0, 8), gazeboRoofMat);
    gRoof.position.y = 4.4;
    gRoof.castShadow = true;
    gazebo.add(gRoof);

    isletGroup.add(gazebo);

    this.group.add(isletGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
