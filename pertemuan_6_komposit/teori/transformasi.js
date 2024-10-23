export class TransformasiMatriks {
  static matriksIdentitas() {
    let identitas = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    return identitas;
  }

  static mutiplyMatrix(m1, m2) {
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

  static createTranslasi(tx, ty) {
    let translasi = [
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1],
    ];

    return translasi;
  }

  static createSkala(sx, sy) {
    let skala = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ];

    return skala;
  }

  static createRotasi(theta) {
    let rotasi = [
      [Math.cos(theta), -Math.sin(theta), 0],
      [Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1],
    ];

    return rotasi;
  }

  static rotasiFixPoint(xc, yc, theta) {
    let m1 = this.createTranslasi(-xc, -yc);
    let m2 = this.createRotasi(theta);
    let m3 = this.createTranslasi(xc, yc);

    let hasil = this.mutiplyMatrix(m3, m2);
    hasil = this.mutiplyMatrix(hasil, m1);

    return hasil;
  }

  static skalaFixPoint(xc, yc, sx, sy) {
    let m1 = this.createTranslasi(-xc, -yc);
    let m2 = this.createSkala(sx, sy);
    let m3 = this.createTranslasi(xc, yc);

    let hasil = this.mutiplyMatrix(m3, m2);
    hasil = this.mutiplyMatrix(hasil, m1);

    return hasil;
  }

  static transformasiTitik(titik_lama, m) {
    let x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
    let y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

    return { x: x_baru, y: y_baru };
  }

  static transformasiArray(array_titik, m) {
    let hasil = [];

    for (let i = 0; i < array_titik.length; i++) {
      let titik_hasil;
      titik_hasil = this.transformasiTitik(array_titik[i], m);
      hasil.push(titik_hasil);
    }

    return hasil;
  }
}
