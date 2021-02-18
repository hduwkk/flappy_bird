const w = window.innerWidth;
const h = window.innerHeight;
class OverScene {
  constructor(ctx) {
    this.ctx = ctx;
  }
  draw() {
    // 为了防止影响全局状态，所以先save再restore
    this.ctx.save();

    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    this.ctx.fillStyle = 'rgba( 100, 100, 100, 0.8 )';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'red';
    this.ctx.font = '900 40px 微软雅黑';
    this.ctx.fillText('GAME OVER!!!', (w < canvasWidth ? w : canvasWidth) / 2, (h > canvasHeight ? h : canvasHeight) / 2);
    this.ctx.restore();
  }
}

export function getOverScene(ctx) {
  return new OverScene(ctx);
}
