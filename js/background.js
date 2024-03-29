let scene, camera, cloudParticles = [], composer, backgroundRenderer;
let lastRender = 0;
const renderThrottle = 1000 / 30; // Throttle to approximately 30 FPS

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  const cloudSection = document.querySelector('.cloud-section');

  addLights();
  setupBackgroundRenderer(cloudSection);
  loadTextures();
}

function addLights() {
  let ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xff8c19);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let orangeLight = new THREE.PointLight(0x00B5B8, 50, 450, 1.7);
  orangeLight.position.set(200, 300, 100);
  scene.add(orangeLight);

  let redLight = new THREE.PointLight(0x9AEB5C, 50, 450, 1.7);
  redLight.position.set(100, 300, 100);
  scene.add(redLight);

  let blueLight = new THREE.PointLight(0xD091DE, 50, 450, 1.7);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);
}

function setupBackgroundRenderer(cloudSection) {
  backgroundRenderer = new THREE.WebGLRenderer();
  backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2(0x03544e, 0.001);
  backgroundRenderer.setClearColor(scene.fog.color);
  cloudSection.appendChild(backgroundRenderer.domElement);
}

function loadTextures() {
  let loader = new THREE.TextureLoader();
  loader.load("./images/smoke.png", function (texture) {
    createCloudParticles(texture);
  });
  loader.load("./images/stars.jpg", function(texture){
    setupEffects(texture);
  });
}

function createCloudParticles(texture) {
  const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
  const cloudMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
  });

  for (let p = 0; p < 20; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 500
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random() * 2 * Math.PI;
    cloud.material.opacity = 0.55;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
}

function setupEffects(texture) {
  const textureEffect = new POSTPROCESSING.TextureEffect({
    blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    texture: texture
  });
  textureEffect.blendMode.opacity.value = 0.2;

  const bloomEffect = new POSTPROCESSING.BloomEffect({
    blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    kernelSize: POSTPROCESSING.KernelSize.SMALL,
    useLuminanceFilter: true,
    luminanceThreshold: 0.3,
    luminanceSmoothing: 0.75
  });
  bloomEffect.blendMode.opacity.value = 1.5;

  let effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomEffect,
    textureEffect
  );
  effectPass.renderToScreen = true;

  composer = new POSTPROCESSING.EffectComposer(backgroundRenderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
  composer.addPass(effectPass);

  window.addEventListener("resize", onWindowResize, false);
  composerInitialized = true;
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
}

let composerInitialized = false;

function render(timestamp) {
  if (timestamp - lastRender >= renderThrottle) {
    if (composerInitialized) {
      cloudParticles.forEach(p => {
        p.rotation.z -= 0.011;
      });
      composer.render(0.1);
    }
    lastRender = timestamp;
  }

  requestAnimationFrame(render);
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  window.addEventListener('resize', onWindowResize);
  render();
});

