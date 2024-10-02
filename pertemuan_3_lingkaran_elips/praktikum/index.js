import { ImageLib } from "./lib.js";

const lib = new ImageLib("my_canvas");

console.info(lib);

// Nomor 1
lib.obatNyamuk(400, 300, 1, 0.04, { r: 255 });
lib.obatNyamuk(800, 300, 1, 0.06, { g: 255 });
lib.obatNyamuk(1250, 300, 1, 0.08, { b: 255 });

// Nomor 2
lib.bunga({ xc: 400, yc: 800 }, 100, 3, { b: 255 });
lib.bunga({ xc: 800, yc: 800 }, 100, 4, { g: 255 });
lib.bunga({ xc: 1200, yc: 800 }, 100, 6, { r: 255 });
lib.bunga({ xc: 1500, yc: 800 }, 100, 8, { r: 255, g: 102, b: 204 });

// Nomor 3
const lib2 = new ImageLib("my_canvas2");
lib2.c_handler.addEventListener("click", (e) => {
  lib2.obatInteraktif(e, false);
});
lib2.c_handler.addEventListener("dblclick", (e) => {
  lib2.obatInteraktif(e, true);
});

lib.draw();
