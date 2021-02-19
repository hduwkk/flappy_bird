import util from './js/util'
import { getGameScene } from './js/gameScene'
import { bindMaskEvent, gameover } from './js/overScene'

import bridImg from './imgs/bird.png'
import landImg from './imgs/land.png'
import pipeDownImg from './imgs/pipeDown.png'
import pipeUpImg from './imgs/pipeUp.png'
import skyImg from './imgs/sky.png'


const cvs = document.querySelector('#cvs')
const ctx = cvs.getContext('2d')

const images = new Map()
images.set('bird', bridImg)
images.set('land', landImg)
images.set('pipeDown', pipeDownImg)
images.set('pipeUp', pipeUpImg)
images.set('sky', skyImg)
console.log('images ... ...')

util.loadImage(images, init)

function init (imgObj) {
  console.log('init .. ..')
  // 根据背景的大小设置画布的大小
  cvs.width = imgObj.sky.width
  cvs.height = imgObj.sky.height

  // 创建游戏场景
  const gameScene = getGameScene(ctx, imgObj)

  // 添加小鸟死亡的听众
  // '#7c7b6e'
  gameScene.addListener(gameover)

  function run () {
    gameScene.draw()
    window.isRun && requestAnimationFrame(run)
  }
  run()
  bindMaskEvent(run)
}
