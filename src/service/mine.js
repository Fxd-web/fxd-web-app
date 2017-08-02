import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('post', Api.login, params)
};
const get_LoanList =(params)=>{
  return $http('post',Api.getLoanList,params)
};
export {
  user_login,
  get_LoanList,
};
