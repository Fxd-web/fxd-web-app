<template>
  <div class="wrap">
    <div class="short"></div>
    <div class="wrap_accut" id="coupon" v-cloak>

      <div id="couponList" v-for="(coupon,index) in couponList" v-if="coupon_list">
          <div class="msage" @click="goDetail(index)">
            <img src="../../assets/img/coupon.png"/>
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
      <div class="wrap" v-if="!coupon_list">
        <div class="wrap_head null">
          <img src="../../assets/img/faxindai_logo.png" alt="" />
          <p class="change">您当前暂无优惠券</p>
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
          coupon:'' ,
          coupon_list:true,
          detail:'',

        }
    },
    mounted(){
    get_coupon().then(res=>{
      this.couponList = res;
    })
    },
    methods:{
      goDetail(index){
        get_coupon().then(res=>{
          this.detail = JSON.stringify(res[index]);
        });
        console.log(this.detail);

//       this.$router.push({path:`/couponDetail?detail= ${this.detail}`})
    }
    }


  }

</script>
