import util from './js/util';
import { getGameScene } from './js/gameScene';
import { getOverScene } from './js/overScene';

import bridImg from './imgs/bird.png'
import landImg from './imgs/land.png'
import pipeDownImg from './imgs/pipeDown.png'
import pipeUpImg from './imgs/pipeUp.png'
import skyImg from './imgs/sky.png'


const cvs = document.querySelector('#cvs');
const ctx = cvs.getContext('2d');

const images = new Map();
images.set('bird', bridImg);
images.set('land', landImg);
images.set('pipeDown', pipeDownImg);
images.set('pipeUp', pipeUpImg);
images.set('sky', skyImg);
console.log('images ... ...')

util.loadImage(images, init);

function init(imgObj) {
  console.log('init .. ..')
  // 根据背景的大小设置画布的大小
  cvs.width = imgObj.sky.width;
  cvs.height = imgObj.sky.height;

  // 游戏场景是否继续
  let isRun = true;

  // 创建游戏场景
  const gameScene = getGameScene(ctx, imgObj);
  window.gameScene = gameScene
  // 创建游戏结束场景
  const overScene = getOverScene(ctx);

  // 添加小鸟死亡的听众
  gameScene.addListener(function () {
    console.log('gameScene: bird die')
    isRun = false; // 游戏场景退场
    overScene.draw(); // 结束场景切入
  });

  (function run () {
    gameScene.draw();
    isRun && requestAnimationFrame( run );
  }());
}
