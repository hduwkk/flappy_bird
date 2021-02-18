class Land {
  static len = 0;
  /**
   * 大地
   * @param {Context} ctx - 绘图环境
   * @param {Image} img - 绘制的图像资源
   * @param {number} speed - 速度
   */
  constructor(ctx, img, speed = 2) {
    this.ctx = ctx;
    this.img = img;
    this.speed = speed;
    Land.len++;
    this.x = this.img.width * (Land.len - 1);
    this.y = this.ctx.canvas.height - this.img.height;
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y);
  }
  update() {
    this.x -= this.speed;
    this.x += this.x <= -this.img.width ? this.img.width * Land.len : 0;
  }
}

export function getLand(ctx, img, speed) {
  return new Land(ctx, img, speed);
}
