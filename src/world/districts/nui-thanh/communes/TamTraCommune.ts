import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Trà (Huyện Núi Thành) - "Vùng Cao Đại Ngàn & Văn Hóa Đồng Bào Kor"
 * Vùng đất miền núi phía Tây Nam Núi Thành giáp ranh Trà Bồng (Quảng Ngãi):
 * - Dãy núi Hòn Tàu sừng sững cao 953m quanh năm sương mây bao phủ
 * - Làng đồng bào dân tộc thiểu số Kor với những nếp nhà sàn gỗ truyền thống
 * - Cầu treo dây văng bắc qua dòng suối đá tự nhiên
 * - Vườn đồi quế Trà Bồng thơm ngát và ruộng bậc thang uốn lượn ven sườn đồi
 */
export class TamTraCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-tra-commune',
        name: 'Xã Tam Trà',
        nameEn: 'Tam Tra Highland Commune',
        type: 'commune',
        areaKm2: 97.2,
        description:
          'Xã vùng cao có diện tích tự nhiên lớn nhất huyện Núi Thành (gần 100 km²). Nơi lưu giữ bản sắc văn hóa độc đáo của đồng bào dân tộc Kor, rừng nguyên sinh đại ngàn và đỉnh Hòn Tàu 953m.',
        cameraPreset: {
          position: [-95, 36, 825],
          target: [-120, 8, 875],
        },
        subLandmarks: [
          {
            id: 'tam-tra-overview',
            name: '👁️ Toàn Cảnh Xã Tam Trà',
            category: 'nature',
            cameraPreset: { position: [-95, 120, 780], target: [-120, 16, 870] },
            description: 'Toàn cảnh thung lũng vùng cao Tam Trà nằm lọt thỏm giữa dãy núi Hòn Tàu và rừng già.',
          },
          {
            id: 'lang-dong-bao-kor',
            name: '🏡 Bản Làng Đồng Bào Kor',
            category: 'cultural',
            cameraPreset: { position: [-105, 32, 855], target: [-120, 12, 875] },
            description: 'Khu nhà sàn truyền thống bằng gỗ lim và tre nứa của đồng bào Kor bên sườn suối đá.',
          },
          {
            id: 'cau-treo-tam-tra',
            name: '🌉 Cầu Treo Vượt Suối',
            category: 'bridge',
            cameraPreset: { position: [-95, 26, 835], target: [-110, 10, 850] },
            description: 'Cầu treo dân sinh dây cáp thép nối đôi bờ con suối Trầu cuồn cuộn mùa mưa lũ.',
          },
          {
            id: 'doi-que-hon-tau',
            name: '🌿 Đồi Quế & Rừng Đại Ngàn',
            category: 'nature',
            cameraPreset: { position: [-120, 48, 840], target: [-140, 28, 880] },
            description: 'Vùng đồi trồng quế hương và rừng phòng hộ đầu nguồn che chắn bão lũ.',
          },
        ],
      },
      {
        minX: -190,
        maxX: -50,
        minZ: 800,
        maxZ: 960,
      }
    );

    this.buildStiltVillage();
    this.buildSuspensionBridge();
    this.buildTerracedPlotsAndCinnamonGroves();
  }

  /**
   * 1. Bản làng nhà sàn truyền thống của đồng bào Kor (Kor Stilt Village)
   */
  private buildStiltVillage(): void {
    const villageGroup = new THREE.Group();
    villageGroup.position.set(-120, 6.5, 875);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.85 });
    const thatchMat = new THREE.MeshStandardMaterial({ color: 0x8a7348, roughness: 0.9 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x737a78, roughness: 0.95 });

    // 8 houses on stilts
    const houseCoords = [
      { x: -14, z: -10, rot: 0.1 },
      { x: 2, z: -16, rot: -0.2 },
      { x: 16, z: -8, rot: 0.15 },
      { x: -22, z: 8, rot: 0.3 },
      { x: -6, z: 6, rot: -0.1 },
      { x: 12, z: 12, rot: 0.25 },
      { x: 28, z: 4, rot: -0.15 },
      { x: 0, z: 24, rot: 0.05 },
    ];

    houseCoords.forEach((hc) => {
      const house = new THREE.Group();
      house.position.set(hc.x, 0, hc.z);
      house.rotation.y = hc.rot;

      // 6 wooden stilts
      [-3.2, 0, 3.2].forEach((sx) => {
        [-2.0, 2.0].forEach((sz) => {
          const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 3.2, 6), woodMat);
          stilt.position.set(sx, 1.6, sz);
          stilt.castShadow = true;
          house.add(stilt);
        });
      });

      // Raised bamboo floor
      const floor = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.3, 5.2), woodMat);
      floor.position.set(0, 3.2, 0);
      house.add(floor);

      // Woven bamboo walls
      const walls = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.8, 4.8), woodMat);
      walls.position.set(0, 4.6, 0);
      walls.castShadow = true;
      house.add(walls);

      // Thatched curved gabled roof
      const roof = new THREE.Mesh(new THREE.ConeGeometry(5.4, 2.8, 4), thatchMat);
      roof.rotateY(Math.PI / 4);
      roof.scale.set(1.5, 1, 0.95);
      roof.position.set(0, 6.0 + 1.4, 0);
      roof.castShadow = true;
      house.add(roof);

      // Wooden ladder leading up to veranda
      const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.4, 0.15), woodMat);
      ladder.rotateX(-0.4);
      ladder.position.set(0, 1.6, 2.6);
      house.add(ladder);

      villageGroup.add(house);
    });

    // Central village communal fire ring and totemic tree
    const fireRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.4, 8, 16), stoneMat);
    fireRing.rotateX(Math.PI / 2);
    fireRing.position.set(0, 0.2, 0);
    villageGroup.add(fireRing);

    this.group.add(villageGroup);
  }

  /**
   * 2. Cầu treo dây văng vượt dòng suối Trầu (Suspension Bridge)
   */
  private buildSuspensionBridge(): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(-110, 5.2, 850);

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x36454f, metalness: 0.8, roughness: 0.3 });
    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x735c44, roughness: 0.9 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x1b495c, roughness: 0.2, metalness: 0.6 });

    // Rocky stream bed
    const stream = new THREE.Mesh(new THREE.PlaneGeometry(16, 60), waterMat);
    stream.rotateX(-Math.PI / 2);
    stream.position.set(0, 0.2, 0);
    bridgeGroup.add(stream);

    // Twin suspension towers
    [-18, 18].forEach((tx) => {
      const pylonGeo = new THREE.CylinderGeometry(0.3, 0.4, 8.5, 8);
      [-1.5, 1.5].forEach((tz) => {
        const pylon = new THREE.Mesh(pylonGeo, steelMat);
        pylon.position.set(tx, 4.25, tz);
        pylon.castShadow = true;
        bridgeGroup.add(pylon);
      });
      // Crossbeam
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 3.4), steelMat);
      cross.position.set(tx, 7.8, 0);
      bridgeGroup.add(cross);
    });

    // Wooden deck walkway
    const deck = new THREE.Mesh(new THREE.BoxGeometry(36, 0.25, 2.8), woodPlankMat);
    deck.position.set(0, 3.2, 0);
    deck.castShadow = true;
    bridgeGroup.add(deck);

    // Main sagging suspension cables
    [-1.4, 1.4].forEach((cz) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-18, 7.8, cz),
        new THREE.Vector3(0, 3.6, cz),
        new THREE.Vector3(18, 7.8, cz),
      ]);
      const cableGeo = new THREE.TubeGeometry(curve, 24, 0.08, 6, false);
      const cable = new THREE.Mesh(cableGeo, steelMat);
      bridgeGroup.add(cable);
    });

    this.group.add(bridgeGroup);
  }

  /**
   * 3. Vườn quế và ruộng bậc thang uốn lượn ven sườn đồi
   */
  private buildTerracedPlotsAndCinnamonGroves(): void {
    const natureGroup = new THREE.Group();
    natureGroup.position.set(-140, 7.0, 880);

    const cinnamonFoliageMat = new THREE.MeshStandardMaterial({ color: 0x24572c, roughness: 0.8 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3525, roughness: 0.9 });
    const terraceSoilMat = new THREE.MeshStandardMaterial({ color: 0x5c4228, roughness: 0.95 });

    // Stepped agricultural terraces
    for (let t = 0; t < 5; t++) {
      const stepGeo = new THREE.BoxGeometry(32 - t * 3, 1.4, 22 - t * 2);
      const step = new THREE.Mesh(stepGeo, terraceSoilMat);
      step.position.set(0, t * 1.4 + 0.7, t * 2.5);
      step.receiveShadow = true;
      natureGroup.add(step);
    }

    // Instanced Cinnamon Trees (Cây quế Trà Bồng)
    const treeGeo = new THREE.ConeGeometry(1.6, 5.0, 7);
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.25, 2.2, 6);
    const treeCount = 45;

    const treesMesh = new THREE.InstancedMesh(treeGeo, cinnamonFoliageMat, treeCount);
    const trunksMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCount);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < treeCount; i++) {
      const tx = (Math.random() - 0.5) * 55;
      const tz = (Math.random() - 0.5) * 45;
      const ty = Math.sin(tx * 0.05) * 4 + 4;

      dummy.position.set(tx, ty + 1.1, tz);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      trunksMesh.setMatrixAt(i, dummy.matrix);

      dummy.position.set(tx, ty + 2.2 + 2.5, tz);
      dummy.scale.set(0.9 + Math.random() * 0.4, 0.9 + Math.random() * 0.4, 0.9 + Math.random() * 0.4);
      dummy.updateMatrix();
      treesMesh.setMatrixAt(i, dummy.matrix);
    }

    treesMesh.instanceMatrix.needsUpdate = true;
    trunksMesh.instanceMatrix.needsUpdate = true;
    treesMesh.castShadow = true;
    natureGroup.add(trunksMesh, treesMesh);

    this.group.add(natureGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
