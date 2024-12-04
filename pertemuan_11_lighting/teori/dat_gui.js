import * as THREE from "three";
import * as dat from "dat.gui";

import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import PlaneMesh from "./plane_mesh.js";

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

let pLight = new THREE.PointLight(0xffffff, 2);
pLight.position.set(-1, 1, 2);
scene.add(pLight);
scene.add(new THREE.PointLightHelper(pLight, 0.1, 0xff0000));

// box 1
let cGeo = new THREE.BoxGeometry(1, 1, 1);
let cMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
let cMesh = new THREE.Mesh(cGeo, cMat);
cMesh.position.set(1, 0.5, 0);
scene.add(cMesh);

// box 2
let cGeo2 = new THREE.BoxGeometry(1, 1, 1);
let cMat2 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
let cMesh2 = new THREE.Mesh(cGeo2, cMat2);
cMesh2.matrixAutoUpdate = false;
cMesh2.position.set(-2, 0.5, 0);
scene.add(cMesh2);

// controll gui
let kendali = new Object();
kendali.x = 1;
kendali.y = 1;
kendali.z = 1;

const gui = new dat.GUI();
gui.add(kendali, "x", -4, 4, -0.1);
gui.add(kendali, "y", -4, 4);
gui.add(kendali, "z", -4, 4);

const plane = new PlaneMesh(scene);
// plane.position.y -= 0.5;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

let angle = Math.PI / 4;
function draw() {
  controls.update();
  cMesh.rotation.x += 0.01;
  angle += 0.01;
  //   cMesh.scale.x += 0.01;
  //   mesh.rotation.y += 0.01;
  let rMatrix = new THREE.Matrix4().makeRotationX(angle);
  let tMatrix = new THREE.Matrix4().makeTranslation(0, 1, 0);
  let result = new THREE.Matrix4().multiplyMatrices(rMatrix, tMatrix);
  cMesh2.matrix.fromArray(result.toArray());

  pLight.position.set(kendali.x, kendali.y, kendali.z);
  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
renderer.render(scene, cam);
