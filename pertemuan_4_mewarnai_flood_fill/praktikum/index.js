import { ImageLib } from "./lib.js";

const lib = new ImageLib("my_canvas");
console.info(lib);

// Nomor 1
lib.bunga({ xc: 150, yc: 250 }, 100, 2, { r: 0, g: 0, b: 0 }, { b: 255 });

// lib.bunga({ xc: 800, yc: 800 }, 100, 4, { g: 255 });
// lib.bunga({ xc: 1200, yc: 800 }, 100, 6, { r: 255 });

lib.draw();

// debugging;
// lib.c_handler.addEventListener("click", (e) => {
//   console.info(e.offsetX);
//   console.info(e.offsetY);
// });
