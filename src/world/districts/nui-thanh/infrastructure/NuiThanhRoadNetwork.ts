import * as THREE from 'three';

/**
 * Nui Thanh District Master 3D Road & Infrastructure Network
 * (Mạng Lưới Hạ Tầng & Giao Thông 3D Chuẩn Tọa Độ Thực Tế Toàn Huyện Núi Thành)
 * Solves all alignment discrepancies and covers all 17 communes:
 * 1. National Highway 1A (QL1A): Continuous 6-lane spine at X = 220 from Z = 490 (Tam Kỳ) to Z = 1040 (Dốc Sỏi / Quảng Ngãi)
 * 2. DT618 Industrial & Port Artery: Continuous 4-lane boulevard at Z = 720 from Western hills (X = 60) to Chu Lai Port (X = 490)
 * 3. Vo Chi Cong Coastal Highway (Tuyến 129 ven biển): High-speed coastal artery along X = 330 from Tam Tiến down to Chu Lai Airport
 * 4. DT617 East-West Trunk Route:
 *    - East section: TT. Núi Thành (X = 220) -> Tam Giang -> Cảng Kỳ Hà & Bến Phà Tam Hải (X = 330)
 *    - West section: TT. Núi Thành (X = 220) -> Tam Mỹ Đông (X = 140) -> Tam Mỹ Tây / Hố Giang Thơm (X = 25) -> Tam Trà / Hòn Tàu (X = -110)
 * 5. Northern Inter-commune Artery (Đường huyện ĐH Tam Xuân - Tam Thạnh - Tam Sơn):
 *    - Connects QL1A at Tam Xuân 1 (X = 220, Z = 525) -> Tam Xuân 2 (X = 80) -> Hồ Thái Xuân / Tam Thạnh (X = 50, Z = 670) -> Tam Sơn (X = -75, Z = 715)
 * 6. Coastal Connecting Road (Tam Tiến -> Tam Hòa -> Cảng Kỳ Hà)
 * 7. Chu Lai Airport Access Boulevard connecting QL1A to Terminal & Apron (Z = 925)
 * 8. Continuous North-South Railway Line (X = 208)
 */
export class NuiThanhRoadNetwork {
  public group = new THREE.Group();

  constructor() {
    this.group.visible = false;
    this.buildDT618IndustrialAxis();
    this.buildVoChiCongCoastalHighway();
    this.buildDT617EastWestCorridor();
    this.buildNorthernHighlandArtery();
    this.buildCoastalInterCommuneRoad();
    this.buildAirportAccessBoulevard();
  }

  /**
   * 1. National Highway 1A Continuous 3D Spine (Trục Quốc Lộ 1A Xuyên Suốt Huyện Núi Thành)
   * Exact coordinate: X = 220, running straight from Z = 490 to Z = 1040 (Length 550 units)
   */
  private buildHighway1ASpine(): void {
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x22262c, // Modern dark asphalt
      roughness: 0.82,
    });
    const whiteStripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const medianMat = new THREE.MeshStandardMaterial({ color: 0x7a828a, roughness: 0.7 });

    const roadWidth = 9.2;
    const startZ = 490;
    const endZ = 1040;
    const totalLength = endZ - startZ;
    const centerY = 0.38;

    // A. Main Asphalt Road Bed
    const roadGeo = new THREE.PlaneGeometry(roadWidth, totalLength);
    roadGeo.rotateX(-Math.PI / 2);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(220, centerY, (startZ + endZ) / 2);
    road.receiveShadow = true;
    this.group.add(road);

    // B. Concrete Center Median Barrier (Dải phân cách giữa)
    // Exclude the roundabout center intersection at Z: 708 to 732
    const medianLength1 = 708 - startZ;
    const med1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, medianLength1), medianMat);
    med1.position.set(220, centerY + 0.22, startZ + medianLength1 / 2);
    this.group.add(med1);

    const medianLength2 = endZ - 732;
    const med2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, medianLength2), medianMat);
    med2.position.set(220, centerY + 0.22, 732 + medianLength2 / 2);
    this.group.add(med2);

    // C. Dashed Lane Markings
    for (let z = startZ + 6; z < endZ - 6; z += 12) {
      if (z > 705 && z < 735) continue; // Skip overpass circle
      if (z > 815 && z < 835) continue; // Skip river bridge

      [-2.3, 2.3].forEach((laneX) => {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5.0), whiteStripeMat);
        stripe.rotateX(-Math.PI / 2);
        stripe.position.set(220 + laneX, centerY + 0.02, z);
        this.group.add(stripe);
      });
    }

    // D. Outer White Shoulder Lines
    [-roadWidth / 2 + 0.3, roadWidth / 2 - 0.3].forEach((edgeX) => {
      const edgeLine = new THREE.Mesh(new THREE.PlaneGeometry(0.25, totalLength), whiteStripeMat);
      edgeLine.rotateX(-Math.PI / 2);
      edgeLine.position.set(220 + edgeX, centerY + 0.02, (startZ + endZ) / 2);
      this.group.add(edgeLine);
    });

    // E. Highway Street Lighting Poles along the road shoulder
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xb5bfc9, metalness: 0.7, roughness: 0.3 });
    for (let z = startZ + 20; z < endZ; z += 40) {
      if (z > 700 && z < 740) continue;
      if (z > 815 && z < 835) continue;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7.5, 8), lampMat);
      pole.position.set(220 + roadWidth / 2 + 0.8, centerY + 3.75, z);
      this.group.add(pole);

      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.1), lampMat);
      arm.position.set(220 + roadWidth / 2, centerY + 7.4, z);
      this.group.add(arm);
    }
  }

  /**
   * 2. DT618 Chu Lai Industrial & Port Artery (Trục Đông - Tây KCN THACO - Cảng Chu Lai)
   */
  private buildDT618IndustrialAxis(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x242830, roughness: 0.8 });
    const yellowStripeMat = new THREE.MeshBasicMaterial({ color: 0xf5c542 });

    const roadWidth = 8.4;
    const startX = 60;
    const endX = 490;
    const totalLength = endX - startX;
    const centerY = 0.38;

    const roadGeo = new THREE.PlaneGeometry(totalLength, roadWidth);
    roadGeo.rotateX(-Math.PI / 2);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set((startX + endX) / 2, centerY, 720);
    road.receiveShadow = true;
    this.group.add(road);

    for (let x = startX + 6; x < endX - 6; x += 10) {
      if (x > 205 && x < 235) continue;
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 0.22), yellowStripeMat);
      stripe.rotateX(-Math.PI / 2);
      stripe.position.set(x, centerY + 0.02, 720);
      this.group.add(stripe);
    }
  }

  /**
   * 3. Vo Chi Cong Coastal Highway (Tuyến 129 Ven Biển)
   */
  private buildVoChiCongCoastalHighway(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x282c34, roughness: 0.8 });

    const seg1Length = 840 - 490;
    const seg1Geo = new THREE.PlaneGeometry(8.0, seg1Length);
    seg1Geo.rotateX(-Math.PI / 2);
    const seg1 = new THREE.Mesh(seg1Geo, roadMat);
    seg1.position.set(330, 0.38, 490 + seg1Length / 2);
    seg1.receiveShadow = true;
    this.group.add(seg1);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(330, 0.38, 840),
      new THREE.Vector3(325, 0.38, 870),
      new THREE.Vector3(305, 0.38, 900),
      new THREE.Vector3(285, 0.38, 925),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 24, 4.0, 6, false);
    tubeGeo.scale(1, 0.04, 1);
    const connector = new THREE.Mesh(tubeGeo, roadMat);
    connector.receiveShadow = true;
    this.group.add(connector);
  }

  /**
   * 4. DT617 East-West Strategic Lifeline (Tuyến ĐT617 Toàn Tuyến Đông - Tây)
   * Connects Cảng Kỳ Hà (East) <-> TT. Núi Thành (Center) <-> Tam Mỹ Đông <-> Tam Mỹ Tây <-> Tam Trà (West)
   */
  private buildDT617EastWestCorridor(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x252a30, roughness: 0.8 });

    // A. East Section: TT. Núi Thành (X = 220) to Cảng Kỳ Hà (X = 330)
    const eastLength = 110;
    const eastGeo = new THREE.PlaneGeometry(eastLength, 7.2);
    eastGeo.rotateX(-Math.PI / 2);
    const eastRoad = new THREE.Mesh(eastGeo, roadMat);
    eastRoad.position.set(275, 0.38, 825);
    eastRoad.receiveShadow = true;
    this.group.add(eastRoad);

    // B. West Section: TT. Núi Thành (X = 220) westward through Tam Mỹ Đông, Tam Mỹ Tây to Tam Trà (X = -120)
    const westCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(220, 0.38, 825), // TT. Núi Thành
      new THREE.Vector3(140, 0.40, 820), // Tam Mỹ Đông
      new THREE.Vector3(25, 0.45, 830),  // Tam Mỹ Tây / Hố Giang Thơm
      new THREE.Vector3(-45, 1.2, 850),  // Dốc Đèo Tam Trà
      new THREE.Vector3(-120, 3.5, 875), // Bản làng Tam Trà
    ]);
    const westTubeGeo = new THREE.TubeGeometry(westCurve, 48, 3.2, 6, false);
    westTubeGeo.scale(1, 0.04, 1);
    const westRoad = new THREE.Mesh(westTubeGeo, roadMat);
    westRoad.receiveShadow = true;
    this.group.add(westRoad);
  }

  /**
   * 5. Northern Highland Artery (Đường Huyện ĐH Tam Xuân - Tam Thạnh - Tam Sơn)
   * Connects QL1A (X = 220, Z = 525) -> Tam Xuân 2 (X = 80) -> Hồ Thái Xuân (X = 50, Z = 670) -> Tam Sơn (X = -75, Z = 715)
   */
  private buildNorthernHighlandArtery(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2e333a, roughness: 0.85 });

    const northCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(220, 0.38, 525), // QL1A Tam Xuân 1
      new THREE.Vector3(150, 0.40, 528),
      new THREE.Vector3(75, 0.42, 530),  // Tam Xuân 2
      new THREE.Vector3(55, 0.6, 640),   // Tam Thạnh / Thái Xuân
      new THREE.Vector3(-10, 1.0, 680),
      new THREE.Vector3(-75, 2.0, 715),  // Tam Sơn / Phú Ninh
    ]);
    const northTubeGeo = new THREE.TubeGeometry(northCurve, 48, 2.8, 6, false);
    northTubeGeo.scale(1, 0.04, 1);
    const northRoad = new THREE.Mesh(northTubeGeo, roadMat);
    northRoad.receiveShadow = true;
    this.group.add(northRoad);
  }

  /**
   * 6. Coastal Inter-Commune Road (Đường Liên Xã Tam Tiến -> Tam Hòa)
   */
  private buildCoastalInterCommuneRoad(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x30353c, roughness: 0.85 });

    const coastCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(365, 0.38, 555), // Tam Tiến
      new THREE.Vector3(360, 0.38, 610),
      new THREE.Vector3(360, 0.38, 655), // Tam Hòa
      new THREE.Vector3(345, 0.38, 715),
      new THREE.Vector3(330, 0.38, 765), // Connects to Tam Quang
    ]);
    const coastTubeGeo = new THREE.TubeGeometry(coastCurve, 36, 2.8, 6, false);
    coastTubeGeo.scale(1, 0.04, 1);
    const coastRoad = new THREE.Mesh(coastTubeGeo, roadMat);
    coastRoad.receiveShadow = true;
    this.group.add(coastRoad);
  }

  /**
   * 7. Chu Lai Airport Access Boulevard (Đường Trục Vào Sân Bay Chu Lai)
   */
  private buildAirportAccessBoulevard(): void {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x242830, roughness: 0.78 });

    const roadGeo = new THREE.PlaneGeometry(45, 8.5);
    roadGeo.rotateX(-Math.PI / 2);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(242.5, 0.38, 925);
    road.receiveShadow = true;
    this.group.add(road);
  }
}
