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

const geo = new THREE.BufferGeometry();
const vertices = new Float32Array([
  // x, y, z
  // 0
  -1.0, -1.0, 1.0,

  //1
  1.0, 1.0, 1.0,

  // 2
  -1.0, 1.0, 1.0,

  //3
  1.0, -1.0, 1.0,

  // 4
  -1.0, -1.0, -1.0,

  //5
  1.0, 1.0, -1.0,

  // 6
  -1.0, 1.0, -1.0,

  //7
  1.0, -1.0, -1.0,
]);

let colors = new Float32Array([
  // 0
  1.0, 0.0, 0.0,
  // 1
  1.0, 0.0, 0.0,
  // 2
  1.0, 0.0, 0.0,
  // 3
  1.0, 0.0, 0.0,
  // 4
  0.0, 1.0, 0.0,
  //5
  0.0, 1.0, 0.0,
  // 6
  0.0, 1.0, 0.0,
  // 7
  0.0, 1.0, 0.0,
]);

/* 4 bUFFER Parameter 
    > posisi
    > warna
    > normal : arah garis normal (arah garis tegak lurus) pencahayaan
    > uv : texture
*/

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
geo.setIndex([
  // SISI DEPAN
  // BAWAH
  0, 3, 1,
  //ATAS
  1, 2, 0,

  //SISI BELAKANG
  // ATAS
  4, 6, 5,
  // BAWAH
  5, 7, 4,

  //SISI KIRI
  // BAWAH
  4, 0, 2,
  // ATAS
  2, 6, 4,

  //SISI KANAN
  // ATAS
  5, 1, 3,
  // BAWAH
  3, 7, 5,

  //SISI ATAS
  // ATAS
  1, 5, 6,
  // BAWAH
  6, 2, 1,

  //SISI BAWAH
  // BAWAH
  0, 4, 7,
  // ATAS
  7, 3, 0,
]);

const mat = new THREE.MeshBasicMaterial({ vertexColors: true });
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
  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
