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
