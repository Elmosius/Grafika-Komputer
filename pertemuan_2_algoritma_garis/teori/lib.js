export let image_data;
export let ctx;
export let c_handler;

export const init_canvas = (canvas_id) => {
  console.info(canvas_id);
  c_handler = document.querySelector(`#${canvas_id}`);
  ctx = c_handler.getContext("2d");
  image_data = ctx.getImageData(0, 0, c_handler.width, c_handler.height);
};

export const titik = (x, y, color) => {
  let index = (Math.ceil(x) + Math.ceil(y) * c_handler.width) * 4;

  // Atur warna
  image_data.data[index] = color.r; // Red
  image_data.data[index + 1] = color.g; // Green
  image_data.data[index + 2] = color.b; // Blue
  image_data.data[index + 3] = 255; // Alpha

  ctx.putImageData(image_data, 0, 0);
};

// membuat gradient miring garis
export const garis = (x1, y1, x2, y2, color) => {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) >= Math.abs(dy)) {
    // jalan di x
    if (x2 >= x1) {
      // ke kanan
      let y = y1;
      for (let x = x1; x <= x2; x++) {
        titik(x, Math.round(y), color);
        y += dy / Math.abs(dx);
      }
    } else {
      // ke kiri
      let y = y1;
      for (let x = x1; x >= x2; x--) {
        titik(x, Math.round(y), color);
        y -= dy / Math.abs(dx);
      }
    }
  } else {
    // jalan di y
    if (y2 >= y1) {
      // ke bawah
      let x = x1;
      for (let y = y1; y <= y2; y++) {
        titik(Math.round(x), y, color);
        x += dx / Math.abs(dy);
      }
    } else {
      // ke atas
      let x = x1;
      for (let y = y1; y >= y2; y--) {
        titik(Math.round(x), y, color);
        x -= dx / Math.abs(dy);
      }
    }
  }
};

export const polyLine = (arr) => {};
