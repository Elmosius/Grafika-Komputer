import * as THREE from "three";

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

// Membuat kotak 3d ukuran 1x1x1
let box = new THREE.BoxGeometry(1, 1, 1);

// membuat warna {R G B}
let boxMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let boxMesh = new THREE.Mesh(box, boxMat);

scene.add(boxMesh);
cam.position.z = 5;
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
});

function draw() {
  requestAnimationFrame(draw);
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;
  renderer.render(scene, cam);
}

draw();

// Menggambar di rederer dunia 3d "scene" dengan menggunakan camera Cam
renderer.render(scene, cam);
