import { ImageLib } from "./lib.js";

const lib = new ImageLib("my_canvas");

console.info(lib);
// Nomor 2
lib.gbr_lingkaran(100, 100, 100, 0);
lib.lingkaran_polar(200, 200, 70, 0);
lib.elips_polar(300, 300, 150, 50, 0);

//  Nomor 3
// paramater ke-4 untuk mengatur seginya
lib.segi_banyak(400, 100, 100, 6, 0);

// Nomor 4
lib.garisDenganLingkaran(100, 400, 100, 400, 50, 0);

// Nomor 5
lib.spiral(150, 150, 5, 0);

// Nomor 6
lib.linglung(300, 300, 100, 20, 0);

// Nomor 7
let date = new Date();
// console.info(date.getHours());
// console.info(date.getHours());
lib.jamSederhana(200, 200, 100, 20, date.getHours(), date.getMinutes());

lib.draw();
