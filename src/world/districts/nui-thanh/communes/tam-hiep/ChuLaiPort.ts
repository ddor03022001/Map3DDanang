import * as THREE from 'three';

/**
 * Chu Lai International Seaport & Tam Hiep Logistics Hub
 * (Cảng Quốc Tế Chu Lai & Bến Cảng Tam Hiệp)
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

    // Positioned at the Eastern deepwater estuary of Tam Hiep
    this.group.position.set(490, 0, 720);
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
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0a334a,
      roughness: 0.1,
      metalness: 0.85,
    });

    // Main concrete quay apron (width: 65, length: 140, height: 1.8)
    const wharfGeo = new THREE.BoxGeometry(65, 1.8, 140);
    const wharf = new THREE.Mesh(wharfGeo, concreteMat);
    wharf.position.set(0, 0.9, 0);
    wharf.receiveShadow = true;
    this.group.add(wharf);

    // Deep-water channel beside wharf
    const channelGeo = new THREE.PlaneGeometry(80, 160);
    channelGeo.rotateX(-Math.PI / 2);
    const channel = new THREE.Mesh(channelGeo, waterMat);
    channel.position.set(65, 0.25, 0);
    this.group.add(channel);

    // Mooring bollards along quay edge
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });
    for (let z = -60; z <= 60; z += 20) {
      const bollardGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 12);
      const bollard = new THREE.Mesh(bollardGeo, bollardMat);
      bollard.position.set(31, 2.0, z);
      this.group.add(bollard);
    }
  }

  /**
   * 2. Massive Ship-to-Shore (STS) Container Cranes (Cần cẩu giàn bờ STS)
   */
  private buildGantryCranes(): void {
    const craneOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xf55a00, // Safety orange
      metalness: 0.7,
      roughness: 0.35,
    });
    const craneBlueMat = new THREE.MeshStandardMaterial({
      color: 0x004d9c, // Maritime blue
      metalness: 0.7,
      roughness: 0.35,
    });

    [-25, 25].forEach((zPos, idx) => {
      const craneGroup = new THREE.Group();
      craneGroup.position.set(22, 1.8, zPos);

      const mat = idx === 0 ? craneOrangeMat : craneBlueMat;

      // 4 Portal Legs
      [-4, 4].forEach((xLeg) => {
        [-5, 5].forEach((zLeg) => {
          const legGeo = new THREE.BoxGeometry(1.0, 22, 1.0);
          const leg = new THREE.Mesh(legGeo, mat);
          leg.position.set(xLeg, 11, zLeg);
          leg.castShadow = true;
          craneGroup.add(leg);
        });
      });

      // Upper Machinery Deck
      const deckGeo = new THREE.BoxGeometry(12, 3.5, 14);
      const deck = new THREE.Mesh(deckGeo, mat);
      deck.position.set(0, 23.5, 0);
      deck.castShadow = true;
      craneGroup.add(deck);

      // Boom Arm extending over the ship & water (length: 38)
      const boomGeo = new THREE.BoxGeometry(38, 2.2, 2.4);
      const boom = new THREE.Mesh(boomGeo, mat);
      boom.position.set(16, 26, 0);
      boom.castShadow = true;
      craneGroup.add(boom);

      // Backstay Tower / Apex
      const apexGeo = new THREE.ConeGeometry(5, 12, 4);
      apexGeo.rotateY(Math.PI / 4);
      const apex = new THREE.Mesh(apexGeo, mat);
      apex.position.set(-2, 31, 0);
      craneGroup.add(apex);

      // Spreader cable & container lift
      const cableMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
      const cableGeo = new THREE.CylinderGeometry(0.08, 0.08, 14, 6);
      const cable = new THREE.Mesh(cableGeo, cableMat);
      cable.position.set(26, 18, 0);
      craneGroup.add(cable);

      // Lifted container
      const liftedContGeo = new THREE.BoxGeometry(2.4, 2.6, 6.0);
      const liftedCont = new THREE.Mesh(
        liftedContGeo,
        new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.3 })
      );
      liftedCont.position.set(26, 10.5, 0);
      liftedCont.castShadow = true;
      craneGroup.add(liftedCont);

      this.group.add(craneGroup);
    });
  }

  /**
   * 3. Container Yard with Stacks of ISO Shipping Containers
   */
  private buildContainerStacks(): void {
    const containerColors = [
      0x004d9c, // THACO Blue
      0x008080, // Evergreen Green
      0xb22222, // Maersk Red
      0xe67e22, // Hapag Orange
      0x8e44ad, // ONE Magenta
    ];

    const contGeo = new THREE.BoxGeometry(2.4, 2.6, 6.0);
    const yardGroup = new THREE.Group();
    yardGroup.position.set(-15, 1.8, 0);

    // Generate 4 rows of multi-tiered container stacks
    for (let row = 0; row < 4; row++) {
      const rx = -18 + row * 8;
      for (let bay = 0; bay < 8; bay++) {
        const rz = -45 + bay * 12;
        const tiers = 2 + Math.floor(Math.sin(row * 3 + bay) * 1.5 + 1); // 2 to 4 tiers

        for (let tier = 0; tier < tiers; tier++) {
          const colorIdx = (row * 3 + bay * 2 + tier) % containerColors.length;
          const contMat = new THREE.MeshStandardMaterial({
            color: containerColors[colorIdx],
            roughness: 0.5,
            metalness: 0.35,
          });

          const contMesh = new THREE.Mesh(contGeo, contMat);
          contMesh.position.set(rx, tier * 2.6 + 1.3, rz);
          contMesh.castShadow = true;
          yardGroup.add(contMesh);
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
    shipGroup.position.set(58, 0.25, 5);

    const hullMat = new THREE.MeshStandardMaterial({ color: 0x1f2429, roughness: 0.6, metalness: 0.4 });
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x9e2a2b, roughness: 0.6 });
    const superstructureMat = new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.3 });

    // Hull (length 95, beam 16, draft 7)
    const hullGeo = new THREE.BoxGeometry(15, 7, 92);
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.y = 2.5;
    hull.castShadow = true;
    shipGroup.add(hull);

    // Main Deck
    const deckGeo = new THREE.BoxGeometry(15.2, 0.4, 92.2);
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 6.2;
    shipGroup.add(deck);

    // Bulbous Bow taper
    const bowGeo = new THREE.ConeGeometry(7.5, 14, 4);
    bowGeo.rotateX(Math.PI / 2);
    const bow = new THREE.Mesh(bowGeo, hullMat);
    bow.position.set(0, 2.5, 53);
    shipGroup.add(bow);

    // Stern Bridge Superstructure (Navigation Deck)
    const bridgeGeo = new THREE.BoxGeometry(13, 10, 14);
    const bridge = new THREE.Mesh(bridgeGeo, superstructureMat);
    bridge.position.set(0, 11.2, -32);
    bridge.castShadow = true;
    shipGroup.add(bridge);

    // Funnel (Ống khói tàu)
    const funnelGeo = new THREE.CylinderGeometry(1.2, 1.4, 5, 8);
    const funnelMat = new THREE.MeshStandardMaterial({ color: 0x004d9c, roughness: 0.4 });
    const funnel = new THREE.Mesh(funnelGeo, funnelMat);
    funnel.position.set(0, 18.2, -32);
    shipGroup.add(funnel);

    // On-deck cargo container rows
    const shipContMat1 = new THREE.MeshStandardMaterial({ color: 0x004d9c, roughness: 0.4, metalness: 0.3 });
    const shipContMat2 = new THREE.MeshStandardMaterial({ color: 0xb22222, roughness: 0.4, metalness: 0.3 });
    const contGeo = new THREE.BoxGeometry(2.4, 2.6, 6.0);

    for (let cRow = -2; cRow <= 2; cRow++) {
      for (let cBay = -2; cBay <= 4; cBay++) {
        for (let cTier = 0; cTier < 3; cTier++) {
          const mat = (cRow + cBay) % 2 === 0 ? shipContMat1 : shipContMat2;
          const cMesh = new THREE.Mesh(contGeo, mat);
          cMesh.position.set(cRow * 2.6, 6.4 + cTier * 2.6 + 1.3, cBay * 7.5 + 5);
          cMesh.castShadow = true;
          shipGroup.add(cMesh);
        }
      }
    }

    this.group.add(shipGroup);
  }

  /**
   * 5. THACO Logistics Mega-Warehouse (Kho ngoại quan & trung tâm logistics)
   */
  private buildLogisticsWarehouse(): void {
    const warehouseGroup = new THREE.Group();
    warehouseGroup.position.set(-60, 1.8, 0);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xdde4ec, roughness: 0.7, metalness: 0.2 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x224870, roughness: 0.5, metalness: 0.3 });

    // Warehouse body (length 60, height 9, width 35)
    const bodyGeo = new THREE.BoxGeometry(35, 9, 70);
    const body = new THREE.Mesh(bodyGeo, wallMat);
    body.position.y = 4.5;
    body.castShadow = true;
    warehouseGroup.add(body);

    // Curved Barrel Roof
    const roofGeo = new THREE.CylinderGeometry(18, 18, 70.4, 16, 1, false, 0, Math.PI);
    roofGeo.rotateZ(Math.PI / 2);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 9;
    roof.castShadow = true;
    warehouseGroup.add(roof);

    // THACO Logistics Signboard
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 64;
    const sCtx = signCanvas.getContext('2d')!;
    sCtx.fillStyle = '#004d9c';
    sCtx.fillRect(0, 0, 256, 64);
    sCtx.font = 'bold 22px sans-serif';
    sCtx.fillStyle = '#ffffff';
    sCtx.textAlign = 'center';
    sCtx.fillText('THACO LOGISTICS', 128, 42);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 4),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.rotation.y = Math.PI / 2;
    signMesh.position.set(17.6, 6.5, 0);
    warehouseGroup.add(signMesh);

    this.group.add(warehouseGroup);
  }
}
