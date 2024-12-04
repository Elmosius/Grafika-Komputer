import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";

// SCENE 1
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

// material bolanya
const metal_texture = new THREE.TextureLoader().load("../textures/metal/Metal049A_2K-JPG_Color.jpg");
const metal_normal = new THREE.TextureLoader().load("../textures/metal/Metal049A_2K-JPG_NormalGL.jpg");
const metalness = new THREE.TextureLoader().load("../textures/metal/Metal049A_2K-JPG_Metalness.jpg");
const metal_rough = new THREE.TextureLoader().load("../textures/metal/Metal049A_2K-JPG_Roughness.jpg");

// bola
let sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
let sphereMat = new THREE.MeshStandardMaterial({ map: metal_texture, normalMap: metal_normal, roughness: metal_rough, metalness: metalness });
let sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.set(0, 0.5, 0);
scene.add(sphereMesh);

// lampu
let ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

let pLight = new THREE.PointLight(0xffffff, 10);
pLight.position.set(0, 1.5, -0.5);
scene.add(pLight);
scene.add(new THREE.PointLightHelper(pLight, 0.3, 0xff0000));

const plane = new PlaneMesh(scene);

// controll gui
let kendali = new Object();
kendali.x = 1;
kendali.y = 1;
kendali.z = 1;

const gui = new dat.GUI();
gui.add(kendali, "x", -4, 4, -0.1);
gui.add(kendali, "y", -4, 4);
gui.add(kendali, "z", -4, 4);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

let angle = Math.PI / 4;
function draw() {
  controls.update();
  //   cMesh.rotation.x += 0.01;
  angle += 0.01;
  //   cMesh.scale.x += 0.01;
  //   mesh.rotation.y += 0.01;
  //   let rMatrix = new THREE.Matrix4().makeRotationX(angle);
  //   let tMatrix = new THREE.Matrix4().makeTranslation(0, 1, 0);
  //   let result = new THREE.Matrix4().multiplyMatrices(rMatrix, tMatrix);
  //   cMesh2.matrix.fromArray(result.toArray());

  ambient.position.set(kendali.x, kendali.y, kendali.z);
  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
renderer.render(scene, cam);
