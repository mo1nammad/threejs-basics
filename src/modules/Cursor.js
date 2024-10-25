class Cursor {
  x = 0;
  y = 0;

  constructor(width, height) {
    if (!width || !height) throw new Error("enter width and height");

    this.height = height;
    this.width = width;
  }

  setAxis(x, y) {
    this.x = x / this.width - 0.5;
    this.y = y / this.height - 0.5;
  }
}

export default Cursor;
