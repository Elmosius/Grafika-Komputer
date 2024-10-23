import { ImageLib } from "./lib.js";
import { TransformasiMatriks } from "./transformasi.js";

// Mencoba
const lib = new ImageLib("my_canvas");

const tm = TransformasiMatriks;
let points = [
  {
    x: 100,
    y: 100,
  },
  {
    x: 150,
    y: 150,
  },
  {
    x: 50,
    y: 150,
  },
];

lib.polygon(points, 0);

// let m = tm.rotasiFixPoint(150, 150, Math.PI / 7);
// let points2 = tm.transformasiArray(points, m);

// let m = tm.createTranslasi(10, 0);
// let points2 = tm.transformasiArray(points, m);

// lib.polygon(points2, 0);

// points2 = tm.transformasiArray(points, m);

// lib.polygon(points2, 0);

// // m = tm.mutiplyMatrix(m, m);
// // let points3 = tm.transformasiArray(points, m);

// // lib.polygon(points3, 0);

// lib.draw();

const animasi = () => {
  lib.clear();
  let m = tm.createTranslasi(1, 0);
  points = tm.transformasiArray(points, m);
  lib.polygon(points, 0);
  lib.draw();
  requestAnimationFrame(animasi);
};

animasi();
