import * as THREE from 'three';
import { BaseWard } from '../../core/BaseWard';

/**
 * Xã Hòa Ninh (Huyện Hòa Vang)
 * Houses Ba Na Hills tourist resort and the iconic Golden Bridge (Cầu Vàng)
 */
export class HoaNinhCommune extends BaseWard {
  constructor() {
    super(
      {
        id: 'hoa-ninh-commune',
        name: 'Xã Hòa Ninh (Bà Nà Hills)',
        nameEn: 'Hoa Ninh Commune (Ba Na Hills)',
        type: 'commune',
        areaKm2: 104.2,
        description: 'Vùng sinh thái núi cao nổi tiếng với quần thể du lịch Bà Nà Hills và Cầu Vàng.',
      },
      {
        minX: -650,
        maxX: -450,
        minZ: -200,
        maxZ: -50,
      }
    );
  }

  public initialize(): void {
    this.buildBaNaAndGoldenBridge();
    this.isLoaded = true;
  }

  private buildBaNaAndGoldenBridge(): void {
    // Ba Na mountain massif
    const peakGeo = new THREE.ConeGeometry(95, 110, 16);
    const peakMat = new THREE.MeshStandardMaterial({
      color: 0x1f3f26,
      roughness: 0.9,
      flatShading: true,
    });
    const peak = new THREE.Mesh(peakGeo, peakMat);
    peak.position.set(-520, 55, -120);
    peak.receiveShadow = true;
    this.group.add(peak);

    // Golden Bridge
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-510, 102, -110),
      new THREE.Vector3(-500, 104, -120),
      new THREE.Vector3(-495, 103, -135),
      new THREE.Vector3(-505, 101, -145),
    ]);
    const bridgeGeo = new THREE.TubeGeometry(curve, 32, 1.2, 8, false);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5b800,
      metalness: 0.85,
      roughness: 0.25,
    });
    const bridge = new THREE.Mesh(bridgeGeo, goldMat);
    bridge.castShadow = true;
    this.group.add(bridge);

    // Giant stone hands
    const handMat = new THREE.MeshStandardMaterial({
      color: 0x6e786b,
      roughness: 0.95,
      flatShading: true,
    });
    [-502, -498].forEach((hx, idx) => {
      const handGeo = new THREE.DodecahedronGeometry(4.5, 1);
      const hand = new THREE.Mesh(handGeo, handMat);
      hand.position.set(hx, 98, -122 - idx * 12);
      hand.castShadow = true;
      this.group.add(hand);
    });
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
