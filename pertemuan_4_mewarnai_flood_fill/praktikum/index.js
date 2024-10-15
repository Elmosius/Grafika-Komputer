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

const buttons = document.querySelectorAll(".button");
let selectedColor = null;
const color = {
  merah: { r: 255, g: 0, b: 0 },
  hijau: { r: 0, g: 128, b: 0 },
  biru: { r: 0, g: 0, b: 255 },
  kuning: { r: 255, g: 255, b: 0 },
  ungu: { r: 128, g: 0, b: 128 },
  cyan: { r: 0, g: 255, b: 255 },
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedColor = color[button.id];
  });
});

lib2.c_handler.addEventListener("click", (e) => {
  if (selectedColor) {
    const x = Math.ceil(e.offsetX);
    const y = Math.ceil(e.offsetY);
    const toFlood = { r: 0, g: 0, b: 0 };

    lib2.floodFillStack(x, y, toFlood, selectedColor);
    lib2.draw();
  }
});

// Nomor 3
const lib3 = new ImageLib("my_canvas3");
const generateButton = document.getElementById("generate");
const pathButton = document.getElementById("path");
const resetButton = document.getElementById("reset");

generateButton.addEventListener("click", () => {
  lib3.generateMaze();
});

pathButton.addEventListener("click", () => {
  lib3.findPath();
});

resetButton.addEventListener("click", () => {
  lib3.reset();
});

  // debugging;
// lib.c_handler.addEventListener("click", (e) => {
//   console.info(e.offsetX);
//   console.info(e.offsetY);
// });
