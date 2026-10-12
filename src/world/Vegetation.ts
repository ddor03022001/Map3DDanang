import * as THREE from 'three';

/**
 * High-performance InstancedMesh vegetation system for Da Nang
 * Features riverside shade trees along Bach Dang / Tran Hung Dao,
 * APEC park greenery, and tropical coconut palms along My Khe Beach
 */
export class Vegetation {
  public group = new THREE.Group();

  private shadeTrees: THREE.InstancedMesh | null = null;
  private palmTrees: THREE.InstancedMesh | null = null;

  constructor() {
    this.createRiversideShadeTrees();
    this.createCoastalPalmTrees();
  }

  /**
   * 1. Dense shade trees along Bach Dang, Tran Phu, Tran Hung Dao boulevards and APEC Park
   */
  private createRiversideShadeTrees(): void {
    const treePositions: [number, number, number][] = [];

    // West Bank (Bach Dang riverside promenade)
    for (let z = -240; z <= 120; z += 5) {
      treePositions.push([-27.5, 0.4, z]);
      if (Math.random() > 0.4) {
        treePositions.push([-29.5, 0.4, z + (Math.random() - 0.5) * 2]);
      }
    }

    // East Bank (Tran Hung Dao riverside promenade)
    for (let z = -240; z <= 120; z += 5) {
      treePositions.push([27.5, 0.4, z]);
      if (Math.random() > 0.4) {
        treePositions.push([29.5, 0.4, z + (Math.random() - 0.5) * 2]);
      }
    }

    // APEC Sculpture Park cluster (near West abutment of Dragon Bridge)
    for (let i = 0; i < 45; i++) {
      const px = -35 + (Math.random() - 0.5) * 22;
      const pz = 18 + (Math.random() - 0.5) * 26;
      treePositions.push([px, 0.4, pz]);
    }

    // Nguyen Van Linh & Vo Van Kiet median divider trees
    for (let x = -140; x <= -35; x += 8) {
      treePositions.push([x, 0.4, 0]);
    }
    for (let x = 35; x <= 160; x += 8) {
      treePositions.push([x, 0.4, 0]);
    }

    const count = treePositions.length;

    // Stylized low-poly shade tree canopy (lush tropical green cone/dodecahedron)
    const canopyGeo = new THREE.DodecahedronGeometry(1.6, 1);
    canopyGeo.translate(0, 3.2, 0); // Elevate above trunk

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x226b34,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true,
    });

    this.shadeTrees = new THREE.InstancedMesh(canopyGeo, canopyMat, count);
    this.shadeTrees.castShadow = true;
    this.shadeTrees.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    treePositions.forEach((pos, idx) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      const s = 0.85 + Math.random() * 0.45;
      dummy.scale.set(s, s * (0.9 + Math.random() * 0.25), s);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.updateMatrix();
      this.shadeTrees!.setMatrixAt(idx, dummy.matrix);

      // Subtle tropical green hue variation
      color.setHSL(0.3 + Math.random() * 0.05, 0.55, 0.22 + Math.random() * 0.08);
      this.shadeTrees!.setColorAt(idx, color);
    });

    this.shadeTrees.instanceMatrix.needsUpdate = true;
    if (this.shadeTrees.instanceColor) this.shadeTrees.instanceColor.needsUpdate = true;
    this.group.add(this.shadeTrees);
  }

  /**
   * 2. Tropical Coconut / Palm trees along Vo Nguyen Giap boulevard & My Khe beach
   */
  private createCoastalPalmTrees(): void {
    const palmPositions: [number, number, number][] = [];

    // Continuous coastal palm grove along Vo Nguyen Giap boulevard & My Khe sand
    for (let z = -280; z <= 180; z += 4.5) {
      // Boulevard sidewalk palm row
      palmPositions.push([172, 0.4, z]);
      // Beachside sand palm clusters
      palmPositions.push([178, 0.3, z + (Math.random() - 0.5) * 3]);
      if (Math.random() > 0.5) {
        palmPositions.push([184, 0.2, z + (Math.random() - 0.5) * 4]);
      }
    }

    const count = palmPositions.length;

    // Coconut palm frond canopy
    const palmGeo = new THREE.ConeGeometry(2.2, 1.8, 6);
    palmGeo.translate(0, 4.2, 0);

    const palmMat = new THREE.MeshStandardMaterial({
      color: 0x3d7e35,
      roughness: 0.75,
      metalness: 0.1,
      flatShading: true,
    });

    this.palmTrees = new THREE.InstancedMesh(palmGeo, palmMat, count);
    this.palmTrees.castShadow = true;
    this.palmTrees.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    palmPositions.forEach((pos, idx) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      const s = 0.9 + Math.random() * 0.4;
      dummy.scale.set(s, s * (1.0 + Math.random() * 0.3), s);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.rotation.z = (Math.random() - 0.5) * 0.15; // Natural palm lean towards sea
      dummy.updateMatrix();
      this.palmTrees!.setMatrixAt(idx, dummy.matrix);

      color.setHSL(0.28 + Math.random() * 0.04, 0.6, 0.26 + Math.random() * 0.06);
      this.palmTrees!.setColorAt(idx, color);
    });

    this.palmTrees.instanceMatrix.needsUpdate = true;
    if (this.palmTrees.instanceColor) this.palmTrees.instanceColor.needsUpdate = true;
    this.group.add(this.palmTrees);
  }
}
