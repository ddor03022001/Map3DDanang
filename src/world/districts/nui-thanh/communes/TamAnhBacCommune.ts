import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Anh Bắc (Huyện Núi Thành) - "Khu Công Nghiệp Tam Anh 2 & Nông Nghiệp Xanh"
 * Vùng đệm kinh tế năng động phía Bắc huyện:
 * - Phân khu công nghiệp Tam Anh 2 định hướng sinh thái xanh với nhà xưởng thông minh
 * - Cổng chào KCN Tam Anh 2 hiện đại
 * - Cánh đồng canh tác nông nghiệp công nghệ cao và làng quê Định Phước
 * - Tuyến đường gom cao tốc kết nối logistics
 */
export class TamAnhBacCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-anh-bac-commune',
        name: 'Xã Tam Anh Bắc',
        nameEn: 'Tam Anh Bac Commune',
        type: 'commune',
        areaKm2: 21.0,
        description:
          'Địa bàn Khu công nghiệp Tam Anh 2 sinh thái, phát triển hài hòa giữa công nghiệp sạch và vành đai nông nghiệp hữu cơ.',
        cameraPreset: {
          position: [175, 52, 570],
          target: [205, 4, 600],
        },
        subLandmarks: [
          {
            id: 'kcn-tam-anh-2',
            name: '🏢 Phân Khu KCN Tam Anh 2',
            category: 'building',
            cameraPreset: { position: [215, 38, 590], target: [240, 6, 615] },
            description: 'Khu công nghiệp thế hệ mới thu hút đầu tư điện tử và công nghệ cao.',
          },
          {
            id: 'cong-kcn-tam-anh-2',
            name: '⛩️ Cổng Chào KCN Tam Anh 2',
            category: 'cultural',
            cameraPreset: { position: [195, 24, 580], target: [215, 4, 595] },
            description: 'Cổng chào kiến trúc công nghiệp hiện đại đón luồng phương tiện vận tải.',
          },
        ],
      },
      {
        minX: 140,
        maxX: 275,
        minZ: 555,
        maxZ: 635,
      }
    );

    this.buildEcoIndustrialFacilities();
    this.buildIndustrialParkGate();
    this.buildGreenAgriculturalPlots();
  }

  private buildEcoIndustrialFacilities(): void {
    const group = new THREE.Group();
    group.position.set(235, 0, 610);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xd0d7de, roughness: 0.5 });
    const greenRoofMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.4 });
    const solarMat = new THREE.MeshStandardMaterial({ color: 0x0d2838, metalness: 0.8, roughness: 0.2 });

    [-14, 14].forEach((px, i) => {
      const plant = new THREE.Mesh(new THREE.BoxGeometry(26, 7.5, 18), wallMat);
      plant.position.set(px, 3.75, i * 8);
      plant.castShadow = true;
      group.add(plant);

      const roof = new THREE.Mesh(new THREE.BoxGeometry(27, 0.6, 19), greenRoofMat);
      roof.position.set(px, 7.8, i * 8);
      group.add(roof);

      // Solar rooftop
      const solar = new THREE.Mesh(new THREE.PlaneGeometry(22, 14), solarMat);
      solar.rotateX(-Math.PI / 2);
      solar.position.set(px, 8.15, i * 8);
      group.add(solar);
    });

    this.group.add(group);
  }

  private buildIndustrialParkGate(): void {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(210, 0, 595);

    const gateMat = new THREE.MeshStandardMaterial({ color: 0x0277bd, roughness: 0.4 });
    const letterMat = new THREE.MeshStandardMaterial({ color: 0xffd54f, roughness: 0.3 });

    // Gate pillars
    [-6, 6].forEach((gx) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.6, 8.5, 1.6), gateMat);
      p.position.set(gx, 4.25, 0);
      gateGroup.add(p);
    });

    // Beam
    const beam = new THREE.Mesh(new THREE.BoxGeometry(14, 1.8, 1.8), letterMat);
    beam.position.set(0, 8.0, 0);
    gateGroup.add(beam);

    this.group.add(gateGroup);
  }

  private buildGreenAgriculturalPlots(): void {
    const plotGroup = new THREE.Group();
    plotGroup.position.set(175, 0, 600);

    const cropMat = new THREE.MeshStandardMaterial({ color: 0x558b2f, roughness: 0.85 });
    const cropPlot = new THREE.Mesh(new THREE.PlaneGeometry(36, 32), cropMat);
    cropPlot.rotateX(-Math.PI / 2);
    cropPlot.position.y = 0.42;
    cropPlot.receiveShadow = true;
    plotGroup.add(cropPlot);

    this.group.add(plotGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
