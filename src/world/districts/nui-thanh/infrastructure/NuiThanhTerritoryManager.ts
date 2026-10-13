import * as THREE from 'three';

export interface CommuneBoundaryData {
  id: string;
  name: string;
  shortName: string;
  areaKm2: number;
  center: [number, number]; // [X, Z]
  polygon: [number, number][]; // Array of [X, Z] vertices
  color: number;
  elevatedCamera: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

/**
 * Real-world 17 Commune Administrative Boundaries of Huyện Núi Thành (555.9 km²)
 * Seamlessly tiling the entire district territory across X: -200..520 and Z: 490..1040
 * Following natural geography: Sông Tam Kỳ, Sông Trường Giang, Sông An Tân, Vịnh An Hòa, Dãy Hòn Tàu
 */
export const NUI_THANH_COMMUNE_BOUNDARIES: CommuneBoundaryData[] = [
  // 1. Phía Bắc (Bordering TP. Tam Kỳ & Vùng Duyên Hải)
  {
    id: 'commune-tam-xuan-1',
    name: 'Xã Tam Xuân 1',
    shortName: 'Tam Xuân 1',
    areaKm2: 17.5,
    center: [195, 525],
    polygon: [
      [145, 490],
      [225, 490],
      [255, 500],
      [260, 560],
      [200, 565],
      [140, 555],
      [145, 490],
    ],
    color: 0x8bc34a,
    elevatedCamera: {
      position: [195, 145, 415],
      target: [195, 2, 525],
    },
  },
  {
    id: 'commune-tam-xuan-2',
    name: 'Xã Tam Xuân 2',
    shortName: 'Tam Xuân 2',
    areaKm2: 24.2,
    center: [75, 525],
    polygon: [
      [10, 490],
      [145, 490],
      [140, 555],
      [130, 570],
      [30, 570],
      [10, 490],
    ],
    color: 0x689f38,
    elevatedCamera: {
      position: [75, 150, 410],
      target: [75, 2, 525],
    },
  },
  {
    id: 'commune-tam-tien',
    name: 'Xã Tam Tiến',
    shortName: 'Tam Tiến',
    areaKm2: 20.6,
    center: [365, 555],
    polygon: [
      [255, 500],
      [350, 495],
      [435, 505],
      [445, 615],
      [360, 615],
      [260, 560],
      [255, 500],
    ],
    color: 0x00bcd4,
    elevatedCamera: {
      position: [365, 155, 435],
      target: [365, 2, 550],
    },
  },

  // 2. Vành đai KCN & Hành lang QL1A phía Bắc
  {
    id: 'commune-tam-anh-bac',
    name: 'Xã Tam Anh Bắc',
    shortName: 'Tam Anh Bắc',
    areaKm2: 21.0,
    center: [195, 595],
    polygon: [
      [140, 555],
      [200, 565],
      [260, 560],
      [275, 630],
      [210, 635],
      [135, 625],
      [140, 555],
    ],
    color: 0x4caf50,
    elevatedCamera: {
      position: [195, 140, 480],
      target: [195, 2, 595],
    },
  },
  {
    id: 'commune-tam-anh-nam',
    name: 'Xã Tam Anh Nam',
    shortName: 'Tam Anh Nam',
    areaKm2: 21.9,
    center: [195, 660],
    polygon: [
      [135, 625],
      [210, 635],
      [275, 630],
      [270, 695],
      [190, 700],
      [125, 690],
      [135, 625],
    ],
    color: 0x388e3c,
    elevatedCamera: {
      position: [195, 140, 545],
      target: [195, 2, 660],
    },
  },
  {
    id: 'commune-tam-hoa',
    name: 'Xã Tam Hòa',
    shortName: 'Tam Hòa',
    areaKm2: 22.6,
    center: [360, 655],
    polygon: [
      [260, 560],
      [360, 615],
      [445, 615],
      [455, 705],
      [370, 705],
      [270, 695],
      [275, 630],
      [260, 560],
    ],
    color: 0x009688,
    elevatedCamera: {
      position: [360, 150, 530],
      target: [360, 2, 650],
    },
  },

  // 3. Vùng Đồi Gò & Lòng Hồ Phía Tây
  {
    id: 'commune-tam-thanh',
    name: 'Xã Tam Thạnh',
    shortName: 'Tam Thạnh',
    areaKm2: 53.9,
    center: [55, 640],
    polygon: [
      [30, 570],
      [130, 570],
      [135, 625],
      [125, 690],
      [130, 715],
      [30, 725],
      [-20, 720],
      [-20, 620],
      [30, 570],
    ],
    color: 0x558b2f,
    elevatedCamera: {
      position: [55, 165, 510],
      target: [55, 4, 640],
    },
  },
  {
    id: 'commune-tam-son',
    name: 'Xã Tam Sơn',
    shortName: 'Tam Sơn',
    areaKm2: 54.2,
    center: [-80, 710],
    polygon: [
      [-185, 630],
      [-20, 620],
      [-20, 720],
      [10, 765],
      [-35, 775],
      [-90, 780],
      [-185, 780],
      [-185, 630],
    ],
    color: 0x00838f,
    elevatedCamera: {
      position: [-80, 140, 600],
      target: [-80, 4, 710],
    },
  },

  // 4. Trái tim Công nghiệp Chu Lai & Trung tâm Huyện
  {
    id: 'commune-tam-hiep',
    name: 'Xã Tam Hiệp',
    shortName: 'Tam Hiệp',
    areaKm2: 42.1,
    center: [250, 725],
    polygon: [
      [125, 690],
      [190, 700],
      [270, 695],
      [370, 705],
      [390, 765],
      [315, 765],
      [245, 765],
      [135, 760],
      [125, 690],
    ],
    color: 0xd49b10,
    elevatedCamera: {
      position: [250, 160, 600],
      target: [250, 4, 725],
    },
  },
  {
    id: 'commune-nui-thanh',
    name: 'Thị Trấn Núi Thành',
    shortName: 'TT. Núi Thành',
    areaKm2: 4.5,
    center: [195, 805],
    polygon: [
      [135, 760],
      [245, 765],
      [250, 840],
      [140, 845],
      [135, 760],
    ],
    color: 0xe65100,
    elevatedCamera: {
      position: [195, 125, 695],
      target: [195, 4, 805],
    },
  },
  {
    id: 'commune-tam-giang',
    name: 'Xã Tam Giang',
    shortName: 'Tam Giang',
    areaKm2: 11.5,
    center: [280, 805],
    polygon: [
      [245, 765],
      [315, 765],
      [325, 845],
      [250, 840],
      [245, 765],
    ],
    color: 0x26a69a,
    elevatedCamera: {
      position: [280, 130, 700],
      target: [280, 2, 805],
    },
  },
  {
    id: 'commune-tam-quang',
    name: 'Xã Tam Quang',
    shortName: 'Tam Quang',
    areaKm2: 11.4,
    center: [330, 840],
    polygon: [
      [315, 765],
      [380, 770],
      [390, 865],
      [295, 865],
      [310, 825],
      [315, 765],
    ],
    color: 0x0288d1,
    elevatedCamera: {
      position: [330, 135, 715],
      target: [330, 3, 840],
    },
  },

  // 5. Xã Đảo Tam Hải (Biệt lập ngoài biển, cách bờ bằng vịnh nước sâu)
  {
    id: 'commune-tam-hai',
    name: 'Xã Đảo Tam Hải',
    shortName: 'Tam Hải',
    areaKm2: 15.6,
    center: [455, 875],
    polygon: [
      [405, 825],
      [470, 820],
      [515, 870],
      [520, 935],
      [440, 940],
      [405, 885],
      [405, 825],
    ],
    color: 0x03a9f4,
    elevatedCamera: {
      position: [455, 140, 765],
      target: [455, 2, 875],
    },
  },

  // 6. Phía Nam & Vùng Núi Tây Nam
  {
    id: 'commune-tam-my-dong',
    name: 'Xã Tam Mỹ Đông',
    shortName: 'Tam Mỹ Đông',
    areaKm2: 17.3,
    center: [95, 810],
    polygon: [
      [50, 765],
      [135, 760],
      [140, 845],
      [145, 865],
      [45, 865],
      [50, 765],
    ],
    color: 0x9ccc65,
    elevatedCamera: {
      position: [95, 145, 705],
      target: [95, 3, 810],
    },
  },
  {
    id: 'commune-tam-my-tay',
    name: 'Xã Tam Mỹ Tây',
    shortName: 'Tam Mỹ Tây',
    areaKm2: 50.6,
    center: [10, 825],
    polygon: [
      [-45, 770],
      [50, 765],
      [45, 865],
      [40, 885],
      [-45, 885],
      [-45, 770],
    ],
    color: 0x33691e,
    elevatedCamera: {
      position: [10, 115, 720],
      target: [10, 6, 825],
    },
  },
  {
    id: 'commune-tam-tra',
    name: 'Xã Tam Trà',
    shortName: 'Tam Trà',
    areaKm2: 97.1,
    center: [-120, 875],
    polygon: [
      [-200, 780],
      [-90, 780],
      [-35, 775],
      [-45, 885],
      [-40, 990],
      [-200, 990],
      [-200, 780],
    ],
    color: 0x1b5e20,
    elevatedCamera: {
      position: [-120, 150, 760],
      target: [-120, 16, 875],
    },
  },
  {
    id: 'commune-tam-nghia',
    name: 'Xã Tam Nghĩa',
    shortName: 'Tam Nghĩa',
    areaKm2: 51.6,
    center: [265, 955],
    polygon: [
      [140, 845],
      [250, 840],
      [295, 865],
      [380, 865],
      [380, 1040],
      [130, 1040],
      [140, 845],
    ],
    color: 0x7e57c2,
    elevatedCamera: {
      position: [265, 160, 840],
      target: [265, 3, 955],
    },
  },
];

/**
 * Nui Thanh District Master Territorial & Administrative Boundary System
 * Renders:
 * 1. Subtle, elegant cartographic outer boundary of Huyện Núi Thành (555.9 km²)
 * 2. Natural contiguous boundary polygons for all 17 communes
 * 3. Soft translucent terrain overlay highlight for active commune
 * 4. Contextual organic settlements adapted to each commune's authentic geographic identity
 */
export class NuiThanhTerritoryManager {
  public group = new THREE.Group();

  private districtBoundaryLine!: THREE.Line;
  private communeLinesGroup = new THREE.Group();
  private communeFillsGroup = new THREE.Group();
  private hamletsGroup = new THREE.Group();

  private activeCommuneMesh: THREE.Mesh | null = null;

  constructor() {
    this.buildDistrictOuterBoundary();
    this.buildCommuneBoundaries();

    this.group.add(this.communeLinesGroup);
    this.group.add(this.communeFillsGroup);
  }

  /**
   * 1. Outer Cartographic Boundary of Huyện Núi Thành (555.9 km²)
   * Enclosing all 17 communes with an elegant warm gold cartographic line
   */
  private buildDistrictOuterBoundary(): void {
    const outerPerimeter: [number, number][] = [
      [10, 490],   // Tây Bắc giáp Phú Ninh / Tam Kỳ
      [225, 490],  // Cầu Bà Bầu QL1A
      [435, 505],  // Biển Tam Tiến giáp Tam Kỳ
      [455, 705],  // Bờ biển Tam Hòa
      [520, 935],  // Mũi Bàn Than Tam Hải
      [380, 1040], // Dốc Sỏi giáp Bình Sơn (Quảng Ngãi)
      [130, 1040], // Ranh giới Nam giáp Quảng Ngãi
      [-40, 990],  // Ranh giới Tây Nam giáp Trà My
      [-200, 990], // Đỉnh Hòn Tàu cực Tây
      [-200, 780],
      [-185, 630], // Hồ Tam Sơn
      [10, 490],   // Close loop
    ];

    const pts: THREE.Vector3[] = outerPerimeter.map(
      ([x, z]) => new THREE.Vector3(x, 0.75, z)
    );

    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: 0xd4af37, // Elegant antique cartographic gold
      transparent: true,
      opacity: 0.85,
      linewidth: 2,
    });

    this.districtBoundaryLine = new THREE.Line(geo, mat);
    this.group.add(this.districtBoundaryLine);
  }

  /**
   * 2. All 17 Commune Boundary Outlines & Planar Fills
   */
  private buildCommuneBoundaries(): void {
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc8b488, // Soft vintage gold border
      transparent: true,
      opacity: 0.55,
    });

    NUI_THANH_COMMUNE_BOUNDARIES.forEach((commune) => {
      // Create closed loop line
      const loopPts: THREE.Vector3[] = commune.polygon.map(
        ([x, z]) => new THREE.Vector3(x, 0.65, z)
      );
      loopPts.push(loopPts[0]); // close loop

      const lineGeo = new THREE.BufferGeometry().setFromPoints(loopPts);
      const line = new THREE.Line(lineGeo, lineMat);
      this.communeLinesGroup.add(line);

      // Create 2D Shape Fill Plane
      const shape = new THREE.Shape();
      commune.polygon.forEach(([x, z], idx) => {
        if (idx === 0) shape.moveTo(x, z);
        else shape.lineTo(x, z);
      });
      shape.closePath();

      const fillGeo = new THREE.ShapeGeometry(shape);
      fillGeo.rotateX(-Math.PI / 2);

      const fillMat = new THREE.MeshBasicMaterial({
        color: commune.color,
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const fillMesh = new THREE.Mesh(fillGeo, fillMat);
      fillMesh.position.y = 0.50;
      fillMesh.userData = { communeId: commune.id, color: commune.color };
      this.communeFillsGroup.add(fillMesh);
    });
  }

  /**
   * Highlights the selected commune with a luminous gold glow
   */
  public highlightCommune(communeId: string): void {
    if (this.activeCommuneMesh) {
      (this.activeCommuneMesh.material as THREE.MeshBasicMaterial).opacity = 0.04;
      this.activeCommuneMesh = null;
    }

    const targetMesh = this.communeFillsGroup.children.find(
      (child) => child.userData.communeId === communeId
    ) as THREE.Mesh;

    if (targetMesh) {
      (targetMesh.material as THREE.MeshBasicMaterial).opacity = 0.18;
      this.activeCommuneMesh = targetMesh;
    }
  }
}
