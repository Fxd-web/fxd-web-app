<template>
  <div id="load_progress">
    <div class="load_progress">
      <div class="wrap_head null" style="display: none">
        <img src="../../assets/img/faxindai_logo.png" alt="">
        <p class="change">您当前无借款进度</p>
      </div>
      <ul>
        <li v-for="i in list">
          <h2><span></span>{{i.apply_status_}}</h2>
          <p>{{i.content_}}</p>
          <p>{{i.audit_time_}}</p>
        </li>
      </ul>
    </div>
    <div class="reject_fxd" style="display:none">
      <h2 class="reject_fxd_title">被拒无需担心，试试通过率更高的产品？</h2>
      <div class="reject_fxd_body">
        <div class="reject_fxd_head"><img :src="product.ext_attr_.icon_" width="28"><span>{{product.name_}}</span><span class="">{{product.ext_attr_.tags}}</span></div>
        <div class="reject_fxd_con">
          <p><span>{{product.principal_bottom_}}-{{product.principal_top_}}</span><span>额度</span></p>
          <p><span>{{product.ext_attr_.period_desc_}}</span><span>期限</span></p>
        </div>
        <a href="javascript:void(0)" class="reject_fxd_btn" @click="needLoanSmall">立即申请</a>
      </div>
    </div>
    <div class="check_false_foot" style="display: none">
      <p>试试其他平台?</p>
      <a href="javascript:void(0)" onclick="location.href='http://192.168.6.133/fxd-esb/esb/case/select_platform.html'" class="case_btn act" id='case_btn'>去看看</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .load_progress {
    background: #fff;
    padding: 0 .3rem;
    ul{
      position: relative;
      li{
        padding-top: .7rem;
        padding-left: .8rem;
      }
      li:last-child p{
        position: relative;
        z-index: 100;
      }
      li:last-child p:after{
        content: '';
        width: 2px;
        height: 100%;
        position: absolute;
        left: -.5rem;
        background: #fff;
        top: .06rem;
      }
    }
    ul:after {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      left: .3rem;
      background: #d6d6d6;
      top: 0;
      z-index: 99;
    }
  }
  .load_progress h2 {
    font-weight: normal;
    font-size: .36rem;
    color: #000;
    position: relative;
  }

  .load_progress h2 span {
    background: #fff;
    height: .44rem;
    width: .44rem;
    border: 1px solid #01aaef;
    display: inline-block;
    border-radius: 1rem;
    position: absolute;
    left: -.7rem;
    z-index: 100;
  }

  .load_progress h2 span:after {
    content: '';
    height: .22rem;
    width: .22rem;
    background: #01aaef;
    display: inline-block;
    border-radius: 1rem;
    position: absolute;
    left: .1rem;
    top: .1rem;
  }

  .load_progress ul p {
    line-height: .5rem;
    color: #8c8c8c;
    font-size: .3rem;
  }

  .load_progress ul p:last-child {
    color: #b7babd;
    font-size: .24rem;
  }
  .reject_fxd {
    width: 80%;
    margin: 20px auto 0;
  }

  .reject_fxd_title {
    font-weight: normal;
    color: #00aaee;
    font-size: .24rem;
  }

  .reject_fxd_body {
    margin-top: .1rem;
    box-sizing: border-box;
    padding: .3rem;
    border: .02rem solid #e0e6f1;
    border-radius: .1rem;
    box-shadow: .01rem -.01rem .01rem #e0e6f1, -.01rem .01rem .01rem #e0e6f1
  }

  .reject_fxd_head {
    display: flex;
    align-items: center;
    margin-bottom: .3rem;
  }

  .reject_fxd_head span:nth-child(2) {
    padding: 0 .1rem;
    font-size: .32rem;
    color: #000;
  }

  .reject_fxd_head span:nth-child(3) {
    border-radius: .4rem;
    padding: .02rem .1rem;
    font-size: .26rem;
    transform: scale(.8);
    color: #1da9ff;
    border: 1px solid #1da9ff;
  }

  .reject_fxd_con {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .reject_fxd_con p {
    line-height: .4rem;
    text-align: center;
    flex: 1;
  }

  .reject_fxd_con:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    border-left: 1px dashed rgba(000, 000, 000, .3);
  }

  .reject_fxd_con span {
    font-size: .28rem;
    display: block;
    color: rgba(000, 000, 000, .8)
  }

  .reject_fxd_con span:last-child {
    font-size: .24rem;
    color: rgba(000, 000, 000, .3)
  }

  .reject_fxd_btn {
    display: block;
    background: #0ae;
    color: rgba(999, 999, 999, .9);
    text-align: center;
    width: 3.4rem;
    margin: .2rem auto;
    border-radius: .1rem;
    font-size: .32rem;
    line-height: .7rem;
    text-decoration: none;
    background: linear-gradient(#3cc3f9, #04a4fb);
  }
  .check_false_foot {
    width: 90%;
    margin: .8rem auto 0;
    text-align: center;
  }

  .check_false_foot p {
    font-size: .4rem;
    color: #00aaee;
  }

  .check_false_foot a {
    display: block;
    background: #0ae;
    color: rgba(999, 999, 999, .9);
    text-align: center;
    width: 4.4rem;
    margin: .2rem auto;
    border-radius: .1rem;
    line-height: .7rem;
    text-decoration: none;
    background: linear-gradient(#3cc3f9, #04a4fb);
    margin-top: .8rem;
    font-size: .4rem;
  }
</style>
<script>
  /*eslint-disable*/
  import '../../lib/jquery-1.7.2.js'
  import {
    query_LoanStatus,
    get_LimitProductlistApi,
    get_apply_status
  } from '../../service/';
  export default{
    data() {
      return {
        list:[],
        productId:'',
        leadStroke:'',
        product: {
          name: '工薪贷',
          amt_desc_: '1000-5000元',
          ext_attr_: {
            icon_: '',
            period_desc_: '5-50周',
          },
          refuseMsg: '',
        },
      }
    },
    mounted(){
      query_LoanStatus().then((res) => {
        this.list = res;
        for(let i=0; i<this.list.length; i++){
           if(this.list[i].apply_status_ == "已拒绝"){
               this.leadStroke = true;
               $('.reject_fxd').show();
           }
       }
      }),
      get_apply_status().then((res) => {
        this.productId = res.product_id_;
      }),
      get_LimitProductlistApi().then((res)=>{
        if (this.leadStroke = true) {
          if (this.productId  == "P001005") {        //白领贷被拒，导流工薪贷
            for (let i = 0; i < res.products.length; i++) {
              if (res.products[i].id == "P001002") {
                this.product = res.products[i]
              }
            }
          } else if (this.productId  == "P001002") { //工薪贷被拒，导流急速贷
            for (let j = 0; j < res.products.length; j++) {
              if (res.products[j].id == "P001004") {
                this.product = res.products[j]
              }
            }
          } else if (this.productId  == "P001004") { //急速贷被拒，导流第三方平台
            $('.reject_fxd').hide();
            $('.check_false_foot').show();
          }
        }
      })

    },
    methods: {
      needLoanSmall: function() {
//        sessionStorage.product_ID = this.productId;
        if (this.productId == 'P001002') {
//          location.href = "../case/choose_money.html?out_operate_fee_2=" +
//            sessionStorage.out_operate_fee_2 + "&out_day_service_fee_2=" + sessionStorage.out_day_service_fee_2 +
//            "&out_day_interest_fee_2=" + sessionStorage.out_day_interest_fee_2;
        } else{ //导流工薪贷,点立即申请，跳转借款申请页面
//          location.href = "../case/case_main.html" ;
        };
      },
    }
  }
</script>
