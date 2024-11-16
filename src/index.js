import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// loader manager
import loadingManager from "./modules/loading-manager";
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

// texture

const textureLoader = new Three.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");

colorTexture.colorSpace = Three.SRGBColorSpace;
/*
 its kinda grid row and column in css
*/

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

// colorTexture.wrapS = Three.RepeatWrapping;
// colorTexture.wrapT = Three.RepeatWrapping;

// colorTexture.wrapS = Three.MirroredRepeatWrapping;
// colorTexture.wrapT = Three.MirroredRepeatWrapping;

// colorTexture.offset.y = 0.5;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.rotation = Math.PI / 4;

/*
  Three.NearestFilter gets us sharper results
  Three.LinearFilter is default that shows blury results based on the renderer size and texture size
*/

colorTexture.minFilter = Three.NearestFilter;

colorTexture.magFilter = Three.NearestFilter;

// mesh and geometries

const geometry = new Three.BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new Three.MeshBasicMaterial({ map: colorTexture });

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
