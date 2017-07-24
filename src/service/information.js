import $http from './services';
import Api from './api/';
import * as types from '../../src/store/mutation-types/'
import * as store from '../../src/store/'
let commit = store.default.commit;

const get_customer_authInfo_schedule = () => {
  return $http('post', Api.getCustomerAuthInfoSchedule);
}

const get_customer_base = () => {
  return $http('post', Api.getCustomerBase)
}

const get_dict_code_list = (type) => {
  return $http('post', Api.dictionary, type)
}

const get_region_byOrder_H5List = () => {
  return $http('post', Api.addrList)
}

const get_customer_carrer = () => {
  return $http('post', Api.getCustomerCarrer)
}


const save_customerIDInfoH5 = (data) => {
  return $http('post', Api.saveCustomerIDInfoH5, data).then(json => {
    if (json.flag !== '0000') {
      commit(types.TOGGLE_MASK, json.msg);
      return false
    }
    return json
  })
}


export {
  get_customer_authInfo_schedule,
  get_customer_base,
  get_dict_code_list,
  get_region_byOrder_H5List,
  get_customer_carrer,
  save_customerIDInfoH5,
};
