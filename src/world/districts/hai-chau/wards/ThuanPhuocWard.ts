import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Thuận Phước (Quận Hải Châu)
 * Houses the West abutment of Thuan Phuoc bridge, Nhu Nguyet, and Da Nang Bay promenade
 */
export class ThuanPhuocWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'thuan-phuoc-ward',
        name: 'Phường Thuận Phước',
        nameEn: 'Thuan Phuoc Ward',
        type: 'ward',
        areaKm2: 2.1,
        description: 'Cửa ngõ phía Bắc quận Hải Châu nơi Sông Hàn mở ra Vịnh Đà Nẵng tại chân cầu Thuận Phước.',
      },
      {
        minX: -140,
        maxX: -24,
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
