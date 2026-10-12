import * as THREE from 'three';
import { SatelliteTileLoader } from '@/utils/SatelliteTileLoader';

/**
 * Photorealistic Satellite Ground Mesh for Xã Tam Hiệp (Huyện Núi Thành)
 * Powered by high-resolution Esri World Imagery (ArcGIS) satellite tiles stitched in real time.
 * Real geographic extent:
 * - Latitude: ~15.397°N to ~15.463°N
 * - Longitude: ~108.622°E to ~108.688°E
 * - Dimensions: 7,000m x 7,300m (700 x 730 units)
 */
export class TamHiepSatelliteGround {
  public group = new THREE.Group();

  private groundMesh: THREE.Mesh;
  private material: THREE.MeshStandardMaterial;
  private billboardGroup = new THREE.Group();

  constructor() {
    // 1. Fetch real satellite tiles (6x6 = 36 tiles at Zoom 15)
    const satelliteTexture = SatelliteTileLoader.createStitchedSatelliteTexture({
      zoom: 15,
      minX: 26271,
      maxX: 26276,
      minY: 14959,
      maxY: 14964,
    });

    // 2. High quality PBR material
    this.material = new THREE.MeshStandardMaterial({
      map: satelliteTexture,
      roughness: 0.84,
      metalness: 0.08,
      flatShading: false,
    });

    // 3. Topographical relief mesh
    const width = 700;
    const depth = 730;
    const segments = 48;

    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);

      let elevation = 0.28; // Baseline altitude above global terrain

      // Gentle western foothills of Nui Thanh (vx < -100)
      if (vx < -80) {
        const westDist = Math.abs(vx - (-80));
        elevation += Math.min(14, (westDist / 200) * 12);
      }

      // Estuary channel depression leading out to Chu Lai port (vx > 180, vz between -50 and 80)
      const riverDist = Math.hypot(vx - 240, vz - 20);
      if (riverDist < 75) {
        elevation = Math.max(0.05, elevation - 0.22);
      }

      pos.setY(i, elevation);
    }

    geometry.computeVertexNormals();

    this.groundMesh = new THREE.Mesh(geometry, this.material);
    this.groundMesh.receiveShadow = true;
    this.group.add(this.groundMesh);

    // Position centered over Tam Hiep
    this.group.position.set(300, 0, 675);

    // 4. Administrative boundary outline
    this.buildBoundaryOutline();

    // 5. 3D Floating Landmark Billboard
    this.buildCommuneBadge();
  }

  /**
   * Glowing administrative perimeter defining Tam Hiep commune border
   */
  private buildBoundaryOutline(): void {
    const halfW = 345;
    const halfD = 358;

    // Stylized commune polygon border points
    const points: THREE.Vector3[] = [
      new THREE.Vector3(-halfW, 0.45, -halfD),
      new THREE.Vector3(halfW * 0.7, 0.45, -halfD),
      new THREE.Vector3(halfW, 0.45, -halfD * 0.4),
      new THREE.Vector3(halfW, 0.45, halfD * 0.75),
      new THREE.Vector3(halfW * 0.2, 0.45, halfD),
      new THREE.Vector3(-halfW * 0.8, 0.45, halfD),
      new THREE.Vector3(-halfW, 0.45, halfD * 0.3),
      new THREE.Vector3(-halfW, 0.45, -halfD),
    ];

    const borderGeo = new THREE.BufferGeometry().setFromPoints(points);
    const borderMat = new THREE.LineDashedMaterial({
      color: 0x00e5ff,
      linewidth: 2,
      scale: 1,
      dashSize: 8,
      gapSize: 4,
    });

    const borderLine = new THREE.Line(borderGeo, borderMat);
    borderLine.computeLineDistances();
    this.group.add(borderLine);
  }

  /**
   * 3D Floating Civic Billboard indicating Xã Tam Hiệp
   */
  private buildCommuneBadge(): void {
    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 512;
    badgeCanvas.height = 256;
    const ctx = badgeCanvas.getContext('2d')!;

    // Glassmorphic badge background
    ctx.fillStyle = 'rgba(10, 25, 41, 0.88)';
    ctx.roundRect(10, 10, 492, 236, 24);
    ctx.fill();

    // Golden border
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ffc107';
    ctx.stroke();

    // National flag ribbon indicator
    ctx.fillStyle = '#da251d';
    ctx.fillRect(30, 30, 452, 8);

    // Text: XÃ TAM HIỆP
    ctx.font = 'bold 44px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('XÃ TAM HIỆP', 256, 95);

    // Subtext
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#00e5ff';
    ctx.fillText('HUYỆN NÚI THÀNH • QUẢNG NAM', 256, 145);

    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#ffc107';
    ctx.fillText('KHU KINH TẾ MỞ CHU LAI - THACO HUB', 256, 195);

    const badgeTex = new THREE.CanvasTexture(badgeCanvas);
    badgeTex.colorSpace = THREE.SRGBColorSpace;

    const badgeGeo = new THREE.PlaneGeometry(36, 18);
    const badgeMat = new THREE.MeshBasicMaterial({
      map: badgeTex,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-60, 22, 60);

    // Pylon pole
    const poleGeo = new THREE.CylinderGeometry(0.5, 0.5, 22, 12);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8899aa, metalness: 0.8, roughness: 0.3 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(-60, 11, 60);

    this.billboardGroup.add(pole);
    this.billboardGroup.add(badgeMesh);
    this.group.add(this.billboardGroup);
  }

  public update(_delta: number, elapsed: number): void {
    // Gentle floating billboard bobbing
    if (this.billboardGroup.children[1]) {
      this.billboardGroup.children[1].position.y = 22 + Math.sin(elapsed * 1.5) * 0.4;
    }
  }
}
