import * as THREE from 'three';

/**
 * Chu Lai International Seaport & Tam Hiep Logistics Hub
 * (Cảng Quốc Tế Chu Lai & Bến Cảng Nước Sâu Tam Hiệp)
 * Deep-water maritime gateway serving THACO and the entire Central key economic zone.
 * Features:
 * - 2 STS Container Gantry Cranes
 * - Multi-tiered ISO container storage stacks (THACO, Maersk, Evergreen, ONE)
 * - Berthed ocean cargo freighter ("CHU LAI STAR")
 * - Deep-water quay with rubber fenders and bollards
 * - THACO Logistics mega-warehouse
 */
export class ChuLaiPort {
  public group = new THREE.Group();

  constructor() {
    this.buildQuayWharf();
    this.buildGantryCranes();
    this.buildContainerStacks();
    this.buildCargoShip();
    this.buildLogisticsWarehouse();

    // Positioned at the Eastern deepwater estuary of Tam Hiep (X: 310, Z: 725)
    this.group.position.set(310, 0, 725);
    this.group.scale.set(0.65, 0.65, 0.65);
  }

  /**
   * 1. Reinforced concrete wharf & apron
   */
  private buildQuayWharf(): void {
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x6e7882,
      roughness: 0.85,
      metalness: 0.1,
    });

    // Main concrete quay apron (width: 50, length: 110, height: 1.8)
    const wharfGeo = new THREE.BoxGeometry(50, 1.8, 110);
    const wharf = new THREE.Mesh(wharfGeo, concreteMat);
    wharf.position.set(0, 0.9, 0);
    wharf.receiveShadow = true;
    this.group.add(wharf);

    // Mooring bollards along quay edge
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });
    for (let z = -45; z <= 45; z += 18) {
      const bollardGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 12);
      const bollard = new THREE.Mesh(bollardGeo, bollardMat);
      bollard.position.set(24, 2.0, z);
      this.group.add(bollard);
    }
  }

  /**
   * 2. Massive Ship-to-Shore (STS) Container Cranes (Cần cẩu giàn bờ STS)
   */
  private buildGantryCranes(): void {
    const craneOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xf55a00,
      metalness: 0.7,
      roughness: 0.35,
    });
    const craneBlueMat = new THREE.MeshStandardMaterial({
      color: 0x004d9c,
      metalness: 0.7,
      roughness: 0.35,
    });

    [-20, 20].forEach((zPos, idx) => {
      const craneGroup = new THREE.Group();
      craneGroup.position.set(16, 1.8, zPos);

      const mat = idx === 0 ? craneOrangeMat : craneBlueMat;

      // 4 Portal Legs
      [-3.5, 3.5].forEach((xLeg) => {
        [-4, 4].forEach((zLeg) => {
          const legGeo = new THREE.BoxGeometry(0.9, 20, 0.9);
          const leg = new THREE.Mesh(legGeo, mat);
          leg.position.set(xLeg, 10, zLeg);
          leg.castShadow = true;
          craneGroup.add(leg);
        });
      });

      // Upper Machinery Deck
      const deckGeo = new THREE.BoxGeometry(10, 3.0, 12);
      const deck = new THREE.Mesh(deckGeo, mat);
      deck.position.set(0, 21, 0);
      deck.castShadow = true;
      craneGroup.add(deck);

      // Boom Arm extending over the ship & water (length: 32)
      const boomGeo = new THREE.BoxGeometry(32, 2.0, 2.2);
      const boom = new THREE.Mesh(boomGeo, mat);
      boom.position.set(14, 23.5, 0);
      boom.castShadow = true;
      craneGroup.add(boom);

      // Backstay Tower / Apex
      const apexGeo = new THREE.ConeGeometry(4, 10, 4);
      apexGeo.rotateY(Math.PI / 4);
      const apex = new THREE.Mesh(apexGeo, mat);
      apex.position.set(-2, 28, 0);
      craneGroup.add(apex);

      this.group.add(craneGroup);
    });
  }

  /**
   * 3. Multi-tiered ISO shipping container stacks
   */
  private buildContainerStacks(): void {
    const yardGroup = new THREE.Group();
    yardGroup.position.set(-10, 1.8, 0);

    const contColors = [0x004d9c, 0xc92a2a, 0x2e7d32, 0xd97706, 0x5c6bc0, 0x374151];
    const contGeo = new THREE.BoxGeometry(4.0, 3.2, 10.0);

    for (let bay = -2; bay <= 2; bay++) {
      for (let row = -2; row <= 0; row++) {
        const heightTiers = 2 + Math.floor(Math.sin(bay * 3 + row) * 1.5 + 1.5);
        for (let tier = 0; tier < heightTiers; tier++) {
          const colIdx = Math.abs(bay * 7 + row * 3 + tier) % contColors.length;
          const mat = new THREE.MeshStandardMaterial({
            color: contColors[colIdx],
            metalness: 0.35,
            roughness: 0.6,
          });
          const cont = new THREE.Mesh(contGeo, mat);
          cont.position.set(row * 4.6, tier * 3.3 + 1.6, bay * 11.5);
          cont.castShadow = true;
          yardGroup.add(cont);
        }
      }
    }

    this.group.add(yardGroup);
  }

  /**
   * 4. Ocean Container Cargo Freighter ("CHU LAI STAR")
   */
  private buildCargoShip(): void {
    const shipGroup = new THREE.Group();
    shipGroup.position.set(45, 0.25, 0);

    const hullMat = new THREE.MeshStandardMaterial({ color: 0x1f2429, roughness: 0.6, metalness: 0.4 });
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x9e2a2b, roughness: 0.6 });
    const superstructureMat = new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.3 });

    // Hull (length 80, beam 14, draft 6)
    const hullGeo = new THREE.BoxGeometry(14, 6, 80);
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.y = 2.2;
    hull.castShadow = true;
    shipGroup.add(hull);

    // Main Deck
    const deckGeo = new THREE.BoxGeometry(14.2, 0.4, 80.2);
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 5.3;
    shipGroup.add(deck);

    // Stern Bridge Superstructure
    const bridgeGeo = new THREE.BoxGeometry(12, 9, 12);
    const bridge = new THREE.Mesh(bridgeGeo, superstructureMat);
    bridge.position.set(0, 9.8, -26);
    bridge.castShadow = true;
    shipGroup.add(bridge);

    // Funnel
    const funnelGeo = new THREE.CylinderGeometry(1.0, 1.2, 4.5, 8);
    const funnelMat = new THREE.MeshStandardMaterial({ color: 0x004d9c, roughness: 0.4 });
    const funnel = new THREE.Mesh(funnelGeo, funnelMat);
    funnel.position.set(0, 16.0, -26);
    shipGroup.add(funnel);

    // Containers on deck
    const contGeo = new THREE.BoxGeometry(2.2, 2.4, 5.5);
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x004d9c, roughness: 0.4 });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0xb22222, roughness: 0.4 });

    for (let r = -1; r <= 1; r++) {
      for (let b = -2; b <= 3; b++) {
        for (let t = 0; t < 2; t++) {
          const cMesh = new THREE.Mesh(contGeo, (r + b) % 2 === 0 ? mat1 : mat2);
          cMesh.position.set(r * 2.4, 5.5 + t * 2.5 + 1.2, b * 6.5 + 4);
          cMesh.castShadow = true;
          shipGroup.add(cMesh);
        }
      }
    }

    this.group.add(shipGroup);
  }

  /**
   * 5. THACO Logistics Mega-Warehouse
   */
  private buildLogisticsWarehouse(): void {
    const warehouseGroup = new THREE.Group();
    warehouseGroup.position.set(-42, 1.8, 0);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xdde4ec, roughness: 0.7, metalness: 0.2 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x224870, roughness: 0.5, metalness: 0.3 });

    // Warehouse body
    const bodyGeo = new THREE.BoxGeometry(28, 8, 55);
    const body = new THREE.Mesh(bodyGeo, wallMat);
    body.position.y = 4.0;
    body.castShadow = true;
    warehouseGroup.add(body);

    // Curved Barrel Roof
    const roofGeo = new THREE.CylinderGeometry(14, 14, 55.4, 16, 1, false, 0, Math.PI);
    roofGeo.rotateZ(Math.PI / 2);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 8;
    roof.castShadow = true;
    warehouseGroup.add(roof);

    this.group.add(warehouseGroup);
  }
}
