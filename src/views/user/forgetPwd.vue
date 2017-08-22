<template>
  <div class="forgetPwd">
    <fxd-cell  v-model="item.mobile_phone_" type="imgText" inputType="mobile" class="phoneNumber">
      <!--<img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText"/>-->
      <div slot="imgText" class="mobileIcon"></div>
    </fxd-cell>
    <fxd-cell  v-model="item.val4" type="all" inputType="code">
      <!--<img width="250%" src="../../assets/img/mobile.png" alt="" slot="imgText" id="imgCode"/>-->
      <div slot="imgText" class="codeIcon"></div>
      <fxd-button slot="btnText" type="inset" id="sendCode">发送验证码</fxd-button>
    </fxd-cell>

    <fxd-cell  v-model="item.password_" type="all" inputType="password" class="reg_">
      <!--<img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText" class="imgCode">-->

      <div class="passwordIcon" slot="imgText"></div>

      <div class="passwordTypeIcon" :class="[passwordType?'dis':'']" @click="passwordTypeMethod" slot="btnText"></div>
        <!--<img width="100%" :src='password.type==="password"?password.hideUrl:password.showUrl' @click='changePsdType' alt=""  class="img_"/>-->
    </fxd-cell>
    <fxd-button class="btn login-submit">确认找回</fxd-button>
    <!--<p><img width="29" src="../../assets/img/mobile.png" alt=""><input-->
      <!--type="phone" placeholder="输入手机号"-->
      <!--v-model='data.mobile_phone_'></p>-->
    <!--<p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input-->
      <!--type="text" placeholder="输入验证码"-->
      <!--v-model='data.verify_code_'><span-->
      <!--class="sendCode" @click='sendCode'>发送验证码</span></p>-->
    <!--<p><img width="29" src="../../assets/img/password.png" alt=""><input-->
      <!--placeholder="输入至少6位密码"-->
      <!--v-model='data.password_'><img width="30" :src='password.type==="password"?password.hideUrl:password.showUrl' @click = 'changePsdType'></p>-->
    <!--<p href="" class='btn login-submit' @click='submit'>确认找回</p>-->
  </div>
</template>
<style  lang="scss" scoped>
  .forgetPwd {
    .passwordIcon{
      border: 1px solid #00aaee;
      width: .32rem;
      height: .32rem;
      position: relative;
      border-radius: .1rem;
      background: #fff;
      &:after{
        position: absolute;
        content: '';
        top: -50%;
        left: 25%;
        width: 50%;
        height: .3rem;
        border:1px solid #00aaee;
        border-radius: 50%;
        z-index: -1;
      }
    }
    .codeIcon{
      width: .32rem;
      height: .2rem;
      border:1px solid #00aaee;
      border-radius: .05rem;
      position: relative;
      background: repeating-radial-gradient(yellow 10%, green 15%);
      &:after{
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 25%;
        border-left:10px solid #fff;
        border-right: 10px solid transparent;
        border-bottom:10px solid #fff;
        border-top:10px solid transparent;
      }
      &:before{
      }
    }
    .phoneNumber {
      margin: 0.35rem auto;
    }
    #imgCode {
      margin: 0 0.22rem;
    }
    #sendCode {
      font-size: 0.3rem;
    }
    .btn {
      margin-top: 1rem;
    }
    .reg_ {
      margin-top: .35rem;
      .img_ {
        width: .5rem;
        margin-bottom: .2rem;
        margin-left: .6rem;
      }
      .imgCode {
        margin: 0 0.22rem;
      }
    }
  }
</style>
<script>
  /*eslint-disable*/
    export default{
      data(){
//        return {
//          data:{
//            last_login_from_:'4',
//            mobile_phone_:'',
//            verify_code_:'',
//            password_:''
//          },
//          password:{
//            type: 'password',
//            hideUrl:require('../../assets/img/1_Signin_icon_06.png'),
//            showUrl:require('../../assets/img/1_Signin_icon_07.png')
//          },
//        }
        return {
          passwordType:false,
          item:{
            mobile_phone_:'',
            val4:'',
          },
        }
      },
      methods:{
        passwordTypeMethod(){
          this.passwordType = !this.passwordType
        },
        submit(){
          this.$store.dispatch('user_forgetPwd', this.data);
          this.$store.commit('NEXT_PAGE','register');
        },
        sendCode(){
          let data = {
            mobile_phone_: this.data.mobile_phone_,
            flag: 'MSG_FIND_PASSWORD_'
          }
          this.$store.dispatch('user_picCodeH5', data);
        },
        changePsdType(){

        }
      }
    }
</script>
