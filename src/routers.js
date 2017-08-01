export default {
  base: __dirname,
  mode: 'history',
  routes: [{
      path: '/',
      component: require('./views/home'),
      meta: {
        title: '首页',
        navSwitch: true,
        backSwitch: true,
        lv: 1,
      }
    },
    {
      path: '/home',
      component: require('./views/home'),
      meta: {
        title: '首页',
        navSwitch: true,
        backSwitch: true,
        lv: 1,
      }
    },
    {
      path: '/me',
      component: require('./views/me'),
      meta: {
        title: '我的',
        navSwitch: true,
        backSwitch: true,
        lv: 1,
      }
    },
    {
      path: '/loanRecord',
      component: require('./views/mine/loan_record'),
      meta: {
        title: '借款记录',
        lv: 2,
      }
    },
    {
      path: '/more',
      component: require('./views/more'),
      meta: {
        title: '更多',
        navSwitch: true,
        backSwitch: true,
        lv: 1,
      }
    },
    {
      path: '/login',
      component: require('./views/user/login'),
      meta: {
        title: '登录',
        backSwitch: true,
        lv: 1,
      }
    },
    {
      path: '/register',
      component: require('./views/user/register'),
      meta: {
        title: '注册',
        lv: 1,
      }
    },
    {
      path: '/forgetPwd',
      component: require('./views/user/forgetPwd'),
      meta: {
        title: '找回密码',
        lv: 1,
      }
    },
    {
      path: '/error',
      component: require('./views/error'),
      meta: {
        title: '服务异常',
        name: 'error'
      }
    },
    {
      path: '*',
      component: require('./views/404'),
      meta: {
        title: '你要的页面找不到了',
        name: '404'
      }
    },

  ],
};
