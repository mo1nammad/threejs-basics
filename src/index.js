import * as Three from "three";
import gsap from "gsap";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// css
import "./styles/styles.css";

// dom element
const canvas = document.querySelector("canvas.webgl");

// loaders
const fontLoader = new FontLoader();
const textureLoader = new Three.TextureLoader();

// scene
const scene = new Three.Scene();

// constants
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

// meshs
const texture = textureLoader.load(
  "/textures/B09273_7A573D_C7AF97_84644C-128px.png"
);
const matcapMaterial = new Three.MeshMatcapMaterial({ matcap: texture });

let textMeshPositions = new Three.Vector3();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const depth = 0.2;
  const bevelThickness = 0.03;
  const textGeometry = new TextGeometry("hello world", {
    font,
    size: 1,
    depth,
    curveSegments: 5,
    bevelThickness,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  const textMesh = new Three.Mesh(textGeometry, matcapMaterial);
  scene.add(textMesh);

  textGeometry.center();
  textMeshPositions = textMesh.position;
});

const torusArray = [];
const count = 100;

const getRandomPostion = () => {
  const getRandom = () => (Math.random() * 1.5 - 0.75) * 10;
  const positions = new Three.Vector3(getRandom(), getRandom(), getRandom());

  if (positions.x === textMeshPositions.x) positions.x += 5;
  else if (positions.y === textMeshPositions.y) positions.x += 5;
  else if (positions.z === textMeshPositions.z) positions.x += 5;

  return positions;
};

const geometry = new Three.TorusGeometry(0.3, 0.12, 12, 28);

for (let i = 0; i < count; i++) {
  const torusMesh = new Three.Mesh(geometry, matcapMaterial);

  torusMesh.position.x = getRandomPostion().x;
  torusMesh.position.y = getRandomPostion().y;
  torusMesh.position.z = getRandomPostion().z;

  torusMesh.rotation.x = Math.PI * Math.random();
  torusMesh.rotation.y = Math.PI * Math.random();

  const scale = Math.random();

  torusMesh.scale.set(scale, scale, scale);

  torusArray.push(torusMesh);
}

scene.add(...torusArray);

const axesHelper = new Three.AxesHelper(2);
scene.add(axesHelper);
// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// animation and render

const renderer = new Three.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  for (const torus of torusArray) {
    gsap.to(torus.rotation, {
      y: torus.rotation.y + Math.PI * 0.02,
      x: torus.rotation.x + Math.PI * 0.02,
    });
  }

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
