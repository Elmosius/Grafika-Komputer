import * as THREE from "three";

export default class PlaneMesh {
  constructor(scene) {
    // const brick_texture = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_Color.jpg");
    // const brick_normal = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_NormalGL.jpg");
    // const brick_ao = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_AmbientOcclusion.jpg");
    // const brick_bump = new THREE.TextureLoader().load("./textures/brick/Bricks097_1K-JPG_Roughness.jpg");

    // brick_texture.repeat.set(5, 5);
    // brick_texture.wrapS = THREE.RepeatWrapping;
    // brick_texture.wrapT = THREE.RepeatWrapping;
    // brick_texture.needsUpdate = true;

    const plane_geo = new THREE.PlaneGeometry(25, 25, 25, 25);
    const plane_mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      // map: brick_texture,
      // normalMap: brick_normal,
      // aoMap: brick_ao,
      // bumpMap: brick_bump,
    });

    this.plane_mesh = new THREE.Mesh(plane_geo, plane_mat);
    this.plane_mesh.rotation.x = -Math.PI / 2;
    this.plane_mesh.receiveShadow = true;
    scene.add(this.plane_mesh);
  }
}
