import * as THREE from 'three';

/**
 * Cầu vượt vòng xuyến 2 tầng Chu Lai & Biểu tượng Cây Xương Rồng
 * (Chu Lai 2-Level Interchange & Iconic Cactus Monument)
 * Historic infrastructure landmark at QL1A - THACO Chu Lai gateway.
 */
export class ChuLaiOverpass {
  public group = new THREE.Group();

  private ledGlow: THREE.MeshBasicMaterial | null = null;

  constructor() {
    this.buildGroundLevelInterchange();
    this.buildElevatedRingFlyover();
    this.buildCactusMonument();

    // Position at Chu Lai Gateway on Highway 1A
    this.group.position.set(220, 0, 720);
  }

  /**
   * 1. Ground Level Roundabout connecting QL1A (North/South) and THACO / Port artery (East/West)
   */
  private buildGroundLevelInterchange(): void {
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x242830,
      roughness: 0.8,
    });
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2e6b3e,
      roughness: 0.9,
    });
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Outer roundabout circle (radius: 12 to 24) sitting cleanly on top of arterial intersection
    const ringGeo = new THREE.RingGeometry(12, 24, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, roadMat);
    ring.position.y = 0.40;
    ring.receiveShadow = true;
    this.group.add(ring);

    // Dashed circular guide stripes on roundabout
    const dashCount = 24;
    for (let i = 0; i < dashCount; i++) {
      const angle = (i / dashCount) * Math.PI * 2;
      const stripeGeo = new THREE.PlaneGeometry(0.3, 2.2);
      stripeGeo.rotateX(-Math.PI / 2);
      stripeGeo.rotateY(-angle);
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.set(Math.cos(angle) * 18, 0.41, Math.sin(angle) * 18);
      this.group.add(stripe);
    }

    // Center grass island (radius: 12)
    const islandGeo = new THREE.CircleGeometry(11.8, 36);
    islandGeo.rotateX(-Math.PI / 2);
    const island = new THREE.Mesh(islandGeo, grassMat);
    island.position.y = 0.42;
    island.receiveShadow = true;
    this.group.add(island);
  }

  /**
   * 2. Elevated 2nd Level Ring Viaduct (Cầu vượt xuyến tròn trên cao)
   */
  private buildElevatedRingFlyover(): void {
    const viaductDeckMat = new THREE.MeshStandardMaterial({
      color: 0x363d47,
      roughness: 0.75,
      metalness: 0.25,
    });
    const pierMat = new THREE.MeshStandardMaterial({
      color: 0xdde4ec, // Silver-white painted concrete
      roughness: 0.4,
      metalness: 0.3,
    });

    const ringRadius = 18;
    const ringWidth = 3.8;
    const height = 4.8; // Clearance above ground roundabout

    // Elevated circular deck
    const deckGeo = new THREE.RingGeometry(ringRadius - ringWidth / 2, ringRadius + ringWidth / 2, 48);
    deckGeo.rotateX(-Math.PI / 2);
    const elevatedDeck = new THREE.Mesh(deckGeo, viaductDeckMat);
    elevatedDeck.position.y = height;
    elevatedDeck.castShadow = true;
    elevatedDeck.receiveShadow = true;
    this.group.add(elevatedDeck);

    // Outer & inner safety barriers
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0xedf2f7, metalness: 0.6, roughness: 0.3 });
    [ringRadius - ringWidth / 2, ringRadius + ringWidth / 2].forEach((r) => {
      const barrierGeo = new THREE.RingGeometry(r - 0.1, r + 0.1, 48);
      barrierGeo.rotateX(-Math.PI / 2);
      const barrier = new THREE.Mesh(barrierGeo, barrierMat);
      barrier.position.y = height + 0.35;
      this.group.add(barrier);
    });

    // Supporting V-shaped concrete piers around the ring
    const pierCount = 8;
    for (let i = 0; i < pierCount; i++) {
      const angle = (i / pierCount) * Math.PI * 2;
      const px = Math.cos(angle) * ringRadius;
      const pz = Math.sin(angle) * ringRadius;

      // Two inclined legs forming V-pier
      const legGeo = new THREE.BoxGeometry(0.8, height, 0.8);
      const leftLeg = new THREE.Mesh(legGeo, pierMat);
      leftLeg.position.set(px - 0.4, height / 2, pz);
      leftLeg.rotation.z = 0.12;
      leftLeg.castShadow = true;
      this.group.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, pierMat);
      rightLeg.position.set(px + 0.4, height / 2, pz);
      rightLeg.rotation.z = -0.12;
      rightLeg.castShadow = true;
      this.group.add(rightLeg);
    }
  }

  /**
   * 3. Iconic Cactus Monument (Biểu tượng Cây Xương Rồng Chu Lai)
   * Rising proudly in the center of the interchange, representing resilience of coastal Chu Lai
   */
  private buildCactusMonument(): void {
    const monumentGroup = new THREE.Group();

    // 3.1 Terraced circular granite pedestal (Bệ đài tròn 3 tầng)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x9e3b2e, // Terracotta red-brown granite base
      roughness: 0.7,
      metalness: 0.1,
    });

    const tier1Geo = new THREE.CylinderGeometry(5.2, 5.8, 0.8, 24);
    const tier1 = new THREE.Mesh(tier1Geo, baseMat);
    tier1.position.y = 0.4;
    monumentGroup.add(tier1);

    const tier2Geo = new THREE.CylinderGeometry(3.6, 4.2, 0.6, 24);
    const tier2 = new THREE.Mesh(tier2Geo, baseMat);
    tier2.position.y = 1.1;
    monumentGroup.add(tier2);

    // 3.2 Stylized Green Cactus Sculpture (Cụm Thân Xương Rồng Chu Lai)
    const cactusMat = new THREE.MeshStandardMaterial({
      color: 0x1f7a42, // Jade green cactus skin
      roughness: 0.4,
      metalness: 0.35,
    });

    // Central primary cactus column
    const mainColumnGeo = new THREE.CylinderGeometry(0.7, 0.85, 9.5, 12);
    const mainColumn = new THREE.Mesh(mainColumnGeo, cactusMat);
    mainColumn.position.y = 1.4 + 4.75;
    mainColumn.castShadow = true;
    monumentGroup.add(mainColumn);

    // Side branching arms (Cành xương rồng vươn cao)
    const armCurves = [
      // Right branch curving upward
      [new THREE.Vector3(0, 4.5, 0), new THREE.Vector3(2.2, 5.2, 0), new THREE.Vector3(2.2, 8.2, 0)],
      // Left branch curving upward
      [new THREE.Vector3(0, 3.8, 0), new THREE.Vector3(-2.0, 4.5, 0), new THREE.Vector3(-2.0, 7.5, 0)],
      // Front branch
      [new THREE.Vector3(0, 5.0, 0), new THREE.Vector3(0, 5.6, 1.8), new THREE.Vector3(0, 8.0, 1.8)],
    ];

    armCurves.forEach((pts) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const armGeo = new THREE.TubeGeometry(curve, 20, 0.5, 8, false);
      const arm = new THREE.Mesh(armGeo, cactusMat);
      arm.castShadow = true;
      monumentGroup.add(arm);
    });

    // 3.3 Golden-Red Cactus Blossoms (Bông hoa xương rồng nở trên đỉnh)
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xff3b20, // Radiant desert flower red-orange
      roughness: 0.3,
      metalness: 0.5,
      emissive: new THREE.Color(0xff4422),
      emissiveIntensity: 0.4,
    });

    const blossomGeo = new THREE.SphereGeometry(0.75, 12, 12);
    const blossomMain = new THREE.Mesh(blossomGeo, flowerMat);
    blossomMain.position.y = 1.4 + 9.5;
    monumentGroup.add(blossomMain);

    // 3.4 Night illumination beacon / spotlight ring
    this.ledGlow = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.8,
    });

    const haloGeo = new THREE.RingGeometry(0.9, 1.3, 16);
    haloGeo.rotateX(-Math.PI / 2);
    const halo = new THREE.Mesh(haloGeo, this.ledGlow);
    halo.position.y = 1.4 + 9.8;
    monumentGroup.add(halo);

    this.group.add(monumentGroup);
  }

  public update(_delta: number, elapsed: number, nightGlowIntensity: number): void {
    if (this.ledGlow) {
      // Gentle pulsing night glow
      this.ledGlow.opacity = Math.max(0.2, (0.5 + Math.sin(elapsed * 2) * 0.3) * nightGlowIntensity);
    }
  }
}
