import * as types from '../mutation-types/'

export default {
    state:{
      bank:[],
      recomfrInfo:[],
      loanList:[],
    },
    mutations: {
        [types.GET_BANKINFO](state, banklist) {
          state.bank = banklist;
        },
        [types.GET_RECOMFR_INFO](state, data) {
          state.recomfrInfo = data.list;
        },
        [types.GET_LOANLIST](state, data) {
          state.loanList = data;
        },
    },
}
