import './style.css';
import { Engine } from '@/core/Engine';
import { World } from '@/world/World';
import { UIManager } from '@/ui/UIManager';

/**
 * Da Nang 3D Application Bootstrap
 */
function bootstrap(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#webgl-canvas');
  if (!canvas) {
    throw new Error('Fatal: #webgl-canvas element not found in DOM.');
  }

  // 1. Initialize core 3D graphics engine
  const engine = new Engine(canvas);

  // 2. Build the procedural Da Nang 3D digital twin world
  const world = new World(engine);

  // 3. Mount interactive glassmorphic UI overlay
  new UIManager(engine, world);

  // eslint-disable-next-line no-console
  console.log(
    '%c[Da Nang 3D] Engine initialized successfully! %cReady for real-time visualization.',
    'color: #ffc107; font-weight: bold;',
    'color: #00e676;'
  );
}

// Ensure DOM content is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
