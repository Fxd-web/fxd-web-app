<template>
  <div class="user-form reg">
    <p><img width="29" src="../../assets/img/mobile.png" alt=""><input type="phone" placeholder="输入手机号" v-model='data.mobile_phone_'></p>
    <p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input type="text" placeholder="请先输入图片验证码" v-model='data.pic_verify_code_'><img width="84" height='48' :src="data.picCodeUrl" alt="/" class="picCode" @click='picCode'></p>
    <p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input type="text" placeholder="输入验证码" v-model='data.verify_code_'><span class="sendCode" @click='sendCode'>发送验证码</span></p>
    <p><img width="29" src="../../assets/img/password.png" alt=""><input placeholder="输入至少6位密码" v-model='data.password_'><img width="30" :src='password.type==="password"?password.hideUrl:password.showUrl' @click='changePsdType'></p>
    <div class="reg-accept">
      <span class='reg-accept-icon' :class="isAccept?'active':''" @click='acceptBtn'></span>
      <span @click='acceptBtn'>同意发薪贷</span>
      <span>《注册协议》</span>
      <span>《隐私保密协议》</span>
    </div>
    <div class="btn" @click='submit'>
      确认注册
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .reg {
    .picCode {
      border: none;
      background: #fff;
      margin-right: 0;
    }
    .reg-accept {
      line-height: 14px;
      margin: 14px 0 44px;
      display: flex;
      align-items: center;
      font-size: 12px;
      .reg-accept-icon {
        background: #fff;
        border: 1px solid #00aaee;
        border-radius: 3px;
        padding: 0;
        margin: 0;
        width: 14px;
        height: 14px;
        z-index: 11;
        position: relative;
        &.active {
          z-index: 10;
          &:after {
            content: '';
            color: #0091ff;
            position: absolute;
            width: 8px;
            height: 3px;
            top: 3px;
            left: 1.2px;
            border: 2px solid #0091ff;
            border-top: none;
            border-right: none;
            -webkit-transform: rotate(-55deg);
            -moz-transform: rotate(-55deg);
            -o-transform: rotate(-55deg);
            -ms-transform: rotate(-55deg);
            transform: rotate(-55deg);
          }
        }
      }
      span {
        color: #00aaee;
        &:nth-child(2) {
          color: #9fa0a0;
          padding: 0 5px;
        }
      }
    }
  }
</style>

<script>
  import config from '../../config'
  export default {
    data() {
      return {
        data: {
          mobile_phone_: '',
          flag: 'MSG_REG_',
          pic_verify_id_: '',
          pic_verify_code_: '',
          picCodeUrl: "",
          BSFIT_DEVICEID: '',
          last_login_from_: '4',
          merchant_code_: '',
          qr_code_: '',
          password_: '',
          regProtocol: 'on',
          register_from_: '4',
          verify_code_: '',
          pageToken: {
            pageTokenKey: '',
            pageTokenVal: '',
          }
        },
        password: {
          type: 'password',
          hideUrl: require('../../assets/img/1_Signin_icon_06.png'),
          showUrl: require('../../assets/img/1_Signin_icon_07.png')
        },
        isAccept: false,
      }
    },
    mounted() {
//      this.picCode();
    },
    methods: {
      picCode() {
        this.$store.dispatch('user_picCode');
      },
      setPicCode() {
        this.data.pic_verify_id_ = this.$store.state.picCode.id_
        this.data.picCodeUrl = `${config}${this.$store.state.picCode.pic_verify_url_}?id_=${this.data.pic_verify_id_}&oldId_=`;
      },
      sendCode() {
        let data = Object.assign({}, this.data);
        this.$store.dispatch('user_phoneCode', data);
        this.$store.dispatch('getPageToken', data);
      },
      changePsdType() {
        //this.password.type = this.password.type==='password'?'text':'password';
      },
      acceptBtn() {
        this.isAccept = !this.isAccept;
      },
      submit() {
        this.data.pageToken = {
          pageTokenVal: this.$store.state.pageToken.pageTokenVal || '',
          pageTokenKey: this.$store.state.pageToken.pageTokenKey || '',
        }
        this.$store.dispatch('user_register', this.data);
        this.$store.commit('NEXT_PAGE', 'login');
      }
    },
    watch: {
      '$store.state.picCode.id_' () {
        this.setPicCode();
      }
    }
  }
</script>
