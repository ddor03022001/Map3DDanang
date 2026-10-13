import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Thạnh (Huyện Núi Thành) - "Hồ Thủy Lợi Thái Xuân & Rừng Keo Lâm Nghiệp"
 * Vùng gò đồi đất đỏ bazan và lâm nghiệp phát triển:
 * - Hồ chứa nước Thái Xuân dung tích hàng triệu mét khối cấp nước cho Núi Thành
 * - Đập bê tông xả tràn và tháp van lấy nước thủy lợi
 * - Chòi canh lửa rừng trên đỉnh đồi keo bát úp
 * - Trang trại chăn nuôi gia súc nông lâm kết hợp
 */
export class TamThanhCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-thanh-commune',
        name: 'Xã Tam Thạnh',
        nameEn: 'Tam Thanh Forest & Lake Commune',
        type: 'commune',
        areaKm2: 53.9,
        description:
          'Địa bàn Hồ chứa nước Thái Xuân cung cấp nguồn nước ngọt huyết mạch cho vùng công nghiệp Chu Lai, cùng hàng nghìn hecta rừng keo tràm bạt ngàn trên vùng đất đỏ bazan.',
        cameraPreset: {
          position: [35, 55, 630],
          target: [65, 4, 665],
        },
        subLandmarks: [
          {
            id: 'dap-thai-xuan',
            name: '🌊 Đập Thủy Lợi & Hồ Thái Xuân',
            category: 'nature',
            cameraPreset: { position: [45, 28, 645], target: [70, 4, 665] },
            description: 'Công trình đập ngăn nước, đập tràn bê tông và tháp lấy nước hồ thủy lợi Thái Xuân.',
          },
          {
            id: 'choi-canh-rung-tam-thanh',
            name: '🌲 Chòi Canh Lửa Rừng Đồi Keo',
            category: 'cultural',
            cameraPreset: { position: [30, 32, 675], target: [45, 12, 690] },
            description: 'Chòi canh phòng cháy chữa cháy rừng trên đỉnh đồi đất đỏ nhìn bao quát toàn bộ vùng đồi Tam Thạnh.',
          },
        ],
      },
      {
        minX: 20,
        maxX: 100,
        minZ: 630,
        maxZ: 715,
      }
    );

    this.buildThaiXuanDamAndTower();
    this.buildForestWatchtowerAndHills();
  }

  private buildThaiXuanDamAndTower(): void {
    const damGroup = new THREE.Group();
    damGroup.position.set(70, 0, 660);

    const damMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.65 });
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x455a64, roughness: 0.6 });
    const railingMat = new THREE.MeshStandardMaterial({ color: 0xffd54f, roughness: 0.4 });

    // Main concrete dam embankment
    const damWall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.5, 34), damMat);
    damWall.position.set(0, 2.75, 0);
    damWall.castShadow = true;
    damGroup.add(damWall);

    // Spillway overflow chute
    const chute = new THREE.Mesh(new THREE.BoxGeometry(8.0, 1.2, 12), damMat);
    chute.position.set(3.5, 1.6, 0);
    damGroup.add(chute);

    // Water intake tower (Tháp van lấy nước)
    const intakeTower = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.0, 9.0, 12), towerMat);
    intakeTower.position.set(-8, 4.5, -4);
    intakeTower.castShadow = true;
    damGroup.add(intakeTower);

    // Access footbridge to tower
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.4, 1.5), damMat);
    bridge.position.set(-4, 7.8, -4);
    damGroup.add(bridge);

    // Guard railings
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 34), railingMat);
    rail.position.set(-1.8, 5.8, 0);
    damGroup.add(rail);

    this.group.add(damGroup);
  }

  private buildForestWatchtowerAndHills(): void {
    const hillGroup = new THREE.Group();
    hillGroup.position.set(45, 0, 690);

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.5 });
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xe65100, roughness: 0.6 }); // Orange visibility cabin

    // Watchtower 4 legs
    [-1.8, 1.8].forEach((lx) => {
      [-1.8, 1.8].forEach((lz) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 14, 6), steelMat);
        leg.position.set(lx, 7.0, lz);
        hillGroup.add(leg);
      });
    });

    // Observation cabin on top
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.0, 4.2), cabinMat);
    cabin.position.set(0, 14.5, 0);
    cabin.castShadow = true;
    hillGroup.add(cabin);

    // Pyramid roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 1.8, 4), steelMat);
    roof.rotateY(Math.PI / 4);
    roof.position.set(0, 16.8, 0);
    hillGroup.add(roof);

    this.group.add(hillGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
