import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import KeyboardHelper from "../keyboard.js";

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
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;
/* ============================================= */

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


  // atas belakang kiri
  // 4
  -1.618,  0, -1,
  0, -1, -1.618,
  0,  1, -1.618,

  // atas kiri
  // 5
  -1,  1.618,  0,   
  -1.618,  0, -1,   
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
numbers_texture.forEach((e) => {
  mat_array.push(new THREE.MeshPhongMaterial({ map: e, side: THREE.DoubleSide }));
});

const meshes = [];
for (let i = 0; i < vertices.length / 9; i++) {
  const geo = new THREE.BufferGeometry();
  // harus dibagi bagi
  const segitiga = new Float32Array(vertices.slice(i * 9, i * 9 + 9));
  geo.setAttribute("position", new THREE.BufferAttribute(segitiga, 3));
  geo.computeVertexNormals();
  // prettier-ignore
  const uvs = new Float32Array([
    -0.5,-0.5, 
    1.5,0, 
    0.5,1.5, 
  ]);
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  const mesh = new THREE.Mesh(geo, mat_array[i]);
  mesh.castShadow = true;

  scene.add(mesh);
  meshes.push(mesh);
}

const my_keyboard = new KeyboardHelper(scene);
const process_keyboard = () => {
  const speed = 0.05;

  meshes.forEach((mesh) => {
    if (my_keyboard.keys["a"]) {
      mesh.rotation.x -= speed;
    }
    if (my_keyboard.keys["d"]) {
      mesh.rotation.x += speed;
    }
    if (my_keyboard.keys["w"]) {
      mesh.rotation.z -= speed;
    }
    if (my_keyboard.keys["s"]) {
      mesh.rotation.z += speed;
    }
  });
};

// lampu
const aLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(aLight);

const pLight = new THREE.PointLight(0xffffff, 10, 50);
pLight.position.set(0, 3, 0);
pLight.castShadow = true;
scene.add(new THREE.PointLightHelper(pLight, 0.5));

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
  process_keyboard();
  meshes.forEach((mesh) => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  });

  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
