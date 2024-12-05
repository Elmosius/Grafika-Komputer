import * as THREE from "three";
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
// material
const marble_texture = new THREE.TextureLoader().load("../textures/marble/Marble012_2K-JPG_Color.jpg");
const marble_normal = new THREE.TextureLoader().load("../textures/marble/Marble012_2K-JPG_NormalGL.jpg");
const marble_rough = new THREE.TextureLoader().load("../textures/marble/Marble012_2K-JPG_Roughness.jpg");

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

// prettier-ignore
const uvs = new Float32Array([
  // Depan
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,

  // Belakang
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,

  // Kiri
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,

  // Kanan
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,

  // Atas
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,

  // Bawah
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
  1.0, 0.0,
  0.0, 1.0,
]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
const mat = new THREE.MeshStandardMaterial({ map: marble_texture, normalMap: marble_normal, roughnessMap: marble_rough, side: THREE.DoubleSide });
let mesh = new THREE.Mesh(geo, mat);
mesh.position.set(0, 1, 0);
scene.add(mesh);

// lampu
const spotLight = new THREE.SpotLight(0xffffff, 10, 10, Math.PI / 8, 0.5, 1);
spotLight.position.set(-1, 3, 0);
spotLight.target.position.set(-1, -2, 0);
spotLight.target = mesh;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(new THREE.SpotLightHelper(spotLight, 1));

const plane = new PlaneMesh(scene);
/* ============================================= */
cam.position.z = 15;
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  controls.update();
  requestAnimationFrame(draw);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
