import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/'
import actions from './actions/'
import getters from './getters'
import state from './store'
import module from './modules/'


//模块设置别名
const user = module.user;
const dictionary = module.dictionary;
const caseStatus = module.caseStatus;
const customer = module.customer;
const mine = module.mine;
const product = module.product;
const information = module.information;

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
    dictionary,
    caseStatus,
    customer,
    mine,
    product,
    information,
  }
})

