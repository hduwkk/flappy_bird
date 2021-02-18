class Bird {
  constructor(ctx, img, widthFrame, heightFrame, x, y) {
    this.ctx = ctx;
    this.img = img;
    this.widthFrame = widthFrame;
    this.heightFrame = heightFrame;
    this.x = x;
    this.y = y;

    // 一个小鸟的宽和高
    this.width = this.img.width / this.widthFrame;
    this.height = this.img.height / this.heightFrame;

    // 当前小鸟渲染的帧数
    this.currentFrame = 0;

    // 小鸟的下落速度
    this.speed = 2;

    // 加速度
    this.speedPlus = 0.05;

    // 绑定事件
    this._bind();
  }
  draw() {
    // 当下落速度为1的时候，旋转10度
    const baseRadian = (Math.PI / 180) * 10;
    const maxRadian = (Math.PI / 180) * 45;

    // 根据速度计算旋转的弧度
    let rotateRadian = baseRadian * this.speed;

    // 限制最大旋转角度为70度
    rotateRadian = rotateRadian >= maxRadian ? maxRadian : rotateRadian;

    this.ctx.save();

    /*
     * 1、平移到小鸟的中心点
     * 2、然后根据下落的速度旋转坐标系
     * 3、绘制小鸟，但是绘制的x和y坐标变为负的宽高一半。
     * */

    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(rotateRadian);
    this.ctx.drawImage(
      this.img,
      this.width * this.currentFrame,
      0,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.ctx.restore();
  }
  update() {
    // 绘制下一帧
    this.currentFrame =
      ++this.currentFrame >= this.widthFrame ? 0 : this.currentFrame;

    // 让小鸟不断下落
    this.y += this.speed;

    // 刷新下落数度
    this.speed += this.speedPlus;
  }
  _bind() {
    var self = this;

    this.ctx.canvas.addEventListener('click', function () {
      self.speed = -1.5;
    });
  }
}

let bird = null;
export function getBird(ctx, img, widthFrame, heightFrame, x, y) {
  // 单利模式,整个游戏只要一个bird就够了
  if (!bird) {
    bird = new Bird(ctx, img, widthFrame, heightFrame, x, y);
  }

  return bird;
}
