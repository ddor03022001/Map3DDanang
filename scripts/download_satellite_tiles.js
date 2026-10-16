import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.resolve('public/textures/satellite_tiles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const z = 13;
const minX = 6562;
const maxX = 6570; // inclusive
const minY = 3737;
const maxY = 3742; // inclusive

console.log(`Starting download of ${(maxX - minX + 1) * (maxY - minY + 1)} satellite tiles...`);

function downloadTile(x, y) {
  return new Promise((resolve) => {
    const filename = path.join(outDir, `tile_${z}_${x}_${y}.jpg`);
    if (fs.existsSync(filename) && fs.statSync(filename).size > 1000) {
      resolve();
      return;
    }
    const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    const file = fs.createWriteStream(filename);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(filename);
        resolve();
      }
    }).on('error', () => {
      resolve();
    });
  });
}

async function run() {
  const promises = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      promises.push(downloadTile(x, y));
    }
  }
  await Promise.all(promises);
  console.log('Satellite tiles downloaded successfully!');
}

run();
