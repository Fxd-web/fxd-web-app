import $http from './services';
import Api from './api/';
import { Toask } from 'fxd-components-example';

const user_login = (params)=>{
  return $http('post', Api.login, params)
}

const user_logout = ()=>{
  return $http('post', Api.logout)
}

const user_register = (params)=>{
  return $http('post', Api.register, params, true, true)
}

const user_find_password_back = (params)=>{
  return $http('post', Api.forgetPwd, params, true, true).then(json=> {
    Toask(json.msg);
    return json
  })
}

export {
  user_login,
  user_logout,
  user_register,
  user_find_password_back
};
