import * as THREE from 'three';

/**
 * Topographical terrain mesh featuring Son Tra Peninsula, Marble Mountains, and coastal plains
 */
export class Terrain {
  public group = new THREE.Group();

  private terrainMesh: THREE.Mesh;
  private terrainMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2b24,
      roughness: 0.88,
      metalness: 0.05,
      vertexColors: true,
      flatShading: true,
    });

    this.terrainMesh = this.generateTopography();
    this.group.add(this.terrainMesh);
  }

  private generateTopography(): THREE.Mesh {
    // Terrain grid width: 1400 units, height: 1600 units with 128x128 resolution
    const width = 1400;
    const depth = 1600;
    const segmentsX = 128;
    const segmentsZ = 128;

    const geometry = new THREE.PlaneGeometry(width, depth, segmentsX, segmentsZ);
    geometry.rotateX(-Math.PI / 2);

    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    const colors: number[] = [];

    // Geographical anchors:
    // Son Tra Peninsula center: roughly (380, -450)
    // Marble Mountains (Ngu Hanh Son) center: roughly (250, 420)
    // Han River corridor: X between -45 and 45
    // My Khe beach line: X around 160 to 200

    for (let i = 0; i < vertexCount; i++) {
      const vx = positionAttr.getX(i);
      const vz = positionAttr.getZ(i);

      let elevation = 0;

      // 1. Son Tra Peninsula (Prominent mountain range up to 60 units ~ 600m)
      const distSonTra = Math.hypot(vx - 380, vz - (-450));
      if (distSonTra < 260) {
        const falloff = Math.cos((distSonTra / 260) * (Math.PI / 2));
        elevation += Math.pow(falloff, 1.6) * 58;
      }

      // 2. Marble Mountains (Cluster of five distinct limestone peaks)
      const distNguHanhSon = Math.hypot(vx - 220, vz - 380);
      if (distNguHanhSon < 120) {
        const peakNoise = Math.sin(vx * 0.12) * Math.cos(vz * 0.12) * 6;
        const falloff = Math.cos((distNguHanhSon / 120) * (Math.PI / 2));
        elevation += Math.max(0, falloff * 24 + peakNoise);
      }

      // 3. Keep River channel flat and slightly submerged
      const distToRiverAxis = Math.abs(vx - (vz * -0.05));
      if (distToRiverAxis < 35 && vz > -400 && vz < 220) {
        elevation = Math.min(elevation, -0.3);
      }

      // 4. Subtle plain undulation
      if (elevation === 0) {
        elevation = Math.sin(vx * 0.015) * Math.cos(vz * 0.015) * 0.4;
      }

      positionAttr.setY(i, elevation);

      // Vertex color assignment based on terrain type
      const color = new THREE.Color();
      if (elevation > 12) {
        // Mountain forest green (Son Tra / Ngu Hanh Son)
        color.setHSL(0.32, 0.45, 0.18 + Math.min(elevation / 70, 0.15));
      } else if (vx > 150 && vx < 210 && vz > -350 && vz < 350) {
        // Sandy beach (My Khe coast)
        color.setHex(0xd4be8d);
      } else if (Math.abs(vx) < 50 && vz > -350 && vz < 220) {
        // River embankment
        color.setHex(0x2a333c);
      } else {
        // Urban plain ground
        color.setHex(0x182026);
      }

      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, this.terrainMaterial);
    mesh.receiveShadow = true;
    return mesh;
  }
}
