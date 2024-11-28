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

// box 2
let light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(1, 1, 1);
scene.add(light1);

let light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(3, 1, 1);
scene.add(light2);

const mat2 = new THREE.MeshLambertMaterial({ map: brick_texture, alphaMap: dice_texture, transparent: true, side: THREE.DoubleSide });
let mesh2 = new THREE.Mesh(geo, mat2);
mesh2.position.set(2, 0, 0);
scene.add(mesh2);

// box 3
const mat3 = new THREE.MeshPhongMaterial({ map: brick_texture, shininess: 100, bumpMap: stone_texture, bumpScale: 1 });
let mesh3 = new THREE.Mesh(geo, mat3);
mesh3.position.set(4, 0, 0);
scene.add(mesh3);


// box 4


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
