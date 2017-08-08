import $http from './services';
import Api from './api/';

const get_queryLoanRecordList = ()=>{
  return $http('post', Api.queryLoanRecordApi)
}

const get_banner = ()=>{
  return $http('post', Api.topBanner, {
    position_:1,
    plate_:1,
    channel_:3
  })
};

const send_SMS = (mobile_phone_)=>{
  return $http('post', Api.sendSMS, {
    mobile_phone_:mobile_phone_,
    flag:'MSG_LOGIN_'
  })
};


export {
  get_queryLoanRecordList,
  get_banner,
  send_SMS
};
