import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Thọ Quang (Quận Sơn Trà)
 * Houses Son Tra Peninsula, Linh Ung Pagoda Lady Buddha, and Tho Quang maritime harbor
 */
export class ThoQuangWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'tho-quang-ward',
        name: 'Phường Thọ Quang',
        nameEn: 'Tho Quang Ward',
        type: 'ward',
        areaKm2: 44.5,
        description: 'Bán đảo Sơn Trà hùng vĩ, Chùa Linh Ứng và âu thuyền cảng cá Thọ Quang.',
      },
      {
        minX: 120,
        maxX: 520,
        minZ: -520,
        maxZ: -280,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
