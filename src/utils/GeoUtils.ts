import { DA_NANG_ORIGIN, GEO_SCALE } from '@/config/coordinates';

/**
 * Utility functions for Geographic (WGS84) to Three.js Cartesian coordinate conversions
 */
export class GeoUtils {
  /**
   * Projects WGS84 Latitude and Longitude to 3D Scene coordinates (X, Z)
   * Three.js coordinate system:
   * X+ -> East (Longitude positive offset)
   * Z- -> North (Latitude positive offset in Three.js standard)
   * Y+ -> Altitude (Meters above sea level)
   */
  public static toSceneCoordinates(lat: number, lng: number, altitude = 0): [number, number, number] {
    const deltaLat = lat - DA_NANG_ORIGIN.lat;
    const deltaLng = lng - DA_NANG_ORIGIN.lng;

    const metersEast = deltaLng * GEO_SCALE.LNG_TO_METERS;
    const metersNorth = deltaLat * GEO_SCALE.LAT_TO_METERS;

    const x = metersEast / GEO_SCALE.METERS_PER_UNIT;
    const z = -metersNorth / GEO_SCALE.METERS_PER_UNIT;
    const y = altitude / GEO_SCALE.METERS_PER_UNIT;

    return [x, y, z];
  }

  /**
   * Calculates Haversine distance in meters between two coordinates
   */
  public static haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Earth radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
