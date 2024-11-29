import * as Three from "three";

const loadingManager = new Three.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("start");
// };
// loadingManager.onProgress = () => {
//   console.log("progress");
// };
// loadingManager.onLoad = () => {
//   console.log("load");
// };
loadingManager.onError = () => {
  console.log("error");
};
export default loadingManager;
