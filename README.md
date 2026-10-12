# Da Nang 3D Smart City Digital Twin (Đà Nẵng 3D)

A photorealistic, high-performance 3D Web GIS & Digital Twin of Da Nang City built with **Three.js**, **TypeScript**, and **Vite**.

Designed with a modular, enterprise-grade architecture for production scalability, memory efficiency, and interactive web visualization.

---

## 🏗️ Architecture Overview

The codebase is organized into cleanly separated subsystems following senior graphics engineering principles:

```
Map3DDaNang/
├── src/
│   ├── core/                     # Core Engine subsystems
│   │   ├── Engine.ts             # Central orchestrator singleton managing loop & lifecycle
│   │   ├── SceneManager.ts       # Scene hierarchy, exponential fog & atmosphere
│   │   ├── CameraManager.ts      # Perspective camera, damping, and GSAP flyTo animations
│   │   ├── RendererManager.ts    # WebGL2 renderer, ACES Filmic tone mapping & soft shadows
│   │   ├── Time.ts               # Animation scheduler with smoothed delta & real-time FPS
│   │   └── Sizes.ts              # Viewport dimension manager & device pixel ratio capping
│   │
│   ├── config/                   # Geographic datum & visual presets
│   │   ├── coordinates.ts        # WGS84 coordinates (Lat/Lng) & projection scale factors
│   │   └── constants.ts          # Day / Sunset / Night environment presets & camera config
│   │
│   ├── world/                    # 3D Scene entities
│   │   ├── World.ts              # World root container aggregating all layers
│   │   ├── Environment.ts        # Sun / Moon lighting, shadows & day/night interpolation
│   │   ├── Terrain.ts            # Topography: Son Tra Peninsula, Marble Mountains, Plains
│   │   ├── Water.ts              # Han River & My Khe Coastline PBR water with animated waves
│   │   ├── CityGrid.ts           # Arterial roads (Vo Van Kiet, Bach Dang) & streetlights
│   │   ├── Buildings.ts          # Instanced city fabric with night window illumination
│   │   └── landmarks/            # Hero Landmark Models
│   │       ├── LandmarkManager.ts # Landmark coordinator & event dispatcher
│   │       ├── DragonBridge.ts   # Cầu Rồng: Golden arches, LED ribbon, and fire breathing
│   │       ├── HanRiverBridge.ts # Cầu Sông Hàn: Central rotating pier & stay cables
│   │       ├── ThuanPhuocBridge.ts # Cầu Thuận Phước: Suspension towers & main cables
│   │       └── AdminCenter.ts    # Trung Tâm Hành Chính: Aerodynamic curved glass tower
│   │
│   ├── ui/                       # Glassmorphic HUD overlay
│   │   ├── UIManager.ts          # Coordinates UI events and 3D camera sync
│   │   └── components/
│   │       ├── NavigationBar.ts  # Branding, Day/Sunset/Night selector, Fire effect button
│   │       ├── LandmarkMenu.ts   # Landmark drawer with one-click cinematic Fly-To
│   │       ├── InfoPanel.ts      # Detailed architectural/historical card with GPS data
│   │       └── StatsOverlay.ts   # Real-time HUD (FPS counter, camera altitude, WebGL2)
│   │
│   ├── utils/                    # Math & Procedural Helpers
│   │   ├── GeoUtils.ts           # WGS84 to local 3D Cartesian coordinates projection
│   │   ├── TextureGenerator.ts   # Procedural normal maps, road asphalt & window atlas
│   │   └── ColorUtils.ts         # Color lerping for environmental transitions
│   │
│   ├── main.ts                   # Application bootstrap entry point
│   ├── style.css                 # Glassmorphic styling, dark theme & responsive rules
│   └── vite-env.d.ts             # Vite client TypeScript definitions
│
├── public/                       # Static public assets (3D models, textures, icons)
├── index.html                    # HTML5 shell with WebGL canvas mount point
├── vite.config.ts                # Vite configuration with path aliases (@/)
└── tsconfig.json                 # TypeScript strict configuration
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+ or 20+
*   npm or pnpm

### Installation
```bash
# Install dependencies
npm install
```

### Development Server
```bash
# Start local development server with HMR
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port displayed in console).

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 How to Extend the Project

### 1. Importing Custom Blender 3D Models (e.g., glTF / GLB Cầu Rồng)
Place your `.glb` or `.gltf` file inside `public/models/`:
```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/models/dragon_bridge.glb', (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 0, 0); // Placed at Da Nang anchor coordinates
  this.group.add(model);
});
```

### 2. Loading Real-World Building Footprints (Overture Maps / OSM GeoJSON)
Convert GeoJSON polygon footprints into extruded meshes using `Three.ExtrudeGeometry`:
```ts
import { GeoUtils } from '@/utils/GeoUtils';

// Convert each polygon coordinate [lng, lat]
const [x, , z] = GeoUtils.toSceneCoordinates(lat, lng);
```

### 3. Streaming 3D Tiles
To integrate massive photogrammetry or 3D city models, install `3d-tiles-renderer`:
```bash
npm install 3d-tiles-renderer
```
And stream tilesets dynamically into `SceneManager`.

---

## 🌐 Publishing to Web
You can deploy directly to:
*   **Vercel:** `npx vercel`
*   **Cloudflare Pages:** Connect Git repository with build command `npm run build` and output directory `dist`.
