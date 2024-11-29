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

const numbers_texture = [];
for (let i = 1; i < 21; i++) {
  numbers_texture.push(new THREE.TextureLoader().load(`../textures/${i}.jpg`));
}

// prettier-ignore
const vertices = new Float32Array([

  // atas
  // 1
  1,  1.618,  0,   
  -1,  1.618,  0,  
  0,  1, -1.618,   
  
  // atas kanan 
  // 2 
  1.618,  0, -1,   
  1,  1.618,  0,   
  0,  1, -1.618,

  // Atas belakaQng kanan
  // 3
  1.618,  0, -1,
  0, -1, -1.618,
  0,  1, -1.618,

  // atas kiri
  // 4
  -1,  1.618,  0,   
  -1.618,  0, -1,   
  0,  1, -1.618,  

  // atas belakang kiri
  // 5
  -1.618,  0, -1,
  0, -1, -1.618,
  0,  1, -1.618,

  // samping kiri
  // 6
  -1,  1.618,  0,  
  -1.618,  0,  1,  
  -1.618,  0, -1, 

  // Tengah samping kiri
  //  7
  -1.618,  0,  1,
  -1, -1.618,  0,
  -1.618,  0, -1,

  // tengah belakang kiri
  // 8
  -1.618,  0, -1,
  -1, -1.618,  0,
  0, -1, -1.618,

  // tengah belakang
  // 9
  0, -1, -1.618,
  -1, -1.618,  0,
  1, -1.618,  0,

  // tengah belakang kanan
  // 10
  1.618,  0, -1,
  1, -1.618,  0,
  0, -1, -1.618,

  // Tengah samping kanan
  // 11
  1.618,  0,  1,
  1, -1.618,  0,
  1.618,  0, -1,

   // samping kanan
  // 12
  1,  1.618,  0,
  1.618,  0,  1,
  1.618,  0, -1,

  // kanan
  // 13
  1,  1.618,  0,   
  0,  1,  1.618,   
  1.618,  0,  1,   

 // bawah kanan
  // 14
  0,  1,  1.618,
  1.618,  0,  1,
  0, -1,  1.618,

  // Bawah depan kanan
  // 15
  1.618,  0,  1,
  1, -1.618,  0,
  0, -1,  1.618,

  // tengah bawah 
  // 16
  -1, -1.618,  0,
  0, -1,  1.618,
  1, -1.618,  0,


  // Bawah depan kiri
  // 17
  -1.618,  0,  1,
  -1, -1.618,  0,
  0, -1,  1.618,

  // bawah kiri
  // 18
  0,  1,  1.618,   
  -1.618,  0,  1,  
  0, -1,  1.618,
  
  //  kiri
  // 19
-1,  1.618,  0,  
-1.618,  0,  1,  
0,  1,  1.618,  
  
// tengah
  // 20
  1,  1.618,  0,  
  -1,  1.618,  0, 
  0,  1,  1.618,   

  
]);

const mat_array = [];
numbers_texture.forEach((e, i) => {
  mat_array.push(new THREE.MeshBasicMaterial({ map: numbers_texture[i], side: THREE.DoubleSide, wireframe: true }));
});

console.info(mat_array[0]);

// prettier-ignore
const uvs = new Float32Array([
  
]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
let mesh = new THREE.Mesh(geo, mat_array[0]);
mesh.position.set(0, 0, -1);
scene.add(mesh);

/* ============================================= */
cam.position.z = 10;
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
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
