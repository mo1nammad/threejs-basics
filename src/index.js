import * as Three from "three";
import gsap from "gsap";
// scene
const scene = new Three.Scene();

const sizes = {
   width: 800,
   height: 600,
};

// camera
const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// mesh
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: "#78f1ff" });

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

// render

const renderer = new Three.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// animation fps control with delta time

// let time = Date.now();

// const animate = () => {
//    const currentTime = Date.now();
//    const delta = currentTime - time;
//    time = currentTime;

//    mesh.rotation.y += 0.001 * delta;

//    // render
//    renderer.render(scene, camera);
//    window.requestAnimationFrame(animate);
// };
// animate();

// animation fps control with Threejs clock
// const clock = new Three.Clock();
// const animate = () => {
//    const elapsedTime = clock.getElapsedTime();

//    // mesh.rotation.y = elapsedTime * Math.PI * 2;
//    camera.position.y = Math.sin(elapsedTime);
//    camera.position.x = Math.cos(elapsedTime);
//    camera.lookAt(mesh.position);
//    // render
//    renderer.render(scene, camera);
//    window.requestAnimationFrame(animate);
// };
// animate();

// animation with gsap
// gsap.to(mesh.position, { x: 2, delay: 1, duration: 2 });
// gsap.to(mesh.position, { x: -2, delay: 2, duration: 2 });

// const animate = () => {
//    // render
//    renderer.render(scene, camera);
//    window.requestAnimationFrame(animate);
// };
// animate();

// animation with threejs api

const animate = () => {
   mesh.rotation.y += 0.01;
   renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
