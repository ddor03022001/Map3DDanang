import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Nại Hiên Đông (Quận Sơn Trà)
 * Houses the East abutment of Thuan Phuoc bridge and coastal urban apartments
 */
export class NaiHienDongWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'nai-hien-dong-ward',
        name: 'Phường Nại Hiên Đông',
        nameEn: 'Nai Hien Dong Ward',
        type: 'ward',
        areaKm2: 4.8,
        description: 'Khu đô thị cảng biển phía Đông chân cầu Thuận Phước dọc đường Lê Văn Duyệt và Lê Đức Thọ.',
      },
      {
        minX: 24,
        maxX: 120,
        minZ: -415,
        maxZ: -280,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
