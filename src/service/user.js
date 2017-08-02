import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('post', Api.login, params)
}

const user_logout = ()=>{
  return $http('post', Api.logout)
}

export {
  user_login,
  user_logout
};
