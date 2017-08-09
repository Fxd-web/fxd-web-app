<template>
  <div class="wrap" id="bankInfo">
    <div class="wrap" v-if="!bankList||bankList.length==0">
      <div class="wrap_head null">
        <img src="../../assets/img/faxindai_logo.png" alt="" />
        <p class="change">您当前暂无银行卡</p>
      </div>
    </div>
    <div class="my_bank" v-else>
      <template v-for="bank in bankList">
        <div class="short"></div>
        <div>
          <div class="my_bank_edit">
            <img :src="bank.bank_img_">
            <ul>
              <li>{{bank.bank_name_}}</li>
              <li class="li1">{{bank.card_name_}}</li>
            </ul>
            <div class="defaultBankCard" v-if="bank.if_default_==1"></div>
          </div>
          <div class="clear"></div>
          <p>{{bank.card_no_}}</p>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .my_bank{
    background: #fff;
  .my_bank_edit {
    height:1.2rem;
    padding-top: .26rem;
    padding-left: .36rem;
    img:first-child {
      width: 1rem;
      float: left;
    }
    ul {
      float:left;
      padding-left:.4rem;
      li {
        color:#595757;
        font-size: .32rem;
        line-height: .48rem;
      }
      .li1 {
        color:#b4b4b5 !important;
        font-size:.28rem !important;
      }
    }
    img:last-child {
      float:right;
      width: .48rem;
      margin-right: 0.5rem;
      padding: .2rem;
    }
    .defaultBankCard {
      font-size: .32rem;
      margin-right: .3rem;
      color: #00aaee;
      float: right;
      border-right: 2px solid #00aaee;
      border-bottom: 2px solid #00aaee;
      height: .28rem;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      width: .16rem;
      top: .2rem;
  }
  }
  p {
    text-align: right;
    border-top: 1px solid #ddd;
    color: #595757;
    font-weight: bolder;
    padding-right: .2rem;
    height:1rem;
    line-height: 1rem;
    font-size:.32rem;
  }
}

</style>
<script>
  /*eslint-disable*/
  import {
    get_BankInfo,
  } from '../../service/';
  export default{
      data(){
        return{
          bankList:[],
          bank:''
        }
      },
    mounted(){
      get_BankInfo().then((res)=>{
          this.bankList = res;
          console.log(res)
      })
    },
    methods:{
       init(res){
          for(let i=0;i<res.length;i++){ //解密？
             console.log('ssssssss')
          }
       }
    }



  }
</script>
