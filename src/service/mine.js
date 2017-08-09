import $http from './services';
import Api from './api/';

const user_login = (params)=>{
  return $http('post', Api.login, params)
};
/**
 * 获取借款记录
 */
const get_LoanList = (params)=>{
  return $http('post',Api.getLoanList,params)
};
/**
 * 获取借款进度
 */
const query_LoanStatus = (params)=>{
  return $http('post',Api.queryLoanStatus,(params))
};
/**
 * 获取用户产品列表
 */
const get_LimitProductlistApi = (params)=>{
  return $http('post',Api.getLimitProductlistApi,(params))
};
/**
 * 获取红包
 */
const get_coupon = (params)=>{
  return $http('post',Api.getcoupon,(params))
};
/**
 * 获取借款记录
 */
const get_BankInfo = (params)=>{
  return $http('post',Api.getBankInfo,(params))
};
/**
 * 获取字典对照值
 */
const get_DictCode = (params)=>{
  return $http('post',Api.getDictCode,(params))
};
/**
 * 获取活动规则
 */
const get_RecomfrInfoApi = (params)=>{
  return $http('post',Api.getRecomfrInfoApi,(params))
};


export {
  user_login,
  get_LoanList,
  get_coupon,
  get_LimitProductlistApi,
  query_LoanStatus,
  get_BankInfo,
  get_DictCode,
  get_RecomfrInfoApi
};
