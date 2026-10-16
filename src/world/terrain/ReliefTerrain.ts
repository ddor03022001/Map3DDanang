import * as THREE from 'three';

/**
 * Real-world Outer Boundary Polygon of Huyện Núi Thành (555.9 km²)
 * Exactly enclosing all 17 administrative communes/town and coastal waterways
 */
export const NUI_THANH_OUTER_POLYGON: [number, number][] = [
  [-20, 620],
  [10, 490],
  [145, 490],
  [225, 490],
  [255, 500],
  [350, 495],
  [435, 505], // Tam Tiến coast north
  [450, 580],
  [455, 650],
  [460, 720],
  [480, 800],
  [535, 860], // Seaward of Tam Hải
  [540, 930], // Mũi Bàn Than
  [470, 955],
  [390, 1000],
  [380, 1045], // Southernmost point bordering Dung Quất / Quảng Ngãi
  [320, 1045],
  [250, 1045],
  [130, 1040], // Sân bay Chu Lai South / Dốc Sỏi
  [40, 990],
  [-40, 990],
  [-120, 990],
  [-200, 990], // Southwest peak bordering Trà Bồng
  [-200, 890],
  [-200, 780],
  [-185, 710],
  [-185, 630],
  [-100, 625],
  [-20, 620],
];

function isPointInPolygon(px: number, pz: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], zi = poly[i][1];
    const xj = poly[j][0], zj = poly[j][1];
    const intersect = ((zi > pz) !== (zj > pz)) &&
      (px < ((xj - xi) * (pz - zi)) / (zj - zi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function distanceToPolygonEdges(px: number, pz: number, poly: [number, number][]): number {
  let minDist = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const x1 = poly[i][0], z1 = poly[i][1];
    const x2 = poly[j][0], z2 = poly[j][1];
    const dx = x2 - x1;
    const dz = z2 - z1;
    const lenSq = dx * dx + dz * dz;
    let t = ((px - x1) * dx + (pz - z1) * dz) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * dx;
    const projZ = z1 + t * dz;
    const d = Math.hypot(px - projX, pz - projZ);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

/**
 * Calculates realistic 3D elevation at any world point (vx, vz) within Nui Thanh
 */
export function getNuiThanhElevation(vx: number, vz: number): number {
  const isInside = isPointInPolygon(vx, vz, NUI_THANH_OUTER_POLYGON);
  if (!isInside) return 0.0;

  const distToEdge = distanceToPolygonEdges(vx, vz, NUI_THANH_OUTER_POLYGON);
  let elevation = 0;

  // A. Hòn Tàu Peak in Western Tam Trà (953m actual ~ 88 units)
  // A. Hòn Tàu Peak in Western Tam Trà (953m actual ~ 88 units)
  const distHonTau = Math.hypot(vx - (-100), vz - 885);
  if (distHonTau < 180) {
    const falloff = Math.cos((distHonTau / 180) * (Math.PI / 2));
    const ridge = Math.sin((vx + vz) * 0.05) * 6;
    elevation += Math.pow(falloff, 1.8) * 82 + Math.max(0, ridge);
  }

  // B. Tam Trà Highland Crests & Valley (X: -160..-40, Z: 790..980)
  if (vx < -30 && vz > 790 && vz < 980) {
    const distTT = Math.hypot(vx - (-110), vz - 910);
    if (distTT < 140) {
      const falloff = Math.cos((distTT / 140) * (Math.PI / 2));
      elevation += Math.pow(falloff, 1.6) * 45;
    }
    // Suối Trầu & ĐT617 natural river valley corridor running East-West into Tam Trà (Z: 812..852)
    if (vx > -140 && vx < -30 && vz > 810 && vz < 852) {
      const vCenter = 832;
      const vRadius = 20;
      const distFromV = Math.abs(vz - vCenter);
      if (distFromV < vRadius) {
        // Smooth valley profile: 0 at center, 1 at valley rim (zero cliff at edge)
        const vFactor = Math.sin((distFromV / vRadius) * (Math.PI / 2));
        const tEast = (vx - (-140)) / 110; // 0 at village, 1 towards east
        const baseFloor = 25.0 - tEast * 13.0; // 25m at village, 12m at east
        const targetValleyElev = baseFloor + (elevation - baseFloor) * Math.pow(vFactor, 2.0);
        elevation = Math.min(elevation, targetValleyElev);
      }
    }
    // Cap highest peak to 88.0 units (representing 953m real-world summit)
    elevation = Math.min(elevation, 88.0);
  }

  // C. Tam Sơn Highland Ridges (Cradling the Lake on West, North & East)
  if (vx < -20 && vz > 620 && vz < 780) {
    // West/Northwest ridge
    const distTSRidge = Math.hypot(vx - (-125), vz - 685);
    if (distTSRidge < 90) {
      const falloff = Math.cos((distTSRidge / 90) * (Math.PI / 2));
      elevation += Math.pow(falloff, 1.6) * 38;
    }
    // North ridge
    const distTSNorth = Math.hypot(vx - (-70), vz - 640);
    if (distTSNorth < 75) {
      const falloff = Math.cos((distTSNorth / 75) * (Math.PI / 2));
      elevation += Math.pow(falloff, 1.5) * 32;
    }
  }

  // D. Tam Thạnh Hills (X: 10..85, Z: 620..740)
  if (vx > 10 && vx < 90 && vz > 620 && vz < 740) {
    const distThanh = Math.hypot(vx - 50, vz - 675);
    if (distThanh < 65) {
      const falloff = Math.cos((distThanh / 65) * (Math.PI / 2));
      elevation += Math.pow(falloff, 1.5) * 26;
    }
  }

  // E. Tam Mỹ Tây & Hố Giang Thơm Granite Ridge (X: -30..45, Z: 770..870)
  if (vx > -30 && vx < 45 && vz > 770 && vz < 870) {
    const distTMT = Math.hypot(vx - 10, vz - 820);
    if (distTMT < 70) {
      const falloff = Math.cos((distTMT / 70) * (Math.PI / 2));
      elevation += Math.pow(falloff, 1.5) * 28;
    }
  }

  // F. Tam Sơn Elevated Mountain Reservoir Basin (Hồ Hố Khế / Phú Ninh)
  // Perfectly smooth, natural amphitheater: Lakebed at 9.5m, Water level at 12.0m, Shoreline at 12.0m,
  // transitioning continuously and gently up to surrounding hills across radius 95m (NO cliffs, NO craters!)
  const distSonLake = Math.hypot(vx - (-72), vz - 712);
  if (distSonLake < 46) {
    // Inside the lake basin: smooth gentle bowl from 9.5m at center to 12.0m at shoreline
    const basinDepth = 9.5 + 2.5 * Math.pow(distSonLake / 46, 2.0);
    elevation = Math.min(elevation, basinDepth);
  } else if (distSonLake < 95) {
    // Gentle shoreline-to-mountain transition zone (46m to 95m)
    const t = (distSonLake - 46) / 49;
    const smoothFactor = Math.sin(t * (Math.PI / 2)); // 0 at shore (12m), 1 at outer hills
    const blendedElevation = 12.0 + Math.max(0, elevation - 12.0) * smoothFactor;
    elevation = Math.min(elevation, blendedElevation);
  }

  // Dam spillway throat & downstream discharge channel for Tam Sơn (X: -34..-15, Z: 708..718)
  if (vx > -34 && vx < -12 && Math.abs(vz - 712) < 18) {
    const streamDist = Math.abs(vz - 712);
    const progress = (vx - (-34)) / 22; // 0 at dam face, 1 downstream
    const downstreamElev = 11.2 - progress * 7.5 + (streamDist / 18) * 3.5;
    elevation = Math.min(elevation, downstreamElev);
  }

  // Tam Thạnh Lake
  const distThanhLake = Math.hypot(vx - 65, vz - 645);
  if (distThanhLake < 36) elevation = Math.min(elevation, 1.2);

  // G. Riverbeds
  if (vx > 130 && vx < 280 && Math.abs(vz - 815) < 14) elevation = Math.min(elevation, 0.4);
  if (vx > 330 && vx < 400 && vz > 500 && vz < 760) {
    const distTG = Math.abs((vx - 360) - (vz - 600) * 0.15);
    if (distTG < 16) elevation = Math.min(elevation, 0.4);
  }

  // H. An Hòa Bay & Tam Hải Barrier Island
  if (vx > 290 && vx < 540 && vz > 710 && vz < 960) {
    const distTamHai = Math.hypot(vx - 450, vz - 880);
    if (distTamHai < 55) {
      const islandHeight = (1 - distTamHai / 55) * 4.2 + 1.8;
      const isBanThanCape = vx > 470 && vz > 890;
      elevation = isBanThanCape ? 7.5 : islandHeight;
    } else {
      elevation = 0.3;
    }
  }

  // I. Base Alluvial Plain
  if (elevation === 0) elevation = 2.4;

  // J. Smooth Beveled Pedestal Edge at Boundary
  if (distToEdge < 18) {
    const edgeBevel = Math.max(0, Math.min(1, distToEdge / 18));
    elevation *= edgeBevel;
  }

  return elevation;
}

/**
 * Photorealistic 3D Topographical Relief Terrain Engine
 * Built strictly according to real-world geography and the artistic aesthetics of duancuulong.com
 */
export class ReliefTerrain {
  public group = new THREE.Group();

  public terrainMesh!: THREE.Mesh;
  public parchmentMesh!: THREE.Mesh;
  public boundaryRibbon!: THREE.Mesh;
  public boundaryInnerLine!: THREE.Line;
  public terrainTexture!: THREE.CanvasTexture;
  private terrainCanvas!: HTMLCanvasElement;
  private terrainCtx!: CanvasRenderingContext2D;

  // Relief bounds focused on Nui Thanh (X: -260..580, Z: 440..1080)
  private minX = -260;
  private maxX = 580;
  private minZ = 440;
  private maxZ = 1080;
  private segments = 256;

  // Parchment plane bounds perfectly framing the camera view
  private pWidth = 2600;
  private pDepth = 2600;
  private pCenterX = 170;
  private pCenterZ = 760;

  constructor() {
    this.buildAntiqueParchmentBase();
    this.buildTopographicalReliefMesh();
    this.buildTerritorialBoundaryRibbon();
  }

  public getElevationAt(vx: number, vz: number): number {
    return getNuiThanhElevation(vx, vz);
  }

  /**
   * 1. Historical French Indochina Cartographic Parchment Atlas Base (duancuulong.com signature aesthetic)
   * Precisely scaled so calligraphy, compass rose, rhumb lines & title cartouche frame Nui Thanh!
   */
  private buildAntiqueParchmentBase(): void {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 4096;
    pCanvas.height = 4096;
    const ctx = pCanvas.getContext('2d')!;

    // Coordinate mapping: World (X: pCenterX ± pWidth/2, Z: pCenterZ ± pDepth/2) -> Canvas (0..4096)
    const pMinX = this.pCenterX - this.pWidth / 2; // -1130
    const pMaxX = this.pCenterX + this.pWidth / 2; // +1470
    const pMinZ = this.pCenterZ - this.pDepth / 2; // -540
    const pMaxZ = this.pCenterZ + this.pDepth / 2; // +2060

    const toPX = (wx: number) => ((wx - pMinX) / (pMaxX - pMinX)) * 4096;
    const toPY = (wz: number) => ((wz - pMinZ) / (pMaxZ - pMinZ)) * 4096;

    // 1. Aged ivory/cream parchment base (#efe6d2 to #ede3cd)
    ctx.fillStyle = '#efe6d2';
    ctx.fillRect(0, 0, 4096, 4096);

    // Subtle radial age patina & tea-stain vignette
    const grad = ctx.createRadialGradient(2048, 2048, 600, 2048, 2048, 2500);
    grad.addColorStop(0, 'rgba(255, 252, 244, 0.1)');
    grad.addColorStop(0.6, 'rgba(235, 222, 195, 0.45)');
    grad.addColorStop(0.85, 'rgba(215, 198, 168, 0.75)');
    grad.addColorStop(1, 'rgba(178, 150, 115, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4096, 4096);

    // Classical cartographic double-line outer border frame
    ctx.strokeStyle = 'rgba(110, 85, 55, 0.7)';
    ctx.lineWidth = 6;
    ctx.strokeRect(100, 100, 4096 - 200, 4096 - 200);
    ctx.lineWidth = 2;
    ctx.strokeRect(124, 124, 4096 - 248, 4096 - 248);

    // Corner rosettes
    const corners = [
      [124, 124],
      [4096 - 124, 124],
      [124, 4096 - 124],
      [4096 - 124, 4096 - 124],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = 'rgba(120, 90, 55, 0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fill();
    });

    // Latitude & Longitude graticule grid lines
    ctx.strokeStyle = 'rgba(130, 100, 70, 0.16)';
    ctx.lineWidth = 1.4;
    for (let x = 400; x < 4096; x += 400) {
      ctx.beginPath();
      ctx.moveTo(x, 124);
      ctx.lineTo(x, 4096 - 124);
      ctx.stroke();
    }
    for (let y = 400; y < 4096; y += 400) {
      ctx.beginPath();
      ctx.moveTo(124, y);
      ctx.lineTo(4096 - 124, y);
      ctx.stroke();
    }

    // Latitude / Longitude degree labels in classical serif
    ctx.font = '500 26px "EB Garamond", "Times New Roman", serif';
    ctx.fillStyle = 'rgba(110, 80, 45, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('15°15\' N', 160, 1200);
    ctx.fillText('15°25\' N', 160, 2048);
    ctx.fillText('15°35\' N', 160, 2900);
    ctx.fillText('108°30\' E', 1200, 160);
    ctx.fillText('108°40\' E', 2048, 160);
    ctx.fillText('108°50\' E', 2900, 160);

    // ==========================================
    // GEOGRAPHIC ELEMENTS POSITIONED RIGHT AROUND NÚI THÀNH!
    // ==========================================

    // 1. EAST SEA (BIỂN ĐÔNG) OFF TAM TIẾN & TAM HẢI (X: 2800..3800, Y: 1600..2800)
    const seaCenterX = toPX(720);
    const seaCenterY = toPY(780);

    // Antique nautical compass rose (Hoa tiêu hàng hải) directly visible off the coast!
    this.drawAntiqueCompassRose(ctx, seaCenterX, seaCenterY, 260);

    // Fine antique nautical rhumb lines radiating outward across the ocean
    ctx.strokeStyle = 'rgba(140, 105, 70, 0.18)';
    ctx.lineWidth = 1.3;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      ctx.beginPath();
      ctx.moveTo(seaCenterX, seaCenterY);
      ctx.lineTo(seaCenterX + Math.cos(a) * 1800, seaCenterY + Math.sin(a) * 1800);
      ctx.stroke();
    }

    // Historical sailing ship cruising on the water
    this.drawAntiqueSailingShip(ctx, seaCenterX - 220, seaCenterY + 380, 100);

    // Ocean Calligraphy
    ctx.font = 'italic bold 52px "EB Garamond", "Playfair Display", serif';
    ctx.fillStyle = 'rgba(88, 62, 38, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('B I Ể N   Đ Ô N G   ( E A S T   S E A )', seaCenterX, seaCenterY - 320);

    ctx.font = 'italic 30px "EB Garamond", serif';
    ctx.fillText('M E R   D E   C H I N E   ·   Q U Ầ N   Đ Ả O   H O À N G   S A', seaCenterX, seaCenterY - 270);

    // 2. NORTH: THÀNH PHỐ TAM KỲ (Directly north of Tam Xuân: Z = 400..450)
    const tamKyY = toPY(410);
    ctx.font = 'italic bold 44px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(92, 65, 40, 0.75)';
    ctx.fillText('T H À N H   P H Ô   T A M   K Ỳ   ( K Ỳ   A N H )', toPX(180), tamKyY);

    ctx.font = 'italic 28px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(115, 85, 55, 0.7)';
    ctx.fillText('Sông Bàn Thạch  ·  Huyện Phú Ninh  ·  Hồ Phú Ninh  ·  Hướng về TP. Đà Nẵng', toPX(180), tamKyY + 44);

    // 3. SOUTH: TỈNH QUẢNG NGÃI & DUNG QUẤT (Directly south of Tam Nghĩa: Z = 1110..1160)
    const quangNgaiY = toPY(1120);
    ctx.font = 'italic bold 44px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(92, 65, 40, 0.75)';
    ctx.fillText('T Ỉ N H   Q U Ả N G   N G Ã I', toPX(180), quangNgaiY);

    ctx.font = 'italic 28px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(115, 85, 55, 0.7)';
    ctx.fillText('Huyện Bình Sơn  ·  Khu Kinh Tế Dung Quất  ·  Sông Trà Bồng  ·  Dốc Sỏi', toPX(180), quangNgaiY + 44);

    // 4. WEST: DÃY TRƯỜNG SƠN & BẮC TRÀ MY (Directly west of Tam Trà / Tam Sơn: X = -320..-240)
    const truongSonX = toPX(-280);
    ctx.save();
    ctx.translate(truongSonX, toPY(780));
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'italic bold 44px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(92, 65, 40, 0.75)';
    ctx.fillText('D Ã Y   T R Ư Ờ N G   S Ơ N   H Ù N G   V Ĩ', 0, 0);

    ctx.font = 'italic 28px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(115, 85, 55, 0.7)';
    ctx.fillText('Huyện Bắc Trà My  ·  Huyện Tiên Phước', 0, 42);
    ctx.restore();

    // Mountain hachures (ink contour hatchings) in the outer western mountain areas
    this.drawMountainHachures(ctx, toPX(-460), toPY(660), 180, 420);

    // 5. CLASSICAL TITLE CARTOUCHE (Top Left: X = -550, Z = 280)
    this.drawCartouche(ctx, toPX(-560), toPY(260), 540, 220);

    const pTex = new THREE.CanvasTexture(pCanvas);
    pTex.wrapS = THREE.ClampToEdgeWrapping;
    pTex.wrapT = THREE.ClampToEdgeWrapping;

    const pGeo = new THREE.PlaneGeometry(this.pWidth, this.pDepth);
    pGeo.rotateX(-Math.PI / 2);

    const pMat = new THREE.MeshStandardMaterial({
      map: pTex,
      roughness: 0.94,
      metalness: 0.04,
    });

    this.parchmentMesh = new THREE.Mesh(pGeo, pMat);
    this.parchmentMesh.position.set(this.pCenterX, 0.0, this.pCenterZ);
    this.parchmentMesh.receiveShadow = true;
    this.group.add(this.parchmentMesh);
  }

  /**
   * 2. True 3D Topographical DEM Mesh sculpted strictly for Huyện Núi Thành
   */
  private buildTopographicalReliefMesh(): void {
    const width = this.maxX - this.minX; // 840
    const depth = this.maxZ - this.minZ; // 640
    const centerX = (this.minX + this.maxX) / 2; // 160
    const centerZ = (this.minZ + this.maxZ) / 2; // 760

    const geo = new THREE.PlaneGeometry(width, depth, this.segments, this.segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const vertexCount = pos.count;

    for (let i = 0; i < vertexCount; i++) {
      const vx = pos.getX(i) + centerX;
      const vz = pos.getZ(i) + centerZ;

      const isInside = isPointInPolygon(vx, vz, NUI_THANH_OUTER_POLYGON);

      let elevation = -5.0; // Outside: dropped below parchment plane
      if (isInside) {
        elevation = this.getElevationAt(vx, vz);
      }

      pos.setY(i, elevation);
    }

    geo.computeVertexNormals();

    this.terrainTexture = this.generateReliefTexture();

    const mat = new THREE.MeshStandardMaterial({
      map: this.terrainTexture,
      roughness: 0.82,
      metalness: 0.05,
      transparent: true,
      alphaTest: 0.02, // Completely discards outside pixels!
    });

    this.terrainMesh = new THREE.Mesh(geo, mat);
    this.terrainMesh.position.set(centerX, 0, centerZ);
    this.terrainMesh.receiveShadow = true;
    this.terrainMesh.castShadow = true;
    this.group.add(this.terrainMesh);
  }

  /**
   * Generates high-resolution organic GIS topographical & satellite orthophoto texture
   * Layered with authentic agricultural parcels, coastal waters, and glowing cartographic roads
   */
  private generateReliefTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 4096;
    const ctx = canvas.getContext('2d')!;

    this.terrainCanvas = canvas;
    this.terrainCtx = ctx;

    const toX = (vx: number) => ((vx - this.minX) / (this.maxX - this.minX)) * 4096;
    const toY = (vz: number) => ((vz - this.minZ) / (this.maxZ - this.minZ)) * 4096;

    // 1. Initial High-Quality Procedural Satellite Base Fill
    this.renderProceduralBaseSatelliteTerrain(ctx, toX, toY);

    // 2. Glowing Cartographic Road Network & Arterials
    this.renderRoadNetworkAndFeatures(ctx, toX, toY);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    this.terrainTexture = tex;

    // 3. Asynchronously load authentic ESRI Satellite Orthophoto tiles and composite underneath roads
    this.loadSatelliteTilesAndRender(toX, toY);

    return tex;
  }

  /**
   * Loads 54 authentic high-resolution satellite orthophoto tiles covering Nui Thanh
   * Composited seamlessly within the territorial boundary polygon
   */
  private loadSatelliteTilesAndRender(
    toX: (vx: number) => number,
    toY: (vz: number) => number
  ): void {
    const minTileX = 6562;
    const maxTileX = 6570; // 9 columns
    const minTileY = 3737;
    const maxTileY = 3742; // 6 rows
    const totalCols = maxTileX - minTileX + 1;
    const totalRows = maxTileY - minTileY + 1;
    const totalTiles = totalCols * totalRows;

    const tileCanvasStartX = toX(-265.2);
    const tileCanvasEndX = toX(570.9);
    const tileCanvasStartY = toY(464.2);
    const tileCanvasEndY = toY(1077.0);
    const tileW = (tileCanvasEndX - tileCanvasStartX) / totalCols;
    const tileH = (tileCanvasEndY - tileCanvasStartY) / totalRows;

    let loadedCount = 0;
    const tileImgs: { col: number; row: number; img: HTMLImageElement }[] = [];

    for (let c = 0; c < totalCols; c++) {
      for (let r = 0; r < totalRows; r++) {
        const tx = minTileX + c;
        const ty = minTileY + r;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = `/textures/satellite_tiles/tile_13_${tx}_${ty}.jpg`;

        const onDone = () => {
          loadedCount++;
          if (loadedCount === totalTiles) {
            this.compositeSatelliteAndRoads(tileImgs, toX, toY, tileCanvasStartX, tileCanvasStartY, tileW, tileH);
          }
        };

        img.onload = () => {
          tileImgs.push({ col: c, row: r, img });
          onDone();
        };
        img.onerror = () => {
          onDone();
        };
      }
    }
  }

  private compositeSatelliteAndRoads(
    tiles: { col: number; row: number; img: HTMLImageElement }[],
    toX: (vx: number) => number,
    toY: (vz: number) => number,
    startX: number,
    startY: number,
    tileW: number,
    tileH: number
  ): void {
    const ctx = this.terrainCtx;
    if (!ctx) return;

    ctx.save();
    // 1. Clip strictly to Nui Thanh outer boundary
    ctx.beginPath();
    const polyStart = NUI_THANH_OUTER_POLYGON[0];
    ctx.moveTo(toX(polyStart[0]), toY(polyStart[1]));
    for (let p = 1; p < NUI_THANH_OUTER_POLYGON.length; p++) {
      ctx.lineTo(toX(NUI_THANH_OUTER_POLYGON[p][0]), toY(NUI_THANH_OUTER_POLYGON[p][1]));
    }
    ctx.closePath();
    ctx.clip();

    // 2. Draw all 54 satellite orthophoto tiles
    tiles.forEach((t) => {
      const dx = startX + t.col * tileW;
      const dy = startY + t.row * tileH;
      ctx.drawImage(t.img, dx - 0.8, dy - 0.8, tileW + 1.6, tileH + 1.6);
    });

    // 3. Subtle photographic tone enrichment
    ctx.fillStyle = 'rgba(15, 38, 12, 0.06)';
    ctx.fillRect(0, 0, 4096, 4096);

    // 4. Paint the glowing cartographic road network, airport runways & calligraphy on top
    this.renderRoadNetworkAndFeatures(ctx, toX, toY);

    ctx.restore();

    this.terrainTexture.needsUpdate = true;
  }

  /**
   * Initial Procedural Satellite Base Fill (Active before orthophoto tiles complete)
   */
  private renderProceduralBaseSatelliteTerrain(
    ctx: CanvasRenderingContext2D,
    toX: (vx: number) => number,
    toY: (vz: number) => number
  ): void {
    ctx.clearRect(0, 0, 4096, 4096);

    ctx.save();
    ctx.beginPath();
    const polyStart = NUI_THANH_OUTER_POLYGON[0];
    ctx.moveTo(toX(polyStart[0]), toY(polyStart[1]));
    for (let p = 1; p < NUI_THANH_OUTER_POLYGON.length; p++) {
      ctx.lineTo(toX(NUI_THANH_OUTER_POLYGON[p][0]), toY(NUI_THANH_OUTER_POLYGON[p][1]));
    }
    ctx.closePath();
    ctx.clip();

    // Natural Soil & Canopy Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, 4096, 4096);
    baseGrad.addColorStop(0, '#1c3619');    // Dark forest northwest
    baseGrad.addColorStop(0.35, '#28461f'); // Highland slope
    baseGrad.addColorStop(0.65, '#3b5c2a'); // Alluvial valley
    baseGrad.addColorStop(0.85, '#456631'); // Coastal plain
    baseGrad.addColorStop(1, '#385526');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 4096, 4096);

    // High-Density Agricultural Rice Paddy Mosaic
    const fieldColors = [
      '#446927', '#4f752e', '#5e8536', '#6e963e',
      '#789c44', '#3d5c22', '#4b692b', '#829c4f',
    ];
    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    this.renderFieldPatch(ctx, toX(30), toY(490), toX(250) - toX(30), toY(580) - toY(490), fieldColors, rnd, 26, 18);
    this.renderFieldPatch(ctx, toX(120), toY(580), toX(270) - toX(120), toY(690) - toY(580), fieldColors, rnd, 24, 18);
    this.renderFieldPatch(ctx, toX(70), toY(690), toX(230) - toX(70), toY(780) - toY(690), fieldColors, rnd, 24, 16);
    this.renderFieldPatch(ctx, toX(90), toY(780), toX(230) - toX(90), toY(880) - toY(780), fieldColors, rnd, 22, 16);

    // Coastal Aquaculture Shrimp Ponds
    const pondWaterColors = ['#154b59', '#195566', '#1e6275', '#247085'];
    this.renderShrimpPondGrid(ctx, toX(280), toY(520), 220, 320, pondWaterColors, rnd);
    this.renderShrimpPondGrid(ctx, toX(310), toY(610), 240, 340, pondWaterColors, rnd);
    this.renderShrimpPondGrid(ctx, toX(250), toY(780), 180, 220, pondWaterColors, rnd);

    // Mountain Forests
    const mountainForests = [
      { x: toX(-100), y: toY(860), r: 750 },
      { x: toX(-120), y: toY(890), r: 620 },
      { x: toX(-80), y: toY(710), r: 520 },
      { x: toX(50), y: toY(680), r: 420 },
      { x: toX(15), y: toY(820), r: 380 },
    ];
    mountainForests.forEach((f) => {
      const fGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      fGrad.addColorStop(0, '#0a1a0c');
      fGrad.addColorStop(0.35, '#132815');
      fGrad.addColorStop(0.68, '#1d3a1f');
      fGrad.addColorStop(1, 'rgba(40, 70, 35, 0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Red Basalt Soil
    const bazanSpots = [
      { x: toX(35), y: toY(710), r: 260, color: '#6d2e1b' },
      { x: toX(65), y: toY(650), r: 240, color: '#7a3520' },
      { x: toX(10), y: toY(820), r: 250, color: '#662917' },
    ];
    bazanSpots.forEach((b) => {
      const bGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      bGrad.addColorStop(0, b.color);
      bGrad.addColorStop(0.35, 'rgba(122, 53, 32, 0.45)');
      bGrad.addColorStop(1, 'rgba(90, 110, 40, 0)');
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Coastal Waters & Vịnh An Hòa
    const oceanGrad = ctx.createLinearGradient(toX(320), 0, 4096, 4096);
    oceanGrad.addColorStop(0, 'rgba(18, 75, 98, 0)');
    oceanGrad.addColorStop(0.2, 'rgba(14, 62, 84, 0.7)');
    oceanGrad.addColorStop(0.5, '#0f445c');
    oceanGrad.addColorStop(1, '#092a3a');
    ctx.fillStyle = oceanGrad;
    ctx.beginPath();
    ctx.moveTo(toX(320), toY(440));
    ctx.quadraticCurveTo(toX(350), toY(550), toX(380), toY(700));
    ctx.quadraticCurveTo(toX(330), toY(820), toX(380), toY(940));
    ctx.lineTo(toX(520), toY(1050));
    ctx.lineTo(4096, toY(1050));
    ctx.lineTo(4096, 0);
    ctx.closePath();
    ctx.fill();

    // Pristine Sandy Dunes
    const sandGrad = ctx.createLinearGradient(toX(280), 0, toX(480), 4096);
    sandGrad.addColorStop(0, 'rgba(238, 222, 192, 0.92)');
    sandGrad.addColorStop(0.5, 'rgba(230, 210, 175, 0.95)');
    sandGrad.addColorStop(1, 'rgba(218, 195, 155, 0.92)');
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(toX(290), toY(440));
    ctx.quadraticCurveTo(toX(320), toY(550), toX(355), toY(680));
    ctx.quadraticCurveTo(toX(410), toY(780), toX(445), toY(840));
    ctx.lineTo(toX(420), toY(850));
    ctx.quadraticCurveTo(toX(375), toY(760), toX(335), toY(660));
    ctx.quadraticCurveTo(toX(300), toY(550), toX(270), toY(440));
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Signature DuAnCuuLong Glowing Cartographic Road Network & Aviation Features
   */
  private renderRoadNetworkAndFeatures(
    ctx: CanvasRenderingContext2D,
    toX: (vx: number) => number,
    toY: (vz: number) => number
  ): void {
    ctx.save();

    // 1. Delicate Inter-Commune & Local Street Grid Web (17 Communes)
    ctx.strokeStyle = 'rgba(255, 252, 235, 0.78)';
    ctx.lineWidth = 3.2;

    const minorRoads = [
      // Tam Xuân 1 - Tam Xuân 2
      [[210, 525], [140, 530], [75, 530], [25, 520]],
      // Tam Xuân 2 to Tam Thạnh / Thái Xuân
      [[75, 530], [65, 590], [55, 640]],
      // Tam Thạnh to Tam Sơn lake
      [[55, 640], [20, 670], [-25, 690], [-75, 715]],
      // Tam Tiến coastal village network
      [[300, 500], [360, 540], [365, 555], [375, 590]],
      // Tam Tiến to Tam Hòa
      [[365, 555], [360, 620], [360, 655], [350, 690]],
      // Tam Hòa to Tam Giang
      [[360, 655], [340, 720], [335, 765], [280, 805]],
      // Tam Anh Bắc rural grid
      [[150, 590], [215, 595], [260, 595]],
      [[180, 560], [185, 630]],
      // Tam Anh Nam to Tam Hiệp
      [[150, 650], [218, 655], [265, 660]],
      [[195, 660], [230, 690], [250, 725]],
      // THACO Chu Lai Industrial grid
      [[240, 705], [320, 705]],
      [[240, 735], [320, 735]],
      [[240, 750], [320, 750]],
      [[265, 690], [265, 760]],
      [[295, 690], [295, 760]],
      // TT. Núi Thành urban streets along Sông An Tân
      [[180, 790], [235, 790]],
      [[175, 815], [235, 815]],
      [[180, 835], [235, 835]],
      [[195, 770], [195, 840]],
      // Tam Mỹ Đông to Tam Mỹ Tây
      [[220, 825], [140, 820], [80, 820], [25, 830]],
      [[25, 830], [30, 850], [35, 860]],
      // Tam Mỹ Tây into Tam Trà mountains
      [[25, 830], [-30, 845], [-75, 860], [-120, 875]],
      // Tam Trà village paths
      [[-120, 875], [-140, 880]],
      [[-120, 875], [-110, 850]],
      // Tam Hải Island Ring Road
      [[410, 840], [440, 830], [480, 850], [500, 880], [480, 920], [440, 925], [415, 880], [410, 840]],
      // Tam Quang port access roads
      [[330, 840], [360, 835], [380, 850]],
      // Tam Nghĩa / Chu Lai village lanes
      [[225, 920], [180, 930], [160, 960]],
      [[225, 960], [240, 980]],
    ];

    minorRoads.forEach((pts) => {
      ctx.beginPath();
      ctx.moveTo(toX(pts[0][0]), toY(pts[0][1]));
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(toX(pts[i][0]), toY(pts[i][1]));
      }
      ctx.stroke();
    });

    // 2. North-South Railway Line (Đường Sắt Bắc Nam X = 208)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3.6;
    ctx.beginPath();
    ctx.moveTo(toX(208), toY(440));
    ctx.quadraticCurveTo(toX(208), toY(600), toX(208), toY(800));
    ctx.lineTo(toX(208), toY(1050));
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(toX(208), toY(440));
    ctx.quadraticCurveTo(toX(208), toY(600), toX(208), toY(800));
    ctx.lineTo(toX(208), toY(1050));
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Chu Lai International Airport Runway (Đường Băng 4.050m)
    const rwyStartX = toX(265);
    const rwyStartY = toY(895);
    const rwyEndX = toX(285);
    const rwyEndY = toY(985);

    // Runway apron pad
    ctx.fillStyle = '#374151';
    ctx.fillRect(rwyStartX - 42, rwyStartY + 40, 32, 50);

    // Parallel taxiway
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(rwyStartX - 16, rwyStartY + 20);
    ctx.lineTo(rwyEndX - 16, rwyEndY - 20);
    ctx.stroke();

    // High speed exits
    [0.3, 0.5, 0.7].forEach((t) => {
      const rx = rwyStartX + (rwyEndX - rwyStartX) * t;
      const ry = rwyStartY + (rwyEndY - rwyStartY) * t;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 16, ry);
      ctx.stroke();
    });

    // Main 4.050m Runway tarmac
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(rwyStartX, rwyStartY);
    ctx.lineTo(rwyEndX, rwyEndY);
    ctx.stroke();

    // Runway white centerline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.2;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.moveTo(rwyStartX, rwyStartY + 8);
    ctx.lineTo(rwyEndX, rwyEndY - 8);
    ctx.stroke();
    ctx.setLineDash([]);

    // Runway threshold stripes
    [-1, 1].forEach((dir) => {
      const py = dir === -1 ? rwyStartY + 3 : rwyEndY - 3;
      const px = dir === -1 ? rwyStartX : rwyEndX;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.6;
      for (let o = -6; o <= 6; o += 3) {
        ctx.beginPath();
        ctx.moveTo(px + o, py - 3);
        ctx.lineTo(px + o, py + 3);
        ctx.stroke();
      }
    });

    // 4. Đường Tỉnh ĐT618 (Cảng Chu Lai - KCN THACO - Cao Tốc)
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(toX(55), toY(720));
    ctx.lineTo(toX(480), toY(720));
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6.8;
    ctx.beginPath();
    ctx.moveTo(toX(55), toY(720));
    ctx.lineTo(toX(480), toY(720));
    ctx.stroke();

    ctx.strokeStyle = '#fef9c3';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(toX(55), toY(720));
    ctx.lineTo(toX(480), toY(720));
    ctx.stroke();

    // 5. Đường Tỉnh ĐT617 (Kỳ Hà - Núi Thành - Tam Trà - Trà Bồng)
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(toX(330), toY(825));
    ctx.lineTo(toX(220), toY(825));
    ctx.quadraticCurveTo(toX(140), toY(820), toX(25), toY(830));
    ctx.quadraticCurveTo(toX(-45), toY(850), toX(-120), toY(875));
    ctx.lineTo(toX(-200), toY(890));
    ctx.stroke();

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 6.2;
    ctx.beginPath();
    ctx.moveTo(toX(330), toY(825));
    ctx.lineTo(toX(220), toY(825));
    ctx.quadraticCurveTo(toX(140), toY(820), toX(25), toY(830));
    ctx.quadraticCurveTo(toX(-45), toY(850), toX(-120), toY(875));
    ctx.lineTo(toX(-200), toY(890));
    ctx.stroke();

    ctx.strokeStyle = '#fef9c3';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(toX(330), toY(825));
    ctx.lineTo(toX(220), toY(825));
    ctx.quadraticCurveTo(toX(140), toY(820), toX(25), toY(830));
    ctx.quadraticCurveTo(toX(-45), toY(850), toX(-120), toY(875));
    ctx.lineTo(toX(-200), toY(890));
    ctx.stroke();

    // 6. Đường Tỉnh ĐT620 (Tam Quang & Kỳ Hà)
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(toX(225), toY(870));
    ctx.quadraticCurveTo(toX(280), toY(865), toX(330), toY(855));
    ctx.lineTo(toX(350), toY(830));
    ctx.stroke();

    // 7. Cao Tốc Đà Nẵng - Quảng Ngãi (Orange Glowing Highway)
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.45)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(toX(70), toY(440));
    ctx.quadraticCurveTo(toX(85), toY(570), toX(95), toY(660));
    ctx.quadraticCurveTo(toX(108), toY(740), toX(122), toY(820));
    ctx.quadraticCurveTo(toX(135), toY(930), toX(142), toY(1050));
    ctx.stroke();

    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 8.5;
    ctx.beginPath();
    ctx.moveTo(toX(70), toY(440));
    ctx.quadraticCurveTo(toX(85), toY(570), toX(95), toY(660));
    ctx.quadraticCurveTo(toX(108), toY(740), toX(122), toY(820));
    ctx.quadraticCurveTo(toX(135), toY(930), toX(142), toY(1050));
    ctx.stroke();

    ctx.strokeStyle = '#ffedd5';
    ctx.lineWidth = 3.6;
    ctx.beginPath();
    ctx.moveTo(toX(70), toY(440));
    ctx.quadraticCurveTo(toX(85), toY(570), toX(95), toY(660));
    ctx.quadraticCurveTo(toX(108), toY(740), toX(122), toY(820));
    ctx.quadraticCurveTo(toX(135), toY(930), toX(142), toY(1050));
    ctx.stroke();

    // Interchange loops on Expressway
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(toX(85), toY(540), 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(toX(108), toY(730), 25, 0, Math.PI * 2);
    ctx.stroke();

    // 8. Tuyến Ven Biển 129 (Võ Chí Công - Amber Coastal Boulevard)
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
    ctx.lineWidth = 13;
    ctx.beginPath();
    ctx.moveTo(toX(300), toY(440));
    ctx.quadraticCurveTo(toX(325), toY(560), toX(340), toY(670));
    ctx.quadraticCurveTo(toX(342), toY(750), toX(330), toY(840));
    ctx.quadraticCurveTo(toX(320), toY(875), toX(285), toY(925));
    ctx.stroke();

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 7.8;
    ctx.beginPath();
    ctx.moveTo(toX(300), toY(440));
    ctx.quadraticCurveTo(toX(325), toY(560), toX(340), toY(670));
    ctx.quadraticCurveTo(toX(342), toY(750), toX(330), toY(840));
    ctx.quadraticCurveTo(toX(320), toY(875), toX(285), toY(925));
    ctx.stroke();

    ctx.strokeStyle = '#fffbeb';
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(toX(300), toY(440));
    ctx.quadraticCurveTo(toX(325), toY(560), toX(340), toY(670));
    ctx.quadraticCurveTo(toX(342), toY(750), toX(330), toY(840));
    ctx.quadraticCurveTo(toX(320), toY(875), toX(285), toY(925));
    ctx.stroke();

    // 9. National Highway 1A (Quốc Lộ 1A - Radiant Gold Spine)
    ctx.strokeStyle = 'rgba(255, 179, 0, 0.48)';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(toX(210), toY(440));
    ctx.quadraticCurveTo(toX(214), toY(560), toX(218), toY(650));
    ctx.quadraticCurveTo(toX(220), toY(720), toX(220), toY(800));
    ctx.quadraticCurveTo(toX(225), toY(920), toX(228), toY(1050));
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 9.5;
    ctx.beginPath();
    ctx.moveTo(toX(210), toY(440));
    ctx.quadraticCurveTo(toX(214), toY(560), toX(218), toY(650));
    ctx.quadraticCurveTo(toX(220), toY(720), toX(220), toY(800));
    ctx.quadraticCurveTo(toX(225), toY(920), toX(228), toY(1050));
    ctx.stroke();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 4.8;
    ctx.beginPath();
    ctx.moveTo(toX(210), toY(440));
    ctx.quadraticCurveTo(toX(214), toY(560), toX(218), toY(650));
    ctx.quadraticCurveTo(toX(220), toY(720), toX(220), toY(800));
    ctx.quadraticCurveTo(toX(225), toY(920), toX(228), toY(1050));
    ctx.stroke();

    // QL1A white center dashed divider
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.3;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(toX(210), toY(440));
    ctx.quadraticCurveTo(toX(214), toY(560), toX(218), toY(650));
    ctx.quadraticCurveTo(toX(220), toY(720), toX(220), toY(800));
    ctx.quadraticCurveTo(toX(225), toY(920), toX(228), toY(1050));
    ctx.stroke();
    ctx.setLineDash([]);

    // Roundabout 2-tier Overpass at Cây Xương Rồng (Tam Hiệp)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(toX(220), toY(720), 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(toX(220), toY(720), 28, 0, Math.PI * 2);
    ctx.stroke();

    // 10. Cartographic Road Extension Indicators into Parchment (Phong cách Bản Đồ Cổ Đông Dương)
    ctx.font = 'bold italic 20px "EB Garamond", serif';
    ctx.textAlign = 'center';

    // North QL1A to Tam Kỳ
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(toX(210), toY(490));
    ctx.lineTo(toX(210), toY(420));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#6b4f2c';
    ctx.fillText('← ĐI TP. TAM KỲ (QL1A)', toX(210), toY(405));

    // North Expressway to Da Nang
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(toX(70), toY(490));
    ctx.lineTo(toX(65), toY(420));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#8c3b12';
    ctx.fillText('← ĐI TP. ĐÀ NẴNG (CAO TỐC)', toX(65), toY(405));

    // South QL1A to Quang Ngai
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(toX(228), toY(1045));
    ctx.lineTo(toX(230), toY(1110));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#6b4f2c';
    ctx.fillText('→ ĐI TỈNH QUẢNG NGÃI (QL1A & DỐC SỎI)', toX(230), toY(1135));

    // West DT617 to Tra Bong
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(toX(-200), toY(890));
    ctx.lineTo(toX(-250), toY(895));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#6b4f2c';
    ctx.fillText('← ĐI HUYỆN TRÀ BỒNG (ĐT617)', toX(-235), toY(920));

    ctx.restore();
  }

  private renderFieldPatch(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    w: number,
    h: number,
    colors: string[],
    rnd: () => number,
    cols: number,
    rows: number
  ): void {
    const colW = w / cols;
    const rowH = h / rows;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const px = startX + c * colW + (rnd() - 0.5) * 5;
        const py = startY + r * rowH + (rnd() - 0.5) * 5;
        const pw = colW * (0.86 + rnd() * 0.18);
        const ph = rowH * (0.86 + rnd() * 0.18);

        ctx.fillStyle = colors[Math.floor(rnd() * colors.length)];
        ctx.fillRect(px, py, pw, ph);

        ctx.strokeStyle = 'rgba(74, 98, 42, 0.45)';
        ctx.lineWidth = 1.3;
        ctx.strokeRect(px, py, pw, ph);
      }
    }
  }

  private renderShrimpPondGrid(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    w: number,
    h: number,
    waterColors: string[],
    rnd: () => number
  ): void {
    const cols = 6;
    const rows = 8;
    const pw = (w - (cols + 1) * 3) / cols;
    const ph = (h - (rows + 1) * 3) / rows;

    ctx.fillStyle = '#7a7058';
    ctx.fillRect(startX - 4, startY - 4, w + 8, h + 8);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = startX + c * (pw + 3) + 3;
        const y = startY + r * (ph + 3) + 3;

        ctx.fillStyle = waterColors[Math.floor(rnd() * waterColors.length)];
        ctx.fillRect(x, y, pw, ph);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(x + pw / 2, y + ph / 2, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /**
   * 3. Signature DuAnCuuLong 3D Extruded Glowing Magenta/Purple Territorial Ribbon
   * Built as an extruded 3D ribbon quad strip so it renders thick and luminous from ANY angle!
   */
  private buildTerritorialBoundaryRibbon(): void {
    const poly = NUI_THANH_OUTER_POLYGON;
    const ribbonWidth = 2.8;

    const vertices: number[] = [];
    const indices: number[] = [];
    const innerLinePts: THREE.Vector3[] = [];

    const numPts = poly.length;
    for (let i = 0; i < numPts; i++) {
      const curr = poly[i];
      const prev = poly[(i - 1 + numPts) % numPts];
      const next = poly[(i + 1) % numPts];

      // Tangent vector
      const dx = next[0] - prev[0];
      const dz = next[1] - prev[1];
      const len = Math.hypot(dx, dz) || 1;
      // Normal vector pointing outward
      const nx = -dz / len;
      const nz = dx / len;

      const groundH = this.getElevationAt(curr[0], curr[1]);
      const ribbonY = groundH + 0.85;

      // Inner vertex
      const inX = curr[0] - (nx * ribbonWidth * 0.4);
      const inZ = curr[1] - (nz * ribbonWidth * 0.4);
      // Outer vertex
      const outX = curr[0] + (nx * ribbonWidth * 0.6);
      const outZ = curr[1] + (nz * ribbonWidth * 0.6);

      vertices.push(inX, ribbonY, inZ);
      vertices.push(outX, ribbonY, outZ);

      innerLinePts.push(new THREE.Vector3(inX, ribbonY + 0.2, inZ));

      // Triangles connecting curr segment to next segment
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = ((i + 1) % numPts) * 2;
      const v3 = ((i + 1) % numPts) * 2 + 1;

      indices.push(v0, v1, v2);
      indices.push(v1, v3, v2);
    }
    innerLinePts.push(innerLinePts[0].clone());

    // 1. 3D Glowing Purple Ribbon Mesh (duancuulong.com signature)
    const ribbonGeo = new THREE.BufferGeometry();
    ribbonGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    ribbonGeo.setIndex(indices);
    ribbonGeo.computeVertexNormals();

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x9a4fc4,
      emissive: 0x8e24aa,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    this.boundaryRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    this.group.add(this.boundaryRibbon);

    // 2. Faint golden accent line on the inner rim
    const innerGeo = new THREE.BufferGeometry().setFromPoints(innerLinePts);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xe0b25a,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75,
    });
    this.boundaryInnerLine = new THREE.Line(innerGeo, innerMat);
    this.group.add(this.boundaryInnerLine);
  }

  private drawAntiqueCompassRose(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number
  ): void {
    ctx.strokeStyle = 'rgba(110, 80, 45, 0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    const points = 16;
    for (let i = 0; i < points; i++) {
      const angle = (i * Math.PI * 2) / points;
      const isCardinal = i % 4 === 0;
      const isSub = i % 2 === 0;
      const len = isCardinal ? radius * 0.95 : isSub ? radius * 0.7 : radius * 0.5;

      const xTip = cx + Math.cos(angle) * len;
      const yTip = cy + Math.sin(angle) * len;

      const angleL = angle - Math.PI / points;
      const angleR = angle + Math.PI / points;
      const baseR = radius * 0.22;

      ctx.fillStyle = isCardinal ? '#6d4c2b' : '#8d6e4b';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(xTip, yTip);
      ctx.lineTo(cx + Math.cos(angleL) * baseR, cy + Math.sin(angleL) * baseR);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = isCardinal ? '#d9b35a' : '#ecd492';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(xTip, yTip);
      ctx.lineTo(cx + Math.cos(angleR) * baseR, cy + Math.sin(angleR) * baseR);
      ctx.closePath();
      ctx.fill();
    }

    ctx.font = 'bold 36px "EB Garamond", serif';
    ctx.fillStyle = '#6d4c2b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', cx, cy - radius * 1.12);
    ctx.fillText('S', cx, cy + radius * 1.12);
    ctx.fillText('E', cx + radius * 1.12, cy);
    ctx.fillText('O', cx - radius * 1.12, cy);
  }

  private drawAntiqueSailingShip(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ): void {
    ctx.strokeStyle = 'rgba(95, 65, 38, 0.65)';
    ctx.fillStyle = 'rgba(120, 85, 50, 0.45)';
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.moveTo(x - scale * 0.6, y);
    ctx.quadraticCurveTo(x - scale * 0.1, y + scale * 0.35, x + scale * 0.6, y + scale * 0.05);
    ctx.lineTo(x + scale * 0.5, y - scale * 0.05);
    ctx.lineTo(x - scale * 0.5, y - scale * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const mastHeights = [scale * 0.7, scale * 0.9, scale * 0.65];
    const mastXs = [x - scale * 0.25, x, x + scale * 0.28];
    mastXs.forEach((mx, i) => {
      const mh = mastHeights[i];
      ctx.beginPath();
      ctx.moveTo(mx, y);
      ctx.lineTo(mx, y - mh);
      ctx.stroke();

      ctx.fillStyle = 'rgba(245, 235, 215, 0.75)';
      ctx.beginPath();
      ctx.moveTo(mx, y - mh * 0.85);
      ctx.quadraticCurveTo(mx + scale * 0.18, y - mh * 0.5, mx, y - mh * 0.2);
      ctx.lineTo(mx - scale * 0.18, y - mh * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  }

  private drawMountainHachures(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    w: number,
    h: number
  ): void {
    ctx.strokeStyle = 'rgba(110, 80, 50, 0.32)';
    ctx.lineWidth = 1.3;

    for (let py = startY; py < startY + h; py += 32) {
      for (let px = startX; px < startX + w; px += 45) {
        const ridgeLen = 28;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + ridgeLen, py - 18);
        ctx.stroke();

        for (let s = 0; s < 6; s++) {
          const hx = px + s * 4.5;
          const hy = py - s * 2.8;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(hx - 6, hy + 12);
          ctx.stroke();
        }
      }
    }
  }

  private drawCartouche(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    ctx.fillStyle = 'rgba(248, 241, 226, 0.95)';
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = 'rgba(100, 70, 40, 0.75)';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x + 8, y + 8, w - 16, h - 16);

    ctx.textAlign = 'center';
    ctx.font = 'bold 30px "EB Garamond", serif';
    ctx.fillStyle = '#5a3d24';
    ctx.fillText('BẢN ĐỒ ĐỊA HÌNH 3D HUYỆN NÚI THÀNH', x + w / 2, y + 54);

    ctx.font = 'italic 22px "EB Garamond", serif';
    ctx.fillStyle = '#7a5a3a';
    ctx.fillText('KHU KINH TẾ MỞ CHU LAI  ·  TỈNH QUẢNG NAM', x + w / 2, y + 92);

    ctx.font = '500 18px "EB Garamond", serif';
    ctx.fillStyle = '#8a6a4a';
    ctx.fillText('Échelle 1:50.000  ·  Mô hình địa mạo số DEM', x + w / 2, y + 130);

    const barX = x + w / 2 - 100;
    const barY = y + 160;
    ctx.strokeStyle = '#5a3d24';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, 200, 10);
    ctx.fillStyle = '#5a3d24';
    ctx.fillRect(barX, barY, 50, 10);
    ctx.fillRect(barX + 100, barY, 50, 10);

    ctx.font = '14px "EB Garamond", serif';
    ctx.fillText('0', barX, barY + 26);
    ctx.fillText('5 km', barX + 100, barY + 26);
    ctx.fillText('10 km', barX + 200, barY + 26);
  }
}
