import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import * as filters from './filters'
import routers from './routers';
import './css/transition.css';

import FxdUi from 'fxd-components-example';
for(let i of Object.keys(FxdUi).filter((t,i)=>i>1)){ //给所有组件加上fxd前缀
  Vue.component('fxd'+i, FxdUi[i])
}

//注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

//引入路由
Vue.use(VueRouter)

const router = new VueRouter(routers);

//设置页面的title
router.beforeEach((to, from, next) => {
  try{
    if(localStorage.user===undefined||localStorage.user==''){
       if(to.path!=='/login'){
        location.replace('login');
      }else{
        next();
      }
    }else{
      next();
    }
  }catch (e){

  }

})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
