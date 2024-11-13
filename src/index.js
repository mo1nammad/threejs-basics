import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// debug ui
import { GUI } from "lil-gui";
const gui = new GUI();
const customBox = gui.addFolder("my folder");
const debugObject = {};

// css
import "./styles/styles.css";
import gsap from "gsap";

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

window.addEventListener("keydown", (ev) => {
  if (ev.key === "h") gui.show(gui._hidden);
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

camera.position.z = 3;
scene.add(camera);

// mesh and geometries

debugObject.color = "#a778da";

const geometry = new Three.BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new Three.MeshBasicMaterial({ color: debugObject.color });

const mesh = new Three.Mesh(geometry, material);

scene.add(mesh);

customBox
  .add(mesh.rotation, "y")
  .min(Math.PI * -2)
  .max(Math.PI * 2)
  .step(Math.PI * 0.005)
  .name("rotateY");

customBox.add(mesh, "visible");
customBox.add(material, "wireframe");

customBox.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  // mesh.rotation.y = Math.PI / 4;
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + (Math.PI / 3) * 2,
    ease: "power2.inOut",
    duration: 1,
  });
};
customBox.add(debugObject, "spin");

debugObject.subdivision = 2;
customBox
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange((value) => {
    console.log(value);
    mesh.geometry.dispose();
    mesh.geometry = new Three.BoxGeometry(1, 1, 1, value, value, value);
  });

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
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
