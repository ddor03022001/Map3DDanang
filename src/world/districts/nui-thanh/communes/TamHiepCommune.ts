import { BaseWard } from '../../core/BaseWard';
import { ChuLaiOverpass } from '../landmarks/ChuLaiOverpass';
import { ThacoComplex } from '../landmarks/ThacoComplex';
import { TamHiepRailway } from './tam-hiep/TamHiepRailway';
import { TamHiepCivicCenter } from './tam-hiep/TamHiepCivicCenter';
import { ChuLaiPort } from './tam-hiep/ChuLaiPort';
import { TamHiepTraffic } from './tam-hiep/TamHiepTraffic';
import { TamHiepLandscape } from './tam-hiep/TamHiepLandscape';

/**
 * Xã Tam Hiệp (Huyện Núi Thành, Tỉnh Quảng Nam)
 * 3D Digital Twin constructed on Topographical Relief Terrain (duancuulong.com style)
 * Features:
 * - Cầu vượt vòng xuyến 2 tầng Chu Lai & Biểu tượng Cây Xương Rồng
 * - Đại phức hợp công nghiệp ô tô & cơ khí THACO Chu Lai
 * - Tuyến đường sắt Bắc - Nam & Đoàn tàu khách Thống Nhất SE
 * - Trung tâm hành chính UBND Xã, Chợ Tam Hiệp, Trường học, Trạm Y tế, Khu dân cư
 * - Cảng Biển Quốc tế Chu Lai & Bến Tam Hiệp với cẩu giàn STS & tàu hàng container
 * - Giao thông chuyển động trên Quốc lộ 1A (Xe đầu kéo THACO, xe khách Mobihome)
 * - Cảnh quan hồ nuôi tôm sinh thái và rặng phi lao ven biển Núi Thành
 */
export class TamHiepCommune extends BaseWard {
  public overpass: ChuLaiOverpass;
  public thacoComplex: ThacoComplex;
  public railway: TamHiepRailway;
  public civicCenter: TamHiepCivicCenter;
  public port: ChuLaiPort;
  public traffic: TamHiepTraffic;
  public landscape: TamHiepLandscape;

  constructor() {
    super(
      {
        id: 'tam-hiep-commune',
        name: 'Xã Tam Hiệp (Khu Kinh Tế Chu Lai)',
        nameEn: 'Tam Hiep Commune (Chu Lai Open Economic Zone)',
        type: 'commune',
        areaKm2: 42.1,
        description:
          'Địa bàn trọng điểm công nghiệp Núi Thành: Cầu vượt 2 tầng Cây Xương Rồng, Phức hợp ô tô THACO Chu Lai, Tuyến đường sắt Bắc Nam, Cảng biển nước sâu Chu Lai và UBND Xã Tam Hiệp trên nền bản đồ vệ tinh thực tế.',
        cameraPreset: {
          position: [250, 95, 620],
          target: [280, 6, 720],
        },
        subLandmarks: [
          {
            id: 'tam-hiep-overview',
            name: '👁️ Toàn Cảnh Xã Tam Hiệp',
            category: 'nature',
            cameraPreset: { position: [250, 95, 620], target: [280, 6, 720] },
            description: 'Toàn cảnh 3D Xã Tam Hiệp nhìn từ trên cao, bao quát KCN THACO, Cầu Vượt Cây Xương Rồng và sông Trường Giang.',
          },
          {
            id: 'chu-lai-overpass',
            name: '🌵 Cầu Vượt Cây Xương Rồng',
            category: 'bridge',
            cameraPreset: { position: [192, 32, 685], target: [220, 4, 720] },
            description: 'Vòng xuyến 2 tầng và biểu tượng Cây Xương Rồng Chu Lai kiên cường nở hoa.',
          },
          {
            id: 'thaco-complex',
            name: '🚗 KCN Ô Tô THACO Chu Lai',
            category: 'building',
            cameraPreset: { position: [335, 78, 630], target: [295, 8, 720] },
            description: 'Nhà máy THACO Mazda, KIA, Bus & Truck, đường thử xe và bãi lưu trữ hàng trăm ô tô.',
          },
          {
            id: 'tam-hiep-civic',
            name: '🏛️ UBND & Chợ Tam Hiệp',
            category: 'cultural',
            cameraPreset: { position: [135, 32, 680], target: [165, 4, 710] },
            description: 'Trụ sở UBND Xã Tam Hiệp với cờ Tổ quốc, Chợ Tam Hiệp, trường học và khu dân cư.',
          },
          {
            id: 'chu-lai-port',
            name: '🚢 Cảng Biển Chu Lai & Tam Hiệp',
            category: 'building',
            cameraPreset: { position: [520, 52, 660], target: [490, 8, 720] },
            description: 'Cảng container nước sâu, cẩu giàn bờ STS và tàu hàng container CHU LAI STAR.',
          },
        ],
      },
      {
        minX: 100,
        maxX: 580,
        minZ: 400,
        maxZ: 960,
      }
    );

    // 1. Chu Lai 2-level interchange & Cactus monument
    this.overpass = new ChuLaiOverpass();
    this.group.add(this.overpass.group);

    // 2. THACO Automotive Mega-complex
    this.thacoComplex = new ThacoComplex();
    this.group.add(this.thacoComplex.group);

    // 3. North-South Railway & Thong Nhat SE train
    this.railway = new TamHiepRailway();
    this.group.add(this.railway.group);

    // 4. Civic center: UBND, Market, School, Health Station & Townhouses
    this.civicCenter = new TamHiepCivicCenter();
    this.group.add(this.civicCenter.group);

    // 5. Deepwater Chu Lai Seaport & Logistics Hub
    this.port = new ChuLaiPort();
    this.group.add(this.port.group);

    // 6. Dynamic traffic on Highway 1A and interchange
    this.traffic = new TamHiepTraffic();
    this.group.add(this.traffic.group);

    // 7. Coastal landscape: Casuarina groves & shrimp aquaculture ponds
    this.landscape = new TamHiepLandscape();
    this.group.add(this.landscape.group);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    this.overpass.update(delta, elapsed, nightGlowIntensity);
    this.railway.update(delta);
    this.traffic.update(delta);
    this.landscape.update(delta, elapsed);
  }
}
