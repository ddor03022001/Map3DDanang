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
      position: [192, 32, 685],
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
  TAM_HIEP_SATELLITE: {
    id: 'tam-hiep-satellite',
    name: 'Vệ Tinh Xã Tam Hiệp (Từ Trên Cao)',
    nameEn: 'Tam Hiep Satellite Top-Down',
    lat: 15.4290,
    lng: 108.6475,
    category: 'nature',
    description: 'Góc nhìn vệ tinh thực tế độ nét cao từ trên cao toàn cảnh Xã Tam Hiệp (Núi Thành), hiển thị chi tiết nền ảnh chụp vũ trụ, QL1A, KCN THACO và sông biển.',
    descriptionEn: 'Authentic high-resolution satellite orthophoto bird-eye view of Tam Hiep Commune and Chu Lai industrial axis.',
    cameraPreset: {
      position: [300, 260, 680],
      target: [300, 0, 675],
    },
  },
  TAM_HIEP_CIVIC: {
    id: 'tam-hiep-civic',
    name: 'UBND & Trung Tâm Xã Tam Hiệp',
    nameEn: 'Tam Hiep Civic Center & Market',
    lat: 15.4260,
    lng: 108.6420,
    category: 'cultural',
    description: 'Trụ sở UBND Xã Tam Hiệp với cờ Tổ quốc, Chợ Tam Hiệp buôn bán nhộn nhịp, trường học, trạm y tế và khu dân cư địa phương.',
    descriptionEn: 'Tam Hiep Commune People Committee, local market, school, and neighborhood.',
    cameraPreset: {
      position: [135, 32, 680],
      target: [165, 4, 710],
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
};
