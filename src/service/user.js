import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('post', Api.login, params)
}

const user_logout = ()=>{
  return $http('post', Api.logout)
}

const user_register = (params)=>{
  return $http('post', Api.register, params)
}

export {
  user_login,
  user_logout,
  user_register
};
