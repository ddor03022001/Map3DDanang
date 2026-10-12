import { BaseDistrict } from '../core/BaseDistrict';
import { HoaNinhCommune } from './communes/HoaNinhCommune';
import { HoaBacCommune } from './communes/HoaBacCommune';

/**
 * Huyện Hòa Vang (Hoa Vang Mountain & Eco District)
 * Holds administrative communes: Hòa Ninh, Hòa Bắc, Hòa Khương, Hòa Phú...
 */
export class HoaVangDistrict extends BaseDistrict {
  constructor() {
    super(
      {
        id: 'hoa-vang',
        name: 'Huyện Hòa Vang & Bà Nà Hills',
        nameEn: 'Hoa Vang District & Ba Na Hills',
        type: 'rural_district',
        areaKm2: 707.3,
        centerCoordinates: {
          lat: 15.9961,
          lng: 108.0125,
        },
        cameraPreset: {
          position: [-420, 160, -80],
          target: [-520, 95, -120],
        },
      },
      {
        minX: -650,
        maxX: -180,
        minZ: -500,
        maxZ: 400,
      }
    );
  }

  public initialize(): void {
    this.registerWard(new HoaNinhCommune());
    this.registerWard(new HoaBacCommune());

    this.isLoaded = true;
  }
}
