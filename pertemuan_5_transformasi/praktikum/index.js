import { ImageLib } from "./lib.js";

// No 1
const lib = new ImageLib("my_canvas");

// lib.bolaMantul(250, 250, 15, { r: 0, g: 255, b: 0 }, 2, 2);

let balls = [
  { x: 250, y: 250, radius: 15, color: { r: 0, g: 255, b: 0 }, dx: 2, dy: 2 },
  { x: 150, y: 150, radius: 15, color: { r: 255, g: 0, b: 0 }, dx: 0, dy: 3 },
  { x: 150, y: 150, radius: 15, color: { r: 0, g: 255, b: 0 }, dx: 1, dy: 2 },
  { x: 150, y: 150, radius: 15, color: { r: 255, g: 0, b: 0 }, dx: 2, dy: 2 },
  { x: 150, y: 150, radius: 15, color: { r: 0, g: 0, b: 255 }, dx: 3, dy: 1 },
  { x: 150, y: 150, radius: 15, color: { r: 0, g: 0, b: 255 }, dx: 3, dy: 3 },
];

lib.bolaMantul(balls);

lib.draw();
