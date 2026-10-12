import * as THREE from 'three';

/**
 * Procedural PBR model of Da Nang Dragon Bridge (Cầu Rồng)
 * Features 5 undulating steel arches, sculpted Dragon Head & Tail, bridge piers,
 * animated LED lighting ribbon, and weekend fire-breathing simulation.
 */
export class DragonBridge {
  public group = new THREE.Group();

  private ledRibbonMesh: THREE.Mesh | null = null;
  private ledMaterial: THREE.MeshBasicMaterial | null = null;
  private flameParticles: THREE.Points | null = null;
  private isBreathingFire = false;

  constructor() {
    this.buildBridgeDeck();
    this.buildPiers();
    this.buildDragonArches();
    this.buildDragonHead();
    this.buildDragonTail();
    this.buildLedLighting();
    this.buildFireBreathingEffect();

    // Position Dragon Bridge directly at scene origin [0, 0, 0]
    this.group.position.set(0, 0, 0);
  }

  /**
   * 1. Main bridge roadway deck (666m scaled to 66.6 units, width 37.5m scaled to 4.2 units)
   */
  private buildBridgeDeck(): void {
    const deckLength = 68;
    const deckWidth = 4.4;
    const deckHeight = 0.6;

    // Roadway asphalt deck
    const deckGeo = new THREE.BoxGeometry(deckLength, deckHeight, deckWidth);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x24282f,
      roughness: 0.8,
      metalness: 0.15,
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 3.2, 0); // Elevation above water level
    deck.castShadow = true;
    deck.receiveShadow = true;
    this.group.add(deck);

    // Pedestrian safety barriers & railings on both sides
    const railGeo = new THREE.BoxGeometry(deckLength, 0.35, 0.15);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xe0e6ed,
      metalness: 0.7,
      roughness: 0.3,
    });

    const railNorth = new THREE.Mesh(railGeo, railMat);
    railNorth.position.set(0, 3.65, -deckWidth / 2 + 0.1);
    this.group.add(railNorth);

    const railSouth = new THREE.Mesh(railGeo, railMat);
    railSouth.position.set(0, 3.65, deckWidth / 2 - 0.1);
    this.group.add(railSouth);
  }

  /**
   * 2. Massive concrete piers anchored into the Han riverbed
   */
  private buildPiers(): void {
    const pierGeo = new THREE.CylinderGeometry(1.6, 2.0, 3.6, 16);
    const pierMat = new THREE.MeshStandardMaterial({
      color: 0x484f59,
      roughness: 0.9,
    });

    const pierPositions = [-20, -7, 7, 20];
    pierPositions.forEach((x) => {
      const pier = new THREE.Mesh(pierGeo, pierMat);
      pier.position.set(x, 1.8, 0);
      pier.castShadow = true;
      pier.receiveShadow = true;
      this.group.add(pier);
    });
  }

  /**
   * 3. Five undulating Golden Dragon steel tubular arches
   */
  private buildDragonArches(): void {
    const goldArchMat = new THREE.MeshStandardMaterial({
      color: 0xf5ab00, // Vibrant dragon gold
      roughness: 0.3,
      metalness: 0.75,
    });

    // Generate spline curve across the bridge representing the dragon's sinuous spine
    const spinePoints: THREE.Vector3[] = [];
    const spanCount = 5;
    const startX = -27;
    const endX = 27;
    const totalSpan = endX - startX;

    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const x = startX + t * totalSpan;
      // Five sinus wave peaks for the 5 arches, peaking at height 8.5 units
      const archHeight = Math.sin(t * Math.PI * spanCount) * 4.8;
      const y = 3.2 + Math.max(0, archHeight);
      spinePoints.push(new THREE.Vector3(x, y, 0));
    }

    const curve = new THREE.CatmullRomCurve3(spinePoints);
    // Central main tube
    const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.65, 12, false);
    const archMesh = new THREE.Mesh(tubeGeo, goldArchMat);
    archMesh.castShadow = true;
    this.group.add(archMesh);

    // Twin secondary side steel tubes (Cầu Rồng triple tubular steel bundle)
    [-0.65, 0.65].forEach((zOffset) => {
      const sideCurvePoints = spinePoints.map((p) => new THREE.Vector3(p.x, Math.max(3.2, p.y - 0.35), zOffset));
      const sideCurve = new THREE.CatmullRomCurve3(sideCurvePoints);
      const sideTubeGeo = new THREE.TubeGeometry(sideCurve, 80, 0.35, 10, false);
      const sideMesh = new THREE.Mesh(sideTubeGeo, goldArchMat);
      sideMesh.castShadow = true;
      this.group.add(sideMesh);
    });

    // Dragon dorsal spine fins (Vây lưng rồng tam giác màu vàng ánh kim)
    const finMat = new THREE.MeshStandardMaterial({
      color: 0xffbe1a,
      metalness: 0.85,
      roughness: 0.2,
    });
    for (let i = 1; i <= 39; i++) {
      const t = i / 40;
      const point = curve.getPoint(t);
      if (point.y > 4.6) {
        const finGeo = new THREE.ConeGeometry(0.3, 0.85, 3);
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.position.set(point.x, point.y + 0.6, 0);
        this.group.add(fin);
      }
    }

    // Lateral stabilizer steel hangers connecting arch spine to deck
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const point = curve.getPoint(t);
      if (point.y > 4.2) {
        const hangerHeight = point.y - 3.2;
        const hangerGeo = new THREE.CylinderGeometry(0.04, 0.04, hangerHeight);
        const hangerMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
        const hanger = new THREE.Mesh(hangerGeo, hangerMat);
        hanger.position.set(point.x, 3.2 + hangerHeight / 2, 0);
        this.group.add(hanger);
      }
    }
  }

  /**
   * 4. Sculpted Dragon Head at the Eastern end (facing the East Sea)
   */
  private buildDragonHead(): void {
    const headGroup = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfda800,
      metalness: 0.8,
      roughness: 0.25,
    });

    // Dragon head cranium
    const craniumGeo = new THREE.ConeGeometry(1.2, 3.4, 8);
    craniumGeo.rotateZ(-Math.PI / 2.3);
    const cranium = new THREE.Mesh(craniumGeo, goldMat);
    headGroup.add(cranium);

    // Dragon jaws / snout
    const snoutGeo = new THREE.BoxGeometry(1.4, 0.8, 0.9);
    const snout = new THREE.Mesh(snoutGeo, goldMat);
    snout.position.set(1.5, -0.1, 0);
    headGroup.add(snout);

    // Dragon glowing ruby eyes
    const eyeGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff1133 });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(1.1, 0.5, 0.45);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(1.1, 0.5, -0.45);
    headGroup.add(rightEye);

    // Dragon golden horns & crest
    const hornGeo = new THREE.ConeGeometry(0.25, 2.0, 6);
    hornGeo.rotateZ(Math.PI / 3);
    const hornLeft = new THREE.Mesh(hornGeo, goldMat);
    hornLeft.position.set(-0.2, 1.1, 0.35);
    headGroup.add(hornLeft);

    const hornRight = new THREE.Mesh(hornGeo, goldMat);
    hornRight.position.set(-0.2, 1.1, -0.35);
    headGroup.add(hornRight);

    // Position head at eastern abutment (X = 28.5)
    headGroup.position.set(28.5, 5.8, 0);
    this.group.add(headGroup);
  }

  /**
   * 5. Sculpted Dragon Tail at the Western end (facing Nguyen Van Linh / Airport)
   */
  private buildDragonTail(): void {
    const tailGroup = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfda800,
      metalness: 0.8,
      roughness: 0.3,
    });

    // Sinuous tail stylized lotus blossom fan
    for (let i = 0; i < 5; i++) {
      const petalGeo = new THREE.ConeGeometry(0.3, 2.2, 6);
      petalGeo.rotateZ(-Math.PI / 3 + (i - 2) * 0.25);
      const petal = new THREE.Mesh(petalGeo, goldMat);
      petal.position.set(-0.8, 0.6 + Math.abs(i - 2) * 0.2, (i - 2) * 0.35);
      tailGroup.add(petal);
    }

    tailGroup.position.set(-28.2, 4.2, 0);
    this.group.add(tailGroup);
  }

  /**
   * 6. Dynamic programmable LED lighting ribbon along dragon body
   */
  private buildLedLighting(): void {
    const ledCurvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = -26 + t * 52;
      const y = 3.6 + Math.max(0, Math.sin(t * Math.PI * 5) * 4.9);
      ledCurvePoints.push(new THREE.Vector3(x, y + 0.15, 0));
    }
    const ledCurve = new THREE.CatmullRomCurve3(ledCurvePoints);
    const ledGeo = new THREE.TubeGeometry(ledCurve, 80, 0.12, 8, false);

    this.ledMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.9,
    });

    this.ledRibbonMesh = new THREE.Mesh(ledGeo, this.ledMaterial);
    this.group.add(this.ledRibbonMesh);
  }

  /**
   * 7. Weekend Fire-breathing particle system from Dragon Mouth
   */
  private buildFireBreathingEffect(): void {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      colors[i * 3] = 1.0;     // Red
      colors[i * 3 + 1] = 0.4; // Orange-yellow
      colors[i * 3 + 2] = 0.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });

    this.flameParticles = new THREE.Points(geometry, material);
    this.flameParticles.position.set(30.8, 5.8, 0); // Position at mouth
    this.group.add(this.flameParticles);
  }

  public triggerFire(enable: boolean): void {
    this.isBreathingFire = enable;
    if (this.flameParticles && this.flameParticles.material instanceof THREE.PointsMaterial) {
      this.flameParticles.material.opacity = enable ? 0.95 : 0.0;
    }
  }

  public update(_delta: number, elapsed: number, nightGlowIntensity: number): void {
    // Dynamic LED illumination pattern along dragon spine
    if (this.ledMaterial) {
      // Cycle through Da Nang iconic bridge lighting hues (Gold -> Jade -> Royal Blue -> Magenta)
      const hue = (elapsed * 0.12) % 1;
      this.ledMaterial.color.setHSL(hue, 0.95, 0.55);
      this.ledMaterial.opacity = Math.max(0.4, nightGlowIntensity * 0.95);
    }

    // Animate flame particles if active
    if (this.isBreathingFire && this.flameParticles) {
      const posAttr = this.flameParticles.geometry.attributes.position as THREE.BufferAttribute;
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        // Project flame outward towards East (+X) with turbulent dispersal
        const life = (elapsed * 3 + i * 0.05) % 1;
        const x = life * 8.5;
        const y = Math.sin(life * 5) * 0.8 + life * 0.5;
        const z = (Math.sin(i * 12 + elapsed * 8) - 0.5) * life * 2.2;
        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
    }
  }
}
