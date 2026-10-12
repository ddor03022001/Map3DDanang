import { BaseDistrict } from '../core/BaseDistrict';
import { TamHiepCommune } from './communes/TamHiepCommune';
import { TamHaiCommune } from './communes/TamHaiCommune';
import { NuiThanhTown } from './communes/NuiThanhTown';
import { TamNghiaCommune } from './communes/TamNghiaCommune';

/**
 * Huyện Núi Thành (Nui Thanh District - Chu Lai Economic Hub)
 * Holds communes: Tam Hiệp (KCN THACO & Cầu Vượt Cây Xương Rồng), Tam Hải, Tam Nghĩa, Thị trấn Núi Thành...
 */
export class NuiThanhDistrict extends BaseDistrict {
  public tamHiepCommune: TamHiepCommune;
  public tamHaiCommune: TamHaiCommune;
  public nuiThanhTown: NuiThanhTown;
  public tamNghiaCommune: TamNghiaCommune;

  constructor() {
    super(
      {
        id: 'nui-thanh',
        name: 'Huyện Núi Thành (Chu Lai & THACO)',
        nameEn: 'Nui Thanh District (Chu Lai & THACO)',
        type: 'rural_district',
        areaKm2: 555.9,
        centerCoordinates: {
          lat: 15.4285,
          lng: 108.6472,
        },
        cameraPreset: {
          position: [180, 52, 670],
          target: [235, 6, 720],
        },
      },
      {
        minX: 50,
        maxX: 450,
        minZ: 550,
        maxZ: 1000,
      }
    );

    this.tamHiepCommune = new TamHiepCommune();
    this.tamHaiCommune = new TamHaiCommune();
    this.nuiThanhTown = new NuiThanhTown();
    this.tamNghiaCommune = new TamNghiaCommune();
  }

  public initialize(): void {
    this.registerWard(this.tamHiepCommune);
    this.registerWard(this.tamHaiCommune);
    this.registerWard(this.nuiThanhTown);
    this.registerWard(this.tamNghiaCommune);

    this.isLoaded = true;
  }
}
