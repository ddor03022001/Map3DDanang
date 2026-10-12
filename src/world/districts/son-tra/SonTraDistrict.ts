import { BaseDistrict } from '../core/BaseDistrict';
import { ThoQuangWard } from './wards/ThoQuangWard';
import { NaiHienDongWard } from './wards/NaiHienDongWard';
import { AnHaiTayWard } from './wards/AnHaiTayWard';

/**
 * Quận Sơn Trà (Son Tra District)
 * Holds administrative wards: Thọ Quang, Nại Hiên Đông, An Hải Tây, An Hải Bắc...
 */
export class SonTraDistrict extends BaseDistrict {
  constructor() {
    super(
      {
        id: 'son-tra',
        name: 'Quận Sơn Trà',
        nameEn: 'Son Tra District',
        type: 'urban_district',
        areaKm2: 60.0,
        centerCoordinates: {
          lat: 16.0825,
          lng: 108.2425,
        },
        cameraPreset: {
          position: [120, 75, -180],
          target: [40, 10, -180],
        },
      },
      {
        minX: 24,
        maxX: 520,
        minZ: -520,
        maxZ: 50,
      }
    );
  }

  public initialize(): void {
    this.registerWard(new ThoQuangWard());
    this.registerWard(new NaiHienDongWard());
    this.registerWard(new AnHaiTayWard());

    this.isLoaded = true;
  }
}
