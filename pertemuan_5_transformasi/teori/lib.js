///////////////////////////////////////
/////// Pertemuan 5 - Teori /////////
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

  translasi(point, tx, ty) {
    return {
      x: point.x + tx,
      y: point.y + ty,
    };
  }

  rotate(point, angle) {
    return {
      x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
    };
  }

  scale(point, sx, sy) {
    return {
      x: point.x * sx,
      y: point.y * sy,
    };
  }

  rotateFixedPoint(point, titik_pusat, angle) {
    let p1 = this.translasi(point, -titik_pusat.x, -titik_pusat.y);
    let p2 = this.rotate(p1, angle);
    let p3 = this.translasi(p2, titik_pusat.x, titik_pusat.y);

    return p3;
  }

  scaleFixedPoint(point, titik_pusat, sx, sy) {
    let p1 = this.translasi(point, -titik_pusat.x, -titik_pusat.y);
    let p2 = this.scale(p1, sx, sy);
    let p3 = this.translasi(p2, titik_pusat.x, titik_pusat.y);

    return p3;
  }

  rotasiArray(points, titik_pusat, sudut) {
    let hasil = [];
    points.forEach((e) => {
      hasil.push(this.rotateFixedPoint(e, titik_pusat, sudut));
    });

    return hasil;
  }

  skalaArray(points, titik_pusat, s) {
    let hasil = [];
    points.forEach((e) => {
      hasil.push(this.scaleFixedPoint(e, titik_pusat, s.x, s.y));
    });

    return hasil;
  }

  translasiArray(points, tx, ty) {
    let hasil = [];
    points.forEach((point) => {
      hasil.push(this.translasi(point, tx, ty));
    });

    return hasil;
  }

  gambarKotakInteraktif(points) {
    this.ctx.clearRect(0, 0, this.c_handler.width, this.c_handler.height);
    this.image_data = this.ctx.getImageData(0, 0, this.c_handler.width, this.c_handler.height);

    this.polygon(points, { r: 255 });
    this.draw();
  }

  titikPusat(points) {
    let x = 0;
    let y = 0;
    points.forEach((e) => {
      x += e.x;
      y += e.y;
    });
    return { x: x / points.length, y: y / points.length };
  }
}
