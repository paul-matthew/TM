import * as THREE from './three.module.js';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
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

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    // if (window.innerWidth > 768) {
    //   const scaleFactor = 1.7; // For non-mobile screens
    //   const newWidth = window.innerWidth / scaleFactor;
    //   const newHeight = window.innerHeight / scaleFactor;
    //   this.renderer.setSize(newWidth, newHeight);
    //   // Center the canvas by adjusting its position
    //   canvas.style.position = 'absolute';
    //   canvas.style.left = `${(window.innerWidth - newWidth) / 2}px`;
    //   canvas.style.top = `${(window.innerHeight - newHeight) / 2}px`;
    //   // this.renderer.shadowMap.enabled = true;
    //   document.body.appendChild(this.renderer.domElement);

    // } else {
    //   const scaleFactor = 1.5; // For mobile screens
    //   const newWidth = window.innerWidth / scaleFactor;
    //   const newHeight = window.innerHeight / scaleFactor;
    //   this.renderer.setSize(newWidth, newHeight);
    //   // Center the canvas by adjusting its position
    //   canvas.style.position = 'absolute';
    //   canvas.style.left = `${(window.innerWidth - newWidth) / 2}px`;
    //   canvas.style.top = `${(window.innerHeight - newHeight) / 2}px`;
    //   // this.renderer.shadowMap.enabled = true;
    //   document.body.appendChild(this.renderer.domElement);
    // }


    

    this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
