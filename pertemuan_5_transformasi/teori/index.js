import { ImageLib } from "./lib.js";

// Mencoba

const lib = new ImageLib("my_canvas");

let points = [
  {
    x: 100,
    y: 100,
  },
  { x: 100, y: 200 },
  { x: 200, y: 200 },
];
lib.polygon(points, { r: 100 });

let titik = lib.skalaArray(points, { x: 100, y: 200 }, { x: 2, y: 2 });

lib.polygon(titik, { r: 100 });

lib.draw();


// Soal Teori

