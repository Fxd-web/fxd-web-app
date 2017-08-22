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


const send_SMS_imgCode = (params)=>{
  return $http('post', Api.sendSMS, params)
};

const get_pic_code = ()=>{
  return $http('post', Api.picCode, '', true, true)
};



const n_summary = ()=>{
  return $http('get', Api.n_summary, '', true, false, true)
}




export {
  get_queryLoanRecordList,
  get_banner,
  send_SMS,
  get_pic_code,
  send_SMS_imgCode,
  n_summary
};
