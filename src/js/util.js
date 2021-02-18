export default {
  extend(o1, o2) {
    for (let key in o2) {
      if (Object.prototype.hasOwnProperty.call(o2, key)) {
        o1[key] = o2[key];
      }
    }
  },
  /**
   * 加载图片资源
   * @param {Map} imgUrl - 键值对存储图片资源
   * @param {Function} callBack - 回调函数
   */
  loadImage(imgUrl, callBack) {
    const imgObj = {};
    let tempImg;
    let loaded = 0;
    let imgLength = 0;
    for (let [imgName, src] of imgUrl) {
      imgLength++;
      tempImg = new Image();
      // 所有的图片都加载完毕
      tempImg.onload = () => {
        console.log(imgName, ' onload ')
        loaded++;
        if (loaded >= imgLength) {
          callBack(imgObj);
        }
      };
      tempImg.src = src;
      imgObj[imgName] = tempImg;
      // document.body.appendChild(tempImg)
    }
  }
};
