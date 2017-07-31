<template>
  <div id="app">
      <fxd-header :title="headTitle" :backSwitch="backSwitch" v-if="headSwitch"/>
      <!--<transition :name="transitionName">-->
        <!--<keep-alive>-->
        <router-view class="view"
                     :style="{ height:viewHeight, top: viewTop}"
                     :viewHeight="viewHeight">
        </router-view>
    <!--</keep-alive>-->
      <!--</transition>-->
      <fxd-nav v-if='navSwitch'/>
  </div>
</template>

<style lang="scss">
  #app{
    .view{
      position: absolute;
    }
  }
</style>

<script>
  import 'normalize.css';
  import './css/common.scss';
  import nav from './components/nav';
  import vconsole from './mixins/vconsole';
  import { isMobile } from './util/';
  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
        navSwitch: false, // 菜单栏显示开关
        headSwitch: !isMobile(), // 根据是否是微信浏览器判断是否显示标题栏
        backSwitch: false, // 标题栏返回按钮开关
        headTitle: '标题', // 标题栏标题
      };
    },
    computed:{
      /**
       * 动态设置内容高度和top高度
       */
      viewHeight() {
        const n = (this.headSwitch ? 0.96 : 0) + (this.navSwitch ? 1.04 : 0);
        return `calc(100vh - ${n}rem)`;
      },
      viewTop() {
        const m = this.headSwitch ? 0.96 : 0;
        return `${m}rem`;
      }
    },
    mixins: [vconsole],
    components: {
      'fxd-nav': nav,
    },
    mounted() {
      this.$nextTick(() => {
        this.interceptLogin();
        this.route_change();
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
        this.headTitle = this.$route.meta.title;
        this.$store.state.dialog.toast && this.$store.commit('TOGGLE_MASK');
        if (to.meta.lv === from.meta.lv) {
          this.transitionName = 'fade';
          return;
        }
        this.transitionName = to.meta.lv > from.meta.lv ? 'slide-right' : 'slide-left';
        this.route_change();
      },
    },
    methods: {
      /* eslint-disable */
      /**
       * 根据路由切换动态显示主页和底部菜单栏
       */
      route_change() {
        this.navSwitch = this.$route.meta.navSwitch || this.navSwitch;
        this.backSwitch = this.$route.meta.backSwitch || this.backSwitch;
        this.headTitle = this.$route.meta.title || this.headTitle;
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

