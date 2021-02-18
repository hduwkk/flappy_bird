/*
 * 管道的特点：
 * 1、成对出现，所以x轴可以共享，但是y轴不共享
 * 2、上下管道之间的路径固定，可以由用户指定
 * 3、管道的高度是随机生成的，随机生成上管道的高度，下管道就可以计算了
 * 4、当管道走出画布，从右边出来时，高度需要重新随机生成
 * */
function between(m, n) {
  m = m <= n ? m : [n, (n = m)][0];
  return Math.floor(Math.random() * (n - m + 1) + m)
}
class Pipe {
  static len = 0;
  /**
   * 管道
   * @param {Context} ctx - 绘图环境
   * @param {Image} imgDown - 口朝下的管道，在画布的上面
   * @param {Image} imgUp - 口朝上的管道，在画布的下面
   * @param {number} space - 上下管道的间距
   * @param {number} landHeight - 大地的高度
   * @param {number} speed - 速度
   */
  constructor(ctx, imgDown, imgUp, space, landHeight, speed) {
    this.ctx = ctx;
    this.imgDown = imgDown;
    this.imgUp = imgUp;
    this.space = space;
    this.landHeight = landHeight;
    this.speed = speed;
    // 管道最小高度
    this.minHeight = 100;
    // 管道默认的宽高
    this.width = this.imgDown.width;
    this.height = this.imgDown.height;
    Pipe.len++;
    this.x = 300 + this.width * 3 * (Pipe.len - 1);
    this.y = 0;
    // 初始化管道的坐标
    this._init();
  }
  _init() {
    // 单个管道的最大高度
    const maxHeight =
      this.ctx.canvas.height - this.landHeight - this.space - this.minHeight;

    // 随机生成上管道的高度在 minHeight 到 maxHeight 之间
    const randomHeight = between(this.minHeight, maxHeight)

    // 上面管道的y轴坐标 = 随机生成的高度 - 管道默认的高度
    this.downY = randomHeight - this.height;

    // 下面管道的y轴坐标 = 随机生成的高度 + 上下管道的间隔
    this.upY = randomHeight + this.space;
  }
  draw() {
    this.ctx.drawImage(this.imgDown, this.x, this.downY);
    this.ctx.drawImage(this.imgUp, this.x, this.upY);
    this._drawPath();
  }
  _drawPath() {
    this.ctx.rect(this.x, this.downY, this.width, this.height);
    this.ctx.rect(this.x, this.upY, this.width, this.height);
  }
  update() {
    this.x -= this.speed;

    // 管道走出画布，向右拼接，同时重新生成高度
    if (this.x <= -this.width) {
      this._init();
      this.x += this.width * 3 * Pipe.len;
    }
  }
}

export function getPipe(ctx, imgDown, imgUp, space, landHeight, speed) {
  return new Pipe(ctx, imgDown, imgUp, space, landHeight, speed);
}
