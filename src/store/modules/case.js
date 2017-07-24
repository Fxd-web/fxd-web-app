import Vue from 'vue'
import * as types from '../mutation-types/'

export default {
    state:{
    },
    mutations: {
        [types.FETCH_CASE](state, caseStatus) {
          state.caseStatus = caseStatus
        },
    },
}
