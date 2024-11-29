import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// loaders
import loadingManager from "./modules/loading-manager";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// css
import "./styles/styles.css";

// meshs
import {
  planeMesh,
  sphereMesh,
  torusMesh,
  ambientLight,
  pointLight,
} from "./modules/meshs";

// dom element
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new Three.Scene();

const rgbLoader = new RGBELoader();
rgbLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = Three.EquirectangularRefractionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

scene.add(sphereMesh, planeMesh, torusMesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

canvas.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (fullscreenElement) {
    // exit fulscreen
    if (document.exitFullscreen) document.exitFullscreen();
    else document.webkitExitFullscreen();
  } else {
    // enter fullscreen
    if (canvas.requestFullscreen) canvas.requestFullscreen();
    else canvas.webkitRequestFullscreen();
  }
});

// camera
const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 4;

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// animation and render

const renderer = new Three.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new Three.Clock();

const animate = () => {
  // update meshs
  // updateMesh();

  controls.update();
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);

function updateMesh() {
  const elapesdTimer = clock.getElapsedTime();

  const meshs = [sphereMesh, torusMesh, planeMesh];
  for (const mesh of meshs) {
    mesh.rotation.y = elapesdTimer * 0.1;
    mesh.rotation.x = -elapesdTimer * 0.15;
  }
}
