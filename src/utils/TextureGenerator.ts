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
}
