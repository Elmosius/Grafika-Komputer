import { garis, kotakIsi } from "./lib";

export class Kotak {
  constructor(ctx, x, y, size) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.isHighlighted = false;
  }

  draw() {
    kotakIsi(this.x, this.y, this.size, 0);

    if (this.isHighlighted) {
      this.drawOutline();
    }
  }
  drawOutline() {
    // Gambar outline kotak
    garis(this.x, this.y, this.x + this.size, this.y, 1); // Atas
    garis(this.x + this.size, this.y, this.x + this.size, this.y + this.size, 1); // Kanan
    garis(this.x + this.size, this.y + this.size, this.x, this.y + this.size, 1); // Bawah
    garis(this.x, this.y + this.size, this.x, this.y, 1); // Kiri
  }

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
    this.draw();
  }

  isClicked(mouseX, mouseY) {
    return mouseX >= this.x && mouseX <= this.x + this.size && mouseY >= this.y && mouseY <= this.y + this.size;
  }
}
