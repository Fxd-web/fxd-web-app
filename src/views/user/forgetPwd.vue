<template>
  <div class="forgetPwd">
    <fxd-mobileVerify
      type="code"
      :data="mobileVerifyItem"
      @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
    ></fxd-mobileVerify>

    <!--<fxd-cell  v-model="item.mobile_phone_" type="imgText" inputType="mobile" class="phoneNumber">-->
      <!--&lt;!&ndash;<img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText"/>&ndash;&gt;-->
      <!--<div slot="imgText" class="mobileIcon"></div>-->
    <!--</fxd-cell>-->
    <!--<fxd-cell  v-model="item.val4" type="all" inputType="code">-->
      <!--&lt;!&ndash;<img width="250%" src="../../assets/img/mobile.png" alt="" slot="imgText" id="imgCode"/>&ndash;&gt;-->
      <!--<div slot="imgText" class="codeIcon"></div>-->
      <!--<fxd-button slot="btnText" type="inset" id="sendCode">发送验证码</fxd-button>-->
    <!--</fxd-cell>-->

    <fxd-cell
      @input.native="e=>item.password_=e.target.value"
      v-model="item.password_"
      type="all"
      :inputType="passwordType? 'password' : ''"
      class="reg_">
      <img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText" class="imgCode">

      <!--<div class="passwordIcon" slot="imgText"></div>-->

      <div class="passwordTypeIcon" :class="[passwordType?'dis':'']" @click="passwordTypeMethod" slot="btnText"></div>
        <!--<img width="100%" :src='password.type==="password"?password.hideUrl:password.showUrl' @click='changePsdType' alt=""  class="img_"/>-->
    </fxd-cell>
    <fxd-button class="btn login-submit" @click.native="submit">确认找回</fxd-button>
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
<style  lang="scss">
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
      margin: .3rem auto!important;
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
  import {
    user_login,
    user_find_password_back,
    send_SMS
  } from '../../service/';
  import {
    mapMutations
  } from 'vuex';
  import {Toask} from 'fxd-components-example';
    export default {
      data() {
        return {
          passwordType: true,
          mobileVerifyItem: {
            placeholder: '请先输入图片验证码',
            mobile: {
              val: '',
            },
            imgCode: {
              pic_verify_id_: '',
              iconUrl: '',
              val: '',
            },
            code: {
              val: '',
            },
          },
          item: {
            mobile_phone_: '',
            password_: '',
            verify_code_: ''
          }
        }
      },
      methods: {
        ...mapMutations([
          'USER_LOGIN',
          'NEXT_PAGE',
        ]),
        passwordTypeMethod() {
          this.passwordType = !this.passwordType
        },
        mobile_verify_send_code_cb() {
          send_SMS({
            mobile_phone_: this.item.mobile_phone_,
            flag:'MSG_FIND_PASSWORD_'
          })
        },
        submit() {
          const password_ = this.item.password_; // 密码会被解密先保存下
          user_find_password_back(this.item).then(res=> {
              if(res.flag=='0000') {
                user_login({
                  merchant_code_: this.item.merchant_code_,
                  last_login_from_: 4,
                  mobile_phone_: this.item.mobile_phone_,
                  password_
                }).then(res => {
                  this.USER_LOGIN(res);
                  this.NEXT_PAGE('home');
                })
              }
          })
        },
      },
      watch: {
        'mobileVerifyItem': {
          handler: function (data) {
            this.item.mobile_phone_ = data.mobile.val;
            this.item.verify_code_ = data.code.val;
          },
          deep: true
        },
      }
    }
</script>
