import * as THREE from "three";
import PlaneMesh from "./plane_mesh.js";
import KeyboardHelper from "./keyboard.js";
import { FirstPersonControls } from "/node_modules/three/examples/jsm/controls/FirstPersonControls.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from "/node_modules/three/examples/jsm/controls/TrackballControls.js";

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
cam.position.z = 5;
cam.position.y = 2;

// const controls = new OrbitControls(cam, renderer.domElement);
// const controls = new FirstPersonControls(cam, renderer.domElement);
const controls = new TrackballControls(cam, renderer.domElement);
const clock = new THREE.Clock();
controls.lookSpeed = 0.1;
/* ============================================= */

renderer.setClearColor(0xffffff);
const grid = new THREE.GridHelper(10, 10, 0xff0000, 0xffffff);
scene.add(grid);

const brick_texture = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_Color.jpg");
const brick_normal = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_NormalGL.jpg");
const brick_ao = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_AmbientOcclusion.jpg");
const brick_bump = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_Roughness.jpg");

const box_geo = new THREE.BoxGeometry(1, 1, 1);
const geo_mat = new THREE.MeshPhongMaterial({
  map: brick_texture,
  normalMap: brick_normal,
  bumpMap: brick_bump,
  aoMap: brick_ao,
});
const mesh = new THREE.Mesh(box_geo, geo_mat);
mesh.position.set(0, 0.5, 0);
mesh.castShadow = true;
mesh.name = "cube1";
scene.add(mesh);

const plane = new PlaneMesh(scene);

// kontrol pakai keyboard
const my_keyboard = new KeyboardHelper(scene);
function process_keyboard() {
  const speed = 0.05;
  if (my_keyboard.keys["a"]) {
    mesh.rotation.y -= speed;
  }
  if (my_keyboard.keys["d"]) {
    mesh.rotation.y += speed;
  }
  if (my_keyboard.keys["w"]) {
    mesh.rotation.x += speed;
  }
  if (my_keyboard.keys["s"]) {
    mesh.rotation.x -= speed;
  }
}

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = {};
let selected;
const arrow = new THREE.ArrowHelper(raycaster.ray)

addEventListener("mousedown", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, cam);
  let items = raycaster.intersectObjects(scene.children);
  items.forEach((item) => {
    if (item.object.name != "") {
      selected = item.object;
    }
  });
});

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const sLight = new THREE.SpotLight(0xffffff, 15, 15, Math.PI / 8);
sLight.position.set(0, 3, 0);
sLight.target = mesh;
sLight.castShadow = true;
scene.add(sLight);

const sLightHelper = new THREE.SpotLightHelper(sLight, 0xff0000);
scene.add(sLightHelper);

const dLight = new THREE.DirectionalLight(0xffffff, 0.01);
scene.add(dLight);
/* ============================================= */

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  // coba rascasting
  if (selected) {
    selected.rotation.x += 0.01;
    selected.rotation.y += 0.01;
  }

  // controls.update();
  controls.update(clock.getDelta());
  sLightHelper.update();
  process_keyboard();
  requestAnimationFrame(draw);
  //   mesh.rotation.x += 0.01;
  //   mesh.rotation.y += 0.01;
  sLight.position.set(cam.position.x + 2, cam.position.y - 1, cam.position.z);
  renderer.render(scene, cam);
}

draw();
renderer.render(scene, cam);
