import * as Three from "three";

// scene

const scene = new Three.Scene();
const canvas = document.getElementsByClassName("webgl")[0];

// geometry and material

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0xff0000 });

// object

const mesh = new Three.Mesh(geometry, material);
// mesh.position.z = 0.5;
// mesh.position.y = -1;
// mesh.position.x = -2.5;

mesh.position.set(-1, -1, -4);

// scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 2);

// rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 2;
mesh.rotation.y = Math.PI * 0.3;

scene.add(mesh);

// axes helper

const axesHelper = new Three.AxesHelper(2);
scene.add(axesHelper);

// sizes
const sizes = {
   width: 800,
   height: 600,
};

// camera : perspective

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.x = 1;
camera.position.y = 1;

scene.add(camera);

// to look at any object
camera.lookAt(mesh.position);
// console.log(camera.position.distanceTo(mesh.position));

const renderer = new Three.WebGLRenderer({
   canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
