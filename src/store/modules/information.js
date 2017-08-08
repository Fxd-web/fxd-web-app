import Vue from 'vue'
import * as types from '../mutation-types/'
import * as store from '../../store'
import { Toask } from 'fxd-components-example'

export default {
    state:{
      customerAuthInfo: {},
    },
    mutations: {
        [types.SAVE_CUSTOMERAUTHINFOSCHEDULE](state, customerAuthInfo) {
          state.customerAuthInfo = Object.assign( customerAuthInfo )
        },
        [types.SET_IFFAMILYKNOW](state, bool) {
          Object.assign( state.customerAuthInfo, {
            if_family_know_: bool
          } )
        },
    },
}
