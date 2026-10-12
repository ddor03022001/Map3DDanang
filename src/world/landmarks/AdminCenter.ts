import * as THREE from 'three';

/**
 * Procedural PBR model of Da Nang Administrative Center (Tòa nhà Trung Tâm Hành Chính)
 * 167m futuristic glass tower resembling a corn cob / lighthouse overlooking the Han River
 */
export class AdminCenter {
  public group = new THREE.Group();

  constructor() {
    this.buildPodium();
    this.buildCurvedTower();
    this.buildCrownHelipad();

    // Placed on the West Bank near Bach Dang / Tran Phu street
    this.group.position.set(-35, 0, -180);
  }

  private buildPodium(): void {
    const podiumGeo = new THREE.CylinderGeometry(6.5, 7.5, 2.2, 32);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x242a33,
      roughness: 0.6,
      metalness: 0.4,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = 1.1;
    podium.castShadow = true;
    podium.receiveShadow = true;
    this.group.add(podium);
  }

  private buildCurvedTower(): void {
    // Generate curved profile using LatheGeometry to create the distinctive aerodynamic "corn" shape
    const points: THREE.Vector2[] = [];
    const height = 28; // Scaled height for 167m building
    const baseRadius = 4.2;

    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = t * height;
      // Parabolic curve: narrows at bottom, swells in middle, tapers smoothly at crown
      const radius = baseRadius * Math.sin(t * Math.PI * 0.85 + 0.25);
      points.push(new THREE.Vector2(Math.max(1.2, radius), y));
    }

    const towerGeo = new THREE.LatheGeometry(points, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b5a82, // Vibrant corporate cyan glass
      roughness: 0.15,
      metalness: 0.85,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const tower = new THREE.Mesh(towerGeo, glassMat);
    tower.position.y = 2.2;
    tower.castShadow = true;
    tower.receiveShadow = true;
    this.group.add(tower);
  }

  private buildCrownHelipad(): void {
    const crownGeo = new THREE.CylinderGeometry(1.5, 1.2, 0.8, 16);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0xdde5ed,
      metalness: 0.8,
      roughness: 0.2,
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = 30.6;
    this.group.add(crown);

    // Helipad red beacon
    const beaconGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff0022 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.y = 31.2;
    this.group.add(beacon);
  }
}
