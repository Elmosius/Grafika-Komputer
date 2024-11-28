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
/* keterangan
    > FOV : Field of View
    > Aspect Ratio : Rasio antara lebar dan tinggi layar
    > Near : Jarak terdekat yang bisa dilihat oleh camera
    > Far : Jarak terjauh yang bisa dilihat oleh camera

*/
let cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
/* ============================================= */

// box 1
const geo = new THREE.BoxGeometry(1, 1, 1);
const brick_texture = new THREE.TextureLoader().load("./textures/brick.jpg");
const brick2_texture = new THREE.TextureLoader().load("./textures/brick2.jpg");
const dice_texture = new THREE.TextureLoader().load("./textures/dice.jpg");
const stone_texture = new THREE.TextureLoader().load("./textures/stone.jpg");

const mat = new THREE.MeshBasicMaterial({ map: brick_texture });
let mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);


/* ============================================= */
cam.position.z = 5;
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
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  mesh2.rotation.x += 0.01;
  mesh2.rotation.y += 0.01;

  mesh3.rotation.x += 0.01;
  mesh3.rotation.y += 0.01;
  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
