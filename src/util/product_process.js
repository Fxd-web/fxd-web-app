/**
 * Created by gxx on 17/1/17.
 */

let config_product_Process = {
  apply_flag_:{
    '0000':()=>{
      return 'information';
    },
    '0001':()=>{
      return 'case';
    },
    '0002':()=>{
      return 'case/loan_apply';
    },
    '0003':(data)=>{
      return data
    },
    '0004':function(data){
      return config_product_Process.applyStatus[data.applyStatus](data);
    },
    '0005':(data)=>{
    },
  },
  applyStatus:{
    '1':()=>{
      return 'case/checking';
    },
    '2':()=>{
      return 'case/check_failure';
    },
    '3':()=>{
      return 'case/checking';
    },
    '4':()=>{
      return 'case/loaning';
    },
    '5':()=>{
      return 'case/loaning';
    },
    '6':()=>{
      return 'case/check_failure';
    },
    '7':()=>{
      return 'case/to_the_account.html';
    },
    '8':()=>{
      return 'case/to_the_account.html';
    },
    '9':()=>{
      return false
    },
    '10':()=>{
      return false
    },
    '11':()=>{
      return false
    },
    '12':()=>{
      return {
        msg:'您已提前结清,请明天再申请'
      };
    },
    '13':()=>{
      return {
        msg:'您已结清,请明天再申请'
      };
    },
    '14':()=>{
      return 'case/check_failure';
    },
    '15':()=>{
      return 'case/check_succ';
    },
    '16':()=>{
      return 'case/to_the_account';
    },
    '17':()=>{
      return 'case/checking';
    },
  },
}

/**
 * 进件流程逻辑统一处理
 *
 * @param {Object} pid 产品id
 *
 */

export function productProcess (data) {
  return config_product_Process.apply_flag_[data.apply_flag_](data);
}
