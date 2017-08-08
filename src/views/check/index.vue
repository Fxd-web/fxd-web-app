<template>
  <div>

  </div>
</template>


<script>
  /*eslint-disable*/
  import { Toask } from 'fxd-components-example';
  import {
    get_customer_authInfo_schedule
  } from '../../service/';
  import {
    mapActions,
    mapMutations
  } from 'vuex'
  import { Alert } from 'fxd-components-example';
  export default {
    data() {
      return {
        nextStep: 0,
        progressWidth: 0,
        customer_authInfo: null,
        tipText: '未完成',
        list: [{
          title: '个人信息',
          des: '完善您的个人信息',
          link: 'information/personal',
        }, {
          title: '联系人信息',
          des: '完善您的联系人信息',
          link: 'information/linkman',
        }, {
          title: '职业信息',
          des: '完善您的职业信息',
          link: 'information/profession',
        }, {
          title: '第三方认证',
          des: '完善第三方认证有助于通过审核',
          link: 'information/authentication',
        }, {
          title: '芝麻信用',
          des: '授权获取您的芝麻信用信息',
          link: 'information/sesame',
        }],
        btnAct: 'act',
        isdisabled: true, // 按钮不可点击
      }
    },
    created() {
       this.init();
    },
    methods: {
      ...mapActions([
        'get_customer_authInfo_schedule'
      ]),
      ...mapMutations([
        'SAVE_CUSTOMERAUTHINFOSCHEDULE',
        'NEXT_PAGE',
        'SET_IFFAMILYKNOW'
      ]),
      init() {
        if(this.$route.path!=='/information') return;
        get_customer_authInfo_schedule().then((data) => {
            this.SAVE_CUSTOMERAUTHINFOSCHEDULE(data);
            this.customer_authInfo = data;
            this.progressWidth = data.nextStep < 0 ? 100 : 100 / this.list.length * (data.nextStep - 1);
            this.nextStep = data.nextStep;
            if(data.nextStep < 0 || data.nextStep > this.list.length) { //next个人信息录入下一进度内容，1-个人信息 2-联系人 3-职业信息 4-三方认证 5-芝麻信用 -1-全部已完成 -2-当前状态无法修改任何资料
              this.isdisabled = false // 按钮可以点击
            }
        })
      },
      link(data, index) {

        let nextStep = this.nextStep;

        if(nextStep == -2) {
            Toask(`当前状态无法修改资料`);
            return
        }

        if((index + 1) > nextStep) { // 点击的大于下一步要填写的提示
            Toask(`请选择${this.list[nextStep - 1].title}`);
           return
        }

        if(this.customer_authInfo.isZmxyAuth == '1') {
          Toask(`您正在认证中，请勿重复认证！`);
          return
        }

        if(this.customer_authInfo.isZmxyAuth == '2') {
          Toask(`您已验证完成,无需多次验证!`);
          return
        }

        this.NEXT_PAGE(data.link);

      },
      submit() {
        Alert('是否愿意家人知晓?').then(res=> {
          this.SET_IFFAMILYKNOW(res);
          this.NEXT_PAGE(`loan_apply`);

        })
      }
    },
    filters: {
       filterTipText(val, index, customer_authInfo) {
         try{
           return index === 4 && customer_authInfo.isZmxyAuth == 1 ? '认证中' :val;
         }catch (e){
           return val
         }
       },
     },
     watch: {
       $route() {
         this.init();
       },
     },

  }
  /*eslint-disable*/
</script>


<style lang="scss">
  .case_main {
    .case_btn{
      margin-top: .5rem;
    }
    .case_head-p{
      padding-bottom: .2rem;
    }
    padding-bottom: .2rem;
    line-height: 1.5;
    p {
      margin: .2rem 0;
    }
    .case_main_body{
      p {
        font-size: .24rem;
      }
    }
  }


  .case_head {
    font-size: .24rem;
    background: #01aaef;
    color: #fff;
    text-align: center;
  }

  .case_progress {
    width: 90%;
    margin: 0 auto;
    padding-top: .4rem;
  }

  .case_head-p {}

  .case_progress-con {
    background: #edeae6;
    border-radius: .18rem;
    height: .36rem;
    overflow: hidden;
  }

  .case_progress-con span {
    width: 0;
    height: 100%;
    display: block;
    background: #92c44b;
  }

  .case_progress-p {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .case_con {
    margin-left: 5%;
    padding: .2rem 0 0;
  }

  .case_tip {
    margin-left: 5%!important;
    color: red;
    font-size: .28rem;
    text-align: left;
  }

  .case_con li {
    border-bottom: 1px solid rgba(157, 158, 160, 0.38);
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    color: #9d9ea0;
    font-size: .24rem;
    padding-left: 1rem;
    padding-right: .2rem;
  }

  .case_con li:nth-child(1) {
    background: url("../../assets/img/case_main1.png") no-repeat left center;
    background-size: .84rem .84rem;
  }

  .case_con li:nth-child(2) {
    background: url("../../assets/img/case_main2.png") no-repeat left center;
    background-size: .84rem .84rem;
  }

  .case_con li:nth-child(3) {
    background: url("../../assets/img/case_main3.png") no-repeat left center;
    background-size: .84rem .84rem;
  }

  .case_con li:nth-child(4) {
    background: url("../../assets/img/case_main4.png") no-repeat left center;
    background-size: .84rem .84rem;
  }

  .case_con li:nth-child(5) {
    background: url("../../assets/img/case_main5.png") no-repeat left center;
    background-size: .84rem .84rem;
  }

  .case_con li:last-child {
    border: none;
  }

  .case_main .case_tip img {
    width: .44rem;
    display: inline-block;
    vertical-align: middle;
  }

  .case_tip {
    margin-left: 5%;
  }

  .case_con li p:first-child {
    flex: 1;
  }

  .case_con li p:first-child span:first-child {
    font-size: .36rem;
    display: block;
    color: #000;
  }

  .case_con li p:last-child span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .case_con li p:last-child span img {
    order: 2;
  }

  .case_con li.act p:last-child span:after {
    content: attr(data-tip);
    padding-left: 1em;
    color: #01aaef;
  }

  .case_con li.act p:last-child span:before {
    content: '';
    background: #fff;
    display: inline-block;
    height: 100%;
    width: 4em;
    position: absolute;
  }

  @media screen and (max-width: 320px) {
    .case_head {
      height: 110px;
    }
    .case_progress {
      padding-top: 10px;
    }
    .case_con {
      margin-top: -20px;
    }
    .case_con li p:first-child {
      width: 120px;
    }
    .case_btn {
      margin-top: -10px;
    }
  }

  .case_main_con{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
</style>
