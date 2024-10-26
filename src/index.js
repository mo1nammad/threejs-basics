import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Cursor from "./modules/Cursor";
// import gsap from "gsap";

// dom element
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new Three.Scene();

const sizes = {
  width: 800,
  height: 600,
};

// camera
const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);

// const aspectRatio = sizes.width / sizes.height;

// const camera = new Three.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);

// cursor
const cursor = new Cursor(sizes.width, sizes.height);

canvas.addEventListener("mousemove", (ev) => {
  cursor.setAxis(ev.clientX, ev.clientY);
});

// mesh
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: "#78f1ff" });

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

const animate = () => {
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
