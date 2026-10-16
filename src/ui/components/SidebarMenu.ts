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
  onSelectViewpoint?: (item: ViewpointItem) => void;
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
    position: [180, 480, 1150],
    target: [180, 0, 750],
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
    position: [250, 115, 830],
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
        'Xã Tam Hiệp là trái tim của Khu Kinh Tế Mở Chu Lai. Nơi đây hội tụ từ vùng rừng đồi keo bát úp phía Tây, làng cổ Thôn Thái Xuân, Chùa Tam Hiệp đến Đại phức hợp ô tô THACO, Cầu vượt Cây Xương Rồng, Đầm tôm và Cảng biển quốc tế Chu Lai.',
    },
  },
  {
    id: 'doi-keo-tam-hiep',
    name: 'Rừng đồi keo Tây Tam Hiệp',
    districtId: 'nui-thanh',
    position: [30, 45, 790],
    target: [70, 12, 715],
    info: {
      badge: 'RỪNG NÚI & ĐẤT ĐỎ',
      title: 'Vùng Gò Đồi Keo Tây Tam Hiệp (128m)',
      subtitle: 'Rừng keo lá tràm, đất đỏ bazan giáp Tam Mỹ Tây',
      stats: [
        { label: 'Độ cao', value: '128 m' },
        { label: 'Cây trồng', value: 'Keo lá tràm, bạch đàn, sắn' },
      ],
      description:
        'Vùng đồi bát úp phía Tây xã Tam Hiệp với những cánh rừng keo tràm bạt ngàn, đường đất đỏ bazan uốn lượn, suối nước tự nhiên và chòi canh lửa rừng trên đỉnh đồi.',
    },
  },
  {
    id: 'thon-thai-xuan',
    name: 'Thôn Thái Xuân & Chùa Tam Hiệp',
    districtId: 'nui-thanh',
    position: [110, 26, 735],
    target: [142, 4, 680],
    info: {
      badge: 'LÀNG QUÊ TRUYỀN THỐNG',
      title: 'Làng Quê Thôn Thái Xuân & Chùa Cổ',
      subtitle: 'Mái nhà ngói đỏ, sân phơi gạch & Đình Làng Tam Hiệp',
      stats: [
        { label: 'Kiến trúc', value: 'Nhà cấp 4 chữ L, ngói đỏ, Chùa cong mái' },
        { label: 'Cây cối', value: 'Cây đa, dừa, chuối, hàng cau' },
      ],
      description:
        'Khu dân cư cổ kính và thanh bình của xã Tam Hiệp: Những ngôi nhà cấp 4 chữ L ngói đỏ rêu phong, sân gạch đỏ phơi thóc, bồn nước Inox, Chùa Tam Hiệp 2 tầng mái cong chạm rồng và cây bồ đề đại thụ sum suê.',
    },
  },
  {
    id: 'dam-tom-tam-hiep',
    name: 'Đầm tôm sông Trường Giang',
    districtId: 'nui-thanh',
    position: [350, 36, 810],
    target: [395, 2, 760],
    info: {
      badge: 'THỦY VỰC & NUÔI TÔM',
      title: 'Đầm Nuôi Tôm Sinh Thái Tam Hiệp',
      subtitle: 'Hệ thống vuông tôm, thuyền thúng & rừng phi lao ven sông',
      stats: [
        { label: 'Mô hình', value: 'Nuôi tôm thẻ chân trắng công nghệ cao' },
        { label: 'Hệ sinh thái', value: 'Sông Trường Giang & Vịnh An Hòa' },
      ],
      description:
        'Hệ thống 8 vuông tôm thương phẩm với guồng quạt oxy xoay tít tung bọt trắng, chòi canh tôm trên cọc gỗ, cầu tre, thuyền thúng nan tre và rặng phi lao chắn gió ven cồn cát.',
    },
  },
  {
    id: 'cay-xuong-rong',
    name: 'Cầu vượt Cây Xương Rồng',
    districtId: 'nui-thanh',
    position: [205, 45, 780],
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
    position: [335, 78, 810],
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
    position: [305, 38, 735],
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
    position: [340, 50, 790],
    target: [310, 8, 725],
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
    position: [175, 40, 760],
    target: [208, 2, 710],
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
    position: [135, 32, 760],
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
    position: [140, 22, 715],
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
    id: 'nui-thanh-town',
    name: 'Thị trấn Núi Thành',
    districtId: 'nui-thanh',
    position: [180, 68, 885],
    target: [220, 4, 825],
    info: {
      badge: 'ĐÔ THỊ TRUNG TÂM',
      title: 'Thị Trấn Núi Thành & Sông An Tân',
      subtitle: 'Trung tâm chính trị, văn hóa, thương mại huyện',
      stats: [
        { label: 'Diện tích', value: '4.5 km²' },
        { label: 'Giao thông', value: 'Cầu An Tân, Ga Núi Thành, QL1A' },
      ],
      description:
        'Trung tâm huyện Núi Thành sầm uất ven dòng sông An Tân hiền hòa, với trụ sở UBND huyện, quảng trường trung tâm, chợ thương mại và nhà ga xe lửa Bắc - Nam.',
    },
  },
  {
    id: 'quang-truong-nui-thanh',
    name: 'Quảng trường Núi Thành',
    districtId: 'nui-thanh',
    position: [205, 42, 855],
    target: [205, 4, 790],
    info: {
      badge: 'QUẢNG TRƯỜNG TRUNG TÂM',
      title: 'Quảng Trường Núi Thành (24-3)',
      subtitle: 'Kỳ đài cờ Tổ quốc 16m, Đài phun nước nghệ thuật & Sân khấu ngoài trời',
      stats: [
        { label: 'Quy mô', value: 'Quảng trường lễ hội 65m x 48m lát đá granite' },
        { label: 'Điểm nhấn', value: 'Kỳ đài 16m, Đài phun nước nghệ thuật, Vườn hoa cau vua' },
      ],
      description:
        'Trái tim sinh hoạt cộng đồng và không gian tổ chức các sự kiện văn hóa - chính trị lớn nhất huyện Núi Thành. Nổi bật với kỳ đài cờ đỏ sao vàng tung bay trên nền trời, đài phun nước trung tâm, công viên bồn hoa cau vua và tầm nhìn thoáng đãng hướng ra dòng sông An Tân hiền hòa.',
    },
  },
  {
    id: 'tuong-dai-nui-thanh',
    name: 'Tượng đài Chiến thắng',
    districtId: 'nui-thanh',
    position: [225, 24, 855],
    target: [265, 12, 805],
    info: {
      badge: 'DI TÍCH LỊCH SỬ',
      title: 'Tượng Đài Chiến Thắng Núi Thành',
      subtitle: 'Di tích lịch sử cấp quốc gia trên đồi cát Núi Thành',
      stats: [
        { label: 'Sự kiện', value: 'Chiến thắng 26/5/1965 vang dội' },
        { label: 'Độ cao đồi', value: '14m trên đỉnh đồi lộng gió' },
      ],
      description:
        'Tượng đài sừng sững trên đỉnh đồi cát lịch sử, ghi dấu mốc son trận đầu đánh Mỹ và thắng Mỹ của quân dân Núi Thành - Quảng Nam kiên cường.',
    },
  },
  {
    id: 'san-bay-chu-lai',
    name: 'Sân bay Quốc tế Chu Lai',
    districtId: 'nui-thanh',
    position: [220, 58, 980],
    target: [280, 2, 930],
    info: {
      badge: 'CẢNG HÀNG KHÔNG',
      title: 'Cảng Hàng Không Quốc Tế Chu Lai',
      subtitle: 'Sân bay có đường băng dài nhất Việt Nam (4.050m)',
      stats: [
        { label: 'Đường băng', value: '4.050m x 45m (Runway 14/32)' },
        { label: 'Đài ATC', value: 'Tháp chỉ huy không lưu 42m' },
      ],
      description:
        'Sân bay có diện tích lớn nhất nước (hơn 2.000 ha), đài kiểm soát không lưu hiện đại, nhà ga hành khách và đường băng đón các dòng tàu bay thân rộng quốc tế.',
    },
  },
  {
    id: 'tam-hai',
    name: 'Xã Đảo Tam Hải & Bàn Than',
    districtId: 'nui-thanh',
    position: [445, 120, 980],
    target: [445, 4, 875],
    info: {
      badge: 'KỲ QUAN BIỂN ĐẢO',
      title: 'Xã Đảo Tam Hải & Ghềnh Đá Đen Bàn Than',
      subtitle: 'Ốc đảo dừa miền Trung & Tuyệt tác trầm tích',
      stats: [
        { label: 'Địa hình', value: 'Biệt lập 3 mặt sông, 1 mặt biển Đông' },
        { label: 'Thắng cảnh', value: 'Ghềnh Bàn Than, Cổng Tò Vò, Hòn Mang' },
      ],
      description:
        'Kỳ quan trầm tích đá đen nhánh triệu năm tuổi, vòm Cổng Tò Vò tự nhiên giữa biển sóng bạc đầu, những rặng dừa xiêm xanh mát và những chiếc thuyền thúng mộc mạc của làng chài.',
    },
  },
  {
    id: 'cang-ky-ha',
    name: 'Cảng Kỳ Hà & Bến Cá',
    districtId: 'nui-thanh',
    position: [290, 50, 890],
    target: [320, 4, 840],
    info: {
      badge: 'CẢNG BIỂN & THỦY SẢN',
      title: 'Cảng Kỳ Hà & Bến Cá Tam Quang',
      subtitle: 'Âu thuyền Vịnh An Hòa & Đội tàu đánh bắt xa bờ',
      stats: [
        { label: 'Vai trò', value: 'Cảng tổng hợp & Bến cá lớn nhất huyện' },
      ],
      description:
        'Cảng tổng hợp Kỳ Hà và bến cá Tam Quang sầm uất nằm bên vịnh An Hòa, nơi tập kết hải sản từ ngư trường Hoàng Sa - Trường Sa của hàng trăm tàu thuyền công suất lớn.',
    },
  },
  {
    id: 'ho-giang-thom',
    name: 'Thác Hố Giang Thơm (11 Tầng)',
    districtId: 'nui-thanh',
    position: [-20, 32, 875],
    target: [15, 6, 825],
    info: {
      badge: 'DANH THẮNG NÚI RỪNG',
      title: 'Thác Hố Giang Thơm (Hố Khế)',
      subtitle: 'Kiệt tác thác nước 11 tầng giữa đại ngàn Tây Núi Thành',
      stats: [
        { label: 'Quy mô', value: '11 tầng thác đổ quanh năm' },
        { label: 'Hồ sinh thái', value: 'Hồ Hố Khế & rừng nguyên sinh' },
      ],
      description:
        'Thác nước tự nhiên 11 tầng tuyệt đẹp đổ bọt trắng xóa qua các phiến đá hoa cương cổ đại, tạo thành những hồ bơi tự nhiên trong vắt giữa rừng già nguyên sinh Tam Mỹ Tây.',
    },
  },
  {
    id: 'dinh-hon-tau',
    name: 'Đỉnh Núi Hòn Tàu 953m',
    districtId: 'nui-thanh',
    position: [-70, 115, 845],
    target: [-100, 88, 885],
    info: {
      badge: 'ĐỈNH NÚI CAO NHẤT',
      title: 'Đỉnh Núi Hòn Tàu (953m)',
      subtitle: 'Nóc nhà phía Tây che chở Núi Thành - Đỉnh cao 953m',
      stats: [
        { label: 'Độ cao', value: '953 m so với mực nước biển' },
        { label: 'Điểm nhấn', value: 'Cột mốc đỉnh núi đá granite & Cờ Tổ quốc' },
      ],
      description:
        'Đỉnh núi cao hùng vĩ nhất của huyện Núi Thành, ranh giới tự nhiên giữa đồng bằng ven biển và vùng rừng núi Trường Sơn, nơi đặt cột mốc độ cao 953m lộng gió quanh năm mây mù bao phủ.',
    },
  },
  {
    id: 'ho-tam-son',
    name: 'Hồ Thủy Lợi Tam Sơn',
    districtId: 'nui-thanh',
    position: [32, 42, 660],
    target: [-60, 12, 712],
    info: {
      badge: 'LÒNG HỒ SINH THÁI',
      title: 'Hồ Thủy Lợi Tam Sơn (Hố Khế)',
      subtitle: 'Hồ sinh thái trên cao, Đập bê tông xả tràn & Đảo nổi',
      stats: [
        { label: 'Cao độ mặt nước', value: '12.0 m trên thung lũng núi' },
        { label: 'Công trình', value: 'Đập bê tông trọng lực, Bến cano, Đảo thông sinh thái' },
      ],
      description:
        'Hồ nước ngọt lớn nhất huyện Núi Thành nằm ở vùng cao Tây Bắc, sở hữu đập ngăn nước bê tông cốt thép kiên cố, cống xả tràn bậc thang tung bọt trắng xóa, bến thuyền du lịch sinh thái và ốc đảo rừng thông thơ mộng.',
    },
  },
  {
    id: 'song-truong-giang',
    name: 'Sông Trường Giang',
    districtId: 'nui-thanh',
    position: [450, 60, 790],
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

export const NUI_THANH_COMMUNES: ViewpointItem[] = [
  {
    id: 'commune-nui-thanh',
    name: '🏛️ TT. Núi Thành',
    districtId: 'nui-thanh',
    position: [185, 125, 910],
    target: [185, 4, 800],
    info: {
      badge: 'ĐÔ THỊ TRUNG TÂM',
      title: 'Thị Trấn Núi Thành & Sông An Tân',
      subtitle: 'Trung tâm chính trị, văn hóa, thương mại huyện',
      stats: [
        { label: 'Diện tích', value: '4.5 km²' },
        { label: 'Đặc trưng', value: 'Cầu An Tân, Ga Núi Thành, Trụ sở UBND huyện' },
      ],
      description:
        'Trung tâm hành chính huyện Núi Thành bên bờ sông An Tân, sở hữu trụ sở UBND huyện, quảng trường trung tâm, chợ thương mại sầm uất và cầu An Tân bắc qua sông.',
    },
  },
  {
    id: 'commune-tam-hiep',
    name: '🏭 Xã Tam Hiệp',
    districtId: 'nui-thanh',
    position: [255, 160, 860],
    target: [255, 4, 730],
    info: {
      badge: 'TRUNG TÂM CÔNG NGHIỆP',
      title: 'Xã Tam Hiệp',
      subtitle: 'Trái tim Khu Kinh Tế Mở Chu Lai & Ô tô THACO',
      stats: [
        { label: 'Diện tích', value: '42.1 km²' },
        { label: 'Đặc trưng', value: 'KCN THACO, Cầu vượt Cây Xương Rồng, Cảng Chu Lai' },
      ],
      description:
        'Trung tâm công nghiệp đầu tàu với Đại phức hợp ô tô THACO Chu Lai hơn 1.200 ha, nút giao cầu vượt 2 tầng Cây Xương Rồng, cảng Chu Lai, đầm tôm và làng cổ Thôn Thái Xuân.',
    },
  },
  {
    id: 'commune-tam-hai',
    name: '🏝️ Xã Tam Hải',
    districtId: 'nui-thanh',
    position: [445, 140, 985],
    target: [445, 2, 875],
    info: {
      badge: 'KỲ QUAN BIỂN ĐẢO',
      title: 'Xã Đảo Tam Hải',
      subtitle: 'Ốc đảo dừa miền Trung & Tuyệt tác Ghềnh Bàn Than',
      stats: [
        { label: 'Diện tích', value: '15.6 km²' },
        { label: 'Đặc trưng', value: 'Ghềnh Bàn Than, Cổng Tò Vò, Rừng dừa xiêm' },
      ],
      description:
        'Xã đảo biệt lập ba bề sông một bề biển Đông, nổi tiếng với kỳ quan trầm tích đá đen Bàn Than hàng triệu năm tuổi, vòm đá Cổng Tò Vò tự nhiên và những rặng dừa xanh ngát soi bóng biển.',
    },
  },
  {
    id: 'commune-tam-quang',
    name: '🚢 Xã Tam Quang',
    districtId: 'nui-thanh',
    position: [320, 135, 915],
    target: [320, 3, 815],
    info: {
      badge: 'HÀNG HẢI & NGHỀ CÁ',
      title: 'Xã Tam Quang (Cảng Kỳ Hà)',
      subtitle: 'Cửa ngõ hàng hải & Bến cá sầm uất Vịnh An Hòa',
      stats: [
        { label: 'Diện tích', value: '11.4 km²' },
        { label: 'Đặc trưng', value: 'Cảng tổng hợp Kỳ Hà, Bến cá Tam Quang, Vịnh An Hòa' },
      ],
      description:
        'Địa bàn Cảng biển tổng hợp Kỳ Hà đón tàu bách hóa quốc tế, âu thuyền Vịnh An Hòa kín gió và bến cá Tam Quang sầm uất với hàng trăm tàu đánh bắt xa bờ Hoàng Sa - Trường Sa.',
    },
  },
  {
    id: 'commune-tam-nghia',
    name: '✈️ Xã Tam Nghĩa',
    districtId: 'nui-thanh',
    position: [270, 160, 1070],
    target: [270, 3, 955],
    info: {
      badge: 'CẢNG HÀNG KHÔNG',
      title: 'Xã Tam Nghĩa (Sân Bay Chu Lai)',
      subtitle: 'Sân bay Quốc tế Chu Lai & Cửa ngõ Dốc Sỏi',
      stats: [
        { label: 'Diện tích', value: '51.6 km²' },
        { label: 'Đặc trưng', value: 'Đường băng dài nhất VN 4.050m, Đài kiểm soát ATC 42m' },
      ],
      description:
        'Cửa ngõ phía Nam huyện Núi Thành tiếp giáp Quảng Ngãi, nơi đặt Sân bay Quốc tế Chu Lai diện tích lớn nhất nước với đường băng 4.050m, đài kiểm soát không lưu hiện đại và nút giao Dốc Sỏi.',
    },
  },
  {
    id: 'commune-tam-tra',
    name: '🏔️ Xã Tam Trà',
    districtId: 'nui-thanh',
    position: [-55, 65, 830],
    target: [-115, 28, 835],
    info: {
      badge: 'VÙNG CAO ĐỒNG BÀO KOR',
      title: 'Xã Vùng Cao Tam Trà',
      subtitle: 'Nóc nhà Hòn Tàu 953m, Nhà Rông đồng bào Co & Đồi quế',
      stats: [
        { label: 'Diện tích', value: '97.1 km²' },
        { label: 'Đặc trưng', value: 'Đỉnh Hòn Tàu 953m, Nhà Rông mái cong lưỡi rìu, Cột Guu' },
      ],
      description:
        'Xã vùng cao có diện tích tự nhiên lớn nhất huyện Núi Thành, tựa lưng vào đỉnh Hòn Tàu 953m hùng vĩ. Nổi bật với ngôi Nhà Rông truyền thống của đồng bào Co cao vút hình lưỡi rìu, cột Guu lễ hội cồng chiêng, cầu treo dây văng vượt suối Trầu và những cánh rừng quế ngát hương.',
    },
  },
  {
    id: 'commune-tam-my-tay',
    name: '🌊 Xã Tam Mỹ Tây',
    districtId: 'nui-thanh',
    position: [10, 150, 960],
    target: [15, 28, 825],
    info: {
      badge: 'DANH THẮNG SINH THÁI',
      title: 'Xã Tam Mỹ Tây (Thác Hố Giang Thơm)',
      subtitle: 'Kiệt tác Thác 11 Tầng giữa đại ngàn Tây Núi Thành',
      stats: [
        { label: 'Diện tích', value: '50.6 km²' },
        { label: 'Đặc trưng', value: 'Thác Hố Giang Thơm 11 tầng, Hồ Hố Khế, Vườn cây ăn quả' },
      ],
      description:
        'Vùng đệm sinh thái giữa miền sơn cước Tây Núi Thành, nổi tiếng với danh thắng Thác Hố Giang Thơm 11 tầng nước đổ bọt trắng xóa, các hồ tắm thiên nhiên trong vắt và những vườn mít, bưởi trĩu quả.',
    },
  },
  {
    id: 'commune-tam-my-dong',
    name: '🌾 Xã Tam Mỹ Đông',
    districtId: 'nui-thanh',
    position: [105, 145, 925],
    target: [105, 3, 815],
    info: {
      badge: 'ĐỒNG BẰNG NÔNG NGHIỆP',
      title: 'Xã Tam Mỹ Đông',
      subtitle: 'Vựa lúa phù sa màu mỡ & Đập dâng thủy lợi',
      stats: [
        { label: 'Diện tích', value: '17.3 km²' },
        { label: 'Đặc trưng', value: 'Cánh đồng lúa nước, Hệ thống mương thủy lợi bê tông' },
      ],
      description:
        'Cánh đồng lúa nước phì nhiêu được bồi đắp bởi các con suối thượng nguồn, hệ thống đập dâng điều tiết nước tưới tiêu và những con đường bê tông nông thôn mới rợp bóng cây xanh.',
    },
  },
  {
    id: 'commune-tam-anh-nam',
    name: '🏗️ Xã Tam Anh Nam',
    districtId: 'nui-thanh',
    position: [195, 140, 785],
    target: [195, 2, 665],
    info: {
      badge: 'CÔNG NGHIỆP & LOGISTICS',
      title: 'Xã Tam Anh Nam',
      subtitle: 'Khu Công Nghiệp Tam Anh 1 & Trục QL1A',
      stats: [
        { label: 'Diện tích', value: '21.9 km²' },
        { label: 'Đặc trưng', value: 'KCN Tam Anh 1, Trạm logistics, Quốc lộ 1A' },
      ],
      description:
        'Cửa ngõ công nghiệp phía Bắc giáp xã Tam Hiệp, quy hoạch KCN Tam Anh 1 hiện đại với các nhà máy sản xuất thiết bị phụ trợ, điện tử, điện mặt trời áp mái và dịch vụ hậu cần logistics vận tải.',
    },
  },
  {
    id: 'commune-tam-anh-bac',
    name: '🏢 Xã Tam Anh Bắc',
    districtId: 'nui-thanh',
    position: [200, 140, 720],
    target: [200, 2, 600],
    info: {
      badge: 'CÔNG NGHIỆP SINH THÁI',
      title: 'Xã Tam Anh Bắc',
      subtitle: 'Khu Công Nghiệp Tam Anh 2 & Nông nghiệp sạch',
      stats: [
        { label: 'Diện tích', value: '21.0 km²' },
        { label: 'Đặc trưng', value: 'KCN Tam Anh 2, Cánh đồng mẫu lớn, Vành đai xanh' },
      ],
      description:
        'Khu công nghiệp sinh thái Tam Anh 2 kết hợp hài hòa giữa phát triển công nghiệp đa ngành thân thiện môi trường và các cánh đồng lúa chuyên canh năng suất cao ven trục đường tránh.',
    },
  },
  {
    id: 'commune-tam-son',
    name: '💧 Xã Tam Sơn',
    districtId: 'nui-thanh',
    position: [32, 42, 660],
    target: [-60, 12, 712],
    info: {
      badge: 'LÒNG HỒ THỦY LỢI',
      title: 'Xã Tam Sơn',
      subtitle: 'Hồ thủy lợi trên cao, Đập tràn bê tông & Ốc đảo xanh',
      stats: [
        { label: 'Diện tích', value: '54.2 km²' },
        { label: 'Đặc trưng', value: 'Lòng hồ Hố Khế (12m), Đập bê tông cốt thép, Đảo nổi rừng thông' },
      ],
      description:
        'Vùng hồ sinh thái nước ngọt lớn nhất huyện với Hồ chứa nước Hố Khế ở cao độ 12m, công trình đập ngăn nước bê tông cốt thép kiên cố và cống xả tràn bậc thang, bến cano du lịch cùng ốc đảo nổi rừng thông thơ mộng giữa mây ngàn.',
    },
  },
  {
    id: 'commune-tam-thanh',
    name: '🌲 Xã Tam Thạnh',
    districtId: 'nui-thanh',
    position: [65, 165, 780],
    target: [65, 24, 645],
    info: {
      badge: 'RỪNG NGUYÊN LIỆU & HỒ',
      title: 'Xã Tam Thạnh',
      subtitle: 'Hồ chứa nước Thái Xuân & Rừng keo bạt ngàn',
      stats: [
        { label: 'Diện tích', value: '53.9 km²' },
        { label: 'Đặc trưng', value: 'Hồ Thái Xuân, Rừng keo lá tràm nguyên liệu giấy' },
      ],
      description:
        'Vùng gò đồi bát úp trập trùng với hàng nghìn hecta keo lá tràm nguyên liệu giấy, sở hữu hồ nước ngọt Thái Xuân trong lành cấp nước sinh hoạt và sản xuất nông nghiệp.',
    },
  },
  {
    id: 'commune-tam-tien',
    name: '🌅 Xã Tam Tiến',
    districtId: 'nui-thanh',
    position: [350, 155, 685],
    target: [350, 2, 560],
    info: {
      badge: 'DU LỊCH BIỂN & CHỢ CÁ',
      title: 'Xã Tam Tiến',
      subtitle: 'Chợ cá bãi biển rạng đông & Rặng phi lao chắn gió',
      stats: [
        { label: 'Diện tích', value: '20.6 km²' },
        { label: 'Đặc trưng', value: 'Chợ cá bình minh Tam Tiến, Bờ biển cát trắng, Thuyền thúng' },
      ],
      description:
        'Nổi tiếng khắp cả nước với chợ cá rạng đông trên bờ cát trắng Tam Tiến họp từ lúc mặt trời vừa ló rạng, bờ biển nguyên sơ thơ mộng với rừng phi lao chắn gió và đường ven biển Võ Chí Công.',
    },
  },
  {
    id: 'commune-tam-hoa',
    name: '🌉 Xã Tam Hòa',
    districtId: 'nui-thanh',
    position: [330, 150, 780],
    target: [330, 2, 655],
    info: {
      badge: 'SÔNG NƯỚC LỢ & NUÔI THỦY SẢN',
      title: 'Xã Tam Hòa',
      subtitle: 'Cầu Tam Hòa bắc qua Trường Giang & Lồng bè',
      stats: [
        { label: 'Diện tích', value: '22.6 km²' },
        { label: 'Đặc trưng', value: 'Cầu Tam Hòa vượt sông, Nuôi cá lồng bè, Đầm nuôi tôm' },
      ],
      description:
        'Xã ven sông Trường Giang sở hữu cầu bê tông Tam Hòa kiên cố nối đôi bờ, trung tâm nuôi trồng thủy sản nước lợ với các dãy bè cá bớp, cá chẽm và hệ thống đầm tôm sú sinh thái.',
    },
  },
  {
    id: 'commune-tam-giang',
    name: '🌴 Xã Tam Giang',
    districtId: 'nui-thanh',
    position: [275, 130, 910],
    target: [275, 2, 805],
    info: {
      badge: 'CỬA SÔNG & RỪNG DỪA',
      title: 'Xã Tam Giang',
      subtitle: 'Ngã ba sông An Tân & Rừng dừa nước ngập mặn',
      stats: [
        { label: 'Diện tích', value: '11.5 km²' },
        { label: 'Đặc trưng', value: 'Rừng dừa nước, Bến ghe truyền thống, Vịnh An Hòa' },
      ],
      description:
        'Tọa lạc tại ngã ba sông nơi dòng An Tân hợp lưu đổ vào Vịnh An Hòa, nổi tiếng với những vạt rừng dừa nước bạt ngàn như miền Tây sông nước và các bến đậu ghe bầu của ngư dân.',
    },
  },
  {
    id: 'commune-tam-xuan-1',
    name: '🍜 Xã Tam Xuân 1',
    districtId: 'nui-thanh',
    position: [195, 145, 655],
    target: [195, 2, 535],
    info: {
      badge: 'CỬA NGÕ BẮC NÚI THÀNH',
      title: 'Xã Tam Xuân 1',
      subtitle: 'Cầu Bà Bầu & Làng nghề truyền thống bún sắn',
      stats: [
        { label: 'Diện tích', value: '13.9 km²' },
        { label: 'Đặc trưng', value: 'Cầu Bà Bầu trên QL1A, Làng nghề bún sắn Phước Ninh' },
      ],
      description:
        'Cửa ngõ tiếp giáp trực tiếp với thành phố Tam Kỳ qua Cầu Bà Bầu trên Quốc lộ 1A, nổi tiếng với đặc sản bún sắn dây truyền thống thơm ngon và làng quê trù phú ven sông.',
    },
  },
  {
    id: 'commune-tam-xuan-2',
    name: '🥬 Xã Tam Xuân 2',
    districtId: 'nui-thanh',
    position: [90, 150, 660],
    target: [90, 2, 535],
    info: {
      badge: 'NÔNG NGHIỆP CÔNG NGHỆ CAO',
      title: 'Xã Tam Xuân 2',
      subtitle: 'Khu nhà kính nông nghiệp & Chế biến lâm sản',
      stats: [
        { label: 'Diện tích', value: '26.8 km²' },
        { label: 'Đặc trưng', value: 'Nhà kính rau củ sạch, Vườn ươm cây lâm nghiệp giống tốt' },
      ],
      description:
        'Vùng bán sơn địa Tây Bắc Núi Thành, tiên phong áp dụng mô hình nhà màng công nghệ cao trồng dưa lưới, dưa leo, rau thủy canh và các cơ sở chế biến gỗ rừng trồng xuất khẩu.',
    },
  },
];


export const ALL_VIEWPOINTS: ViewpointItem[] = [...VIEWPOINTS, ...NUI_THANH_COMMUNES];

/**
 * Sidebar Navigation Menu mirroring the vintage cartographic design of duancuulong.com
 * Features:
 * - Brand Card Header ("Dự án Đà Nẵng - Quảng Nam / Bản đồ 3D...")
 * - Segmented Mode Toggle ("Học tập" / "Khám phá 3D")
 * - District filter pills
 * - Dedicated 17-Commune Selector for Huyện Núi Thành
 * - 2-Column Grid of quick viewpoints
 */
export class SidebarMenu {
  public element: HTMLElement;
  private cameraManager: CameraManager;
  private onSelectInfo: (info: InfoDisplayData) => void;
  private onModeChange?: (mode: 'study' | 'explore') => void;
  private onSelectViewpoint?: (item: ViewpointItem) => void;

  private currentMode: 'study' | 'explore' = 'study';
  private currentDistrictFilter: string = 'nui-thanh';
  private currentActiveId: string = 'nui-thanh';

  constructor(props: SidebarMenuProps) {
    this.cameraManager = props.cameraManager;
    this.onSelectInfo = props.onSelectInfo;
    this.onModeChange = props.onModeChange;
    this.onSelectViewpoint = props.onSelectViewpoint;

    this.element = document.createElement('aside');
    this.element.className = 'dcl-sidebar';

    this.render();
  }

  public render(): void {
    let contentHtml = '';

    if (this.currentDistrictFilter === 'nui-thanh') {
      // 1. Grid of all 17 communes in Nui Thanh
      const communeButtonsHtml = NUI_THANH_COMMUNES.map(
        (c) => `
        <button class="dcl-view-btn dcl-commune-btn ${c.id === this.currentActiveId ? 'active' : ''}" data-id="${c.id}" title="${c.info.title}">
          <span>${c.name}</span>
        </button>
      `
      ).join('');

      // 2. Specific landmark highlights within Nui Thanh
      const nuiThanhLandmarks = VIEWPOINTS.filter((v) => v.districtId === 'nui-thanh');
      const landmarkButtonsHtml = nuiThanhLandmarks
        .map(
          (vp) => `
          <button class="dcl-view-btn ${vp.id === this.currentActiveId ? 'active' : ''}" data-id="${vp.id}" title="${vp.info.title}">
            <span>${vp.name}</span>
          </button>
        `
        )
        .join('');

      contentHtml = `
        <!-- Section: 17 Communes of Nui Thanh -->
        <div class="dcl-section dcl-communes-section">
          <div class="dcl-section-label">XÃ & THỊ TRẤN (17 ĐƠN VỊ)</div>
          <div class="dcl-grid-container dcl-commune-grid">
            ${communeButtonsHtml}
          </div>
        </div>

        <!-- Section: Key Landmarks in Nui Thanh -->
        <div class="dcl-section dcl-viewpoints-section">
          <div class="dcl-section-label">ĐỊA ĐIỂM TIÊU BIỂU</div>
          <div class="dcl-grid-container">
            ${landmarkButtonsHtml}
          </div>
        </div>
      `;
    } else {
      // Filter viewpoints for other districts or "all"
      const filtered =
        this.currentDistrictFilter === 'all'
          ? VIEWPOINTS
          : VIEWPOINTS.filter(
              (v) => v.districtId === this.currentDistrictFilter || v.districtId === 'all'
            );

      const gridHtml = filtered
        .map(
          (vp) => `
          <button class="dcl-view-btn ${vp.id === this.currentActiveId ? 'active' : ''}" data-id="${vp.id}" title="${vp.info.title}">
            <span>${vp.name}</span>
          </button>
        `
        )
        .join('');

      contentHtml = `
        <!-- 2-Column Grid Viewpoints -->
        <div class="dcl-section dcl-viewpoints-section">
          <div class="dcl-section-label">GÓC NHÌN TIÊU BIỂU</div>
          <div class="dcl-grid-container">
            ${gridHtml}
          </div>
        </div>
      `;
    }

    this.element.innerHTML = `
      <!-- Brand Box (duancuulong.com style) -->
      <div class="dcl-brand-card">
        <button class="dcl-menu-burger" id="dcl-menu-burger" title="Menu bản đồ">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="dcl-brand-titles">
          <h1 class="dcl-title">Bản Đồ 3D Núi Thành</h1>
          <div class="dcl-subtitle">Mô Phỏng 17 Xã/Thị Trấn - Khu Kinh Tế Chu Lai</div>
        </div>
      </div>

      <!-- Mode Selector (CHẾ ĐỘ) -->
      <div class="dcl-section dcl-mode-section">
        <div class="dcl-section-label">CHẾ ĐỘ XEM</div>
        <div class="dcl-mode-toggle">
          <button class="dcl-mode-btn ${this.currentMode === 'study' ? 'active' : ''}" data-mode="study">
            Học tập
          </button>
          <button class="dcl-mode-btn ${this.currentMode === 'explore' ? 'active' : ''}" data-mode="explore">
            Khám phá 3D
          </button>
        </div>
        <div class="dcl-mode-desc">
          ${
            this.currentMode === 'study'
              ? 'Mô hình địa hình số DEM: 17 xã/thị trấn, ruộng đồng, sông ngòi & công trình.'
              : 'Chế độ tương tác tự do: bay lượn ngắm cảnh, tham quan chi tiết nhà xưởng và thắng cảnh.'
          }
        </div>
      </div>

      <!-- District Filter Chips -->
      <div class="dcl-section dcl-filter-section">
        <div class="dcl-section-label">LỌC HUYỆN / QUẬN</div>
        <div class="dcl-filter-chips">
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'nui-thanh' ? 'active' : ''}" data-dist="nui-thanh">Núi Thành (17 Xã)</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'all' ? 'active' : ''}" data-dist="all">Toàn tỉnh</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'hai-chau' ? 'active' : ''}" data-dist="hai-chau">Hải Châu</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'son-tra' ? 'active' : ''}" data-dist="son-tra">Sơn Trà</button>
          <button class="dcl-filter-chip ${this.currentDistrictFilter === 'hoa-vang' ? 'active' : ''}" data-dist="hoa-vang">Hòa Vang</button>
        </div>
      </div>

      ${contentHtml}
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
        this.currentDistrictFilter = chip.dataset.dist || 'nui-thanh';
        this.render();
      });
    });

    // 3. Viewpoint & Commune Buttons
    const viewBtns = this.element.querySelectorAll<HTMLButtonElement>('.dcl-view-btn');
    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = ALL_VIEWPOINTS.find((v) => v.id === id);
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
    this.onSelectViewpoint?.(item);
  }
}

