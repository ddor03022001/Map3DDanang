import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Thị trấn Núi Thành (Huyện lỵ - Trung tâm chính trị, văn hóa, kinh tế Huyện Núi Thành)
 * Các công trình trọng điểm:
 * - Quảng trường Núi Thành (Quảng trường 24-3): Kỳ đài cờ Tổ quốc 16m, Đài phun nước nghệ thuật, Sân khấu sự kiện
 * - Khu trung tâm hành chính: Trụ sở Huyện Ủy & UBND Huyện Núi Thành
 * - Sông An Tân & Cặp cầu An Tân (Cầu đường bộ QL1A và Cầu giàn thép đường sắt)
 * - Tượng đài Chiến thắng Núi Thành lịch sử
 * - Ga Núi Thành trên tuyến đường sắt Bắc - Nam
 * - Tuyến phố thương mại Nguyễn Huệ - Phan Chu Trinh & Chợ Trung tâm Núi Thành
 * - Bến kè thuyền sông An Tân ra Vịnh An Hòa
 */
export class NuiThanhTown extends BaseWard {
  constructor() {
    super(
      {
        id: 'nui-thanh-town',
        name: 'Thị trấn Núi Thành',
        nameEn: 'Nui Thanh District Town',
        type: 'town',
        areaKm2: 4.6,
        description:
          'Đô thị trung tâm hành chính, thương mại và dịch vụ của huyện Núi Thành. Nổi bật với Quảng trường trung tâm 24-3, trụ sở Huyện Ủy - UBND Huyện, ngã tư sầm uất ven dòng sông An Tân và Tượng đài Chiến thắng Núi Thành lịch sử.',
        cameraPreset: {
          position: [205, 55, 865],
          target: [210, 4, 795],
        },
        subLandmarks: [
          {
            id: 'nui-thanh-overview',
            name: '👁️ Toàn Cảnh TT. Núi Thành',
            category: 'cultural',
            cameraPreset: { position: [215, 75, 895], target: [225, 3, 825] },
            description: 'Toàn cảnh trung tâm thị trấn Núi Thành, dòng sông An Tân và các trục phố thương mại sầm uất.',
          },
          {
            id: 'quang-truong-nui-thanh',
            name: '🏛️ Quảng Trường Núi Thành (24-3)',
            category: 'cultural',
            cameraPreset: { position: [205, 32, 845], target: [205, 4, 790] },
            description: 'Quảng trường trung tâm huyện Núi Thành với Kỳ đài cờ Tổ quốc 16m, đài phun nước nghệ thuật, vườn hoa và sân khấu lễ hội ngoài trời.',
          },
          {
            id: 'ubnd-nui-thanh',
            name: '🏛️ UBND Huyện Núi Thành',
            category: 'building',
            cameraPreset: { position: [235, 26, 855], target: [238, 4, 788] },
            description: 'Trụ sở Huyện Ủy - HĐND - UBND Huyện Núi Thành và Trung tâm Hành chính công huyện.',
          },
          {
            id: 'tuong-dai-nui-thanh',
            name: '⭐ Tượng Đài Chiến Thắng Núi Thành',
            category: 'cultural',
            cameraPreset: { position: [248, 28, 865], target: [265, 8, 805] },
            description: 'Di tích lịch sử cấp Quốc gia ghi dấu trận đầu đánh Mỹ vang dội ngày 26/5/1965.',
          },
          {
            id: 'an-tan-bridges',
            name: '🌉 Cặp Cầu Sông An Tân',
            category: 'bridge',
            cameraPreset: { position: [195, 28, 895], target: [215, 2, 825] },
            description: 'Cặp cầu huyết mạch gồm Cầu đường bộ An Tân trên QL1A và Cầu giàn thép đường sắt Bắc - Nam.',
          },
          {
            id: 'ga-nui-thanh',
            name: '🚉 Ga Đường Sắt Núi Thành',
            category: 'transport',
            cameraPreset: { position: [180, 22, 915], target: [198, 2, 845] },
            description: 'Ga hành khách và bốc xếp hàng hóa đường sắt quốc gia phục vụ Khu kinh tế Chu Lai.',
          },
          {
            id: 'cho-nui-thanh',
            name: '🏪 Chợ Trung Tâm Núi Thành',
            category: 'commercial',
            cameraPreset: { position: [218, 25, 912], target: [230, 3, 842] },
            description: 'Chợ đầu mối sầm uất bên bờ sông An Tân, trao đổi nông - thủy sản toàn huyện.',
          },
        ],
      },
      {
        minX: 160,
        maxX: 290,
        minZ: 770,
        maxZ: 870,
      }
    );

    this.buildNuiThanhTownSquare();
    this.buildDistrictAdministrativeCenter();
    this.buildVictoryMonumentHill();
    this.buildAnTanRiverAndBridges();
    this.buildNuiThanhRailwayStation();
    this.buildTownCommercialShopsAndMarket();
    this.buildRiverQuayAndBoats();
  }

  /**
   * 1. Quảng Trường Núi Thành (Quảng trường 24-3 / Trung tâm Văn hóa - Lễ hội Huyện)
   * Bao gồm:
   * - Mặt sân quảng trường lát đá hoa cương đa sắc (65m x 48m)
   * - Kỳ đài Cờ Tổ Quốc 16m vươn cao trên bục đá tam cấp
   * - Đài phun nước nghệ thuật trung tâm với các vòi phun đa tầng
   * - Sân khấu lễ hội ngoài trời với màn hình LED khổ lớn
   * - Hệ thống bồn hoa, hàng cau vua, ghế đá công viên và cột đèn chiếu sáng kèm cờ phướn
   */
  private buildNuiThanhTownSquare(): void {
    const plazaGroup = new THREE.Group();
    plazaGroup.position.set(205, 0.45, 790);

    const darkGraniteMat = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.65 });
    const beigeGraniteMat = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.7 });
    const terracottaMat = new THREE.MeshStandardMaterial({ color: 0xbf360c, roughness: 0.8 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffb300, metalness: 0.85, roughness: 0.25 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x00acc1, roughness: 0.15, metalness: 0.8 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.9 });
    const flowerRedMat = new THREE.MeshStandardMaterial({ color: 0xd32f2f, roughness: 0.8 });
    const flowerYellowMat = new THREE.MeshStandardMaterial({ color: 0xfbc02d, roughness: 0.8 });
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x263238, metalness: 0.9, roughness: 0.2 });

    // A. Main Paved Plaza (65m x 48m) with perimeter granite curb
    const plazaBase = new THREE.Mesh(new THREE.BoxGeometry(65, 0.2, 48), beigeGraniteMat);
    plazaBase.position.y = 0.1;
    plazaBase.receiveShadow = true;
    plazaGroup.add(plazaBase);

    // Decorative perimeter dark granite border
    const borderNorth = new THREE.Mesh(new THREE.BoxGeometry(65, 0.22, 2.5), darkGraniteMat);
    borderNorth.position.set(0, 0.11, -22.75);
    plazaGroup.add(borderNorth);

    const borderSouth = new THREE.Mesh(new THREE.BoxGeometry(65, 0.22, 2.5), darkGraniteMat);
    borderSouth.position.set(0, 0.11, 22.75);
    plazaGroup.add(borderSouth);

    const borderWest = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.22, 48), darkGraniteMat);
    borderWest.position.set(-31.25, 0.11, 0);
    plazaGroup.add(borderWest);

    const borderEast = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.22, 48), darkGraniteMat);
    borderEast.position.set(31.25, 0.11, 0);
    plazaGroup.add(borderEast);

    // Center star mosaic emblem on plaza pavement
    const starCenter = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.5, 0.24, 16), terracottaMat);
    starCenter.position.set(0, 0.12, 0);
    plazaGroup.add(starCenter);

    // B. Kỳ Đài Cờ Tổ Quốc Trung Tâm (Monumental Flagpole - Height: 16m)
    const flagpoleGroup = new THREE.Group();
    flagpoleGroup.position.set(0, 0.2, -6.0);

    // 3-tiered circular granite base
    const base1 = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.5, 0.6, 24), darkGraniteMat);
    base1.position.y = 0.3;
    base1.castShadow = true;
    flagpoleGroup.add(base1);

    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.0, 0.5, 24), beigeGraniteMat);
    base2.position.y = 0.85;
    flagpoleGroup.add(base2);

    const base3 = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.5, 24), darkGraniteMat);
    base3.position.y = 1.35;
    flagpoleGroup.add(base3);

    // Stainless steel 16m flagpole with gold finial sphere
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, 16.0, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.15 })
    );
    pole.position.y = 1.6 + 8.0;
    pole.castShadow = true;
    flagpoleGroup.add(pole);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), goldMat);
    finial.position.y = 1.6 + 16.0;
    flagpoleGroup.add(finial);

    // Large Red Flag with Yellow Star
    const flagMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 2.4),
      new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide })
    );
    flagMesh.position.set(1.8, 1.6 + 14.5, 0);
    flagpoleGroup.add(flagMesh);

    // Gold Star in center of flag
    const starMesh = new THREE.Mesh(new THREE.CircleGeometry(0.65, 5), goldMat);
    starMesh.position.set(1.8, 1.6 + 14.5, 0.02);
    flagpoleGroup.add(starMesh);

    plazaGroup.add(flagpoleGroup);

    // C. Đài Phun Nước Nghệ Thuật (Central Artistic Water Fountain)
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(0, 0.2, 11.0);

    // Circular granite basin coping (Diameter 11m, height 1.1m)
    const basinOuter = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.8, 1.1, 32), darkGraniteMat);
    basinOuter.position.y = 0.55;
    basinOuter.castShadow = true;
    fountainGroup.add(basinOuter);

    // Pool water plane
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.0, 0.8, 32), waterMat);
    pool.position.y = 0.65;
    fountainGroup.add(pool);

    // Center fountain tier
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.2, 1.4, 20), beigeGraniteMat);
    tier2.position.y = 1.25;
    tier2.castShadow = true;
    fountainGroup.add(tier2);

    const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 1.0, 16), darkGraniteMat);
    tier3.position.y = 2.2;
    fountainGroup.add(tier3);

    // Vertical water column spray
    const waterSpout = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.4, 4.0, 12),
      new THREE.MeshStandardMaterial({ color: 0xe0f7fa, roughness: 0.1, transparent: true, opacity: 0.85 })
    );
    waterSpout.position.y = 4.2;
    fountainGroup.add(waterSpout);

    // 8 perimeter arching water spray arcs
    for (let a = 0; a < 8; a++) {
      const angle = (a / 8) * Math.PI * 2;
      const jet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 2.4, 6),
        new THREE.MeshStandardMaterial({ color: 0xb2ebf2, transparent: true, opacity: 0.75 })
      );
      jet.position.set(Math.cos(angle) * 3.2, 1.8, Math.sin(angle) * 3.2);
      jet.rotation.x = Math.sin(angle) * 0.4;
      jet.rotation.z = -Math.cos(angle) * 0.4;
      fountainGroup.add(jet);
    }

    plazaGroup.add(fountainGroup);

    // D. Sân Khấu Sự Kiện Ngoài Trời & Màn Hình LED (Civic Event Stage & Backdrop)
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0, 0.2, -19.5);

    // Raised stage platform (24m x 7m x 1.2m)
    const stage = new THREE.Mesh(new THREE.BoxGeometry(24, 1.2, 7.0), darkGraniteMat);
    stage.position.y = 0.6;
    stage.castShadow = true;
    stageGroup.add(stage);

    // Front steps
    const stageSteps = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 1.8), beigeGraniteMat);
    stageSteps.position.set(0, 0.3, 4.0);
    stageGroup.add(stageSteps);

    // Architectural backdrop curved acoustic wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(22, 6.5, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.5 })
    );
    backWall.position.set(0, 4.2, -3.2);
    backWall.castShadow = true;
    stageGroup.add(backWall);

    // LED display media screen on backdrop wall
    const ledScreenGeo = new THREE.PlaneGeometry(12.0, 4.2);
    const ledCanvas = document.createElement('canvas');
    ledCanvas.width = 512;
    ledCanvas.height = 180;
    const lCtx = ledCanvas.getContext('2d')!;
    lCtx.fillStyle = '#b71c1c';
    lCtx.fillRect(0, 0, 512, 180);
    lCtx.strokeStyle = '#ffd700';
    lCtx.lineWidth = 6;
    lCtx.strokeRect(8, 8, 496, 164);
    lCtx.fillStyle = '#ffeb3b';
    lCtx.font = 'bold 30px sans-serif';
    lCtx.textAlign = 'center';
    lCtx.fillText('QUẢNG TRƯỜNG NÚI THÀNH', 256, 60);
    lCtx.font = 'bold 22px sans-serif';
    lCtx.fillStyle = '#ffffff';
    lCtx.fillText('ĐOÀN KẾT - ĐỔI MỚI - PHÁT TRIỂN', 256, 105);
    lCtx.font = '18px sans-serif';
    lCtx.fillStyle = '#ffecb3';
    lCtx.fillText('CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI HUYỆN NÚI THÀNH', 256, 145);

    const ledTex = new THREE.CanvasTexture(ledCanvas);
    const ledScreen = new THREE.Mesh(ledScreenGeo, new THREE.MeshBasicMaterial({ map: ledTex }));
    ledScreen.position.set(0, 4.4, -2.75);
    stageGroup.add(ledScreen);

    plazaGroup.add(stageGroup);

    // E. 4 Symmetrical Landscaped Flower Parterres (Bồn Hoa & Cây Cảnh)
    const parterreCoords = [
      { x: -19, z: -8 },
      { x: 19, z: -8 },
      { x: -19, z: 11 },
      { x: 19, z: 11 },
    ];

    parterreCoords.forEach((pc) => {
      const parterre = new THREE.Group();
      parterre.position.set(pc.x, 0.2, pc.z);

      // Granite curb box (11m x 7m x 0.45m)
      const curb = new THREE.Mesh(new THREE.BoxGeometry(11, 0.45, 7.0), darkGraniteMat);
      curb.position.y = 0.225;
      curb.castShadow = true;
      parterre.add(curb);

      // Lawn surface
      const lawn = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.1, 6.2), grassMat);
      lawn.position.y = 0.45;
      parterre.add(lawn);

      // Flowering bushes in flowerbed
      [-3.0, 0, 3.0].forEach((fx, fi) => {
        [-1.6, 1.6].forEach((fz, fj) => {
          const mat = (fi + fj) % 2 === 0 ? flowerRedMat : flowerYellowMat;
          const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 1), mat);
          bush.position.set(fx, 0.8, fz);
          bush.castShadow = true;
          parterre.add(bush);
        });
      });

      // Royal Palm tree (Cây cau vua) in each flowerbed center
      const palmTrunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.28, 6.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.8 })
      );
      palmTrunk.position.set(0, 3.5, 0);
      palmTrunk.castShadow = true;
      parterre.add(palmTrunk);

      // Palm fronds canopy
      const fronds = new THREE.Mesh(
        new THREE.ConeGeometry(2.4, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.6 })
      );
      fronds.position.set(0, 7.2, 0);
      fronds.castShadow = true;
      parterre.add(fronds);

      plazaGroup.add(parterre);
    });

    // F. Plaza Victorian-Modern Street Lamp Posts with Festive Banners
    const lampCoords = [
      { x: -28, z: -18 },
      { x: -28, z: 0 },
      { x: -28, z: 18 },
      { x: 28, z: -18 },
      { x: 28, z: 0 },
      { x: 28, z: 18 },
    ];

    lampCoords.forEach((lc) => {
      const lamp = new THREE.Group();
      lamp.position.set(lc.x, 0.2, lc.z);

      // Pole (height 6.5m)
      const lPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 6.5, 8), lampMat);
      lPole.position.y = 3.25;
      lPole.castShadow = true;
      lamp.add(lPole);

      // Dual lamp lantern heads
      [-0.6, 0.6].forEach((lx) => {
        const lantern = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.5, 0.4),
          new THREE.MeshStandardMaterial({ color: 0xfffae6, roughness: 0.1, metalness: 0.8 })
        );
        lantern.position.set(lx, 6.2, 0);
        lamp.add(lantern);
      });

      // Red civic banner hanging on pole
      const banner = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 2.2),
        new THREE.MeshBasicMaterial({ color: 0xc62828, side: THREE.DoubleSide })
      );
      banner.position.set(0.4, 4.4, 0);
      lamp.add(banner);

      plazaGroup.add(lamp);
    });

    // G. Granite Park Benches for visitors along the sides
    [-24, 24].forEach((bx) => {
      [-10, 8].forEach((bz) => {
        const bench = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 0.7), beigeGraniteMat);
        bench.position.set(bx, 0.47, bz);
        bench.castShadow = true;
        plazaGroup.add(bench);
      });
    });

    this.group.add(plazaGroup);
  }

  /**
   * 2. Trụ Sở Huyện Ủy - HĐND - UBND Huyện Núi Thành (Khu Trung Tâm Hành Chính)
   */
  private buildDistrictAdministrativeCenter(): void {
    const adminGroup = new THREE.Group();
    adminGroup.position.set(242, 0.45, 788);

    const ochreWallMat = new THREE.MeshStandardMaterial({ color: 0xf5ecc6, roughness: 0.65 });
    const whiteColonnadeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa62b1e, roughness: 0.5 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x4fc3f7, roughness: 0.1, metalness: 0.85 });

    // Main 4-story Administrative Headquarters Hall (UBND Huyện)
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(32, 10.5, 16), ochreWallMat);
    mainBuilding.position.y = 5.25;
    mainBuilding.castShadow = true;
    adminGroup.add(mainBuilding);

    // Front Grand Entrance Colonnade Portico
    const portico = new THREE.Mesh(new THREE.BoxGeometry(14, 9.5, 3.5), whiteColonnadeMat);
    portico.position.set(0, 4.75, 9.0);
    portico.castShadow = true;
    adminGroup.add(portico);

    // Neoclassical triangular pediment atop portico
    const pedimentGeo = new THREE.ConeGeometry(8.5, 2.8, 3);
    pedimentGeo.rotateY(Math.PI / 2);
    pedimentGeo.scale(1.0, 1.0, 0.3);
    const pediment = new THREE.Mesh(pedimentGeo, whiteColonnadeMat);
    pediment.position.set(0, 10.8, 9.2);
    adminGroup.add(pediment);

    // National Emblem on Pediment (Quốc Huy)
    const emblem = new THREE.Mesh(
      new THREE.CircleGeometry(1.0, 16),
      new THREE.MeshStandardMaterial({ color: 0xffb300, metalness: 0.8, roughness: 0.2 })
    );
    emblem.position.set(0, 10.6, 9.8);
    adminGroup.add(emblem);

    // Rows of Modern Glass Windows on Facade
    [-11, -6, 6, 11].forEach((wx) => {
      [3.0, 6.2, 9.0].forEach((wy) => {
        const windowPane = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.2), glassMat);
        windowPane.position.set(wx, wy, 8.1);
        adminGroup.add(windowPane);
      });
    });

    // Classical Hipped Tile Roof (Mái ngói truyền thống)
    const roofGeo = new THREE.BoxGeometry(34, 1.8, 18);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 11.4;
    roof.castShadow = true;
    adminGroup.add(roof);

    const upperRoofGeo = new THREE.BoxGeometry(28, 1.4, 12);
    const upperRoof = new THREE.Mesh(upperRoofGeo, roofMat);
    upperRoof.position.y = 12.8;
    roof.castShadow = true;
    adminGroup.add(upperRoof);

    // Official Nameplate Sign: UBND HUYỆN NÚI THÀNH
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 440;
    signCanvas.height = 90;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(0, 0, 440, 90);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 5;
    ctx.strokeRect(6, 6, 428, 78);
    ctx.fillStyle = '#ffea00';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UBND HUYỆN NÚI THÀNH', 220, 55);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(9.0, 1.9),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 7.8, 10.8);
    adminGroup.add(signMesh);

    this.group.add(adminGroup);
  }

  /**
   * 3. Tượng Đài Chiến Thắng Núi Thành trên ngọn đồi di tích (Historical Monument)
   */
  private buildVictoryMonumentHill(): void {
    const hillGroup = new THREE.Group();
    hillGroup.position.set(265, 0.45, 805);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x3d7033, roughness: 0.85 });
    const graniteMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.6, metalness: 0.3 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.85, roughness: 0.2 });

    // Historical Hill Mound: Terraced Memorial Garden
    const moundGeo = new THREE.CylinderGeometry(18, 26, 4.5, 32);
    const mound = new THREE.Mesh(moundGeo, grassMat);
    mound.position.y = 2.25;
    mound.castShadow = true;
    mound.receiveShadow = true;
    hillGroup.add(mound);

    // Grand stone staircase leading to monument
    const stepsGeo = new THREE.BoxGeometry(4.5, 4.5, 14);
    stepsGeo.rotateX(-0.35);
    const steps = new THREE.Mesh(stepsGeo, graniteMat);
    steps.position.set(0, 2.25, -12);
    hillGroup.add(steps);

    // Monument Base Ceremonial Plaza
    const plazaGeo = new THREE.CylinderGeometry(11, 11, 0.9, 24);
    const plaza = new THREE.Mesh(plazaGeo, graniteMat);
    plaza.position.y = 4.95;
    hillGroup.add(plaza);

    // Main Monument Stele (Tượng đài Chiến thắng Núi Thành cao 11m)
    const steleGeo = new THREE.BoxGeometry(2.8, 11.0, 1.6);
    const stele = new THREE.Mesh(steleGeo, graniteMat);
    stele.position.y = 4.95 + 5.5;
    stele.castShadow = true;
    hillGroup.add(stele);

    // Winged Pylons framing the monument
    [-2.6, 2.6].forEach((wx) => {
      const wingGeo = new THREE.BoxGeometry(1.0, 9.0, 1.2);
      wingGeo.rotateZ(wx > 0 ? -0.15 : 0.15);
      const wing = new THREE.Mesh(wingGeo, graniteMat);
      wing.position.set(wx, 4.95 + 4.5, 0);
      hillGroup.add(wing);
    });

    // Golden Vietnam Star on top of monument
    const starGeo = new THREE.CircleGeometry(1.1, 5);
    const star = new THREE.Mesh(starGeo, goldMat);
    star.position.set(0, 4.95 + 9.8, 0.85);
    hillGroup.add(star);

    // Commemorative inscription stele: CHIẾN THẮNG NÚI THÀNH 26-5-1965
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 384;
    signCanvas.height = 96;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(0, 0, 384, 96);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 372, 84);
    ctx.fillStyle = '#ffeb3b';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHIẾN THẮNG NÚI THÀNH', 192, 42);
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('26 - 5 - 1965', 192, 75);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 0.9),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 4.95 + 1.2, 5.6);
    hillGroup.add(signMesh);

    // Ceremonial Flagpole on Hill
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 8.5, 8);
    const pole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: 0xffffff }));
    pole.position.set(0, 4.95 + 4.25, 6.8);
    hillGroup.add(pole);

    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 1.3),
      new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide })
    );
    flag.position.set(1.0, 4.95 + 7.5, 6.8);
    hillGroup.add(flag);

    this.group.add(hillGroup);
  }

  /**
   * 4. Sông An Tân & Cặp cầu An Tân QL1A + Cầu đường sắt
   */
  private buildAnTanRiverAndBridges(): void {
    const riverGroup = new THREE.Group();

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1d637a,
      roughness: 0.15,
      metalness: 0.8,
    });
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x4a525d, roughness: 0.75 });
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x2b3847, metalness: 0.8, roughness: 0.3 });
    const pierMat = new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.8 });

    // Sông An Tân water plane
    const riverGeo = new THREE.PlaneGeometry(160, 24);
    riverGeo.rotateX(-Math.PI / 2);
    const river = new THREE.Mesh(riverGeo, waterMat);
    river.position.set(220, 0.25, 825);
    river.receiveShadow = true;
    riverGroup.add(river);

    // Highway 1A Road Bridge centered on QL1A at X: 220
    const roadBridgeGeo = new THREE.BoxGeometry(9.2, 0.6, 28);
    const roadBridge = new THREE.Mesh(roadBridgeGeo, bridgeMat);
    roadBridge.position.set(220, 0.58, 825);
    roadBridge.castShadow = true;
    riverGroup.add(roadBridge);

    // Bridge concrete piers
    [-8, 0, 8].forEach((pz) => {
      const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 1.8, 8), pierMat);
      pier.position.set(220, 0.3, 825 + pz);
      riverGroup.add(pier);
    });

    // White bridge guardrails
    [-4.5, 4.5].forEach((rx) => {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.8, 28),
        new THREE.MeshStandardMaterial({ color: 0xf5f7fa })
      );
      rail.position.set(220 + rx, 1.05, 825);
      riverGroup.add(rail);
    });

    // Railway Steel Truss Bridge centered on Railway at X: 208
    const railBridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.6, 28), bridgeMat);
    railBridgeDeck.position.set(208, 0.62, 825);
    riverGroup.add(railBridgeDeck);

    // Steel truss sides
    [-1.9, 1.9].forEach((tx) => {
      const trussSpan = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.4, 28), trussMat);
      trussSpan.position.set(208 + tx, 2.3, 825);
      riverGroup.add(trussSpan);
    });

    this.group.add(riverGroup);
  }

  /**
   * 5. Ga Núi Thành (Nui Thanh Railway Station)
   */
  private buildNuiThanhRailwayStation(): void {
    const stationGroup = new THREE.Group();
    stationGroup.position.set(194, 0.45, 845);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xedd382, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xa62b1e, roughness: 0.5 });
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x737d87, roughness: 0.85 });

    // Station building
    const stationMesh = new THREE.Mesh(new THREE.BoxGeometry(16, 5.5, 10), wallMat);
    stationMesh.position.y = 2.75;
    stationMesh.castShadow = true;
    stationGroup.add(stationMesh);

    // Station roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(17.5, 1.2, 11.5), roofMat);
    roof.position.y = 5.5 + 0.6;
    stationGroup.add(roof);

    // Name sign: GA NÚI THÀNH
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
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 1.6), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 4.2, 5.15);
    stationGroup.add(sign);

    // Passenger platform
    const platform = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 36), platformMat);
    platform.position.set(11.5, 0.18, 0);
    platform.receiveShadow = true;
    stationGroup.add(platform);

    // Platform canopy
    const canopyRoof = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.2, 28),
      new THREE.MeshStandardMaterial({ color: 0x3d4a59, metalness: 0.5, roughness: 0.4 })
    );
    canopyRoof.position.set(11.5, 3.2, 0);
    stationGroup.add(canopyRoof);

    this.group.add(stationGroup);
  }

  /**
   * 6. Chợ Thị Trấn Núi Thành & Dãy Nhà Phố Thương Mại (Commercial Core)
   */
  private buildTownCommercialShopsAndMarket(): void {
    const commGroup = new THREE.Group();

    const houseMat1 = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.6 });
    const houseMat2 = new THREE.MeshStandardMaterial({ color: 0xe8dcbe, roughness: 0.6 });
    const parapetMat = new THREE.MeshStandardMaterial({ color: 0x5a636e, roughness: 0.7 });
    const tankMat = new THREE.MeshStandardMaterial({ color: 0xbfc6cc, metalness: 0.8, roughness: 0.3 });

    // A. Chợ Núi Thành (Central Market Shed)
    const marketGroup = new THREE.Group();
    marketGroup.position.set(228, 0.45, 842);

    const marketHall = new THREE.Mesh(
      new THREE.BoxGeometry(22, 4.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xdde3e8, roughness: 0.7 })
    );
    marketHall.position.y = 2.1;
    marketHall.castShadow = true;
    marketGroup.add(marketHall);

    // Blue industrial curved steel roof
    const marketRoof = new THREE.Mesh(
      new THREE.BoxGeometry(23.5, 0.8, 17.5),
      new THREE.MeshStandardMaterial({ color: 0x1f4e78, roughness: 0.4 })
    );
    marketRoof.position.y = 4.2 + 0.4;
    marketGroup.add(marketRoof);

    commGroup.add(marketGroup);

    // B. Realistic Townhouses (nhà ống) along streets
    const shopPositions = [
      { x: 175, z: 780, h: 7.5, w: 5.5, l: 9 },
      { x: 165, z: 780, h: 8.5, w: 5.5, l: 9 },
      { x: 175, z: 800, h: 9.0, w: 6.0, l: 10 },
      { x: 165, z: 800, h: 7.0, w: 5.5, l: 9 },
      { x: 235, z: 765, h: 7.5, w: 5.5, l: 9 },
      { x: 245, z: 765, h: 8.0, w: 5.5, l: 9 },
      { x: 205, z: 855, h: 7.5, w: 5.5, l: 9 },
      { x: 195, z: 855, h: 9.0, w: 5.5, l: 9 },
      { x: 185, z: 855, h: 7.2, w: 5.5, l: 9 },
      { x: 215, z: 855, h: 8.0, w: 5.5, l: 9 },
      { x: 235, z: 860, h: 7.5, w: 5.5, l: 9 },
      { x: 245, z: 860, h: 8.8, w: 6.0, l: 10 },
      { x: 255, z: 860, h: 7.2, w: 5.5, l: 9 },
      { x: 265, z: 860, h: 8.2, w: 5.5, l: 9 },
    ];

    shopPositions.forEach((sp, idx) => {
      const house = new THREE.Group();
      house.position.set(sp.x, 0.45, sp.z);

      const mat = idx % 2 === 0 ? houseMat1 : houseMat2;
      const body = new THREE.Mesh(new THREE.BoxGeometry(sp.w, sp.h, sp.l), mat);
      body.position.y = sp.h / 2;
      body.castShadow = true;
      house.add(body);

      // Roof parapet band
      const parapet = new THREE.Mesh(
        new THREE.BoxGeometry(sp.w + 0.2, 0.4, sp.l + 0.2),
        parapetMat
      );
      parapet.position.y = sp.h + 0.2;
      house.add(parapet);

      // Stainless steel rooftop water tank
      const tank = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8),
        tankMat
      );
      tank.position.set(sp.w * 0.2, sp.h + 0.8, -sp.l * 0.2);
      house.add(tank);

      commGroup.add(house);
    });

    this.group.add(commGroup);
  }

  /**
   * 7. Bến Kè Sông An Tân & Thuyền Bè Dân Sinh
   */
  private buildRiverQuayAndBoats(): void {
    const quayGroup = new THREE.Group();
    quayGroup.position.set(235, 0.45, 825);

    const quayMat = new THREE.MeshStandardMaterial({ color: 0x8a9096, roughness: 0.85 });
    const boatMat = new THREE.MeshStandardMaterial({ color: 0x2b4c6f, roughness: 0.6 });

    // Stone embankment retaining wall
    [-10, 10].forEach((qz) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(50, 0.8, 1.0), quayMat);
      wall.position.set(0, 0.2, qz);
      quayGroup.add(wall);
    });

    // Small river sampans
    [-12, 0, 12].forEach((bx) => {
      const sampan = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 5.5), boatMat);
      sampan.position.set(bx, -0.15, 5.0);
      quayGroup.add(sampan);
    });

    this.group.add(quayGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
