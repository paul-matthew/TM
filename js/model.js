import * as THREE from './three.module.js';
import SceneInit from './SceneInit.js';
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from './GLTFLoader.js';

let loadedModel = null;
const ROTATION_SPEED = 0.003; // Adjust the value as needed

var modelContainer = document.getElementById('model-container');
function animateAndNavigate() {
  animateFadingDown();
  navigateToShop();
}

function animateFadingDown() {
  modelContainer.style.opacity = 0;
  // modelContainer.style.transform = 'translateX(-50%) translateY(-100vh)';
  modelContainer.style.transition = 'opacity 0.5s';
  // modelContainer.style.transition = 'opacity 1s, transform 2s';
}

function navigateToShop() {
  // Adjust this timeout value based on how long your animation takes
  setTimeout(() => {
    window.location.href = "shop.html";
  }, 500); 
}

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // Find the button element by its ID
  const exploreShopBtn = document.getElementById('exploreshop-btn');

  // Add a click event listener to the button
  exploreShopBtn.addEventListener('click', function () {
    // Call the animateAndNavigate function when the button is clicked
    animateAndNavigate();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var modelContainer = document.getElementById('model-container');

  // Function to animate the fading upward effect
  function animateFadingUp() {
    modelContainer.style.opacity = 1;
    modelContainer.style.transform = 'translateX(-50%) translateY(-100vh)';
  }

  // Set a timeout to delay the animation (adjust the duration if needed)
  setTimeout(animateFadingUp, 2000);
});

function init() {
  let sceneRotation = -0.35; // Initialize scene rotation
  const test = new SceneInit('myThreeJsCanvas');
  const modelRenderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('myThreeJsCanvas'),
    antialias: true,
    alpha: true, // Set alpha to true for a transparent background
  });
  modelRenderer.setPixelRatio(window.devicePixelRatio * 2);
  test.initialize();

  modelRenderer.render(test.scene, test.camera);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('./js/carnival/scene.gltf', (gltfScene) => {
    loadedModel = gltfScene;

    // if (window.innerWidth > 768) {
      // gltfScene.scene.position.set(0, -0.5, 0); // For non-mobile screens
      // test.camera.position.z = 4;
    // } else if(window.innerWidth>500 && window.innerHeight<500) {
    //   gltfScene.scene.position.set(0, -0.05, 0); // For mobile screens
    //   test.camera.position.z = 3;
    // } else {
      gltfScene.scene.position.set(0, -0.35, 0); // For mobile screens
      test.camera.position.z = 5;
    // }

    test.scene.add(gltfScene.scene);

    // Initialize AnimationMixer
    const mixer = new THREE.AnimationMixer(gltfScene.scene);

    // Load animations from the gltfScene
    const animations = gltfScene.animations;
    const actions = animations.map((animation) => mixer.clipAction(animation));

    // Start playing the animations
    actions.forEach((action) => action.play());

    // Create an animate function for rendering
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the animation mixer
      const delta = test.clock.getDelta();
      mixer.update(delta);

      // Rotate the entire scene (including the confetti)
      sceneRotation += ROTATION_SPEED;
      test.scene.rotation.y = sceneRotation;

      modelRenderer.render(test.scene, test.camera);
    };

    // Start the animation loop
    animate();

    // Add OrbitControls
    const controls = new OrbitControls(test.camera, modelRenderer.domElement);
    controls.enableDamping = true; // Add damping for smooth camera movement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; // Set to false for more intuitive panning
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.enableZoom = false; 

    // Increase the intensity of the ambient light
    const ambientLight = new THREE.AmbientLight('#D091DE', 400.0); // Higher intensity
    test.scene.add(ambientLight);

    // Increase the intensity of the directional light
    const directionalLight = new THREE.DirectionalLight('#D091DE', 10.0); // Higher intensity
    directionalLight.position.set(10, 100, 10); // Adjust position as needed
    test.scene.add(directionalLight);
  });
}

// Initialize the Three.js scene
init();
