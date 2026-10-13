import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Mỹ Tây (Huyện Núi Thành) - "Tuyệt Tác Thác 11 Tầng Hố Giang Thơm"
 * Vùng đất sinh thái trù phú nằm ở sườn Đông núi Hòn Tàu:
 * - Danh thắng tự nhiên Thác 11 tầng Hố Giang Thơm tuôn trào qua các gờ đá hoa cương
 * - Hồ nước xanh biếc dưới chân thác cho du khách tắm mát
 * - Rừng nguyên sinh Tam Mỹ Tây với thảm thực vật phong phú
 * - Vườn cây ăn trái, trang trại chăn nuôi đồi núi và các đập thủy lợi nhỏ
 */
export class TamMyTayCommune extends BaseWard {
  private waterfallFoam: THREE.Mesh[] = [];

  constructor() {
    super(
      {
        id: 'tam-my-tay-commune',
        name: 'Xã Tam Mỹ Tây',
        nameEn: 'Tam My Tay Commune',
        type: 'commune',
        areaKm2: 52.8,
        description:
          'Xã sinh thái nổi danh với Thắng cảnh Thác 11 tầng Hố Giang Thơm - kỳ quan thác nước tự nhiên giữa rừng già nguyên sinh và các vùng gò đồi cây trái xum xuê.',
        cameraPreset: {
          position: [-10, 36, 800],
          target: [15, 8, 825],
        },
        subLandmarks: [
          {
            id: 'ho-giang-thom',
            name: '🌊 Thác 11 Tầng Hố Giang Thơm',
            category: 'nature',
            cameraPreset: { position: [-15, 24, 815], target: [15, 8, 825] },
            description: 'Tuyệt tác thiên nhiên 11 tầng thác nước đổ bọt trắng xóa qua các bậc đá hoa cương nguyên khối.',
          },
          {
            id: 'tam-my-tay-farms',
            name: '🍊 Trang Trại Cây Ăn Trái',
            category: 'nature',
            cameraPreset: { position: [5, 28, 835], target: [25, 6, 845] },
            description: 'Vườn cam, bưởi, sầu riêng và trang trại gà đồi của bà con nông dân Tam Mỹ Tây.',
          },
        ],
      },
      {
        minX: -15,
        maxX: 60,
        minZ: 790,
        maxZ: 865,
      }
    );

    this.buildHoGiangThomWaterfall();
    this.buildFruitOrchardsAndHamlets();
  }

  /**
   * 1. Tuyệt tác Danh Thắng Thác 11 Tầng Hố Giang Thơm
   */
  private buildHoGiangThomWaterfall(): void {
    const fallGroup = new THREE.Group();
    fallGroup.position.set(15, 0, 825);

    const rockMat = new THREE.MeshStandardMaterial({ color: 0x47494d, roughness: 0.9 });
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x2288aa,
      roughness: 0.15,
      metalness: 0.75,
      transparent: true,
      opacity: 0.85,
    });
    const foamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });

    // 11 granite rock steps (11 tầng thác đá)
    for (let t = 0; t < 11; t++) {
      const rockGeo = new THREE.BoxGeometry(16 - t * 0.8, 1.2, 7.5);
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(0, (11 - t) * 1.2, -t * 4.2);
      rock.receiveShadow = true;
      fallGroup.add(rock);

      // Water sheets falling down
      const sheetGeo = new THREE.PlaneGeometry(10 - t * 0.6, 3.8);
      sheetGeo.rotateX(-0.55);
      const sheet = new THREE.Mesh(sheetGeo, waterMat);
      sheet.position.set(0, (11 - t) * 1.2 - 0.4, -t * 4.2 + 3.2);
      fallGroup.add(sheet);

      // Foaming splash at base of each cascade
      const foam = new THREE.Mesh(new THREE.BoxGeometry(11 - t * 0.6, 0.35, 1.4), foamMat);
      foam.position.set(0, (11 - t) * 1.2 - 0.9, -t * 4.2 + 4.2);
      this.waterfallFoam.push(foam);
      fallGroup.add(foam);
    }

    // Large turquoise base plunge pool (Hồ nước xanh biếc dưới chân thác)
    const poolGeo = new THREE.CylinderGeometry(18, 20, 1.2, 24);
    const pool = new THREE.Mesh(poolGeo, waterMat);
    pool.position.set(0, 0.4, 18);
    pool.receiveShadow = true;
    fallGroup.add(pool);

    // Granite boulders framing the pool
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const bx = Math.cos(angle) * 19;
      const bz = Math.sin(angle) * 19 + 18;
      const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2 + Math.random() * 1.5), rockMat);
      boulder.position.set(bx, 0.8, bz);
      boulder.castShadow = true;
      fallGroup.add(boulder);
    }

    this.group.add(fallGroup);
  }

  /**
   * 2. Vườn cây ăn trái và nhà dân nông thôn mới
   */
  private buildFruitOrchardsAndHamlets(): void {
    const farmGroup = new THREE.Group();
    farmGroup.position.set(30, 0, 845);

    const houseMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.65 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb53528, roughness: 0.4 });
    const orchardMat = new THREE.MeshStandardMaterial({ color: 0x3d7e35, roughness: 0.8 });

    // Rural village houses
    [-12, 0, 14].forEach((hx, i) => {
      const house = new THREE.Mesh(new THREE.BoxGeometry(6.5, 4.2, 5.0), houseMat);
      house.position.set(hx, 2.1, i * 6);
      house.castShadow = true;
      farmGroup.add(house);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(5.0, 2.2, 4), roofMat);
      roof.rotateY(Math.PI / 4);
      roof.scale.set(1.4, 1, 1.1);
      roof.position.set(hx, 4.2 + 1.1, i * 6);
      roof.castShadow = true;
      farmGroup.add(roof);
    });

    // Instanced fruit orchard trees (Cây ăn quả)
    const treeGeo = new THREE.SphereGeometry(1.6, 8, 8);
    const treeCount = 28;
    const orchardMesh = new THREE.InstancedMesh(treeGeo, orchardMat, treeCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < treeCount; i++) {
      const tx = ((i % 7) - 3) * 4.5;
      const tz = Math.floor(i / 7) * 4.5 - 15;
      dummy.position.set(tx, 2.8, tz);
      dummy.scale.set(1 + Math.random() * 0.3, 1 + Math.random() * 0.4, 1 + Math.random() * 0.3);
      dummy.updateMatrix();
      orchardMesh.setMatrixAt(i, dummy.matrix);
    }
    orchardMesh.instanceMatrix.needsUpdate = true;
    farmGroup.add(orchardMesh);

    this.group.add(farmGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, elapsed: number, _nightGlowIntensity: number): void {
    // Pulse water foam shimmer
    this.waterfallFoam.forEach((foam, idx) => {
      (foam.material as THREE.MeshBasicMaterial).opacity = 0.65 + Math.sin(elapsed * 8.0 + idx) * 0.25;
    });
  }
}
