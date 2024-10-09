///////////////////////////////////////
/////// Pertemuan 4 - Praktikum /////////
/////////////////////////////////////

export class ImageLib {
  constructor(canvas_id) {
    this.c_handler = document.querySelector(`#${canvas_id}`);
    this.ctx = this.c_handler.getContext("2d");
    this.image_data = this.ctx.getImageData(0, 0, this.c_handler.width, this.c_handler.height);
  }

  draw() {
    this.ctx.putImageData(this.image_data, 0, 0);
  }

  titik(x, y, color) {
    let index = 4 * (Math.ceil(x) + Math.ceil(y) * this.c_handler.width);
    // Atur warna
    this.image_data.data[index] = color.r; // Red
    this.image_data.data[index + 1] = color.g; // Green
    this.image_data.data[index + 2] = color.b; // Blue
    this.image_data.data[index + 3] = 255; // Alpha
  }

  garis(x1, y1, x2, y2, color) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
      // jalan di x
      if (x2 >= x1) {
        // ke kanan
        let y = y1;
        for (let x = x1; x <= x2; x++) {
          this.titik(x, Math.round(y), color);
          y += dy / dx;
        }
      } else {
        // ke kiri
        let y = y1;
        for (let x = x1; x >= x2; x--) {
          this.titik(x, Math.round(y), color);
          y -= dy / dx;
        }
      }
    } else {
      // jalan di y
      if (y2 >= y1) {
        // ke bawah
        let x = x1;
        for (let y = y1; y <= y2; y++) {
          this.titik(Math.round(x), y, color);
          x += dx / dy;
        }
      } else {
        // ke atas
        let x = x1;
        for (let y = y1; y >= y2; y--) {
          this.titik(Math.round(x), y, color);
          x -= dx / dy;
        }
      }
    }
  }

  polygon(arr, color) {
    for (let i = 0; i < arr.length - 1; i++) {
      let x1 = arr[i].x;
      let y1 = arr[i].y;
      let x2 = arr[i + 1].x;
      let y2 = arr[i + 1].y;

      this.garis(x1, y1, x2, y2, color);
    }

    let xFirst = arr[0].x;
    let yFirst = arr[0].y;
    let xLast = arr[arr.length - 1].x;
    let yLast = arr[arr.length - 1].y;

    console.info(xFirst, yFirst, xLast, yLast);
    this.garis(xFirst, yFirst, xLast, yLast, color);
  }

  bunga(posisi, radius, n, toFlood, color) {
    let { xc, yc } = posisi;
    let fill = { x: 0, y: 0 };
    // let kelopak = n % 2 === 0 ? (kelopak *= 2) : kelopak;

    // for (let i = 0; i < n; i++) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
      let x = xc + radius * Math.cos(n * theta) * Math.cos(theta);
      let y = yc + radius * Math.cos(n * theta) * Math.sin(theta);
      this.titik(Math.ceil(x), Math.ceil(y), color);
      fill.x = x;
      fill.y = y;
    }

    console.info(fill.x, fill.y);

   
    //   this.floodFillStack(posisi - x, 0, toFlood, color);
    // }
  }

  floodFillNaive(x, y, toFlood, color) {
    let index = 4 * (x + y * this.c_handler.width);

    let r1 = this.image_data.data[index];
    let g1 = this.image_data.data[index + 1];
    let b1 = this.image_data.data[index + 2];

    // // console.info(this.image_data.data[index]);
    // // console.info(this.image_data.data[index + 1]);
    // // console.info(`color r:${color.r} g:${color.g} b:   ${color.b}`);
    // // console.info(`r1:${r1} g1:${g1} b1:${b1}`);
    // // console.info(`r:${toFlood.r} g:${toFlood.g} b:${toFlood.b}`);
    if (r1 === toFlood.r && g1 === toFlood.g && b1 === toFlood.b) {
      this.image_data.data[index] = color.r;
      this.image_data.data[index + 1] = color.g;
      this.image_data.data[index + 2] = color.b;
      this.image_data.data[index + 3] = 255;

      if (x + 1 < this.c_handler.width) {
        this.floodFillNaive(x + 1, y, toFlood, color);
      }

      if (y + 1 < this.c_handler.height) {
        this.floodFillNaive(x, y + 1, toFlood, color);
      }

      this.floodFillNaive(x - 1, y, toFlood, color);

      this.floodFillNaive(x, y - 1, toFlood, color);
    }
  }

  floodFillStack(x0, y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });

    while (tumpukan.length > 0) {
      // ambil satu buah titik dari tumpukan
      // cek titik tersebut bisa diwarna atau tidak
      // kalau bisa warna, masukkan dalam tumpukkan titik sekitarnya

      let titik_skrg = tumpukan.pop();
      let index_skrg = 4 * (titik_skrg.x + titik_skrg.y * this.c_handler.width);

      console.info(titik_skrg);
      let r1 = this.image_data.data[index_skrg];
      let g1 = this.image_data.data[index_skrg + 1];
      let b1 = this.image_data.data[index_skrg + 2];

      if (r1 === toFlood.r && g1 === toFlood.g && b1 === toFlood.b) {
        this.image_data.data[index_skrg] = color.r;
        this.image_data.data[index_skrg + 1] = color.g;
        this.image_data.data[index_skrg + 2] = color.b;
        this.image_data.data[index_skrg + 3] = 255;

        tumpukan.push({ x: titik_skrg.x + 1, y: titik_skrg.y });
        tumpukan.push({ x: titik_skrg.x - 1, y: titik_skrg.y });
        tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y + 1 });
        tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y - 1 });
      }
    }
  }
}
