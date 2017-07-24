import Vue from 'vue'
import * as types from '../mutation-types/'

export default {
    state:{
      addrList:{},
      codeByName:{},
    },
    mutations: {
        [types.GET_REGIONCODEBYNAME](state, code) {
          state.codeByName = code;
        },
        [types.FETCH_DICTIONARY](state, data) {
          state[data.type] = data.res;
        },
        [types.FETCH_ADDR_LIST](state, res) {
          state.addrList = res;
        },
    },
}
