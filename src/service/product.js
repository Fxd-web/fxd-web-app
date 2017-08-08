import $http from './services';
import Api from './api/';
import { Toask } from 'fxd-components-example';

const get_limitProductlistApi = ()=>{
  return $http('post', Api.getLimitProductlistApi, '' , true, true).then(json =>{
    if(json.flag!=='0000'){
      Toask(json.msg)
    }else{
      return json.result
    }
  })
}

const get_apply_status = (params)=>{
  return $http('post', Api.getApplyStatus, params)
}

const get_product_info = (params)=>{
  return $http('post', Api.getProductInfo, params)
}

const create_application = (params)=>{
  return $http('post', Api.createApplication, params)
}

export {
  get_limitProductlistApi,
  get_apply_status,
  get_product_info,
  create_application
};
