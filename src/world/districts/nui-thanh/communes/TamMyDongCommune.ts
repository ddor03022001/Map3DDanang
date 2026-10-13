import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Mỹ Đông (Huyện Núi Thành) - "Vựa Lúa Phù Sa & Nông Thôn Mới Kiểu Mẫu"
 * Vùng châu thổ đồng bằng nằm giữa vùng đồi Tây và trung tâm Thị trấn Núi Thành:
 * - Cánh đồng lúa nước trù phú với hệ thống mương thủy lợi bê tông hóa
 * - Trụ sở UBND Xã Tam Mỹ Đông, Nhà văn hóa thôn và trường học
 * - Đập dâng thủy lợi điều tiết nước ngọt từ hồ Hố Khế
 * - Làng quê thanh bình với rặng tre ngà và đàn bò vàng gặm cỏ
 */
export class TamMyDongCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-my-dong-commune',
        name: 'Xã Tam Mỹ Đông',
        nameEn: 'Tam My Dong Commune',
        type: 'commune',
        areaKm2: 24.3,
        description:
          'Vùng châu thổ đồng lúa xanh ngát của huyện Núi Thành, nổi bật với hệ thống thủy lợi nội đồng kiên cố, nông thôn mới trù phú và làng nghề nông nghiệp truyền thống.',
        cameraPreset: {
          position: [105, 45, 805],
          target: [135, 4, 835],
        },
        subLandmarks: [
          {
            id: 'dong-lua-tam-my-dong',
            name: '🌾 Đồng Lúa Phù Sa & Kênh Thủy Lợi',
            category: 'nature',
            cameraPreset: { position: [110, 28, 815], target: [135, 4, 835] },
            description: 'Những thửa ruộng lúa chia ô bàn cờ màu mỡ được tưới mát bởi kênh thủy lợi dẫn nước từ hồ chứa.',
          },
          {
            id: 'dap-thuy-loi-my-dong',
            name: '🌊 Đập Thủy Lợi Dâng Nước',
            category: 'cultural',
            cameraPreset: { position: [90, 22, 820], target: [115, 3, 835] },
            description: 'Công trình đập dâng thủy lợi điều hòa nguồn nước tưới tiêu cho hàng trăm hecta lúa.',
          },
        ],
      },
      {
        minX: 80,
        maxX: 160,
        minZ: 810,
        maxZ: 870,
      }
    );

    this.buildRicePaddiesAndCanals();
    this.buildIrrigationDam();
    this.buildRuralHamlets();
  }

  /**
   * 1. Cánh đồng lúa chia ô bàn cờ và mương dẫn nước bê tông
   */
  private buildRicePaddiesAndCanals(): void {
    const fieldGroup = new THREE.Group();
    fieldGroup.position.set(135, 0, 835);

    const greenPaddyMat = new THREE.MeshStandardMaterial({ color: 0x4a8536, roughness: 0.85 });
    const goldenPaddyMat = new THREE.MeshStandardMaterial({ color: 0xcca835, roughness: 0.85 });
    const canalWaterMat = new THREE.MeshStandardMaterial({ color: 0x1f5968, roughness: 0.3 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x9fa4a6, roughness: 0.8 });

    // 8 rice plots
    const plots = [
      { x: -16, z: -14, w: 24, l: 20, gold: false },
      { x: 14, z: -14, w: 28, l: 20, gold: true },
      { x: -16, z: 12, w: 24, l: 22, gold: true },
      { x: 14, z: 12, w: 28, l: 22, gold: false },
    ];

    plots.forEach((p) => {
      const padGeo = new THREE.PlaneGeometry(p.w, p.l);
      padGeo.rotateX(-Math.PI / 2);
      const pad = new THREE.Mesh(padGeo, p.gold ? goldenPaddyMat : greenPaddyMat);
      pad.position.set(p.x, 0.42, p.z);
      pad.receiveShadow = true;
      fieldGroup.add(pad);
    });

    // Concrete canal cutting through fields
    const canalBed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 48), concreteMat);
    canalBed.position.set(0, 0.38, 0);
    fieldGroup.add(canalBed);

    const canalWater = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 48), canalWaterMat);
    canalWater.rotateX(-Math.PI / 2);
    canalWater.position.set(0, 0.44, 0);
    fieldGroup.add(canalWater);

    this.group.add(fieldGroup);
  }

  /**
   * 2. Đập dâng nước thủy lợi
   */
  private buildIrrigationDam(): void {
    const damGroup = new THREE.Group();
    damGroup.position.set(110, 0, 835);

    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.7 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x1d637a, roughness: 0.2, metalness: 0.6 });

    // Concrete weir wall
    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.2, 18), concreteMat);
    wall.position.set(0, 1.1, 0);
    wall.castShadow = true;
    damGroup.add(wall);

    // Water reservoir behind dam
    const reservoir = new THREE.Mesh(new THREE.PlaneGeometry(22, 16), waterMat);
    reservoir.rotateX(-Math.PI / 2);
    reservoir.position.set(-11, 1.8, 0);
    damGroup.add(reservoir);

    this.group.add(damGroup);
  }

  /**
   * 3. Làng quê nông thôn mới
   */
  private buildRuralHamlets(): void {
    const village = new THREE.Group();
    village.position.set(145, 0, 855);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.7 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xba3c2a, roughness: 0.4 });

    [-10, 8].forEach((hx, i) => {
      const h = new THREE.Mesh(new THREE.BoxGeometry(8, 4.5, 6), wallMat);
      h.position.set(hx, 2.25, i * 8);
      h.castShadow = true;
      village.add(h);

      const r = new THREE.Mesh(new THREE.ConeGeometry(6, 2.2, 4), roofMat);
      r.rotateY(Math.PI / 4);
      r.position.set(hx, 4.5 + 1.1, i * 8);
      r.scale.set(1.4, 1, 1.1);
      r.castShadow = true;
      village.add(r);
    });

    this.group.add(village);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
