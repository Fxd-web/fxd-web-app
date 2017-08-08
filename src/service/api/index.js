/**
 * Created by gxx on 17/2/28.
 */

//注册
const register  = 'esb/register/register.jhtml';

//登录
const login  = 'esb/login/login.jhtml';

//退出登录
const logout  = 'esb/logout/logout.jhtml';

//找回密码
const forgetPwd  = 'esb/findPasswordBack/findPasswordBack.jhtml';

//验证码图片
const picCode  = 'esb/register/getPicCodeApi.jhtml';

//注册手机验证码
const sendSMSH5  = 'esb/common/sendSMSH5.jhtml';

//找回密码手机验证码
const sendSMS  = 'esb/common/sendSMS.jhtml';

//获取页面token
const getPageToken  = 'esb/common/getPageToken.jhtml';

//更新最后登录
const updateLastLongitudeAndLatitude  = 'esb/updateLastLongitudeAndLatitude/updateLastLongitudeAndLatitude.jhtml';

//获取字典城市数据
const addrList  = 'esb/getRegionList/getAllRegionByOrderList.jhtml';

//获取地址code
const getRegionCodeByName  = 'esb/getRegionList/getRegionCodeByName.jhtml';

// 获取字典对照值
const getDictCode  = 'esb/getDictCode/getDictCodeDesc.jhtml';

//获取字典数据
const dictionary  = 'esb/getDictCode/getDictCodeList.jhtml';

//获取用户信息
const customerBase  = 'esb/customer/getCustomerBase.jhtml';

//获取进件状态
const fetchcase  = 'esb/caseInfo/getApplyStatus.jhtml';

// 获取银行卡列表
const getBankInfo  = 'esb/getAccountCardList/getAccountCardList.jhtml';

// 获取活动规则
const getRecomfrInfoApi  = 'esb/ProductProtocol/GetRecomfrInfoApi.jhtml';

// 获取借款记录
const getLoanList  = 'esb/account/loanList.jhtml';

//获取借款进度
const queryLoanStatus = 'esb/caseInfo/queryLoanStatus.jhtml';


// 获取进件
const getApplyStatus  = 'esb/caseInfo/getApplyStatus.jhtml';
// 获取产品信息
const getProductInfo  = 'esb/product/getProductInfo.jhtml';
// 首次进件
const createApplication = 'esb/applicant/createApplication.jhtml';


// 查询用户信息认证录入进度
const getCustomerAuthInfoSchedule  = 'esb/customerAuth/getCustomerAuthInfoSchedule.jhtml';
// 获取客户信息
const getCustomerBase  = 'esb/customer/getCustomerBase.jhtml';
// 保存客户信息
const saveCustomerBaseInfo  = 'esb/customerAuth/saveCustomerBaseInfo.jhtml';
// 上传身份证图片信息
const saveCustomerIDInfoH5  = 'esb/customerAuth/saveCustomerIDInfoH5.jhtml';
// 上传手持身份证
const uploadFileBase64  = 'esb/common/uploadFileBase64.jhtml';
// 保存联系人
const saveCustomerContactInfo  = 'esb/customerAuth/saveCustomerContactInfo.jhtml';
// 获取客户职业信息
const getCustomerCarrer  = 'esb/customer/getCustomerCarrer.jhtml';
// 保存客户职业信息
const saveCustomerCarrer  = 'esb/customer/saveCustomerCarrer.jhtml';
// 获取运营商
const getCarrierNameByMobile = 'esb/getCarrierNameByMobile/getCarrierNameByMobile.jhtml';
// 手机认证结果保存
const authMobilePhone = 'esb/customer/authMobilePhone.jhtml';
// 认证手机天创
const saveCustomerAuthTcMobile = 'esb/customer/saveCustomerAuthTcMobile.jhtml';
// 芝麻信用
const submitZhimaCreditAuth = 'esb/zmxy/submitZhimaCreditAuth.jhtml';



// 首页部分
const getLimitProductlistApi  = 'esb/product/getLimitProductlistApi.jhtml'; // 获取用户产品列表
const queryLoanRecordApi  = 'esb/caseInfo/queryLoanRecordApi.jhtml'; // 首页文字切换
const topBanner  = 'esb/event/topBanner.jhtml'; // 首页banner
export default{
  register,
  login,
  logout,
  forgetPwd,
  picCode,
  sendSMSH5,
  sendSMS,
  getPageToken,
  updateLastLongitudeAndLatitude,
  addrList,
  getRegionCodeByName,
  getDictCode,
  dictionary,
  customerBase,
  fetchcase,
  getBankInfo,
  getRecomfrInfoApi,
  getLoanList,
  getApplyStatus,
  getCustomerAuthInfoSchedule,
  getCustomerBase,
  saveCustomerBaseInfo,
  saveCustomerIDInfoH5,
  saveCustomerContactInfo,
  getCustomerCarrer,
  saveCustomerCarrer,
  getLimitProductlistApi,
  queryLoanRecordApi,
  queryLoanStatus,
  topBanner,
  uploadFileBase64,
  getCarrierNameByMobile,
  authMobilePhone,
  saveCustomerAuthTcMobile,
  submitZhimaCreditAuth,
  getProductInfo,
  createApplication
};
