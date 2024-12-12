import * as THREE from "three";
import * as dat from "dat.gui";
import { TrackballControls } from "/node_modules/three/examples/jsm/controls/TrackballControls.js";
import PlaneMesh from "../plane_mesh.js";
import KeyboardHelper from "../keyboard.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x00000);
scene.add(grid);

renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

cam.position.set(5, 5, 10);
const controls = new TrackballControls(cam, renderer.domElement);
const clock = new THREE.Clock();
/* ============================================= */

// material 1
const gravel1_texture = new THREE.TextureLoader().load("../textures/gravel_bewarna/Gravel022_1K-JPG_Color.jpg");
const gravel1_normal = new THREE.TextureLoader().load("../textures/gravel_bewarna/Gravel022_1K-JPG_NormalGL.jpg");
const gravel1_rough = new THREE.TextureLoader().load("../textures/gravel_bewarna/Gravel022_1K-JPG_Roughness.jpg");
const gravel1_ao = new THREE.TextureLoader().load("../textures/gravel_bewarna/Gravel022_1K-JPG_AmbientOcclusion.jpg");

// material 2
const gravel2_texture = new THREE.TextureLoader().load("../textures/gravel_cokelat/Gravel025_1K-JPG_Color.jpg");
const gravel2_normal = new THREE.TextureLoader().load("../textures/gravel_cokelat/Gravel025_1K-JPG_NormalGL.jpg");
const gravel2_rough = new THREE.TextureLoader().load("../textures/gravel_cokelat/Gravel025_1K-JPG_Roughness.jpg");
const gravel2_ao = new THREE.TextureLoader().load("../textures/gravel_cokelat/Gravel025_1K-JPG_AmbientOcclusion.jpg");

// material 3
const gravel3_texture = new THREE.TextureLoader().load("../textures/gravel_kuning/Gravel027_1K-JPG_Color.jpg");
const gravel3_normal = new THREE.TextureLoader().load("../textures/gravel_kuning/Gravel027_1K-JPG_NormalGL.jpg");
const gravel3_rough = new THREE.TextureLoader().load("../textures/gravel_kuning/Gravel027_1K-JPG_Roughness.jpg");
const gravel3_ao = new THREE.TextureLoader().load("../textures/gravel_kuning/Gravel027_1K-JPG_AmbientOcclusion.jpg");

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

// geo
const geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.computeVertexNormals();
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

// mat
const mat1 = new THREE.MeshStandardMaterial({
  map: gravel1_texture,
  normalMap: gravel1_normal,
  roughnessMap: gravel1_rough,
  aoMap: gravel1_ao,
  side: THREE.DoubleSide,
});
const mat2 = new THREE.MeshStandardMaterial({
  map: gravel2_texture,
  normalMap: gravel2_normal,
  roughnessMap: gravel2_rough,
  aoMap: gravel2_ao,
  side: THREE.DoubleSide,
});
const mat3 = new THREE.MeshStandardMaterial({
  map: gravel3_texture,
  normalMap: gravel3_normal,
  roughnessMap: gravel3_rough,
  aoMap: gravel3_ao,
  side: THREE.DoubleSide,
});

// mesh 1
let mesh1 = new THREE.Mesh(geo, mat1);
mesh1.castShadow = true;
mesh1.position.set(0, 1, 0);
mesh1.name = "cube1";
scene.add(mesh1);

// mesh2
let mesh2 = new THREE.Mesh(geo, mat2);
mesh2.castShadow = true;
mesh2.position.set(4, 1, 0);
mesh2.name = "cube2";
scene.add(mesh2);

// mesh3
let mesh3 = new THREE.Mesh(geo, mat3);
mesh3.castShadow = true;
mesh3.position.set(-4, 1, 0);
mesh3.name = "cube3";
scene.add(mesh3);

// lampu
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xfff000, 10, 50);
pointLight.position.set(3, 4, 0);
pointLight.castShadow = true;
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.5));

const spotLight = new THREE.SpotLight(0xffffff, 10, 50, Math.PI / 8, 0.5, 1);
spotLight.position.set(-5, 10, 5);
spotLight.castShadow = true;
scene.add(spotLight);

const plane = new PlaneMesh(scene);

// GUI
const gui = new dat.GUI();

const lightFolder = gui.addFolder("Lights");
lightFolder.name = "Lighting";
lightFolder.open();

const ambientFolder = lightFolder.addFolder("Ambient Light");
ambientFolder.addColor({ color: ambientLight.color.getHex() }, "color").onChange((color) => ambientLight.color.set(color));
ambientFolder.add(ambientLight, "intensity", 0, 10, 0.1);
ambientFolder.open();

const pointFolder = lightFolder.addFolder("Point Light");
pointFolder.addColor({ color: pointLight.color.getHex() }, "color").onChange((color) => pointLight.color.set(color));
pointFolder.add(pointLight.position, "x", -10, 10);
pointFolder.add(pointLight.position, "y", 0, 20);
pointFolder.add(pointLight.position, "z", -10, 10);
pointFolder.add(pointLight, "intensity", 0, 10, 0.1);
pointFolder.open();

const spotFolder = lightFolder.addFolder("Spotlight");
spotFolder.addColor({ color: spotLight.color.getHex() }, "color").onChange((color) => spotLight.color.set(color));
spotFolder.add(spotLight, "intensity", 0, 10, 0.1);
spotFolder.open();

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = {};
let selected;

// Posisi default kamera
let posisiCamera = { x: cam.position.x, y: cam.position.y, z: cam.position.z };

const focusOnMesh = (mesh) => {
  const offset = 8;

  cam.position.set(mesh.position.x + 2, mesh.position.y + offset, mesh.position.z + offset);
  controls.target.set(mesh.position.x, mesh.position.y, mesh.position.z);
  controls.update();

  spotLight.target = mesh;
};

const resetCamera = () => {
  cam.position.set(posisiCamera.x, posisiCamera.y, posisiCamera.z);

  controls.target.set(0, 0, 0);
  controls.update();

  spotLight.position.set(-5, 10, 5);
  spotLight.target = mesh1;
};

addEventListener("mousedown", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, cam);

  let items = raycaster.intersectObjects(scene.children);
  if (items.length > 0) {
    const item = items[0];
    if (item.object.name) {
      if (e.button === 0) {
        selected = item.object;
        focusOnMesh(item.object);
      }
    }
  }
});

addEventListener("contextmenu", (e) => {
  e.preventDefault();
  resetCamera();
});

// keyboard gerakin mesh
const my_keyboard = new KeyboardHelper(scene);
const process_keyboard = () => {
  const speed = 0.1;
  if (my_keyboard.keys["a"]) {
    selected.position.x -= speed;
  }
  if (my_keyboard.keys["d"]) {
    selected.position.x += speed;
  }
  if (my_keyboard.keys["w"]) {
    selected.position.z -= speed;
  }
  if (my_keyboard.keys["s"]) {
    selected.position.z += speed;
  }
};

/* ============================================= */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  if (selected) {
    selected.rotation.x += 0.01;
    selected.rotation.y += 0.01;
  }
  process_keyboard();
  controls.update(clock.getDelta());

  spotLight.position.set(cam.position.x + 2, cam.position.y - 1, cam.position.z);
  requestAnimationFrame(draw);

  renderer.render(scene, cam);
}
draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);

alert('gerakkan kubus dengan keyboard, klik kubus untuk fokus, klik kanan untuk reset kamera. Lalu untuk menggerakkan kubus, tekan "WASD (catatan: kubus yang di gerakkan adalah kubus yang di klik)"');
