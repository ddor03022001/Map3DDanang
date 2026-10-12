import * as THREE from 'three';

/**
 * Procedural PBR model of Da Nang Han River Swing Bridge (Cầu Quay Sông Hàn)
 * First swing bridge in Vietnam, engineered with rotating central pier and cable-stayed spans
 */
export class HanRiverBridge {
  public group = new THREE.Group();

  constructor() {
    this.buildBridgeDeck();
    this.buildCenterPylonAndCables();
    this.buildRiverPiers();

    // Position according to Da Nang coordinates (North of Dragon Bridge along river)
    this.group.position.set(0, 0, -125);
  }

  private buildBridgeDeck(): void {
    const deckLength = 52;
    const deckWidth = 3.6;
    const deckHeight = 0.5;

    const deckGeo = new THREE.BoxGeometry(deckLength, deckHeight, deckWidth);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x30353d,
      roughness: 0.8,
      metalness: 0.2,
    });

    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 3.2, 0);
    deck.castShadow = true;
    deck.receiveShadow = true;
    this.group.add(deck);
  }

  private buildCenterPylonAndCables(): void {
    const pylonMat = new THREE.MeshStandardMaterial({
      color: 0xe8ecf0, // White-gray steel tower
      metalness: 0.7,
      roughness: 0.3,
    });

    // Central A-frame cable tower
    const towerHeight = 14;
    const towerGeo = new THREE.CylinderGeometry(0.3, 0.6, towerHeight, 8);

    const leftTower = new THREE.Mesh(towerGeo, pylonMat);
    leftTower.position.set(0, 3.2 + towerHeight / 2, 1.2);
    leftTower.castShadow = true;
    this.group.add(leftTower);

    const rightTower = new THREE.Mesh(towerGeo, pylonMat);
    rightTower.position.set(0, 3.2 + towerHeight / 2, -1.2);
    rightTower.castShadow = true;
    this.group.add(rightTower);

    // Cross beam joining towers
    const crossGeo = new THREE.BoxGeometry(0.5, 0.4, 2.5);
    const cross = new THREE.Mesh(crossGeo, pylonMat);
    cross.position.set(0, 3.2 + towerHeight - 1, 0);
    this.group.add(cross);

    // Stay cables radiating to bridge deck
    const cableMat = new THREE.MeshBasicMaterial({ color: 0x8899aa });
    const cableSpans = [-18, -12, -6, 6, 12, 18];

    cableSpans.forEach((xPos) => {
      const topPoint = new THREE.Vector3(0, 3.2 + towerHeight - 1.5, 0);
      const bottomPoint = new THREE.Vector3(xPos, 3.4, 0);

      const path = new THREE.LineCurve3(topPoint, bottomPoint);
      const cableGeo = new THREE.TubeGeometry(path, 1, 0.03, 4, false);
      const cable = new THREE.Mesh(cableGeo, cableMat);
      this.group.add(cable);
    });
  }

  private buildRiverPiers(): void {
    // Massive circular rotating center pier
    const centerPierGeo = new THREE.CylinderGeometry(2.8, 3.2, 3.6, 24);
    const pierMat = new THREE.MeshStandardMaterial({ color: 0x424952, roughness: 0.9 });

    const centerPier = new THREE.Mesh(centerPierGeo, pierMat);
    centerPier.position.set(0, 1.8, 0);
    centerPier.receiveShadow = true;
    this.group.add(centerPier);

    // Side abutment piers
    [-22, 22].forEach((x) => {
      const pierGeo = new THREE.CylinderGeometry(1.4, 1.6, 3.6, 12);
      const pier = new THREE.Mesh(pierGeo, pierMat);
      pier.position.set(x, 1.8, 0);
      this.group.add(pier);
    });
  }
}
