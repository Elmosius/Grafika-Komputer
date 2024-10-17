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
// let titik = lib.rotasiArray(points, { x: 100, y: 200 }, Math.PI / 18);

lib.polygon(titik, { r: 100 });

lib.draw();

// Soal Teori NO 3 & 4
// cara agar saya tetap dapat memliki kotak yang sama terus
// kita perlu memnentukan titik pusat yang pasti agar ga mengecil
// maka itu saya membuat fungsi titikPusat() di lib.js
const lib2 = new ImageLib("my_canvas2");

// let points2 = [
//   {
//     x: 200,
//     y: 200,
//   },
//   {
//     x: 300,
//     y: 200,
//   },
//   {
//     x: 300,
//     y: 300,
//   },
//   {
//     x: 200,
//     y: 300,
//   },
// ];

// NO 5 coba point polygonnya ga kotak
let points2 = [
  {
    x: 200,
    y: 200,
  },
  {
    x: 300,
    y: 200,
  },
  {
    x: 300,
    y: 300,
  },
];

lib2.gambarKotakInteraktif(points2);

window.addEventListener("keydown", (e) => {
  let dx = 0;
  let dy = 0;
  let angle = 0;

  // let x1 = 0;
  // let y1 = 0;

  switch (e.key.toLowerCase()) {
    case "w":
      dy = -10;
      break;
    case "a":
      dx = -10;
      break;
    case "s":
      dy = 10;
      break;
    case "d":
      dx = 10;
      break;
    case "q":
      angle = -Math.PI / 18;
      // x1 += 1;
      // y1 += 1;
      break;
    case "e":
      angle = Math.PI / 18;
      break;
  }

  dx !== 0 || dy !== 0 ? (points2 = lib2.translasiArray(points2, dx, dy)) : (points2 = lib2.rotasiArray(points2, lib2.titikPusat(points2), angle));
  // dx !== 0 || dy !== 0 ? (points2 = lib2.translasiArray(points2, dx, dy)) : (points2 = lib2.skalaArray(points2, lib2.titikPusat(points2), { x: x1, y: y1 }));

  lib2.gambarKotakInteraktif(points2);
});
