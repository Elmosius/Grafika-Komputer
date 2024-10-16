///////////////////////////////////////
/////// Pertemuan 4 - Praktikum /////////
/////////////////////////////////////

export class ImageLib {
  constructor(canvas_id) {
    this.c_handler = document.querySelector(`#${canvas_id}`);
    this.ctx = this.c_handler.getContext("2d");
    this.image_data = this.ctx.getImageData(0, 0, this.c_handler.width, this.c_handler.height);
    this.startPoint = null;
    this.midPoint = null;
    this.goalPoint = null;
    this.objects = [];
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

  getRandomColor() {
    let color = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) };
    console.info(color);
    return color;
  }

  bunga(posisi, radius, n, color) {
    let { xc, yc } = posisi;

    for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
      let x = xc + radius * Math.cos(n * theta) * Math.cos(theta);
      let y = yc + radius * Math.cos(n * theta) * Math.sin(theta);
      this.titik(Math.ceil(x), Math.ceil(y), color);
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

      // console.info(titik_skrg);
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

  reset() {
    let new_image_data = this.ctx.createImageData(this.c_handler.width, this.c_handler.height);
    this.image_data = new_image_data;
    this.ctx.putImageData(this.image_data, 0, 0);
    this.startPoint = null;
    this.midPoint = null;
    this.goalPoint = null;
  }

  generateMaze() {
    this.reset();
    const gridSize = this.c_handler.width / 9;
    const rows = 9;
    const cols = 9;
    const margin = 10.5;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() < 0.45) {
          let bentuk = Math.random() < 0.5 ? "kotak" : "bulet";
          let x = col * gridSize + gridSize / 2;
          let y = row * gridSize + gridSize / 2;
          let maxSize = gridSize - margin * 2;
          let ukuran = Math.random() * 0.7 + 0.75;
          let bentukUkuran = maxSize * ukuran;

          if (bentuk === "kotak") {
            let width = bentukUkuran * (Math.random() * 0.5 + 0.5);
            let height = bentukUkuran * (Math.random() * 0.5 + 0.5);
            let obj = {
              x: Math.ceil(x - width / 2 + margin / 2),
              y: Math.ceil(y - height / 2 + margin / 2),
              width: Math.ceil(width - margin),
              height: Math.ceil(height - margin),
            };
            this.objects.push(obj);
            this.polygon(
              [
                { x: obj.x, y: obj.y },
                { x: obj.x + obj.width, y: obj.y },
                { x: obj.x + obj.width, y: obj.y + obj.height },
                { x: obj.x, y: obj.y + obj.height },
              ],
              0
            );
          } else {
            let radius = (bentukUkuran - margin) / 2;
            let obj = { x: x, y: y, radius: radius };
            this.objects.push(obj);
            this.lingkaran_polar(x, y, radius, 0);
          }
        }
      }
    }
    this.draw();
  }

  fillBunga1() {
    this.floodFillStack(100, 150, { r: 0, g: 0, b: 0 }, { r: 102, g: 102, b: 255 });
    this.floodFillStack(200, 150, { r: 0, g: 0, b: 0 }, { r: 102, g: 102, b: 255 });
    this.floodFillStack(150, 100, { r: 0, g: 0, b: 0 }, { r: 102, g: 102, b: 255 });
    this.floodFillStack(150, 200, { r: 0, g: 0, b: 0 }, { r: 102, g: 102, b: 255 });
  }

  fillBunga2() {
    this.floodFillStack(325, 150, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(425, 150, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(375, 100, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(375, 200, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(325, 100, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(425, 200, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(325, 200, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
    this.floodFillStack(425, 100, { r: 0, g: 0, b: 0 }, { r: 204, g: 102, b: 255 });
  }

  fillBunga3() {
    this.floodFillStack(550, 150, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(650, 150, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(600, 100, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(600, 200, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(630, 200, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(630, 170, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(570, 100, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(570, 130, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(630, 100, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(630, 130, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(570, 200, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
    this.floodFillStack(570, 170, { r: 0, g: 0, b: 0 }, { r: 255, g: 102, b: 204 });
  }

  setPoint(x, y) {
    if (!this.startPoint) {
      this.startPoint = { x, y };
      this.titik(x, y, { r: 0, g: 0, b: 255 });
    } else if (!this.midPoint) {
      this.midPoint = { x, y };
      this.titik(x, y, { r: 0, g: 255, b: 0 });
    } else if (!this.goalPoint) {
      this.goalPoint = { x, y };
      this.titik(x, y, { r: 255, g: 0, b: 0 });
    } else {
      this.reset();
      this.startPoint = { x, y };
      this.titik(x, y, { r: 0, g: 0, b: 255 });
    }
    this.draw();
  }

  findPath() {
    if (this.startPoint && this.midPoint && this.goalPoint) {
      this.garis(this.startPoint.x, this.startPoint.y, this.midPoint.x, this.midPoint.y, { g: 100 });
      this.garis(this.midPoint.x, this.midPoint.y, this.goalPoint.x, this.goalPoint.y, { g: 100 });
      this.draw();
    } else {
      alert("Masukan 3 titik hehe");
    }
  }

  isObject(x, y) {
    for (let obj of this.objects) {
      if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height) {
        return true;
      }
    }
    return false;
  }
}
