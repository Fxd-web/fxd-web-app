<template>
  <div class="reg">

    <fxd-mobileVerify
      type="imgCode"
      :data="mobileVerifyItem"
      @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"
      @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
      ></fxd-mobileVerify>

    <fxd-cell
      class="reg_"
      v-model="item.password_"
      @input.native="e=>item.password_=e.target.value"
      type="all"
      :inputType="passwordType? 'password' : ''"
      >
      <img width="150%" src="../../assets/img/mobile.png" alt="" slot="imgText" class="imgCode">
      <div class="passwordTypeIcon" :class="[passwordType?'dis':'']"  @click="passwordTypeMethod" slot="btnText"></div>
    </fxd-cell>

    <fxd-cell
      v-model="item.merchant_code_"
      type="imgText"
      :placeholder="'邀请码或邀请人手机号'"
      @input.native="e=>item.merchant_code_=e.target.value"
      class="reg_">
      <img width="150%" src="../../assets/img/yaoqingma.png" alt="" slot="imgText">
    </fxd-cell>

    <fxd-radio-tip agreeText="同意发薪贷" :tipList="tipList" class="reg_"></fxd-radio-tip>

    <fxd-button class="affirmRegister" @click.native="submit">确认注册</fxd-button>
  </div>
</template>

<style lang="scss">
  .reg {
    .reg_ {
      margin:.3rem auto!important;
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
  import {
    user_login,
    user_register,
    get_pic_code,
    send_SMS_imgCode
  } from '../../service/';
  import {
    mapMutations
  } from 'vuex';
  import {Toask} from 'fxd-components-example';
  import config from '../../config';
  export default {
    data() {
      return {
        tipList: ['注册协议','隐私保密协议'],
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
          merchant_code_: this.$route.query.invitation_code || this.$route.query.merchant_code_ || '',
          mobile_phone_: this.$route.query.mobile_phone_ || '',
          password_: '',
          register_from_: '',
          verify_code_: ''
        }
      }
    },
    mounted() {
        this.pic_code_init();
    },
    methods: {
      ...mapMutations([
        'USER_LOGIN',
        'NEXT_PAGE',
      ]),
      pic_code_init() {
        get_pic_code().then(res=> {
          this.mobileVerifyItem.imgCode.pic_verify_id_ = res.id_;
          this.mobileVerifyItem.imgCode.iconUrl = `${config.url}${res.pic_verify_url_}?id_=${res.id_}`;
        })
      },
      mobile_verify_change_pic_cb() { // 切换图片
        this.pic_code_init();
      },
      mobile_verify_send_code_cb() { // 发送验证码
        send_SMS_imgCode({
          mobile_phone_: this.item.mobile_phone_,
          flag: 'MSG_REG_',
          pic_verify_id_: this.mobileVerifyItem.imgCode.pic_verify_id_,
          pic_verify_code_: this.mobileVerifyItem.imgCode.val
        })
      },
      passwordTypeMethod() {
        this.passwordType = !this.passwordType
      },
      acceptBtn() {
        this.isAccept = !this.isAccept;
      },
      submit() {
        const password_ = this.item.password_; // 密码会被解密先保存下
        user_register(this.item).then(json=> {

         if(json.flag!=='0000'){
           Toask(json.msg);
           setTimeout(()=>{
             location.reload();
           }, 1000);
           return
         }
          user_login({
            merchant_code_: this.item.merchant_code_,
            last_login_from_: 4,
            mobile_phone_: this.item.mobile_phone_,
            password_
          }).then(res => {
            this.USER_LOGIN(res);
            this.NEXT_PAGE('home');
          })
        })
      }
    },
    watch: {
      'mobileVerifyItem': {
        handler: function (data) {
            this.item.mobile_phone_ = data.mobile.val;
            this.item.verify_code_ = data.code.val;
        },
        deep: true
      },
      'item': {
        handler: function (data) {
          this.item.register_from_ = data.merchant_code_ ? '5' : '4';
        },
        deep: true
      },
    }
  }
</script>
