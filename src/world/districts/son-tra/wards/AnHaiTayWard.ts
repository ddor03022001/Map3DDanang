import { BaseWard } from '../../core/BaseWard';

/**
 * Phường An Hải Tây & An Hải Bắc (Quận Sơn Trà)
 * Houses the East abutment of Dragon Bridge, Han River Bridge, and riverside promenade
 */
export class AnHaiTayWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'an-hai-tay-ward',
        name: 'Phường An Hải Tây & An Hải Bắc',
        nameEn: 'An Hai Tay & An Hai Bac Ward',
        type: 'ward',
        areaKm2: 3.2,
        description: 'Bờ Đông Sông Hàn đối diện trung tâm, nơi đặt đầu Rồng Cầu Rồng và Cầu Quay Sông Hàn.',
      },
      {
        minX: 24,
        maxX: 120,
        minZ: -160,
        maxZ: 50,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
