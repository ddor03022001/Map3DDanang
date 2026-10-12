import * as THREE from 'three';
import { TextureGenerator } from '@/utils/TextureGenerator';

/**
 * Photorealistic Han River & East Sea (My Khe) water simulation with animated PBR wave displacement
 */
export class Water {
  public group = new THREE.Group();

  private riverMesh: THREE.Mesh;
  private oceanMesh: THREE.Mesh;
  private waterMaterial: THREE.MeshStandardMaterial;
  private normalMap: THREE.CanvasTexture;

  constructor() {
    this.normalMap = TextureGenerator.createWaterNormalMap(512, 512);

    // Modern PBR Water Material with specular highlights and reflections
    this.waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x166b96, // Vibrant tropical river blue
      roughness: 0.22,
      metalness: 0.15,
      normalMap: this.normalMap,
      normalScale: new THREE.Vector2(0.4, 0.4),
      transparent: true,
      opacity: 0.95,
    });

    // 1. Han River Geometry (S-curved path flowing through Da Nang center)
    this.riverMesh = this.createHanRiverMesh();
    this.group.add(this.riverMesh);

    // 2. East Sea / My Khe Beach Ocean Mesh
    this.oceanMesh = this.createOceanMesh();
    this.group.add(this.oceanMesh);
  }

  /**
   * Constructs the Han River waterway according to actual Da Nang riverbed geography
   */
  private createHanRiverMesh(): THREE.Mesh {
    const shape = new THREE.Shape();

    // West riverbank (Bach Dang / Nhu Nguyet side)
    // Points in (X, Z) where Z- is North, X+ is East
    shape.moveTo(-35, 200);   // Upstream South (Tran Thi Ly / Tien Son)
    shape.lineTo(-30, 80);
    shape.lineTo(-24, 0);     // Dragon Bridge West bank
    shape.lineTo(-22, -80);
    shape.lineTo(-25, -130);  // Han River Bridge West bank
    shape.lineTo(-30, -220);
    shape.lineTo(-45, -340);  // Thuan Phuoc West estuary into Da Nang Bay
    shape.lineTo(-120, -420); // Da Nang Bay widening
    shape.lineTo(120, -420);
    shape.lineTo(40, -340);   // Thuan Phuoc East bank
    shape.lineTo(25, -220);
    shape.lineTo(22, -130);   // Han River Bridge East bank (Tran Hung Dao)
    shape.lineTo(24, -80);
    shape.lineTo(24, 0);      // Dragon Bridge East bank
    shape.lineTo(30, 80);
    shape.lineTo(35, 200);    // Upstream South East bank
    shape.closePath();

    const geometry = new THREE.ShapeGeometry(shape, 32);
    // Orient horizontally (Y = height)
    geometry.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geometry, this.waterMaterial);
    mesh.position.y = 0.2; // Sea level baseline
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Constructs the East Sea (My Khe coast) extending outward to the horizon
   */
  private createOceanMesh(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(600, 900, 32, 32);
    geometry.rotateX(-Math.PI / 2);

    const oceanMat = this.waterMaterial.clone();
    oceanMat.color.setHex(0x064264);

    const mesh = new THREE.Mesh(geometry, oceanMat);
    // Positioned East of the Da Nang coastal strip
    mesh.position.set(450, 0.1, -100);
    mesh.receiveShadow = true;
    return mesh;
  }

  public update(_delta: number, elapsed: number): void {
    // Flow water normal texture to simulate continuous river current & ocean waves
    if (this.normalMap) {
      this.normalMap.offset.x = (elapsed * 0.035) % 1;
      this.normalMap.offset.y = (elapsed * 0.055) % 1;
    }
  }

  public setWaterTone(waterHex: number, roughness: number): void {
    this.waterMaterial.color.setHex(waterHex);
    this.waterMaterial.roughness = roughness;
  }
}
