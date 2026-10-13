import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Quang (Cảng Kỳ Hà, Bến Cá Tam Quang & Cửa Biển An Hòa)
 * Major fishing and maritime hub of Nui Thanh District:
 * - Cảng Biển Tổng Hợp Kỳ Hà đón tàu hàng trọng tải lớn
 * - Bến Cá & Chợ Đầu Mối Hải Sản Tam Quang với hàng đoàn tàu cá xa bờ
 * - Vịnh An Hòa: Vùng mặt nước kín gió neo đậu tàu thuyền
 * - Bến phà đất liền sang Xã đảo Tam Hải
 */
export class TamQuangCommune extends BaseWard {
  private fishingBoats: THREE.Group[] = [];

  constructor() {
    super(
      {
        id: 'tam-quang-commune',
        name: 'Xã Tam Quang (Cảng Kỳ Hà)',
        nameEn: 'Tam Quang Commune (Ky Ha Port)',
        type: 'commune',
        areaKm2: 11.4,
        description:
          'Địa bàn Cảng tổng hợp Kỳ Hà, bến cá sầm uất nhất Núi Thành và cửa biển An Hòa thơ mộng đón gió biển Đông.',
        cameraPreset: {
          position: [290, 50, 810],
          target: [320, 4, 840],
        },
        subLandmarks: [
          {
            id: 'tam-quang-overview',
            name: '👁️ Toàn Cảnh Cảng Kỳ Hà',
            category: 'nature',
            cameraPreset: { position: [280, 65, 800], target: [325, 4, 840] },
            description: 'Toàn cảnh bến cảng Kỳ Hà, âu thuyền Vịnh An Hòa và cửa biển Tam Quang.',
          },
          {
            id: 'ky-ha-wharf',
            name: '🚢 Cầu Cảng Kỳ Hà',
            category: 'building',
            cameraPreset: { position: [305, 30, 825], target: [330, 4, 835] },
            description: 'Cầu cảng tổng hợp tiếp nhận tàu bách hóa, xi măng, dăm gỗ và hàng rời.',
          },
          {
            id: 'tam-quang-fish-market',
            name: '🐟 Bến Cá & Chợ Đầu Mối Tam Quang',
            category: 'cultural',
            cameraPreset: { position: [285, 22, 835], target: [310, 3, 850] },
            description: 'Bến cá lớn nhất vùng biển Núi Thành với hàng đoàn tàu đánh bắt xa bờ công suất lớn.',
          },
        ],
      },
      {
        minX: 250,
        maxX: 360,
        minZ: 790,
        maxZ: 870,
      }
    );

    this.buildKyHaPortWharf();
    this.buildFishMarketAndBoats();
  }

  /**
   * 1. Cảng Kỳ Hà Wharf (Cầu cảng tổng hợp Kỳ Hà)
   */
  private buildKyHaPortWharf(): void {
    const wharfGroup = new THREE.Group();
    wharfGroup.position.set(330, 0.42, 830);

    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x6e7882, roughness: 0.8 });
    const warehouseMat = new THREE.MeshStandardMaterial({ color: 0x224466, roughness: 0.5 });

    // Concrete pier apron (length 55, width 18)
    const pier = new THREE.Mesh(new THREE.BoxGeometry(18, 1.2, 55), concreteMat);
    pier.position.y = 0.6;
    pier.castShadow = true;
    wharfGroup.add(pier);

    // Port warehouse
    const warehouse = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 32), warehouseMat);
    warehouse.position.set(-18, 2.75, 0);
    warehouse.castShadow = true;
    wharfGroup.add(warehouse);

    this.group.add(wharfGroup);
  }

  /**
   * 2. Bến Cá Tam Quang & Đội Tàu Cá Xa Bờ (Fishing Fleet in An Hoa Bay)
   */
  private buildFishMarketAndBoats(): void {
    const fishGroup = new THREE.Group();
    fishGroup.position.set(310, 0.42, 850);

    const shedMat = new THREE.MeshStandardMaterial({ color: 0x41729f, roughness: 0.6 });
    const boatMatBlue = new THREE.MeshStandardMaterial({ color: 0x1f4e78, roughness: 0.5 });
    const boatMatRed = new THREE.MeshStandardMaterial({ color: 0xc92a2a, roughness: 0.5 });

    // Open fish auction hall on wharf
    const marketShed = new THREE.Mesh(new THREE.BoxGeometry(26, 4.2, 12), shedMat);
    marketShed.position.set(0, 2.1, 0);
    marketShed.castShadow = true;
    fishGroup.add(marketShed);

    // 8 Offshore Fishing Trawlers (Tàu cá vỏ gỗ công suất lớn đánh bắt Hoàng Sa - Trường Sa)
    for (let b = 0; b < 8; b++) {
      const boat = new THREE.Group();
      const bx = 12 + (b % 4) * 5;
      const bz = (Math.floor(b / 4) - 0.5) * 16;
      boat.position.set(bx, -0.15, bz);

      const hullMat = b % 2 === 0 ? boatMatBlue : boatMatRed;
      const hull = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.0, 12), hullMat);
      hull.position.y = 1.0;
      hull.castShadow = true;
      boat.add(hull);

      // Cabin with mast & red flag
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 1.8, 3.6),
        new THREE.MeshStandardMaterial({ color: 0xf8f9fa })
      );
      cabin.position.set(0, 2.9, -1.2);
      boat.add(cabin);

      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(1.0, 0.7),
        new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide })
      );
      flag.position.set(0.5, 4.5, 4.2);
      boat.add(flag);

      this.fishingBoats.push(boat);
      fishGroup.add(boat);
    }

    this.group.add(fishGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, elapsed: number, _nightGlowIntensity: number): void {
    // Gentle water bobbing for fishing boats in An Hoa bay
    this.fishingBoats.forEach((boat, idx) => {
      boat.position.y = -0.15 + Math.sin(elapsed * 2.2 + idx * 0.8) * 0.04;
      boat.rotation.z = Math.sin(elapsed * 1.8 + idx * 0.8) * 0.02;
    });
  }
}
