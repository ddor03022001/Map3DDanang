import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';
import { ChuLaiOverpass } from '../landmarks/ChuLaiOverpass';
import { ThacoComplex } from '../landmarks/ThacoComplex';
import { ChuLaiPort } from '../landmarks/ChuLaiPort';

/**
 * Xã Tam Hiệp (Huyện Núi Thành, Tỉnh Quảng Nam)
 * Trọng điểm công nghiệp & dịch vụ cảng biển:
 * - Đại phức hợp công nghiệp ô tô & cơ khí THACO Chu Lai
 * - Nút giao cầu vượt vòng xuyến 2 tầng Cây Xương Rồng Chu Lai
 * - Cảng biển quốc tế Chu Lai & bến cảng container nước sâu Tam Hiệp
 * - Thôn cổ Thái Xuân & Chùa Tam Hiệp thanh bình
 * - Tuyến đường sắt Bắc - Nam & Quốc lộ 1A huyết mạch
 */
export class TamHiepCommune extends BaseWard {
  public overpass: ChuLaiOverpass;
  public thacoComplex: ThacoComplex;
  public port: ChuLaiPort;

  private trainHead: THREE.Group | null = null;

  constructor() {
    super(
      {
        id: 'tam-hiep-commune',
        name: 'Xã Tam Hiệp',
        nameEn: 'Tam Hiep Commune',
        type: 'commune',
        areaKm2: 42.1,
        description:
          'Trái tim Khu Kinh Tế Mở Chu Lai, nơi đặt Đại phức hợp sản xuất ô tô THACO, nút giao vòng xuyến 2 tầng Cây Xương Rồng, cảng biển Chu Lai và làng cổ Thôn Thái Xuân ven sông.',
        cameraPreset: {
          position: [240, 85, 630],
          target: [275, 4, 720],
        },
        subLandmarks: [
          {
            id: 'tam-hiep-overview',
            name: '👁️ Toàn Cảnh Xã Tam Hiệp',
            category: 'nature',
            cameraPreset: { position: [240, 95, 820], target: [275, 4, 720] },
            description: 'Toàn cảnh trung tâm công nghiệp THACO, cảng biển nước sâu và làng quê Tam Hiệp.',
          },
          {
            id: 'thaco-complex',
            name: '🚗 KCN Ô Tô THACO Chu Lai',
            category: 'building',
            cameraPreset: { position: [310, 65, 800], target: [280, 6, 720] },
            description: 'Tổ hợp nhà máy sản xuất ô tô THACO Mazda, KIA, Bus, Truck và trung tâm cơ khí chính xác.',
          },
          {
            id: 'chu-lai-overpass',
            name: '🌵 Cầu Vượt Cây Xương Rồng',
            category: 'bridge',
            cameraPreset: { position: [205, 38, 790], target: [220, 4, 720] },
            description: 'Nút giao 2 tầng khác mức vượt Quốc Lộ 1A và biểu tượng Tượng đài Cây Xương Rồng nở hoa.',
          },
          {
            id: 'chu-lai-port',
            name: '🚢 Cảng Biển Quốc Tế Chu Lai',
            category: 'building',
            cameraPreset: { position: [340, 45, 795], target: [310, 6, 725] },
            description: 'Cảng container nước sâu với cẩu bờ STS, bãi container và tàu hàng viễn dương CHU LAI STAR.',
          },
          {
            id: 'thai-xuan-village',
            name: '🏡 Làng Cổ Thôn Thái Xuân & Chùa',
            category: 'cultural',
            cameraPreset: { position: [120, 25, 750], target: [145, 4, 680] },
            description: 'Làng quê Thôn Thái Xuân thanh bình với nhà ngói đỏ, sân phơi gạch, Chùa Tam Hiệp và cây đa cổ thụ.',
          },
          {
            id: 'tam-hiep-railway',
            name: '🚆 Tuyến Đường Sắt Bắc - Nam',
            category: 'transport',
            cameraPreset: { position: [180, 32, 790], target: [208, 3, 720] },
            description: 'Tuyến đường ray thép quốc gia và đoàn tàu Thống Nhất SE chạy dọc qua địa phận xã.',
          },
        ],
      },
      {
        minX: 110,
        maxX: 340,
        minZ: 660,
        maxZ: 770,
      }
    );

    // 1. Chu Lai 2-level interchange & Cactus monument
    this.overpass = new ChuLaiOverpass();
    this.overpass.group.scale.set(0.7, 0.7, 0.7);
    this.group.add(this.overpass.group);

    // 2. THACO Automotive Mega-complex
    this.thacoComplex = new ThacoComplex();
    this.thacoComplex.group.scale.set(0.65, 0.65, 0.65);
    this.group.add(this.thacoComplex.group);

    // 3. Deepwater Chu Lai Seaport & Logistics Hub
    this.port = new ChuLaiPort();
    this.group.add(this.port.group);

    // 4. Hamlet of Thôn Thái Xuân & Historic Pagoda
    this.buildThaiXuanHamlet();

    // 5. Civic Center: UBND Xã & Chợ Tam Hiệp
    this.buildCivicCenter();

    // 6. North-South Railway Line & Moving Train
    this.buildRailway();
  }

  /**
   * 4. Traditional Hamlet of Thôn Thái Xuân & Sacred Pagoda
   */
  private buildThaiXuanHamlet(): void {
    const hamlet = new THREE.Group();
    hamlet.position.set(145, 0.42, 680);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf3eedb, roughness: 0.75 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa83226, roughness: 0.5 });
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x2e6630, roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c381e, roughness: 0.9 });

    // 8 Traditional tile-roofed cottages
    const cottageCoords = [
      { x: -16, z: -12 },
      { x: 0, z: -15 },
      { x: 18, z: -10 },
      { x: -22, z: 8 },
      { x: -6, z: 6 },
      { x: 12, z: 12 },
      { x: 26, z: 5 },
      { x: 4, z: 22 },
    ];

    cottageCoords.forEach((c) => {
      const house = new THREE.Group();
      house.position.set(c.x, 0, c.z);

      // Main house body
      const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.0, 5.0), wallMat);
      body.position.y = 1.5;
      body.castShadow = true;
      house.add(body);

      // Traditional 2-pitch gable terracotta tile roof
      const roof = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.9, 5.4), roofMat);
      roof.position.y = 3.45;
      roof.castShadow = true;
      house.add(roof);

      hamlet.add(house);
    });

    // Chùa Tam Hiệp (Traditional Vietnamese pagoda with tiled roofs)
    const pagoda = new THREE.Group();
    pagoda.position.set(-2, 0, -2);

    const base = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.8, 7.5), wallMat);
    base.position.y = 1.9;
    pagoda.add(base);

    const roofLower = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.8, 8.8), roofMat);
    roofLower.position.y = 4.2;
    pagoda.add(roofLower);

    const upperFloor = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.8, 5.2), wallMat);
    upperFloor.position.y = 6.0;
    pagoda.add(upperFloor);

    const roofUpper = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.8, 6.4), roofMat);
    roofUpper.position.y = 7.8;
    pagoda.add(roofUpper);

    hamlet.add(pagoda);

    // Ancient Banyan Tree beside pagoda
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.4, 6.5, 8), woodMat);
    trunk.position.set(12, 3.25, -2);
    hamlet.add(trunk);

    const canopy = new THREE.Mesh(new THREE.SphereGeometry(4.8, 10, 8), treeMat);
    canopy.scale.set(1.4, 0.75, 1.4);
    canopy.position.set(12, 6.8, -2);
    canopy.castShadow = true;
    hamlet.add(canopy);

    this.group.add(hamlet);
  }

  /**
   * 5. Civic Center: People's Committee & Market
   */
  private buildCivicCenter(): void {
    const civic = new THREE.Group();
    civic.position.set(175, 0.42, 705);

    const wallYellowMat = new THREE.MeshStandardMaterial({ color: 0xeddca4, roughness: 0.7 });
    const roofRedMat = new THREE.MeshStandardMaterial({ color: 0xb3382c, roughness: 0.5 });
    const flagRedMat = new THREE.MeshBasicMaterial({ color: 0xd91e18 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 });

    // Trụ sở UBND Xã Tam Hiệp (2-story administrative building)
    const ubnd = new THREE.Mesh(new THREE.BoxGeometry(16, 5.5, 9.0), wallYellowMat);
    ubnd.position.set(0, 2.75, 0);
    ubnd.castShadow = true;
    civic.add(ubnd);

    const ubndRoof = new THREE.Mesh(new THREE.BoxGeometry(17.2, 1.0, 10.2), roofRedMat);
    ubndRoof.position.set(0, 6.0, 0);
    civic.add(ubndRoof);

    // Flagpole with Vietnam National Flag
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 9, 8), poleMat);
    pole.position.set(0, 4.5, 7);
    civic.add(pole);

    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.3), flagRedMat);
    flag.position.set(1.0, 8.2, 7);
    civic.add(flag);

    // Chợ Tam Hiệp (Covered local market hall)
    const marketMat = new THREE.MeshStandardMaterial({ color: 0x2d6b91, roughness: 0.6 });
    const market = new THREE.Mesh(new THREE.BoxGeometry(18, 3.6, 12), wallYellowMat);
    market.position.set(0, 1.8, -16);
    civic.add(market);

    const marketRoof = new THREE.Mesh(new THREE.BoxGeometry(19.4, 0.8, 13.4), marketMat);
    marketRoof.position.set(0, 4.0, -16);
    civic.add(marketRoof);

    this.group.add(civic);
  }

  /**
   * 6. North-South Railway Line & SE Express Train
   */
  private buildRailway(): void {
    const railGroup = new THREE.Group();
    railGroup.position.set(208, 0.45, 715);

    const ballastMat = new THREE.MeshStandardMaterial({ color: 0x4a4742, roughness: 0.95 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x737980, metalness: 0.85, roughness: 0.3 });

    // Track ballast bed (length 110 along Z)
    const ballast = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 110), ballastMat);
    ballast.position.y = 0.15;
    railGroup.add(ballast);

    // Twin steel rails
    [-1.0, 1.0].forEach((rx) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 110), steelMat);
      rail.position.set(rx, 0.35, 0);
      railGroup.add(rail);
    });

    // Thong Nhat SE Train
    const train = new THREE.Group();
    this.trainHead = train;
    const locMat = new THREE.MeshStandardMaterial({ color: 0x1b4d89, roughness: 0.4, metalness: 0.3 });
    const coachMat = new THREE.MeshStandardMaterial({ color: 0xe6edf5, roughness: 0.5 });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xc82333 });

    // Locomotive (Đầu máy Đổi Mới D19E)
    const loco = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 12), locMat);
    loco.position.set(0, 1.8, -12);
    train.add(loco);

    // Passenger coaches
    [-26, -40].forEach((cz) => {
      const coach = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.5, 12), coachMat);
      coach.position.set(0, 1.75, cz);
      train.add(coach);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.4, 12), stripeMat);
      stripe.position.set(0, 1.7, cz);
      train.add(stripe);
    });

    railGroup.add(train);
    this.group.add(railGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(delta: number, elapsed: number, nightGlowIntensity: number): void {
    this.overpass.update(delta, elapsed, nightGlowIntensity);

    // Move Thong Nhat SE train along tracks
    if (this.trainHead) {
      this.trainHead.position.z += delta * 22;
      if (this.trainHead.position.z > 60) {
        this.trainHead.position.z = -60;
      }
    }
  }
}
