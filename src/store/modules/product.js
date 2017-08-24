import * as types from '../mutation-types/'
import { Toask } from 'fxd-components-example';


export default {
  state: {
    local_product: '',
    product: [],
    product_case_info: null,
  },
  mutations: {
    [types.SET_LOCAL_PRODUCT](state, product) {
      state.local_product = product;
    },
    [types.SET_PRODUCT](state, product) {
      state.product = product;
    },
    [types.DEAL_REPAYAMOUNT](state, case_info) {
      if(case_info.apply_flag_=='0004' && (case_info.apply_status_=='7'||case_info.apply_status_=='8')){
        location.href=`http://192.168.13.250:8000/page/redirect.html?nothing=${localStorage.USERINFO}`;
        return
      }
      Toask('您当前无需还款!');
    },
    [types.DEAL_PRODUCT_CASE](state, case_info) {
      state.product_case_info = case_info.result || case_info;
      let _store  = require('../store').default;
      let apply_flag_arr = [{
        '0000': function () {
          _store.nextPage = 'information';
        },
        '0001': function () {
          location.href=`http://192.168.13.250:8000/page/redirect.html?nothing=${localStorage.USERINFO}`;
        },
        '0002': function () {
          _store.nextPage = 'information';
        },
        '0003': function () {
          Toask(case_info.msg);
        },
        '0004': function () {
          // location.href=`http://h5.test.fxds/fxd-h5/page/redirect.html?nothing=${localStorage.USERINFO}`;
          location.href=`http://192.168.13.250:8000/page/redirect.html?nothing=${localStorage.USERINFO}`;
          // apply_status_arr.forEach(i=>i[case_info.apply_status_]());
        },
        '0005': function () {
          _store.nextPage = 'loan_apply';
        }
      }];
      // let apply_status_arr = [{
      //   '1': function () {
      //     _store.nextPage = 'caseStatue';
      //   },
      //   '2': function () {
      //     _store.nextPage = 'information';
      //   },
      //   '3': function () {
      //     _store.nextPage = 'information';
      //   },
      //   '4': function () {
      //     _store.nextPage = 'information';
      //   },
      //   '5': function () {
      //     _store.nextPage = 'information';
      //   },
      //   '6': function () {
      //
      //   },
      //   '7': function () {
      //
      //   },
      //   '8': function () {
      //
      //   },
      //   '9': function () {
      //
      //   },
      //   '10': function () {
      //
      //   },
      //   '11': function () {
      //
      //   },
      //   '12': function () {
      //
      //   },
      //   '13': function () {
      //
      //   },
      //   '14': function () {
      //
      //   },
      //   '15': function () {
      //
      //   },
      //   '16': function () {
      //
      //   },
      //   '17': function () {
      //
      //   },
      // }]
      apply_flag_arr.forEach(i=>i[state.product_case_info.apply_flag_]());
    },
  },
}



