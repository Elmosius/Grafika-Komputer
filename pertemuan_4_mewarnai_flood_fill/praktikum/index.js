import { ImageLib } from "./lib.js";

const lib = new ImageLib("my_canvas");
console.info(lib);

// Nomor 1
lib.bunga({ xc: 150, yc: 150 }, 100, 2, { r: 102, g: 102, b: 255 });
lib.bunga({ xc: 375, yc: 150 }, 100, 4, { r: 204, g: 102, b: 255 });
lib.bunga({ xc: 600, yc: 150 }, 100, 6, { r: 255, g: 102, b: 204 });

lib.fillBunga1();
lib.fillBunga2();
lib.fillBunga3();

lib.draw();

// Nomor 2
const lib2 = new ImageLib("my_canvas2");
lib2.lingkaran_polar(200, 350, 60, lib2.getRandomColor());
lib2.polygon(
  [
    { x: 450, y: 350 },
    { x: 350, y: 150 },
    { x: 650, y: 450 },
  ],
  lib2.getRandomColor()
);

lib2.draw();
// debugging;
// lib.c_handler.addEventListener("click", (e) => {
//   console.info(e.offsetX);
//   console.info(e.offsetY);
// });
