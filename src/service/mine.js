import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('post', Api.login, params)
};
const get_LoanList = (params)=>{ //获取借款记录
  return $http('post',Api.getLoanList,params)
};
const query_LoanStatus = (params)=>{ //获取借款进度
  return $http('post',Api.queryLoanStatus,(params))
};
const get_LimitProductlistApi = (params)=>{  // 获取用户产品列表
  return $http('post',Api.getLimitProductlistApi,(params))
};
const get_coupon = (params)=>{  //获取红包
  return $http('post',Api.getcoupon,(params))
};
export {
  user_login,
  get_LoanList,
  get_coupon,
  get_LimitProductlistApi,
  query_LoanStatus,
};
