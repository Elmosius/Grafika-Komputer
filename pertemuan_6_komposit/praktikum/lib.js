///////////////////////////////////////
/////// Pertemuan 6 - Teori /////////
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

    // console.info(xFirst, yFirst, xLast, yLast);
    this.garis(xFirst, yFirst, xLast, yLast, color);
  }

  lingkaran_polar(xc, yc, radius, color) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
      let x = xc + radius * Math.cos(theta);
      let y = yc + radius * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  lingkaranIsi(xc, yc, radius, color) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
      let x = xc + radius * Math.cos(theta);
      let y = yc + radius * Math.sin(theta);

      this.titik(Math.round(x), Math.round(y), color);
    }

    this.floodFillStack(xc, yc, { r: 0, g: 0, b: 0 }, color);
  }

  floodFillStack(x0, y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });

    while (tumpukan.length > 0) {
      let titik_skrg = tumpukan.pop();
      let index_skrg = 4 * (titik_skrg.x + titik_skrg.y * this.c_handler.width);

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

  tulisan(ukuran, font, warna, tulisan, koordinat) {
    this.ctx.font = `${ukuran}px ${font}`;
    this.ctx.fillStyle = `${warna}`;
    this.ctx.fillText(`${tulisan}`, koordinat.x, koordinat.y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.c_handler.width, this.c_handler.height);
    this.image_data = this.ctx.getImageData(0, 0, this.c_handler.width, this.c_handler.height);
  }

  segi_banyak(xc, yc, radius, sisi, color) {
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
      this.garis(start.x, start.y, end.x, end.y, color);
    }

    return points;
  }
}
