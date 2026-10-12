import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { CAMERA_CONFIG } from '@/config/constants';
import type { Sizes } from './Sizes';

/**
 * Enhanced Camera Manager supporting Orbit controls, smooth GSAP Fly-To,
 * WASD / Arrow keyboard city roaming, and D-Pad navigation
 */
export class CameraManager {
  public camera: THREE.PerspectiveCamera;
  public controls: OrbitControls;

  private isAnimating = false;
  private moveSpeed = 65; // Units per second in Three.js space
  private keysPressed: Record<string, boolean> = {};

  constructor(sizes: Sizes, canvas: HTMLCanvasElement) {
    // 1. Initialize PerspectiveCamera
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.FOV,
      sizes.aspect,
      CAMERA_CONFIG.NEAR,
      CAMERA_CONFIG.FAR
    );
    this.camera.position.set(...CAMERA_CONFIG.DEFAULT_POSITION);

    // 2. Initialize OrbitControls with fluid damping & screen-space panning
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = true; // Allows smooth panning on ground
    this.controls.minDistance = CAMERA_CONFIG.MIN_DISTANCE;
    this.controls.maxDistance = CAMERA_CONFIG.MAX_DISTANCE;
    this.controls.maxPolarAngle = CAMERA_CONFIG.MAX_POLAR_ANGLE;
    this.controls.target.set(...CAMERA_CONFIG.DEFAULT_TARGET);
    this.controls.update();

    // 3. Viewport Resize Listener
    sizes.subscribe((width, height) => {
      this.camera.aspect = width / Math.max(height, 1);
      this.camera.updateProjectionMatrix();
    });

    // 4. Keyboard Navigation Listeners (WASD + Arrow Keys + Shift)
    this.initKeyboardControls();
  }

  private initKeyboardControls(): void {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      this.keysPressed[key] = true;
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      this.keysPressed[key] = false;
    });
  }

  public update(delta: number = 0.016): void {
    if (this.isAnimating) return;

    // Process Keyboard Roaming
    this.processKeyboardMovement(delta);

    // Update Orbit Controls
    this.controls.update();
  }

  private processKeyboardMovement(delta: number): void {
    const isMovingForward = this.keysPressed['w'] || this.keysPressed['arrowup'];
    const isMovingBackward = this.keysPressed['s'] || this.keysPressed['arrowdown'];
    const isMovingLeft = this.keysPressed['a'] || this.keysPressed['arrowleft'];
    const isMovingRight = this.keysPressed['d'] || this.keysPressed['arrowright'];
    const isMovingUp = this.keysPressed['e'] || this.keysPressed['pageup'];
    const isMovingDown = this.keysPressed['q'] || this.keysPressed['pagedown'];
    const isTurbo = this.keysPressed['shift'];

    if (
      !isMovingForward &&
      !isMovingBackward &&
      !isMovingLeft &&
      !isMovingRight &&
      !isMovingUp &&
      !isMovingDown
    ) {
      return;
    }

    const currentSpeed = (isTurbo ? this.moveSpeed * 2.5 : this.moveSpeed) * delta;

    // Compute forward vector projected onto the horizontal ground plane (XZ)
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    // Compute right vector perpendicular to forward
    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const moveVector = new THREE.Vector3();

    if (isMovingForward) moveVector.add(forward);
    if (isMovingBackward) moveVector.sub(forward);
    if (isMovingRight) moveVector.add(right);
    if (isMovingLeft) moveVector.sub(right);

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(currentSpeed);
      this.camera.position.add(moveVector);
      this.controls.target.add(moveVector);
    }

    // Vertical altitude adjustment
    if (isMovingUp) {
      this.camera.position.y += currentSpeed;
      this.controls.target.y += currentSpeed * 0.4;
    }
    if (isMovingDown) {
      const newY = Math.max(5, this.camera.position.y - currentSpeed);
      this.camera.position.y = newY;
    }
  }

  /**
   * Manual movement triggers from UI D-Pad buttons
   */
  public moveDirection(direction: 'forward' | 'backward' | 'left' | 'right' | 'in' | 'out'): void {
    const step = 25;
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const offset = new THREE.Vector3();

    switch (direction) {
      case 'forward':
        offset.copy(forward).multiplyScalar(step);
        break;
      case 'backward':
        offset.copy(forward).multiplyScalar(-step);
        break;
      case 'left':
        offset.copy(right).multiplyScalar(-step);
        break;
      case 'right':
        offset.copy(right).multiplyScalar(step);
        break;
      case 'in':
        this.camera.position.addScaledVector(this.camera.getWorldDirection(new THREE.Vector3()), step);
        return;
      case 'out':
        this.camera.position.addScaledVector(this.camera.getWorldDirection(new THREE.Vector3()), -step);
        return;
    }

    gsap.to(this.camera.position, {
      x: this.camera.position.x + offset.x,
      z: this.camera.position.z + offset.z,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(this.controls.target, {
      x: this.controls.target.x + offset.x,
      z: this.controls.target.z + offset.z,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  /**
   * Switches to 2D Top-Down Satellite Map view
   */
  public switchTopDownView(): void {
    this.flyTo(
      [this.controls.target.x, 320, this.controls.target.z + 0.1],
      [this.controls.target.x, 0, this.controls.target.z],
      1.8
    );
  }

  /**
   * Smoothly animates the camera to a target landmark viewpoint
   */
  public flyTo(
    targetPos: [number, number, number],
    lookAtTarget: [number, number, number],
    duration = 2.2,
    onComplete?: () => void
  ): void {
    this.isAnimating = true;
    this.controls.enabled = false;

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut', duration },
      onComplete: () => {
        this.controls.target.set(...lookAtTarget);
        this.controls.enabled = true;
        this.isAnimating = false;
        this.controls.update();
        if (onComplete) onComplete();
      },
    });

    timeline.to(
      this.camera.position,
      {
        x: targetPos[0],
        y: targetPos[1],
        z: targetPos[2],
      },
      0
    );

    timeline.to(
      this.controls.target,
      {
        x: lookAtTarget[0],
        y: lookAtTarget[1],
        z: lookAtTarget[2],
        onUpdate: () => {
          this.camera.lookAt(this.controls.target);
        },
      },
      0
    );
  }

  public dispose(): void {
    this.controls.dispose();
  }
}
