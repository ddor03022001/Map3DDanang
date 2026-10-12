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
    description: 'Cây cầu treo dây võng dài nhất Việt Nam, bắc qua cửa biển vịnh Đà Nẵng nơi sông Hàn đổ ra biển Đông.',
    descriptionEn: 'Longest suspension bridge in Vietnam, spanning the mouth of the Han River as it enters Da Nang Bay.',
    cameraPreset: {
      position: [-30, 60, -360],
      target: [-35, 15, -395],
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
};
