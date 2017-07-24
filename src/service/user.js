import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('get', Api.login, params)
}

export {
  user_login,
};
