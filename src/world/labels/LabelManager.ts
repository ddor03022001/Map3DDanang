import * as THREE from 'three';

export interface FloatingLabelPOI {
  id: string;
  text: string;
  subtext?: string;
  position: [number, number, number];
  isMountainPeak?: boolean;
}

/**
 * 3D Floating Labels System (Hệ thống Nhãn Địa Danh 3D Lơ Lửng)
 * Exactly reproduces the iconic 3D floating height badges of duancuulong.com (e.g. "Núi Cấm 705 m", "Núi Dài 554 m")
 */
export class LabelManager {
  public group = new THREE.Group();

  private labelSprites: THREE.Sprite[] = [];

  constructor() {
    this.createFloatingLabels();
  }

  private createFloatingLabels(): void {
    const labelsData: FloatingLabelPOI[] = [
      // 1. Mountain Peaks with Elevation (Đỉnh núi có độ cao)
      {
        id: 'nui-chua',
        text: 'Núi Chúa (Bà Nà) 1.487 m',
        subtext: 'Đỉnh cao nhất Đà Nẵng',
        position: [-520, 155, -120],
        isMountainPeak: true,
      },
      {
        id: 'son-tra-peak',
        text: 'Sơn Trà (Đỉnh Bàn Cờ) 696 m',
        subtext: 'Bán đảo Sơn Trà',
        position: [380, 78, -450],
        isMountainPeak: true,
      },
      {
        id: 'hai-van-peak',
        text: 'Đèo Hải Vân 496 m',
        subtext: 'Thiên hạ đệ nhất hùng quan',
        position: [-350, 62, -580],
        isMountainPeak: true,
      },
      {
        id: 'hon-tau',
        text: 'Hòn Tàu (Tây Núi Thành) 953 m',
        subtext: 'Dãy núi phía Tây',
        position: [-120, 102, 820],
        isMountainPeak: true,
      },
      {
        id: 'ngu-hanh-son',
        text: 'Ngũ Hành Sơn (Thủy Sơn) 108 m',
        subtext: 'Quần thể danh thắng',
        position: [220, 32, 380],
        isMountainPeak: true,
      },

      // 2. Núi Thành & Tam Hiệp Landmarks (Trọng điểm Núi Thành)
      {
        id: 'nui-thanh-district',
        text: 'Huyện Núi Thành',
        subtext: 'Khu Kinh Tế Mở Chu Lai',
        position: [210, 48, 790],
      },
      {
        id: 'tam-hiep-commune',
        text: 'Xã Tam Hiệp',
        subtext: 'Trung tâm công nghiệp THACO',
        position: [280, 38, 700],
      },
      {
        id: 'chu-lai-overpass',
        text: 'Cầu Vượt Cây Xương Rồng',
        subtext: 'Nút giao QL1A 2 tầng',
        position: [220, 16, 720],
      },
      {
        id: 'thaco-complex',
        text: 'KCN Ô Tô THACO Chu Lai',
        subtext: 'Tổ hợp sản xuất 1.200 ha',
        position: [330, 24, 720],
      },
      {
        id: 'chu-lai-port',
        text: 'Cảng Biển Chu Lai',
        subtext: 'Cảng container quốc tế',
        position: [490, 22, 720],
      },
      {
        id: 'chu-lai-airport',
        text: 'Sân Bay Chu Lai',
        subtext: 'Cảng hàng không quốc tế',
        position: [280, 22, 915],
      },
      {
        id: 'tam-hai-island',
        text: 'Xã Đảo Tam Hải',
        subtext: 'Ghềnh đá đen Bàn Than',
        position: [330, 20, 850],
      },
      {
        id: 'truong-giang-river',
        text: 'Sông Trường Giang',
        subtext: 'Tuyến đường thủy ven biển',
        position: [430, 14, 740],
      },

      // 3. Central Da Nang Landmarks
      {
        id: 'dragon-bridge',
        text: 'Cầu Rồng (Hải Châu - Sơn Trà)',
        subtext: 'Sông Hàn',
        position: [0, 22, 0],
      },
      {
        id: 'thuan-phuoc-bridge',
        text: 'Cầu Thuận Phước',
        subtext: 'Cửa vịnh Đà Nẵng',
        position: [0, 24, -390],
      },
      {
        id: 'linh-ung-pagoda',
        text: 'Chùa Linh Ứng - Tượng Phật 67m',
        subtext: 'Bãi Bụt Sơn Trà',
        position: [480, 35, -420],
      },
      {
        id: 'east-sea',
        text: 'B I Ể N   Đ Ô N G',
        position: [750, 28, 200],
      },
    ];

    labelsData.forEach((label) => {
      const sprite = this.createLabelSprite(label);
      this.labelSprites.push(sprite);
      this.group.add(sprite);

      // Add a tiny delicate vertical pin line from ground to label
      if (label.position[1] > 10) {
        const pinPoints = [
          new THREE.Vector3(label.position[0], 0.5, label.position[2]),
          new THREE.Vector3(label.position[0], label.position[1] - 3.5, label.position[2]),
        ];
        const pinGeo = new THREE.BufferGeometry().setFromPoints(pinPoints);
        const pinMat = new THREE.LineBasicMaterial({
          color: label.isMountainPeak ? 0xffc107 : 0x00e5ff,
          transparent: true,
          opacity: 0.55,
        });
        const pinLine = new THREE.Line(pinGeo, pinMat);
        this.group.add(pinLine);
      }
    });
  }

  private createLabelSprite(data: FloatingLabelPOI): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d')!;

    // Rounded Pill Badge Background
    const isPeak = data.isMountainPeak;
    ctx.fillStyle = isPeak ? 'rgba(25, 30, 40, 0.92)' : 'rgba(250, 247, 238, 0.94)';
    ctx.roundRect(16, 16, 480, 128, 28);
    ctx.fill();

    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = isPeak ? '#ffc107' : '#00b0ff';
    ctx.stroke();

    // Text: Primary Title
    ctx.font = 'bold 36px "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isPeak ? '#ffffff' : '#1c2430';
    ctx.textAlign = 'center';
    ctx.fillText(data.text, 256, data.subtext ? 68 : 88);

    // Subtext
    if (data.subtext) {
      ctx.font = '500 24px "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = isPeak ? '#ffc107' : '#007799';
      ctx.fillText(data.subtext, 256, 108);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;

    const spriteMat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthTest: false, // Ensures labels remain crisp and readable above geometry
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(...data.position);

    // Scale proportional to world units
    const scaleX = data.isMountainPeak ? 38 : 34;
    const scaleY = scaleX * (160 / 512);
    sprite.scale.set(scaleX, scaleY, 1);

    return sprite;
  }
}
