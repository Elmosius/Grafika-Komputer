import { ImageLib } from "./lib.js";

// Nomor 2 1
const lib = new ImageLib("my_canvas");

// lib.bolaMantul(250, 250, 15, { r: 0, g: 255, b: 0 }, 2, 2);

let balls = [
  { x: 500, y: 250, radius: 15, color: { r: 0, g: 255, b: 0 }, dx: 2, dy: 2 },
  { x: 500, y: 150, radius: 15, color: { r: 243, g: 174, b: 78 }, dx: 0, dy: 3 },
  { x: 500, y: 150, radius: 15, color: { r: 0, g: 255, b: 0 }, dx: 1, dy: 2 },
  { x: 500, y: 150, radius: 15, color: { r: 243, g: 174, b: 78 }, dx: 2, dy: 2 },
  { x: 500, y: 150, radius: 15, color: { r: 0, g: 255, b: 0 }, dx: 3, dy: 1 },
  { x: 500, y: 150, radius: 15, color: { r: 243, g: 174, b: 78 }, dx: 3, dy: 3 },
];
lib.bolaMantul(balls);
lib.draw();

// Nomor 2
const lib2 = new ImageLib("my_canvas2");

const centerX = lib2.c_handler.width / 2;
const centerY = lib2.c_handler.height / 2;

const planets = [
  { orbitRadius: 50, planetRadius: 10, angle: Math.random() * Math.PI * 2, speed: 0.01, color: { r: 255, g: 0, b: 0 } },
  { orbitRadius: 200, planetRadius: 15, angle: Math.random() * Math.PI * 2, speed: 0.008, color: { r: 0, g: 255, b: 0 } },
  { orbitRadius: 150, planetRadius: 20, angle: Math.random() * Math.PI * 2, speed: 0.005, color: { r: 0, g: 0, b: 255 } },
];

let lingkaran = planets.map((planet) => ({
  x: centerX + planet.orbitRadius * Math.cos(planet.angle),
  y: centerY + planet.orbitRadius * Math.sin(planet.angle),
}));

const updateSolarSystem = () => {
  lib2.clearCanvas();

  lib2.lingkaran_polar(centerX, centerY, 25, { r: 255, g: 203, b: 129 });

  lingkaran = lib2.rotasiArray(lingkaran, { x: centerX, y: centerY }, planets[0].speed);
  planets.forEach((planet, index) => {
    const planetX = lingkaran[index].x;
    const planetY = lingkaran[index].y;

    lib2.lingkaran_polar(Math.round(planetX), Math.round(planetY), planet.planetRadius, planet.color);
  });

  lib2.draw();
  requestAnimationFrame(updateSolarSystem);
};

updateSolarSystem();
