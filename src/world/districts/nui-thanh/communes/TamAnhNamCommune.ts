import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Anh Nam (Huyện Núi Thành) - "Khu Công Nghiệp Tam Anh 1 & Trung Tâm Phụ Trợ"
 * Cửa ngõ công nghiệp phía Bắc tiếp giáp xã Tam Hiệp:
 * - Khu Công Nghiệp Tam Anh 1 quy mô lớn với các nhà xưởng hiện đại
 * - Trục Quốc Lộ 1A và Tuyến đường sắt Bắc - Nam xuyên qua trung tâm xã
 * - Trạm dịch vụ hậu cần logistics, kho bãi và trạm dừng nghỉ
 * - Cánh đồng lúa Tam Anh xen kẽ các khu dân cư nông thôn mới
 */
export class TamAnhNamCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-anh-nam-commune',
        name: 'Xã Tam Anh Nam',
        nameEn: 'Tam Anh Nam Commune',
        type: 'commune',
        areaKm2: 21.9,
        description:
          'Địa bàn Khu công nghiệp Tam Anh 1 trọng điểm, sở hữu vị trí giao thương chiến lược trên Quốc lộ 1A kết nối chuỗi cung ứng sản xuất cơ khí ô tô Chu Lai.',
        cameraPreset: {
          position: [180, 52, 630],
          target: [210, 4, 665],
        },
        subLandmarks: [
          {
            id: 'kcn-tam-anh-1',
            name: '🏭 Khu Công Nghiệp Tam Anh 1',
            category: 'building',
            cameraPreset: { position: [230, 42, 640], target: [255, 6, 665] },
            description: 'Tổ hợp nhà máy công nghiệp hỗ trợ, dệt may công nghệ cao và kho bãi ngoại quan.',
          },
          {
            id: 'tam-anh-nam-station',
            name: '⛽ Trạm Dịch Vụ QL1A Tam Anh',
            category: 'transport',
            cameraPreset: { position: [195, 26, 650], target: [220, 2, 670] },
            description: 'Trạm dừng nghỉ và tiếp nhiên liệu phục vụ các đoàn xe tải, container Bắc - Nam.',
          },
        ],
      },
      {
        minX: 170,
        maxX: 280,
        minZ: 635,
        maxZ: 695,
      }
    );

    this.buildIndustrialPark();
    this.buildHighwayServiceStation();
  }

  /**
   * 1. Khu Công Nghiệp Tam Anh 1 (Modern Industrial Factory Blocks)
   */
  private buildIndustrialPark(): void {
    const parkGroup = new THREE.Group();
    parkGroup.position.set(255, 0, 665);

    const factoryWallMat = new THREE.MeshStandardMaterial({ color: 0x415b76, roughness: 0.6, metalness: 0.3 });
    const factoryWhiteMat = new THREE.MeshStandardMaterial({ color: 0xeef2f7, roughness: 0.5 });
    const roofBlueMat = new THREE.MeshStandardMaterial({ color: 0x1f4e78, roughness: 0.4 });
    const solarMat = new THREE.MeshStandardMaterial({ color: 0x0f2038, metalness: 0.9, roughness: 0.2 });

    // 3 large industrial manufacturing warehouses
    const warehouses = [
      { x: 0, z: -16, w: 32, l: 18, h: 7.5 },
      { x: 0, z: 12, w: 34, l: 20, h: 8.2 },
      { x: 38, z: 0, w: 26, l: 36, h: 7.8 },
    ];

    warehouses.forEach((wh) => {
      const whMesh = new THREE.Mesh(new THREE.BoxGeometry(wh.w, wh.h, wh.l), factoryWhiteMat);
      whMesh.position.set(wh.x, wh.h / 2 + 0.4, wh.z);
      whMesh.castShadow = true;
      parkGroup.add(whMesh);

      // Pitched industrial roof
      const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(wh.w + 1.2, 0.6, wh.l + 1.2), roofBlueMat);
      roofMesh.position.set(wh.x, wh.h + 0.7, wh.z);
      parkGroup.add(roofMesh);

      // Rooftop solar panel strips
      const solar = new THREE.Mesh(new THREE.PlaneGeometry(wh.w * 0.8, wh.l * 0.75), solarMat);
      solar.rotateX(-Math.PI / 2);
      solar.position.set(wh.x, wh.h + 1.05, wh.z);
      parkGroup.add(solar);
    });

    this.group.add(parkGroup);
  }

  /**
   * 2. Trạm Dịch Vụ Hậu Cần & Trạm Xăng Dầu Quốc Lộ 1A
   */
  private buildHighwayServiceStation(): void {
    const stationGroup = new THREE.Group();
    stationGroup.position.set(232, 0, 670);

    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.5, roughness: 0.3 });
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.7 });

    // Fuel station large canopy
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 12), canopyMat);
    canopy.position.set(0, 5.2, 0);
    canopy.castShadow = true;
    stationGroup.add(canopy);

    // 4 steel pillars
    [-5, 5].forEach((px) => {
      [-3.5, 3.5].forEach((pz) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5.0, 8), pillarMat);
        col.position.set(px, 2.5, pz);
        stationGroup.add(col);
      });
    });

    this.group.add(stationGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
