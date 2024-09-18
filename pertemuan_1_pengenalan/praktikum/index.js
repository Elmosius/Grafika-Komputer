// Penulis : Elmosius Suli
// NRP : 2272008

// Mengambil elemen canvas dan konteksnya
const c_handler = document.querySelector("#my_canvas");
const ctx = c_handler.getContext("2d");
let canvas = document.querySelector("#my_canvas");

// Membuat ImageData untuk menggambar
let image_data = ctx.createImageData(c_handler.width, c_handler.height);

const titik = (x, y, color) => {
  let index = (x + y * c_handler.width) * 4;

  // Atur warna
  image_data.data[index] = color.r; // Red
  image_data.data[index + 1] = color.g; // Green
  image_data.data[index + 2] = color.b; // Blue
  image_data.data[index + 3] = 255; // Alpha

  ctx.putImageData(image_data, 0, 0);
};

// Buat garis tengah
let x = canvas.width / 2;
let y = canvas.height / 2;

// Ambil button
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const topButton = document.querySelector("#top");
const downButton = document.querySelector("#down");
const clearButton = document.querySelector("#clear");

// Actionnya
leftButton.addEventListener("click", () => {
  x -= 10;
  titik(x, y, {
    r: Math.floor(Math.random() * 255) + 1,
    g: Math.floor(Math.random() * 255) + 1,
    b: Math.floor(Math.random() * 255) + 1,
  });
});

rightButton.addEventListener("click", () => {
  x += 10;
  titik(x, y, {
    r: Math.floor(Math.random() * 255) + 1,
    g: Math.floor(Math.random() * 255) + 1,
    b: Math.floor(Math.random() * 255) + 1,
  });
});

topButton.addEventListener("click", () => {
  y -= 10;
  titik(x, y, {
    r: Math.floor(Math.random() * 255) + 1,
    g: Math.floor(Math.random() * 255) + 1,
    b: Math.floor(Math.random() * 255) + 1,
  });
});

downButton.addEventListener("click", () => {
  y += 10;
  titik(x, y, {
    r: Math.floor(Math.random() * 255) + 1,
    g: Math.floor(Math.random() * 255) + 1,
    b: Math.floor(Math.random() * 255) + 1,
  });
});

clearButton.addEventListener("click", () => {
  let new_image_data = ctx.createImageData(c_handler.width, c_handler.height);
  image_data = new_image_data;

  x = canvas.width / 2;
  y = canvas.height / 2;

  titik(x, y, { r: 0 });
  ctx.putImageData(image_data, 0, 0);
});

titik(x, y, { r: 0 });
