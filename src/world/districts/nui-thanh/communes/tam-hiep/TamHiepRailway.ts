import * as THREE from 'three';

/**
 * North-South Railway through Tam Hiep Commune (Tuyến đường sắt Bắc - Nam qua Tam Hiệp)
 * The historic Chu Lai 2-level interchange was specifically engineered to bridge
 * over both National Highway 1A and this national railway corridor.
 * Features realistic track, ballast, ties, catenary poles, and an animated SE passenger train!
 */
export class TamHiepRailway {
  public group = new THREE.Group();

  private trainGroup = new THREE.Group();
  private trainZ = 450;
  private trainSpeed = 24; // 24 units/sec (~86 km/h)
  private headlight: THREE.SpotLight | null = null;

  constructor() {
    this.buildTracks();
    this.buildVietnamRailwaysTrain();

    // Railway line positioned at X = 208, running parallel to QL1A
    this.group.position.set(208, 0, 0);
  }

  /**
   * Builds railway ballast bed, wooden/concrete sleepers, and dual steel rails
   */
  private buildTracks(): void {
    const trackLength = 650;
    const centerZ = 700;

    // 1. Gravel ballast bed
    const ballastGeo = new THREE.BoxGeometry(4.2, 0.25, trackLength);
    const ballastMat = new THREE.MeshStandardMaterial({
      color: 0x474a4f, // Crushed granite ballast gray
      roughness: 0.95,
      metalness: 0.1,
    });
    const ballast = new THREE.Mesh(ballastGeo, ballastMat);
    ballast.position.set(0, 0.38, centerZ);
    ballast.receiveShadow = true;
    this.group.add(ballast);

    // 2. Concrete sleepers (tà vẹt bê tông dự ứng lực)
    const tieGeo = new THREE.BoxGeometry(3.2, 0.14, 0.4);
    const tieMat = new THREE.MeshStandardMaterial({
      color: 0x6e7682,
      roughness: 0.85,
    });

    const tieSpacing = 2.0;
    const tieCount = Math.floor(trackLength / tieSpacing);
    const tieMesh = new THREE.InstancedMesh(tieGeo, tieMat, tieCount);

    const dummy = new THREE.Object3D();
    const startZ = centerZ - trackLength / 2;

    for (let i = 0; i < tieCount; i++) {
      dummy.position.set(0, 0.46, startZ + i * tieSpacing);
      dummy.updateMatrix();
      tieMesh.setMatrixAt(i, dummy.matrix);
    }
    tieMesh.instanceMatrix.needsUpdate = true;
    tieMesh.receiveShadow = true;
    this.group.add(tieMesh);

    // 3. Dual steel rails (ray thép tiêu chuẩn khổ 1000mm)
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x9aa2ab,
      roughness: 0.25,
      metalness: 0.9,
    });

    [-0.75, 0.75].forEach((rx) => {
      const railGeo = new THREE.BoxGeometry(0.12, 0.18, trackLength);
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(rx, 0.58, centerZ);
      this.group.add(rail);
    });

    // 4. Telegraph & signal poles along the corridor
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x5a626a, roughness: 0.6 });
    const poleCount = 18;
    for (let i = 0; i < poleCount; i++) {
      const pz = startZ + i * (trackLength / poleCount);
      const poleGeo = new THREE.CylinderGeometry(0.14, 0.18, 6.5, 8);
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(2.8, 3.25, pz);
      this.group.add(pole);
    }
  }

  /**
   * Builds Vietnam Railways SE Thống Nhất Passenger Train
   * (Đoàn tàu khách SE Bắc - Nam: Đầu máy D19E Đổi Mới và các toa xe hiện đại)
   */
  private buildVietnamRailwaysTrain(): void {
    const locoMat = new THREE.MeshStandardMaterial({
      color: 0xcc2222, // Signature Vietnam Railways red
      roughness: 0.4,
      metalness: 0.3,
    });
    const locoBlueMat = new THREE.MeshStandardMaterial({
      color: 0x1144aa, // Classic VNR blue stripe
      roughness: 0.4,
      metalness: 0.3,
    });
    const coachMat = new THREE.MeshStandardMaterial({
      color: 0xe0e6ed, // Stainless steel / white coaches
      roughness: 0.35,
      metalness: 0.6,
    });
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x1a2433,
      roughness: 0.1,
      metalness: 0.9,
    });

    // 1. D19E Locomotive (Đầu máy D19E Đổi Mới)
    const locoGroup = new THREE.Group();

    // Main engine hood
    const locoGeo = new THREE.BoxGeometry(2.4, 3.2, 12);
    const locoMesh = new THREE.Mesh(locoGeo, locoMat);
    locoMesh.position.y = 2.1;
    locoMesh.castShadow = true;
    locoGroup.add(locoMesh);

    // Blue lower stripe
    const stripeGeo = new THREE.BoxGeometry(2.42, 0.8, 12.02);
    const stripe = new THREE.Mesh(stripeGeo, locoBlueMat);
    stripe.position.y = 1.0;
    locoGroup.add(stripe);

    // Cab windshields
    const windshieldGeo = new THREE.BoxGeometry(2.2, 0.9, 0.3);
    const frontCab = new THREE.Mesh(windshieldGeo, windowMat);
    frontCab.position.set(0, 2.7, 5.9);
    locoGroup.add(frontCab);

    // Locomotive high-beam headlight
    const lightGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 12);
    lightGeo.rotateX(Math.PI / 2);
    const lightMesh = new THREE.Mesh(
      lightGeo,
      new THREE.MeshBasicMaterial({ color: 0xfffaed })
    );
    lightMesh.position.set(0, 3.4, 6.05);
    locoGroup.add(lightMesh);

    // Spotlight projection beam
    this.headlight = new THREE.SpotLight(0xfffaed, 2.5, 45, Math.PI / 6, 0.4);
    this.headlight.position.set(0, 3.4, 6.1);
    this.headlight.target.position.set(0, 0.5, 30);
    locoGroup.add(this.headlight);
    locoGroup.add(this.headlight.target);

    this.trainGroup.add(locoGroup);

    // 2. Four Passenger Coaches (Toa khách Thống Nhất)
    const coachLength = 16;
    for (let c = 0; c < 4; c++) {
      const cZ = -7.5 - c * (coachLength + 0.8);
      const coachGroup = new THREE.Group();
      coachGroup.position.set(0, 2.1, cZ);

      // Body
      const bodyGeo = new THREE.BoxGeometry(2.35, 3.0, coachLength);
      const body = new THREE.Mesh(bodyGeo, coachMat);
      body.castShadow = true;
      coachGroup.add(body);

      // Blue window band
      const bandGeo = new THREE.BoxGeometry(2.38, 0.9, coachLength);
      const band = new THREE.Mesh(bandGeo, locoBlueMat);
      band.position.y = 0.2;
      coachGroup.add(band);

      // Windows
      const winGeo = new THREE.BoxGeometry(2.4, 0.6, coachLength * 0.9);
      const wins = new THREE.Mesh(winGeo, windowMat);
      wins.position.y = 0.2;
      coachGroup.add(wins);

      this.trainGroup.add(coachGroup);
    }

    this.group.add(this.trainGroup);
  }

  public update(delta: number): void {
    // Move train along railway line
    this.trainZ += this.trainSpeed * delta;

    // Loop through corridor [380, 980]
    if (this.trainZ > 980) {
      this.trainZ = 380;
    }

    this.trainGroup.position.set(0, 0, this.trainZ);
  }
}
