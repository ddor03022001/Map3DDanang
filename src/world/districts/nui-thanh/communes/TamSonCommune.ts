import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Sơn (Huyện Núi Thành) - "Lòng Hồ Thủy Lợi Sinh Thái & Rừng Đầu Nguồn"
 * Xã miền núi phía Tây Bắc huyện sở hữu hệ thống sinh thái hồ nước ngọt lớn nhất:
 * - Vùng mặt nước hồ thủy lợi mênh mông (nhánh nam Hồ Phú Ninh & Hồ Hố Khế)
 * - Đập bê tông điều tiết nước thủy lợi cung cấp nước ngọt cho toàn huyện
 * - Bến thuyền du lịch sinh thái và các đảo nổi giữa lòng hồ
 * - Những đồi sim tím, đồi chè và cánh rừng gỗ lim xanh ngút mắt
 */
export class TamSonCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-son-commune',
        name: 'Xã Tam Sơn',
        nameEn: 'Tam Son Eco-Lake Commune',
        type: 'commune',
        areaKm2: 54.0,
        description:
          'Xã sinh thái hồ nước ngọt lớn nhất Núi Thành, sở hữu cảnh quan lòng hồ thơ mộng, đập tràn thủy lợi và nguồn nước ngọt dồi dào nuôi sống cả vùng Chu Lai.',
        cameraPreset: {
          position: [-75, 65, 680],
          target: [-50, 4, 715],
        },
        subLandmarks: [
          {
            id: 'dap-tran-tam-son',
            name: '🧱 Đập Tràn Thủy Lợi Hố Khế',
            category: 'cultural',
            cameraPreset: { position: [-55, 30, 695], target: [-40, 4, 715] },
            description: 'Công trình đập ngăn nước và cống xả tràn kiên cố điều tiết lũ và cấp nước mùa khô.',
          },
          {
            id: 'ben-thuyen-tam-son',
            name: '🚤 Bến Thuyền Sinh Thái Lòng Hồ',
            category: 'transport',
            cameraPreset: { position: [-65, 24, 705], target: [-55, 2, 720] },
            description: 'Bến đỗ cano phục vụ du khách khám phá các ốc đảo nổi và ngắm hoàng hôn trên hồ Phú Ninh.',
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

    this.buildDamAndSpillway();
    this.buildEcoBoatDock();
    this.buildLakeIsletSanctuary();
  }

  /**
   * Đập ngăn nước & cống xả tràn Hố Khế
   */
  private buildDamAndSpillway(): void {
    const damGroup = new THREE.Group();
    damGroup.position.set(-42, 0, 715);

    const damMat = new THREE.MeshStandardMaterial({ color: 0xa0abb5, roughness: 0.65 });
    const controlHouseMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5 }); // Green control house

    // Concrete dam wall (thickness 4, height 6.5, length 38)
    const damWall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 6.5, 38), damMat);
    damWall.position.set(0, 3.25, 0);
    damWall.castShadow = true;
    damGroup.add(damWall);

    // Sluice control building on dam crest
    const house = new THREE.Mesh(new THREE.BoxGeometry(5.5, 3.5, 6.5), controlHouseMat);
    house.position.set(0, 7.8, 0);
    house.castShadow = true;
    damGroup.add(house);

    this.group.add(damGroup);
  }

  /**
   * Bến thuyền du lịch sinh thái và cano tham quan
   */
  private buildEcoBoatDock(): void {
    const dockGroup = new THREE.Group();
    dockGroup.position.set(-58, 0, 725);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });
    const boatMat = new THREE.MeshStandardMaterial({ color: 0x0277bd, roughness: 0.4 });

    // Wooden walkway pier extending into the water
    const pier = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.4, 18), woodMat);
    pier.position.set(0, 0.45, 0);
    dockGroup.add(pier);

    // 2 passenger speedboats / canos
    [-3.2, 3.2].forEach((bx, i) => {
      const boat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 6.5), boatMat);
      boat.position.set(bx, 0.35, i * 4.5 - 2);
      boat.castShadow = true;
      dockGroup.add(boat);
    });

    this.group.add(dockGroup);
  }

  /**
   * Đảo nổi sinh thái giữa lòng hồ
   */
  private buildLakeIsletSanctuary(): void {
    const isletGroup = new THREE.Group();
    isletGroup.position.set(-85, 0, 715);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x33691e, roughness: 0.85 });
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.8 });

    // Island landform
    const islet = new THREE.Mesh(new THREE.CylinderGeometry(8, 12, 2.5, 12), grassMat);
    islet.position.set(0, 0.8, 0);
    isletGroup.add(islet);

    // Island pine / shade trees
    for (let t = 0; t < 5; t++) {
      const angle = t * 1.3;
      const dist = 3.5 + (t % 2) * 2;
      const tree = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4.5, 6), treeMat);
      tree.position.set(Math.cos(angle) * dist, 3.8, Math.sin(angle) * dist);
      tree.castShadow = true;
      isletGroup.add(tree);
    }

    this.group.add(isletGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
