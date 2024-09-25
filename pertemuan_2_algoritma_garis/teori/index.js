import * as lib from "./lib.js";

lib.init_canvas("my_canvas");

// contoh 1 garis x
// for (let i = 0; i < 100; i++) {
//   lib.titik(100 + i, 100, { r: 100 });
// }

// // // contoh 2 garis y
// for (let i = 0; i < 100; i++) {
//   lib.titik(100, 100 + i, { r: 100 });
// }

// // // // contoh 3 garis x = s
// for (let i = 0; i < 100; i++) {
//   lib.titik(100 + i, 100 + i, { r: 100 });
// }

// // // implementasi
// lib.dda_line(0, 0, 100, 100, { g: 100 });
// lib.dda_line(0, 200, 100, 100, { g: 100 });
// lib.dda_line(200, 0, 100, 200, { g: 100 });

// Test 1 bikin segitiga 8 //
// buat garis mendatar x
lib.dda_line(0, lib.c_handler.height / 2, lib.c_handler.width, lib.c_handler.height / 2, 0);

// buat garis mendatar y
lib.dda_line(lib.c_handler.width / 2, 0, lib.c_handler.width / 2, lib.c_handler.height, 0);

// buat garis miring 1
lib.dda_line(0, 0, lib.c_handler.width, lib.c_handler.height, 0);

// buat garis miring 2
lib.dda_line(lib.c_handler.width, 0, 0, lib.c_handler.height, 0);

// Buat garis banyak bewarna //
// for (let i = 0; i < 134; i++) {
//   let randomTinggi = Math.ceil(Math.random() * 250) + 101;
//   let randomR = Math.ceil(Math.random() * 255) + 1;
//   let randomG = Math.ceil(Math.random() * 255) + 1;
//   let randomB = Math.ceil(Math.random() * 255) + 1;
//   dda_line(i * 3, 400, i * 3, randomTinggi, { r: randomR, g: randomG, b: randomB });
// }
