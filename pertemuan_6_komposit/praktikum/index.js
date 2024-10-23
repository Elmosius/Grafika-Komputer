import { ImageLib } from "./lib.js";
import { TransformasiMatriks } from "./transformasi.js";

// Nomor 1
const lib = new ImageLib("my_canvas");
const tm = TransformasiMatriks;

const speedInput = document.getElementById("speed");
const sidesInput = document.getElementById("sisi");

const speedNilai = document.getElementById("speedNilai");
const sidesNilai = document.getElementById("sidesNilai");

let sisi = 5;
let rotasi = Math.PI / 200;

speedInput.addEventListener("input", (e) => {
  rotasi = (Math.PI / 200) * e.target.value;
  speedNilai.textContent = e.target.value;
});

sidesInput.addEventListener("input", (e) => {
  const newsisi = e.target.value;
  if (newsisi >= 3) {
    sisi = newsisi;
    segiBefore = lib.segi_banyak(lib.c_handler.width / 2, lib.c_handler.height / 2, 100, sisi, { b: 255 });
  }
  sidesNilai.textContent = newsisi;
});

let segiBefore = lib.segi_banyak(lib.c_handler.width / 2, lib.c_handler.height / 2, 100, sisi, { b: 255 });

const animasiRotasi = () => {
  lib.clear();
  let m = tm.rotasiFixPoint(lib.c_handler.width / 2, lib.c_handler.height / 2, rotasi);
  segiBefore = tm.transformasiArray(segiBefore, m);
  lib.polygon(segiBefore, { b: 255 });
  lib.draw();
  requestAnimationFrame(animasiRotasi);
};

animasiRotasi();

// Nomor 2
const lib2 = new ImageLib("my_canvas2");

let centerX = lib2.c_handler.width / 2;
let centerY = lib2.c_handler.height / 2;
let scaleFactor = 1;
let matahariX = centerX;
let matahariY = centerY;

const planets = [
  { orbitRadius: 50, planetRadius: 5, angle: Math.random() * Math.PI * 2, speed: 0.01, color: { r: 99, g: 99, b: 93 } },
  { orbitRadius: 80, planetRadius: 10, angle: Math.random() * Math.PI * 2, speed: 0.01, color: { r: 255, g: 0, b: 0 } },
  { orbitRadius: 200, planetRadius: 15, angle: Math.random() * Math.PI * 2, speed: 0.008, color: { r: 0, g: 255, b: 0 } },
  { orbitRadius: 150, planetRadius: 20, angle: Math.random() * Math.PI * 2, speed: 0.005, color: { r: 0, g: 0, b: 255 } },
  { orbitRadius: 300, planetRadius: 10, angle: Math.random() * Math.PI * 2, speed: 0.01, color: { r: 123, g: 123, b: 255 } },
  { orbitRadius: 500, planetRadius: 20, angle: Math.random() * Math.PI * 2, speed: 0.004, color: { r: 255, g: 255, b: 255 } },
];

const updateSolarSystem = () => {
  lib2.clear();

  lib2.lingkaranIsi(matahariX, matahariY, 30 * scaleFactor, { r: 255, g: 255, b: 84 });

  planets.forEach((planet) => {
    planet.angle += planet.speed;

    const rotasiMatriks = TransformasiMatriks.rotasiFixPoint(matahariX, matahariY, planet.angle);
    let posisiPlanet = { x: matahariX + planet.orbitRadius * scaleFactor, y: matahariY };
    let planetBaru = TransformasiMatriks.transformasiTitik(posisiPlanet, rotasiMatriks);

    // Biar ga nembus kiri ke kanans
    if (planetBaru.x - planet.planetRadius * scaleFactor < 0 || planetBaru.x + planet.planetRadius * scaleFactor > lib2.c_handler.width) {
      return;
    }

    lib2.lingkaranIsi(Math.round(planetBaru.x), Math.round(planetBaru.y), planet.planetRadius * scaleFactor, planet.color);
  });

  lib2.draw();
  requestAnimationFrame(updateSolarSystem);
};

// Tombol tombolan
document.getElementById("geserX").addEventListener("input", (e) => {
  matahariX = centerX + e.target.value * 2;
});

document.getElementById("geserY").addEventListener("input", (e) => {
  matahariY = centerY + e.target.value * 2;
});

document.getElementById("in").addEventListener("click", () => {
  scaleFactor *= 1.1;
});

document.getElementById("out").addEventListener("click", () => {
  scaleFactor /= 1.1;
});

updateSolarSystem();
