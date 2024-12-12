export default class KeyboardHelper {
  constructor(scene) {
    this.keys = {};
    document.body.addEventListener("keydown", (ev) => this.on_key_down(ev));
    document.body.addEventListener("keyup", (ev) => this.on_key_up(ev));
  }
  on_key_down(ev) {
    this.keys[ev.key] = true;
  }
  on_key_up(ev) {
    this.keys[ev.key] = false;
  }
}
