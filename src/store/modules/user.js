import Vue from 'vue'
import * as types from '../mutation-types/'

export default {
    state:{
      user:{},
      customer:{},
      user_login_verify_code:false,
    },
    mutations: {
        [types.USER_LOGIN](state, user) {
          state.user = user;
          localStorage.user = JSON.stringify(user);
        },
        [types.TOGGLE_LOGIN_CODE](state, data) {
          state.user_login_verify_code = data.flag=='0005';
        },
        [types.USER_LOGOUT](state) {
          state.user = {};
          delete localStorage.user;
        },
        [types.USER_REGISTER](state, user) {
          state.user = user;
        },
        [types.USER_FORGETPWD](state, user) {
          state.user = user;
        },
        [types.GET_PAGE_TOKEN](state, user) {
          state.user = user;
          localStorage.user = JSON.stringify(user);
        },
        [types.FETCH_CUSTOMER_BASE](state, customer) {
          state.customer = customer;
        },
    },
}
