import $http from './services';
import Api from './api/';

const get_apply_status = (params)=>{
  return $http('post', Api.getApplyStatus, params)
}

export {
  get_apply_status,
};
