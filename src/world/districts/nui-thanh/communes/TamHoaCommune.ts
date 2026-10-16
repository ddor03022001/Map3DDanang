import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Hòa (Huyện Núi Thành) - "Cầu Tam Hòa & Đầm Nước Lợ Sông Trường Giang"
 * Xã ven sông nước lợ nằm dọc bờ Tây sông Trường Giang:
 * - Cầu Tam Hòa bê tông cốt thép hiện đại vượt sông Trường Giang
 * - Làng nghề nuôi trồng thủy sản nước lợ, bè nuôi cá bớp, cá chẽm
 * - Hệ sinh thái rừng ngập mặn và rặng dừa nước
 */
export class TamHoaCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-hoa-commune',
        name: 'Xã Tam Hòa',
        nameEn: 'Tam Hoa Estuary Commune',
        type: 'commune',
        areaKm2: 22.8,
        description:
          'Xã sông nước đặc thù dọc sông Trường Giang, sở hữu Cầu Tam Hòa kết nối đôi bờ, vựa nuôi trồng thủy sản nước lợ và phong cảnh sông nước hữu tình.',
        cameraPreset: {
          position: [280, 42, 630],
          target: [310, 4, 660],
        },
        subLandmarks: [
          {
            id: 'cau-tam-hoa',
            name: '🌉 Cầu Tam Hòa Vượt Sông',
            category: 'bridge',
            cameraPreset: { position: [290, 24, 730], target: [315, 3, 660] },
            description: 'Cây cầu bê tông vượt sông Trường Giang mở ra tiềm năng phát triển kinh tế biển cho xã.',
          },
          {
            id: 'long-be-tam-hoa',
            name: '🐟 Lồng Bè Nuôi Cá Sông Trường Giang',
            category: 'nature',
            cameraPreset: { position: [300, 20, 750], target: [320, 2, 680] },
            description: 'Các cụm lồng bè nuôi cá chẽm, cá hồng và tôm nước lợ trên dòng sông êm đềm.',
          },
        ],
      },
      {
        minX: 270,
        maxX: 350,
        minZ: 625,
        maxZ: 695,
      }
    );

    this.buildTamHoaBridge();
    this.buildFishFarmingCages();
  }

  /**
   * 1. Cầu Tam Hòa vượt sông Trường Giang
   */
  private buildTamHoaBridge(): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(315, 0, 660);

    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.6 });
    const pierMat = new THREE.MeshStandardMaterial({ color: 0x6c757d, roughness: 0.8 });

    // Bridge deck (width 6, length 38 crossing East-West across river)
    const deck = new THREE.Mesh(new THREE.BoxGeometry(38, 0.6, 6.0), bridgeMat);
    deck.position.set(0, 1.8, 0);
    deck.castShadow = true;
    bridgeGroup.add(deck);

    // 3 pairs of round piers
    [-12, 0, 12].forEach((px) => {
      [-2.2, 2.2].forEach((pz) => {
        const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 2.4, 8), pierMat);
        pier.position.set(px, 0.9, pz);
        bridgeGroup.add(pier);
      });
    });

    this.group.add(bridgeGroup);
  }

  /**
   * 2. Lồng bè nuôi cá trên sông
   */
  private buildFishFarmingCages(): void {
    const cageGroup = new THREE.Group();
    cageGroup.position.set(325, 0, 675);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a6d4b, roughness: 0.9 });
    const drumMat = new THREE.MeshStandardMaterial({ color: 0x1976d2, roughness: 0.4 });

    // 4 interconnected floating fish cages
    [-6, 6].forEach((cx) => {
      [-6, 6].forEach((cz) => {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.3, 6.5), woodMat);
        frame.position.set(cx, 0.42, cz);
        cageGroup.add(frame);

        // Blue flotation plastic drums
        [-2.8, 2.8].forEach((dx) => {
          [-2.8, 2.8].forEach((dz) => {
            const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.2, 8), drumMat);
            drum.rotateX(Math.PI / 2);
            drum.position.set(cx + dx, 0.28, cz + dz);
            cageGroup.add(drum);
          });
        });
      });
    });

    this.group.add(cageGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
