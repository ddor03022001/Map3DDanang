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
  private trafficVehicles: THREE.Mesh[] = [];

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
            cameraPreset: { position: [240, 95, 620], target: [275, 4, 720] },
            description: 'Toàn cảnh trung tâm công nghiệp THACO, cảng biển nước sâu và làng quê Tam Hiệp.',
          },
          {
            id: 'thaco-complex',
            name: '🚗 KCN Ô Tô THACO Chu Lai',
            category: 'building',
            cameraPreset: { position: [310, 65, 640], target: [280, 6, 720] },
            description: 'Tổ hợp nhà máy sản xuất ô tô THACO Mazda, KIA, Bus, Truck và trung tâm cơ khí chính xác.',
          },
          {
            id: 'chu-lai-overpass',
            name: '🌵 Cầu Vượt Cây Xương Rồng',
            category: 'bridge',
            cameraPreset: { position: [205, 38, 665], target: [220, 4, 720] },
            description: 'Nút giao 2 tầng khác mức vượt Quốc Lộ 1A và biểu tượng Tượng đài Cây Xương Rồng nở hoa.',
          },
          {
            id: 'chu-lai-port',
            name: '🚢 Cảng Biển Quốc Tế Chu Lai',
            category: 'building',
            cameraPreset: { position: [340, 45, 660], target: [310, 6, 725] },
            description: 'Cảng container nước sâu với cẩu bờ STS, bãi container và tàu hàng viễn dương CHU LAI STAR.',
          },
          {
            id: 'thai-xuan-village',
            name: '🏡 Làng Cổ Thôn Thái Xuân & Chùa',
            category: 'cultural',
            cameraPreset: { position: [120, 25, 630], target: [145, 4, 680] },
            description: 'Làng quê Thôn Thái Xuân thanh bình với nhà ngói đỏ, sân phơi gạch, Chùa Tam Hiệp và cây đa cổ thụ.',
          },
          {
            id: 'tam-hiep-railway',
            name: '🚆 Tuyến Đường Sắt Bắc - Nam',
            category: 'transport',
            cameraPreset: { position: [180, 32, 680], target: [208, 3, 720] },
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

    // 7. Dynamic Traffic on Highway 1A
    this.buildTraffic();
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
      const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 5.0), wallMat);
      body.position.y = 1.6;
      body.castShadow = true;
      house.add(body);

      // Traditional 4-sided hip roof
      const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 1.8, 4), roofMat);
      roof.rotateY(Math.PI / 4);
      roof.scale.set(1.3, 1, 1.0);
      roof.position.y = 3.2 + 0.9;
      roof.castShadow = true;
      house.add(roof);

      hamlet.add(house);
    });

    // Chùa Tam Hiệp (2-tier pagoda with curved eaves)
    const pagoda = new THREE.Group();
    pagoda.position.set(-2, 0, -2);

    const base = new THREE.Mesh(new THREE.BoxGeometry(10, 4.2, 8), wallMat);
    base.position.y = 2.1;
    pagoda.add(base);

    const roofLower = new THREE.Mesh(new THREE.ConeGeometry(8.5, 2.0, 4), roofMat);
    roofLower.rotateY(Math.PI / 4);
    roofLower.scale.set(1.35, 1, 1.15);
    roofLower.position.y = 4.2 + 1.0;
    pagoda.add(roofLower);

    const upperFloor = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.0, 5.5), wallMat);
    upperFloor.position.y = 4.2 + 2.0 + 1.5;
    pagoda.add(upperFloor);

    const roofUpper = new THREE.Mesh(new THREE.ConeGeometry(6.5, 2.2, 4), roofMat);
    roofUpper.rotateY(Math.PI / 4);
    roofUpper.scale.set(1.3, 1, 1.1);
    roofUpper.position.y = 4.2 + 2.0 + 3.0 + 1.1;
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

    // Trụ sở UBND Xã Tam Hiệp (3-story administrative building)
    const ubnd = new THREE.Mesh(new THREE.BoxGeometry(18, 6.5, 10), wallYellowMat);
    ubnd.position.set(0, 3.25, 0);
    ubnd.castShadow = true;
    civic.add(ubnd);

    const ubndRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 2.6, 4), roofRedMat);
    ubndRoof.rotateY(Math.PI / 4);
    ubndRoof.scale.set(1.4, 1, 0.9);
    ubndRoof.position.set(0, 6.5 + 1.3, 0);
    civic.add(ubndRoof);

    // Flagpole with Vietnam National Flag
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 11, 8), poleMat);
    pole.position.set(0, 5.5, 8);
    civic.add(pole);

    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), flagRedMat);
    flag.position.set(1.2, 10, 8);
    civic.add(flag);

    // Chợ Tam Hiệp (Covered local market hall)
    const marketMat = new THREE.MeshStandardMaterial({ color: 0x3d7ea6, roughness: 0.6 });
    const market = new THREE.Mesh(new THREE.BoxGeometry(22, 4.0, 14), wallYellowMat);
    market.position.set(0, 2.0, -18);
    civic.add(market);

    const marketRoof = new THREE.Mesh(new THREE.ConeGeometry(16, 2.2, 4), marketMat);
    marketRoof.rotateY(Math.PI / 4);
    marketRoof.scale.set(1.4, 1, 0.95);
    marketRoof.position.set(0, 4.0 + 1.1, -18);
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

  /**
   * 7. Highway 1A Dynamic Traffic
   */
  private buildTraffic(): void {
    const trafficGroup = new THREE.Group();
    trafficGroup.position.set(220, 0.45, 715);

    const carColors = [0x004d9c, 0xc82333, 0xf5f5f5, 0x222222, 0xf39c12, 0x27ae60];
    const carGeo = new THREE.BoxGeometry(1.8, 1.2, 3.8);

    for (let i = 0; i < 8; i++) {
      const mat = new THREE.MeshStandardMaterial({ color: carColors[i % carColors.length], roughness: 0.4 });
      const car = new THREE.Mesh(carGeo, mat);
      const laneX = i % 2 === 0 ? -1.8 : 1.8;
      car.position.set(laneX, 0.6, -45 + i * 14);
      car.userData = { speed: (i % 2 === 0 ? 1 : -1) * (14 + Math.random() * 8), laneX };
      this.trafficVehicles.push(car);
      trafficGroup.add(car);
    }

    this.group.add(trafficGroup);
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

    // Move traffic vehicles on Highway 1A
    this.trafficVehicles.forEach((car) => {
      car.position.z += car.userData.speed * delta;
      if (car.position.z > 55) car.position.z = -55;
      if (car.position.z < -55) car.position.z = 55;
    });
  }
}
