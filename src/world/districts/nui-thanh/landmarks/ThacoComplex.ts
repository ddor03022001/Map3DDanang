import * as THREE from 'three';

/**
 * THACO Chu Lai Industrial & Automotive Complex (Khu phức hợp ô tô & cơ khí THACO Chu Lai)
 * Features THACO Mazda, KIA, Truck & Bus plants, executive headquarters,
 * vehicle storage yards with instanced cars, test track, and grand entrance arch.
 */
export class ThacoComplex {
  public group = new THREE.Group();

  private vehicleMesh: THREE.InstancedMesh | null = null;

  constructor() {
    this.buildEntranceGate();
    this.buildAssemblyPlants();
    this.buildExecutiveHeadquarters();
    this.buildVehicleStorageYard();
    this.buildTestTrack();

    // Positioned East of the Chu Lai Overpass on Highway 1A
    this.group.position.set(290, 0, 720);
  }

  /**
   * 1. Grand Entrance Arch of THACO Chu Lai Complex (Cổng chào THACO Chu Lai)
   */
  private buildEntranceGate(): void {
    const archGroup = new THREE.Group();
    const thacoBlueMat = new THREE.MeshStandardMaterial({
      color: 0x004d9c, // Signature THACO corporate blue
      metalness: 0.7,
      roughness: 0.3,
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa,
      metalness: 0.6,
      roughness: 0.25,
    });

    // Twin monumental pylons
    [-8, 8].forEach((xOff) => {
      const pylonGeo = new THREE.BoxGeometry(1.6, 9.5, 2.2);
      const pylon = new THREE.Mesh(pylonGeo, thacoBlueMat);
      pylon.position.set(xOff, 4.75, 0);
      pylon.castShadow = true;
      archGroup.add(pylon);
    });

    // Overhead curved portal lintel
    const lintelGeo = new THREE.BoxGeometry(18, 1.4, 2.2);
    const lintel = new THREE.Mesh(lintelGeo, whiteMat);
    lintel.position.set(0, 9.5, 0);
    lintel.castShadow = true;
    archGroup.add(lintel);

    // THACO logo block in the center
    const logoBlockGeo = new THREE.BoxGeometry(7.5, 1.0, 2.4);
    const logoBlock = new THREE.Mesh(logoBlockGeo, thacoBlueMat);
    logoBlock.position.set(0, 10.4, 0);
    archGroup.add(logoBlock);

    // Position arch at front entrance facing Highway 1A
    archGroup.position.set(-35, 0, 0);
    this.group.add(archGroup);
  }

  /**
   * 2. Massive Industrial Assembly Plants (Nhà máy THACO Mazda, KIA, Bus & Truck)
   */
  private buildAssemblyPlants(): void {
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0e8, // Insulated sandwich panel off-white
      roughness: 0.7,
      metalness: 0.2,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2e4a62, // Industrial metal corrugated roof blue
      roughness: 0.6,
      metalness: 0.3,
    });

    const plants = [
      // 1. THACO Mazda Plant (Grand flagship plant: length 75, width 42, height 8)
      { name: 'THACO Mazda', x: 25, z: -35, length: 75, width: 42, height: 8.5, roofColor: 0x25445e },
      // 2. THACO KIA Assembly Plant (Length 65, width 38, height 7.5)
      { name: 'THACO KIA', x: 25, z: 35, length: 65, width: 38, height: 7.8, roofColor: 0x364858 },
      // 3. THACO Truck & Bus Plant (Length 80, width 45, height 9)
      { name: 'THACO Truck & Bus', x: 105, z: -35, length: 80, width: 45, height: 9.0, roofColor: 0x223d54 },
      // 4. Mechanical Components & Logistics Center
      { name: 'THACO Industries', x: 105, z: 35, length: 70, width: 40, height: 7.2, roofColor: 0x2e4252 },
    ];

    plants.forEach((plant) => {
      const plantGroup = new THREE.Group();

      // Factory main walls
      const wallGeo = new THREE.BoxGeometry(plant.length, plant.height, plant.width);
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.y = plant.height / 2;
      wall.castShadow = true;
      wall.receiveShadow = true;
      plantGroup.add(wall);

      // Curved / gabled industrial roof
      const plantRoofMat = roofMat.clone();
      plantRoofMat.color.setHex(plant.roofColor);

      const roofGeo = new THREE.CylinderGeometry(
        plant.width * 0.55,
        plant.width * 0.55,
        plant.length,
        16,
        1,
        false,
        0,
        Math.PI
      );
      roofGeo.rotateZ(Math.PI / 2);
      const roof = new THREE.Mesh(roofGeo, plantRoofMat);
      roof.position.y = plant.height;
      roof.castShadow = true;
      plantGroup.add(roof);

      // Blue corporate perimeter striping
      const stripeGeo = new THREE.BoxGeometry(plant.length + 0.2, 0.8, plant.width + 0.2);
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x004d9c, metalness: 0.6 });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.y = plant.height * 0.75;
      plantGroup.add(stripe);

      plantGroup.position.set(plant.x, 0, plant.z);
      this.group.add(plantGroup);
    });
  }

  /**
   * 3. THACO Executive Headquarters Building (Tòa nhà Văn phòng Điều hành)
   */
  private buildExecutiveHeadquarters(): void {
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a587a,
      metalness: 0.85,
      roughness: 0.15,
      reflectivity: 0.9,
    });
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xedf2f7,
      metalness: 0.7,
      roughness: 0.3,
    });

    const hqGroup = new THREE.Group();

    // 5-story curved glass corporate building
    const hqGeo = new THREE.BoxGeometry(28, 14, 16);
    const hq = new THREE.Mesh(hqGeo, glassMat);
    hq.position.y = 7.0;
    hq.castShadow = true;
    hq.receiveShadow = true;
    hqGroup.add(hq);

    // Structural white floor slab bands
    for (let f = 1; f <= 5; f++) {
      const slabGeo = new THREE.BoxGeometry(28.4, 0.35, 16.4);
      const slab = new THREE.Mesh(slabGeo, frameMat);
      slab.position.y = f * 2.8;
      hqGroup.add(slab);
    }

    hqGroup.position.set(-15, 0, 0);
    this.group.add(hqGroup);
  }

  /**
   * 4. Vehicle Storage Yard with hundreds of finished automobiles (Bãi đỗ xe thành phẩm)
   * Rendered in 1 draw call using InstancedMesh for 60 FPS performance!
   */
  private buildVehicleStorageYard(): void {
    const lotLength = 80;
    const lotWidth = 40;

    // Asphalt lot ground
    const lotGeo = new THREE.PlaneGeometry(lotLength, lotWidth);
    lotGeo.rotateX(-Math.PI / 2);
    const lotMat = new THREE.MeshStandardMaterial({ color: 0x22262d, roughness: 0.85 });
    const lotMesh = new THREE.Mesh(lotGeo, lotMat);
    lotMesh.position.set(65, 0.36, -85);
    lotMesh.receiveShadow = true;
    this.group.add(lotMesh);

    // Mini car geometry (Scaled car: length 2.2, width 1.1, height 0.8)
    const carGeo = new THREE.BoxGeometry(2.2, 0.7, 1.1);
    carGeo.translate(0, 0.35, 0);

    const carMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.25,
    });

    const carColors = [
      new THREE.Color(0xf5f7fa), // Pristine pearl white
      new THREE.Color(0x990011), // Soul red crystal (Signature Mazda)
      new THREE.Color(0x181e26), // Jet black mica
      new THREE.Color(0x2b4c6f), // Deep crystal blue
      new THREE.Color(0x8a9299), // Machine gray metallic
    ];

    const rows = 12;
    const cols = 28;
    const totalCars = rows * cols;

    this.vehicleMesh = new THREE.InstancedMesh(carGeo, carMat, totalCars);
    this.vehicleMesh.castShadow = true;

    const dummy = new THREE.Object3D();
    let carIndex = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Position each car neatly inside the parking grid
        const cx = 65 - lotLength / 2 + 3.0 + c * 2.7;
        const cz = -85 - lotWidth / 2 + 2.5 + r * 3.1;

        dummy.position.set(cx, 0.38, cz);
        dummy.updateMatrix();

        this.vehicleMesh.setMatrixAt(carIndex, dummy.matrix);
        // Realistic distribution with Mazda red and white dominance
        const color = carColors[(c + r * 3) % carColors.length];
        this.vehicleMesh.setColorAt(carIndex, color);

        carIndex++;
      }
    }

    this.vehicleMesh.instanceMatrix.needsUpdate = true;
    if (this.vehicleMesh.instanceColor) this.vehicleMesh.instanceColor.needsUpdate = true;
    this.group.add(this.vehicleMesh);
  }

  /**
   * 5. Automotive Testing Track (Đường chạy thử nghiệm xe ô tô chuyên dụng)
   */
  private buildTestTrack(): void {
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x1f2328,
      roughness: 0.75,
    });

    // Oval test track surrounding the southern sector
    const points: THREE.Vector3[] = [];
    const radiusX = 65;
    const radiusZ = 35;

    for (let i = 0; i <= 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const x = 70 + Math.cos(angle) * radiusX;
      const z = 85 + Math.sin(angle) * radiusZ;
      points.push(new THREE.Vector3(x, 0.37, z));
    }

    const curve = new THREE.CatmullRomCurve3(points, true);
    const trackGeo = new THREE.TubeGeometry(curve, 72, 2.2, 4, true);
    // Flatten tube into a wide asphalt ribbon
    trackGeo.scale(1, 0.08, 1);

    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.receiveShadow = true;
    this.group.add(trackMesh);
  }
}
