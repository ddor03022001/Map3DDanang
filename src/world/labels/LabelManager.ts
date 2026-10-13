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
 * Elegant cartographic badges reproducing the aesthetics of duancuulong.com
 * Features:
 * - Proper geographic distribution avoiding overlaps
 * - depthTest: true so labels respect terrain and distance
 * - Refined compact scale
 */
export class LabelManager {
  public group = new THREE.Group();

  private labelSprites: THREE.Sprite[] = [];

  constructor() {
    this.createFloatingLabels();
  }

  private createFloatingLabels(): void {
    const labelsData: FloatingLabelPOI[] = [
      // 1. Mountain Peaks with Elevation (Đỉnh núi cao hùng vĩ)
      {
        id: 'nui-chua',
        text: 'Bà Nà (Núi Chúa) 1.487 m',
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
        subtext: 'Xã Tam Trà - Đại ngàn rừng nguyên sinh',
        position: [-100, 98, 860],
        isMountainPeak: true,
      },
      {
        id: 'ngu-hanh-son',
        text: 'Ngũ Hành Sơn 108 m',
        subtext: 'Danh thắng 5 ngọn núi đá vôi',
        position: [220, 32, 380],
        isMountainPeak: true,
      },

      // 2. Điểm Đến Tiêu Biểu Núi Thành (Key Landmarks - Cách nhau hàng trăm mét, không chồng lấn)
      {
        id: 'thaco-complex',
        text: 'KCN Ô Tô THACO Chu Lai',
        subtext: 'Đại phức hợp 1.200 ha • Xã Tam Hiệp',
        position: [280, 22, 715],
      },
      {
        id: 'chu-lai-overpass',
        text: 'Cầu Vượt Cây Xương Rồng',
        subtext: 'Nút giao QL1A vòng xuyến 2 tầng',
        position: [205, 16, 720],
      },
      {
        id: 'chu-lai-airport',
        text: 'Sân Bay Quốc Tế Chu Lai',
        subtext: 'Đường băng 4.050m dài nhất VN • Xã Tam Nghĩa',
        position: [285, 20, 925],
      },
      {
        id: 'cang-ky-ha',
        text: 'Cảng Kỳ Hà & Bến Cá',
        subtext: 'Âu thuyền Vịnh An Hòa • Xã Tam Quang',
        position: [320, 16, 830],
      },
      {
        id: 'ban-than-tam-hai',
        text: 'Kỳ Quan Ghềnh Bàn Than',
        subtext: 'Trầm tích đá đen & Cổng Tò Vò • Xã Đảo Tam Hải',
        position: [465, 18, 885],
        isMountainPeak: true,
      },
      {
        id: 'ho-giang-thom',
        text: 'Thác Hố Giang Thơm (11 Tầng)',
        subtext: 'Kiệt tác thiên nhiên • Xã Tam Mỹ Tây',
        position: [15, 20, 825],
        isMountainPeak: true,
      },
      {
        id: 'tam-son-reservoir',
        text: 'Lòng Hồ Thủy Lợi Tam Sơn',
        subtext: 'Hồ sinh thái mênh mông • Xã Tam Sơn',
        position: [-60, 16, 710],
      },
      {
        id: 'nui-thanh-town',
        text: 'Thị Trấn Núi Thành',
        subtext: 'Trung tâm hành chính bên sông An Tân',
        position: [195, 18, 800],
      },

      // 3. Toàn bộ 17 Đơn vị Hành chính Xã/Thị Trấn (Đặt đúng tâm địa lý, kèm diện tích chuẩn)
      {
        id: 'label-tam-xuan-1',
        text: 'Xã Tam Xuân 1 (13.9 km²)',
        subtext: 'Cửa ngõ Bắc giáp Tam Kỳ',
        position: [195, 18, 535],
      },
      {
        id: 'label-tam-xuan-2',
        text: 'Xã Tam Xuân 2 (26.8 km²)',
        subtext: 'Vùng đồi gò nông lâm nghiệp',
        position: [90, 18, 535],
      },
      {
        id: 'label-tam-tien',
        text: 'Xã Tam Tiến (20.6 km²)',
        subtext: 'Chợ cá rạng đông bãi biển',
        position: [350, 18, 560],
      },
      {
        id: 'label-tam-anh-bac',
        text: 'Xã Tam Anh Bắc (21.0 km²)',
        subtext: 'KCN Tam Anh 2 sinh thái',
        position: [200, 18, 600],
      },
      {
        id: 'label-tam-anh-nam',
        text: 'Xã Tam Anh Nam (21.9 km²)',
        subtext: 'KCN Tam Anh 1 & QL1A',
        position: [195, 18, 665],
      },
      {
        id: 'label-tam-hoa',
        text: 'Xã Tam Hòa (22.6 km²)',
        subtext: 'Sông Trường Giang & Thủy sản',
        position: [330, 18, 655],
      },
      {
        id: 'label-tam-thanh',
        text: 'Xã Tam Thạnh (53.9 km²)',
        subtext: 'Hồ chứa nước Thái Xuân & Rừng keo',
        position: [65, 18, 645],
      },
      {
        id: 'label-tam-son',
        text: 'Xã Tam Sơn (54.2 km²)',
        subtext: 'Hồ nước ngọt & Đập tràn',
        position: [-60, 20, 715],
      },
      {
        id: 'label-tam-hiep',
        text: 'Xã Tam Hiệp (42.1 km²)',
        subtext: 'Trái tim KKT Mở Chu Lai',
        position: [255, 20, 730],
      },
      {
        id: 'label-tam-giang',
        text: 'Xã Tam Giang (11.5 km²)',
        subtext: 'Ngã ba sông & Rừng dừa nước',
        position: [275, 18, 805],
      },
      {
        id: 'label-tam-quang',
        text: 'Xã Tam Quang (11.4 km²)',
        subtext: 'Cảng Kỳ Hà & Âu thuyền An Hòa',
        position: [335, 18, 815],
      },
      {
        id: 'label-tam-hai',
        text: 'Xã Đảo Tam Hải (15.6 km²)',
        subtext: 'Ốc đảo dừa & Ghềnh Bàn Than',
        position: [440, 20, 870],
      },
      {
        id: 'label-tam-my-dong',
        text: 'Xã Tam Mỹ Đông (17.3 km²)',
        subtext: 'Cánh đồng lúa phù sa màu mỡ',
        position: [105, 18, 815],
      },
      {
        id: 'label-tam-my-tay',
        text: 'Xã Tam Mỹ Tây (50.6 km²)',
        subtext: 'Thác Hố Giang Thơm 11 tầng',
        position: [15, 20, 825],
      },
      {
        id: 'label-tam-tra',
        text: 'Xã Tam Trà (97.1 km²)',
        subtext: 'Đỉnh Hòn Tàu 953m • Bản làng Cor',
        position: [-80, 22, 860],
      },
      {
        id: 'label-tam-nghia',
        text: 'Xã Tam Nghĩa (51.6 km²)',
        subtext: 'Sân bay Chu Lai & Cửa ngõ Dốc Sỏi',
        position: [245, 20, 920],
      },

      // 4. Central Da Nang Landmarks
      {
        id: 'dragon-bridge',
        text: 'Cầu Rồng Đà Nẵng',
        subtext: 'Sông Hàn',
        position: [0, 20, 0],
      },
      {
        id: 'thuan-phuoc-bridge',
        text: 'Cầu Thuận Phước',
        subtext: 'Cửa vịnh Đà Nẵng',
        position: [0, 22, -390],
      },
      {
        id: 'linh-ung-pagoda',
        text: 'Chùa Linh Ứng - Tượng Phật 67m',
        subtext: 'Bãi Bụt Sơn Trà',
        position: [480, 35, -420],
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
          new THREE.Vector3(label.position[0], label.position[1] - 2.5, label.position[2]),
        ];
        const pinGeo = new THREE.BufferGeometry().setFromPoints(pinPoints);
        const pinMat = new THREE.LineBasicMaterial({
          color: label.isMountainPeak ? 0xffc107 : 0x00bcd4,
          transparent: true,
          opacity: 0.5,
        });
        const pinLine = new THREE.Line(pinGeo, pinMat);
        this.group.add(pinLine);
      }
    });
  }

  private createLabelSprite(data: FloatingLabelPOI): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext('2d')!;

    // Rounded Pill Badge Background
    const isPeak = data.isMountainPeak;
    ctx.fillStyle = isPeak ? 'rgba(25, 30, 40, 0.90)' : 'rgba(252, 249, 242, 0.92)';
    ctx.roundRect(14, 14, 484, 112, 24);
    ctx.fill();

    // Border
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = isPeak ? '#ffb300' : '#0097a7';
    ctx.stroke();

    // Text: Primary Title
    ctx.font = 'bold 34px "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isPeak ? '#ffffff' : '#1c2430';
    ctx.textAlign = 'center';
    ctx.fillText(data.text, 256, data.subtext ? 60 : 76);

    // Subtext
    if (data.subtext) {
      ctx.font = '500 22px "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = isPeak ? '#ffd54f' : '#006064';
      ctx.fillText(data.subtext, 256, 98);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;

    const spriteMat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthTest: true, // Respects 3D depth to eliminate visual clutter
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(...data.position);

    // Refined compact scale
    const scaleX = data.isMountainPeak ? 26 : 22;
    const scaleY = scaleX * (140 / 512);
    sprite.scale.set(scaleX, scaleY, 1);

    return sprite;
  }
}
