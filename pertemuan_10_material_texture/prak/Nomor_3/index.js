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
const numbers_texture = [
  new THREE.TextureLoader().load("../textures/0.jpg"),
  new THREE.TextureLoader().load("../textures/1.jpg"),
  new THREE.TextureLoader().load("../textures/2.jpg"),
  new THREE.TextureLoader().load("../textures/3.jpg"),
  new THREE.TextureLoader().load("../textures/4.jpg"),
  new THREE.TextureLoader().load("../textures/5.jpg"),
  new THREE.TextureLoader().load("../textures/6.jpg"),
  new THREE.TextureLoader().load("../textures/7.jpg"),
  new THREE.TextureLoader().load("../textures/8.jpg"),
  new THREE.TextureLoader().load("../textures/9.jpg"),
  new THREE.TextureLoader().load("../textures/10.jpg"),
  new THREE.TextureLoader().load("../textures/11.jpg"),
  new THREE.TextureLoader().load("../textures/12.jpg"),
  new THREE.TextureLoader().load("../textures/13.jpg"),
  new THREE.TextureLoader().load("../textures/14.jpg"),
  new THREE.TextureLoader().load("../textures/15.jpg"),
  new THREE.TextureLoader().load("../textures/16.jpg"),
  new THREE.TextureLoader().load("../textures/17.jpg"),
  new THREE.TextureLoader().load("../textures/18.jpg"),
  new THREE.TextureLoader().load("../textures/19.jpg"),
  new THREE.TextureLoader().load("../textures/20.jpg"),
];

const vertices = new Float32Array([]);
const mat_array = [];
const uvs = new Float32Array([]);
geo.setIndex([]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
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
