import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./styles/styles.css";

import Cursor from "./modules/Cursor";
// import gsap from "gsap";

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

camera.position.z = 3;
scene.add(camera);

// cursor
const cursor = new Cursor(sizes.width, sizes.height);

canvas.addEventListener("mousemove", (ev) => {
  cursor.setAxis(ev.clientX, ev.clientY);
});

// mesh
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: "#088F8F" });

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

// animation and render

const renderer = new Three.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
