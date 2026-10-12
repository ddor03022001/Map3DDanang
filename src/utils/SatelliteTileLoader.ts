import * as THREE from 'three';

export interface TileGridBounds {
  zoom: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Satellite Tile Loader fetching real-world high-resolution satellite imagery
 * from Esri World Imagery (ArcGIS) with zero API key and hardware-accelerated Canvas stitching.
 */
export class SatelliteTileLoader {
  /**
   * Fetches an array of real slippy map satellite tiles and stitches them into a Three.js CanvasTexture
   */
  public static createStitchedSatelliteTexture(bounds: TileGridBounds): THREE.CanvasTexture {
    const tileCols = bounds.maxX - bounds.minX + 1;
    const tileRows = bounds.maxY - bounds.minY + 1;
    const tileSize = 256;

    const canvas = document.createElement('canvas');
    canvas.width = tileCols * tileSize;
    canvas.height = tileRows * tileSize;
    const ctx = canvas.getContext('2d')!;

    // Initial placeholder background (sand/terrain tone) while tiles stream in
    ctx.fillStyle = '#2d382e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    let loadedCount = 0;
    const totalTiles = tileCols * tileRows;

    for (let col = 0; col < tileCols; col++) {
      for (let row = 0; row < tileRows; row++) {
        const tileX = bounds.minX + col;
        const tileY = bounds.minY + row;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${bounds.zoom}/${tileY}/${tileX}`;

        img.onload = () => {
          ctx.drawImage(img, col * tileSize, row * tileSize);
          loadedCount++;
          // Trigger GPU texture update
          texture.needsUpdate = true;
        };

        img.onerror = () => {
          loadedCount++;
          // Draw subtle backup tile
          ctx.fillStyle = '#3a473a';
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
          texture.needsUpdate = true;
        };
      }
    }

    return texture;
  }
}
