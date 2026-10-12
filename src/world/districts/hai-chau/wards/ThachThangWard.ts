import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Thạch Thang (Quận Hải Châu)
 * Houses the Da Nang Administrative Center glass tower, Novotel, and civic square
 */
export class ThachThangWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'thach-thang',
        name: 'Phường Thạch Thang',
        nameEn: 'Thach Thang Ward',
        type: 'ward',
        areaKm2: 0.8,
        description: 'Trung tâm hành chính thành phố với Tòa nhà Bắp Ngô và đường Bạch Đằng ven sông.',
      },
      {
        minX: -60,
        maxX: -24,
        minZ: -210,
        maxZ: -140,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
