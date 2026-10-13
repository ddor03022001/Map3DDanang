import * as THREE from 'three';

/**
 * THACO Chu Lai Industrial & Automotive Mega-Complex
 * (Khu Phức Hợp Ô Tô & Cơ Khí THACO Chu Lai - Tâm Điểm Xã Tam Hiệp)
 * Flagship manufacturing facilities:
 * - THACO Mazda (automated modern plant with rooftop solar panel arrays)
 * - THACO KIA & THACO Bus/Truck Plants with branded facade logos
 * - THACO Industries Precision Mechanical Engineering Center
 * - Executive Headquarters (5-story curved curtain-glass building)
 * - Vehicle Holding Yards with over 300 instanced finished cars
 * - High-speed banked Proving Ground automotive test track
 * - Grand THACO corporate entrance gateway
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

    // Positioned East of Highway 1A and Chu Lai Overpass in Tam Hiep
    this.group.position.set(290, 0, 720);
  }

  /**
   * 1. Grand Entrance Arch of THACO Chu Lai Complex (Cổng Chào THACO Chu Lai)
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
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 256;
    logoCanvas.height = 64;
    const ctx = logoCanvas.getContext('2d')!;
    ctx.fillStyle = '#004d9c';
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('THACO CHU LAI', 128, 44);

    const logoTex = new THREE.CanvasTexture(logoCanvas);
    const logoBlockGeo = new THREE.PlaneGeometry(8.5, 2.0);
    const logoBlock = new THREE.Mesh(logoBlockGeo, new THREE.MeshBasicMaterial({ map: logoTex }));
    logoBlock.position.set(0, 10.4, 1.15);
    archGroup.add(logoBlock);

    archGroup.position.set(-35, 0, 0);
    this.group.add(archGroup);
  }

  /**
   * 2. Massive Industrial Assembly Plants (Nhà máy THACO Mazda, KIA, Bus, Truck)
   */
  private buildAssemblyPlants(): void {
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0e8, // Insulated sandwich panel off-white
      roughness: 0.7,
      metalness: 0.2,
    });
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x122a45, // Deep navy photovoltaic solar cells
      roughness: 0.2,
      metalness: 0.85,
    });
    const ventMat = new THREE.MeshStandardMaterial({
      color: 0xc4cdd5,
      metalness: 0.8,
      roughness: 0.3,
    });

    const plants = [
      { name: 'THACO MAZDA', x: 25, z: -35, length: 78, width: 44, height: 8.5, roofColor: 0x25445e },
      { name: 'THACO KIA', x: 25, z: 35, length: 68, width: 40, height: 7.8, roofColor: 0x364858 },
      { name: 'THACO BUS & TRUCK', x: 110, z: -35, length: 82, width: 46, height: 9.0, roofColor: 0x223d54 },
      { name: 'THACO INDUSTRIES', x: 110, z: 35, length: 72, width: 42, height: 7.5, roofColor: 0x2e4252 },
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

      // Curved industrial roof
      const plantRoofMat = new THREE.MeshStandardMaterial({
        color: plant.roofColor,
        roughness: 0.6,
        metalness: 0.3,
      });

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

      // Rooftop Photovoltaic Solar Arrays (Pin năng lượng mặt trời trên mái xưởng)
      const solarCols = 6;
      for (let s = 0; s < solarCols; s++) {
        const sx = -plant.length * 0.38 + (s * plant.length * 0.76) / (solarCols - 1);
        const solarPanel = new THREE.Mesh(
          new THREE.PlaneGeometry(plant.length * 0.12, plant.width * 0.45),
          solarMat
        );
        solarPanel.rotateX(-Math.PI / 2);
        solarPanel.position.set(sx, plant.height + plant.width * 0.52, 0);
        plantGroup.add(solarPanel);
      }

      // Industrial Roof Turbovents (Quạt thông gió công nghiệp)
      for (let v = 0; v < 4; v++) {
        const vx = -plant.length * 0.3 + (v * plant.length * 0.6) / 3;
        const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 1.2, 8), ventMat);
        vent.position.set(vx, plant.height + plant.width * 0.54, 0);
        plantGroup.add(vent);
      }

      // Facade Signage Banner (Biển tên nhà máy THACO)
      const bannerCanvas = document.createElement('canvas');
      bannerCanvas.width = 512;
      bannerCanvas.height = 96;
      const bCtx = bannerCanvas.getContext('2d')!;
      bCtx.fillStyle = '#004d9c';
      bCtx.fillRect(0, 0, 512, 96);
      bCtx.strokeStyle = '#ffffff';
      bCtx.lineWidth = 4;
      bCtx.strokeRect(6, 6, 500, 84);
      bCtx.fillStyle = '#ffffff';
      bCtx.font = 'bold 36px sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText(plant.name, 256, 58);

      const bannerTex = new THREE.CanvasTexture(bannerCanvas);
      const bannerMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 3.2),
        new THREE.MeshBasicMaterial({ map: bannerTex })
      );
      bannerMesh.position.set(0, plant.height * 0.8, plant.width / 2 + 0.15);
      plantGroup.add(bannerMesh);

      // Loading Dock Bay Doors on side wall
      const dockMat = new THREE.MeshStandardMaterial({ color: 0x3d444a, roughness: 0.5 });
      for (let d = -2; d <= 2; d++) {
        const dockDoor = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 4.0), dockMat);
        dockDoor.rotateY(Math.PI / 2);
        dockDoor.position.set(plant.length / 2 + 0.1, 2.0, d * 7.0);
        plantGroup.add(dockDoor);
      }

      plantGroup.position.set(plant.x, 0, plant.z);
      this.group.add(plantGroup);
    });
  }

  /**
   * 3. THACO Executive Headquarters Building (Tòa Nhà Văn Phòng Điều Hành)
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
   * 4. Vehicle Storage Yard with hundreds of finished automobiles (Bãi Đỗ Xe Thành Phẩm)
   * Rendered in 1 draw call using InstancedMesh for 60 FPS performance!
   */
  private buildVehicleStorageYard(): void {
    const lotLength = 84;
    const lotWidth = 42;

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
        const cx = 65 - lotLength / 2 + 3.0 + c * 2.8;
        const cz = -85 - lotWidth / 2 + 2.5 + r * 3.2;

        dummy.position.set(cx, 0.38, cz);
        dummy.updateMatrix();

        this.vehicleMesh.setMatrixAt(carIndex, dummy.matrix);
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
   * 5. Automotive Testing Track (Đường Chạy Thử Xe Chuyên Dụng Proving Ground)
   */
  private buildTestTrack(): void {
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x1f2328,
      roughness: 0.75,
    });

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
    trackGeo.scale(1, 0.08, 1);

    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.receiveShadow = true;
    this.group.add(trackMesh);
  }
}
