import {getSky} from './sky'
import {getLand} from './land'
import {getPipe} from './pipe'

console.log(getSky, '...')

class Scene {
  constructor(ctx, imgObj) {
    this.ctx = ctx;
    this.imgObj = imgObj;
    // 听众队列
    this.listeners = [];
    // 该场景所需的所有角色
    this.roles = [];
    this._initRoles();
  }
  _roleGenerator(length, fn) {
    for (let i = 0; i < length; i++) {
      this.roles.push(fn(this.ctx, this.imgObj))
    }
  }
  _between(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
  }
  _initRoles() {
    // 背景2个
    this._roleGenerator(2, (ctx, {sky}) => new getSky(ctx, sky))
    // 管道6个
    this._roleGenerator(6, (ctx, imgs) => new getPipe(ctx, imgs.pipeDown, imgs.pipeUp, 220, imgs.land.height, 3))
    // 大地4个
    this._roleGenerator(4, (ctx, {land}) => new getLand(ctx, land, 3))
    // 创建鸟
  }
  // 添加听众
  addListener(listener) {
    this.listeners.push(listener);
  }
  // 监听小鸟死亡
  triggerBirdOver() {
    // 死亡时告知所有的听众
    this.listeners.forEach(function (liste) {
      liste();
    });
  }
  // 让所有的角色开始表演( 开始游戏 )
  draw() {
    this.roles.forEach(role => {
      role.update();
    })
    this.roles.forEach(role => {
      role.draw();
    })
  }
}

export function getGameScene (ctx, imgObj) {
  return new Scene(ctx, imgObj)
}
