import $http from './services';
import Api from './api/';

const get_limitProductlistApi = ()=>{
  return $http('post', Api.getLimitProductlistApi)
}


const get_queryLoanRecordList = ()=>{
  return $http('post', Api.queryLoanRecordApi)
}

const get_banner = ()=>{
  return $http('post', Api.topBanner, {
    position_:1,
    plate_:1,
    channel_:3
  })
}

export {
  get_limitProductlistApi,
  get_queryLoanRecordList,
  get_banner
};
