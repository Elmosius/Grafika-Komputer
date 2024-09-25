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

// Test 1 bikin segitiga 8 //
// buat garis mendatar x
// lib.garis(0, lib.c_handler.height / 2, lib.c_handler.width, lib.c_handler.height / 2, 0);

// // buat garis mendatar y
// lib.garis(lib.c_handler.width / 2, 0, lib.c_handler.width / 2, lib.c_handler.height, 0);

// // buat garis miring 1
// lib.garis(0, 0, lib.c_handler.width, lib.c_handler.height, 0);

// // buat garis miring 2
// lib.garis(lib.c_handler.width, 0, 0, lib.c_handler.height, 0);

// // buat garis segi delapan
// lib.garis(200, 100, 300, 100, { r: 100 });
// lib.garis(300, 100, 350, 200, { r: 100 });
// lib.garis(350, 200, 350, 300, { r: 100 });
// lib.garis(350, 300, 300, 400, { r: 100 });
// lib.garis(300, 400, 200, 400, { r: 100 });
// lib.garis(200, 400, 250, 300, { r: 100 });
// lib.garis(150, 300, 150, 200, { r: 100 });
// lib.garis(150, 200, 100, 100, { r: 100 });

lib.garis(100, 200, 100, 200, { r: 100 });
//
lib.c_handler.addEventListener("click", lib.clickListener);
