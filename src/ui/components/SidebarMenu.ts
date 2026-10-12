import type { CameraManager } from '@/core/CameraManager';
import type { InfoDisplayData } from './InfoPanel';

export interface ViewpointItem {
  id: string;
  name: string;
  districtId?: 'nui-thanh' | 'hai-chau' | 'son-tra' | 'hoa-vang' | 'ngu-hanh-son' | 'all';
  position: [number, number, number];
  target: [number, number, number];
  info: InfoDisplayData;
}

interface SidebarMenuProps {
  cameraManager: CameraManager;
  onSelectInfo: (info: InfoDisplayData) => void;
  onModeChange?: (mode: 'study' | 'explore') => void;
}

export const VIEWPOINTS: ViewpointItem[] = [
  // 1. Overview
  {
    id: 'toan-tinh',
    name: 'Toàn tỉnh',
    districtId: 'all',
    position: [0, 520, 750],
    target: [0, 0, 100],
    info: {
      badge: 'BẢN ĐỒ TOÀN CẢNH',
      title: 'Đà Nẵng - Quảng Nam',
      subtitle: 'Toàn cảnh địa lý tự nhiên và duyên hải',
      stats: [
        { label: 'Diện tích vùng', value: '11.800 km²' },
        { label: 'Bờ biển', value: 'Hơn 125 km' },
      ],
      description:
        'Toàn cảnh địa lý 3D từ Vịnh Đà Nẵng, đèo Hải Vân, bán đảo Sơn Trà trải dài xuống vùng trọng điểm kinh tế mở Chu Lai, Núi Thành.',
    },
  },
  {
    id: 'nui-thanh',
    name: 'Huyện Núi Thành',
    districtId: 'nui-thanh',
    position: [220, 180, 880],
    target: [260, 10, 720],
    info: {
      badge: 'HUYỆN ĐỊA PHƯƠNG',
      title: 'Huyện Núi Thành',
      subtitle: 'Trọng điểm công nghiệp phía Nam Quảng Nam',
      stats: [
        { label: 'Diện tích', value: '555.9 km²' },
        { label: 'Dân số', value: 'Hơn 160.000 người' },
      ],
      description:
        'Huyện Núi Thành gồm 16 xã và 1 thị trấn, sở hữu Khu Kinh Tế Mở Chu Lai, Sân bay Quốc tế Chu Lai, Cảng biển Kỳ Hà và tổ hợp sản xuất ô tô THACO.',
    },
  },

  // 2. Núi Thành & Tam Hiệp Core
  {
    id: 'tam-hiep',
    name: 'Xã Tam Hiệp - toàn cảnh',
    districtId: 'nui-thanh',
    position: [250, 95, 620],
    target: [280, 6, 720],
    info: {
      badge: 'XÃ TRỌNG ĐIỂM',
      title: 'Xã Tam Hiệp',
      subtitle: 'Trung tâm công nghiệp THACO & Nút giao Chu Lai',
      stats: [
        { label: 'Diện tích', value: '42.1 km²' },
        { label: 'Đặc thù', value: 'KCN Chu Lai & Cầu vượt 2 tầng' },
      ],
      description:
        'Xã Tam Hiệp là trái tim của Khu Kinh Tế Mở Chu Lai. Nơi đây tập trung các nhà máy sản xuất lắp ráp ô tô THACO, cầu vượt vòng xuyến 2 tầng Cây Xương Rồng và bến cảng container.',
    },
  },
  {
    id: 'cay-xuong-rong',
    name: 'Cầu vượt Cây Xương Rồng',
    districtId: 'nui-thanh',
    position: [192, 32, 685],
    target: [220, 4, 720],
    info: {
      badge: 'CÔNG TRÌNH GIAO THÔNG',
      title: 'Cầu Vượt Vòng Xuyến 2 Tầng Chu Lai',
      subtitle: 'Biểu tượng Tượng đài Cây Xương Rồng',
      stats: [
        { label: 'Năm khánh thành', value: '2018' },
        { label: 'Quy mô', value: 'Vòng xuyến 2 tầng vượt QL1A & Đường sắt' },
      ],
      description:
        'Nút giao cầu vượt vòng xuyến 2 tầng đầu tiên tại Việt Nam, ở tâm vòng xuyến là tượng đài Cây Xương Rồng vươn cao tượng trưng cho sức sống mãnh liệt của đất và người Núi Thành.',
    },
  },
  {
    id: 'thaco-complex',
    name: 'KCN Ô tô THACO',
    districtId: 'nui-thanh',
    position: [335, 78, 630],
    target: [295, 8, 720],
    info: {
      badge: 'KHU CÔNG NGHIỆP',
      title: 'Khu Phức Hợp Cơ Khí & Ô Tô THACO Chu Lai',
      subtitle: 'Đại bản doanh cơ khí ô tô lớn nhất Việt Nam',
      stats: [
        { label: 'Quy mô', value: 'Hơn 1.200 ha' },
        { label: 'Khởi công', value: 'Năm 2003' },
      ],
      description:
        'Khu phức hợp công nghiệp sản xuất ô tô THACO gồm các nhà máy THACO Mazda, THACO KIA, Bus & Truck, trung tâm linh kiện phụ tùng và đường thử xe đạt chuẩn quốc tế.',
    },
  },
  {
    id: 'thaco-mazda',
    name: 'Nhà máy THACO Mazda',
    districtId: 'nui-thanh',
    position: [305, 38, 675],
    target: [315, 6, 685],
    info: {
      badge: 'NHÀ MÁY LẮP RÁP',
      title: 'Nhà Máy THACO Mazda Chu Lai',
      subtitle: 'Nhà máy xe du lịch Mazda hiện đại nhất Đông Nam Á',
      stats: [{ label: 'Công suất', value: '100.000 xe/năm' }],
      description:
        'Nhà máy tự động hóa cao cấp với xưởng hàn robot, xưởng sơn nhúng tĩnh điện liên tục và xưởng lắp ráp hoàn thiện xuất xưởng xe sang toàn quốc.',
    },
  },
  {
    id: 'cang-chu-lai',
    name: 'Cảng Biển Chu Lai',
    districtId: 'nui-thanh',
    position: [520, 52, 660],
    target: [490, 8, 720],
    info: {
      badge: 'CẢNG BIỂN NƯỚC SÂU',
      title: 'Cảng Biển Quốc Tế Chu Lai & Tam Hiệp',
      subtitle: 'Cửa ngõ logistics hàng hải miền Trung',
      stats: [
        { label: 'Bến cảng', value: 'Tiếp nhận tàu 50.000 DWT' },
        { label: 'Thiết bị', value: 'Cẩu giàn STS hiện đại' },
      ],
      description:
        'Cảng biển nước sâu Chu Lai nằm tại cửa sông Tam Hiệp, kết nối trực tiếp các tuyến vận tải biển quốc tế đi Nhật Bản, Hàn Quốc, Trung Quốc.',
    },
  },
  {
    id: 'duong-sat',
    name: 'Đường sắt Bắc Nam',
    districtId: 'nui-thanh',
    position: [195, 22, 690],
    target: [208, 2, 700],
    info: {
      badge: 'HẠ TẦNG GIAO THÔNG',
      title: 'Tuyến Đường Sắt Bắc - Nam & Ga Chu Lai',
      subtitle: 'Tuyến huyết mạch đường sắt quốc gia',
      description:
        'Tuyến đường sắt chạy song song Quốc lộ 1A qua địa phận Xã Tam Hiệp. Cầu vượt Chu Lai được thiết kế đặc biệt vượt qua cả tuyến ray thép này.',
    },
  },
  {
    id: 'ubnd-tam-hiep',
    name: 'UBND Xã Tam Hiệp',
    districtId: 'nui-thanh',
    position: [135, 32, 680],
    target: [165, 4, 710],
    info: {
      badge: 'HÀNH CHÍNH XÃ',
      title: 'Trụ sở UBND Xã Tam Hiệp',
      subtitle: 'Trung tâm chính trị - văn hóa địa phương',
      description:
        'Trụ sở UBND Xã Tam Hiệp với khuôn viên khang trang, cột cờ Tổ quốc, trạm y tế và trường học phục vụ đời sống cư dân địa phương.',
    },
  },
  {
    id: 'cho-tam-hiep',
    name: 'Chợ Tam Hiệp',
    districtId: 'nui-thanh',
    position: [140, 22, 655],
    target: [140, 4, 665],
    info: {
      badge: 'DÂN SINH',
      title: 'Chợ Dân Sinh Tam Hiệp',
      subtitle: 'Khu thương mại sầm uất ven Quốc lộ 1A',
      description:
        'Khu chợ truyền thống buôn bán nông sản, thủy hải sản tươi sống từ sông An Tân và vịnh An Hòa, phục vụ hàng nghìn công nhân và người dân.',
    },
  },
  {
    id: 'san-bay-chu-lai',
    name: 'Sân bay Chu Lai',
    districtId: 'nui-thanh',
    position: [260, 85, 870],
    target: [280, 2, 915],
    info: {
      badge: 'HÀNG KHÔNG',
      title: 'Cảng Hàng Không Quốc Tế Chu Lai',
      subtitle: 'Sân bay có đường băng dài nhất Việt Nam (4.050m)',
      stats: [{ label: 'Đường băng', value: '4.050m x 45m' }],
      description:
        'Cảng hàng không có diện tích lớn nhất cả nước (hơn 2.000 ha), định hướng trở thành trung tâm trung chuyển hàng hóa và sửa chữa máy bay quốc tế.',
    },
  },
  {
    id: 'tam-hai',
    name: 'Xã Đảo Tam Hải',
    districtId: 'nui-thanh',
    position: [330, 80, 820],
    target: [320, 2, 850],
    info: {
      badge: 'DANH THẮNG BIỂN ĐẢO',
      title: 'Xã Đảo Tam Hải',
      subtitle: 'Ghềnh đá đen Bàn Than & Rặng dừa biển',
      description:
        'Xã đảo biệt lập được bao bọc bởi một mặt biển và ba mặt sông, nổi tiếng với di tích ghềnh đá Bàn Than đen tuyền kỳ ảo hàng triệu năm tuổi.',
    },
  },
  {
    id: 'ruong-lua-tam-hiep',
    name: 'Ruộng lúa Tam Hiệp',
    districtId: 'nui-thanh',
    position: [120, 45, 680],
    target: [180, 2, 720],
    info: {
      badge: 'NÔNG NGHIỆP',
      title: 'Đồng Lúa Duyên Hải Tam Hiệp',
      subtitle: 'Vùng canh tác truyền thống ven chân đồi',
      description:
        'Những ô ruộng lúa bàn cờ trải dài xen kẽ giữa các dải cát ven biển và triền đồi đất đỏ Núi Thành.',
    },
  },
  {
    id: 'song-truong-giang',
    name: 'Sông Trường Giang',
    districtId: 'nui-thanh',
    position: [450, 60, 710],
    target: [430, 2, 740],
    info: {
      badge: 'ĐƯỜNG THỦY TỰ NHIÊN',
      title: 'Sông Trường Giang',
      subtitle: 'Dòng sông lạch nước mặn nối Hội An đến Chu Lai',
      description:
        'Con sông dài hơn 60km chảy song song bờ biển Quảng Nam, cung cấp nguồn nước cho các hồ nuôi tôm sinh thái và lưu thông tàu bè.',
    },
  },

  // 3. Central Da Nang & Mountain Viewpoints
  {
    id: 'son-tra',
    name: 'Bán đảo Sơn Trà',
    districtId: 'son-tra',
    position: [380, 110, -380],
    target: [380, 30, -450],
    info: {
      badge: 'KHU BẢO TỒN TỰ NHIÊN',
      title: 'Bán Đảo Sơn Trà',
      subtitle: 'Lá phổi xanh của Đà Nẵng & Vương quốc Voọc chà vá',
      description:
        'Bán đảo nhô ra biển Đông với hệ sinh thái rừng nguyên sinh nhiệt đới đa dạng, bao bọc che chắn cho Vịnh Đà Nẵng.',
    },
  },
  {
    id: 'dinh-ban-co',
    name: 'Từ đỉnh Núi Két / Bàn Cờ',
    districtId: 'son-tra',
    position: [380, 92, -420],
    target: [380, 70, -450],
    info: {
      badge: 'ĐỈNH NÚI CAO',
      title: 'Đỉnh Bàn Cờ 696 m',
      subtitle: 'Điểm cao nhất bán đảo Sơn Trà',
      description:
        'Từ đỉnh núi nhìn bao quát toàn bộ thành phố Đà Nẵng, đèo Hải Vân và biển Đông bao la.',
    },
  },
  {
    id: 'chua-linh-ung',
    name: 'Chùa Linh Ứng - Bãi Bụt',
    districtId: 'son-tra',
    position: [480, 45, -400],
    target: [480, 25, -430],
    info: {
      badge: 'TÂM LINH & DU LỊCH',
      title: 'Chùa Linh Ứng Bãi Bụt',
      subtitle: 'Tượng Phật Bà Quán Thế Âm cao 67m',
      description:
        'Ngôi chùa thanh tịnh tựa lưng vào bán đảo, hướng mắt ra biển Đông che chở cho ngư dân bình an.',
    },
  },
  {
    id: 'cau-rong',
    name: 'Cầu Rồng - Hải Châu',
    districtId: 'hai-chau',
    position: [0, 35, 75],
    target: [0, 5, 0],
    info: {
      badge: 'BIỂU TƯỢNG ĐÔ THỊ',
      title: 'Cầu Rồng Đà Nẵng',
      subtitle: 'Cầu thép hình rồng dài 666m phun lửa và nước',
      description:
        'Cây cầu biểu tượng vươn mình ra biển lớn, bắc qua sông Hàn nối quận Hải Châu và Sơn Trà.',
    },
  },
  {
    id: 'cau-thuan-phuoc',
    name: 'Cầu Thuận Phước',
    districtId: 'hai-chau',
    position: [55, 45, -330],
    target: [0, 8, -390],
    info: {
      badge: 'CẦU TREO DÂY VÕNG',
      title: 'Cầu Thuận Phước',
      subtitle: 'Cầu treo dây võng dài nhất Việt Nam',
      description:
        'Cây cầu vắt ngang cửa biển Vịnh Đà Nẵng với chiều dài 1.856m, ngắm hoàng hôn rực rỡ.',
    },
  },
  {
    id: 'cau-song-han',
    name: 'Cầu Sông Hàn',
    districtId: 'hai-chau',
    position: [2, 40, -100],
    target: [2, 6, -125],
    info: {
      badge: 'CẦU QUAY LỊCH SỬ',
      title: 'Cầu Quay Sông Hàn',
      subtitle: 'Cây cầu quay đầu tiên do kỹ sư Việt Nam thiết kế',
      description:
        'Cầu quay góc 90 độ hàng đêm để tàu thuyền lưu thông trên dòng sông Hàn thơ mộng.',
    },
  },
  {
    id: 'ba-na-hills',
    name: 'Bà Nà Hills - Cầu Vàng',
    districtId: 'hoa-vang',
    position: [-480, 140, -100],
    target: [-530, 85, -130],
    info: {
      badge: 'DANH THẮNG NÚI CAO',
      title: 'Bà Nà Hills & Cầu Vàng',
      subtitle: 'Đỉnh Núi Chúa cao 1.487m',
      description:
        'Cây cầu Vàng độc đáo được nâng đỡ bởi hai bàn tay khổng lồ rêu phong giữa mây ngàn Bà Nà.',
    },
  },
  {
    id: 'ngu-hanh-son',
    name: 'Ngũ Hành Sơn',
    districtId: 'ngu-hanh-son',
    position: [240, 80, 320],
    target: [220, 20, 380],
    info: {
      badge: 'DANH THẮNG ĐÁ VÔI',
      title: 'Quần Thể Ngũ Hành Sơn',
      subtitle: 'Năm ngọn núi Kim, Mộc, Thủy, Hỏa, Thổ',
      description:
        'Di tích quốc gia đặc biệt với nhiều hang động huyền bí, chùa cổ và làng nghề điêu khắc đá Non Nước.',
    },
  },
  {
    id: 'deo-hai-van',
    name: 'Đèo Hải Vân',
    districtId: 'hoa-vang',
    position: [-320, 85, -520],
    target: [-350, 45, -580],
    info: {
      badge: 'DANH THẮNG ĐÈO',
      title: 'Đèo Hải Vân',
      subtitle: 'Ranh giới tự nhiên giữa Thừa Thiên Huế và Đà Nẵng',
      description:
        'Cung đường đèo uốn lượn hùng vĩ cao gần 500m nhìn xuống bờ biển Lăng Cô và vịnh Đà Nẵng.',
    },
  },
  {
    id: 'bien-my-khe',
    name: 'Bãi biển Mỹ Khê',
    districtId: 'ngu-hanh-son',
    position: [210, 45, 20],
    target: [200, 2, 0],
    info: {
      badge: 'DU LỊCH BIỂN',
      title: 'Bãi Biển Mỹ Khê',
      subtitle: 'Một trong những bãi biển quyến rũ nhất hành tinh',
      description:
        'Bãi cát trắng mịn, làn nước trong xanh và những hàng dừa nghiêng bóng soi bóng biển Đông.',
    },
  },
];

/**
 * Sidebar Navigation Menu mirroring the vintage cartographic design of duancuulong.com
 * Features:
 * - Brand Card Header ("Dự án Đà Nẵng - Quảng Nam / Bản đồ 3D...")
 * - Segmented Mode Toggle ("Học tập" / "Khám phá 3D")
 * - District filter pills
 * - 2-Column Grid of 24 quick viewpoints
 */
export class SidebarMenu {
  public element: HTMLElement;
  private cameraManager: CameraManager;
  private onSelectInfo: (info: InfoDisplayData) => void;
  private onModeChange?: (mode: 'study' | 'explore') => void;

  private currentMode: 'study' | 'explore' = 'study';
  private currentDistrictFilter: string = 'all';
  private currentActiveId: string = 'tam-hiep';

  constructor(props: SidebarMenuProps) {
    this.cameraManager = props.cameraManager;
    this.onSelectInfo = props.onSelectInfo;
    this.onModeChange = props.onModeChange;

    this.element = document.createElement('aside');
    this.element.className = 'dcl-sidebar';

    this.render();
  }

  public render(): void {
    // Filter viewpoints based on selected district
    const filtered =
      this.currentDistrictFilter === 'all'
        ? VIEWPOINTS
        : VIEWPOINTS.filter(
            (v) => v.districtId === this.currentDistrictFilter || v.districtId === 'all'
          );

    const gridHtml = filtered
      .map(
        (vp) => `
        <button class="dcl-view-btn ${vp.id === this.currentActiveId ? 'active' : ''}" data-id="${vp.id}">
          <span>${vp.name}</span>
        </button>
      `
      )
      .join('');

    this.element.innerHTML = `
      <!-- Brand Box (duancuulong.com style) -->
      <div class="dcl-brand-card">
        <button class="dcl-menu-burger" id="dcl-menu-burger" title="Mở rộng menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="dcl-brand-titles">
          <h1 class="dcl-title">Bản Đồ 3D Đà Nẵng - Núi Thành</h1>
          <div class="dcl-subtitle">Khu Kinh Tế Mở Chu Lai - Xã Tam Hiệp (2026)</div>
        </div>
      </div>

      <!-- Mode Selector (CHẾ ĐỘ) -->
      <div class="dcl-section dcl-mode-section">
        <div class="dcl-section-label">CHẾ ĐỘ</div>
        <div class="dcl-mode-toggle">
          <button class="dcl-mode-btn ${this.currentMode === 'study' ? 'active' : ''}" data-mode="study">
            Học tập
          </button>
          <button class="dcl-mode-btn ${this.currentMode === 'explore' ? 'active' : ''}" data-mode="explore">
            Khám phá
          </button>
        </div>
        <div class="dcl-mode-desc">
          ${
            this.currentMode === 'study'
              ? 'Bản đồ địa lý thuần: hiển thị địa hình 3D, ruộng lúa, công trình và ranh giới.'
              : 'Chế độ tương tác tự do: bay tự do, khám phá chi tiết nhà cửa và phân khu.'
          }
        </div>
      </div>

      <!-- District Filter Chips -->
      <div class="dcl-section dcl-filter-section">
        <div class="dcl-section-label">LỌC KHU VỰC</div>
        <div class="dcl-filter-chips">
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'all' ? 'active' : ''}" data-dist="all">Tất cả</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'nui-thanh' ? 'active' : ''}" data-dist="nui-thanh">Núi Thành</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'hai-chau' ? 'active' : ''}" data-dist="hai-chau">Hải Châu</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'son-tra' ? 'active' : ''}" data-dist="son-tra">Sơn Trà</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'hoa-vang' ? 'active' : ''}" data-dist="hoa-vang">Hòa Vang</button>
        </div>
      </div>

      <!-- 2-Column Grid Viewpoints (GÓC NHÌN) -->
      <div class="dcl-section dcl-viewpoints-section">
        <div class="dcl-section-label">GÓC NHÌN</div>
        <div class="dcl-grid-container">
          ${gridHtml}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // 1. Mode Buttons
    const modeBtns = this.element.querySelectorAll<HTMLButtonElement>('.dcl-mode-btn');
    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode as 'study' | 'explore';
        this.currentMode = mode;
        this.onModeChange?.(mode);
        this.render();
      });
    });

    // 2. District Filter Chips
    const chips = this.element.querySelectorAll<HTMLButtonElement>('.dcl-filter-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        this.currentDistrictFilter = chip.dataset.dist || 'all';
        this.render();
      });
    });

    // 3. 2-Column Grid Viewpoint Buttons
    const viewBtns = this.element.querySelectorAll<HTMLButtonElement>('.dcl-view-btn');
    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = VIEWPOINTS.find((v) => v.id === id);
        if (item) {
          this.selectViewpoint(item);
        }
      });
    });
  }

  public selectViewpoint(item: ViewpointItem): void {
    this.currentActiveId = item.id;
    const viewBtns = this.element.querySelectorAll<HTMLButtonElement>('.dcl-view-btn');
    viewBtns.forEach((b) => b.classList.toggle('active', b.dataset.id === item.id));

    this.cameraManager.flyTo(item.position, item.target);
    this.onSelectInfo(item.info);
  }
}
