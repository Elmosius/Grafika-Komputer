import { ImageLib } from "./lib.js";

const lib = new ImageLib("my_canvas");

let point_array1 = [
  { x: 100, y: 100 },
  { x: 150, y: 100 },
  { x: 150, y: 150 },
  { x: 100, y: 200 },
];

lib.polygon(point_array1, { r: 255 });
lib.floodFillNaive(110, 110, { r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 });
lib.draw();

let point_array2 = [
  { x: 200, y: 100 },
  { x: 350, y: 100 },
  { x: 350, y: 150 },
  { x: 200, y: 200 },
];

lib.polygon(point_array2, { g: 255 });
lib.floodFillStack(210, 110, { r: 0, g: 0, b: 0 }, { r: 0, g: 255, b: 0 });

lib.draw();

// Buat logo
let lib2 = new ImageLib("my_canvas2");
lib2.setengah_lingkaran_polar(200, 250, 50, { r: 241, g: 191, b: 66 }, "atas");
lib2.setengah_lingkaran_polar(250, 200, 50, { r: 215, g: 81, b: 64 }, "kanan");
lib2.setengah_lingkaran_polar(250, 300, 50, { r: 88, g: 166, b: 92 }, "kiri");
lib2.setengah_lingkaran_polar(300, 250, 50, { r: 83, g: 131, b: 236 }, "bawah");

lib2.floodFillStack(220, 220, { r: 0, g: 0, b: 0 }, { r: 241, g: 191, b: 66 });
lib2.floodFillStack(270, 220, { r: 0, g: 0, b: 0 }, { r: 215, g: 81, b: 64 });
lib2.floodFillStack(220, 270, { r: 0, g: 0, b: 0 }, { r: 88, g: 166, b: 92 });
lib2.floodFillStack(270, 270, { r: 0, g: 0, b: 0 }, { r: 83, g: 131, b: 236 });

lib2.draw();
lib2.tulisan(30, "Arial", "gray", "Google Photos", { x: 150, y: 400 });
