import $http from './services';
import Api from './api/';
import { Toask } from 'fxd-components-example';

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

const send_SMS = (params)=> {
  return $http('post', Api.sendSMS, params, true, true).then(json=> {
    Toask(json.msg);
    return json
  })
};


const send_SMS_imgCode = (params)=> {
  return $http('post', Api.sendSMSH5, params, true, true).then(json=> {
    Toask(json.msg);
    return json
  })
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
