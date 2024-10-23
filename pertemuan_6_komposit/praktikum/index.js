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
  lib.polygon(segiBefore, 0);
  lib.draw();
  requestAnimationFrame(animasiRotasi);
};

animasiRotasi();

// Nomor 2
const lib2 = new ImageLib("my_canvas2");
