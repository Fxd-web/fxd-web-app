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
  [types.TOGGLE_MASK](state, msg) {
    !!time && clearTimeout(time);
    state.dialog.toast = msg || false;
    time = setTimeout(function () {
      state.dialog.toast = false;
    }, 2000)
  },
  [types.TOGGLE_DIALOG](state, type) {
    if (type === 'mask') {
      for (let i of Object.keys(state.dialog)) {
        state.dialog[i] = false;
      }
      return
    }
    state.dialog.mask = !state.dialog.mask;
    state.dialog[type] = !state.dialog[type];
  },
};
