/**
 * Created by gxx on 16/12/7.
 */
import 'whatwg-fetch';
import * as types from '../mutation-types/';
import config from '../../config';
import des from '../../lib/des3.js';
import Api from '../../service/api/';
import { loading, productProcess } from '../../util';

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
 * @param  {String} options.commit query参数
 * @param  {String} options.isShowMsg  是否需要带juid
 * @param  {String} options.bool  是否显示msg信息
 * @return {Promise}               Promise
 *
 */
const filterFlag = (json, commit, msg, bool) => {
  return new Promise(function (resolve, reject) {
    loading(0);
    if (!!bool) {
      return false
    }
    (typeof msg !== 'boolean') && commit(types.TOGGLE_MASK, json.msg);
    json.flag == '0000' ? resolve(json) : reject(json) || commit(types.NEXT_PAGE, 'login');
  })
}



/**
 * 服务器异常处理
 * @param  {String} options.error  错误信息
 * @param  {String} options.commit  commit
 * @return {Promise}               Promise
 */
const serverError = (error, commit) => {
  loading(0);
  commit(types.TOGGLE_MASK, '服务器君睡着咯,请您耐心等待!');
  return Promise.reject(new Error(error));
}


/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @param  {String} options.bool  是否需要带juid
 * @return {Promise}               Promise
 */
const _get = (url, query, bool) => {
  loading(1);
  let _url = !!query && !!bool ? `${config.url}${url}` : `${config.url}${url}?${transformRequest(JSON.parse(localStorage.user))}`;
  return fetch(_url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};


/**
 * post请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @param  {String} options.bool  是否需要带juid
 * @return {Promise}        Promise
 */
const _post = (url, params, bool) => {
  loading(1);
  let _url = !!params && !!bool ? `${config.url}${url}` : `${config.url}${url}?${transformRequest(JSON.parse(localStorage.user))}`;
  return fetch(_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: transformRequest(params),
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};




/**
 * 登录
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const user_login = ({ commit }, record) => {
  record.password_ = des.DES3.encrypt(record.password_);
  record = des.DES3.encrypt(JSON.stringify(record));
  const params = { record };
  return _post(Api.login, params, true)
    .then((json) => {
      filterFlag(json, commit, 1, false)
        .then((json) => {
          commit(types.USER_LOGIN, json.result)
          return commit(types.NEXT_PAGE, 'home');
        })
        .catch((json) => {
          // toggle_login_code({ commit }, json)
        })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 退出登录
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const user_logout = ({ commit }) => {
  return _post(Api.logout)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        commit(types.NEXT_PAGE, 'login');
        return commit(types.USER_LOGOUT, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};


/**
 * 验证码图片
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const user_picCode = ({ commit }) => {
  return _get(Api.picCode, null, true)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.USER_PIC_CODE, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};


/**
 * 注册手机验证码
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const user_phoneCode = ({ commit }, data) => {
  return _post(Api.phoneCode, data, true)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.USER_PHONE_CODE, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};


/**
 * 找回密码手机验证码
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const user_picCodeH5 = ({ commit }, data) => {
  return _post(Api.picCodeH5, data, true)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.USER_PHONE_CODE, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};

/**
 * 获取页面token
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const getPageToken = ({ commit }) => {
  return _get(Api.getPageToken)
    .then((json) => {
      filterFlag(json, commit);
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 更新最后登录
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */
const updateLastLongitudeAndLatitude = ({ commit }) => {
  return _get(Api.updateLastLongitudeAndLatitude)
    .then((json) => {
      filterFlag(json, commit);
    })
    .catch((error) => {
      serverError(error, commit);
    });
};


/**
 * 注册
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const user_register = ({ commit }, record) => {
  let pageTokenKey = record.pageToken.pageTokenKey;
  let pageTokenVal = record.pageToken.pageTokenVal;
  delete record.pageToken;
  record.password_ = des.DES3.encrypt(record.password_);
  record = des.DES3.encrypt(JSON.stringify(record));
  const params = { record, pageTokenKey, pageTokenVal };
  return _post(Api.register, params, true)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.USER_REGISTER, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 找回密码
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const user_forgetPwd = ({ commit }, record) => {
  delete record.pageToken;
  record.password_ = des.DES3.encrypt(record.password_);
  record = des.DES3.encrypt(JSON.stringify(record));
  const params = { record };
  return _post(Api.forgetPwd, params, true)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.USER_FORGETPWD, json);
      })
    })
    .catch((error) => {
      serverError(error, { commit });
    });
};



/**
 * 获取字典城市数据
 */

const fetch_addrList = ({ commit }) => {
  return _post(Api.addrList)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.FETCH_ADDR_LIST, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取地址code
 */

const get_regionCodeByName = ({ commit }, data) => {
  return _post(Api.getRegionCodeByName, data)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.GET_REGIONCODEBYNAME, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取字典对照值
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const fetch_dict_code = ({ commit }, data) => {
  let record = des.DES3.encrypt(JSON.stringify({ data }));
  const params = { record };
  return _post(Api.getDictCode, params)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.FETCH_DICTCODE, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取字典数据
 */

const fetch_dictionary = ({ commit }, type) => {
  let record = des.DES3.encrypt(JSON.stringify({ dict_type_: type }));
  const params = { record };
  return _post(Api.dictionary, params)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.FETCH_DICTIONARY, {
          type,
          res: json.result,
        });
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取用户信息
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const fetch_customer_base = ({ commit }) => {
  return _post(Api.customerBase)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.FETCH_CUSTOMER_BASE, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取进件状态
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const fetch_case = ({ commit }, product_id_) => {
  const params = { product_id_ };
  return _post(Api.fetchcase, params)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        commit(types.NEXT_PAGE, 'case/userInfo')
        return commit(types.FETCH_CASE, json);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};




/**
 * 获取银行卡列表
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const get_bankInfo = ({ commit }) => {
  return _post(Api.getBankInfo)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.GET_BANKINFO, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};





/**
 * 获取活动规则
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const get_recomfr_info = ({ commit }) => {
  return _post(Api.getRecomfrInfoApi)
    .then((json) => {
      filterFlag(json, commit, false).then((json) => {
        return commit(types.GET_RECOMFR_INFO, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取借款记录
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}
 * @param  {Number}
 * @return {Promise}                  Promise
 */

const get_loanList = ({ commit }) => {
  return _post(Api.getLoanList)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.GET_LOANLIST, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};


/**
 * 获取进件状态
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String}   options.data.product_id_ 产品id
 * @param  {Number}   options.data.linkto  是否跳转到响应的页面由productProces函数处理
 * @return {Promise}                  Promise
 */

const get_applyStatus = ({ commit }, data) => {
  let params = data.product_id_ ? { product_id_: data.product_id_ } : null;
  return _post(Api.getApplyStatus, params)
    .then((json) => {
      filterFlag(json, commit, false).then((json) => {
        commit(types.GET_APPLY_STATUS, json.result)
        if (data.linkto) {
          const dataBack = productProcess(json.result);
          typeof dataBack === 'string' ? commit(types.NEXT_PAGE, dataBack) : commit(types.TOGGLE_MASK, dataBack.msg);
        }
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 查询用户信息认证录入进度
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const get_customer_authInfo_schedule = ({ commit }) => {
  return _post(Api.getCustomerAuthInfoSchedule)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        commit(types.GET_CUSTOMER_AUTHINFO_SCHEDULE, json.result)
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取客户信息
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const get_customerBase = ({ commit }) => {
  return _post(Api.getCustomerBase)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.GET_CUSTOMERBASE, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 保存客户信息
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const save_customerBaseInfo = ({ commit }, data) => {
  let record = des.DES3.encrypt(JSON.stringify(data));
  const params = { record };
  return _post(Api.saveCustomerBaseInfo, params)
    .then((json) => {
      filterFlag(json, commit).then(() => {
        return commit(types.NEXT_PAGE, 'information');
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 上传身份证图片信息
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const save_customerIDInfoH5 = ({ commit }, data) => {
  let record = des.DES3.encrypt(JSON.stringify(data));
  const params = { record };

  return _post(Api.saveCustomerIDInfoH5, params)
    .then((json) => {
      filterFlag(json, commit).then((json) => {
        return commit(types.SAVE_CUSTOMERIDINFOH5, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 保存联系人
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const save_customerContactInfo = ({ commit }, data) => {
  let record = des.DES3.encrypt(JSON.stringify(data));
  const params = { record };
  return _post(Api.saveCustomerContactInfo, params)
    .then((json) => {
      filterFlag(json, commit).then(() => {
        return commit(types.NEXT_PAGE, 'information');
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 获取客户职业信息
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const get_customerCarrer = ({ commit }) => {
  return _post(Api.getCustomerCarrer)
    .then((json) => {
      filterFlag(json, commit).then(() => {
        return commit(types.GET_CUSTOMERCARRER, json.result);
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



/**
 * 保存客户职业信息
 *
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 *
 */

const save_customerCarrer = ({ commit }, data) => {
  let record = des.DES3.encrypt(JSON.stringify(data));
  const params = { record };
  return _post(Api.saveCustomerCarrer, params)
    .then((json) => {
      filterFlag(json, commit).then(() => {
        return commit(types.NEXT_PAGE, 'information');
      })
    })
    .catch((error) => {
      serverError(error, commit);
    });
};



export default {
  user_login,
  user_logout,
  user_picCode,
  user_picCodeH5,
  user_phoneCode,
  user_register,
  user_forgetPwd,
  fetch_customer_base,
  getPageToken,
  fetch_addrList,
  get_regionCodeByName,
  fetch_dict_code,
  fetch_dictionary,
  updateLastLongitudeAndLatitude,
  fetch_case,
  get_bankInfo,
  get_recomfr_info,
  get_loanList,
  get_applyStatus,
  get_customer_authInfo_schedule,
  get_customerBase,
  save_customerBaseInfo,
  save_customerIDInfoH5,
  save_customerContactInfo,
  get_customerCarrer,
  save_customerCarrer
};


