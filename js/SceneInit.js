import * as THREE from './three.module.js';

export default class SceneInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.clock = undefined;
    this.controls = undefined;
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    // Event listener for window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  initialize() {
    this.scene = new THREE.Scene();

    const canvas = document.getElementById(this.canvasId);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    if (window.innerWidth > 768) {
      this.camera.position.z = 2; // For non-mobile screens
    } else {
      this.camera.position.z = 4.0; // For mobile screens
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.clock = new THREE.Clock();

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    window.removeEventListener('resize', () => this.onWindowResize());
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    const canvas = document.getElementById(this.canvasId);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
