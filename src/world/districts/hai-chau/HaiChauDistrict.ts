import { BaseDistrict } from '../core/BaseDistrict';
import { ThachThangWard } from './wards/ThachThangWard';
import { ThuanPhuocWard } from './wards/ThuanPhuocWard';
import { BinhHienWard } from './wards/BinhHienWard';

/**
 * Quận Hải Châu (Hai Chau Central District)
 * Holds administrative wards: Thạch Thang, Thuận Phước, Bình Hiên, Hải Châu 1...
 */
export class HaiChauDistrict extends BaseDistrict {
  constructor() {
    super(
      {
        id: 'hai-chau',
        name: 'Quận Hải Châu',
        nameEn: 'Hai Chau District',
        type: 'urban_district',
        areaKm2: 27.1,
        centerCoordinates: {
          lat: 16.0678,
          lng: 108.2208,
        },
        cameraPreset: {
          position: [-85, 65, -80],
          target: [-35, 10, -80],
        },
      },
      {
        minX: -160,
        maxX: -24,
        minZ: -415,
        maxZ: 100,
      }
    );
  }

  public initialize(): void {
    // Register Granular Wards under Hai Chau District
    this.registerWard(new ThachThangWard());
    this.registerWard(new ThuanPhuocWard());
    this.registerWard(new BinhHienWard());

    this.isLoaded = true;
  }
}
