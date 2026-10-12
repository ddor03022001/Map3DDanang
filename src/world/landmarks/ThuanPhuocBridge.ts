import * as THREE from 'three';

/**
 * Procedural PBR model of Da Nang Thuan Phuoc Suspension Bridge (Cầu Thuận Phước)
 * Features suspension towers, catenary cables, vertical suspenders, concrete anchor blocks,
 * and sloped approach ramps connecting into the West (Hai Chau) and East (Son Tra) road networks.
 */
export class ThuanPhuocBridge {
  public group = new THREE.Group();

  constructor() {
    this.buildBridgeDeckAndRamps();
    this.buildSuspensionTowers();
    this.buildAnchorBlocks();
    this.buildMainCables();
    this.buildVerticalSuspenders();

    // Centered spanning across the mouth of the Han River into Da Nang Bay
    this.group.position.set(0, 0, -390);
  }

  /**
   * 1. Main span deck + West/East sloped approach ramps connecting to city ground
   */
  private buildBridgeDeckAndRamps(): void {
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x2b3038,
      roughness: 0.8,
      metalness: 0.2,
    });

    const railMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0e8,
      metalness: 0.7,
      roughness: 0.3,
    });

    // 1.1 Central Main Navigation Span (Length: 88, Height: 4.8 above sea level)
    const mainDeckGeo = new THREE.BoxGeometry(88, 0.6, 4.2);
    const mainDeck = new THREE.Mesh(mainDeckGeo, deckMat);
    mainDeck.position.set(0, 4.8, 0);
    mainDeck.castShadow = true;
    mainDeck.receiveShadow = true;
    this.group.add(mainDeck);

    // Railings on main span
    [-2.0, 2.0].forEach((zOff) => {
      const railGeo = new THREE.BoxGeometry(88, 0.4, 0.12);
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(0, 5.3, zOff);
      this.group.add(rail);
    });

    // 1.2 West Approach Ramp (Sloping down from X = -44 to X = -80, landing at Y = 0.35)
    const rampLength = 38;
    const rampAngle = Math.atan2(4.8 - 0.35, rampLength);
    const westRampGeo = new THREE.BoxGeometry(rampLength, 0.55, 4.2);
    const westRamp = new THREE.Mesh(westRampGeo, deckMat);
    westRamp.position.set(-44 - rampLength / 2, (4.8 + 0.35) / 2, 0);
    westRamp.rotation.z = -rampAngle;
    westRamp.castShadow = true;
    westRamp.receiveShadow = true;
    this.group.add(westRamp);

    // Supporting piers along West approach ramp
    [-52, -64, -74].forEach((px) => {
      const pierHeight = 4.8 - ((Math.abs(px) - 44) / rampLength) * 4.45;
      const pierGeo = new THREE.CylinderGeometry(0.7, 0.85, pierHeight, 12);
      const pierMat = new THREE.MeshStandardMaterial({ color: 0x485059, roughness: 0.85 });
      const pier = new THREE.Mesh(pierGeo, pierMat);
      pier.position.set(px, pierHeight / 2, 0);
      pier.castShadow = true;
      this.group.add(pier);
    });

    // 1.3 East Approach Ramp (Sloping down from X = 44 to X = 80, landing at Y = 0.35)
    const eastRampGeo = new THREE.BoxGeometry(rampLength, 0.55, 4.2);
    const eastRamp = new THREE.Mesh(eastRampGeo, deckMat);
    eastRamp.position.set(44 + rampLength / 2, (4.8 + 0.35) / 2, 0);
    eastRamp.rotation.z = rampAngle;
    eastRamp.castShadow = true;
    eastRamp.receiveShadow = true;
    this.group.add(eastRamp);

    // Supporting piers along East approach ramp
    [52, 64, 74].forEach((px) => {
      const pierHeight = 4.8 - ((px - 44) / rampLength) * 4.45;
      const pierGeo = new THREE.CylinderGeometry(0.7, 0.85, pierHeight, 12);
      const pierMat = new THREE.MeshStandardMaterial({ color: 0x485059, roughness: 0.85 });
      const pier = new THREE.Mesh(pierGeo, pierMat);
      pier.position.set(px, pierHeight / 2, 0);
      pier.castShadow = true;
      this.group.add(pier);
    });
  }

  /**
   * 2. Massive concrete anchor blocks where main suspension cables are tied down
   */
  private buildAnchorBlocks(): void {
    const anchorGeo = new THREE.BoxGeometry(6.5, 4.2, 5.5);
    const anchorMat = new THREE.MeshStandardMaterial({
      color: 0x3d444d,
      roughness: 0.9,
    });

    [-44, 44].forEach((px) => {
      const block = new THREE.Mesh(anchorGeo, anchorMat);
      block.position.set(px, 2.1, 0);
      block.castShadow = true;
      block.receiveShadow = true;
      this.group.add(block);
    });
  }

  /**
   * 3. Two soaring Silver-White Suspension Pylons
   */
  private buildSuspensionTowers(): void {
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0xe6edf5, // Pristine silver-white
      metalness: 0.8,
      roughness: 0.25,
    });

    [-24, 24].forEach((xPos) => {
      const towerGroup = new THREE.Group();
      const towerHeight = 22;

      // Two vertical portal legs
      [-1.8, 1.8].forEach((zOffset) => {
        const legGeo = new THREE.BoxGeometry(1.4, towerHeight, 1.0);
        const leg = new THREE.Mesh(legGeo, towerMat);
        leg.position.set(0, towerHeight / 2, zOffset);
        leg.castShadow = true;
        towerGroup.add(leg);
      });

      // Upper and mid cross-bracing beams
      const beamGeo = new THREE.BoxGeometry(1.4, 0.8, 4.2);
      const topBeam = new THREE.Mesh(beamGeo, towerMat);
      topBeam.position.set(0, towerHeight - 1.2, 0);
      towerGroup.add(topBeam);

      const midBeam = new THREE.Mesh(beamGeo, towerMat);
      midBeam.position.set(0, towerHeight * 0.6, 0);
      towerGroup.add(midBeam);

      // Red aviation beacon light on top
      const beaconGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff0022 });
      const beaconLeft = new THREE.Mesh(beaconGeo, beaconMat);
      beaconLeft.position.set(0, towerHeight + 0.2, -1.8);
      towerGroup.add(beaconLeft);

      const beaconRight = new THREE.Mesh(beaconGeo, beaconMat);
      beaconRight.position.set(0, towerHeight + 0.2, 1.8);
      towerGroup.add(beaconRight);

      // Concrete submerged tower foundations
      const foundationGeo = new THREE.CylinderGeometry(2.4, 2.8, 4.2, 16);
      const foundationMat = new THREE.MeshStandardMaterial({ color: 0x3d454f, roughness: 0.95 });
      const foundation = new THREE.Mesh(foundationGeo, foundationMat);
      foundation.position.set(0, 1.5, 0);
      foundation.receiveShadow = true;
      towerGroup.add(foundation);

      towerGroup.position.set(xPos, 0, 0);
      this.group.add(towerGroup);
    });
  }

  /**
   * 4. Twin catenary parabolic main cables spanning from anchor blocks over towers
   */
  private buildMainCables(): void {
    const cableMat = new THREE.MeshBasicMaterial({ color: 0x98a8b8 });

    [-1.8, 1.8].forEach((zOffset) => {
      const points: THREE.Vector3[] = [];

      // Cable profile from West anchor (-44) -> West tower (-24, h=22) -> Mid span (h=5.5) -> East tower (24, h=22) -> East anchor (44)
      points.push(new THREE.Vector3(-44, 3.8, zOffset));
      points.push(new THREE.Vector3(-34, 13.0, zOffset));
      points.push(new THREE.Vector3(-24, 21.6, zOffset));
      points.push(new THREE.Vector3(-12, 10.5, zOffset));
      points.push(new THREE.Vector3(0, 5.8, zOffset));
      points.push(new THREE.Vector3(12, 10.5, zOffset));
      points.push(new THREE.Vector3(24, 21.6, zOffset));
      points.push(new THREE.Vector3(34, 13.0, zOffset));
      points.push(new THREE.Vector3(44, 3.8, zOffset));

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.12, 8, false);
      const cable = new THREE.Mesh(tubeGeo, cableMat);
      this.group.add(cable);
    });
  }

  /**
   * 5. Vertical suspender wire ropes connecting main cable to bridge deck
   */
  private buildVerticalSuspenders(): void {
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x8090a0 });

    for (let x = -21; x <= 21; x += 3.5) {
      if (Math.abs(x) < 0.5) continue;

      // Parabolic cable height formula between towers (-24 to 24)
      const t = x / 24; // -1 to 1
      const cableHeight = 5.8 + t * t * 15.8;
      const wireHeight = cableHeight - 4.8;

      [-1.8, 1.8].forEach((zOffset) => {
        const wireGeo = new THREE.CylinderGeometry(0.025, 0.025, wireHeight, 4);
        const wire = new THREE.Mesh(wireGeo, wireMat);
        wire.position.set(x, 4.8 + wireHeight / 2, zOffset);
        this.group.add(wire);
      });
    }
  }
}
