class Sky {
  static len = 0;
  constructor(ctx, img, speed = 2) {
    this.ctx = ctx;
    this.img = img;
    this.width = this.img.width;
    this.height = this.img.height;
    this.speed = speed;
    // 每创建一个实例，len自增
    Sky.len++;

    this.x = this.width * (Sky.len - 1);
    this.y = 0;
  }
  // 绘制背景
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y);
  }
  update() {
    this.x -= this.speed;
    if (this.x <= -this.width) {
      this.x += this.width * Sky.len;
    }
  }
}

export function getSky(ctx, img, speed) {
  return new Sky(ctx, img, speed);
}
