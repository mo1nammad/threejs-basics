import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// css
import "./styles/styles.css";

// dom element
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new Three.Scene();

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

window.addEventListener("dblclick", () => {
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

camera.position.z = 2;
scene.add(camera);

// mesh and geometries
// buffer geometries **

const geometry = new Three.BufferGeometry();

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5;
}
const positionAttribute = new Three.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionAttribute);

const material = new Three.MeshBasicMaterial({
  color: "#088F8F",
  wireframe: true,
});

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// animation and render

const renderer = new Three.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  controls.update();

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
