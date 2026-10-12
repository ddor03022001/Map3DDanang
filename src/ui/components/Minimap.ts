import * as THREE from 'three';
import type { CameraManager } from '@/core/CameraManager';
import type { DistrictManager } from '@/world/districts';

/**
 * Interactive 2D Radar Minimap showing camera position, gaze heading cone,
 * district boundaries, and instant click-to-teleport functionality.
 */
export class Minimap {
  public element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cameraManager: CameraManager;
  private districtManager: DistrictManager;
  private onDistrictSelect?: (id: string) => void;
  private size = 160;

  constructor(
    cameraManager: CameraManager,
    districtManager: DistrictManager,
    onDistrictSelect?: (id: string) => void
  ) {
    this.cameraManager = cameraManager;
    this.districtManager = districtManager;
    this.onDistrictSelect = onDistrictSelect;

    this.element = document.createElement('div');
    this.element.className = 'dn-minimap-card';

    this.element.innerHTML = `
      <div class="dn-minimap-header">
        <span class="dn-minimap-title">RADAR ĐÀ NẴNG</span>
        <button class="dn-minimap-toggle" id="dn-minimap-toggle" title="Thu nhỏ/Mở rộng">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>
      <div class="dn-minimap-body">
        <canvas class="dn-minimap-canvas" width="${this.size}" height="${this.size}"></canvas>
      </div>
      <div class="dn-district-chips">
        <button class="dn-chip active" data-id="hai-chau">Hải Châu</button>
        <button class="dn-chip" data-id="son-tra">Sơn Trà</button>
        <button class="dn-chip" data-id="ngu-hanh-son">Ngũ Hành</button>
        <button class="dn-chip" data-id="hoa-vang">Bà Nà</button>
        <button class="dn-chip" data-id="nui-thanh">Núi Thành</button>
        <button class="dn-chip" data-id="tam-hiep" title="Xem Xã Tam Hiệp trên nền ảnh vệ tinh">Tam Hiệp</button>
      </div>
    `;

    this.canvas = this.element.querySelector('.dn-minimap-canvas')!;
    this.ctx = this.canvas.getContext('2d')!;

    this.initInteractions();
  }

  private initInteractions(): void {
    // Click on canvas to fly to position
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Convert minimap (0 to size) to 3D scene (X, Z)
      // Map scale: size corresponds to world coordinate range [-550, 450] X, [-500, 500] Z
      const worldX = ((clickX / this.size) - 0.5) * 1000;
      const worldZ = ((clickY / this.size) - 0.5) * 1000;

      this.cameraManager.flyTo(
        [worldX, 65, worldZ + 45],
        [worldX, 5, worldZ]
      );
    });

    // District Quick Jump Chips
    const chips = this.element.querySelectorAll<HTMLButtonElement>('.dn-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        if (!id) return;

        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        if (id === 'tam-hiep') {
          // Fly directly to Tam Hiep high-altitude satellite panorama
          this.cameraManager.flyTo([250, 95, 620], [280, 6, 720]);
          this.onDistrictSelect?.('tam-hiep');
          return;
        }

        const district = this.districtManager.getDistrict(id);
        if (district) {
          this.cameraManager.flyTo(
            district.metadata.cameraPreset.position,
            district.metadata.cameraPreset.target
          );
          this.onDistrictSelect?.(id);
        }
      });
    });
  }

  /**
   * Redraws radar canvas with current camera position and gaze direction
   */
  public update(): void {
    const w = this.size;
    const h = this.size;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    // 1. Radar background
    ctx.fillStyle = '#08101a';
    ctx.fillRect(0, 0, w, h);

    // 2. Simplified Da Nang Coastline & Han River contour
    // Coastline (My Khe / Son Tra)
    ctx.strokeStyle = '#00e5ff33';
    ctx.lineWidth = 1.5;

    // East Sea water boundary
    ctx.fillStyle = '#0a2336';
    ctx.beginPath();
    ctx.moveTo(w * 0.62, 0);
    ctx.quadraticCurveTo(w * 0.58, h * 0.5, w * 0.65, h);
    ctx.lineTo(w, h);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();

    // Han River artery
    ctx.strokeStyle = '#00e5ff88';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.48, h);
    ctx.quadraticCurveTo(w * 0.46, h * 0.6, w * 0.46, h * 0.38);
    ctx.quadraticCurveTo(w * 0.44, h * 0.25, w * 0.42, h * 0.18);
    ctx.stroke();

    // Son Tra peninsula silhouette
    ctx.fillStyle = '#1c4a2a';
    ctx.beginPath();
    ctx.arc(w * 0.72, h * 0.2, 18, 0, Math.PI * 2);
    ctx.fill();

    // 3. District POI Dots
    const districts = this.districtManager.getAllDistricts();
    districts.forEach((d) => {
      // Map center preset target to minimap coordinates
      const target = d.metadata.cameraPreset.target;
      const px = (target[0] / 1000 + 0.5) * w;
      const py = (target[2] / 1000 + 0.5) * h;

      ctx.fillStyle = '#ffc107';
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Camera Position & Gaze Heading Cone
    const camPos = this.cameraManager.camera.position;
    const cx = (camPos.x / 1000 + 0.5) * w;
    const cy = (camPos.z / 1000 + 0.5) * h;

    // Heading direction
    const forward = this.cameraManager.camera.getWorldDirection(new THREE.Vector3());
    const angle = Math.atan2(forward.z, forward.x);

    // Gaze field of view wedge (cone of vision)
    const fovAngle = Math.PI / 4;
    const coneRadius = 24;

    ctx.fillStyle = 'rgba(255, 193, 7, 0.25)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, coneRadius, angle - fovAngle / 2, angle + fovAngle / 2);
    ctx.closePath();
    ctx.fill();

    // Camera center pulse blip
    ctx.fillStyle = '#ff3d00';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
