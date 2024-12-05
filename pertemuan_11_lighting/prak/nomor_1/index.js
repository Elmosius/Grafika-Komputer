import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import PlaneMesh from "../plane_mesh.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(cam, renderer.domElement);
const grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x00000);
scene.add(grid);

renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
cam.position.z = 5;
cam.position.y = 2;
/* ============================================= */

// material bolanya
const rock_texture = new THREE.TextureLoader().load("../textures/rock/Rock051_4K-JPG_Color.jpg");
const rock_normal = new THREE.TextureLoader().load("../textures/rock/Rock051_4K-JPG_NormalGL.jpg");
const rock_metal = new THREE.TextureLoader().load("../textures/rock/Rock051_4K-JPG_Metalness.jpg");
const rock_rough = new THREE.TextureLoader().load("../textures/rock/Rock051_4K-JPG_Roughness.jpg");
const rock_ao = new THREE.TextureLoader().load("../textures/rock/Rock051_4K-JPG_AmbientOcclusion.jpg");

// bola
let sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
let sphereMat = new THREE.MeshStandardMaterial({
  map: rock_texture,
  normalMap: rock_normal,
  roughness: rock_rough,
  metalness: rock_metal,
  aoMap: rock_ao,
  metalness: 1,
  roughness: 0.5,
  aoMapIntensity: 0.5,
});
let sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.set(0, 0.5, 0);
sphereMesh.castShadow = true;
scene.add(sphereMesh);

let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);
scene.add(new THREE.DirectionalLightHelper(directionalLight, 1));

let pointLight = new THREE.PointLight(0xffee99, 1, 10, 2);
pointLight.position.set(0, 1.5, -0.5);
pointLight.castShadow = true;
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.5));

const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI / 8, 0.5, 1);
spotLight.position.set(2, 3, 0);
spotLight.target.position.set(-1, -2, 0);
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(new THREE.SpotLightHelper(spotLight, 1));

// Plane
const plane = new PlaneMesh(scene);

// Kontrol GUI untuk masing-masing cahaya
const gui = new dat.GUI();

// Ambient Light
const ambientFolder = gui.addFolder("Ambient Light");
ambientFolder.add(ambientLight, "intensity", 0, 2).name("Intensity");
ambientFolder
  .addColor({ color: ambientLight.color.getHex() }, "color")
  .name("Color")
  .onChange((value) => {
    ambientLight.color.set(value);
  });
ambientFolder.open();

// Directional Light
const directionalFolder = gui.addFolder("Directional Light");
directionalFolder.add(directionalLight, "intensity", 0, 2).name("Intensity");
directionalFolder.add(directionalLight.position, "x", -10, 10).name("Position X");
directionalFolder.add(directionalLight.position, "y", -10, 10).name("Position Y");
directionalFolder.add(directionalLight.position, "z", -10, 10).name("Position Z");
directionalFolder
  .addColor({ color: directionalLight.color.getHex() }, "color")
  .name("Color")
  .onChange((value) => {
    directionalLight.color.set(value);
  });
directionalFolder.open();

// Point Light
const pointLightFolder = gui.addFolder("Point Light");
pointLightFolder.add(pointLight, "intensity", 0, 2).name("Intensity");
pointLightFolder.add(pointLight.position, "x", -10, 10).name("Position X");
pointLightFolder.add(pointLight.position, "y", -10, 10).name("Position Y");
pointLightFolder.add(pointLight.position, "z", -10, 10).name("Position Z");
pointLightFolder
  .addColor({ color: pointLight.color.getHex() }, "color")
  .name("Color")
  .onChange((value) => {
    pointLight.color.set(value);
  });
pointLightFolder.open();

// Spot Light
const spotLightFolder = gui.addFolder("Spot Light");
spotLightFolder.add(spotLight, "intensity", 0, 2).name("Intensity");
spotLightFolder.add(spotLight, "angle", 0, Math.PI).name("Angle");
spotLightFolder.add(spotLight, "distance", 0, 20).name("Distance");
spotLightFolder.add(spotLight.position, "x", -10, 10).name("Position X");
spotLightFolder.add(spotLight.position, "y", -10, 10).name("Position Y");
spotLightFolder.add(spotLight.position, "z", -10, 10).name("Position Z");
spotLightFolder.add(spotLight.target.position, "x", -10, 10).name("Target Position X");
spotLightFolder.add(spotLight.target.position, "y", -10, 10).name("Target Position Y");
spotLightFolder.add(spotLight.target.position, "z", -10, 10).name("Target Position Z");
spotLightFolder
  .addColor({ color: spotLight.color.getHex() }, "color")
  .name("Color")
  .onChange((value) => {
    spotLight.color.set(value);
  });
spotLightFolder.open();

/* ============================================= */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

let angle = Math.PI / 4;
function draw() {
  controls.update();
  angle += 0.01;

  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
renderer.render(scene, cam);
