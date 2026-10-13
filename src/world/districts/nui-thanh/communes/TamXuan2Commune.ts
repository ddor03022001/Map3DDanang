import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Xuân 2 (Huyện Núi Thành) - "Vùng Đồi Gò Nông Lâm Nghiệp & Công Nghệ Cao"
 * Địa bàn phát triển nông nghiệp kỹ thuật cao và chế biến lâm sản:
 * - Vùng đồi gò cây keo lá tràm và xưởng chế biến dăm gỗ xuất khẩu
 * - Khu nông nghiệp công nghệ cao với nhà màng thông minh
 * - Đập thủy lợi đồi Hố Lau trữ nước ngọt
 */
export class TamXuan2Commune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-xuan-2-commune',
        name: 'Xã Tam Xuân 2',
        nameEn: 'Tam Xuan 2 Agro-Forestry Commune',
        type: 'commune',
        areaKm2: 24.2,
        description:
          'Địa bàn phát triển kinh tế đồi gò, chế biến gỗ rừng trồng và cánh đồng rau sạch ứng dụng công nghệ cao ở phía Tây Bắc Núi Thành.',
        cameraPreset: {
          position: [60, 55, 500],
          target: [85, 4, 535],
        },
        subLandmarks: [
          {
            id: 'nong-nghiep-tam-xuan-2',
            name: '🌱 Khu Nông Nghiệp Công Nghệ Cao',
            category: 'nature',
            cameraPreset: { position: [75, 28, 520], target: [95, 4, 540] },
            description: 'Khu nhà màng công nghệ cao trồng rau thủy canh, dưa lưới và hoa màu năng suất cao.',
          },
          {
            id: 'che-bien-dam-go',
            name: '🪵 Xưởng Chế Biến Lâm Sản & Dăm Gỗ',
            category: 'building',
            cameraPreset: { position: [55, 26, 530], target: [70, 4, 550] },
            description: 'Khu xưởng bóc gỗ, sân phơi dăm keo tràm phục vụ xuất khẩu qua cảng Kỳ Hà.',
          },
        ],
      },
      {
        minX: 20,
        maxX: 140,
        minZ: 490,
        maxZ: 570,
      }
    );

    this.buildHighTechGreenhouses();
    this.buildTimberSawmillFacility();
  }

  private buildHighTechGreenhouses(): void {
    const ghGroup = new THREE.Group();
    ghGroup.position.set(95, 0, 535);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75,
    });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

    // 4 high-tech agricultural greenhouses
    [-14, 14].forEach((gx) => {
      [-9, 9].forEach((gz) => {
        const gh = new THREE.Mesh(new THREE.BoxGeometry(18, 4.8, 12), glassMat);
        gh.position.set(gx, 2.4, gz);
        gh.castShadow = true;
        ghGroup.add(gh);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(10, 2.4, 4), frameMat);
        roof.rotateY(Math.PI / 4);
        roof.position.set(gx, 4.8 + 1.2, gz);
        roof.scale.set(1.4, 1, 0.95);
        ghGroup.add(roof);
      });
    });

    this.group.add(ghGroup);
  }

  private buildTimberSawmillFacility(): void {
    const millGroup = new THREE.Group();
    millGroup.position.set(65, 0, 545);

    const shedMat = new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.6 });
    const logMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const chipPileMat = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.85 });

    // Processing shed
    const shed = new THREE.Mesh(new THREE.BoxGeometry(22, 6.0, 14), shedMat);
    shed.position.set(0, 3.0, 0);
    shed.castShadow = true;
    millGroup.add(shed);

    // Stacks of acacia timber logs
    for (let i = 0; i < 5; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 10, 8), logMat);
      log.rotateZ(Math.PI / 2);
      log.position.set(-16, 0.7 + Math.floor(i / 2) * 1.2, (i % 2) * 2.5 - 2);
      log.castShadow = true;
      millGroup.add(log);
    }

    // Woodchip pile
    const chipPile = new THREE.Mesh(new THREE.ConeGeometry(5.5, 3.5, 8), chipPileMat);
    chipPile.position.set(16, 1.75, 2);
    chipPile.castShadow = true;
    millGroup.add(chipPile);

    this.group.add(millGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
