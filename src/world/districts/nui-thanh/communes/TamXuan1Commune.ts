import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Xuân 1 (Huyện Núi Thành) - "Cửa Ngõ Bắc Núi Thành & Cầu Bà Bầu"
 * Địa bàn tiếp giáp trực tiếp Thành phố Tam Kỳ qua Sông Bàn Thạch:
 * - Cổng chào biểu tượng Huyện Núi Thành trên QL1A
 * - Cầu Bà Bầu lịch sử vượt sông Bàn Thạch
 * - Làng nghề truyền thống bún sắn Phương Hòa trứ danh xứ Quảng
 * - Bến đò và xóm chài ven sông Bàn Thạch
 */
export class TamXuan1Commune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-xuan-1-commune',
        name: 'Xã Tam Xuân 1',
        nameEn: 'Tam Xuan 1 Gateway Commune',
        type: 'commune',
        areaKm2: 17.5,
        description:
          'Cửa ngõ phía Bắc huyện Núi Thành nối liền TP. Tam Kỳ qua Cầu Bà Bầu trên Quốc lộ 1A, quê hương của làng nghề bún sắn Phương Hòa truyền thống lâu đời.',
        cameraPreset: {
          position: [180, 55, 490],
          target: [210, 4, 535],
        },
        subLandmarks: [
          {
            id: 'cong-chao-nui-thanh',
            name: '⛩️ Cổng Chào Huyện Núi Thành',
            category: 'cultural',
            cameraPreset: { position: [195, 25, 510], target: [215, 6, 530] },
            description: 'Cổng chào quy mô hiện đại đón chào du khách bước vào vùng đất mở Chu Lai - Núi Thành.',
          },
          {
            id: 'cau-ba-bau',
            name: '🌉 Cầu Bà Bầu (QL1A)',
            category: 'bridge',
            cameraPreset: { position: [185, 28, 520], target: [215, 3, 540] },
            description: 'Cây cầu huyết mạch trên Quốc lộ 1A bắc qua sông Bàn Thạch, ranh giới lịch sử giữa Tam Kỳ và Núi Thành.',
          },
          {
            id: 'lang-bun-san',
            name: '🍜 Làng Nghề Bún Sắn Phương Hòa',
            category: 'cultural',
            cameraPreset: { position: [165, 22, 535], target: [185, 3, 555] },
            description: 'Làng nghề bún sắn truyền thống với những vỉ phơi bánh sắn vàng ươm, cối xay và lò tráng bánh thủ công.',
          },
        ],
      },
      {
        minX: 140,
        maxX: 260,
        minZ: 490,
        maxZ: 565,
      }
    );

    this.buildDistrictGatewayArch();
    this.buildBaBauBridge();
    this.buildCassavaNoodleCraftVillage();
  }

  /**
   * Cổng chào cửa ngõ Bắc Núi Thành trên Quốc lộ 1A (X: 215, Z: 525)
   */
  private buildDistrictGatewayArch(): void {
    const archGroup = new THREE.Group();
    archGroup.position.set(215, 0, 525);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xb71c1c, roughness: 0.4 }); // Red ceremonial arch
    const beamMat = new THREE.MeshStandardMaterial({ color: 0xffd54f, roughness: 0.3, metalness: 0.6 }); // Gold emblem beam

    // Two side pillars across QL1A
    const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 10.5, 2.2), pillarMat);
    pillar1.position.set(-7.5, 5.25, 0);
    pillar1.castShadow = true;
    archGroup.add(pillar1);

    const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 10.5, 2.2), pillarMat);
    pillar2.position.set(7.5, 5.25, 0);
    pillar2.castShadow = true;
    archGroup.add(pillar2);

    // Overhead span beam
    const beam = new THREE.Mesh(new THREE.BoxGeometry(18.0, 2.6, 2.6), beamMat);
    beam.position.set(0, 9.8, 0);
    beam.castShadow = true;
    archGroup.add(beam);

    // Decorative crown emblem
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.6, 16), beamMat);
    crown.rotateX(Math.PI / 2);
    crown.position.set(0, 11.8, 0);
    archGroup.add(crown);

    this.group.add(archGroup);
  }

  /**
   * Cầu Bà Bầu trên QL1A vượt sông Bàn Thạch
   */
  private buildBaBauBridge(): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(215, 0, 540);

    const deckMat = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.6 });
    const pierMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.7 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

    // Bridge deck (Length: 32m across river, Width: 11m for 4-lane highway)
    const deck = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.8, 32.0), deckMat);
    deck.position.set(0, 2.4, 0);
    deck.castShadow = true;
    bridgeGroup.add(deck);

    // Railings on both sides
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 32.0), railMat);
    railL.position.set(-5.3, 3.2, 0);
    bridgeGroup.add(railL);

    const railR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 32.0), railMat);
    railR.position.set(5.3, 3.2, 0);
    bridgeGroup.add(railR);

    // Concrete bridge piers in riverbed
    [-8, 8].forEach((pz) => {
      const pier = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 3.8, 12), pierMat);
      pier.position.set(0, 1.0, pz);
      pier.castShadow = true;
      bridgeGroup.add(pier);
    });

    this.group.add(bridgeGroup);
  }

  /**
   * Làng nghề bún sắn Phương Hòa truyền thống
   */
  private buildCassavaNoodleCraftVillage(): void {
    const village = new THREE.Group();
    village.position.set(180, 0, 550);

    const houseWallMat = new THREE.MeshStandardMaterial({ color: 0xf5eedb, roughness: 0.7 });
    const tileRoofMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.45 });
    const bambooRackMat = new THREE.MeshStandardMaterial({ color: 0xe0c878, roughness: 0.85 }); // Golden drying cassava
    const courtyardMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.8 }); // Red brick yard

    // 2 traditional artisan households with courtyards
    [-14, 14].forEach((hx, i) => {
      // Courtyard
      const yard = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), courtyardMat);
      yard.rotateX(-Math.PI / 2);
      yard.position.set(hx, 0.45, 0);
      yard.receiveShadow = true;
      village.add(yard);

      // Main house
      const house = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.2, 6.0), houseWallMat);
      house.position.set(hx, 1.6 + 0.45, -4.5);
      house.castShadow = true;
      village.add(house);

      // Tile roof
      const roof = new THREE.Mesh(new THREE.ConeGeometry(6.2, 2.2, 4), tileRoofMat);
      roof.rotateY(Math.PI / 4);
      roof.position.set(hx, 3.2 + 1.1 + 0.45, -4.5);
      village.add(roof);

      // Bamboo racks for sun-drying cassava vermicelli
      for (let r = 0; r < 4; r++) {
        const rack = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 1.6), bambooRackMat);
        rack.rotateX(-0.35);
        rack.position.set(hx, 1.0 + 0.45, r * 2.2 - 1.0);
        village.add(rack);
      }
    });

    this.group.add(village);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
