import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import PlaneMesh from "./plane_mesh.js";

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
cam.position.z = 5;
cam.position.y = 2;

renderer.setClearColor(0xffffff);
const grid = new THREE.GridHelper(10, 10, 0xff0000, 0xffffff);
scene.add(grid);

const controls = new OrbitControls(cam, renderer.domElement);
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
scene.add(mesh);
const plane = new PlaneMesh(scene);

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const sLight = new THREE.SpotLight(0xffffff, 15, 15, Math.PI / 8);
sLight.position.set(0, 3, 0);
sLight.target = mesh;
sLight.castShadow = true;
scene.add(sLight);

const sLightHelper = new THREE.SpotLightHelper(sLight, 0xff0000);
scene.add(sLightHelper);

// const dLight = new THREE.DirectionalLight(0x00ff00, 0.09);
// scene.add(dLight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  controls.update();
  requestAnimationFrame(draw);
  //   mesh.rotation.x += 0.01;
  //   mesh.rotation.y += 0.01;
  sLight.position.set(cam.position.x + 2, cam.position.y - 1, cam.position.z);
  renderer.render(scene, cam);
}

draw();
renderer.render(scene, cam);
