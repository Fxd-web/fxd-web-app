<template>
  <div class="reg">

    <fxd-mobileVerify
      type="imgCode"
      :data="item"
      @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"
      @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
      @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>

    <fxd-cell  v-model="item.password_" type="all" inputType="password" class="reg_">
      <img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText" class="imgCode">
      <div slot="btnText">
        <img width="100%" :src='password.type==="password"?password.hideUrl:password.showUrl' @click='changePsdType' alt=""  class="img_"/>
      </div>
    </fxd-cell>

    <fxd-cell  v-model="item.mobile_phone_" type="imgText" :placeholder="item.placeholder2" class="reg_">
      <img width="150%" src="../../assets/img/yaoqingma.png" alt="" slot="imgText">
    </fxd-cell>

    <fxd-radio-tip agreeText="同意发薪贷" :tipList="tipList" class="reg_"></fxd-radio-tip>
    <fxd-button class="affirmRegister">确认注册</fxd-button>
    <!--<p><img width="29" src="../../assets/img/mobile.png" alt=""><input type="phone" placeholder="输入手机号" v-model='data.mobile_phone_'></p>-->
    <!--<p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input type="text" placeholder="请先输入图片验证码" v-model='data.pic_verify_code_'><img width="84" height='48' :src="data.picCodeUrl" alt="/" class="picCode" @click='picCode'></p>-->
    <!--<p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input type="text" placeholder="输入验证码" v-model='data.verify_code_'><span class="sendCode" @click='sendCode'>发送验证码</span></p>-->
    <!--<p><img width="29" src="../../assets/img/password.png" alt=""><input placeholder="输入至少6位密码" v-model='data.password_'><img width="30" :src='password.type==="password"?password.hideUrl:password.showUrl' @click='changePsdType'></p>-->
    <!--<div class="reg-accept">-->
      <!--<span class='reg-accept-icon' :class="isAccept?'active':''" @click='acceptBtn'></span>-->
      <!--<span @click='acceptBtn'>同意发薪贷</span>-->
      <!--<span>《注册协议》</span>-->
      <!--<span>《隐私保密协议》</span>-->
    <!--</div>-->
    <!--<div class="btn" @click='submit'>-->
      <!--确认注册-->
    <!--</div>-->
  </div>
</template>

<style lang="scss" scoped>
  /*eslint-disable*/
  .reg{
    .reg_ {
      margin-top:.35rem;
    img{
      width:4rem;
    }
        .img_{
          width:.5rem;
          margin-bottom:.2rem;
          margin-left: .6rem;
      }
    }
    .imgCode{
      margin:0 0.22rem;
    }
    .affirmRegister{
      margin-top:.6rem;
    }
  }

</style>

<script>
  /*eslint-disable*/
  import config from '../../config'
  export default {
    data() {
      return {
//        data: {
//          mobile_phone_: '',
//          flag: 'MSG_REG_',
//          pic_verify_id_: '',
//          pic_verify_code_: '',
//          picCodeUrl: "",
//          BSFIT_DEVICEID: '',
//          last_login_from_: '4',
//          merchant_code_: '',
//          qr_code_: '',
//          password_: '',
//          regProtocol: 'on',
//          register_from_: '4',
//          verify_code_: '',
//          pageToken: {
//            pageTokenKey: '',
//            pageTokenVal: '',
//          }
//        },
        password: {
          type: 'password',
          hideUrl: require('../../assets/img/1_Signin_icon_06.png'),
          showUrl: require('../../assets/img/1_Signin_icon_07.png')
        },
//        isAccept: false,
          tipList:['注册协议','隐私保密协议'],
          item:{
            placeholder:'请先输入图片验证码',
            placeholder2:'邀请码或邀请人手机号',
            mobile_phone_:'',
            val4:'hahahhahhah',
            mobile:{
              val:'',
            },
            imgCode:{   // 此数据对象不存在则不现实图形验证码
              iconUrl:'',
              val:'',
            },
            code:{
              val:'',
            },
        }
      }
    },
    mounted() {
//      this.picCode();
    },
    methods: {
      mobile_verify_change_pic_cb(){
//        console.log('切换图片的操作')
      },
      mobile_verify_send_code_cb(){
//        console.log('发送验证码的操作')
      },
      mobile_verify_submit_cb(){
//        console.log('提交按钮的操作')
      },
      picCode() {
        this.$store.dispatch('user_picCode');
      },
      setPicCode() {
        this.data.pic_verify_id_ = this.$store.state.picCode.id_;
        this.data.picCodeUrl = `${config}${this.$store.state.picCode.pic_verify_url_}?id_=${this.data.pic_verify_id_}&oldId_=`;
      },
      sendCode() {
        let data = Object.assign({}, this.data);
        this.$store.dispatch('user_phoneCode', data);
        this.$store.dispatch('getPageToken', data);
      },
      changePsdType() {
        this.password.type = this.password.type==='password'?'text':'password';
      },
      acceptBtn() {
        this.isAccept = !this.isAccept;
      },
      submit() {
        this.$store.dispatch('user_register', this.data);
        this.$store.commit('NEXT_PAGE', 'login');
        this.data.pageToken = {
          pageTokenVal: this.$store.state.pageToken.pageTokenVal || '',
          pageTokenKey: this.$store.state.pageToken.pageTokenKey || '',
        }
      }
    },
    watch: {
      '$store.state.picCode.id_' () {
        this.setPicCode();
      }
    }
  }
</script>
