import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Giang (Huyện Núi Thành) - "Ngã Ba Cửa Sông & Rừng Dừa Nước Bạt Ngàn"
 * Vùng ngập mặn sinh thái tại ngã ba sông An Tân đổ ra vịnh An Hòa:
 * - Cầu Tam Giang bắc qua sông kết nối mạng lưới giao thông huyện
 * - Hệ sinh thái rừng dừa nước Cồn Nổi bạt ngàn che chắn bờ sông
 * - Bến đò Tam Giang và các ghe thuyền câu tôm cá nước lợ
 * - Vùng nuôi hàu, vọp và các loài thủy sản hai mảnh vỏ
 */
export class TamGiangCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-giang-commune',
        name: 'Xã Tam Giang',
        nameEn: 'Tam Giang Estuary Commune',
        type: 'commune',
        areaKm2: 11.5,
        description:
          'Xã sông nước nằm tại ngã ba sông An Tân hòa mình vào Vịnh An Hòa, nổi danh với rừng dừa nước Cồn Nổi nguyên sinh và nghề chài lưới ven sông.',
        cameraPreset: {
          position: [255, 45, 785],
          target: [280, 3, 810],
        },
        subLandmarks: [
          {
            id: 'cau-tam-giang',
            name: '🌉 Cầu Tam Giang Vượt Sông',
            category: 'bridge',
            cameraPreset: { position: [265, 24, 795], target: [285, 3, 810] },
            description: 'Cây cầu bê tông vượt sông kết nối giao thương giữa xã Tam Giang và thị trấn Núi Thành.',
          },
          {
            id: 'rung-dua-nuoc-tam-giang',
            name: '🌴 Rừng Dừa Nước Cồn Nổi',
            category: 'nature',
            cameraPreset: { position: [275, 22, 815], target: [295, 2, 830] },
            description: 'Những rặng dừa nước rậm rạp xanh mát soi bóng dòng nước lợ êm đềm.',
          },
        ],
      },
      {
        minX: 240,
        maxX: 320,
        minZ: 770,
        maxZ: 850,
      }
    );

    this.buildTamGiangBridge();
    this.buildNipaPalmGrovesAndBoats();
  }

  /**
   * Cầu Tam Giang vượt sông
   */
  private buildTamGiangBridge(): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(275, 0, 805);

    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.6 });
    const pierMat = new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.8 });

    // Deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(28, 0.7, 7.0), bridgeMat);
    deck.position.set(0, 2.0, 0);
    deck.castShadow = true;
    bridgeGroup.add(deck);

    // Piers
    [-8, 8].forEach((px) => {
      const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 3.2, 8), pierMat);
      pier.position.set(px, 0.8, 0);
      bridgeGroup.add(pier);
    });

    this.group.add(bridgeGroup);
  }

  /**
   * Rừng dừa nước và thuyền chài
   */
  private buildNipaPalmGrovesAndBoats(): void {
    const palmGroup = new THREE.Group();
    palmGroup.position.set(295, 0, 825);

    const palmGreenMat = new THREE.MeshStandardMaterial({ color: 0x2e6b2e, roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d24, roughness: 0.85 });

    // Instanced Nipa Palms
    const frondGeo = new THREE.ConeGeometry(1.0, 4.2, 5);
    const palmCount = 36;
    const palmMesh = new THREE.InstancedMesh(frondGeo, palmGreenMat, palmCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < palmCount; i++) {
      const px = (Math.random() - 0.5) * 26;
      const pz = (Math.random() - 0.5) * 20;
      dummy.position.set(px, 2.1, pz);
      dummy.rotation.z = (Math.random() - 0.5) * 0.4;
      dummy.rotation.x = (Math.random() - 0.5) * 0.4;
      dummy.updateMatrix();
      palmMesh.setMatrixAt(i, dummy.matrix);
    }
    palmMesh.instanceMatrix.needsUpdate = true;
    palmGroup.add(palmMesh);

    // 2 wooden fishing boats
    [-6, 6].forEach((bx, i) => {
      const boat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 6.5), woodMat);
      boat.position.set(bx, 0.35, i * 4.5);
      boat.castShadow = true;
      palmGroup.add(boat);
    });

    this.group.add(palmGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
