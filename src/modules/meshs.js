import * as Three from "three";
import GUI from "lil-gui";

const gui = new GUI();

// textures
import {
  doorAlphaTexture,
  doorAmbientTexture,
  doorColorTexture,
  doorHeightTexture,
  doorMetalnessTexture,
  doorNormalTexture,
  doorRoughnessTexture,
  gradientTexture,
} from "./textures";

// meshs geometry & materials & texture

// const material = new Three.MeshBasicMaterial({
//   map: doorColorTexture,
// });
// const matcapMaterial = new Three.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });

// const material = new Three.MeshLambertMaterial();

// const material = new Three.MeshPhongMaterial({
//   shininess: 100,
//   specular: new Three.Color(0x1188ff),
// });

// ---- physical materials

// const material = new Three.MeshToonMaterial();
// gradientTexture.minFilter = Three.NearestFilter;
// gradientTexture.magFilter = Three.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// const material = new Three.MeshStandardMaterial();
// material.side = Three.DoubleSide;

// material.map = doorColorTexture;
// material.aoMap = doorAmbientTexture;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.roughnessMap = doorRoughnessTexture;
// material.metalnessMap = doorMetalnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

const material = new Three.MeshPhysicalMaterial();
material.side = Three.DoubleSide;
material.roughness = 0;
material.metalness = 0;

gui.add(material, "roughness", 0, 1);
gui.add(material, "metalness", 0, 1);

material.map = doorColorTexture;
material.aoMap = doorAmbientTexture;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.roughnessMap = doorRoughnessTexture;
material.metalnessMap = doorMetalnessTexture;
material.normalMap = doorNormalTexture;
material.transparent = true;
material.alphaMap = doorAlphaTexture;

// clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;
//
// gui.add(material, "clearcoat").min(0).max(1).step(0.05);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.05);

// sheen
// material.sheen = 0.5;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen").min(0).max(1).step(0.05);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.05);
// gui.addColor(material, "sheenColor");

// iridecence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.05);
// gui.add(material, "iridescenceIOR").min(1).max(3).step(0.05);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

// transmition

material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.001);
gui.add(material, "ior").min(1).max(10).step(0.001);
gui.add(material, "thickness").min(0).max(1).step(0.001);

const sphereMesh = new Three.Mesh(
  new Three.SphereGeometry(0.6, 64, 62),
  material
);
sphereMesh.position.x = 2;

const planeMesh = new Three.Mesh(
  new Three.PlaneGeometry(1, 1, 100, 100),
  material
);

const torusMesh = new Three.Mesh(new Three.TorusGeometry(0.4, 0.15), material);
torusMesh.position.x = -2;

const ambientLight = new Three.AmbientLight(0xffffff, 0.2);
const pointLight = new Three.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

export { sphereMesh, planeMesh, torusMesh, ambientLight, pointLight };
