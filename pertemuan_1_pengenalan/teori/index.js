// Mengambil elemen canvas dan konteksnya
const c_handler = document.querySelector("#my_canvas");
const ctx = c_handler.getContext("2d");

// Membuat ImageData untuk menggambar
const image_data = ctx.createImageData(c_handler.width, c_handler.height);

// Nomor 1
// Fungsi untuk menggambar titik
const titik = (x, y, color) => {
  let index = (x + y * c_handler.width) * 4;

  // Atur warna
  image_data.data[index] = color.r; // Red
  image_data.data[index + 1] = color.g; // Green
  image_data.data[index + 2] = color.b; // Blue
  image_data.data[index + 3] = 255; // Alpha

  ctx.putImageData(image_data, 0, 0);
};

// Nomor 2
// Buat kotak full dengan titik
// for (let i = 100; i < 400; i += 10) {
//   for (let j = 100; j < 400; j += 10) {
//     titik(i, j);
//   }
// }

// Nomor 3
// buat kotak isi kosong
// for (let i = 100; i <= 400; i += 10) {
//   for (let j = 100; j <= 400; j += 10) {
//     if (i == 100 || j == 100 || i == 400 || j == 400) titik(i, j);
//   }
// }

// Nomor 4
// buat segitiga
// for (let i = 100; i <= 400; i += 10) {
//   for (let j = 100; j <= 400; j += 10) {
//     if (i == 100 || j == 400 || i == j) titik(i, j, 255);
//   }
// }

// Nomor 5
// Buat kotak dengan gradien hitam ke merah
// for (let i = 100; i <= 400; i += 10) {
//   for (let j = 100; j <= 400; j += 10) {
//     titik(i, j, { r: j });
//   }
// }

// Nomor 6
// Buat kalau di click muncul
c_handler.addEventListener("click", (e) => {
  const rect = c_handler.getBoundingClientRect();
  console.info(rect);
  console.info(e.clientX);
  console.info(e.clientY);
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  console.info(x);
  console.info(y);
  titik(Math.floor(x), Math.floor(y), { r: 255 });
});
