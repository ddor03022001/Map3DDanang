import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Thị trấn Núi Thành (Trung tâm Chính trị - Văn hóa - Kinh tế Huyện Núi Thành)
 * Modeled to high topographical and architectural fidelity (duancuulong.com style)
 * Features:
 * - Tượng đài Chiến thắng Núi Thành trên ngọn đồi di tích lịch sử quốc gia
 * - Sông An Tân hiền hòa chảy qua trung tâm với Cầu An Tân QL1A & Cầu đường sắt giàn thép
 * - Khu Trung tâm Hành chính Huyện ủy & UBND Huyện Núi Thành, Quảng trường hoa
 * - Ga Núi Thành (Nhà ga đường sắt quốc gia với ke ga & biển hiệu)
 * - Chợ Thị Trấn Núi Thành sầm uất & Dãy nhà phố thương mại dọc các trục đường
 * - Bờ kè sông An Tân với bến thuyền dân sinh mộc mạc
 */
export class NuiThanhTown extends BaseWard {
  constructor() {
    super(
      {
        id: 'nui-thanh-town',
        name: 'Thị trấn Núi Thành',
        nameEn: 'Nui Thanh Town',
        type: 'town',
        areaKm2: 4.5,
        description:
          'Đô thị trung tâm huyện Núi Thành bên bờ sông An Tân. Nổi danh với Tượng đài Chiến thắng Núi Thành lịch sử, ga xe lửa, cầu An Tân và các khu thương mại sầm uất.',
        cameraPreset: {
          position: [180, 62, 765],
          target: [220, 4, 820],
        },
        subLandmarks: [
          {
            id: 'nui-thanh-overview',
            name: '👁️ Toàn Cảnh Thị Trấn',
            category: 'cultural',
            cameraPreset: { position: [160, 65, 760], target: [220, 4, 820] },
            description: 'Toàn cảnh trung tâm Thị trấn Núi Thành, sông An Tân và đồi Tượng Đài Chiến Thắng.',
          },
          {
            id: 'nui-thanh-monument',
            name: '⭐ Tượng Đài Chiến Thắng Núi Thành',
            category: 'cultural',
            cameraPreset: { position: [240, 32, 790], target: [265, 14, 805] },
            description: 'Di tích lịch sử cấp quốc gia trên đồi cát Núi Thành ghi dấu chiến thắng vang dội ngày 26/5/1965.',
          },
          {
            id: 'an-tan-bridge',
            name: '🌉 Cầu & Sông An Tân',
            category: 'bridge',
            cameraPreset: { position: [175, 24, 805], target: [205, 3, 825] },
            description: 'Dòng sông An Tân chảy qua trung tâm thị trấn cùng cặp cầu đường bộ QL1A và cầu đường sắt giàn thép.',
          },
          {
            id: 'nui-thanh-station',
            name: '🚉 Ga Núi Thành',
            category: 'transport',
            cameraPreset: { position: [170, 20, 835], target: [195, 3, 845] },
            description: 'Ga đường sắt Bắc Nam phục vụ vận chuyển hành khách và hàng hóa trung tâm huyện.',
          },
          {
            id: 'nui-thanh-admin',
            name: '🏛️ UBND Huyện & Quảng Trường',
            category: 'cultural',
            cameraPreset: { position: [190, 28, 790], target: [220, 4, 815] },
            description: 'Trung tâm hành chính huyện ủy, UBND huyện Núi Thành và quảng trường cờ hoa rực rỡ.',
          },
        ],
      },
      {
        minX: 140,
        maxX: 290,
        minZ: 760,
        maxZ: 870,
      }
    );

    this.buildVictoryMonumentHill();
    this.buildAnTanRiverAndBridges();
    this.buildDistrictAdministrativeCenter();
    this.buildNuiThanhRailwayStation();
    this.buildTownCommercialShopsAndMarket();
    this.buildRiverQuayAndBoats();
  }

  /**
   * 1. Tượng Đài Chiến Thắng Núi Thành trên ngọn đồi di tích (Historical Monument Hill)
   */
  private buildVictoryMonumentHill(): void {
    const hillGroup = new THREE.Group();
    hillGroup.position.set(265, 0, 805);

    const earthMat = new THREE.MeshStandardMaterial({ color: 0x6e523b, roughness: 0.9 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x3d7033, roughness: 0.85 });
    const graniteMat = new THREE.MeshStandardMaterial({ color: 0x9fa4a8, roughness: 0.6, metalness: 0.2 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.8, roughness: 0.2 });

    // Historical Hill Mound (Đồi cát Núi Thành cao 14m)
    const hillGeo = new THREE.ConeGeometry(38, 14, 20);
    const hill = new THREE.Mesh(hillGeo, grassMat);
    hill.position.y = 7.0;
    hill.castShadow = true;
    hill.receiveShadow = true;
    hillGroup.add(hill);

    // Stone Steps (Bậc tam cấp dẫn lên đỉnh đồi)
    const stepsGeo = new THREE.BoxGeometry(6.0, 14, 32);
    stepsGeo.rotateX(-0.35);
    const steps = new THREE.Mesh(stepsGeo, graniteMat);
    steps.position.set(0, 6.0, -18);
    hillGroup.add(steps);

    // Monument Base Plaza (Sân đài tưởng niệm trên đỉnh)
    const plazaGeo = new THREE.CylinderGeometry(14, 14, 1.2, 24);
    const plaza = new THREE.Mesh(plazaGeo, graniteMat);
    plaza.position.y = 14.6;
    hillGroup.add(plaza);

    // Main Monument Stele (Tượng đài Chiến thắng Núi Thành cao 12m)
    const steleGeo = new THREE.BoxGeometry(3.2, 12, 1.6);
    const stele = new THREE.Mesh(steleGeo, graniteMat);
    stele.position.y = 14.6 + 6.0;
    stele.castShadow = true;
    hillGroup.add(stele);

    // Winged Pylons framing the monument (Cánh cung biểu tượng chiến thắng)
    [-3.2, 3.2].forEach((wx) => {
      const wingGeo = new THREE.BoxGeometry(1.4, 9.5, 1.2);
      wingGeo.rotateZ(wx > 0 ? -0.2 : 0.2);
      const wing = new THREE.Mesh(wingGeo, graniteMat);
      wing.position.set(wx, 14.6 + 5.0, 0);
      hillGroup.add(wing);
    });

    // Golden Vietnam Star on top of monument
    const starGeo = new THREE.CircleGeometry(1.2, 5);
    const star = new THREE.Mesh(starGeo, goldMat);
    star.position.set(0, 14.6 + 11.2, 0.85);
    hillGroup.add(star);

    // Flagpole with National Flag
    const poleGeo = new THREE.CylinderGeometry(0.1, 0.12, 10, 8);
    const pole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: 0xffffff }));
    pole.position.set(0, 14.6 + 5.0, 8.0);
    hillGroup.add(pole);

    const flagGeo = new THREE.PlaneGeometry(2.4, 1.6);
    const flagMat = new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(1.2, 14.6 + 9.0, 8.0);
    hillGroup.add(flag);

    this.group.add(hillGroup);
  }

  /**
   * 2. Sông An Tân & Cặp cầu An Tân QL1A + Cầu đường sắt (An Tan River & Dual Bridges)
   */
  private buildAnTanRiverAndBridges(): void {
    const riverGroup = new THREE.Group();

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1d637a, // An Tan River specular blue
      roughness: 0.15,
      metalness: 0.8,
    });
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x4a525d, roughness: 0.75 });
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x2b3847, metalness: 0.8, roughness: 0.3 });
    const pierMat = new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.8 });

    // Sông An Tân water plane cutting through town (X: 150 to 280, Z: 825)
    // Sông An Tân water plane cutting through town (X: 140 to 300, Z: 825)
    const riverGeo = new THREE.PlaneGeometry(160, 28);
    riverGeo.rotateX(-Math.PI / 2);
    const river = new THREE.Mesh(riverGeo, waterMat);
    river.position.set(220, 0.25, 825);
    river.receiveShadow = true;
    riverGroup.add(river);

    // A. Highway 1A Road Bridge (Cầu đường bộ An Tân) centered precisely on QL1A at X: 220
    const roadBridgeGeo = new THREE.BoxGeometry(9.2, 0.6, 32);
    const roadBridge = new THREE.Mesh(roadBridgeGeo, bridgeMat);
    roadBridge.position.set(220, 0.58, 825);
    roadBridge.castShadow = true;
    riverGroup.add(roadBridge);

    // Bridge concrete piers
    [-10, 0, 10].forEach((pz) => {
      const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 1.8, 8), pierMat);
      pier.position.set(220, 0.3, 825 + pz);
      riverGroup.add(pier);
    });

    // White bridge guardrails
    [-4.5, 4.5].forEach((rx) => {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.8, 32),
        new THREE.MeshStandardMaterial({ color: 0xf5f7fa })
      );
      rail.position.set(220 + rx, 1.05, 825);
      riverGroup.add(rail);
    });

    // B. Railway Steel Truss Bridge (Cầu đường sắt An Tân giàn thép) centered precisely on Railway at X: 208
    const railBridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.6, 32), bridgeMat);
    railBridgeDeck.position.set(208, 0.62, 825);
    riverGroup.add(railBridgeDeck);

    // Triangular steel through-truss sides (Giàn thép cầu đường sắt)
    [-1.9, 1.9].forEach((tx) => {
      const trussSpan = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 32), trussMat);
      trussSpan.position.set(208 + tx, 2.5, 825);
      riverGroup.add(trussSpan);
    });

    // Steel overhead bracing crossbars
    [-10, 0, 10].forEach((bz) => {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.25, 0.3), trussMat);
      brace.position.set(208, 4.4, 825 + bz);
      riverGroup.add(brace);
    });

    this.group.add(riverGroup);
  }

  /**
   * 3. Trụ Sở Huyện Ủy & UBND Huyện Núi Thành & Quảng Trường
   */
  private buildDistrictAdministrativeCenter(): void {
    const adminGroup = new THREE.Group();
    adminGroup.position.set(230, 0, 795);

    const ochreWallMat = new THREE.MeshStandardMaterial({ color: 0xedd69a, roughness: 0.65 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa83226, roughness: 0.5 });
    const plazaMat = new THREE.MeshStandardMaterial({ color: 0xa8b0a5, roughness: 0.85 });

    // Plaza square
    const plaza = new THREE.Mesh(new THREE.PlaneGeometry(42, 34), plazaMat);
    plaza.rotateX(-Math.PI / 2);
    plaza.position.set(0, 0.42, 12);
    plaza.receiveShadow = true;
    adminGroup.add(plaza);

    // Main 3-floor Administrative Hall (UBND Huyện)
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(32, 9.5, 16), ochreWallMat);
    mainBuilding.position.y = 0.42 + 4.75;
    mainBuilding.castShadow = true;
    adminGroup.add(mainBuilding);

    // Classical pitched hip roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(25, 3.5, 4), roofMat);
    roof.rotateY(Math.PI / 4);
    roof.position.set(0, 0.42 + 9.5 + 1.75, 0);
    roof.scale.set(1.25, 1, 0.75);
    roof.castShadow = true;
    adminGroup.add(roof);

    // Portico & Roman columns on facade
    [-5, 5].forEach((cx) => {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.45, 6.5, 10),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      col.position.set(cx, 0.42 + 3.25, 8.8);
      adminGroup.add(col);
    });

    // Signboard: UBND HUYỆN NÚI THÀNH
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 384;
    signCanvas.height = 80;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#b5251d';
    ctx.fillRect(0, 0, 384, 80);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 372, 68);
    ctx.fillStyle = '#ffea00';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UBND HUYỆN NÚI THÀNH', 192, 50);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 2.2),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 0.42 + 6.2, 8.9);
    adminGroup.add(signMesh);

    // Flagpole in plaza
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 14, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    pole.position.set(0, 0.42 + 7.0, 18);
    adminGroup.add(pole);

    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 1.6),
      new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide })
    );
    flag.position.set(1.2, 0.42 + 13.0, 18);
    adminGroup.add(flag);

    this.group.add(adminGroup);
  }

  /**
   * 4. Ga Núi Thành (Nui Thanh Railway Station)
   */
  private buildNuiThanhRailwayStation(): void {
    const stationGroup = new THREE.Group();
    // Positioned immediately adjacent to the railway corridor at X = 208
    stationGroup.position.set(194, 0, 845);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xedd382, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa62b1e, roughness: 0.5 });
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x737d87, roughness: 0.85 });

    // Station building (Nhà ga chính) at X: 194
    const stationMesh = new THREE.Mesh(new THREE.BoxGeometry(18, 6.2, 12), wallMat);
    stationMesh.position.y = 0.42 + 3.1;
    stationMesh.castShadow = true;
    stationGroup.add(stationMesh);

    // Station hipped roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(19.5, 1.4, 13.5), roofMat);
    roof.position.y = 0.42 + 6.2 + 0.7;
    stationGroup.add(roof);

    // Name sign: GA NÚI THÀNH (facing street)
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 64;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#004d9c';
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GA NÚI THÀNH', 128, 44);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 1.8), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 0.42 + 4.8, 6.15);
    stationGroup.add(sign);

    // Passenger platform (Ke ga hành khách) directly flanking rail tracks at X = 208
    // Relative to stationGroup (194): platform X = 11.5 -> world X = 205.5 (flanking track at 208)
    const platform = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 42), platformMat);
    platform.position.set(11.5, 0.42 + 0.18, 0);
    platform.receiveShadow = true;
    stationGroup.add(platform);

    // Platform canopy shelter
    const canopyRoof = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x3d4a59, metalness: 0.5, roughness: 0.4 })
    );
    canopyRoof.position.set(11.5, 0.42 + 3.6, 0);
    stationGroup.add(canopyRoof);

    // Canopy support columns
    [-12, 0, 12].forEach((cz) => {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 3.6, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      col.position.set(11.5, 0.42 + 1.8, cz);
      stationGroup.add(col);
    });

    this.group.add(stationGroup);
  }

  /**
   * 5. Chợ Thị Trấn Núi Thành & Dãy Nhà Phố Thương Mại (Commercial Core)
   */
  private buildTownCommercialShopsAndMarket(): void {
    const commGroup = new THREE.Group();

    const houseMat1 = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.6 });
    const houseMat2 = new THREE.MeshStandardMaterial({ color: 0xe8dcbe, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb53528, roughness: 0.4 });
    const blueRoofMat = new THREE.MeshStandardMaterial({ color: 0x1f4e78, roughness: 0.4 });

    // A. Chợ Núi Thành (Central Market) at X: 228, Z: 840
    const marketGroup = new THREE.Group();
    marketGroup.position.set(228, 0, 842);

    const marketHall = new THREE.Mesh(
      new THREE.BoxGeometry(26, 5.0, 18),
      new THREE.MeshStandardMaterial({ color: 0xdde3e8, roughness: 0.7 })
    );
    marketHall.position.y = 0.42 + 2.5;
    marketHall.castShadow = true;
    marketGroup.add(marketHall);

    const marketRoof = new THREE.Mesh(new THREE.ConeGeometry(20, 2.5, 4), blueRoofMat);
    marketRoof.rotateY(Math.PI / 4);
    marketRoof.position.y = 0.42 + 5.0 + 1.25;
    marketRoof.scale.set(1.1, 1, 0.75);
    marketGroup.add(marketRoof);

    commGroup.add(marketGroup);

    // B. 24 Townhouses along Highway 1A and riverside boulevard
    const shopPositions = [
      // Street north of river
      { x: 205, z: 800, h: 8.5, w: 6.5, l: 11 },
      { x: 195, z: 800, h: 9.5, w: 6.5, l: 11 },
      { x: 185, z: 800, h: 8.0, w: 6.5, l: 11 },
      { x: 175, z: 800, h: 10.5, w: 7.0, l: 12 },
      { x: 235, z: 775, h: 8.5, w: 6.5, l: 11 },
      { x: 245, z: 775, h: 9.0, w: 6.5, l: 11 },

      // Street south of river
      { x: 205, z: 855, h: 8.5, w: 6.5, l: 11 },
      { x: 195, z: 855, h: 10.5, w: 6.5, l: 11 },
      { x: 185, z: 855, h: 7.8, w: 6.5, l: 11 },
      { x: 215, z: 855, h: 9.2, w: 6.5, l: 11 },
      { x: 235, z: 860, h: 8.5, w: 6.5, l: 11 },
      { x: 245, z: 860, h: 10.2, w: 7.0, l: 12 },
      { x: 255, z: 860, h: 8.0, w: 6.5, l: 11 },
      { x: 265, z: 860, h: 9.5, w: 6.5, l: 11 },
    ];

    shopPositions.forEach((sp, idx) => {
      const house = new THREE.Group();
      house.position.set(sp.x, 0.42, sp.z);

      const mat = idx % 2 === 0 ? houseMat1 : houseMat2;
      const body = new THREE.Mesh(new THREE.BoxGeometry(sp.w, sp.h, sp.l), mat);
      body.position.y = sp.h / 2;
      body.castShadow = true;
      house.add(body);

      const rMat = idx % 3 === 0 ? blueRoofMat : roofMat;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(sp.w * 0.8, 2.2, 4), rMat);
      roof.rotateY(Math.PI / 4);
      roof.position.y = sp.h + 1.1;
      roof.scale.set(1.2, 1, sp.l / sp.w);
      roof.castShadow = true;
      house.add(roof);

      commGroup.add(house);
    });

    this.group.add(commGroup);
  }

  /**
   * 6. Bến Kè Sông An Tân & Thuyền Bè Dân Sinh
   */
  private buildRiverQuayAndBoats(): void {
    const quayGroup = new THREE.Group();
    quayGroup.position.set(235, 0.42, 825);

    const quayMat = new THREE.MeshStandardMaterial({ color: 0x8a9096, roughness: 0.85 });
    const boatMat = new THREE.MeshStandardMaterial({ color: 0x2b4c6f, roughness: 0.6 });

    // Stone embankment retaining wall (Kè đá bờ sông)
    [-12, 12].forEach((qz) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(60, 0.8, 1.2), quayMat);
      wall.position.set(0, 0.2, qz);
      quayGroup.add(wall);
    });

    // Small river sampans moored at quay
    [-15, 0, 15].forEach((bx) => {
      const sampan = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 6.5), boatMat);
      sampan.position.set(bx, -0.15, 6.0);
      quayGroup.add(sampan);
    });

    this.group.add(quayGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
