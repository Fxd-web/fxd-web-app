import Vue from 'vue'
import * as types from '../mutation-types/'
import * as store from '../../store'
import { Toask } from 'fxd-components-example'

export default {
    state:{
      customerCarrer:{},
      information:{},
      customerBase:{},
      customerIDInfo:{
        front:false,
        back:false,
        customer_name_:'',
        id_code_:'',
      }
    },
    mutations: {
        [types.SAVE_CUSTOMERIDINFOH5](state, res) {
          state.customerIDInfo[!res.side?'front':'back'] = !state.customerIDInfo[!res.side?'front':'back'];
          if(!res.side&&!!res.result){
            state.customerIDInfo.customer_name_ = res.result.customer_name_;
            state.customerIDInfo.id_code_ = res.result.id_code_;
          }
        },
        [types.GET_CUSTOMERBASE](state, customerBase) {
          state.customerBase = customerBase;
        },
        [types.GET_CUSTOMER_AUTHINFO_SCHEDULE](state, information) {
          state.information = information;
        },
        [types.GET_CUSTOMERCARRER](state, customerCarrer) {
          state.customerCarrer = customerCarrer;
        },
        [types.INFORMATION_LINKTO](state, data) {
          let _state = store.default.state;
          let commit = store.default.commit;
          let nextStep = data.nextStep ;
          if(nextStep>=(data.index+1)||nextStep==-1){
            _state.nextPage = data.item.link;
          }
          else if(nextStep == -2){
            Toask('当前状态无法修改资料!')
          }
          else{
            Toask(`请选择${data.list[nextStep-1].title}`)
          }
        },
    },
}
