import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Nghĩa & Cảng Hàng Không Quốc Tế Chu Lai (Huyện Núi Thành)
 * Major aviation and transport gateway in Central Vietnam:
 * - Sân bay Quốc tế Chu Lai với đường băng 4.050m (dài nhất Việt Nam)
 * - Đài kiểm soát không lưu (ATC Tower) cao 42m với radar xoay
 * - Nhà ga hành khách sân bay Chu Lai hiện đại & sân đỗ tàu bay (Apron)
 * - Máy bay chở khách thương mại Vietnam Airlines & Vietjet Air
 * - Cửa ngõ Dốc Sỏi trên Quốc lộ 1A kết nối Quảng Nam - Quảng Ngãi
 */
export class TamNghiaCommune extends BaseWard {
  private radarDish: THREE.Mesh | null = null;
  private runwayLights: THREE.Mesh[] = [];

  constructor() {
    super(
      {
        id: 'tam-nghia-commune',
        name: 'Xã Tam Nghĩa (Sân Bay Chu Lai)',
        nameEn: 'Tam Nghia Commune (Chu Lai Airport)',
        type: 'commune',
        areaKm2: 51.6,
        description:
          'Địa bàn Cảng hàng không Quốc tế Chu Lai - sân bay có diện tích lớn nhất cả nước và đường băng dài nhất Việt Nam (4.050m), cửa ngõ Dốc Sỏi giáp ranh Quảng Ngãi.',
        cameraPreset: {
          position: [240, 75, 875],
          target: [280, 4, 925],
        },
        subLandmarks: [
          {
            id: 'chu-lai-airport-overview',
            name: '👁️ Toàn Cảnh Sân Bay Chu Lai',
            category: 'nature',
            cameraPreset: { position: [230, 95, 995], target: [285, 4, 925] },
            description: 'Toàn cảnh Cảng hàng không quốc tế Chu Lai với đường băng 4.050m và đài không lưu.',
          },
          {
            id: 'airport-runway',
            name: '🛫 Đường Băng 4.050m (Dài Nhất VN)',
            category: 'transport',
            cameraPreset: { position: [265, 30, 1005], target: [280, 2, 935] },
            description: 'Đường băng cất hạ cánh dài nhất Việt Nam với đầy đủ vạch chuẩn ICAO và dải đèn tiếp cận.',
          },
          {
            id: 'atc-tower',
            name: '🗼 Đài Kiểm Soát Không Lưu Chu Lai',
            category: 'building',
            cameraPreset: { position: [245, 36, 985], target: [255, 18, 915] },
            description: 'Tháp chỉ huy không lưu cao 42m với cabin kính quan sát 360 độ và radar quét bầu trời.',
          },
          {
            id: 'airport-terminal',
            name: '🏢 Nhà Ga Hành Khách & Máy Bay',
            category: 'building',
            cameraPreset: { position: [230, 28, 1005], target: [255, 4, 935] },
            description: 'Nhà ga hành khách hiện đại cùng máy bay phản lực Vietnam Airlines và Vietjet Air trên sân đỗ.',
          },
          {
            id: 'doc-soi-gateway',
            name: '🛣️ Cửa Ngõ Dốc Sỏi (QL1A)',
            category: 'transport',
            cameraPreset: { position: [195, 25, 1045], target: [215, 3, 975] },
            description: 'Điểm nút giao thông Dốc Sỏi trên QL1A kết nối Núi Thành với Khu kinh tế Dung Quất - Quảng Ngãi.',
          },
        ],
      },
      {
        minX: 170,
        maxX: 360,
        minZ: 850,
        maxZ: 1000,
      }
    );

    this.buildAirfieldAndRunways();
    this.buildAirTrafficControlTower();
    this.buildPassengerTerminal();
    this.buildCommercialAirplanes();
    this.buildDocSoiGateway();
  }

  /**
   * 1. 4050m Long Runway, Parallel Taxiway & Markings (Đường băng & vạch tín hiệu ICAO)
   */
  private buildAirfieldAndRunways(): void {
    const airfieldGroup = new THREE.Group();
    airfieldGroup.position.set(285, 0, 925);

    const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x1f2329, roughness: 0.82 });
    const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x7a6e5a, roughness: 0.9 });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const yellowMat = new THREE.MeshBasicMaterial({ color: 0xffc107 });

    // Main 4050m Runway (length 170 in 3D units, width 18)
    const runwayGeo = new THREE.PlaneGeometry(18, 170);
    runwayGeo.rotateX(-Math.PI / 2);
    const runway = new THREE.Mesh(runwayGeo, asphaltMat);
    runway.position.y = 0.38;
    runway.receiveShadow = true;
    airfieldGroup.add(runway);

    // Earthen & paved shoulders
    const shoulderGeo = new THREE.PlaneGeometry(24, 172);
    shoulderGeo.rotateX(-Math.PI / 2);
    const shoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulder.position.y = 0.36;
    airfieldGroup.add(shoulder);

    // Parallel Taxiway at X: -26
    const taxiGeo = new THREE.PlaneGeometry(10, 160);
    taxiGeo.rotateX(-Math.PI / 2);
    const taxiway = new THREE.Mesh(taxiGeo, asphaltMat);
    taxiway.position.set(-26, 0.38, 0);
    airfieldGroup.add(taxiway);

    // Connecting high-speed exit taxiways
    [-50, 0, 50].forEach((tz) => {
      const exitGeo = new THREE.PlaneGeometry(22, 9.0);
      exitGeo.rotateX(-Math.PI / 2);
      const exit = new THREE.Mesh(exitGeo, asphaltMat);
      exit.position.set(-13, 0.38, tz);
      airfieldGroup.add(exit);
    });

    // Runway Centerline Dashes (Vạch tim đường băng)
    for (let d = -75; d <= 75; d += 10) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 6.0), whiteMat);
      dash.rotateX(-Math.PI / 2);
      dash.position.set(0, 0.4, d);
      airfieldGroup.add(dash);
    }

    // Threshold Piano Keys (Vạch vằn thềm cất hạ cánh đầu đường băng)
    [-78, 78].forEach((endZ) => {
      for (let k = -7; k <= 7; k += 1.8) {
        const key = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 8.0), whiteMat);
        key.rotateX(-Math.PI / 2);
        key.position.set(k, 0.4, endZ);
        airfieldGroup.add(key);
      }
    });

    // Runway Edge Lights (Đèn tín hiệu đường băng)
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let l = -80; l <= 80; l += 16) {
      [-9.2, 9.2].forEach((lx) => {
        const light = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.35, 6), lightMat);
        light.position.set(lx, 0.5, l);
        this.runwayLights.push(light);
        airfieldGroup.add(light);
      });
    }

    this.group.add(airfieldGroup);
  }

  /**
   * 2. Air Traffic Control Tower (Đài Kiểm Soát Không Lưu Chu Lai Cao 42m)
   */
  private buildAirTrafficControlTower(): void {
    const towerGroup = new THREE.Group();
    towerGroup.position.set(252, 0.42, 912);

    const whiteShaftMat = new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.3 });
    const redAccentMat = new THREE.MeshStandardMaterial({ color: 0xd90429, roughness: 0.4 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x112233,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.5,
    });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xdce2e8, metalness: 0.8, roughness: 0.2 });

    const towerHeight = 18.0; // Scaled 42m tower

    // Tower base building
    const baseBuilding = new THREE.Mesh(new THREE.BoxGeometry(16, 3.5, 16), whiteShaftMat);
    baseBuilding.position.y = 1.75;
    baseBuilding.castShadow = true;
    towerGroup.add(baseBuilding);

    // Tapered concrete column shaft with red aviation warning bands
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 3.2, towerHeight, 16), whiteShaftMat);
    shaft.position.y = towerHeight / 2 + 3.5;
    shaft.castShadow = true;
    towerGroup.add(shaft);

    // Red bands on shaft
    [7.5, 14.5].forEach((by) => {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 2.0, 16), redAccentMat);
      band.position.y = by;
      towerGroup.add(band);
    });

    // Cantilevered Octagonal Cab Glass Platform (Cabin quan sát 360 độ)
    const cab = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 3.2, 4.0, 8), glassMat);
    cab.position.y = towerHeight + 3.5 + 2.0;
    cab.castShadow = true;
    towerGroup.add(cab);

    // Tower roof cap with radome
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.8, 0.8, 8), whiteShaftMat);
    cap.position.y = towerHeight + 3.5 + 4.4;
    towerGroup.add(cap);

    // Rotating Secondary Radar Antenna Dish
    this.radarDish = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.8, 0.4), metalMat);
    this.radarDish.position.set(0, towerHeight + 3.5 + 5.6, 0);
    towerGroup.add(this.radarDish);

    // Warning Red Beacon Light
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    beacon.position.set(0, towerHeight + 3.5 + 6.8, 0);
    towerGroup.add(beacon);

    this.group.add(towerGroup);
  }

  /**
   * 3. Passenger Terminal & Apron (Nhà Ga Hành Khách & Sân Đỗ)
   */
  private buildPassengerTerminal(): void {
    const terminalGroup = new THREE.Group();
    terminalGroup.position.set(245, 0.42, 940);

    const silverRoofMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0e8, // Sleek brushed curved aluminum
      metalness: 0.65,
      roughness: 0.25,
    });
    const glassFacadeMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a5f,
      roughness: 0.15,
      metalness: 0.8,
    });

    // Main Curved Passenger Terminal Hall (length 48, depth 22, height 7)
    const hallGeo = new THREE.BoxGeometry(46, 6.5, 20);
    const hall = new THREE.Mesh(hallGeo, glassFacadeMat);
    hall.position.y = 3.25;
    hall.castShadow = true;
    terminalGroup.add(hall);

    // Aerodynamic curved arched roof
    const roofGeo = new THREE.CylinderGeometry(15, 15, 48, 24, 1, false, 0, Math.PI);
    roofGeo.rotateZ(Math.PI / 2);
    const roof = new THREE.Mesh(roofGeo, silverRoofMat);
    roof.position.set(0, 6.5, 0);
    roof.scale.set(1, 0.35, 0.8);
    roof.castShadow = true;
    terminalGroup.add(roof);

    // Signboard: CẢNG HÀNG KHÔNG QUỐC TẾ CHU LAI
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 80;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#004d9c';
    ctx.fillRect(0, 0, 512, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CẢNG HÀNG KHÔNG QUỐC TẾ CHU LAI', 256, 48);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 2.5),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 7.8, -10.2);
    terminalGroup.add(signMesh);

    // Jet Bridge passenger boarding gate
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xccd4db, roughness: 0.4 });
    const jetBridge = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.2, 12), bridgeMat);
    jetBridge.position.set(12, 3.2, 12);
    terminalGroup.add(jetBridge);

    this.group.add(terminalGroup);
  }

  /**
   * 4. Commercial Airplanes on Apron (Máy bay Vietnam Airlines & Vietjet Air)
   */
  private buildCommercialAirplanes(): void {
    const apronGroup = new THREE.Group();
    apronGroup.position.set(260, 0.42, 940);

    // A. Vietnam Airlines Airbus (Lotus Blue & Golden Lotus)
    const vnaGroup = new THREE.Group();
    vnaGroup.position.set(0, 0, 16);

    const vnaBlueMat = new THREE.MeshStandardMaterial({ color: 0x004c87, roughness: 0.3, metalness: 0.4 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.25, metalness: 0.3 });
    const goldLotusMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });

    // Fuselage tube (length 24, radius 1.8)
    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 24, 16), vnaBlueMat);
    fuselage.rotateX(Math.PI / 2);
    fuselage.position.y = 2.4;
    fuselage.castShadow = true;
    vnaGroup.add(fuselage);

    // Nose cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4.0, 16), whiteMat);
    nose.rotateX(-Math.PI / 2);
    nose.position.set(0, 2.4, 14);
    vnaGroup.add(nose);

    // Swept wings (sải cánh rộng)
    const wingGeo = new THREE.BoxGeometry(22, 0.25, 4.2);
    wingGeo.rotateY(0.2);
    const wings = new THREE.Mesh(wingGeo, whiteMat);
    wings.position.set(0, 2.2, 0);
    wings.castShadow = true;
    vnaGroup.add(wings);

    // Jet engines under wings
    [-5.5, 5.5].forEach((ex) => {
      const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 3.2, 12), whiteMat);
      engine.rotateX(Math.PI / 2);
      engine.position.set(ex, 1.2, 1.0);
      vnaGroup.add(engine);
    });

    // Vertical stabilizer tail (Đuôi hoa sen)
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 3.5), vnaBlueMat);
    tail.position.set(0, 5.2, -10.5);
    vnaGroup.add(tail);

    const lotus = new THREE.Mesh(new THREE.CircleGeometry(0.85, 12), goldLotusMat);
    lotus.position.set(0.18, 5.5, -10.5);
    lotus.rotateY(Math.PI / 2);
    vnaGroup.add(lotus);

    apronGroup.add(vnaGroup);

    // B. Vietjet Air Airbus (Red tail & white fuselage)
    const vjGroup = new THREE.Group();
    vjGroup.position.set(-18, 0, 16);

    const vjRedMat = new THREE.MeshStandardMaterial({ color: 0xd90429, roughness: 0.3 });
    const vjFuselage = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 22, 16), whiteMat);
    vjFuselage.rotateX(Math.PI / 2);
    vjFuselage.position.y = 2.4;
    vjGroup.add(vjFuselage);

    const vjWings = new THREE.Mesh(new THREE.BoxGeometry(20, 0.25, 4.0), whiteMat);
    vjWings.position.set(0, 2.2, 0);
    vjGroup.add(vjWings);

    const vjTail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 3.2), vjRedMat);
    vjTail.position.set(0, 5.0, -9.5);
    vjGroup.add(vjTail);

    apronGroup.add(vjGroup);

    this.group.add(apronGroup);
  }

  /**
   * 5. Cửa Ngõ Dốc Sỏi - Ranh Giới Quảng Nam & Quảng Ngãi (Doc Soi Border Gateway)
   */
  private buildDocSoiGateway(): void {
    const docSoiGroup = new THREE.Group();
    // Positioned precisely across Highway 1A at X = 220, Z = 975
    docSoiGroup.position.set(220, 0.42, 975);

    const archMat = new THREE.MeshStandardMaterial({ color: 0x004d9c, metalness: 0.7, roughness: 0.3 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.8, roughness: 0.2 });

    // Welcome Portal Arch spanning across 6 lanes of Highway 1A (width 14m)
    const pylonL = new THREE.Mesh(new THREE.BoxGeometry(1.4, 8.5, 1.4), archMat);
    pylonL.position.set(-6.5, 4.25, 0);
    pylonL.castShadow = true;

    const pylonR = new THREE.Mesh(new THREE.BoxGeometry(1.4, 8.5, 1.4), archMat);
    pylonR.position.set(6.5, 4.25, 0);
    pylonR.castShadow = true;

    const lintel = new THREE.Mesh(new THREE.BoxGeometry(15, 1.4, 1.6), archMat);
    lintel.position.set(0, 8.5, 0);
    lintel.castShadow = true;

    // Welcome Signboard Canvas
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 384;
    signCanvas.height = 80;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#b5251d';
    ctx.fillRect(0, 0, 384, 80);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 372, 68);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('QUẢNG NAM KÍNH CHÀO', 192, 36);
    ctx.fillStyle = '#ffea00';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('CỬA NGÕ DỐC SỎI - NÚI THÀNH', 192, 64);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10.5, 2.2),
      new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
    );
    signMesh.position.set(0, 8.5, 0.85);

    docSoiGroup.add(pylonL, pylonR, lintel, signMesh);
    this.group.add(docSoiGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, elapsed: number, _nightGlowIntensity: number): void {
    // 1. Spin air traffic radar dish
    if (this.radarDish) {
      this.radarDish.rotation.y = elapsed * 3.5;
    }

    // 2. Pulse runway approach lights
    this.runwayLights.forEach((light, idx) => {
      const b = (Math.sin(elapsed * 6.0 + idx * 0.4) + 1.0) * 0.5;
      (light.material as THREE.MeshBasicMaterial).color.setRGB(b, b, b);
    });
  }
}
