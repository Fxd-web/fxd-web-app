<template>
  <div id="app" @click="tap_console">
      <!--<transition :name="transitionName">-->
        <!--<keep-alive>-->
        <router-view class="view"></router-view>
        <!--</keep-alive>-->
      <!--</transition>-->
      <fxd-nav v-if='navSwitch'/>
  </div>
</template>

<style lang="scss">
  #app{
    height:100%;
  }
</style>

<script>
  import 'normalize.css';
  import './css/common.scss';
  import nav from './components/nav';

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
        navSwitch: false,
        vconsole: null,
      };
    },
    components: {
      'fxd-nav': nav,
    },
    mounted() {
      this.$nextTick(() => {
        this.vconsole_init();
        this.interceptLogin();
        if (~['', 'home', 'me', 'more'].indexOf(this.$route.path.slice(1))) { // eslint-disable-line no-bitwise
          this.navSwitch = true;
        }
      });
    },
    watch: {
      '$store.state.nextPage'(path) {
        if (path) {
          this.$router.push(__dirname + path); // eslint-disable-line no-path-concat
          this.$store.commit('CLEAR_NEXT_PAGE');
        }
      },
      '$route'(to, from) {
        this.$store.state.dialog.toast && this.$store.commit('TOGGLE_MASK');
        if (to.meta.lv === from.meta.lv) {
          this.transitionName = 'fade';
          return;
        }
        this.transitionName = to.meta.lv > from.meta.lv ? 'slide-right' : 'slide-left';
      },
    },
    methods: {
      /**
       * 初始化加载vconsole，如果是生产默认则不加载
       */
      vconsole_init() {
        if (process.env.NODE_ENV === 'development') {
          this.vconsole = require('vconsole');
        }
      },
      /* eslint-disable */
      /***
       * 不知道什么原因vconsole初始化之后获取不到dom元素，所以只能通过点击屏幕来唤醒vconsole实例
       * 默认meta标签里面的缩放大小为0.5，所以显得vconsole会缩小一半，通过flex(100, 1, 1)将缩放比例
       * 扩大到1，显示正常。之后的取消操作再将缩放比例还原。
       */
      tap_console() {
        try {
          if (this.vconsole.isReady) {
            this.vconsole.$.bind(document.querySelector('.vc-switch'), 'click', function() {
              flex(100, 1, 1);
            });
            this.vconsole.$.bind(document.querySelector('.vc-hide'), 'click', function() {
              flex(100, 1);
            });
            this.vconsole.$.bind(document.querySelector('.vc-mask'), 'click', function() {
              flex(100, 1);
            });
          }
        } catch (e) {}
      },
      interceptLogin() { // 登录拦截

//        if (this.$route.path === '/login') {
//          return;
//        }
//        if (localStorage.user === 'undefined' || !localStorage.user) {
//          delete localStorage.user;
//          this.$store.commit('NEXT_PAGE', 'login');
//          return;
//        }
//        this.$store.commit('USER_LOGIN', JSON.parse(localStorage.user));
      },
      /* eslint-enable */
      pickerCb() {
        this.$store.dispatch('toggle_mask');
      }
    }
  };
</script>

