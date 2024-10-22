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

    console.info(xFirst, yFirst, xLast, yLast);
    this.garis(xFirst, yFirst, xLast, yLast, color);
  }

  lingkaran_polar(xc, yc, radius, color) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
      let x = xc + radius * Math.cos(theta);
      let y = yc + radius * Math.sin(theta);

      this.titik(Math.ceil(x), Math.ceil(y), color);
    }
  }

  tulisan(ukuran, font, warna, tulisan, koordinat) {
    this.ctx.font = `${ukuran}px ${font}`;
    this.ctx.fillStyle = `${warna}`;
    this.ctx.fillText(`${tulisan}`, koordinat.x, koordinat.y);
  }

  matriksIdentitas() {
    let identitas = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    return identitas;
  }

  mutiplyMatrix(m1, m2) {
    let hasil = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          hasil[i][k] += m1[i][j] * m2[j][k];
        }
      }
    }

    return hasil;
  }

  createTranslasi(tx, ty) {
    let translasi = [
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1],
    ];

    return translasi;
  }

  createSkala(sx, sy) {
    let skala = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ];

    return skala;
  }

  createRotasi(theta) {
    let rotasi = [
      [Math.cos(theta), -Math.sin(theta), 0],
      [Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1],
    ];

    return rotasi;
  }

  rotasiFixPoint(xc, yc, theta) {
    let m1 = this.createTranslasi(-xc, -yc);
    let m2 = this.createRotasi(theta);
    let m3 = this.createTranslasi(xc, yc);

    let hasil = this.mutiplyMatrix(m3, m2);
    hasil = this.mutiplyMatrix(hasil, m1);

    return hasil;
  }

  skalaFixPoint(xc, yc, sx, sy) {
    let m1 = this.createTranslasi(-xc, -yc);
    let m2 = this.createSkala(sx, sy);
    let m3 = this.createTranslasi(xc, yc);

    let hasil = this.mutiplyMatrix(m3, m2);
    hasil = this.mutiplyMatrix(hasil, m1);

    return hasil;
  }

  transformasiTitik(titik_lama, m) {
    let x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
    let y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

    return { x: x_baru, y: y_baru };
  }

  transformasiArray(array_titik, m) {
    let hasil = [];

    for (let i = 0; i < array_titik.length; i++) {
      let titik_hasil;
      titik_hasil = this.transformasiTitik(array_titik[i], m);
      hasil.push(titik_hasil);
    }

    return hasil;
  }
}
