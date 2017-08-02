import Vue from 'vue'
import VueRouter from 'vue-router'
import LogRocket from 'logrocket'
import store from './store'
import App from './App'
import * as filters from './filters'
import routers from './routers';
import './css/transition.css';
import { storage } from './util'

import FxdUi from 'fxd-components-example';
for(let i of Object.keys(FxdUi).filter((t,i)=>i>1)){ //给所有组件加上fxd前缀
  Vue.component('fxd'+i, FxdUi[i])
}

LogRocket.init('pkkrqo/cleartime');
//注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
//引入路由
Vue.use(VueRouter);

const router = new VueRouter(routers);

//设置页面的title
router.beforeEach((to, from, next) => {
  const rejectRouter = ()=>{
    if(to.path=='/login') {
      next();
      return false
    }
    localStorage.clear();
    sessionStorage.clear();
    next({
      path:'/login'
    })
  };
  let obj;
  try{
    obj = storage(0,'USERINFO');
    if(obj&&obj.hasOwnProperty('juid')){
      next();
    }else{
      rejectRouter()
    }
  } catch(e){
    rejectRouter()
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
