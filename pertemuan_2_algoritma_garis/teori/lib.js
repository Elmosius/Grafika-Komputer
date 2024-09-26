export let image_data;
export let ctx;
export let c_handler;
export let warna = "hitam";

export const init_canvas = (canvas_id) => {
  console.info(canvas_id);
  c_handler = document.querySelector(`#${canvas_id}`);
  ctx = c_handler.getContext("2d");
  image_data = ctx.getImageData(0, 0, c_handler.width, c_handler.height);
};

export const titik = (x, y, color) => {
  let index = 4 * (Math.ceil(x) + Math.ceil(y) * c_handler.width);

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

  if (Math.abs(dx) > Math.abs(dy)) {
    // jalan di x
    if (x2 > x1) {
      // ke kanan
      let y = y1;
      for (let x = x1; x <= x2; x++) {
        titik(Math.round(x), Math.round(y), color);
        y += dy / Math.abs(dx);
      }
    } else {
      // ke kiri
      let y = y1;
      for (let x = x1; x >= x2; x--) {
        titik(Math.round(x), Math.round(y), color);
        y -= dy / Math.abs(dx);
      }
    }
  } else {
    // jalan di y
    if (y2 > y1) {
      // ke bawah
      let x = x1;
      for (let y = y1; y <= y2; y++) {
        titik(Math.round(x), Math.round(y), color);
        x += dx / Math.abs(dy);
      }
    } else {
      // ke atas
      let x = x1;
      for (let y = y1; y >= y2; y--) {
        titik(Math.round(x), Math.round(y), color);
        x -= dx / Math.abs(dy);
      }
    }
  }
  ctx.putImageData(image_data, 0, 0);
};

export const polyLine = (arr) => {
  console.info(arr.length);

  for (let i = 0; i < arr.length; i++) {
    let x1 = arr[i][0];
    let y1 = arr[i][1];
    let x2 = arr[i + 1][0];
    let y2 = arr[i + 1][1];

    garis(x1, y1, x2, y2, 0);
  }
};

export const polygon = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let x1 = arr[i][0];
    let y1 = arr[i][1];
    let x2 = arr[i + 1][0];
    let y2 = arr[i + 1][1];

    garis(x1, y1, x2, y2, 0);
  }

  let xFirst = arr[0][0];
  let yFirst = arr[0][1];
  let xLast = arr[arr.length - 1][0];
  let yLast = arr[arr.length - 1][1];

  console.info(xFirst, yFirst, xLast, yLast);
  garis(xFirst, yFirst, xLast, yLast, 0);
};

// NOMOR 6 //

document.reset = () => {
  let new_image_data = ctx.createImageData(c_handler.width, c_handler.height);
  image_data = new_image_data;
  x = undefined;
  y = undefined;

  ctx.putImageData(image_data, 0, 0);
};

document.gantiMerah = () => {
  warna = "merah";
};

document.gantiBiru = () => {
  warna = "biru";
};

document.gantiKuning = () => {
  warna = "kuning";
};

document.gantiHijau = () => {
  warna = "hijau";
};

let x;
let y;
export const polyLineInteraktif = (e, color) => {
  console.info(x);
  console.info(y);
  let rect = c_handler.getBoundingClientRect();
  let clickedX = Math.round(e.clientX) - Math.round(rect.left);
  let clickedY = Math.round(e.clientY) - Math.round(rect.top);

  garis(x, y, clickedX, clickedY, color);
  x = clickedX;
  y = clickedY;
};
