import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";

/*
    Scene : 
        > Lingkungan 3d yang akan menjadi aplikasi kita
        > 3D world
    Camera:
        > Camera yang kita gunakan untuk melihat ke dalam 3d world tersebut
    Renderer:
        > Menampilkan hasil dari camera ke dalam layar
*/

let scene = new THREE.Scene();
scene.background = new THREE.Color("0x0a0a0a");
/* keterangan
    > FOV : Field of View
    > Aspect Ratio : Rasio antara lebar dan tinggi layar
    > Near : Jarak terdekat yang bisa dilihat oleh camera
    > Far : Jarak terjauh yang bisa dilihat oleh camera

*/
let cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
/* ============================================= */

let box = new THREE.BoxGeometry(1, 1, 1);
let boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
let cube = new THREE.Mesh(box, boxMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
scene.add(cube);

let plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
plane.receiveShadow = true;
let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaffaa, side: THREE.DoubleSide });

let planeMash = new THREE.Mesh(plane, planeMaterial);
planeMash.position.set(0, -1, 0);
planeMash.rotation.x = -Math.PI / 2;
scene.add(planeMash);

// Pencahayaan
// let ambient = new THREE.AmbientLight(0x404040);
// scene.add(ambient);

let pointLight = new THREE.PointLight(0xffffff, 10, 50);
pointLight.position.set(-2, 2, 2);
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0x00ff00));

// let hemi = new THREE.HemisphereLight(0x0000ff, 0x000000, 0.5);
// scene.add(hemi);

// let dir = new THREE.DirectionalLight(0x00ff00, 0.5);
// dir.position.set(2, 2, 0);
// dir.target.position.set(3, 2, 0);
// dir.target.updateMatrixWorld();
// scene.add(dir);
// scene.add(new THREE.DirectionalLightHelper(dir, 0.2, 0x00ff00));

let spot = new THREE.SpotLight(0x0000ff, 20, 3, Math.PI / 4);
spot.castShadow = true;
spot.position.set(2, 2, 0);
// spot.target.position.set(2, 3, 0);
spot.target.updateMatrixWorld();
scene.add(spot);
scene.add(new THREE.SpotLightHelper(spot));

/* ============================================= */
cam.position.z = 15;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(cam, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  controls.update();
  requestAnimationFrame(draw);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
