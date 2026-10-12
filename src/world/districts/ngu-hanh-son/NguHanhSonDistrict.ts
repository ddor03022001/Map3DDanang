import { BaseDistrict } from '../core/BaseDistrict';
import { HoaHaiWard } from './wards/HoaHaiWard';
import { MyAnWard } from './wards/MyAnWard';

/**
 * Quận Ngũ Hành Sơn (Ngu Hanh Son District)
 * Holds administrative wards: Hòa Hải, Mỹ An, Khuê Mỹ, Hòa Quý...
 */
export class NguHanhSonDistrict extends BaseDistrict {
  constructor() {
    super(
      {
        id: 'ngu-hanh-son',
        name: 'Quận Ngũ Hành Sơn',
        nameEn: 'Ngu Hanh Son District',
        type: 'urban_district',
        areaKm2: 40.2,
        centerCoordinates: {
          lat: 16.0039,
          lng: 108.2635,
        },
        cameraPreset: {
          position: [240, 80, 260],
          target: [210, 15, 360],
        },
      },
      {
        minX: 80,
        maxX: 320,
        minZ: 20,
        maxZ: 500,
      }
    );
  }

  public initialize(): void {
    this.registerWard(new HoaHaiWard());
    this.registerWard(new MyAnWard());

    this.isLoaded = true;
  }
}
