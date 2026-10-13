import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Tiến (Huyện Núi Thành) - "Chợ Cá Bãi Biển Tam Tiến & Bờ Biển Duyên Hải"
 * Xã ven biển phía Bắc huyện Núi Thành:
 * - Chợ cá Tam Tiến họp trên bãi biển lúc bình minh - nét văn hóa biển độc đáo bậc nhất miền Trung
 * - Hàng chục thuyền thúng nan tre, ghe đánh cá và khay hải sản tươi rói
 * - Bờ biển cát trắng mịn dài tít tắp cùng rặng phi lao xanh rì rào trong gió biển
 * - Tuyến đường ven biển Võ Chí Công chạy dọc qua xã
 */
export class TamTienCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-tien-commune',
        name: 'Xã Tam Tiến',
        nameEn: 'Tam Tien Coastal Commune',
        type: 'commune',
        areaKm2: 21.6,
        description:
          'Xã ven biển nổi tiếng với Chợ cá Tam Tiến họp ngay trên mép sóng lúc rạng đông, thu hút đông đảo du khách và nhiếp ảnh gia trải nghiệm văn hóa làng chài truyền thống.',
        cameraPreset: {
          position: [315, 38, 550],
          target: [345, 4, 580],
        },
        subLandmarks: [
          {
            id: 'cho-ca-tam-tien',
            name: '🐟 Chợ Cá Bãi Biển Bình Minh',
            category: 'cultural',
            cameraPreset: { position: [330, 20, 565], target: [350, 2, 580] },
            description: 'Khung cảnh chợ cá họp nhộn nhịp trên bãi cát lúc mặt trời mọc với hàng trăm thúng chai cập bờ.',
          },
          {
            id: 'bo-bien-tam-tien',
            name: '🏖️ Bãi Tắm Cát Trắng & Rặng Phi Lao',
            category: 'nature',
            cameraPreset: { position: [320, 32, 560], target: [360, 2, 595] },
            description: 'Dải bờ cát trắng tinh khôi và rừng phi lao chắn cát chắn gió che chở xóm chài.',
          },
        ],
      },
      {
        minX: 300,
        maxX: 390,
        minZ: 530,
        maxZ: 620,
      }
    );

    this.buildBeachFishMarket();
    this.buildCasuarinaCoastalBelt();
  }

  /**
   * 1. Chợ cá Tam Tiến trên bãi biển bình minh (Beach Fish Market)
   */
  private buildBeachFishMarket(): void {
    const marketGroup = new THREE.Group();
    marketGroup.position.set(350, 0, 580);

    const sandMat = new THREE.MeshStandardMaterial({ color: 0xe6d4b2, roughness: 0.95 });
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0x9e7b4b, roughness: 0.85 });
    const basketMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.7 });
    const blueTarpMat = new THREE.MeshStandardMaterial({ color: 0x1f669e, roughness: 0.6 });

    // Sandy beach strip
    const beach = new THREE.Mesh(new THREE.PlaneGeometry(35, 45), sandMat);
    beach.rotateX(-Math.PI / 2);
    beach.position.y = 0.38;
    beach.receiveShadow = true;
    marketGroup.add(beach);

    // 12 Bamboo Coracles (Thuyền thúng nan tre)
    const coracleGeo = new THREE.CylinderGeometry(1.4, 1.1, 0.75, 12);
    for (let i = 0; i < 12; i++) {
      const coracle = new THREE.Mesh(coracleGeo, bambooMat);
      const cx = (Math.random() - 0.5) * 24 + 4;
      const cz = (Math.random() - 0.5) * 32;
      coracle.position.set(cx, 0.65, cz);
      coracle.rotation.y = Math.random() * Math.PI;
      coracle.castShadow = true;
      marketGroup.add(coracle);

      // Colorful fish basket inside
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.4, 0.3, 8), basketMat);
      basket.position.set(cx, 0.95, cz);
      marketGroup.add(basket);
    }

    // Market stalls with blue & yellow tarps (Bạt che chợ cá)
    [-8, 6].forEach((tx, i) => {
      const tarp = new THREE.Mesh(new THREE.PlaneGeometry(8, 6), blueTarpMat);
      tarp.rotateX(-Math.PI / 2);
      tarp.position.set(tx, 2.4, i * 10 - 5);
      marketGroup.add(tarp);

      // 4 wooden poles
      [-3.5, 3.5].forEach((px) => {
        [-2.5, 2.5].forEach((pz) => {
          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 6), bambooMat);
          pole.position.set(tx + px, 1.2, i * 10 - 5 + pz);
          marketGroup.add(pole);
        });
      });
    });

    this.group.add(marketGroup);
  }

  /**
   * 2. Rặng phi lao ven biển chắn gió (Casuarina Windbreak Belt)
   */
  private buildCasuarinaCoastalBelt(): void {
    const pineGroup = new THREE.Group();
    pineGroup.position.set(330, 0, 580);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x22552e, roughness: 0.85 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x423425, roughness: 0.9 });

    const treeGeo = new THREE.ConeGeometry(1.2, 7.2, 7);
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 3.0, 6);
    const count = 35;

    const treesMesh = new THREE.InstancedMesh(treeGeo, foliageMat, count);
    const trunksMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 55;

      dummy.position.set(x, 1.5, z);
      dummy.updateMatrix();
      trunksMesh.setMatrixAt(i, dummy.matrix);

      dummy.position.set(x, 4.8, z);
      dummy.scale.set(0.9 + Math.random() * 0.3, 0.9 + Math.random() * 0.4, 0.9 + Math.random() * 0.3);
      dummy.updateMatrix();
      treesMesh.setMatrixAt(i, dummy.matrix);
    }

    treesMesh.instanceMatrix.needsUpdate = true;
    trunksMesh.instanceMatrix.needsUpdate = true;
    pineGroup.add(trunksMesh, treesMesh);

    this.group.add(pineGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
