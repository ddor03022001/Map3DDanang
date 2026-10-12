import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Hòa Hải (Quận Ngũ Hành Sơn)
 * Houses the Marble Mountains (Ngu Hanh Son) and Non Nuoc stone carving village
 */
export class HoaHaiWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'hoa-hai-ward',
        name: 'Phường Hòa Hải',
        nameEn: 'Hoa Hai Ward',
        type: 'ward',
        areaKm2: 14.2,
        description: 'Danh thắng Ngũ Hành Sơn với 5 ngọn Kim, Mộc, Thủy, Hỏa, Thổ và làng đá Non Nước 400 năm tuổi.',
      },
      {
        minX: 180,
        maxX: 320,
        minZ: 280,
        maxZ: 480,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
