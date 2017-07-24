<template>
  <div id="app">
    <div :class="$route.meta.showNav?'main':'warp'">
      <transition :name="transitionName">
        <!--<keep-alive>-->
        <router-view class='body'></router-view>
        <!--</keep-alive>-->
      </transition>
    </div>
    <c-Nav class='nav' v-if='$route.meta.showNav'></c-Nav>
  </div>
</template>

<style lang="scss">
  #app {
    height: 100%;
    width: 100%;
    max-width: 640px;
    min-width: 320px;
    .body {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .main {
      /* main绝对定位，进行内部滚动 */
      position: absolute;
      top: 0;
      /* 使之可以滚动 */
      overflow-y: scroll;
      width: 100%;
      max-width: 640px;
      min-width: 320px;
      height: 100%;
      margin: 0 auto;
    }
    .warp {
      background: #fff;
      height: 100%;
      width: 100%;
      max-width: 640px;
      min-width: 320px;
      margin: 0 auto;
    }
    .nav {
      background: #FBFBFB;
      border-top: 1px solid #dbdcdc;
      box-sizing: border-box;
      z-index: 10;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: 50px;
      text-align: center;
      max-width: 640px;
      min-width: 320px;
      margin: 0 auto;
    }
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
        if (this.$route.path == '/login') {
          return
        }
        if (localStorage.user == 'undefined' || !localStorage.user) {
          delete localStorage.user;
          this.$store.commit('NEXT_PAGE', 'login');
          return
        }
        this.$store.commit('USER_LOGIN', JSON.parse(localStorage.user));
      },
      pickerCb() {
        this.$store.dispatch('toggle_mask');
      }
    }
  }
</script>

