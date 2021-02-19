class Score {
  constructor (ctx, imgObj) {
    this.ctx = ctx
    this.imgObj = imgObj
  }
  update () {}
  draw () {
    const score = this.ctx['_score'] || 0
    let color = '#fff'
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color;
    this.ctx.font = '900 30px 微软雅黑';
    this.ctx.fillText(score, this.imgObj.bird.width / 3, this.imgObj.bird.height);
    this.ctx.restore();
  }
}

export function getScore (ctx, imgObj) {
  return new Score(ctx, imgObj)
}
