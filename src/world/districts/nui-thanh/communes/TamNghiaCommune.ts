import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Tam Nghĩa (Khu vực Sân bay Chu Lai)
 */
export class TamNghiaCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'tam-nghia-commune',
        name: 'Xã Tam Nghĩa (Sân Bay Chu Lai)',
        nameEn: 'Tam Nghia Commune (Chu Lai Airport)',
        type: 'commune',
        areaKm2: 51.6,
        description:
          'Địa bàn Sân bay Quốc tế Chu Lai - cảng hàng không có đường băng dài nhất Việt Nam (hơn 4.000m).',
        cameraPreset: {
          position: [260, 85, 870],
          target: [280, 2, 915],
        },
      },
      {
        minX: 180,
        maxX: 380,
        minZ: 850,
        maxZ: 980,
      }
    );

    this.buildAirportRunway();
  }

  private buildAirportRunway(): void {
    const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x242830, roughness: 0.8 });
    const markMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 4000m Runway (scaled to 140 units)
    const runwayGeo = new THREE.PlaneGeometry(16, 140);
    runwayGeo.rotateX(-Math.PI / 2);
    const runway = new THREE.Mesh(runwayGeo, asphaltMat);
    runway.position.set(280, 0.35, 915);
    runway.receiveShadow = true;
    this.group.add(runway);

    // Centerline markings
    const lineGeo = new THREE.PlaneGeometry(0.8, 120);
    lineGeo.rotateX(-Math.PI / 2);
    const line = new THREE.Mesh(lineGeo, markMat);
    line.position.set(280, 0.38, 915);
    this.group.add(line);
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
