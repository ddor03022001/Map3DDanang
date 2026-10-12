import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Đảo Tam Hải (Huyện Núi Thành)
 * Island commune renowned for Ban Than black volcanic rock cliff and coconut groves
 */
export class TamHaiCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-hai-commune',
        name: 'Xã Đảo Tam Hải',
        nameEn: 'Tam Hai Island Commune',
        type: 'commune',
        areaKm2: 15.6,
        description: 'Xã đảo đặc thù với thắng cảnh ghềnh đá than đen Bàn Than và rặng dừa thơ mộng.',
        cameraPreset: {
          position: [330, 80, 820],
          target: [320, 2, 850],
        },
      },
      {
        minX: 250,
        maxX: 400,
        minZ: 750,
        maxZ: 950,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
