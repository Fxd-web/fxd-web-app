<template>
  <div class="loan-apply">
      <div class="loan-apply-header">
        <img :src="product.ext_attr_.icon_" alt="" width="144">
        <h2>{{product.name_}}</h2>
        <p>额度：<span>{{product.ext_attr_.amt_desc_}}</span></p>
        <p>期限：{{product.ext_attr_.period_desc_}}</p>
      </div>
      <div class="loan-apply-con">
          <dl>
            <dt>详情</dt>
            <dd>{{product.name_}}产品：</dd>
            <dd>纯信用，无抵押借款，用户可提前结清不额外收费</dd>
            <dd>利息：固定费率{{product.ext_attr_.charge_desc_}}</dd>
            <dd>服务费：固定费率{{product.out_day_service_fee_*100}}%/日</dd>
          </dl>
          <dl>
            <dt>特别说明</dt>
            <dd>用户在申请{{product.name_}}产品后不得同时继续申请其他产品</dd>
          </dl>
        <fxd-radio-tip :tipList="tipList" agreeText="我同意" class="radio-tip"></fxd-radio-tip>
      </div>
    <fxd-button class="item" :disabled="submit_dis" @click.native="submit">确认申请</fxd-button>
  </div>
</template>
<style lang="scss">
  .loan-apply{
    #{&}-header{
      padding: .5rem 0;
      border-bottom: .3rem solid #f5f5f5;
      text-align: center;
      h2{
        color: #1da9ff;
        font-size: .4rem;
        line-height: 1.5;
      }
      p{
        color: #7e878e;
        line-height: 2;
        font-size: .28rem;
        span{
          color: #1da9ff;
          font-size: .4rem;
        }
      }
    }
    #{&}-con{
      dl{
        margin:0;
        padding: .3rem;
      }
      dt{
        padding-left: .4rem;
        color: #1da9ff;
        font-size: .36rem;
        position: relative;
        margin-bottom: .3rem;
        &:after{
          position: absolute;
          left: 0;
          top: 50%;
          content: '';
          border-radius: 50%;
          border: .1rem solid #1da9ff;
          transform: translateY(-50%);
        }
      }
      dd{
        line-height: 2;
        color: #7e878e;
        font-size: .28rem;
      }
      .radio-tip{
        padding-bottom: .4rem;
      }
    }
  }
</style>
<script>

  /*eslint-disable*/
  import {
    get_product_info,
    create_application
  } from '../service/';
  import {
    mapGetters,
  } from 'vuex';
  import {
    isEmptyValObj,
  } from '../util/';
  export default{
    data(){
      return {
        product: {
          out_day_service_fee_: '',
          name_: '',
          ext_attr_: {
            icon_: '/',
            amt_desc_: '',
            period_desc_: '',
            charge_desc_: '',
          }
        },
        item: {
          third_tongd_code: '', // 同盾黑名单调用需要的参数
          req_loan_amt_: '500',  // 急速贷借款金额
          resultcode: '',  // 准入规则
          rulesid: '',  // 准入规则id
          product_id_: '', // 产品id
          plantform_source: 4, // 进件的平台
          if_family_know_: '', // 是否通知家人
          loan_staging_amount_: 1 // 布吉岛的参数
        },
        submit_dis: false,
        tipList: ['用户信息授权服务协议'],
      }
    },
    created() {
      this.init();
    },
    computed:{
      tokenId() {
        const str = 'FXD' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2);
        this.item.third_tongd_code = str;
        this.item.product_id_ = this.local_product;
        return str;
      },
      ...mapGetters([
        'customerAuthInfo',
        'local_product'
      ]),
    },
    methods: {
      /**
       * 初始化
       **/
      init() {
        get_product_info({priduct_id_: this.local_product}).then(res =>{
            this.product = {...res};
            this.item.resultcode = this.customerAuthInfo.resultcode;
            this.item.rulesid = this.customerAuthInfo.rulesid;
            this.item.if_family_know_ = this.customerAuthInfo.if_family_know_;
        });
        this.get_tokenId();
      },
      /**
       * 同盾黑名单调用需要的脚本
       **/
      get_tokenId() {
        window._fmOpt = '';
        var tokenId = this.tokenId;
        (function () {
          _fmOpt = {
            partner: 'haoliwang',
            appName: 'haoliwang_web',
            token: tokenId,
          };
          var cimg = new Image(1, 1);
          cimg.onload = function () {
            _fmOpt.imgLoaded = true;
          };
          cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=haoliwang&appName=haoliwang_web&tokenId=" + _fmOpt
              .token;
          var fm = document.createElement('script');
          fm.type = 'text/javascript';
          fm.async = true;
          fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') +
            'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(fm, s);
        })();
      },
      submit() {
        create_application(this.item).then(res=> {
            console.log(res)
        });
      }
    },
    watch: {
      // 'item': {
      //   handler(obj) {
      //     this.submit_dis = true;
      //     if(isEmptyValObj(obj)) {
      //       this.submit_dis = false;
      //     }
      //   },
      //   deep: true
      // },
    }
  }
  /*eslint-disable*/
</script>
