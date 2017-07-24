import Vue from 'vue'
import * as types from '../mutation-types/'

export default {
    state:{
      product:[],
    },
    mutations: {
        [types.GET_APPLY_STATUS](state, product) {
          state.product = product
        },
    },
}

