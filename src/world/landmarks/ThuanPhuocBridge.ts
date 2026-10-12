import * as THREE from 'three';

/**
 * Procedural PBR model of Da Nang Thuan Phuoc Suspension Bridge (Cầu Thuận Phước)
 * Longest suspension bridge in Vietnam spanning the mouth of Da Nang Bay
 */
export class ThuanPhuocBridge {
  public group = new THREE.Group();

  constructor() {
    this.buildBridgeDeck();
    this.buildSuspensionTowers();
    this.buildMainCables();

    // Positioned at the mouth of the river into Da Nang Bay (North end)
    this.group.position.set(-35, 0, -395);
  }

  private buildBridgeDeck(): void {
    const deckGeo = new THREE.BoxGeometry(85, 0.6, 3.8);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x2b3038,
      roughness: 0.8,
      metalness: 0.2,
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 4.5, 0); // High clearance for maritime vessels
    deck.castShadow = true;
    deck.receiveShadow = true;
    this.group.add(deck);
  }

  private buildSuspensionTowers(): void {
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0xdee4ec, // Silver-white steel pylons
      metalness: 0.8,
      roughness: 0.25,
    });

    [-18, 18].forEach((xPos) => {
      const towerGroup = new THREE.Group();
      const towerHeight = 18;

      // Two vertical legs
      [-1.4, 1.4].forEach((zOffset) => {
        const legGeo = new THREE.BoxGeometry(1.2, towerHeight, 0.8);
        const leg = new THREE.Mesh(legGeo, towerMat);
        leg.position.set(0, towerHeight / 2, zOffset);
        leg.castShadow = true;
        towerGroup.add(leg);
      });

      // Upper bracing crossbeams
      const beamGeo = new THREE.BoxGeometry(1.2, 0.6, 3.2);
      const topBeam = new THREE.Mesh(beamGeo, towerMat);
      topBeam.position.set(0, towerHeight - 1, 0);
      towerGroup.add(topBeam);

      towerGroup.position.set(xPos, 0, 0);
      this.group.add(towerGroup);
    });
  }

  private buildMainCables(): void {
    const cableMat = new THREE.MeshBasicMaterial({ color: 0x90a0b0 });

    // Catenary parabolic cable lines on North and South sides of deck
    [-1.4, 1.4].forEach((zOffset) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 30; i++) {
        const t = (i / 30) * 2 - 1; // -1 to 1
        const x = t * 40;
        // Catenary sag between pylons
        const y = 4.5 + Math.pow(Math.abs(t) * 1.1, 2) * 12;
        points.push(new THREE.Vector3(x, y, zOffset));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 6, false);
      const cable = new THREE.Mesh(tubeGeo, cableMat);
      this.group.add(cable);
    });
  }
}
