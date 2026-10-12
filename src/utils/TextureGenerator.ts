import * as THREE from 'three';

/**
 * Procedural texture generator using HTML5 Canvas for ultra-fast startup and crisp PBR visuals
 */
export class TextureGenerator {
  /**
   * Generates a seamless water normal map for realistic river & sea wave reflections
   */
  public static createWaterNormalMap(width = 512, height = 512): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = (x / width) * Math.PI * 4;
        const v = (y / height) * Math.PI * 4;

        // Wave superposition
        const waveX = Math.sin(u * 2.5 + Math.cos(v * 1.8)) * 0.5 + Math.sin(u * 5.2 - v * 3.1) * 0.25;
        const waveY = Math.cos(v * 2.8 + Math.sin(u * 1.4)) * 0.5 + Math.cos(v * 4.9 + u * 2.7) * 0.25;

        // Convert gradient to normal map vector (tangent space: R=X, G=Y, B=Z)
        const nx = Math.floor((waveX * 0.5 + 0.5) * 255);
        const ny = Math.floor((waveY * 0.5 + 0.5) * 255);
        const nz = 240; // upward bias

        const idx = (y * width + x) * 4;
        data[idx] = nx;
        data[idx + 1] = ny;
        data[idx + 2] = nz;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    return texture;
  }

  /**
   * Generates a modern architectural window facade texture with night emissive grid
   */
  public static createBuildingTextureAtlas(): {
    diffuseMap: THREE.CanvasTexture;
    emissiveMap: THREE.CanvasTexture;
  } {
    const size = 512;
    const canvasDiffuse = document.createElement('canvas');
    canvasDiffuse.width = size;
    canvasDiffuse.height = size;
    const ctxD = canvasDiffuse.getContext('2d')!;

    const canvasEmissive = document.createElement('canvas');
    canvasEmissive.width = size;
    canvasEmissive.height = size;
    const ctxE = canvasEmissive.getContext('2d')!;

    // Concrete/glass facade base (modern slate gray with architectural banding)
    ctxD.fillStyle = '#262f3c';
    ctxD.fillRect(0, 0, size, size);

    ctxE.fillStyle = '#000000';
    ctxE.fillRect(0, 0, size, size);

    const rows = 16;
    const cols = 16;
    const cellW = size / cols;
    const cellH = size / rows;
    const padX = cellW * 0.22;
    const padY = cellH * 0.28;

    // Window light palette (warm amber, golden yellow, cool white, cyan corporate)
    const nightPalettes = ['#ffc83b', '#ffd56b', '#e6f2ff', '#64d2ff'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = c * cellW + padX;
        const wy = r * cellH + padY;
        const ww = cellW - padX * 2;
        const wh = cellH - padY * 2;

        // Daytime reflective glass tint (azure/cyan tinted facade)
        ctxD.fillStyle = (r + c) % 2 === 0 ? '#42586e' : '#37495b';
        ctxD.fillRect(wx, wy, ww, wh);

        // Window mullion border
        ctxD.strokeStyle = '#181e26';
        ctxD.lineWidth = 1.2;
        ctxD.strokeRect(wx, wy, ww, wh);

        // Randomized night lights (approx 65% of windows illuminated at night)
        if (Math.random() < 0.65) {
          const color = nightPalettes[Math.floor(Math.random() * nightPalettes.length)];
          ctxE.fillStyle = color;
          ctxE.fillRect(wx, wy, ww, wh);
        }
      }
    }

    const diffuseMap = new THREE.CanvasTexture(canvasDiffuse);
    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;
    diffuseMap.repeat.set(1, 4);

    const emissiveMap = new THREE.CanvasTexture(canvasEmissive);
    emissiveMap.wrapS = THREE.RepeatWrapping;
    emissiveMap.wrapT = THREE.RepeatWrapping;
    emissiveMap.repeat.set(1, 4);

    return { diffuseMap, emissiveMap };
  }

  /**
   * Generates asphalt road texture with white/yellow median markings
   */
  public static createRoadTexture(): THREE.CanvasTexture {
    const width = 256;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Asphalt surface
    ctx.fillStyle = '#202226';
    ctx.fillRect(0, 0, width, height);

    // Subtle grain noise
    ctx.fillStyle = '#282b30';
    for (let i = 0; i < 3000; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }

    // Yellow double center line
    ctx.strokeStyle = '#e6b800';
    ctx.lineWidth = 4;
    ctx.setLineDash([24, 16]);
    ctx.beginPath();
    ctx.moveTo(width / 2 - 4, 0);
    ctx.lineTo(width / 2 - 4, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 + 4, 0);
    ctx.lineTo(width / 2 + 4, height);
    ctx.stroke();

    // White outer curb lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(12, height);
    ctx.moveTo(width - 12, 0);
    ctx.lineTo(width - 12, height);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 8);
    return texture;
  }

  /**
   * Generates a high-altitude satellite map texture rendering real Da Nang terrain from above
   * Covers Son Tra rainforest, My Khe sandy beach, Han River mouth, and urban parcels
   */
  public static createSatelliteTerrainTexture(width = 1024, height = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // 1. Base terrain tone (alluvial plain & city gray)
    ctx.fillStyle = '#1c2628';
    ctx.fillRect(0, 0, width, height);

    // 2. East Sea ocean gradient (Right half of canvas)
    const oceanGrad = ctx.createLinearGradient(width * 0.6, 0, width, 0);
    oceanGrad.addColorStop(0, '#0a3d5e');
    oceanGrad.addColorStop(0.3, '#072e48');
    oceanGrad.addColorStop(1.0, '#041c2c');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(width * 0.62, 0, width * 0.38, height);

    // 3. Sandy Golden Beach strip (My Khe & Non Nuoc coastline)
    ctx.strokeStyle = '#d2b67f';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(width * 0.62, 0);
    ctx.quadraticCurveTo(width * 0.61, height * 0.5, width * 0.63, height);
    ctx.stroke();

    // 4. Son Tra Peninsula (Lush tropical green in top-right corner)
    ctx.fillStyle = '#1a4e2b';
    ctx.beginPath();
    ctx.ellipse(width * 0.72, height * 0.22, width * 0.18, height * 0.16, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Son Tra mountain ridge details
    ctx.fillStyle = '#286a3d';
    ctx.beginPath();
    ctx.ellipse(width * 0.73, height * 0.21, width * 0.11, height * 0.09, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // 5. Marble Mountains (Ngu Hanh Son limestone peaks in bottom-right)
    ctx.fillStyle = '#3f5643';
    for (let i = 0; i < 5; i++) {
      const px = width * 0.65 + (i % 2) * 16;
      const py = height * 0.72 + i * 18;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Western mountains (Ba Na Hills range on far left)
    const mountainGrad = ctx.createLinearGradient(0, 0, width * 0.3, 0);
    mountainGrad.addColorStop(0, '#163321');
    mountainGrad.addColorStop(0.8, '#1c3d28');
    mountainGrad.addColorStop(1.0, 'transparent');
    ctx.fillStyle = mountainGrad;
    ctx.fillRect(0, 0, width * 0.32, height);

    // 7. S-curved Han River channel & Da Nang Bay (Dark blue water corridor)
    ctx.strokeStyle = '#0e4a70';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(width * 0.52, height);
    ctx.quadraticCurveTo(width * 0.5, height * 0.6, width * 0.5, height * 0.4);
    ctx.quadraticCurveTo(width * 0.48, height * 0.28, width * 0.46, height * 0.22);
    ctx.stroke();

    // Da Nang Bay widening at river mouth
    ctx.fillStyle = '#0a3a5a';
    ctx.beginPath();
    ctx.moveTo(width * 0.35, 0);
    ctx.lineTo(width * 0.58, 0);
    ctx.quadraticCurveTo(width * 0.52, height * 0.24, width * 0.44, height * 0.24);
    ctx.quadraticCurveTo(width * 0.36, height * 0.2, width * 0.35, 0);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }
}
