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
  const t = tebal / 2;
  const sudut = Math.atan2(y2 - y1, x2 - x1);
  const offsetX = Math.sin(sudut) * t;
  const offsetY = Math.cos(sudut) * t;

  for (let i = -t; i <= t; i++) {
    garis(x1 + offsetX * i, y1 - offsetY * i, x2 + offsetX * i, y2 - offsetY * i, color);
  }
};

///////////////////////////////////////
/////// Pertemuan 2 - Praktikkum /////
/////////////////////////////////////
export const segitigaKotakInteraktif = () => {
  const points = [
    [100, 100],
    [200, 100],
    [150, 200],
  ];

  let selectedBox = null;
  const sizeKotak = 20;

  const gambarSegitigaKotak = () => {
    let new_image_data = ctx.createImageData(c_handler.width, c_handler.height);
    image_data = new_image_data;
    ctx.putImageData(image_data, 0, 0);

    polygon(points);
    points.forEach((e, index) => {
      const color = selectedBox === index ? { r: 255 } : 0;
      kotakIsi(e[0], e[1], sizeKotak, color);
    });
  };

  c_handler.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;
    let kotakClicked = false;

    for (let i = 0; i < points.length; i++) {
      const [bx, by] = points[i];
      console.info([bx, by]);
      if (clickX >= bx - sizeKotak / 2 && clickX <= bx + sizeKotak / 2 && clickY >= by - sizeKotak / 2 && clickY <= by + sizeKotak / 2) {
        kotakClicked = true;
        if (selectedBox === i) {
          console.info("masuk a");
          points.splice(i, 1);
          selectedBox = null;
        } else {
          selectedBox = i;
          console.info("masuk b");
        }
        break;
      }
    }

    if (!kotakClicked) {
      if (selectedBox !== null) {
        console.info("check");
        points[selectedBox] = [clickX, clickY];
        selectedBox = null;
      } else {
        if (points.length < 3) points.push([clickX, clickY]);
      }
    }
    gambarSegitigaKotak();
  });

  gambarSegitigaKotak();
};

///////////////////////////////////////
/////// Pertemuan 3 - Teori /////////
/////////////////////////////////////

// Gambar Lingkaran
// Fungsi gambar lingkaran ini menghasilkan bentuk lingkaran karena menggunakan persamaan lingkaran
// untuk menghitung titik-titik di sepanjang tepi lingkaran dari kiri ke kanan dan dari atas ke bawah.
export const gbr_lingkaran = (xc, yc, radius, color) => {
  for (let x = xc - radius; x < xc + radius; x++) {
    let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    titik(Math.ceil(x), Math.ceil(y), color);

    y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    titik(Math.ceil(x), Math.ceil(y), color);
  }
  for (let x = xc - radius; x < xc + radius; x++) {
    let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    titik(Math.ceil(y), Math.ceil(x), color);

    y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    titik(Math.ceil(y), Math.ceil(x), color);
  }
};

// gambar polar
// Fungsi lingkaran polar ini menghasilkan bentuk lingkaran karena menggunakan koordinat polar
// di mana radius tetap konstan dan theta bervariasi dari 0 hingga 2π untuk mencakup seluruh keliling lingkaran.
export const lingkaran_polar = (xc, yc, radius, color) => {
  for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
    x = xc + radius * Math.cos(theta);
    y = yc + radius * Math.sin(theta);

    titik(Math.ceil(x), Math.ceil(y), color);
  }
};

// gambr elips
// Fungsi elips polar ini menghasilkan bentuk elips karena menggunakan dua radius berbeda (radiusX dan radiusY)
// untuk menghitung titik-titik di sepanjang tepi elips, sementara theta bervariasi dari 0 hingga 2π.
export const elips_polar = (xc, yc, radiusX, radiusY, color) => {
  for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
    x = xc + radiusX * Math.cos(theta);
    y = yc + radiusY * Math.sin(theta);

    titik(Math.ceil(x), Math.ceil(y), color);
  }
};

// Nomor 3 => fungsi segi banyak
export const segi_banyak = (xc, yc, radius, sisi, color) => {
  const angle = (2 * Math.PI) / sisi;

  let points = [];

  for (let i = 0; i < sisi; i++) {
    const x = xc + radius * Math.cos(i * angle);
    const y = yc + radius * Math.sin(i * angle);
    points.push({ x: Math.ceil(x), y: Math.ceil(y) });
  }

  for (let i = 0; i < sisi; i++) {
    const start = points[i];
    const end = points[(i + 1) % sisi];
    garis(start.x, start.y, end.x, end.y, color);
  }
};

// Nomor 4 -> garis ke titik menggambar lingkaran
export const garisDenganLingkaran = (x1, y1, x2, y2, radius, color) => {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Jalan di x
    if (x2 >= x1) {
      // Ke kanan
      let y = y1;
      for (let x = x1; x <= x2; x++) {
        lingkaran_polar(x, Math.round(y), radius, color);
        y += dy / dx;
      }
    } else {
      // Ke kiri
      let y = y1;
      for (let x = x1; x >= x2; x--) {
        lingkaran_polar(x, Math.round(y), radius, color);
        y -= dy / dx;
      }
    }
  } else {
    // Jalan di y
    if (y2 >= y1) {
      // Ke bawah
      let x = x1;
      for (let y = y1; y <= y2; y++) {
        lingkaran_polar(Math.round(x), y, radius, color);
        x += dx / dy;
      }
    } else {
      // Ke atas
      let x = x1;
      for (let y = y1; y >= y2; y--) {
        lingkaran_polar(Math.round(x), y, radius, color);
        x -= dx / dy;
      }
    }
  }
};

// Nomor 5 Spiral
// Fungsi spiral ini menghasilkan bentuk spiral karena radius terus bertambah seiring dengan bertambahnya theta.
// Ini menciptakan efek spiral yang semakin melebar seiring dengan putaran theta dari 0 hingga 6π.
export const spiral = (xc, yc, radius, color) => {
  for (let theta = 0; theta <= Math.PI * 6; theta += 0.01) {
    radius += 0.06;
    x = xc + radius * Math.cos(theta);
    y = yc + radius * Math.sin(theta);

    titik(Math.ceil(x), Math.ceil(y), color);
  }
};

// Nomor 6
// Lingkaran dalam lingkaran
export const linglung = (xc, yc, radius, color) => {
  for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
    x = xc + radius * Math.cos(theta);
    y = yc + radius * Math.sin(theta);

    titik(Math.ceil(x), Math.ceil(y), color);
  }
};
