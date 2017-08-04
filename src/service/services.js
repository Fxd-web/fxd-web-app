import 'whatwg-fetch';
import config from '../config';
import des from '../lib/des3.js';
import {
  Loading,
  Toask
} from 'fxd-components-example';
import { storage } from '../util';
import * as types from '../../src/store/mutation-types/';
import * as store from '../../src/store/';
let commit = store.default.commit;


/**
 * 字符串序列化
 * @param obj
 * @returns {string}
 */
const transformRequest = (obj) => {
  if (!obj) {
    return '';
  }
  const str = [];
  for (const p of Object.keys(obj)) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
  }
  str.forEach((t, i) => {
    if (t.indexOf('invitation_code') > -1 || t.indexOf('user_id_') > -1) {
      str.splice(i, 1)
    }
  })
  return str.join('&');
};


/**
 * flag过滤
 * @param  {String} options.json   api地址
 * @return {Promise}               Promise
 *
 */
const filterFlag = (json, fltFlag) => {
  Loading.close();
  return new Promise(function (resolve, reject) {
    let flagArr = ['0002', '0003','0005','0016'];
    let flag = json.flag;
    if(fltFlag){
      resolve(json)
      return
    }
    if(~flagArr.indexOf(flag)) {
     Toask(json.msg);
     reject(json);
     setTimeout(function () {
       commit(types.NEXT_PAGE, 'login');
     }, 1000);
    }
    resolve(json.result)
  })
}


/**
 * 服务器异常处理
 * @param  {String} options.error  错误信息
 * @param  {String} options.commit  commit
 * @return {Promise}               Promise
 */
const serverError = (err) => {
  Loading.close();
  commit(types.NEXT_PAGE, 'error');
  Toask('服务器君睡着咯,请您耐心等待!');
  return new Error(err);
}

/**
 * 拼接token
 * @returns {*}
 */
const spliceToken = () => {
  try{
    let data = storage(0, 'USERINFO');
    let juid = data.juid;
    let juidToken = data[`${juid}token`];
    return `juid=${juid}&${juid}token=${juidToken}`
  }catch (e){
    return ''
  }
}

/**
 * ajax服务
 * @param type  类型get或者post
 * @param url   接口地址
 * @param params 参数
 * @param des3  是否加密
 * @param fltFlag  是否过滤flag
 * @returns {Promise}
 */
export default async(type = 'GET', url = '', params = '', des3 = true, fltFlag = false) => {
  Loading.open();
  type = type.toUpperCase();
  url = `${config.url}${url}?${spliceToken()}`;
  let record = '';
  if (des3 && !!params) {
    !!params.password_ && (params.password_ = des.DES3.encrypt(params.password_));
    record = des.DES3.encrypt(JSON.stringify(params));
  }
  if (type == 'GET') {}
  let init = null;
  if (type == 'POST') {
    init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
    if (!!params && Object.prototype.toString.call(params) == '[object Object]') {
      Object.defineProperty(init, 'body', {
        value: transformRequest(params)
      })
    }
  }
  let res = await fetch(url, init)
    .then(res => {
      if (res.status == 200 && res.ok) {
        return res.json();
      }
      return new Error(res.status);
    })
    .catch(err => {
      serverError(err)
    })
  return filterFlag(res, fltFlag);
}
