import * as THREE from 'three';
import { TextureGenerator } from '@/utils/TextureGenerator';

/**
 * Photorealistic Han River & East Sea (My Khe) water simulation with animated PBR wave displacement
 */
export class Water {
  public group = new THREE.Group();

  private riverMesh: THREE.Mesh;
  private oceanMesh: THREE.Mesh;
  private daNangWaterGroup: THREE.Group;
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

    // 1 & 2. Da Nang Core Waterways (Han River & My Khe ocean)
    this.daNangWaterGroup = new THREE.Group();
    this.riverMesh = this.createHanRiverMesh();
    this.daNangWaterGroup.add(this.riverMesh);
    this.oceanMesh = this.createOceanMesh();
    this.daNangWaterGroup.add(this.oceanMesh);
    this.daNangWaterGroup.visible = false; // Hidden when focusing on Nui Thanh
    this.group.add(this.daNangWaterGroup);

    // 3. Nui Thanh Waterways: An Hoa Bay, East Sea around Tam Hai, Truong Giang & An Tan Rivers, Reservoir Lakes
    this.buildNuiThanhWaterSystem();
  }

  public setDaNangWaterVisible(visible: boolean): void {
    this.daNangWaterGroup.visible = visible;
  }

  /**
   * Constructs the comprehensive water system of Huyện Núi Thành:
   * - An Hòa Bay & East Sea separating Tam Hải island from the mainland
   * - Sông Trường Giang & Sông An Tân river channels
   * - Tam Sơn & Thái Xuân freshwater reservoir lakes
   */
  private buildNuiThanhWaterSystem(): void {
    // A. An Hòa Bay & East Sea surrounding Tam Hải Island (X: 300 to 650, Z: 700 to 1050)
    // Physically creates the open bay water between Tam Quang/Tam Giang and Tam Hải Island!
    const bayShape = new THREE.Shape();
    bayShape.moveTo(310, 710);  // Tam Hiep estuary
    bayShape.lineTo(290, 780);  // Tam Giang river mouth
    bayShape.lineTo(270, 830);  // An Tan river mouth
    bayShape.lineTo(310, 850);  // Ky Ha wharf shore
    bayShape.lineTo(340, 870);  // Tam Quang ferry terminal
    bayShape.lineTo(360, 950);  // Southern bay edge
    bayShape.lineTo(650, 980);  // Open sea East
    bayShape.lineTo(650, 710);  // Open sea North-East
    bayShape.lineTo(440, 710);  // Cua Lo estuary entrance
    bayShape.closePath();

    const bayGeo = new THREE.ShapeGeometry(bayShape, 32);
    bayGeo.rotateX(-Math.PI / 2);

    const bayMat = this.waterMaterial.clone();
    bayMat.color.setHex(0x0e587d); // Deep coastal bay blue
    bayMat.roughness = 0.20;

    const bayMesh = new THREE.Mesh(bayGeo, bayMat);
    bayMesh.position.y = 0.25; // Water level
    bayMesh.receiveShadow = true;
    this.group.add(bayMesh);

    // B. Sông Trường Giang water channel (Chảy dọc Tam Tiến, Tam Hòa xuống Tam Hiệp & Tam Giang)
    const tgShape = new THREE.Shape();
    tgShape.moveTo(330, 500);
    tgShape.lineTo(370, 500);
    tgShape.lineTo(390, 620);
    tgShape.lineTo(410, 700);
    tgShape.lineTo(380, 760);
    tgShape.lineTo(340, 760);
    tgShape.lineTo(360, 690);
    tgShape.lineTo(340, 620);
    tgShape.closePath();

    const tgGeo = new THREE.ShapeGeometry(tgShape, 24);
    tgGeo.rotateX(-Math.PI / 2);
    const tgMesh = new THREE.Mesh(tgGeo, this.waterMaterial);
    tgMesh.position.y = 0.28;
    tgMesh.receiveShadow = true;
    this.group.add(tgMesh);

    // C. Sông An Tân water channel (Chảy qua trung tâm TT. Núi Thành ra Vịnh An Hòa)
    const atShape = new THREE.Shape();
    atShape.moveTo(110, 815);
    atShape.lineTo(300, 815);
    atShape.lineTo(300, 835);
    atShape.lineTo(110, 835);
    atShape.closePath();

    const atGeo = new THREE.ShapeGeometry(atShape, 16);
    atGeo.rotateX(-Math.PI / 2);
    const atMesh = new THREE.Mesh(atGeo, this.waterMaterial);
    atMesh.position.y = 0.3;
    atMesh.receiveShadow = true;
    this.group.add(atMesh);

    // D. Lòng Hồ Thủy Lợi Tam Sơn (Chi nhánh phía Nam Hồ Phú Ninh - Xã Tam Sơn)
    const sonLakeShape = new THREE.Shape();
    sonLakeShape.moveTo(-115, 690);
    sonLakeShape.quadraticCurveTo(-90, 670, -60, 680);
    sonLakeShape.quadraticCurveTo(-35, 695, -20, 715);
    sonLakeShape.quadraticCurveTo(-30, 740, -55, 750);
    sonLakeShape.quadraticCurveTo(-85, 745, -110, 730);
    sonLakeShape.quadraticCurveTo(-125, 710, -115, 690);
    sonLakeShape.closePath();

    const sonLakeGeo = new THREE.ShapeGeometry(sonLakeShape, 32);
    sonLakeGeo.rotateX(-Math.PI / 2);
    const lakeMat = this.waterMaterial.clone();
    lakeMat.color.setHex(0x135e7a); // Deep freshwater mountain lake cyan
    lakeMat.roughness = 0.18;
    const sonLake = new THREE.Mesh(sonLakeGeo, lakeMat);
    sonLake.position.y = 0.25;
    sonLake.receiveShadow = true;
    this.group.add(sonLake);

    // E. Hồ Chứa Nước Thái Xuân (Xã Tam Thạnh)
    const thanhLakeShape = new THREE.Shape();
    thanhLakeShape.moveTo(35, 630);
    thanhLakeShape.quadraticCurveTo(60, 620, 85, 635);
    thanhLakeShape.quadraticCurveTo(95, 655, 80, 675);
    thanhLakeShape.quadraticCurveTo(55, 680, 40, 665);
    thanhLakeShape.quadraticCurveTo(28, 645, 35, 630);
    thanhLakeShape.closePath();

    const thanhLakeGeo = new THREE.ShapeGeometry(thanhLakeShape, 24);
    thanhLakeGeo.rotateX(-Math.PI / 2);
    const thanhLake = new THREE.Mesh(thanhLakeGeo, lakeMat);
    thanhLake.position.y = 0.25;
    thanhLake.receiveShadow = true;
    this.group.add(thanhLake);
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
