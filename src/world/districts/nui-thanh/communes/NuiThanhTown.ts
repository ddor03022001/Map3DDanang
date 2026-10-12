import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Thị trấn Núi Thành (Trung tâm hành chính huyện Núi Thành)
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
          'Trung tâm chính trị, văn hóa, dịch vụ thương mại của Huyện Núi Thành, nằm bên dòng sông An Tân hiền hòa.',
        cameraPreset: {
          position: [205, 55, 780],
          target: [215, 2, 815],
        },
      },
      {
        minX: 160,
        maxX: 260,
        minZ: 770,
        maxZ: 850,
      }
    );

    this.buildTownCenter();
  }

  private buildTownCenter(): void {
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xeadbb8, roughness: 0.7 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb53528, roughness: 0.5 });

    // Town administrative center
    const adminGeo = new THREE.BoxGeometry(24, 7.5, 14);
    const admin = new THREE.Mesh(adminGeo, wallMat);
    admin.position.set(215, 3.75, 815);
    admin.castShadow = true;
    this.group.add(admin);

    const roofGeo = new THREE.ConeGeometry(18, 3, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(215, 7.5 + 1.5, 815);
    roof.scale.set(1.2, 1, 0.7);
    this.group.add(roof);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
