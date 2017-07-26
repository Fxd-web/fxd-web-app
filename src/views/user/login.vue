<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../assets/img/logo/logo_login.png" alt="" width="228">
    </div>
    <fxd-cell  v-model="item.mobile_phone_" type="imgText" inputType="mobile" class="login-fxd-cell">
      <img width="100%" src="../../assets/img/mobile.png" alt="" slot="imgText">
    </fxd-cell>
    <fxd-cell  v-model="item.password_" type="imgText" inputType="password" class="login-fxd-cell">
      <img width="100%" src="../../assets/img/password.png" alt="" slot="imgText">
    </fxd-cell>
    <fxd-button class="login-fxd-button" @click.native="submit">登录</fxd-button>
    <div class="login-footer">
      <span @click="forgetPwd">忘记密码</span>
      <span>|</span>
      <span @click="register">注册账户</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    .login-logo{
      text-align: center;
      margin-top: .8rem;
      margin-bottom: .3rem;
    }
    .login-footer{
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .32rem;
      span:nth-child(2){
        margin:0 .3rem
      }
      span:last-child{
        color: #00aaee;
      }
    }
    .login-fxd-cell{
      margin-bottom: .3rem;
    }
    .login-fxd-button{
      margin-top: 1rem;
    }
  }
</style>

<script>
  import {
    user_login
  } from '../../service/';
  import {
    mapMutations
  } from 'vuex'

  export default {
     data() {
      return {
        showLoginCode: false,
        user: {
          BSFIT_DEVICEID: '',
          last_login_from_: 4,
          merchant_code_: '',
          mobile_phone_: '18202197847',
          password_: '123123',
          CkGZprCYk6Q: '',
          verify_code_: ''
        },
        item:{
          mobile_phone_:'',
          password_:''
        }
      }
    },
    computed: {

    },
    mounted() {},
    methods: {
//      mobile_verify_change_pic_cb(){
//        console.log('切换图片的操作')
//      },
//      mobile_verify_send_code_cb(){
//        this.$store.dispatch('user_picCodeH5', {
//          mobile_phone_: this.item.mobile.val,
//          flag: 'MSG_LOGIN_'
//        });
//      },
//      mobile_verify_submit_cb(){
//        this.$store.dispatch('user_login', this.user);
//        console.log('提交按钮的操作')
//      },
      ...mapMutations([
        'USER_LOGIN',
        'NEXT_PAGE',
      ]),
      submit() {
        this.NEXT_PAGE('home');
//        this.$store.dispatch('user_login', this.user);
//        if (this.showLoginCode) {
//          this.$store.commit('TOGGLE_LOGIN_CODE', {
//            flag: 0
//          })
//        }
        // user_login(this.user).then((data)=>{
        //   this.USER_LOGIN(data.result);
        //   this.NEXT_PAGE('home');
        // })
        // console.log('121')
      },
      register() {
        this.NEXT_PAGE('register');
      },
      forgetPwd() {
        this.NEXT_PAGE('forgerPwd');
      },
      sendCode() {

      }
    },
    watch: {
      '$store.state.user.user_login_verify_code' (bool) {
        this.showLoginCode = bool;
      }
    },
  }
</script>
