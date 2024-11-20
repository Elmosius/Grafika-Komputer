import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
/*
    Scene : 
        > Lingkungan 3d yang akan menjadi aplikasi kita
        > 3D world
    Camera:
        > Camera yang kita gunakan untuk melihat ke dalam 3d world tersebut
    Renderer:
        > Menampilkan hasil     dari camera ke dalam layar
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
// prettier-ignore
const vertices = new Float32Array([
    // BAGIAN DEPAN
    // Bagian vertikal kiri
    -1.0,  1.0,  0.2,   // 0
    -1.0, -1.0,  0.2,   // 1
    -0.8,  1.0,  0.2,   // 2
    -0.8, -1.0,  0.2,   // 3
    // Bagian horizontal atas
    -0.8,  1.0,  0.2,   // 4
    -0.8,  0.8,  0.2,   // 5
     0.5,  1.0,  0.2,   // 6
     0.5,  0.8,  0.2,   // 7
    // Bagian horizontal tengah
    -0.8,  0.1,  0.2,   // 8
    -0.8, -0.1,  0.2,   // 9
     0.3,  0.1,  0.2,   // 10
     0.3, -0.1,  0.2,   // 11
    // Bagian horizontal bawah
    -0.8, -0.8,  0.2,   // 12
    -0.8, -1.0,  0.2,   // 13
     0.5, -0.8,  0.2,   // 14
     0.5, -1.0,  0.2,   // 15

    // BAGIAN BELAKANG
    // Bagian vertikal kiri
    -1.0,  1.0,  -0.2,  // 16
    -1.0, -1.0,  -0.2,  // 17
    -0.8,  1.0,  -0.2,  // 18
    -0.8, -1.0,  -0.2,  // 19
    // Bagian horizontal atas
    -0.8,  1.0,  -0.2,  // 20
    -0.8,  0.8,  -0.2,  // 21
     0.5,  1.0,  -0.2,  // 22
     0.5,  0.8,  -0.2,  // 23
    // Bagian horizontal tengah
    -0.8,  0.1,  -0.2,  // 24
    -0.8, -0.1,  -0.2,  // 25
     0.3,  0.1,  -0.2,  // 26
     0.3, -0.1,  -0.2,  // 27
    // Bagian horizontal bawah
    -0.8, -0.8,  -0.2,  // 28
    -0.8, -1.0,  -0.2,  // 29
     0.5, -0.8,  -0.2,  // 30
     0.5, -1.0,  -0.2   // 31

]);
// prettier-ignore
let colors = new Float32Array([
    // Warna bagian vertikal kiri (Depan)
    0.5, 1, 0.5,  // Hijau Muda
    0.45, 0.9, 0.45,  // Hijau Sedang
    0.4, 0.8, 0.4,  // Hijau Gelap
    0.35, 0.7, 0.35,  // Hijau Lebih Gelap
    // Bagian horizontal atas (Depan)
    0.5, 1, 0.5,  // Hijau Muda
    0.45, 0.9, 0.45,  // Hijau Sedang
    0.4, 0.8, 0.4,  // Hijau Gelap
    0.35, 0.7, 0.35,  // Hijau Lebih Gelap
    // Bagian horizontal tengah (Depan)
    0.4, 0.8, 0.4,  // Hijau Gelap
    0.35, 0.7, 0.35,  // Hijau Lebih Gelap
    0.3, 0.6, 0.3,  // Hijau Lebih Gelap
    0.25, 0.5, 0.25,  // Hijau Sangat Gelap
    // Bagian horizontal bawah (Depan)
    0.5, 1, 0.5,  // Hijau Muda
    0.45, 0.9, 0.45,  // Hijau Sedang
    0.4, 0.8, 0.4,  // Hijau Gelap
    0.35, 0.7, 0.35,  // Hijau Lebih Gelap

    // Warna bagian vertikal kiri (Belakang)
    0.2, 0.4, 0.2,  // Hijau Tua
    0.15, 0.35, 0.15,  // Hijau Lebih Tua
    0.1, 0.3, 0.1,  // Hijau Sangat Tua
    0.05, 0.25, 0.05,  // Hijau Sangat Tua
    // Bagian horizontal atas (Belakang)
    0.2, 0.4, 0.2,  // Hijau Tua
    0.15, 0.35, 0.15,  // Hijau Lebih Tua
    0.1, 0.3, 0.1,  // Hijau Sangat Tua
    0.05, 0.25, 0.05,  // Hijau Sangat Tua
    // Bagian horizontal tengah (Belakang)
    0.2, 0.4, 0.2,  // Hijau Tua
    0.15, 0.35, 0.15,  // Hijau Lebih Tua
    0.1, 0.3, 0.1,  // Hijau Sangat Tua
    0.05, 0.25, 0.05,  // Hijau Sangat Tua
    // Bagian horizontal bawah (Belakang)
    0.2, 0.4, 0.2,  // Hijau Tua
    0.15, 0.35, 0.15,  // Hijau Lebih Tua
    0.1, 0.3, 0.1,  // Hijau Sangat Tua
    0.05, 0.25, 0.05   // Hijau Sangat Tua
]);

/* 4 bUFFER Parameter 
    > posisi
    > warna
    > normal : arah garis normal (arah garis tegak lurus) pencahayaan
    > uv : texture
*/

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// prettier-ignore
geo.setIndex([
    
    //* KUBUS KIRI
    // SISI DEPAN
    2,0,1,
    1,3,2,
    // SISI BELAKANG
    18,16,17,
    17,19,18,
    // SISI KANAN
    18,2,3,
    3,19,18,
    // SISI KIRI
    0,16,17,
    17,1,0,
    // SISI ATAS
    2,18,16,
    16,0,2,
    // SISI BAWAH
    17,19,3,
    3,1,17,


    //* KUBUS ATAS
    // SISI DEPAN
    6,4,5,
    5,7,6,
    // SISI BELAKANG
    22,20,21,
    21,23,22,
    // SISI KANAN
    23,22,6,
    6,7,23,
    // SISI KIRI
    21,5,4,
    4,20,21,
    // SISI ATAS
    22,20,4,
    4,6,22,
    // SISI BAWAH
    23,7,5,
    5,21,23,

    //* KUBUS TENGAH
    // SISI DEPAN
    10,8,9,
    9,11,10,
    // SISI BELAKANG
    26,24,25,
    25,27,26,
    // SISI KANAN
    26,10,11,
    11,27,26,
    // SISI KIRI
    8,24,25,
    25,9,8,
    // SISI ATAS
    26,24,8,
    8,10,26,
    // SISI BAWAH
    11,9,25,
    25,27,11,

    //* KUBUS BAWAH
    // SISI DEPAN
    14,12,13,
    13,15,14,
    // SISI BELAKANG
    30,28,29,
    29,31,30,
    // SISI KANAN
    30,14,15,
    15,31,30,
    // SISI KIRI
    12,28,29,
    29,13,12,
    // SISI ATAS
    30,28,12,
    12,14,30,
    // SISI BAWAH
    31,15,13,
    13,29,31,
]);

const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
let mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

/* ============================================= */
cam.position.z = 5;
const controls = new OrbitControls(cam, renderer.domElement);
document.body.appendChild(renderer.domElement);
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
