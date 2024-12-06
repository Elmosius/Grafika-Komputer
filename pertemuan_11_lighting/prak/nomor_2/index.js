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
cam.position.y = 5;
cam.position.x = 5;
cam.position.z = 8;

/* ============================================= */
// material
const stone_texture = new THREE.TextureLoader().load("../textures/stone/PavingStones143_2K-JPG_Color.jpg");
const stone_normal = new THREE.TextureLoader().load("../textures/stone/PavingStones143_2K-JPG_NormalGL.jpg");
const stone_rough = new THREE.TextureLoader().load("../textures/stone/PavingStones143_2K-JPG_Roughness.jpg");
const stone_ao = new THREE.TextureLoader().load("../textures/stone/PavingStones143_2K-JPG_AmbientOcclusion.jpg");

const geo = new THREE.BufferGeometry();

// prettier-ignore
const vertices = new Float32Array([
  // Depan
  1.0, 1.0, 1.0,   // 0
  -1.0, 1.0, 1.0,  // 1
  1.0, -1.0, 1.0,  // 2
  -1.0, -1.0, 1.0, // 3
  1.0, -1.0, 1.0,  // 2
  -1.0, 1.0, 1.0,  // 1

  // Belakang
  1.0, 1.0, -1.0,  // 4
  -1.0, 1.0, -1.0, // 5
  1.0, -1.0, -1.0, // 6
  -1.0, -1.0, -1.0,// 7
  1.0, -1.0, -1.0, // 6
  -1.0, 1.0, -1.0, // 5

  // Kiri
  -1.0, 1.0, 1.0,  // 1
  -1.0, 1.0, -1.0, // 5
  -1.0, -1.0, 1.0, // 3
  -1.0, -1.0, -1.0,// 7
  -1.0, -1.0, 1.0, // 3
  -1.0, 1.0, -1.0, // 5

  // Kanan
  1.0, 1.0, 1.0,   // 0
  1.0, 1.0, -1.0,  // 4
  1.0, -1.0, 1.0,  // 2
  1.0, -1.0, -1.0, // 6
  1.0, -1.0, 1.0,  // 2
  1.0, 1.0, -1.0,  // 4

  // Atas
  1.0, 1.0, 1.0,   // 0
  -1.0, 1.0, 1.0,  // 1
  1.0, 1.0, -1.0,  // 4
  -1.0, 1.0, -1.0, // 5
  1.0, 1.0, -1.0,  // 4
  -1.0, 1.0, 1.0,  // 1

  // Bawah
  1.0, -1.0, 1.0,  // 2
  -1.0, -1.0, 1.0, // 3
  1.0, -1.0, -1.0, // 6
  -1.0, -1.0, -1.0,// 7
  1.0, -1.0, -1.0, // 6
  -1.0, -1.0, 1.0, // 3
]);

const ukuran = 0.4;
// prettier-ignore
const uvs = new Float32Array([
  // Depan
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,

  // Belakang
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,

  // Kiri
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,

  // Kanan
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,

  // Atas
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,

  // Bawah
  1.0 * ukuran, 1.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 0.0 * ukuran,
  1.0 * ukuran, 0.0 * ukuran,
  0.0 * ukuran, 1.0 * ukuran,
]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.computeVertexNormals();
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
const mat = new THREE.MeshStandardMaterial({
  map: stone_texture,
  normalMap: stone_normal,
  roughnessMap: stone_rough,
  aoMap: stone_ao,
  side: THREE.DoubleSide,
});
let mesh = new THREE.Mesh(geo, mat);
mesh.castShadow = true;
mesh.position.set(0, 1, 0);
scene.add(mesh);

// lampu
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff0000, 10, 50);
pointLight.position.set(3, 4, 0);
pointLight.castShadow = true;
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.5));

const spotLight = new THREE.SpotLight(0xffffff, 10, 50, Math.PI / 8, 0.5, 1);
spotLight.position.set(-5, 10, 5);
spotLight.target = mesh;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(new THREE.SpotLightHelper(spotLight, 0.5));

const plane = new PlaneMesh(scene);

// GUI
const gui = new dat.GUI();

const lightFolder = gui.addFolder("Lights");
// Ambient Light Controls
const ambientFolder = lightFolder.addFolder("Ambient Light");
ambientFolder.addColor({ color: ambientLight.color.getHex() }, "color").onChange((color) => ambientLight.color.set(color));
ambientFolder.add(ambientLight, "intensity", 0, 2, 0.1);
ambientFolder.open();

// Point Light Controls
const pointFolder = lightFolder.addFolder("Point Light");
pointFolder.addColor({ color: pointLight.color.getHex() }, "color").onChange((color) => pointLight.color.set(color));
pointFolder.add(pointLight.position, "x", -10, 10);
pointFolder.add(pointLight.position, "y", 0, 20);
pointFolder.add(pointLight.position, "z", -10, 10);
pointFolder.add(pointLight, "intensity", 0, 2, 0.1);
pointFolder.open();

// Spotlight Controls
const spotFolder = lightFolder.addFolder("Spotlight");
spotFolder.addColor({ color: spotLight.color.getHex() }, "color").onChange((color) => spotLight.color.set(color));
spotFolder.add(spotLight.position, "x", -10, 10);
spotFolder.add(spotLight.position, "y", 0, 20);
spotFolder.add(spotLight.position, "z", -10, 10);
spotFolder.add(spotLight, "intensity", 0, 2, 0.1);
spotFolder.open();

// Mesh Controls
const meshFolder = gui.addFolder("Mesh Transformations");
meshFolder.add(mesh.position, "x", -5, 5);
meshFolder.add(mesh.position, "y", -5, 5);
meshFolder.add(mesh.position, "z", -5, 5);
meshFolder.add(mesh.rotation, "x", 0, Math.PI * 2);
meshFolder.add(mesh.rotation, "y", 0, Math.PI * 2);
meshFolder.add(mesh.rotation, "z", 0, Math.PI * 2);
meshFolder.open();

// Auto-Rotate Controls
let autoRotate = false;
const autoRotateFolder = gui.addFolder("Auto Rotate");
autoRotateFolder
  .add({ rotate: autoRotate }, "rotate")
  .name("Auto Rotate")
  .onChange((value) => {
    autoRotate = value;
  });
autoRotateFolder.open();
/* ============================================= */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  controls.update();
  requestAnimationFrame(draw);

  if (autoRotate) {
    mesh.rotation.y += 0.01;
  }

  renderer.render(scene, cam);
}
draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
