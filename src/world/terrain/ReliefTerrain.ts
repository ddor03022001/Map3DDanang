import * as THREE from 'three';

/**
 * Photorealistic 3D Topographical Relief Terrain Engine
 * Inspired directly by the architectural paradigm of duancuulong.com (Bản đồ 3D Bảy Núi - An Giang)
 * Features:
 * - True 3D Digital Elevation Model (DEM) with soaring mountain ranges, karst limestone peaks, and rolling foothills
 * - Agricultural rice paddy parcel patchwork (Ruộng lúa Tri Tôn / Tam Hiệp / Duy Xuyên)
 * - Carved riverbeds for Han River, Thu Bon, An Tan, and Truong Giang canal
 * - Underlaid Antique Parchment Historical Map background (CAMBODGE / ĐÀ NẴNG - QUẢNG NAM)
 * - Glowing territorial boundary polygon cut-out
 */
export class ReliefTerrain {
  public group = new THREE.Group();

  public terrainMesh!: THREE.Mesh;
  public parchmentMesh!: THREE.Mesh;
  public boundaryLine!: THREE.Line;

  private width = 2400;
  private depth = 2800;
  private segments = 256;

  constructor() {
    this.buildAntiqueParchmentBase();
    this.buildTopographicalReliefMesh();
    this.buildTerritorialBoundaryOutline();
  }

  /**
   * 1. Underlaid Antique Parchment Historical Map Plane (like Image 3 in duancuulong.com)
   */
  private buildAntiqueParchmentBase(): void {
    const pWidth = 4200;
    const pDepth = 4200;

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 2048;
    pCanvas.height = 2048;
    const ctx = pCanvas.getContext('2d')!;

    // Aged parchment base fill
    ctx.fillStyle = '#eedcba';
    ctx.fillRect(0, 0, 2048, 2048);

    // Subtle paper fiber & vignette shading
    const grad = ctx.createRadialGradient(1024, 1024, 400, 1024, 1024, 1400);
    grad.addColorStop(0, 'rgba(245, 233, 205, 0.2)');
    grad.addColorStop(0.7, 'rgba(215, 190, 145, 0.6)');
    grad.addColorStop(1, 'rgba(165, 135, 95, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 2048);

    // Historical cartographic latitude/longitude graticule lines
    ctx.strokeStyle = 'rgba(140, 110, 75, 0.25)';
    ctx.lineWidth = 2;
    for (let x = 128; x < 2048; x += 256) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 2048);
      ctx.stroke();
    }
    for (let y = 128; y < 2048; y += 256) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Antique compass rhumb lines radiating outward
    ctx.strokeStyle = 'rgba(160, 120, 80, 0.15)';
    ctx.lineWidth = 1.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      ctx.beginPath();
      ctx.moveTo(1024, 1024);
      ctx.lineTo(1024 + Math.cos(a) * 1400, 1024 + Math.sin(a) * 1400);
      ctx.stroke();
    }

    // Classical cartographic calligraphy labels
    ctx.font = 'italic bold 42px "Times New Roman", serif';
    ctx.fillStyle = 'rgba(100, 70, 40, 0.45)';
    ctx.textAlign = 'center';
    ctx.fillText('B I Ể N   Đ Ô N G   ( E A S T   S E A )', 1650, 1024);
    ctx.fillText('Đ À   N Ẵ N G   -   Q U Ả N G   N A M', 1024, 180);
    ctx.fillText('H U Y Ệ N   N Ú I   T H À N H', 1024, 1850);
    ctx.fillText('K H U   K I N H   T Ế   C H U   L A I', 1450, 1750);

    const pTex = new THREE.CanvasTexture(pCanvas);
    pTex.wrapS = THREE.ClampToEdgeWrapping;
    pTex.wrapT = THREE.ClampToEdgeWrapping;

    const pGeo = new THREE.PlaneGeometry(pWidth, pDepth);
    pGeo.rotateX(-Math.PI / 2);

    const pMat = new THREE.MeshStandardMaterial({
      map: pTex,
      roughness: 0.95,
      metalness: 0.05,
    });

    this.parchmentMesh = new THREE.Mesh(pGeo, pMat);
    this.parchmentMesh.position.y = -2.5; // Slightly submerged under relief
    this.parchmentMesh.receiveShadow = true;
    this.group.add(this.parchmentMesh);
  }

  /**
   * 2. True 3D Topographical DEM Mesh with Mountain Peaks & Rice Paddies (like Image 1 & 2)
   */
  private buildTopographicalReliefMesh(): void {
    const geo = new THREE.PlaneGeometry(this.width, this.depth, this.segments, this.segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const vertexCount = pos.count;

    // Calculate realistic elevation for every vertex
    for (let i = 0; i < vertexCount; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);

      let elevation = 0;

      // 1. Bà Nà & Núi Chúa Range (West-Northwest peaks up to 148 units ~ 1,487m)
      const distBaNa = Math.hypot(vx - (-520), vz - (-120));
      if (distBaNa < 380) {
        const falloff = Math.cos((distBaNa / 380) * (Math.PI / 2));
        const cragNoise = Math.sin(vx * 0.04) * Math.cos(vz * 0.04) * 12;
        elevation += Math.pow(falloff, 1.8) * 135 + Math.max(0, cragNoise);
      }

      // 2. Sơn Trà Peninsula (Northeast coastal range up to 70 units ~ 696m)
      const distSonTra = Math.hypot(vx - 380, vz - (-450));
      if (distSonTra < 260) {
        const falloff = Math.cos((distSonTra / 260) * (Math.PI / 2));
        const ridge = Math.sin((vx + vz) * 0.06) * 6;
        elevation += Math.pow(falloff, 1.7) * 68 + ridge;
      }

      // 3. Hải Vân Pass Range (North border peaks up to 55 units ~ 496m)
      const distHaiVan = Math.hypot(vx - (-350), vz - (-580));
      if (distHaiVan < 300) {
        const falloff = Math.cos((distHaiVan / 300) * (Math.PI / 2));
        elevation += Math.pow(falloff, 1.6) * 52;
      }

      // 4. Ngũ Hành Sơn (Marble Mountains - cluster of 5 craggy limestone peaks)
      const distNguHanh = Math.hypot(vx - 220, vz - 380);
      if (distNguHanh < 130) {
        const karstPeak = Math.sin(vx * 0.12) * Math.cos(vz * 0.12);
        if (karstPeak > 0.2) {
          elevation += Math.pow(karstPeak, 1.2) * 26;
        }
      }

      // 5. Western Mountains of Núi Thành & Hòn Tàu (Southwest range up to 95 units ~ 953m)
      const distTayNuiThanh = Math.hypot(vx - (-120), vz - 820);
      if (distTayNuiThanh < 340) {
        const falloff = Math.cos((distTayNuiThanh / 340) * (Math.PI / 2));
        const hillRidge = Math.sin(vx * 0.05) * Math.cos(vz * 0.05) * 8;
        elevation += Math.pow(falloff, 1.7) * 88 + hillRidge;
      }

      // 6. Rolling foothills sloping down towards Tam Hiệp (vx between 50 and 180, vz between 620 and 800)
      if (vx > 20 && vx < 200 && vz > 600 && vz < 850) {
        const foothillX = (200 - vx) / 180;
        elevation += Math.pow(foothillX, 1.5) * 16 + Math.sin(vx * 0.08) * 1.5;
      }

      // 7. River Channel Carvings (Han River, Thu Bon, An Tan, Truong Giang Canal)
      // Han River corridor
      const distHanRiver = Math.abs(vx - (vz * -0.05));
      if (distHanRiver < 36 && vz > -400 && vz < 220) {
        elevation = Math.min(elevation, -0.6);
      }
      // An Tan River & Truong Giang canal cutting through Tam Hiep to Chu Lai Seaport
      const distAnTan = Math.hypot(vx - 320, vz - 740);
      if (distAnTan < 45) {
        elevation = Math.min(elevation, -0.4);
      }
      // Estuary channel leading to Chu Lai port
      if (vx > 460 && vx < 580 && vz > 680 && vz < 780) {
        elevation = Math.min(elevation, -0.5);
      }

      // 8. Flat alluvial agricultural plain base elevation
      if (elevation === 0) {
        elevation = 0.4 + Math.sin(vx * 0.015) * Math.cos(vz * 0.015) * 0.25;
      }

      pos.setY(i, elevation);
    }

    geo.computeVertexNormals();

    // Generate rich agricultural rice paddy & mountain forest texture canvas
    const terrainTexture = this.generateReliefTexture();

    const mat = new THREE.MeshStandardMaterial({
      map: terrainTexture,
      roughness: 0.86,
      metalness: 0.08,
      flatShading: false,
    });

    this.terrainMesh = new THREE.Mesh(geo, mat);
    this.terrainMesh.receiveShadow = true;
    this.terrainMesh.castShadow = true;
    this.group.add(this.terrainMesh);
  }

  /**
   * Generates authentic satellite & agricultural field patchwork texture
   * exactly mirroring the emerald/golden rice paddies and mountain slopes in duancuulong.com!
   */
  private generateReliefTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;

    // 1. Base Alluvial Plain Green
    ctx.fillStyle = '#48683e';
    ctx.fillRect(0, 0, 2048, 2048);

    // 2. Agricultural Rice Paddy Patchwork (Ruộng lúa chia ô bàn cờ đa sắc)
    const paddyColors = [
      '#6b8e23', // Olive green
      '#7ba036', // Vibrant paddy green
      '#8cb342', // Spring rice shoot green
      '#99bf4d', // Golden-green ripening rice
      '#5a7a30', // Deep emerald mature paddy
      '#a2b85a', // Harvest gold
    ];

    // Grid of agricultural parcels
    const parcelCols = 64;
    const parcelRows = 64;
    const cw = 2048 / parcelCols;
    const ch = 2048 / parcelRows;

    for (let c = 0; c < parcelCols; c++) {
      for (let r = 0; r < parcelRows; r++) {
        const px = c * cw;
        const py = r * ch;

        // Color variation based on noise
        const n = Math.sin(c * 0.7) * Math.cos(r * 0.7);
        const colIdx = Math.abs(Math.floor(n * 5.5 + (c + r))) % paddyColors.length;

        ctx.fillStyle = paddyColors[colIdx];
        ctx.fillRect(px, py, cw, ch);

        // Thin earthen bund / dyke lines (bờ ruộng)
        ctx.strokeStyle = 'rgba(70, 60, 45, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, cw, ch);
      }
    }

    // 3. Dense Forested Mountains (Bà Nà, Sơn Trà, Tây Núi Thành)
    // Dark forest clusters with contour variation
    const forestSpots = [
      { x: 500, y: 700, r: 350 }, // Ba Na / Hai Van
      { x: 1350, y: 400, r: 240 }, // Son Tra
      { x: 750, y: 1650, r: 320 }, // Western Nui Thanh
      { x: 1220, y: 1250, r: 120 }, // Ngu Hanh Son
    ];

    forestSpots.forEach((f) => {
      const fGrad = ctx.createRadialGradient(f.x, f.y, 40, f.x, f.y, f.r);
      fGrad.addColorStop(0, '#1c3e1e'); // Deep mountain jungle
      fGrad.addColorStop(0.6, '#28552a');
      fGrad.addColorStop(1, 'rgba(72, 104, 62, 0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Sandy Coastal Dune Strip & Beaches (Mỹ Khê xuống Tam Hải / Chu Lai)
    const sandGrad = ctx.createLinearGradient(1250, 0, 1600, 2048);
    sandGrad.addColorStop(0, 'rgba(212, 190, 140, 0.85)');
    sandGrad.addColorStop(0.5, 'rgba(218, 196, 146, 0.9)');
    sandGrad.addColorStop(1, 'rgba(224, 204, 156, 0.85)');

    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(1250, 0);
    ctx.quadraticCurveTo(1200, 1024, 1380, 2048);
    ctx.lineTo(1580, 2048);
    ctx.quadraticCurveTo(1450, 1024, 1480, 0);
    ctx.closePath();
    ctx.fill();

    // 5. River Corridors with Specular Cyan Water (Sông Hàn, Sông Thu Bồn, Sông Trường Giang)
    ctx.strokeStyle = '#2b7899';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Han River
    ctx.beginPath();
    ctx.moveTo(1024, 1800);
    ctx.quadraticCurveTo(1010, 1024, 980, 400);
    ctx.stroke();

    // Truong Giang & An Tan river corridor in Tam Hiep
    ctx.beginPath();
    ctx.moveTo(1100, 1650);
    ctx.quadraticCurveTo(1280, 1720, 1500, 1750);
    ctx.stroke();

    // 6. National Highway 1A & Arterial Road Network (Yellow/Orange roads like duancuulong.com!)
    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(960, 0);
    ctx.quadraticCurveTo(1010, 1024, 1180, 2048); // QL1A traversing from Da Nang down through Chu Lai
    ctx.stroke();

    // DT618 / Chu Lai expressway artery into THACO
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(1170, 1720);
    ctx.lineTo(1420, 1720);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  /**
   * 3. Glowing Territorial Boundary Outline (like the purple glowing boundary in Image 3)
   */
  private buildTerritorialBoundaryOutline(): void {
    const halfW = 1080;
    const halfD = 1250;

    // Boundary perimeter polygon enclosing Da Nang & Northern Chu Lai Quang Nam
    const boundaryPts: THREE.Vector3[] = [
      new THREE.Vector3(-halfW * 0.75, 4.0, -halfD * 0.85),
      new THREE.Vector3(-halfW * 0.2, 3.5, -halfD),
      new THREE.Vector3(halfW * 0.35, 4.0, -halfD * 0.88),
      new THREE.Vector3(halfW * 0.8, 3.0, -halfD * 0.5),
      new THREE.Vector3(halfW * 0.65, 3.0, 0),
      new THREE.Vector3(halfW * 0.88, 3.0, halfD * 0.55),
      new THREE.Vector3(halfW * 0.95, 3.0, halfD * 0.85),
      new THREE.Vector3(halfW * 0.5, 3.0, halfD),
      new THREE.Vector3(-halfW * 0.4, 3.5, halfD * 0.95),
      new THREE.Vector3(-halfW * 0.85, 4.0, halfD * 0.5),
      new THREE.Vector3(-halfW, 4.5, 0),
      new THREE.Vector3(-halfW * 0.75, 4.0, -halfD * 0.85),
    ];

    const lineGeo = new THREE.BufferGeometry().setFromPoints(boundaryPts);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x9c27b0, // Vibrant magenta/purple neon border matching duancuulong.com Image 3
      linewidth: 3,
    });

    this.boundaryLine = new THREE.Line(lineGeo, lineMat);
    this.boundaryLine.computeLineDistances();
    this.group.add(this.boundaryLine);
  }
}
