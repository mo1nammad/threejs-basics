import * as Three from "three";

// scene

const scene = new Three.Scene();
const canvas = document.getElementsByClassName("webgl")[0];

// geometry and material

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0xff0000 });

// object

const mesh = new Three.Mesh(geometry, material);
mesh.position.z = 0.5;
mesh.position.y = 1;
mesh.position.x = 1;

console.log(mesh.position.length());

scene.add(mesh);

// sizes
const sizes = {
   width: 800,
   height: 600,
};

// camera : perspective

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

console.log(camera.position.distanceTo(mesh.position));

const renderer = new Three.WebGLRenderer({
   canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
