import * as Three from "three";
import loadingManager from "./loading-manager";

const uri = {
  doorColor: "/textures/door/color.jpg",
  doorAlpha: "/textures/door/alpha.jpg",
  doorAmbient: "/textures/door/ambientOcclusion.jpg",
  doorHeight: "/textures/door/height.jpg",
  doorMetalness: "/textures/door/metalness.jpg",
  doorNormal: "/textures/door/normal.jpg",
  doorRoughness: "/textures/door/roughness.jpg",
  matcap: "/textures/matcaps/1.png",
  gradient: "/textures/gradients/5.jpg",
};

const textureLoader = new Three.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load(uri.doorColor);
const doorAlphaTexture = textureLoader.load(uri.doorAlpha);
const doorAmbientTexture = textureLoader.load(uri.doorAmbient);
const doorHeightTexture = textureLoader.load(uri.doorHeight);
const doorMetalnessTexture = textureLoader.load(uri.doorMetalness);
const doorNormalTexture = textureLoader.load(uri.doorNormal);
const doorRoughnessTexture = textureLoader.load(uri.doorRoughness);

const matcapTexture = textureLoader.load(uri.matcap);
const gradientTexture = textureLoader.load(uri.gradient);

doorColorTexture.colorSpace = Three.SRGBColorSpace;
// doorAlphaTexture.colorSpace = Three.SRGBColorSpace;
// doorAmbientTexture.colorSpace = Three.SRGBColorSpace;
// doorHeightTexture.colorSpace = Three.SRGBColorSpace;
// doorMetalnesTexture.colorSpace = Three.SRGBColorSpace;
// doorNormalTexture.colorSpace = Three.SRGBColorSpace;
// doorRoughnessTexture.colorSpace = Three.SRGBColorSpace;

matcapTexture.colorSpace = Three.SRGBColorSpace;
// gradientTexture.colorSpace = Three.SRGBColorSpace;

export {
  doorColorTexture,
  doorAlphaTexture,
  doorAmbientTexture,
  doorHeightTexture,
  doorMetalnessTexture,
  doorNormalTexture,
  doorRoughnessTexture,
  gradientTexture,
  matcapTexture,
};
