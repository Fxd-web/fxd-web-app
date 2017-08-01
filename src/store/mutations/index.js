import * as types from '../mutation-types/'
import * as state from '../../store'
let time = null


export default {
  [types.DEAL_VERIFY](state, data) {
    state.deal_verify = data;
  },
  [types.USER_PIC_CODE](state, data) {
    state.picCode.pic_verify_url_ = data.pic_verify_url_;
    state.picCode.id_ = data.id_;
  },
  [types.USER_PHONE_CODE](state, data) {
    state.phoneCode = data;
  },
  [types.NEXT_PAGE](state, path) {
    state.nextPage = path;
  },
  [types.CLEAR_NEXT_PAGE](state) {
    state.nextPage = '';
  },
};
