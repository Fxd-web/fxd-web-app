import $http from './services';
import Api from './api/';
import * as types from '../../src/store/mutation-types/'
import * as store from '../../src/store/'
import { Toask } from 'fxd-components-example'
let commit = store.default.commit;


/**
 * 再次过滤flag
 * @param api 地址
 * @param data 参数
 * @returns {Promise}
 */
const filter_information_flag = (api, data) => {
  return new Promise(function (resolve, reject) {
    $http('post', api, data, true, true).then(json=>{
      json.flag = '0019';
      if (json.flag !== '0000') {
        Toask(json.msg);
        resolve(json);
      }else{
        resolve(json.result);
        commit('NEXT_PAGE','information');
      }
    })
  })

}


const get_customer_authInfo_schedule = () => {
  return $http('post', Api.getCustomerAuthInfoSchedule);
};

const get_customer_base = () => {
  return $http('post', Api.getCustomerBase)
};

const get_dict_code_list = (type) => {
  return $http('post', Api.dictionary, type)
};

const get_region_byOrder_H5List = () => {
  return $http('post', Api.addrList)
};

const get_customer_carrer = () => {
  return $http('post', Api.getCustomerCarrer)
};


const get_carrier_name_by_mobile = () => {
  return $http('post', Api.getCarrierNameByMobile)
};

const submit_zhima_credit_auth = (data) => {
  return $http('post', Api.submitZhimaCreditAuth, data)
};

const auth_mobile_phone = () => {
  return filter_information_flag(Api.authMobilePhone, {code: 1})
};


const save_customer_auth_mobile = (data) => {
  return filter_information_flag(Api.saveCustomerAuthTcMobile, data)
};


const save_customer_carrer = (data) => {
  return filter_information_flag(Api.saveCustomerCarrer, data)


  // return $http('post', Api.saveCustomerCarrer, data, true, true).then(json=>{
  //   if (json.flag !== '0000') {
  //     Toask(json.msg);
  //     return false
  //   }
  //   return json.result
  // })
};

const save_customer_contact_info = (data) => {
  return filter_information_flag(Api.saveCustomerContactInfo, data)

  // return $http('post', Api.saveCustomerContactInfo, data, true, true).then(json=>{
  //   if (json.flag !== '0000') {
  //     Toask(json.msg);
  //     return false
  //   }
  //   return json.result
  // })
};

const save_customer_base_info = (data) => {
  return filter_information_flag(Api.saveCustomerBaseInfo, data)


  // return $http('post', Api.saveCustomerBaseInfo, data, true, true).then(json=>{
  //   if (json.flag !== '0000') {
  //     Toask(json.msg);
  //     return false
  //   }
  //   return json.result
  // })
};


const save_customerIDInfoH5 = (data) => {
  return filter_information_flag(Api.saveCustomerIDInfoH5, data)


  // return $http('post', Api.saveCustomerIDInfoH5, data, true, true).then(json => {
  //   if (json.flag !== '0000') {
  //     Toask(json.msg);
  //     return false
  //   }
  //   return json.result
  // })
};

const save_uploadFileBase64 = (data) => {
  filter_information_flag(Api.uploadFileBase64, data)


  // return $http('post', Api.uploadFileBase64, data, true, true).then(json => {
  //   if (json.flag !== '0000') {
  //     Toask(json.msg);
  //     return false
  //   }
  //   return json.result
  // })
};




export {
  get_customer_authInfo_schedule,
  get_customer_base,
  get_dict_code_list,
  get_region_byOrder_H5List,
  get_customer_carrer,
  save_customerIDInfoH5,
  save_uploadFileBase64,
  get_carrier_name_by_mobile,
  save_customer_base_info,
  save_customer_contact_info,
  save_customer_carrer,
  auth_mobile_phone,
  save_customer_auth_mobile,
  submit_zhima_credit_auth,
};
