<template>
  <div class="wrap">
    <div class="short"></div>
    <div class="wrap_accut" id="coupon" v-cloak>
      <div id="couponList">
        <div>
          <div class="msage">
            <img src="../../assets/img/coupon.png">
            <div class="words1">
              <div>
                红包
              </div>
              <div style="display: none;">
                已过期
              </div>
            </div>
            <div class="words2">
              <span>{{coupon.total_amount_}}</span>元
              <a v-if="coupon.total_amount_!=coupon.residual_amount_">/</a>
              <span>
                <div v-if="coupon.total_amount_!=coupon.residual_amount_">
                剩余{{coupon.residual_amount_}}元
                </div>
              </span>
            </div>
            <div class="words3">
              有效期：{{coupon.validity_period_from_}}
              至{{coupon.validity_period_to_}}
            </div>
          </div>
        </div>
      </div>
      <div class="shuoming">
        <div>
          <h2>使用说明</h2>
          <ul>
            <li>1、本券只可抵扣利息使用，不可提现，不可转让；</li>
            <li>2、本券从还款第一期起即可使用；</li>
            <li>3、可分期使用，如当期本金100元，当期利息21元，
              还款总额仅100元，21元利息已抵扣，抵扣利息直至100元优惠券抵扣完毕；</li>
            <li>4、本券有效期为{{coupon.validity_period_from_|myDate}} 至 {{coupon.validity_period_to_|myDate}}；</li>
            <li>5、本券不可与其他优惠券叠加使用；</li>
            <li>6、本券最终解释权归发薪贷所有。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .msage {
    height: 20%;
    margin: .4rem .3rem 0 .3rem;
    position: relative;
  }
  .msage img {
    width: 100%;
    height: 2.84rem;
  }
  .words1 {
    position: absolute;
    width: 100%;
    top: .3rem;
    color: #fff;
    font-size: .46rem;
  }
  .words1 div {
    float: left;
  }
  .words1 div:first-child {
    margin-left: 22%;
  }
  .words1 div:last-child {
    display: inline-block;
    padding: .12rem;
    background: rgb(112,112,112);
    border-radius: .06rem;
    float: right;
    margin-right: .3rem;
    font-size: .28rem;
  }
  .words2{
    position: absolute;
    top: .9rem;
    left: 22%;
    color: #fff;
    font-size: .84rem;
  }
  .words2 span:first-child{
    font-size: .96rem;
    font-weight: bold;
  }
  .words2 span:last-child{
    font-size: .46rem;
    display: inline-block;
  }
  .words3{
    position: absolute;
    top: 2.2rem;
    left: 22%;
    color: #fff;
    font-size: .28rem;
  }
  .shuoming{ padding: 0 .3rem;  font-size: .26rem;  color: #666; margin-top: .3rem;}
  .shuoming>div{ border: 1px solid #ccc; width: 100%;  }
  .shuoming ul{ padding: 0 .3rem;}
  .shuoming li{ width: 100%;line-height: .5rem;}
  .shuoming h2{ margin-left: .3rem; margin-top: .3rem; margin-bottom: .1rem;}
</style>
<script>
  /*eslint-disable*/
  import {
    get_coupon,
  } from '../../service/';
  export default{
    data(){
      return{
        couponList:[],
        coupon:'',
      }
    },
    mounted(){
      console.log(this.$route.query.detail);
      console.log(eval(this.$route.query.detail));
      get_coupon().then((res)=>{
        this.couponList = res;
      })

    },
    methods:{

    }

  }
</script>
