<template>
  <div id="app">
    <div>
      <transition :name="transitionName">
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
  #app {
  }
</style>

<script>
  import 'normalize.css';
  import './css/common.scss';
  import {
    isEmptyObj
  } from './util';
  import cNav from './components/nav';
  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
      }
    },
    components: {
      cNav,
    },
    mounted() {
      this.$nextTick(function() {
        this.interceptLogin();
      })
    },
    watch: {
      '$store.state.nextPage' (path) {
        if (!!path) {
          this.$router.push(__dirname + path);
          this.$store.commit('CLEAR_NEXT_PAGE');
        }
      },
      '$route' (to, from) {
        !!this.$store.state.dialog.toast && this.$store.commit('TOGGLE_MASK');
        if (to.meta.lv == from.meta.lv) {
          this.transitionName = 'fade';
          return
        }
        this.transitionName = to.meta.lv > from.meta.lv ? 'slide-right' : 'slide-left'
      },
    },
    methods: {
      interceptLogin() { //登录拦截
//        if (this.$route.path == '/login') {
//          return
//        }
//        if (localStorage.user == 'undefined' || !localStorage.user) {
//          delete localStorage.user;
//          this.$store.commit('NEXT_PAGE', 'login');
//          return
//        }
//        this.$store.commit('USER_LOGIN', JSON.parse(localStorage.user));
      },
      pickerCb() {
        this.$store.dispatch('toggle_mask');
      }
    }
  }
</script>

