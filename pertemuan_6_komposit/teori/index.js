import { ImageLib } from "./lib.js";

// Mencoba
const lib = new ImageLib("my_canvas");

const points = [
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

let m = lib.rotasiFixPoint(150, 150, Math.PI / 7);
let points2 = lib.transformasiArray(points, m);

lib.polygon(points2, 0);

m = lib.mutiplyMatrix(m, m);
let points3 = lib.transformasiArray(points, m);

lib.polygon(points3, 0);

lib.draw();
