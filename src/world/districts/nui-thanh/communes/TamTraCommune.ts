import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';
import { getNuiThanhElevation } from '@/world/terrain/ReliefTerrain';

/**
 * Xã Tam Trà (Huyện Núi Thành) - "Vùng Cao Đại Ngàn & Văn Hóa Bản Địa Đồng Bào Co"
 * Vùng đất miền núi phía Tây Nam Núi Thành tiếp giáp Trà Bồng (Quảng Ngãi):
 * - Đỉnh Hòn Tàu 953m quanh năm mây mù bao phủ - Nóc nhà huyện Núi Thành
 * - Nhà Rông truyền thống của đồng bào Co với mái cao vút hình lưỡi rìu & Cột Guu lễ hội
 * - Bản làng nhà sàn gỗ tre nương mình bên sườn đồi
 * - Cầu treo dây văng bắc qua dòng suối đá tự nhiên
 * - Vườn đồi quế Trà Bồng nức tiếng ngát hương
 */
export class TamTraCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-tra-commune',
        name: 'Xã Tam Trà',
        nameEn: 'Tam Tra Highland Commune',
        type: 'commune',
        areaKm2: 97.2,
        description:
          'Xã vùng cao có diện tích tự nhiên lớn nhất huyện Núi Thành. Nơi lưu giữ bản sắc văn hóa độc đáo của đồng bào dân tộc Co với Nhà Rông mái cao hình lưỡi rìu, rừng nguyên sinh đại ngàn và đỉnh Hòn Tàu 953m.',
        cameraPreset: {
          position: [-55, 65, 830],
          target: [-115, 28, 835],
        },
        subLandmarks: [
          {
            id: 'nha-rong-co',
            name: '🏛️ Nhà Rông Truyền Thống Dân Tộc Co',
            category: 'cultural',
            cameraPreset: { position: [-85, 45, 825], target: [-115, 28, 835] },
            description: 'Biểu tượng văn hóa tâm linh đồng bào Co với mái tranh cao vút hình lưỡi rìu, cột Guu và sân cồng chiêng.',
          },
          {
            id: 'lang-nha-san-co',
            name: '🏡 Bản Làng Nhà Sàn Vùng Cao',
            category: 'cultural',
            cameraPreset: { position: [-80, 48, 825], target: [-118, 28, 838] },
            description: 'Quần thể nhà sàn gỗ mộc mạc của đồng bào Co nương mình bên sườn đồi và dòng suối Trầu.',
          },
          {
            id: 'dinh-hon-tau-peak',
            name: '🏔️ Đỉnh Hòn Tàu 953m (Nóc Nhà Núi Thành)',
            category: 'nature',
            cameraPreset: { position: [-70, 115, 845], target: [-100, 88, 885] },
            description: 'Đỉnh núi cao nhất huyện Núi Thành với đài vọng cảnh lộng gió và cột mốc độ cao 953m.',
          },
          {
            id: 'cau-treo-tam-tra',
            name: '🌉 Cầu Treo Vượt Suối Trầu',
            category: 'bridge',
            cameraPreset: { position: [-75, 45, 835], target: [-110, 27, 850] },
            description: 'Cầu treo dân sinh dây cáp thép nối đôi bờ con suối Trầu với lòng suối đá tự nhiên.',
          },
        ],
      },
      {
        minX: -190,
        maxX: -50,
        minZ: 800,
        maxZ: 960,
      }
    );

    this.buildCommunalNhaRongAndVillage();
    this.buildSuspensionBridge();
    this.buildTerracedPlotsAndCinnamonGroves();
    this.buildHonTauPeakMonument();
  }

  /**
   * 1. Nhà Rông truyền thống của đồng bào Co & Bản làng nhà sàn
   */
  private buildCommunalNhaRongAndVillage(): void {
    const villageGroup = new THREE.Group();
    const groundY = getNuiThanhElevation(-115, 835);
    villageGroup.position.set(-115, groundY, 835);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x4e3629, roughness: 0.85 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x332219, roughness: 0.9 });
    const thatchMat = new THREE.MeshStandardMaterial({ color: 0x9e8555, roughness: 0.95 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x616161, roughness: 0.9 });
    const totemRedMat = new THREE.MeshStandardMaterial({ color: 0xc62828, roughness: 0.7 });
    const totemGoldMat = new THREE.MeshStandardMaterial({ color: 0xfbc02d, roughness: 0.6 });

    // ==========================================
    // A. NHÀ RÔNG TRUYỀN THỐNG ĐỒNG BÀO CO (Trung tâm bản làng)
    // ==========================================
    const nhaRong = new THREE.Group();
    nhaRong.position.set(0, 0, 0);

    // 1. Heavy wooden foundation stilts (12 pillars)
    [-4.5, -1.5, 1.5, 4.5].forEach((sx) => {
      [-2.8, 0, 2.8].forEach((sz) => {
        const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 3.8, 8), darkWoodMat);
        stilt.position.set(sx, 1.9, sz);
        stilt.castShadow = true;
        nhaRong.add(stilt);
      });
    });

    // 2. Main wooden floor deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.4, 7.5), woodMat);
    deck.position.set(0, 3.8, 0);
    nhaRong.add(deck);

    // 3. Communal longhouse hall walls
    const walls = new THREE.Mesh(new THREE.BoxGeometry(11.0, 3.5, 6.2), woodMat);
    walls.position.set(0, 5.55, 0);
    walls.castShadow = true;
    nhaRong.add(walls);

    // 4. Iconic towering axe-blade curved thatched roof (Mái Nhà Rông cao vút 11m)
    const roofMain = new THREE.Mesh(new THREE.BoxGeometry(13.2, 7.5, 7.8), thatchMat);
    roofMain.position.set(0, 10.8, 0);
    roofMain.castShadow = true;
    nhaRong.add(roofMain);

    // Upper soaring crest of the roof (Hình dáng lưỡi rìu ngút trời)
    const roofPeak = new THREE.Mesh(new THREE.ConeGeometry(3.5, 6.0, 4), thatchMat);
    roofPeak.scale.set(1.9, 1.0, 0.7);
    roofPeak.position.set(0, 16.5, 0);
    roofPeak.castShadow = true;
    nhaRong.add(roofPeak);

    // Front outdoor veranda & wooden entrance staircase
    const stairs = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.0, 0.3), woodMat);
    stairs.rotateX(-0.55);
    stairs.position.set(0, 1.9, 4.2);
    nhaRong.add(stairs);

    // Balustrade along the front deck
    const railing = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.9, 0.15), woodMat);
    railingsLoop: for (let r = -5.5; r <= 5.5; r += 2.0) {
      if (Math.abs(r) < 1.2) continue; // Staircase opening
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.0, 0.15), woodMat);
      post.position.set(r, 4.4, 3.65);
      nhaRong.add(post);
    }
    railing.position.set(0, 4.8, 3.65);
    nhaRong.add(railing);

    // ==========================================
    // B. CỘT GUU / CỘT LỄ ĐỒNG BÀO CO (Totem Pole)
    // ==========================================
    const totemGroup = new THREE.Group();
    totemGroup.position.set(0, 0, 9.5);

    // Main carved wooden totem pole (Height: 8.5m)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 8.5, 8), darkWoodMat);
    pole.position.y = 4.25;
    pole.castShadow = true;
    totemGroup.add(pole);

    // Ceremonial geometric rings (Hoa văn chỉ đỏ - vàng)
    [2.5, 4.2, 5.8, 7.2].forEach((ry, idx) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.08, 6, 12),
        idx % 2 === 0 ? totemRedMat : totemGoldMat
      );
      ring.rotateX(Math.PI / 2);
      ring.position.y = ry;
      totemGroup.add(ring);
    });

    // Top stylized carved bird motif (Chim Chơ-rao / Biểu tượng thiêng)
    const bird = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.4, 4), totemGoldMat);
    bird.position.y = 8.8;
    totemGroup.add(bird);

    // Circular stone festival fire ring & cồng chiêng plaza
    const firePlaza = new THREE.Mesh(new THREE.CylinderGeometry(7.0, 7.0, 0.2, 24), stoneMat);
    firePlaza.position.y = 0.1;
    totemGroup.add(firePlaza);

    const fireRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.35, 8, 16), stoneMat);
    fireRing.rotateX(Math.PI / 2);
    fireRing.position.y = 0.35;
    totemGroup.add(fireRing);

    villageGroup.add(nhaRong);
    villageGroup.add(totemGroup);

    // ==========================================
    // C. CÁC NẾP NHÀ SÀN DÂN SINH ĐỒNG BÀO CO
    // ==========================================
    const stiltHouses = [
      { x: -16, z: -4, rot: 0.15 },
      { x: -18, z: 12, rot: -0.2 },
      { x: 16, z: -3, rot: -0.15 },
      { x: 18, z: 11, rot: 0.25 },
      { x: -10, z: 22, rot: 0.1 },
      { x: 12, z: 24, rot: -0.2 },
    ];

    stiltHouses.forEach((sh) => {
      const house = new THREE.Group();
      house.position.set(sh.x, 0, sh.z);
      house.rotation.y = sh.rot;

      // 6 wooden stilts
      [-2.8, 0, 2.8].forEach((sx) => {
        [-1.8, 1.8].forEach((sz) => {
          const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 2.8, 6), darkWoodMat);
          stilt.position.set(sx, 1.4, sz);
          stilt.castShadow = true;
          house.add(stilt);
        });
      });

      // Bamboo floor
      const floor = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.25, 4.8), woodMat);
      floor.position.set(0, 2.8, 0);
      house.add(floor);

      // Woven walls
      const wall = new THREE.Mesh(new THREE.BoxGeometry(6.6, 2.6, 4.4), woodMat);
      wall.position.set(0, 4.1, 0);
      wall.castShadow = true;
      house.add(wall);

      // Thatched gabled roof
      const roof = new THREE.Mesh(new THREE.BoxGeometry(7.8, 1.8, 5.4), thatchMat);
      roof.position.set(0, 6.1, 0);
      roof.castShadow = true;
      house.add(roof);

      // Entrance ladder
      const lad = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.0, 0.12), woodMat);
      lad.rotateX(-0.4);
      lad.position.set(0, 1.4, 2.4);
      house.add(lad);

      villageGroup.add(house);
    });

    this.group.add(villageGroup);
  }

  /**
   * 2. Cầu treo dây văng vượt suối Trầu & Suối đá tự nhiên
   */
  private buildSuspensionBridge(): void {
    const bridgeGroup = new THREE.Group();
    const bridgeY = getNuiThanhElevation(-110, 850);
    bridgeGroup.position.set(-110, bridgeY, 850);

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x37474f, metalness: 0.8, roughness: 0.3 });
    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.9 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x1976d2, roughness: 0.15, metalness: 0.7 });
    const boulderMat = new THREE.MeshStandardMaterial({ color: 0x78909c, roughness: 0.95 });

    // Rocky stream bed with flowing clear mountain water
    const stream = new THREE.Mesh(new THREE.PlaneGeometry(18, 55), waterMat);
    stream.rotateX(-Math.PI / 2);
    stream.position.set(0, 0.2, 0);
    bridgeGroup.add(stream);

    // Natural mountain boulders in the stream
    const boulderPositions = [
      { x: -3, z: -14, s: 2.2 },
      { x: 4, z: -8, s: 1.8 },
      { x: -2, z: 2, s: 2.5 },
      { x: 3, z: 12, s: 2.0 },
      { x: -4, z: 18, s: 1.6 },
    ];
    boulderPositions.forEach((bp) => {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(bp.s, 1), boulderMat);
      rock.position.set(bp.x, bp.s * 0.4, bp.z);
      rock.castShadow = true;
      bridgeGroup.add(rock);
    });

    // Twin suspension cable steel towers
    [-17, 17].forEach((tx) => {
      const pylonGeo = new THREE.CylinderGeometry(0.32, 0.42, 9.0, 8);
      [-1.5, 1.5].forEach((tz) => {
        const pylon = new THREE.Mesh(pylonGeo, steelMat);
        pylon.position.set(tx, 4.5, tz);
        pylon.castShadow = true;
        bridgeGroup.add(pylon);
      });
      // Top Crossbeam
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 3.4), steelMat);
      cross.position.set(tx, 8.4, 0);
      bridgeGroup.add(cross);
    });

    // Wooden deck walkway
    const deck = new THREE.Mesh(new THREE.BoxGeometry(34, 0.25, 2.6), woodPlankMat);
    deck.position.set(0, 3.2, 0);
    deck.castShadow = true;
    bridgeGroup.add(deck);

    // Handrail cables
    [-1.25, 1.25].forEach((ry) => {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.9 })
      );
      rail.position.set(0, 4.3, ry);
      bridgeGroup.add(rail);
    });

    // Main sagging suspension cables
    [-1.35, 1.35].forEach((cz) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-17, 8.4, cz),
        new THREE.Vector3(0, 3.8, cz),
        new THREE.Vector3(17, 8.4, cz),
      ]);
      const cableGeo = new THREE.TubeGeometry(curve, 24, 0.07, 6, false);
      const cable = new THREE.Mesh(cableGeo, steelMat);
      bridgeGroup.add(cable);
    });

    this.group.add(bridgeGroup);
  }

  /**
   * 3. Vườn đồi quế Trà Bồng & Ruộng nương bậc thang
   */
  private buildTerracedPlotsAndCinnamonGroves(): void {
    const natureGroup = new THREE.Group();
    const groundY = getNuiThanhElevation(-135, 840);
    natureGroup.position.set(-135, groundY, 840);

    const cinnamonFoliageMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.8 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.9 });

    // Cinnamon trees (Cây quế Trà Bồng)
    const treeGeo = new THREE.ConeGeometry(1.6, 5.0, 7);
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.25, 2.2, 6);
    const treeCount = 36;

    const treesMesh = new THREE.InstancedMesh(treeGeo, cinnamonFoliageMat, treeCount);
    const trunksMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCount);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < treeCount; i++) {
      const tx = (Math.random() - 0.5) * 45;
      const tz = (Math.random() - 0.5) * 40;
      const ty = Math.sin(tx * 0.08) * 3 + 2;

      dummy.position.set(tx, ty + 1.1, tz);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      trunksMesh.setMatrixAt(i, dummy.matrix);

      dummy.position.set(tx, ty + 2.2 + 2.5, tz);
      dummy.scale.set(0.9 + Math.random() * 0.3, 0.9 + Math.random() * 0.3, 0.9 + Math.random() * 0.3);
      dummy.updateMatrix();
      treesMesh.setMatrixAt(i, dummy.matrix);
    }

    treesMesh.instanceMatrix.needsUpdate = true;
    trunksMesh.instanceMatrix.needsUpdate = true;
    treesMesh.castShadow = true;
    natureGroup.add(trunksMesh, treesMesh);

    this.group.add(natureGroup);
  }

  /**
   * 4. Đài vọng cảnh & Cột mốc Đỉnh Hòn Tàu 953m (Peak Monument)
   */
  private buildHonTauPeakMonument(): void {
    const peakGroup = new THREE.Group();
    const peakY = getNuiThanhElevation(-100, 885);
    peakGroup.position.set(-100, peakY, 885);

    const graniteMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.6 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });

    // 1. Granite summit platform
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 6.5, 1.2, 16), graniteMat);
    platform.position.y = 0.6;
    platform.castShadow = true;
    peakGroup.add(platform);

    // 2. Summit Milestone Stele: ĐỈNH HÒN TÀU 953M
    const stele = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.9), graniteMat);
    stele.position.set(0, 2.5, 0);
    stele.castShadow = true;
    peakGroup.add(stele);

    // Pyramid capstone on milestone
    const cap = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.8, 4), graniteMat);
    cap.rotateY(Math.PI / 4);
    cap.position.set(0, 4.3, 0);
    peakGroup.add(cap);

    // Inscription canvas
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 128;
    const ctx = signCanvas.getContext('2d')!;
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 244, 116);
    ctx.fillStyle = '#ffeb3b';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ĐỈNH HÒN TÀU', 128, 45);
    ctx.fillText('953 M', 128, 80);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NÓC NHÀ NÚI THÀNH', 128, 108);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 0.65),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 2.5, 0.48);
    peakGroup.add(signMesh);

    // 3. Tall stainless steel flagpole on peak
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 9.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 })
    );
    pole.position.set(2.4, 5.0, 0);
    peakGroup.add(pole);

    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 1.3),
      new THREE.MeshBasicMaterial({ color: 0xda251d, side: THREE.DoubleSide })
    );
    flag.position.set(3.4, 8.8, 0);
    peakGroup.add(flag);

    // 4. Wooden lookout handrails around platform
    for (let p = 0; p < 8; p++) {
      const pa = (p / 8) * Math.PI * 2;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 6), woodMat);
      post.position.set(Math.cos(pa) * 4.8, 1.75, Math.sin(pa) * 4.8);
      peakGroup.add(post);
    }

    this.group.add(peakGroup);
  }

  public initialize(): void {
    this.isLoaded = true;
  }
}
