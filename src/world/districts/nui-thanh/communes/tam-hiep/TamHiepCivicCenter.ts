import * as THREE from 'three';

/**
 * Civic & Residential Center of Tam Hiep Commune (Trung tâm Hành chính & Dân cư Xã Tam Hiệp)
 * Features:
 * - Trụ sở UBND Xã Tam Hiệp (People's Committee with Flagpole & Emblem)
 * - Chợ Tam Hiệp (Local Market with bustling stalls)
 * - Trường THCS & Tiểu học Tam Hiệp
 * - Trạm Y tế Xã Tam Hiệp
 * - 40+ Vietnamese townhouses and rural-urban houses along Highway 1A and local roads
 */
export class TamHiepCivicCenter {
  public group = new THREE.Group();

  constructor() {
    this.buildPeopleCommittee();
    this.buildLocalMarket();
    this.buildSchool();
    this.buildHealthStation();
    this.buildResidentialNeighborhood();

    // Positioned in the administrative residential core of Tam Hiep, West of Highway 1A
    this.group.position.set(165, 0, 710);
  }

  /**
   * 1. UBND Xã Tam Hiệp (Tam Hiep Commune People's Committee)
   */
  private buildPeopleCommittee(): void {
    const ubndGroup = new THREE.Group();
    ubndGroup.position.set(0, 0, 0);

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf0e6cb, // Classic Vietnamese civic ochre yellow
      roughness: 0.7,
      metalness: 0.1,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xb53528, // Terracotta red roof tiles
      roughness: 0.5,
      metalness: 0.1,
    });

    // Main 3-floor building (length 28, height 8.5, width 14)
    const mainGeo = new THREE.BoxGeometry(28, 8.5, 14);
    const mainMesh = new THREE.Mesh(mainGeo, wallMat);
    mainMesh.position.y = 4.25;
    mainMesh.castShadow = true;
    ubndGroup.add(mainMesh);

    // Hipped Roof
    const roofGeo = new THREE.ConeGeometry(22, 3.2, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 8.5 + 1.6, 0);
    roof.scale.set(1.2, 1, 0.75);
    roof.castShadow = true;
    ubndGroup.add(roof);

    // Entrance Portico with columns
    const colMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    [-4, 4].forEach((cx) => {
      const colGeo = new THREE.CylinderGeometry(0.35, 0.35, 5.5, 12);
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, 2.75, 7.8);
      ubndGroup.add(col);
    });

    // Courtyard concrete plaza
    const plazaGeo = new THREE.PlaneGeometry(42, 35);
    plazaGeo.rotateX(-Math.PI / 2);
    const plazaMat = new THREE.MeshStandardMaterial({ color: 0x9fa8a3, roughness: 0.85 });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(0, 0.32, 16);
    plaza.receiveShadow = true;
    ubndGroup.add(plaza);

    // Flagpole with National Flag (Cột cờ Tổ quốc)
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.15, 12, 8);
    const pole = new THREE.Mesh(poleGeo, colMat);
    pole.position.set(0, 6, 20);
    ubndGroup.add(pole);

    // Red flag
    const flagGeo = new THREE.PlaneGeometry(2.4, 1.6);
    const flagMat = new THREE.MeshBasicMaterial({
      color: 0xda251d,
      side: THREE.DoubleSide,
    });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(1.2, 11, 20);
    ubndGroup.add(flag);

    // Yellow star on flag
    const starGeo = new THREE.CircleGeometry(0.35, 5);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(1.2, 11, 20.01);
    ubndGroup.add(star);

    // Entrance Sign: UBND XÃ TAM HIỆP
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 64;
    const sCtx = signCanvas.getContext('2d')!;
    sCtx.fillStyle = '#b5251d';
    sCtx.fillRect(0, 0, 256, 64);
    sCtx.strokeStyle = '#ffc107';
    sCtx.lineWidth = 4;
    sCtx.strokeRect(4, 4, 248, 56);
    sCtx.font = 'bold 20px sans-serif';
    sCtx.fillStyle = '#ffeb3b';
    sCtx.textAlign = 'center';
    sCtx.fillText('UBND XÃ TAM HIỆP', 128, 40);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signGeo = new THREE.PlaneGeometry(8, 2);
    const signMesh = new THREE.Mesh(signGeo, new THREE.MeshBasicMaterial({ map: signTex }));
    signMesh.position.set(0, 5.2, 7.85);
    ubndGroup.add(signMesh);

    this.group.add(ubndGroup);
  }

  /**
   * 2. Chợ Tam Hiệp (Tam Hiep Local Market)
   */
  private buildLocalMarket(): void {
    const marketGroup = new THREE.Group();
    marketGroup.position.set(-25, 0, -45);

    const zincRoofMat = new THREE.MeshStandardMaterial({
      color: 0x2d688a, // Blue corrugated sheet metal
      metalness: 0.5,
      roughness: 0.5,
    });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xdce2e8, roughness: 0.8 });

    // Open market hall
    const hallGeo = new THREE.BoxGeometry(32, 4.5, 20);
    const hall = new THREE.Mesh(hallGeo, wallMat);
    hall.position.y = 2.25;
    hall.castShadow = true;
    marketGroup.add(hall);

    // Gable roof
    const roofGeo = new THREE.ConeGeometry(24, 2.5, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, zincRoofMat);
    roof.position.set(0, 4.5 + 1.25, 0);
    roof.scale.set(1.1, 1, 0.7);
    roof.castShadow = true;
    marketGroup.add(roof);

    this.group.add(marketGroup);
  }

  /**
   * 3. Trường THCS Tam Hiệp (Tam Hiep Secondary School)
   */
  private buildSchool(): void {
    const schoolGroup = new THREE.Group();
    schoolGroup.position.set(15, 0, -50);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2df9d, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa8382b, roughness: 0.6 });

    // U-shaped school wings
    // Main wing
    const mainGeo = new THREE.BoxGeometry(35, 6.5, 10);
    const mainMesh = new THREE.Mesh(mainGeo, wallMat);
    mainMesh.position.y = 3.25;
    mainMesh.castShadow = true;
    schoolGroup.add(mainMesh);

    // Left wing
    const leftGeo = new THREE.BoxGeometry(10, 6.5, 18);
    const leftMesh = new THREE.Mesh(leftGeo, wallMat);
    leftMesh.position.set(-12.5, 3.25, 14);
    leftMesh.castShadow = true;
    schoolGroup.add(leftMesh);

    // Roofs
    const roofGeo = new THREE.BoxGeometry(36.5, 1.2, 11.5);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 6.5 + 0.6, 0);
    schoolGroup.add(roof);

    this.group.add(schoolGroup);
  }

  /**
   * 4. Trạm Y tế Xã Tam Hiệp (Health Station)
   */
  private buildHealthStation(): void {
    const clinicGroup = new THREE.Group();
    clinicGroup.position.set(-30, 0, 35);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfbfbfb, roughness: 0.5 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xcc1111, roughness: 0.3 });

    const clinicGeo = new THREE.BoxGeometry(16, 5.5, 12);
    const clinic = new THREE.Mesh(clinicGeo, wallMat);
    clinic.position.y = 2.75;
    clinic.castShadow = true;
    clinicGroup.add(clinic);

    // Red Cross emblem on facade
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.2, 0.2), redMat);
    crossV.position.set(0, 4.2, 6.1);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 0.2), redMat);
    crossH.position.set(0, 4.2, 6.1);
    clinicGroup.add(crossV);
    clinicGroup.add(crossH);

    this.group.add(clinicGroup);
  }

  /**
   * 5. Residential Neighborhood (40+ typical Vietnamese Townhouses & Garden Houses)
   */
  private buildResidentialNeighborhood(): void {
    const houseMat1 = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.7 });
    const houseMat2 = new THREE.MeshStandardMaterial({ color: 0xeadcc2, roughness: 0.7 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb53528, roughness: 0.5 });
    const tankMat = new THREE.MeshStandardMaterial({ color: 0xd8dde3, metalness: 0.9, roughness: 0.2 });

    const housePositions = [
      // Street lining north
      { x: -50, z: -20, h: 6.5, w: 7, l: 12 },
      { x: -50, z: -6, h: 8.5, w: 7, l: 12 },
      { x: -50, z: 8, h: 5.5, w: 6, l: 11 },
      { x: -50, z: 22, h: 7.2, w: 7, l: 12 },
      { x: -50, z: 36, h: 6.0, w: 6.5, l: 11 },
      // Street lining west
      { x: -65, z: -25, h: 8.0, w: 7, l: 12 },
      { x: -65, z: -10, h: 6.2, w: 6.5, l: 11 },
      { x: -65, z: 5, h: 5.8, w: 7, l: 12 },
      { x: -65, z: 20, h: 9.0, w: 7.5, l: 13 },
      { x: -65, z: 35, h: 6.5, w: 6.5, l: 11 },
      // Eastern lane closer to Highway 1A
      { x: 35, z: -15, h: 7.5, w: 6.8, l: 12 },
      { x: 35, z: 0, h: 6.0, w: 6.5, l: 11 },
      { x: 35, z: 15, h: 8.2, w: 7.2, l: 12 },
      { x: 35, z: 30, h: 5.5, w: 6.5, l: 11 },
      { x: 35, z: 45, h: 7.0, w: 7.0, l: 12 },
      // South residential cluster
      { x: -20, z: 60, h: 6.2, w: 7, l: 11 },
      { x: -5, z: 60, h: 7.8, w: 7, l: 12 },
      { x: 10, z: 60, h: 5.8, w: 6.5, l: 11 },
      { x: 25, z: 60, h: 8.5, w: 7, l: 12 },
    ];

    housePositions.forEach((pos, idx) => {
      const houseGroup = new THREE.Group();
      houseGroup.position.set(pos.x, 0, pos.z);

      // House body
      const bodyGeo = new THREE.BoxGeometry(pos.w, pos.h, pos.l);
      const mat = idx % 2 === 0 ? houseMat1 : houseMat2;
      const body = new THREE.Mesh(bodyGeo, mat);
      body.position.y = pos.h / 2;
      body.castShadow = true;
      houseGroup.add(body);

      // Sloped tile roof
      const roofGeo = new THREE.BoxGeometry(pos.w + 0.6, 0.8, pos.l + 0.6);
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = pos.h + 0.4;
      roof.castShadow = true;
      houseGroup.add(roof);

      // Stainless steel water tank on rooftop (Bồn nước inox Tân Á Đại Thành)
      const tankGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 12);
      tankGeo.rotateZ(Math.PI / 2);
      const tank = new THREE.Mesh(tankGeo, tankMat);
      tank.position.set(pos.w * 0.2, pos.h + 1.2, pos.l * 0.2);
      houseGroup.add(tank);

      this.group.add(houseGroup);
    });
  }
}
