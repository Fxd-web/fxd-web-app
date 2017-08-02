/**
 * Created by gxx on 2017/8/1.
 */
import D from '../lib/des3';

/**
 * localStorage存储加密解密
 * @param type 1加密, 0解密
 * @param key
 * @param value
 * @return 如果是解密返回解密过后的对象
 */
export function storage (type, key, value=localStorage[key]) {
  let res;
  try{
    !type || delete localStorage[key];
    res =  D.DES3[type?'encrypt':'decrypt'](typeof value === 'object'?JSON.stringify(value):value);
  }catch (e){}
  if(!type){
    return JSON.parse(res);
  }else{
    localStorage[key] = res
  }
}

