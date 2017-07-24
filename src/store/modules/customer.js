import Vue from 'vue'
import * as types from '../mutation-types/'

export default {
    state:{
      customer:{}
    },
    mutations: {
        [types.FETCH_CUSTOMER_BASE](state, customer) {
          state.customer = customer;
        },
    },
}
