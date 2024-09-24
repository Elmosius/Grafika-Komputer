// Mengambil elemen canvas dan konteksnya
const c_handler = document.querySelector("#my_canvas");
const ctx = c_handler.getContext("2d");

image_data = ctx.getImageData(0, 0, c_handler.width, c_handler.height);

const titik = (x, y, color) => {
  let index = (Math.ceil(x) + Math.ceil(y) * c_handler.width) * 4;

  // Atur warna
  image_data.data[index] = color.r; // Red
  image_data.data[index + 1] = color.g; // Green
  image_data.data[index + 2] = color.b; // Blue
  image_data.data[index + 3] = 255; // Alpha

  ctx.putImageData(image_data, 0, 0);
};

// contoh 1 garis x
for (let i = 0; i < 100; i++) {
  titik(100 + i, 100, { r: 100 });
}

// contoh 2 garis y
for (let i = 0; i < 100; i++) {
  titik(100, 100 + i, { r: 100 });
}

// contoh 3 garis x = s
for (let i = 0; i < 100; i++) {
  titik(100 + i, 100 + i, { r: 100 });
}

// membuat gradient miring garis
function dda_line(x1, y1, x2, y2, color) {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (dx > dy) {
    // jalan di x
    if (x2 > x1) {
      // ke kanan
      let y = y1;
      for (let x = 0; x < x2; x++) {
        y += dy / Math.abs(dx);
        titik(x, y, color);
      }
    } else {
      // ke kiri
      let y = y1;
      for (let x = 0; x > x2; x--) {
        y += dy / Math.abs(dx);
        titik(x, y, color);
      }
    }
  } else {
    // jalan di y
    if (y2 > y1) {
      // ke kanan
      let x = x1;
      for (let y = 0; y < y2; y++) {
        x += dx / Math.abs(dy);
        titik(x, y, color);
      }
    } else {
      // ke kiri
      let x = x1;
      for (let y = 0; y > y2; y--) {
        x += dx / Math.abs(dy);
        titik(x, y, color);
      }
    }
  }
}

// implementasi
dda_line(0, 0, 100, 100, { g: 100 });
dda_line(0, 200, 100, 100, { g: 100 });
dda_line(200, 0, 100, 200, { g: 100 });
