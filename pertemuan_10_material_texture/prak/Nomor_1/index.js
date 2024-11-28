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

  // Segilima 1
  // 1
  -2.0, 1.0, 0.0,
  -1.0,1.0,0.0,
  -1.5,2.0,-0.5,

  // 2
  -1.0,1.0,0.0,
  -0.5,2.0,0.0,
  -1.5,2.0,-0.5,

  // 3
  -0.5,2.0,0.0,
  -1.5,3.0,0.0,
  -1.5,2.0,-0.5,

  // 4
  -1.5,3.0,0.0,
  -2.5,2.0,0.0,
  -1.5,2.0,-0.5,

  // 5
  -2.5,2.0,0.0,
  -2.0, 1.0, 0.0,
  -1.5,2.0,-0.5,
  

  // 6

]);

const mat_array = [];
numbers_texture.forEach((e, i) => {
  mat_array.push(new THREE.MeshBasicMaterial({ map: numbers_texture[i], side: THREE.DoubleSide }));
});

console.info(mat_array[0]);

// prettier-ignore
const uvs = new Float32Array([
  0.0, 0.0,
  2.0, 0.0,
  1.0, 2.0,
 
]);

// prettier - ignore;
// geo.setIndex([0, 1, 2]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
let mesh = new THREE.Mesh(geo, mat_array[0]);
mesh.position.set(1, -1, 0);
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
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
