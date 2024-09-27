import * as lib from "./lib.js";

lib.init_canvas("my_canvas");

// NOMOR 2 //
// buat garis segi delapan
// lib.garis(200, 100, 300, 100, { r: 100 });
// lib.garis(300, 100, 350, 200, { r: 100 });
// lib.garis(350, 200, 350, 300, { r: 100 });
// lib.garis(350, 300, 300, 400, { r: 100 });
// lib.garis(300, 400, 200, 400, { r: 100 });
// lib.garis(200, 400, 150, 300, { r: 100 });
// lib.garis(150, 300, 150, 200, { r: 100 });
// lib.garis(150, 200, 200, 100, { r: 100 });

// NOMOR 4
// buat fungsi polyLine
let x = [
  // [0, 0],
  [200, 150],
  [300, 150],
  [350, 200],
  [350, 300],
  [300, 350],
  [200, 350],
  [150, 300],
  [150, 200],
];

// lib.polyLine(x);

// NOMOR 5
// Buat fungsi polygon
// lib.polygon(x);

// NOMOR 6
// Buat fungsi interaktif Polyline
// lib.c_handler.addEventListener("click", (e) => {
//   if (lib.warna == "merah") {
//     lib.polyLineInteraktif(e, { r: 255 });
//   } else if (lib.warna == "biru") {
//     lib.polyLineInteraktif(e, { b: 255 });
//   } else if (lib.warna == "kuning") {
//     lib.polyLineInteraktif(e, { r: 255, g: 255 });
//   } else if (lib.warna == "hijau") {
//     lib.polyLineInteraktif(e, { g: 255 });
//   } else {
//     lib.polyLineInteraktif(e, 0);
//   }
// });

// NOMOR 7
//1.  Buatlah sebuah  fungsi yang membuat kotak isi (dari garis, prototipe function bebas)
// Mohon tunggu beberapa detik untuk melihat hasil
// lib.kotakIsi(100, 100, 50, 0);

// 2.
// Konsep awal
// lib.kotakIsi(100, 100, 70, { r: 255 });
// lib.kotakIsi(100, 100, 50, 0);

// implementasi
// lib.kotakIsiHighLight(100, 100, 50, 0);

// 3.
// lib.garisTebal(50, 50, 200, 200, { b: 255 }, 1);

// debugging
lib.c_handler.addEventListener("click", (e) => {
  console.info(e.offsetX);
  console.info(e.offsetY);
});
