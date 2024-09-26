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
// lib.garis(0, 0, 100, 100, { g: 100 });
// lib.garis(0, 200, 100, 100, { g: 100 });
// lib.garis(200, 0, 100, 200, { g: 100 });

// Testing //
// buat garis mendatar x
// lib.garis(0, lib.c_handler.height / 2, lib.c_handler.width, lib.c_handler.height / 2, 0);

// // buat garis mendatar y
// lib.garis(lib.c_handler.width / 2, 0, lib.c_handler.width / 2, lib.c_handler.height, 0);

// // buat garis miring 1
// lib.garis(0, 0, lib.c_handler.width, lib.c_handler.height, 0);

// // buat garis miring 2
// lib.garis(lib.c_handler.width, 0, 0, lib.c_handler.height, 0);

// NOMOR 2 //
// // buat garis segi delapan
// lib.garis(200, 100, 300, 100, { r: 100 });
// lib.garis(300, 100, 350, 200, { r: 100 });
// lib.garis(350, 200, 350, 300, { r: 100 });
// lib.garis(350, 300, 300, 400, { r: 100 });
// lib.garis(300, 400, 200, 400, { r: 100 });
// lib.garis(200, 400, 250, 300, { r: 100 });
// lib.garis(150, 300, 150, 200, { r: 100 });
// lib.garis(150, 200, 100, 100, { r: 100 });

// NOMOR 4
// buat fungsi polyLine
let x = [
  // [0, 0],
  [100, 200],
  [300, 400],
  [300, 200],
];

// lib.polyLine(x);

// NOMOR 5
// Buat fungsi polygon
// lib.polygon(x);

// lib.garis(100, 200, 300, 400, { r: 100 });
// lib.garis(300, 400, 200, 200, { r: 100 });
// lib.garis(100, 200, 400, 200, { r: 100 });

//  if kalau titik awal < titik akhir tu 100 < 300 = 300
//  if kalau (x akhir - 1) awal >= x akhir => ambil x akhir
//  if kalau (x akhir - 1) awal <= x akhir => ambil (x akhir - 1) - x awal

// NOMOR 6
// Buat fungsi interaktif Polyline
// lib.c_handler.addEventListener("click", (e) => {
//   if (lib.warna == "merah") {
//     lib.polyLineInteraktif(e, { r: 100 });
//   } else if (lib.warna == "biru") {
//     lib.polyLineInteraktif(e, { b: 100 });
//   } else if (lib.warna == "kuning") {
//     lib.polyLineInteraktif(e, { r: 100, g: 100 });
//   } else if (lib.warna == "hijau") {
//     lib.polyLineInteraktif(e, { g: 100 });
//   } else {
//     lib.polyLineInteraktif(e, 0);
//   }
// });

// NOMOR 7
//1.  Buatlah sebuah  fungsi yang membuat kotak isi (dari garis, prototipe function bebas)
// Mohon tunggu beberapa detik untuk melihat hasil
// lib.kotakIsi(50, 50, 50, 0);

// 2.
lib.c_handler.addEventListener("click", (e) => {
  const rect = lib.c_handler.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (lib.kotak.isClicked(x, y)) {
    lib.kotak.toggleHighlight();
    lib.draw();
  }
});

lib.draw();
