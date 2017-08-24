<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../assets/img/logo/logo_login.png" alt="" width="228">
    </div>
    <fxd-cell
      ref="cell1"
      @verify_cb="verify_cb"
      @input.native="e=>item.mobile_phone_=e.target.value"
      v-model="item.mobile_phone_"
      type="imgText"
      inputType="mobile" class="login-fxd-cell">
      <img width="100%" src="../../assets/img/mobile.png" alt="" slot="imgText">
    </fxd-cell>
    <fxd-cell
      ref="cell2"
      @verify_cb="verify_cb"
      @input.native="e=>item.password_=e.target.value"
      v-model="item.password_"
      type="imgText"
      inputType="password" class="login-fxd-cell">
      <img width="100%" src="../../assets/img/password.png" alt="" slot="imgText">
    </fxd-cell>
    <fxd-send-code
      v-model='item.verify_code_'
      @input.native="e=>item.verify_code_=e.target.value"
      ref="cell3"
      @send_code_cb="send_code_cb"
      verifyCellName="cell1"
      type = 'all'
      v-if="showMobeilCode">
      <!--<img src="../../assets/img/mobile.png" alt="" class="sendCodeImg">-->
    </fxd-send-code>
    <fxd-button class="login-fxd-button" @click.native="submit" >登录</fxd-button>
    <div class="login-footer">
      <span @click="forgetPwd">忘记密码</span>
      <span>|</span>
      <span @click="register">注册账户</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  /*eslint-disable*/
  .login {
    .sendCodeImg{
      position: relative;
      top: -.1rem;
    }
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
  /*eslint-disable*/
  import {
    user_login,
    send_SMS
  } from '../../service/';
  import {
    mapMutations
  } from 'vuex';
  import { verify } from '../../mixins/verify';

  export default {
    data() {
      return {
        showMobeilCode: false,
        item: {
          verify_code_: '',
          merchant_code_: '',
          last_login_from_: 4,
          mobile_phone_:'',
          password_:''
        }
      };
    },
    mounted() {
    },
    mixins:[verify],
    methods: {
      ...mapMutations([
        'USER_LOGIN',
        'NEXT_PAGE',
      ]),
      send_code_cb() {
        send_SMS({
          mobile_phone_:this.item.mobile_phone_,
            flag:'MSG_LOGIN_'
        })
      },
      submit() {
        this.required([this.$refs.cell1,this.$refs.cell2]).then(()=> {
          user_login(this.item).then(res => {
            this.USER_LOGIN(res);
            this.NEXT_PAGE('home');
          }).catch(res=>{
            if(res.flag==='0005'){
              this.showMobeilCode = true;
            }
          })
        });
      },
      register() {
        this.NEXT_PAGE('register');
      },
      forgetPwd() {
        this.NEXT_PAGE('forgetPwd');
      },
    },
  };
  /*eslint-enable*/
</script>
