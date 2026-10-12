import { BaseWard } from '../../core/BaseWard';

/**
 * Phường Bình Hiên & Hải Châu 1 (Quận Hải Châu)
 * Houses the West abutment of Dragon Bridge, APEC Sculpture Park, and Cham Museum
 */
export class BinhHienWard extends BaseWard {
  constructor() {
    super(
      {
        id: 'binh-hien-ward',
        name: 'Phường Bình Hiên & Hải Châu 1',
        nameEn: 'Binh Hien & Hai Chau 1 Ward',
        type: 'ward',
        areaKm2: 1.2,
        description: 'Trung tâm văn hóa ven sông Hàn với Cầu Rồng bờ Tây, Công viên APEC và Bảo tàng Điêu khắc Chăm.',
      },
      {
        minX: -80,
        maxX: -24,
        minZ: -40,
        maxZ: 50,
      }
    );
  }

  public initialize(): void {
    this.isLoaded = true;
  }

  public update(_delta: number, _elapsed: number, _nightGlowIntensity: number): void {}
}
