/**
 * Created by gxx on 17/1/17.
 */

/**
 * 判断非空对象
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
export function isEmptyObj (obj) {
  if(!obj){
    return !0;
  }
  let i = 0;
  for(let k in obj){
    i++
  }
  return !i
}

/**
 * 加载loading
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
export function loading (data) {
  try{
    let loading =  document.getElementById('loading');
    loading.setAttribute('class',!data?'loading dis':'loading');
  }
  catch (err){
    // console.log(err)
  }
}



/**
 * 压缩图片
 *
 * @param {Object} file
 * @return {Promise}
 */
export function compress (file) {
  return new Promise(function (resolve,reject) {
    let FR = new FileReader();
    FR.onload = function(){
      if((file[0].size / 1024)<500){// 小余500kb不压缩
        resolve(this.result);
      }else{
        let canvas = document.createElement('canvas');

        let img = new Image();

        img.onload = function(){
          let multiple = img.width/700;// 设置高度的缩放比例

          img.width = 700;
          img.height = img.height/multiple;

          let ctx = canvas.getContext("2d");

          ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
          canvas.width = img.width;
          canvas.height = img.height;
          //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 将图像绘制到canvas上
          resolve(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
        };
        img.src = this.result;
      }
    };

    FR.readAsDataURL(file[0]);//先注册onload，再读取文件内容，否则读取内容是空的
  });

}
