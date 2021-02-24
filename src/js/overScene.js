// const w = window.innerWidth;
// const h = window.innerHeight;
const startBtn = document.getElementById('start');
const againBtn = document.getElementById('again');
const maskEle = document.getElementById('mask')

function createError (num) {
  console.log(num, 'num .. ..')
  throw new Error('手动抛出一个错误')
}
export function bindMaskEvent (startFn) {
  // 游戏开始
  startBtn.onclick = () => {
    maskEle.classList.add('running')
    if (!window.isRun) {
      window.isRun = true
      startFn()
    }
    createError(Math.random())
  }
// 重新开始
  againBtn.onclick = () => {
    window.location.reload()
  }
}

export function gameover () {
  maskEle.classList.remove('running')
  maskEle.classList.add('game-over')
}


// class OverScene {
//   constructor(ctx) {
//     this.ctx = ctx;
//   }
//   draw() {
//     // 为了防止影响全局状态，所以先save再restore
//     this.ctx.save();

//     const canvasWidth = this.ctx.canvas.width;
//     const canvasHeight = this.ctx.canvas.height;
//     this.ctx.fillStyle = 'rgba( 100, 100, 100, 0.8 )';
//     this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
//     this.ctx.textAlign = 'center';
//     this.ctx.textBaseline = 'middle';
//     this.ctx.fillStyle = 'red';
//     this.ctx.font = '900 40px 微软雅黑';
//     this.ctx.fillText('GAME OVER!!!', (w < canvasWidth ? w : canvasWidth) / 2, (h > canvasHeight ? h : canvasHeight) / 2);
//     this.ctx.restore();
//   }
// }
