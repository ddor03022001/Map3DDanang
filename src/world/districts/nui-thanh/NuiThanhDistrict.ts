import { BaseDistrict } from '../core/BaseDistrict';
import { NuiThanhTown } from './communes/NuiThanhTown';
import { TamHiepCommune } from './communes/TamHiepCommune';
import { TamHaiCommune } from './communes/TamHaiCommune';
import { TamNghiaCommune } from './communes/TamNghiaCommune';
import { TamQuangCommune } from './communes/TamQuangCommune';
import { TamTraCommune } from './communes/TamTraCommune';
import { TamMyTayCommune } from './communes/TamMyTayCommune';
import { TamMyDongCommune } from './communes/TamMyDongCommune';
import { TamAnhNamCommune } from './communes/TamAnhNamCommune';
import { TamAnhBacCommune } from './communes/TamAnhBacCommune';
import { TamSonCommune } from './communes/TamSonCommune';
import { TamThanhCommune } from './communes/TamThanhCommune';
import { TamTienCommune } from './communes/TamTienCommune';
import { TamHoaCommune } from './communes/TamHoaCommune';
import { TamGiangCommune } from './communes/TamGiangCommune';
import { TamXuan1Commune } from './communes/TamXuan1Commune';
import { TamXuan2Commune } from './communes/TamXuan2Commune';
import { NuiThanhRoadNetwork } from './infrastructure/NuiThanhRoadNetwork';
import { NuiThanhTerritoryManager } from './infrastructure/NuiThanhTerritoryManager';
import { NuiThanhLandscapeManager } from './infrastructure/NuiThanhLandscapeManager';

/**
 * Huyện Núi Thành (Khu Kinh Tế Mở Chu Lai - Tỉnh Quảng Nam / Đà Nẵng Mới)
 * Toàn bộ 17 đơn vị hành chính gồm 1 Thị trấn và 16 Xã được mô hình hóa 3D chi tiết:
 * 1. Thị trấn Núi Thành (Trung tâm chính trị - hành chính, Sông & Cầu An Tân, Ga Núi Thành)
 * 2. Xã Tam Hiệp (KCN THACO, Cầu vượt Cây Xương Rồng, Cảng Chu Lai, Thôn Thái Xuân)
 * 3. Xã Tam Hải (Xã đảo dừa, Kỳ quan Ghềnh Bàn Than, Cổng Tò Vò, Bến phà)
 * 4. Xã Tam Nghĩa (Sân bay Quốc tế Chu Lai, Đường băng 4.050m, Cửa ngõ Dốc Sỏi)
 * 5. Xã Tam Quang (Cảng Kỳ Hà, Bến cá Tam Quang, Vịnh An Hòa)
 * 6. Xã Tam Trà (Bản làng đồng bào Kor, Núi Hòn Tàu 953m, Cầu treo vượt suối, Đồi quế)
 * 7. Xã Tam Mỹ Tây (Danh thắng Thác 11 tầng Hố Giang Thơm, Vườn cây ăn trái)
 * 8. Xã Tam Mỹ Đông (Đồng lúa phù sa, Đập thủy lợi, Nông thôn mới)
 * 9. Xã Tam Anh Nam (Khu công nghiệp Tam Anh 1, Trục QL1A và hậu cần logistics)
 * 10. Xã Tam Anh Bắc (Khu công nghiệp Tam Anh 2 sinh thái, Nông nghiệp sạch)
 * 11. Xã Tam Sơn (Lòng hồ thủy lợi rộng lớn, Đập tràn Hố Khế, Đảo nổi sinh thái)
 * 12. Xã Tam Thạnh (Hồ chứa nước Thái Xuân, Rừng keo tràm bạt ngàn)
 * 13. Xã Tam Tiến (Chợ cá bãi biển bình minh Tam Tiến, Bờ cát trắng & Rặng phi lao)
 * 14. Xã Tam Hòa (Cầu Tam Hòa, Nuôi trồng thủy sản lồng bè sông Trường Giang)
 * 15. Xã Tam Giang (Ngã ba cửa sông An Tân, Rừng dừa nước ngập mặn)
 * 16. Xã Tam Xuân 1 (Cửa ngõ Bắc giáp Tam Kỳ, Cầu Bà Bầu, Làng nghề bún sắn)
 * 17. Xã Tam Xuân 2 (Khu nông nghiệp công nghệ cao, Chế biến lâm sản)
 */
export class NuiThanhDistrict extends BaseDistrict {
  public roadNetwork: NuiThanhRoadNetwork;
  public nuiThanhTown: NuiThanhTown;
  public tamHiepCommune: TamHiepCommune;
  public tamHaiCommune: TamHaiCommune;
  public tamNghiaCommune: TamNghiaCommune;
  public tamQuangCommune: TamQuangCommune;
  public tamTraCommune: TamTraCommune;
  public tamMyTayCommune: TamMyTayCommune;
  public tamMyDongCommune: TamMyDongCommune;
  public tamAnhNamCommune: TamAnhNamCommune;
  public tamAnhBacCommune: TamAnhBacCommune;
  public tamSonCommune: TamSonCommune;
  public tamThanhCommune: TamThanhCommune;
  public tamTienCommune: TamTienCommune;
  public tamHoaCommune: TamHoaCommune;
  public tamGiangCommune: TamGiangCommune;
  public tamXuan1Commune: TamXuan1Commune;
  public tamXuan2Commune: TamXuan2Commune;
  public territoryManager: NuiThanhTerritoryManager;
  public landscapeManager: NuiThanhLandscapeManager;

  constructor() {
    super(
      {
        id: 'nui-thanh',
        name: 'Huyện Núi Thành (Khu Kinh Tế Chu Lai)',
        nameEn: 'Nui Thanh District (Chu Lai Economic Hub)',
        type: 'rural_district',
        areaKm2: 555.9,
        centerCoordinates: {
          lat: 15.4285,
          lng: 108.6472,
        },
        cameraPreset: {
          position: [200, 360, 1120],
          target: [200, 0, 760],
        },
      },
      {
        minX: -220,
        maxX: 520,
        minZ: 490,
        maxZ: 1050,
      }
    );

    // 1. Hệ thống địa giới hành chính & ranh giới 17 xã/thị trấn (555.9 km²)
    this.territoryManager = new NuiThanhTerritoryManager();
    this.group.add(this.territoryManager.group);

    // 2. Mạng lưới hạ tầng giao thông kết nối đồng bộ toàn huyện
    this.roadNetwork = new NuiThanhRoadNetwork();
    this.group.add(this.roadNetwork.group);

    // 2.1 Mạng lưới thảm thực vật tự nhiên, khu dân cư 17 xã và dòng xe chuyển động
    this.landscapeManager = new NuiThanhLandscapeManager();
    this.group.add(this.landscapeManager.group);

    // 3. Toàn bộ 17 đơn vị hành chính cấp xã / thị trấn
    this.nuiThanhTown = new NuiThanhTown();
    this.tamHiepCommune = new TamHiepCommune();
    this.tamHaiCommune = new TamHaiCommune();
    this.tamNghiaCommune = new TamNghiaCommune();
    this.tamQuangCommune = new TamQuangCommune();
    this.tamTraCommune = new TamTraCommune();
    this.tamMyTayCommune = new TamMyTayCommune();
    this.tamMyDongCommune = new TamMyDongCommune();
    this.tamAnhNamCommune = new TamAnhNamCommune();
    this.tamAnhBacCommune = new TamAnhBacCommune();
    this.tamSonCommune = new TamSonCommune();
    this.tamThanhCommune = new TamThanhCommune();
    this.tamTienCommune = new TamTienCommune();
    this.tamHoaCommune = new TamHoaCommune();
    this.tamGiangCommune = new TamGiangCommune();
    this.tamXuan1Commune = new TamXuan1Commune();
    this.tamXuan2Commune = new TamXuan2Commune();

  }

  public initialize(): void {
    // Đăng ký toàn bộ 17 xã thị trấn vào hệ thống quản lý phân cấp
    this.registerWard(this.nuiThanhTown);
    this.registerWard(this.tamHiepCommune);
    this.registerWard(this.tamHaiCommune);
    this.registerWard(this.tamNghiaCommune);
    this.registerWard(this.tamQuangCommune);
    this.registerWard(this.tamTraCommune);
    this.registerWard(this.tamMyTayCommune);
    this.registerWard(this.tamMyDongCommune);
    this.registerWard(this.tamAnhNamCommune);
    this.registerWard(this.tamAnhBacCommune);
    this.registerWard(this.tamSonCommune);
    this.registerWard(this.tamThanhCommune);
    this.registerWard(this.tamTienCommune);
    this.registerWard(this.tamHoaCommune);
    this.registerWard(this.tamGiangCommune);
    this.registerWard(this.tamXuan1Commune);
    this.registerWard(this.tamXuan2Commune);

    this.isLoaded = true;
  }

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    if (this.landscapeManager) {
      this.landscapeManager.update(delta, elapsed);
    }
    super.update(delta, elapsed, nightGlowIntensity);
  }
}
