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
      path: '/loanProgess',
      component: require('./views/protocol/my_load_progress.vue'),
      meta: {
        title: '借款进度',
        lv: 2,
      }
    },
    {
      path: '/coupon',
      component: require('./views/mine/coupon.vue'),
      meta: {
        title: '我的红包',
        lv: 2,
      }
    },
    {
      path: '/couponDetail',
      component: require('./views/mine/coupon_detail.vue'),
      meta: {
        title: '红包详情',
        lv: 2,
      }
    },
    {
      path: '/bank',
      component: require('./views/mine/bank.vue'),
      meta: {
        title: '我的银行卡',
        lv: 2,
      }
    },
    {
      path: '/inviteFriends',
      component: require('./views/mine/invite_friends.vue'),
      meta: {
        title: '邀请好友',
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
      path: '/information',
      component: require('./views/information/'),
      meta: {
        title: '资料填写',
        lv: 2,
      },
      children: [
        {
        path: 'personal',
        component: require('./views/information/personal'),
        meta: {
          title: '个人信息',
          lv: 3,
        },
        },
        {
          path: 'linkman',
          component: require('./views/information/linkman'),
          meta: {
            title: '联系人信息',
            lv: 3,
          },
        },
        {
          path: 'profession',
          component: require('./views/information/profession'),
          meta: {
            title: '职业信息',
            lv: 3,
          },
        },
        {
          path: 'authentication',
          component: require('./views/information/authentication'),
          meta: {
            title: '第三方认证',
            lv: 3,
          },
        },
        {
          path: 'sesame',
          component: require('./views/information/sesame.vue'),
          meta: {
            title: '芝麻信用授权',
            lv: 3,
          },
        },

      ]
    },
    {
      path: '/loan_apply',
      component: require('./views/loan_apply.vue'),
      meta: {
        title: '借款确认',
        lv: 2,
      },
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
