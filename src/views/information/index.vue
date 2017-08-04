<template>
  <div>
    <div class="case_main">
      <div class="case_main_body">
        <div class="case_head">
          <div class="case_progress">
            <p class="case_progress-con"><span :style="{width: progressWidth + '%' }"></span></p>
            <p class="case_progress-p"><span v-for="(i, index) in list.length">{{100/list.length*index}}%</span><span>100%</span></p>
          </div>
          <p class="case_head-p">资料填写进度达到100%,即可借款</p>
        </div>
        <p class="case_tip">
          <img src="../../assets/img/case_main_i.png" alt=""> 请按顺序进行各项资料填写
      </p>
        <div class="case_con">
          <ul>
            <li @click="link(i.link)" v-for="(i,index) in list" :class="(index+1)<nextStep||nextStep<0?'act':''">
              <p>
                <span>{{i.title}}</span>
                <span>{{i.des}}</span>
              </p>
              <p>
                <span data-tip="已完成">未完成</span>
              </p>
            </li>
          </ul>
        </div>
        <fxd-button class="case_btn" @click.native="submit" :disabled="isdisabled">立即申请</fxd-button>
      </div>
      <transition name="router-slid" mode="out-in">
        <router-view class="case_main_con"></router-view>
      </transition>
    </div>
  </div>
</template>


<script>
  /*eslint-disable*/
  import {
    get_customer_authInfo_schedule
  } from '../../service/';
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import { Alert } from 'fxd-components-example';
  export default {
    data() {
      return {
        nextStep: 0,
        progressWidth: 0,
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
          link: 'information/authentication',
        }],
        btnAct: 'act',
        isdisabled: true, // 按钮不可点击
      }
    },
    computed: {
      ...mapGetters([
        'information',
      ]),
    },
    created() {
       this.init();
    },
    methods: {
      ...mapActions([
        'get_customer_authInfo_schedule'
      ]),
      ...mapMutations([
        'INFORMATION_LINKTO',
        'NEXT_PAGE'
      ]),
      init() {
        if(this.$route.path!=='/information') return;
        get_customer_authInfo_schedule().then((data) => {
          if(!data) return false
            this.progressWidth = data.nextStep<0?100:100/this.list.length*(data.nextStep-1);
            this.nextStep = data.nextStep;
            if(data.nextStep<0||(data.nextStep+1)>=this.list.length){
              this.isdisabled = false // 按钮可以点击
            }
        })
      },
      link(url) {
        this.NEXT_PAGE(url)
//        let nextStep = this.nextStep;
//        this.INFORMATION_LINKTO({
//          item,
//          index,
//          list,
//          nextStep,
//        });
      },
      submit() {
        Alert('是否愿意家人知晓?').then(res=> {
            console.log(res)
        })
      }
    },
     watch: {
       $route() {
         this.init();
       },
     },

  }
  /*eslint-disable*/
</script>


<style lang="scss" scoped>
  .case_main {
    .case_btn{
      margin-top: .5rem;
    }
    .case_head-p{
      padding-bottom: .2rem;
    }
    padding-bottom: .2rem;
    line-height: 1.5;
  }

  p {
    font-size: .24rem;
    margin: .2rem 0;
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

  .case_main img {
    display: inline-block;
    width: .28rem;
    vertical-align: middle;
  }

  .case_main .case_tip img {
    width: .44rem;
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
