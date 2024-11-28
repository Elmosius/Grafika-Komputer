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

// prettier-ignore
const vertices = new Float32Array([
  // depan segitiga luar
  2.0,4.0,0.0,
  1.5,3.0,0.0,
  2.5,3.0,0.0,

  1.5,3.0,0.0,
  0.3,3.0,0.0,
  1.0,2.0,0.0,

  1.0,2.0,0.0,
  0.8,1.0,0.0,
  2.0,1.5,0.0,

  3.0,2.0,0.0,
  2.0,1.5,0.0,
  3.2, 1.0, 0.0,

  3.7,3.0,0.0,
  2.5,3.0,0.0,
  3.0,2.0,0.0,

  // segi 5
  1.5,3.0,0.0,
  1.0,2.0,0.0,
  2.0,1.5,0.0,

  2.5,3.0,0.0,
  1.5,3.0,0.0,
  2.0,1.5,0.0,

  2.5,3.0,0.0,
  2.0,1.5,0.0,
  3.0,2.0,0.0,

  // belakang
  // depan segitiga luar
  2.0,4.0,-1.0,
  1.5,3.0,-1.0,
  2.5,3.0,-1.0,

  1.5,3.0,-1.0,
  0.3,3.0,-1.0,
  1.0,2.0,-1.0,

  1.0,2.0,-1.0,
  0.8,1.0,-1.0,
  2.0,1.5,-1.0,

  3.0,2.0,-1.0,
  2.0,1.5,-1.0,
  3.2, 1.0, -1.0,

  3.7,3.0,-1.0,
  2.5,3.0,-1.0,
  3.0,2.0,-1.0,

  // segi 5
  1.5,3.0,-1.0,
  1.0,2.0,-1.0,
  2.0,1.5,-1.0,

  2.5,3.0,-1.0,
  1.5,3.0,-1.0,
  2.0,1.5,-1.0,

  2.5,3.0,-1.0,
  2.0,1.5,-1.0,
  3.0,2.0,-1.0,

]);

// prettier-ignore
// const uvs = new Float32Array([

// ]);

// prettier-ignore
geo.setIndex([
// bintang depan
0, 1, 2,
3, 4, 5,
6, 7, 8,
9, 10, 11,
12, 13, 14,

15, 16, 17,
18, 19, 20,
21, 22, 23,

// bintang belakang
24, 25, 26,
27, 28, 29,
30, 31, 32,
33, 34, 35,
36, 37, 38,

39, 40, 41,
42, 43, 44,
45, 46, 47,

// KIRI
// atas samping
0, 24, 25,
0, 25,1,

// samping atas
1,27,28,
1,28,4,

// samping bawah
4,29,5,
4,28,29,

// bawah samping
6,31,7,
6,30,31,

// bawah 
7,32,8,
7,31,32,

// KANAN
// atas samping
24, 2, 26,
24, 0,2,

// samping atas
26,12,36,
26,13,12,

// samping bawah
36,14,38,
36,12,14,

// bawah samping
33,11,35,
33,9,11,

// bawah 
34,11,35,
34,10,11

]);

geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
const mat = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
let mesh = new THREE.Mesh(geo, mat);
mesh.position.set(-2, -2, 0);
scene.add(mesh);

let light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(-2, -2, -2);
scene.add(light1);

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
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, cam);
}

draw();
// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
