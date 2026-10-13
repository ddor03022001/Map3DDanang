/**
 * Da Nang City Geographic Coordinates & Projection Configuration
 * Reference: WGS84 Datum
 */

export interface GeoLocation {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  altitude?: number;
}

export interface LandmarkPOI extends GeoLocation {
  category: 'bridge' | 'building' | 'nature' | 'cultural';
  yearBuilt?: number;
  description: string;
  descriptionEn: string;
  cameraPreset: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

/**
 * Coordinate anchor for Da Nang (origin of 3D scene [0, 0, 0])
 * Centered near Dragon Bridge on the Han River
 */
export const DA_NANG_ORIGIN = {
  lat: 16.0610,
  lng: 108.2272,
};

/**
 * Scale factors: 1 degree latitude ~ 111,000 meters
 * At lat 16.06°, 1 degree longitude ~ 111,000 * cos(16.06°) ~ 106,670 meters
 * We use 1 unit = 10 meters in Three.js space for optimal depth precision
 */
export const GEO_SCALE = {
  METERS_PER_UNIT: 10,
  LAT_TO_METERS: 110600,
  LNG_TO_METERS: 106670,
};

/**
 * Key Landmark Points of Interest (POIs) across Da Nang
 */
export const LANDMARKS: Record<string, LandmarkPOI> = {
  DRAGON_BRIDGE: {
    id: 'dragon-bridge',
    name: 'Cầu Rồng',
    nameEn: 'Dragon Bridge',
    lat: 16.0610,
    lng: 108.2272,
    category: 'bridge',
    yearBuilt: 2013,
    description: 'Biểu tượng thịnh vượng của Đà Nẵng, thiết kế hình rồng thép dài 666m phun lửa và nước vào cuối tuần.',
    descriptionEn: 'The iconic 666m steel dragon bridge representing Da Nang prosperity, capable of breathing fire and water.',
    cameraPreset: {
      position: [0, 35, 75],
      target: [0, 5, 0],
    },
  },
  HAN_RIVER_BRIDGE: {
    id: 'han-river-bridge',
    name: 'Cầu Sông Hàn',
    nameEn: 'Han River Swing Bridge',
    lat: 16.0722,
    lng: 108.2274,
    category: 'bridge',
    yearBuilt: 2000,
    description: 'Cây cầu quay đầu tiên tại Việt Nam do chính người dân và kỹ sư Đà Nẵng cùng chung tay xây dựng.',
    descriptionEn: 'The first swing bridge in Vietnam, engineered locally to allow shipping traffic along the Han River.',
    cameraPreset: {
      position: [2, 40, -100],
      target: [2, 6, -125],
    },
  },
  THUAN_PHUOC_BRIDGE: {
    id: 'thuan-phuoc-bridge',
    name: 'Cầu Thuận Phước',
    nameEn: 'Thuan Phuoc Suspension Bridge',
    lat: 16.0964,
    lng: 108.2239,
    category: 'bridge',
    yearBuilt: 2009,
    description: 'Cây cầu treo dây võng dài nhất Việt Nam (1.856m), bắc qua cửa biển vịnh Đà Nẵng nối liền quận Hải Châu và bán đảo Sơn Trà.',
    descriptionEn: 'Longest suspension bridge in Vietnam (1,856m), spanning the mouth of Da Nang Bay connecting Hai Chau and Son Tra.',
    cameraPreset: {
      position: [55, 45, -330],
      target: [0, 8, -390],
    },
  },
  ADMIN_CENTER: {
    id: 'admin-center',
    name: 'Trung Tâm Hành Chính',
    nameEn: 'Da Nang Administrative Center',
    lat: 16.0772,
    lng: 108.2241,
    category: 'building',
    yearBuilt: 2014,
    description: 'Tòa tháp cao 167m với kiến trúc hình bắp ngô bọc kính phản quang hiện đại bên bờ sông Hàn.',
    descriptionEn: '167m futuristic glass tower resembling a corn cob, housing the Da Nang municipal government.',
    cameraPreset: {
      position: [-45, 55, -150],
      target: [-35, 25, -180],
    },
  },
  SON_TRA_PENINSULA: {
    id: 'son-tra-peninsula',
    name: 'Bán Đảo Sơn Trà & Chùa Linh Ứng',
    nameEn: 'Son Tra Peninsula & Linh Ung Pagoda',
    lat: 16.1008,
    lng: 108.2755,
    category: 'cultural',
    yearBuilt: 2010,
    description: 'Lá phổi xanh của thành phố với tượng Phật Bà Quán Thế Âm cao 67m nhìn ra biển Đông.',
    descriptionEn: 'Da Nang green lung with the 67m Lady Buddha statue overlooking the East Sea.',
    cameraPreset: {
      position: [480, 120, -420],
      target: [510, 45, -450],
    },
  },
  MY_KHE_BEACH: {
    id: 'my-khe-beach',
    name: 'Bãi Biển Mỹ Khê',
    nameEn: 'My Khe Beach',
    lat: 16.0601,
    lng: 108.2468,
    category: 'nature',
    description: 'Một trong những bãi biển quyến rũ nhất hành tinh với bãi cát trắng mịn và hàng dừa trải dài.',
    descriptionEn: 'Celebrated as one of the world most attractive beaches with fine white sand and coastal resorts.',
    cameraPreset: {
      position: [210, 45, 20],
      target: [200, 2, 0],
    },
  },
  CHU_LAI_OVERPASS: {
    id: 'chu-lai-overpass',
    name: 'Cầu Vượt Cây Xương Rồng',
    nameEn: 'Chu Lai Cactus Overpass',
    lat: 15.4285,
    lng: 108.6472,
    category: 'bridge',
    yearBuilt: 2018,
    description: 'Nút giao cầu vượt vòng xuyến 2 tầng Chu Lai trên Quốc lộ 1A với biểu tượng Tượng đài Cây Xương Rồng kiên cường nở hoa trên vùng đất cát Núi Thành.',
    descriptionEn: 'Historic 2-level circular interchange on National Highway 1A featuring the iconic Cactus Monument in Nui Thanh.',
    cameraPreset: {
      position: [205, 42, 665],
      target: [220, 4, 720],
    },
  },
  THACO_CHU_LAI: {
    id: 'thaco-chu-lai',
    name: 'Khu Phức Hợp THACO Chu Lai',
    nameEn: 'THACO Chu Lai Auto Complex',
    lat: 15.4320,
    lng: 108.6650,
    category: 'building',
    yearBuilt: 2003,
    description: 'Đại phức hợp công nghiệp cơ khí ô tô hơn 1.200 ha với nhà máy THACO Mazda, KIA, đường thử xe và bãi đỗ hàng nghìn ô tô xuất xưởng.',
    descriptionEn: 'Over 1,200 ha automotive hub with THACO Mazda, KIA plants, vehicle storage yards, and test track.',
    cameraPreset: {
      position: [335, 78, 630],
      target: [295, 8, 720],
    },
  },
  TAM_HIEP_OVERVIEW: {
    id: 'tam-hiep-overview',
    name: 'Toàn Cảnh Xã Tam Hiệp',
    nameEn: 'Tam Hiep Commune Overview',
    lat: 15.4290,
    lng: 108.6475,
    category: 'nature',
    description: 'Toàn cảnh 3D Xã Tam Hiệp từ rừng đồi keo phía Tây, làng cổ Thôn Thái Xuân, đến KCN THACO, cầu vượt 2 tầng và sông Trường Giang.',
    descriptionEn: '3D panoramic digital twin of Tam Hiep Commune and Chu Lai open economic zone.',
    cameraPreset: {
      position: [250, 115, 610],
      target: [280, 6, 720],
    },
  },
  NUI_THANH_TOWN: {
    id: 'nui-thanh-town',
    name: 'Thị Trấn Núi Thành & Sông An Tân',
    nameEn: 'Nui Thanh Town Center',
    lat: 15.4124,
    lng: 108.6531,
    category: 'cultural',
    description: 'Đô thị trung tâm huyện Núi Thành bên bờ sông An Tân, sở hữu trụ sở UBND huyện, ga xe lửa, cầu An Tân và các phố thương mại sầm uất.',
    descriptionEn: 'Administrative and commercial center of Nui Thanh district along the An Tan River.',
    cameraPreset: {
      position: [180, 48, 775],
      target: [220, 4, 820],
    },
  },
  VICTORY_MONUMENT: {
    id: 'tuong-dai-nui-thanh',
    name: 'Tượng Đài Chiến Thắng Núi Thành',
    nameEn: 'Nui Thanh Victory Monument',
    lat: 15.4140,
    lng: 108.6575,
    altitude: 14,
    category: 'cultural',
    description: 'Di tích lịch sử cấp quốc gia trên đồi cát Núi Thành ghi dấu chiến thắng vang dội ngày 26/5/1965 của quân và dân Núi Thành.',
    descriptionEn: 'National historical relic monument on the wind-swept dune commemorating the battle of May 26, 1965.',
    cameraPreset: {
      position: [225, 24, 765],
      target: [265, 12, 805],
    },
  },
  CHU_LAI_AIRPORT: {
    id: 'chu-lai-airport',
    name: 'Cảng Hàng Không Quốc Tế Chu Lai',
    nameEn: 'Chu Lai International Airport',
    lat: 15.4062,
    lng: 108.7056,
    category: 'building',
    description: 'Sân bay có diện tích lớn nhất nước và đường băng dài nhất Việt Nam (4.050m), đài kiểm soát không lưu 42m và nhà ga hành khách hiện đại.',
    descriptionEn: 'Chu Lai International Airport with the longest runway in Vietnam (4,050m) and 42m ATC tower.',
    cameraPreset: {
      position: [220, 58, 885],
      target: [280, 2, 930],
    },
  },
  TAM_HAI_ISLAND: {
    id: 'tam-hai-island',
    name: 'Xã Đảo Tam Hải & Ghềnh Bàn Than',
    nameEn: 'Tam Hai Island & Ban Than Rocks',
    lat: 15.4452,
    lng: 108.6923,
    category: 'nature',
    description: 'Ốc đảo dừa miền Trung với kỳ quan ghềnh đá đen Bàn Than trầm tích hàng triệu năm, Cổng Tò Vò tự nhiên và làng chài mộc mạc.',
    descriptionEn: 'Coconut palm island commune featuring the million-year-old Ban Than black sedimentary cliffs and sea arch.',
    cameraPreset: {
      position: [445, 120, 770],
      target: [445, 4, 875],
    },
  },
  CHU_LAI_PORT: {
    id: 'chu-lai-port',
    name: 'Cảng Biển Quốc Tế Chu Lai',
    nameEn: 'Chu Lai International Seaport',
    lat: 15.4350,
    lng: 108.6750,
    category: 'building',
    yearBuilt: 2010,
    description: 'Cảng biển nước sâu Chu Lai & Tam Hiệp Logistics với cẩu giàn bờ STS bốc dỡ hàng, tàu container cập cảng và kho bãi ngoại quan.',
    descriptionEn: 'Deepwater Chu Lai seaport with STS gantry cranes, container vessel, and THACO logistics warehouse.',
    cameraPreset: {
      position: [520, 52, 660],
      target: [490, 8, 720],
    },
  },
  HON_TAU_PEAK: {
    id: 'hon-tau',
    name: 'Dãy Núi Hòn Tàu (953m)',
    nameEn: 'Hon Tau Mountain Ridge (953m)',
    lat: 15.3850,
    lng: 108.5200,
    altitude: 953,
    category: 'nature',
    description: 'Đỉnh núi cao nhất Tây Núi Thành (953m), bức tường thành tự nhiên che chở vùng đồng bằng Chu Lai quanh năm mây mù bao phủ.',
    descriptionEn: 'Highest mountain peak in Nui Thanh (953m), forming a natural fortress overlooking the coastal plains.',
    cameraPreset: {
      position: [-80, 85, 780],
      target: [-50, 30, 820],
    },
  },
  HO_GIANG_THOM: {
    id: 'ho-giang-thom',
    name: 'Thác Hố Giang Thơm (11 Tầng)',
    nameEn: 'Ho Giang Thom 11-Tier Waterfall',
    lat: 15.4020,
    lng: 108.5680,
    category: 'nature',
    description: 'Danh thắng thác nước tự nhiên 11 tầng tuyệt mỹ tuôn chảy bọt nước trắng xóa qua các bậc đá hoa cương giữa rừng nguyên sinh Tam Mỹ Tây.',
    descriptionEn: 'Scenic 11-tier natural cascading waterfall through ancient granite rock shelves in Tam My Tay.',
    cameraPreset: {
      position: [-20, 32, 810],
      target: [15, 6, 825],
    },
  },
  TAM_TRA: {
    id: 'tam-tra-commune',
    name: 'Xã Tam Trà (Núi Cao Hòn Tàu)',
    nameEn: 'Tam Tra Highland Commune',
    lat: 15.3720,
    lng: 108.5340,
    category: 'cultural',
    description: 'Xã vùng cao rộng lớn nhất Núi Thành với đỉnh Hòn Tàu 953m, bản làng nhà sàn đồng bào Kor, cầu treo vượt suối và vườn đồi quế thơm ngát.',
    descriptionEn: 'Largest highland commune featuring Hon Tau peak 953m, Kor minority stilt village, and cinnamon plantations.',
    cameraPreset: {
      position: [-100, 195, 735],
      target: [-100, 15, 870],
    },
  },
  TAM_MY_DONG: {
    id: 'tam-my-dong-commune',
    name: 'Xã Tam Mỹ Đông (Vựa Lúa Phù Sa)',
    nameEn: 'Tam My Dong Commune',
    lat: 15.4120,
    lng: 108.6120,
    category: 'nature',
    description: 'Cánh đồng lúa nước phì nhiêu và hệ thống đập dâng thủy lợi kiên cố, làng quê nông thôn mới trù phú.',
    descriptionEn: 'Fertile rice paddies and irrigation dam network in Tam My Dong.',
    cameraPreset: {
      position: [105, 145, 705],
      target: [105, 3, 815],
    },
  },
  TAM_ANH_NAM: {
    id: 'tam-anh-nam-commune',
    name: 'Xã Tam Anh Nam (KCN Tam Anh 1)',
    nameEn: 'Tam Anh Nam Commune',
    lat: 15.4480,
    lng: 108.6320,
    category: 'building',
    description: 'Cửa ngõ công nghiệp phía Bắc giáp Tam Hiệp với KCN Tam Anh 1 hiện đại, trục QL1A và trạm dịch vụ hậu cần logistics.',
    descriptionEn: 'Strategic industrial gateway with Tam Anh 1 industrial park along Highway 1A.',
    cameraPreset: {
      position: [195, 140, 545],
      target: [195, 2, 665],
    },
  },
  TAM_ANH_BAC: {
    id: 'tam-anh-bac-commune',
    name: 'Xã Tam Anh Bắc (KCN Tam Anh 2)',
    nameEn: 'Tam Anh Bac Commune',
    lat: 15.4650,
    lng: 108.6250,
    category: 'building',
    description: 'Khu công nghiệp sinh thái Tam Anh 2 và vành đai nông nghiệp sạch ứng dụng công nghệ cao.',
    descriptionEn: 'Tam Anh 2 eco-industrial zone and clean agricultural green belt.',
    cameraPreset: {
      position: [200, 140, 480],
      target: [200, 2, 600],
    },
  },
  TAM_SON: {
    id: 'tam-son-commune',
    name: 'Xã Tam Sơn (Lòng Hồ Thủy Lợi)',
    nameEn: 'Tam Son Eco-Lake Commune',
    lat: 15.4200,
    lng: 108.5100,
    category: 'nature',
    description: 'Vùng lòng hồ thủy lợi rộng lớn nhất huyện (nhánh Nam hồ Phú Ninh & hồ Hố Khế), đập tràn kiên cố và du lịch sinh thái.',
    descriptionEn: 'Sprawling freshwater irrigation reservoir lake, dam spillway, and eco-tourism islets.',
    cameraPreset: {
      position: [-75, 175, 575],
      target: [-75, 6, 715],
    },
  },
  TAM_THANH: {
    id: 'tam-thanh-commune',
    name: 'Xã Tam Thạnh (Hồ Thái Xuân)',
    nameEn: 'Tam Thanh Forest & Lake Commune',
    lat: 15.4350,
    lng: 108.5750,
    category: 'nature',
    description: 'Địa bàn hồ chứa nước thủy lợi Thái Xuân và hàng nghìn hecta rừng keo lá tràm nguyên liệu giấy.',
    descriptionEn: 'Thai Xuan freshwater reservoir dam and extensive acacia plantations.',
    cameraPreset: {
      position: [65, 165, 510],
      target: [65, 4, 645],
    },
  },
  TAM_TIEN: {
    id: 'tam-tien-commune',
    name: 'Xã Tam Tiến (Chợ Cá Bình Minh)',
    nameEn: 'Tam Tiến Coastal Commune',
    lat: 15.4950,
    lng: 108.6720,
    category: 'cultural',
    description: 'Chợ cá Tam Tiến họp trên bãi biển rạng đông nổi tiếng, bờ cát trắng mịn, rừng phi lao và đường ven biển Võ Chí Công.',
    descriptionEn: 'Famous dawn beach seafood market, pristine white sand beaches, and casuarina windbreak forests.',
    cameraPreset: {
      position: [350, 155, 435],
      target: [350, 2, 560],
    },
  },
  TAM_HOA: {
    id: 'tam-hoa-commune',
    name: 'Xã Tam Hòa (Cầu Tam Hòa)',
    nameEn: 'Tam Hoa Estuary Commune',
    lat: 15.4600,
    lng: 108.6650,
    category: 'bridge',
    description: 'Cầu Tam Hòa vượt sông Trường Giang, vùng nuôi trồng thủy sản lồng bè nước lợ và rừng ngập mặn.',
    descriptionEn: 'Tam Hoa bridge across Truong Giang river and brackish-water aquaculture cages.',
    cameraPreset: {
      position: [330, 150, 530],
      target: [330, 2, 655],
    },
  },
  TAM_GIANG: {
    id: 'tam-giang-commune',
    name: 'Xã Tam Giang (Rừng Dừa Nước)',
    nameEn: 'Tam Giang Estuary Commune',
    lat: 15.4200,
    lng: 108.6700,
    category: 'nature',
    description: 'Ngã ba cửa sông An Tân đổ ra vịnh An Hòa với rừng dừa nước bạt ngàn, bến thuyền ghe chài lưới.',
    descriptionEn: 'River junction into An Hoa bay with lush nipa palm mangroves and fishing boats.',
    cameraPreset: {
      position: [275, 130, 700],
      target: [275, 2, 805],
    },
  },
  TAM_XUAN_1: {
    id: 'tam-xuan-1-commune',
    name: 'Xã Tam Xuân 1 (Cầu Bà Bầu)',
    nameEn: 'Tam Xuan 1 Gateway Commune',
    lat: 15.5200,
    lng: 108.5700,
    category: 'cultural',
    description: 'Cửa ngõ phía Bắc huyện Núi Thành tiếp giáp Tam Kỳ qua Cầu Bà Bầu trên QL1A, làng nghề truyền thống bún sắn.',
    descriptionEn: 'Northern gateway commune bordering Tam Ky at Ba Bau bridge on Highway 1A.',
    cameraPreset: {
      position: [195, 145, 415],
      target: [195, 2, 535],
    },
  },
  TAM_XUAN_2: {
    id: 'tam-xuan-2-commune',
    name: 'Xã Tam Xuân 2 (Nông Nghiệp CNC)',
    nameEn: 'Tam Xuan 2 Agro-Forestry Commune',
    lat: 15.5050,
    lng: 108.5400,
    category: 'nature',
    description: 'Vùng đồi gò nông lâm nghiệp, khu nhà kính trồng rau quả sạch công nghệ cao Tây Bắc Núi Thành.',
    descriptionEn: 'High-tech agricultural greenhouse parks and forestry processing hub in Tam Xuan 2.',
    cameraPreset: {
      position: [90, 150, 410],
      target: [90, 2, 535],
    },
  },
};


