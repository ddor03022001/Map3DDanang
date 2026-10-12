import * as THREE from 'three';

/**
 * Natural Landscape & Aquaculture Features of Tam Hiep Commune
 * Features:
 * - Coastal Casuarina (Phi Lao) windbreak groves
 * - Acacia & Eucalyptus tree clusters
 * - Tam Hiep shrimp farming aquaculture ponds with surface reflection & aerator paddlewheels
 */
export class TamHiepLandscape {
  public group = new THREE.Group();

  private aerators: THREE.Mesh[] = [];

  constructor() {
    this.buildShrimpPonds();
    this.buildCoastalCasuarinaGroves();

    // Located in the riparian and coastal plains of Tam Hiep
    this.group.position.set(380, 0, 780);
  }

  /**
   * 1. Tam Hiep Shrimp Farming Ponds (Hồ nuôi tôm sinh thái Tam Hiệp)
   */
  private buildShrimpPonds(): void {
    const pondGroup = new THREE.Group();
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1b525e, // Coastal estuary greenish teal
      roughness: 0.15,
      metalness: 0.8,
    });
    const dykeMat = new THREE.MeshStandardMaterial({
      color: 0x8a7d65, // Packed earthen sandy dyke
      roughness: 0.9,
    });
    const aeratorMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.3,
      metalness: 0.6,
    });

    const pondLayout = [
      { x: 0, z: 0, w: 32, l: 32 },
      { x: 38, z: 0, w: 32, l: 32 },
      { x: 0, z: 38, w: 32, l: 32 },
      { x: 38, z: 38, w: 32, l: 32 },
    ];

    pondLayout.forEach((p) => {
      // Earthen square dyke wall
      const dykeGeo = new THREE.BoxGeometry(p.w + 4, 0.45, p.l + 4);
      const dyke = new THREE.Mesh(dykeGeo, dykeMat);
      dyke.position.set(p.x, 0.38, p.z);
      dyke.receiveShadow = true;
      pondGroup.add(dyke);

      // Water plane inside pond
      const waterGeo = new THREE.PlaneGeometry(p.w, p.l);
      waterGeo.rotateX(-Math.PI / 2);
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.set(p.x, 0.42, p.z);
      water.receiveShadow = true;
      pondGroup.add(water);

      // Rotating water aerator paddlewheel in the center
      const paddleGeo = new THREE.CylinderGeometry(0.8, 0.8, 3.2, 8);
      const paddle = new THREE.Mesh(paddleGeo, aeratorMat);
      paddle.position.set(p.x, 0.55, p.z);
      this.aerators.push(paddle);
      pondGroup.add(paddle);
    });

    this.group.add(pondGroup);
  }

  /**
   * 2. Coastal Casuarina & Palm groves (Rặng phi lao chắn cát & hàng dừa ven biển)
   */
  private buildCoastalCasuarinaGroves(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4d3826, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f542c, roughness: 0.7 });

    const treePositions = [
      { x: -90, z: -40 },
      { x: -80, z: -35 },
      { x: -70, z: -45 },
      { x: -60, z: -40 },
      { x: -85, z: 10 },
      { x: -75, z: 15 },
      { x: -65, z: 20 },
      { x: 20, z: -60 },
      { x: 35, z: -55 },
      { x: 50, z: -62 },
      { x: 65, z: -58 },
      { x: 80, z: -65 },
      { x: 90, z: 20 },
      { x: 85, z: 35 },
      { x: 92, z: 50 },
    ];

    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 5, 6);
    const foliageGeo = new THREE.ConeGeometry(1.6, 6, 7);

    treePositions.forEach((pos) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0.35, pos.z);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.5;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 5.5;
      foliage.castShadow = true;
      tree.add(foliage);

      this.group.add(tree);
    });
  }

  public update(_delta: number, elapsed: number): void {
    // Spin shrimp pond aerators
    this.aerators.forEach((a) => {
      a.rotation.z = elapsed * 8;
    });
  }
}
