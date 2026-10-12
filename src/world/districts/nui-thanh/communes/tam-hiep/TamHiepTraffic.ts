import * as THREE from 'three';

interface TrafficVehicle {
  group: THREE.Group;
  lane: 'north' | 'south' | 'roundabout';
  progress: number;
  speed: number;
  angle?: number;
}

/**
 * Animated traffic on National Highway 1A and Chu Lai 2-Level Interchange in Tam Hiep
 * Features THACO container trucks, THACO Mobihome sleeper buses, and passenger cars.
 */
export class TamHiepTraffic {
  public group = new THREE.Group();
  private vehicles: TrafficVehicle[] = [];

  constructor() {
    this.createHighwayVehicles();
    this.createRoundaboutVehicles();

    // Centered at Highway 1A corridor in Tam Hiep
    this.group.position.set(220, 0, 720);
  }

  private createHighwayVehicles(): void {
    // 1. THACO Container Semi-trailer (Northbound)
    const truck = this.buildContainerTruck(0x004d9c);
    this.vehicles.push({
      group: truck,
      lane: 'north',
      progress: -120,
      speed: 28,
    });
    this.group.add(truck);

    // 2. THACO Mobihome Sleeper Bus (Southbound)
    const bus = this.buildSleeperBus(0xcc2222);
    this.vehicles.push({
      group: bus,
      lane: 'south',
      progress: 110,
      speed: 26,
    });
    this.group.add(bus);

    // 3. THACO Kia Carnival / Van (Northbound)
    const car1 = this.buildPassengerCar(0xffffff);
    this.vehicles.push({
      group: car1,
      lane: 'north',
      progress: 30,
      speed: 34,
    });
    this.group.add(car1);

    // 4. Mazda CX-5 (Southbound)
    const car2 = this.buildPassengerCar(0xaa1122);
    this.vehicles.push({
      group: car2,
      lane: 'south',
      progress: -40,
      speed: 32,
    });
    this.group.add(car2);
  }

  private createRoundaboutVehicles(): void {
    // 2 cars circling the elevated flyover ring
    for (let i = 0; i < 2; i++) {
      const car = this.buildPassengerCar(i === 0 ? 0x2288cc : 0xeeeeee);
      this.vehicles.push({
        group: car,
        lane: 'roundabout',
        progress: 0,
        speed: 0.65, // Angular velocity (rad/s)
        angle: (i * Math.PI),
      });
      this.group.add(car);
    }
  }

  private buildContainerTruck(color: number): THREE.Group {
    const truck = new THREE.Group();
    const cabMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.5 });
    const contMat = new THREE.MeshStandardMaterial({ color: 0x1f4e78, roughness: 0.5, metalness: 0.3 });

    // Cab
    const cabGeo = new THREE.BoxGeometry(2.4, 2.8, 3.5);
    const cab = new THREE.Mesh(cabGeo, cabMat);
    cab.position.set(0, 1.8, 4.5);
    truck.add(cab);

    // Container Trailer
    const contGeo = new THREE.BoxGeometry(2.4, 2.7, 10.5);
    const cont = new THREE.Mesh(contGeo, contMat);
    cont.position.set(0, 2.2, -2.5);
    cont.castShadow = true;
    truck.add(cont);

    // Headlights
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
    [-0.8, 0.8].forEach((lx) => {
      const lGeo = new THREE.BoxGeometry(0.3, 0.2, 0.1);
      const l = new THREE.Mesh(lGeo, lightMat);
      l.position.set(lx, 1.0, 6.3);
      truck.add(l);
    });

    return truck;
  }

  private buildSleeperBus(color: number): THREE.Group {
    const bus = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.4 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x111e2e, roughness: 0.1, metalness: 0.9 });

    // Streamlined bus body
    const bodyGeo = new THREE.BoxGeometry(2.5, 3.2, 11);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.9;
    body.castShadow = true;
    bus.add(body);

    // Double-deck windows
    const winGeo = new THREE.BoxGeometry(2.52, 1.8, 9.5);
    const win = new THREE.Mesh(winGeo, glassMat);
    win.position.set(0, 2.2, -0.4);
    bus.add(win);

    return bus;
  }

  private buildPassengerCar(color: number): THREE.Group {
    const car = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.7 });

    const lowerGeo = new THREE.BoxGeometry(1.9, 0.75, 4.2);
    const lower = new THREE.Mesh(lowerGeo, bodyMat);
    lower.position.y = 0.6;
    car.add(lower);

    const cabinGeo = new THREE.BoxGeometry(1.6, 0.65, 2.4);
    const cabin = new THREE.Mesh(cabinGeo, bodyMat);
    cabin.position.set(0, 1.25, -0.2);
    car.add(cabin);

    return car;
  }

  public update(delta: number): void {
    const minZ = -140;
    const maxZ = 140;
    const highwayNorthX = 2.2;
    const highwaySouthX = -2.2;

    this.vehicles.forEach((v) => {
      if (v.lane === 'north') {
        v.progress += v.speed * delta;
        if (v.progress > maxZ) v.progress = minZ;
        v.group.position.set(highwayNorthX, 0.36, v.progress);
        v.group.rotation.y = 0;
      } else if (v.lane === 'south') {
        v.progress -= v.speed * delta;
        if (v.progress < minZ) v.progress = maxZ;
        v.group.position.set(highwaySouthX, 0.36, v.progress);
        v.group.rotation.y = Math.PI;
      } else if (v.lane === 'roundabout' && v.angle !== undefined) {
        v.angle += v.speed * delta;
        const ringRadius = 18;
        const flyoverHeight = 4.8;
        const rx = Math.cos(v.angle) * ringRadius;
        const rz = Math.sin(v.angle) * ringRadius;
        v.group.position.set(rx, flyoverHeight + 0.2, rz);
        v.group.rotation.y = -v.angle + Math.PI / 2;
      }
    });
  }
}
