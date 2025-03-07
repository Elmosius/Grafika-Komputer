///////////////////////////////////////
/////// Pertemuan 3 - Praktikum //////
/////////////////////////////////////

export class ImageLib {
  constructor(canvas_id) {
    this.c_handler = document.querySelector(`#${canvas_id}`);
    this.ctx = this.c_handler.getContext("2d");
    this.image_data = this.ctx.getImageData(0, 0, this.c_handler.width, this.c_handler.height);
    this.clickCount = 0;
    this.circleSize = 20;
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

  // Gambar Lingkaran
  // Fungsi gambar lingkaran ini menghasilkan bentuk lingkaran karena menggunakan persamaan lingkaran
  // untuk menghitung titik-titik di sepanjang tepi lingkaran dari kiri ke kanan dan dari atas ke bawah.
  gbr_lingkaran(xc, yc, radius, color) {
    for (let x = xc - radius; x < xc + radius; x++) {
      let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
      this.titik(Math.ceil(x), Math.ceil(y), color);

      y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
    for (let x = xc - radius; x < xc + radius; x++) {
      let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
      this.titik(Math.ceil(y), Math.ceil(x), color);

      y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
      this.titik(Math.ceil(y), Math.ceil(x), color);
    }
  }

  // gambar polar
  // Fungsi lingkaran polar ini menghasilkan bentuk lingkaran karena menggunakan koordinat polar
  // di mana radius tetap konstan dan theta bervariasi dari 0 hingga 2π untuk mencakup seluruh keliling lingkaran.
  lingkaran_polar(xc, yc, radius, color) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
      let x = xc + radius * Math.cos(theta);
      let y = yc + radius * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  // gambr elips
  // Fungsi elips polar ini menghasilkan bentuk elips karena menggunakan dua radius berbeda (radiusX dan radiusY)
  // untuk menghitung titik-titik di sepanjang tepi elips, sementara theta bervariasi dari 0 hingga 2π.
  elips_polar(xc, yc, radiusX, radiusY, color) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
      let x = xc + radiusX * Math.cos(theta);
      let y = yc + radiusY * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  // Nomor 3 => fungsi segi banyak
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
  }

  // Nomor 4 -> garis ke titik menggambar lingkaran
  garisDenganLingkaran(x1, y1, x2, y2, radius, color) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Jalan di x
      if (x2 >= x1) {
        // Ke kanan
        let y = y1;
        for (let x = x1; x <= x2; x++) {
          this.lingkaran_polar(x, Math.round(y), radius, color);
          y += dy / dx;
        }
      } else {
        // Ke kiri
        let y = y1;
        for (let x = x1; x >= x2; x--) {
          this.lingkaran_polar(x, Math.round(y), radius, color);
          y -= dy / dx;
        }
      }
    } else {
      // Jalan di y
      if (y2 >= y1) {
        // Ke bawah
        let x = x1;
        for (let y = y1; y <= y2; y++) {
          this.lingkaran_polar(Math.round(x), y, radius, color);
          x += dx / dy;
        }
      } else {
        // Ke atas
        let x = x1;
        for (let y = y1; y >= y2; y--) {
          this.lingkaran_polar(Math.round(x), y, radius, color);
          x -= dx / dy;
        }
      }
    }
  }

  // Nomor 5 Spiral
  // Fungsi spiral ini menghasilkan bentuk spiral karena radius terus bertambah seiring dengan bertambahnya theta.
  // Ini menciptakan efek spiral yang semakin melebar seiring dengan putaran theta dari 0 hingga 6π.
  spiral(xc, yc, radius, color) {
    for (let theta = 0; theta <= Math.PI * 6; theta += 0.01) {
      radius += 0.06;
      let x = xc + radius * Math.cos(theta);
      let y = yc + radius * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  // Nomor 6
  // Lingkaran dalam lingkaran

  linglung(xc, yc, radiusBesar, radiusKecil, color) {
    this.lingkaran_polar(xc, yc, radiusBesar, color);

    const jumlahLingkaranKecil = 10;
    for (let i = 0; i < jumlahLingkaranKecil; i++) {
      let theta = ((Math.PI * 2) / jumlahLingkaranKecil) * i;
      let xPusatKecil = xc + radiusBesar * Math.cos(theta);
      let yPusatKecil = yc + radiusBesar * Math.sin(theta);

      this.lingkaran_polar(xPusatKecil, yPusatKecil, radiusKecil, color);
    }
  }

  // Nomor 7
  // Jam sederhana
  jamSederhana(xc, yc, radiusBesar, radiusKecil, jam, menit) {
    this.lingkaran_polar(xc, yc, radiusBesar, 0);

    let posisiJam = jam - 3;
    let posisiMenit = Math.floor(menit / 5) - 3;
    const jumlahLingkaranKecil = 12;

    console.log(posisiJam);
    console.log(posisiMenit);
    for (let i = 0; i < jumlahLingkaranKecil; i++) {
      let theta = ((Math.PI * 2) / jumlahLingkaranKecil) * i;
      let xPusatKecil = xc + radiusBesar * Math.cos(theta);
      let yPusatKecil = yc + radiusBesar * Math.sin(theta);

      let warnaLingkaranKecil = i === posisiJam ? { r: 255 } : 0;
      //   console.log(i);
      this.lingkaran_polar(xPusatKecil, yPusatKecil, radiusKecil, warnaLingkaranKecil);
    }

    const radiusBesarKecil = radiusBesar / 2;
    this.lingkaran_polar(xc, yc, radiusBesarKecil, 0);

    for (let i = 0; i < jumlahLingkaranKecil; i++) {
      let theta = ((Math.PI * 2) / jumlahLingkaranKecil) * i;
      let xPusatKecil = xc + radiusBesarKecil * Math.cos(theta);
      let yPusatKecil = yc + radiusBesarKecil * Math.sin(theta);

      let warnaLingkaranKecil = i === posisiMenit ? { g: 255 } : 0;

      this.lingkaran_polar(xPusatKecil, yPusatKecil, radiusKecil / 2, warnaLingkaranKecil);
    }
  }

  obatNyamuk(xc, yc, rad, s, color) {
    // console.info(color);
    for (let theta = 0; theta <= Math.PI * 8; theta += 0.01) {
      rad -= s;
      let x = xc + rad * Math.cos(theta);
      let y = yc + rad * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  bunga(posisi, radius, n, color) {
    let { xc, yc } = posisi;

    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
      let x = xc + radius * Math.cos(n * theta) * Math.cos(theta);
      let y = yc + radius * Math.cos(n * theta) * Math.sin(theta);
      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  getRandomColor() {
    let color = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) };
    console.info(color);
    return color;
  }

  obatInteraktif(e, isDoubleClick) {
    this.clickCount++;

    console.info(isDoubleClick);
    document.getElementById("click-counter").textContent = `Jumlah klik: ${this.clickCount}`;

    const x = Math.ceil(e.offsetX);
    const y = Math.ceil(e.offsetY);

    const color = this.getRandomColor();

    if (isDoubleClick) {
      console.info("a");
      let new_image_data = this.ctx.createImageData(this.c_handler.width, this.c_handler.height);
      this.image_data = new_image_data;
      this.ctx.putImageData(this.image_data, 0, 0);

      this.obatNyamuk(x, y, 1, 0.05, color);
    } else {
      console.info("b");
      this.lingkaran_polar(x, y, this.circleSize, color);
      this.circleSize += 10;
    }
    this.draw();
  }
}
