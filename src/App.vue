<template>
  <div id="app">
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
  import vconsole from './mixins/vconsole';

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
        navSwitch: false,
      };
    },
    mixins: [vconsole],
    components: {
      'fxd-nav': nav,
    },
    mounted() {
      this.$nextTick(() => {
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
      /* eslint-disable */
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

