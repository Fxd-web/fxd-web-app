<template>
  <div class="authentication">
    <div class="head">
      <img src="../../assets/img/authentication-icon1.png" alt="">
      <h2>运营商认证</h2>
    </div>
    <div class="con">
      <p>您的手机号：<span>{{item.mobile_phone_ || '-'}}</span></p>
      <p>所属运营商：<span>{{phoneMNO || '-'}}</span></p>
    </div>
    <div class="foot">
      <fxd-cell
        placeholder="运营商服务密码"
        type="btnText"
        @input.native="e=>item.service_password_=e.target.value"
        v-model="item.service_password_"
        >
        <img src="../../assets/img/authentication-icon2.png" alt=""  slot="btnText" onclick="javascript:location.href='http://h5.test.fxds/fxd-h5/page/case/case_main_phone.html'">
      </fxd-cell>
      <fxd-cell
        v-if="visible.smsCode"
        placeholder="手机动态服务密码"
        @input.native="e=>item.smsCode=e.target.value"
        v-model="item.smsCode"
      >
      </fxd-cell>
      <fxd-cell
        v-if="visible.picCode"
        placeholder="请先输入图片验证码"
        type="btnText"
        @input.native="e=>item.picCode=e.target.value"
        v-model="item.picCode"
      >
        <img :src="picCodeUrl" alt=""  slot="btnText">
      </fxd-cell>
      <p>若忘记密码，请自行联系运营商</p>
      <fxd-radio-tip agreeText="同意发薪贷" :tipList="tipList"  class="authentication-radio-tip"></fxd-radio-tip>
    </div>
    <fxd-button class="item" :disabled="submit_dis" @click.native="submit">保存</fxd-button>
  </div>
</template>
<style lang="scss" >
  .authentication{
    .head{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
      h2{
        padding-top: .3rem;
        font-size: .42rem;
      }
    }
    .con{
      line-height: 2;
      color: #ccc;
      font-size: .36rem;
      width: 85%;
      margin: auto;
      span{
        color: #00aaee;
      }
    }
    .foot{
      p {
        margin-right: 5%;
        text-align: right;
        color: #595757;
      }
      .fxd-cell {
        .btnText {
          border-left: 1px solid #00aaee;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem!important;
        }
      }
      .authentication-radio-tip {
        margin: .1rem auto .5rem;
        span{
          font-size: .28rem;
        }
      }
    }
  }
</style>
<script>
  import {
    get_carrier_name_by_mobile,
    save_customer_auth_mobile,
    auth_mobile_phone
  } from '../../service/';
  import {
    mapGetters,
  } from 'vuex'
    export default{
        data() {
          return {
            tipList: ['运营商信息获取授权协议'],
            submit_dis: true,
            phoneMNO: '', // 所属运营商
            item: {
              mobile_phone_: '',
              service_password_: '',
              smsCode: '',
              picCode: '',
            },
            visible:{
              smsCode: false,
              picCode: false,
            },
            picCodeUrl: '', // 显示图形验证码
          }
        },
        created() {
          this.init();
        },
        computed: {
          ...mapGetters([
            'customerAuthInfo',
          ]),
        },
        methods: {
          /**
           * 初始化
           **/
          init() {
            get_carrier_name_by_mobile().then(res => {
               this.phoneMNO = res
            })
          },
          submit() {

            // resultcode值为0则需要真实认证，1则走假认证

            if ( parseInt(this.customerAuthInfo.resultcode) ){
              auth_mobile_phone();
            } else {
              save_customer_auth_mobile(this.item).then(json =>{
                if(json.flag === '0006') {  // 显示手机动态密码
                  this.visible.smsCode = true;
                  return
                }
                if(json.flag === '0019') {  // 显示图形验证码
                  this.visible.picCode = true;
                  this.picCodeUrl = json.result.picContent;
                  return
                }
                if(json.flag === '0020') {  // 同时显示手机动态密码和图形验证码
                  this.visible.smsCode = true;
                  this.visible.picCode = true;
                  this.picCodeUrl = json.result.picContent;
                }
              });
            }

          }
        },
        watch: {
          'item': {
            handler(obj) {
              this.submit_dis = true;
              if(obj.service_password_.length) {
                this.submit_dis = false;
              }
            },
            deep: true
          },
       }
    }

</script>
