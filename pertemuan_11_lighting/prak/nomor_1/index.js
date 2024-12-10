import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import PlaneMesh from "../plane_mesh.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
cam.position.set(0, 2, 5);
const controls = new OrbitControls(cam, renderer.domElement);
/* ============================================= */

const createSphereMat = () => {
  const rock_texture = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_Color.jpg");
  const rock_normal = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_NormalGL.jpg");
  const rock_metal = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_Metalness.jpg");
  const rock_rough = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_Roughness.jpg");
  const rock_ao = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_AmbientOcclusion.jpg");
  const rock_dis = new THREE.TextureLoader().load("../textures/rock/Rock051_2K-JPG_Displacement.jpg");

  return new THREE.MeshStandardMaterial({
    map: rock_texture,
    normalMap: rock_normal,
    roughness: rock_rough,
    metalness: rock_metal,
    aoMap: rock_ao,
    displacementMap: rock_dis,
    displacementScale: 0.2,
    metalness: 1,
    roughness: 0.5,
    aoMapIntensity: 0.5,
  });
};

const createSphere = () => {
  const sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
  const sphereMat = createSphereMat();
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.position.set(0, 0.5, 0);
  sphereMesh.castShadow = true;
  return sphereMesh;
};

const createScene = (lightType) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x000000);
  scene.add(grid);

  const sphere = createSphere();
  scene.add(sphere);

  const plane = new PlaneMesh(scene);

  let light;
  if (lightType === "ambient") {
    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
  } else if (lightType === "directional") {
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.DirectionalLightHelper(light, 1));
  } else if (lightType === "point") {
    light = new THREE.PointLight(0xffee99, 1, 10, 2);
    light.position.set(0, 1.5, -0.5);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.PointLightHelper(light, 0.5));
  } else if (lightType === "spot") {
    light = new THREE.SpotLight(0xffffff, 1, 10, Math.PI / 8, 0.5, 1);
    light.position.set(2, 3, 0);
    light.target.position.set(-1, -2, 0);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.SpotLightHelper(light, 1));
  }

  return { scene, light };
};

const scenes = [createScene("ambient"), createScene("directional"), createScene("point"), createScene("spot")];

// Kontrol untuk mengganti scene
let currentSceneIndex = 0;
const gui = new dat.GUI();
gui
  .add({ scene: "Ambient" }, "scene", ["Ambient", "Directional", "Point", "Spot"])
  .name("Change Scene")
  .onChange((value) => {
    if (value === "Ambient") currentSceneIndex = 0;
    else if (value === "Directional") currentSceneIndex = 1;
    else if (value === "Point") currentSceneIndex = 2;
    else if (value === "Spot") currentSceneIndex = 3;
  });

// GUI untuk mengubah properti cahaya aktif
const addLightGUI = (light, name) => {
  console.info(light, name);
  const folder = gui.addFolder(name);
  folder.add(light, "intensity", 0, 2).name("Intensity");
  if (light.color) {
    folder
      .addColor({ color: light.color.getHex() }, "color")
      .name("Color")
      .onChange((value) => {
        light.color.set(value);
      });
  }
  if (light.position && name !== "Ambient Light") {
    folder.add(light.position, "x", -10, 10).name("Position X");
    folder.add(light.position, "y", -10, 10).name("Position Y");
    folder.add(light.position, "z", -10, 10).name("Position Z");
  }
};

scenes.forEach((sceneObj, index) => {
  const lightNames = ["Ambient Light", "Directional Light", "Point Light", "Spot Light"];
  addLightGUI(sceneObj.light, lightNames[index]);
});

/* ============================================= */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function animate() {
  controls.update();
  renderer.render(scenes[currentSceneIndex].scene, cam);
  requestAnimationFrame(animate);
}

animate();
