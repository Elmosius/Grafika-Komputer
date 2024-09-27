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
    if (x2 >= x1) {
      // ke kanan
      let y = y1;
      for (let x = x1; x <= x2; x++) {
        titik(x, Math.round(y), color);
        y += dy / dx;
      }
    } else {
      // ke kiri
      let y = y1;
      for (let x = x1; x >= x2; x--) {
        titik(x, Math.round(y), color);
        y -= dy / dx;
      }
    }
  } else {
    // jalan di y
    if (y2 >= y1) {
      // ke bawah
      let x = x1;
      for (let y = y1; y <= y2; y++) {
        titik(Math.round(x), y, color);
        x += dx / dy;
      }
    } else {
      // ke atas
      let x = x1;
      for (let y = y1; y >= y2; y--) {
        titik(Math.round(x), y, color);
        x -= dx / dy;
      }
    }
  }
  ctx.putImageData(image_data, 0, 0);
};

// NOMOR 4 //
export const polyLine = (arr) => {
  console.info(arr.length);

  for (let i = 0; i < arr.length - 1; i++) {
    let x1 = arr[i][0];
    let y1 = arr[i][1];
    let x2 = arr[i + 1][0];
    let y2 = arr[i + 1][1];

    garis(x1, y1, x2, y2, 0);
  }
};

// NOMOR 5 //
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
  // let clickedX = e.offsetX;
  // let clickedY = e.offsetY;

  garis(x, y, clickedX, clickedY, color);
  x = clickedX;
  y = clickedY;
};

// NOMOR 7 //
//1. Buatlah sebuah  fungsi yang membuat kotak isi (dari garis, prototipe function bebas)
export const kotakIsi = (x, y, s, color) => {
  for (let i = -s / 2; i < s / 2; i++) {
    garis(x - s / 2, y + i, x + s - s / 2, y + i, color);
  }
};

// 2. buatlah sebuah kotak dilayar yang apabila di klik akan di highlight bila di klik lagi highlight akan hilang
// export const kotak = new Kotak(ctx, 100, 100, 50);
export const kotakIsiHighLight = (x, y, s, color) => {
  let isHighLighted = false;

  const gambarKotak = () => {
    let new_image_data = ctx.createImageData(c_handler.width, c_handler.height);
    image_data = new_image_data;

    ctx.putImageData(image_data, 0, 0);

    kotakIsi(x, y, s, color);
    if (isHighLighted) {
      kotakIsi(x, y, s + 20, { r: 255 });
      kotakIsi(x, y, s, color);
    }
  };

  c_handler.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    if (clickX >= x - s / 2 && clickX <= x + s / 2 && clickY >= y - s / 2 && clickY <= y + s / 2) {
      isHighLighted = !isHighLighted;
      gambarKotak();
    }
  });
  gambarKotak();
};

// 3. Bagimana kira kira membuat garis yang tebalnya lebih dari 1 pixel ? apakah ada cara yang terpikir ? cobalah membuat sebuah garis tebal pada canvas. (metodenya bebas tapi menggunakan primitif yang dibuat sendiri ).
// Memakai bantuan chatGPT
export const garisTebal = (x1, y1, x2, y2, color, tebal) => {
  const halfThickness = tebal / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const offsetX = Math.sin(angle) * halfThickness;
  const offsetY = Math.cos(angle) * halfThickness;

  for (let i = -halfThickness; i <= halfThickness; i++) {
    garis(x1 + offsetX * i, y1 - offsetY * i, x2 + offsetX * i, y2 - offsetY * i, color);
  }
};
