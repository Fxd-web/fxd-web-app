<template>
  <div  class="home">
    <div class="main-header">
      <div class="banner">
        <fxd-swiper v-model="bannerList"/>
      </div>
      <div class="dialog">
        <img src="../assets/img/home_dialog_icon.png" alt="">
        <ul>
          <li v-for="i in queryLoanRecordList">{{i.content}}</li>
        </ul>
        <span></span>
      </div>
      <img src="../assets/img/main_qr_code.png" class="wx" v-if="isWX" @click="toggle_popup_wx">
    </div>
    <div class="main-con" id="main-con">
      <!--主产品-->
        <div class="product-normal" v-for="i in productlist.products" v-if="!productlist.type" @click="linkCase(i.id)">
            <img :src="i.ext_attr_.icon_" alt="" class="product-normal-left">
            <div class="product-normal-center">
                <h2>{{i.name_}} <span v-for="j in i.ext_attr_.tags">{{j}}</span></h2>
                <p>{{i.ext_attr_.amt_desc_}}</p>
            </div>
            <div class="product-normal-right">
                <p class="arrow-right">我要借款</p>
            </div>
        </div>
      <!--拒绝导流部分-->
        <fxd-product-reject
          :data="productlist"
          :viewHeight="viewHeight"
          v-if="productlist.type" />
    </div>
    <div class="main-footer">
        <ul>
          <li @click="repayAmount">
            <img src="../assets/img/home_footer_borrow.png" alt="">
            <p>我要还款</p>
          </li>
          <li>
            <img src="../assets/img/home_footer_load_progress.png" alt="">
            <p>借款进度</p>
          </li>
          <li>
            <img src="../assets/img/home_footer_loan_detial.png" alt="">
            <p>费用说明</p>
          </li>
        </ul>
    </div>
    <!--************* 微信弹出层 *************-->
    <fxd-mask v-if="mask.popupWx">

      <div class="wx-con" v-if="mask.popupWx">

        <div class="wx-cancel" @click="toggle_popup_wx">+</div>
        <div class="wx-top">
          <img src="../assets/img/wx.png" alt="">
          <div>
            <p>关注发薪贷微信</p>
            <p>公众号: <span>急速发薪</span></p>
          </div>
        </div>
        <div class="wx-img">
          <img src="../assets/img/qr_code.png" alt="">
        </div>
        <div class="wx-tip">
          <p>微信扫一扫 即可关注</p>
          <p>精彩活动 不容错过</p>
        </div>
        <div class="wx-btn">
          <fxd-button type="inset" @click.native="copy_to_clipboard" data-clipboard-text="急速发薪" class="setcopy_gettext">复制微信号</fxd-button>
          <fxd-button type="inset"><a href="#" id="downloadIMG" download>保存图片</a></fxd-button>
        </div>
      </div>
    </fxd-mask>
  </div>
</template>

<script type="text/ecmascript-6">
  /*eslint-disable*/
  import { Toask } from 'fxd-components-example';
  import swiper from '../components/ui/swiper';
  import productReject from '../components/featrue/productReject.vue';
  import Clipboard from 'clipboard';
  import { isMobile } from '../util/';
  import {
    get_limitProductlistApi,
    get_queryLoanRecordList,
    get_banner,
    get_apply_status,
    n_summary
  } from '../service';
  import {
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        productlist: [], // 产品数据
        queryLoanRecordList: [], // 滚动电话
        bannerList: [], // banner
        isWX: !isMobile('wx'), // 判断是不是微信浏览器
        mask: {   // 弹出层开关
          popupWx: false,
        },
      };
    },
    props: ['viewHeight'],
    components: {
      'fxd-swiper': swiper,
      'fxd-product-reject': productReject
    },
    mounted() {
//      n_summary().then(res=>{
//          console.log(res)
//      })
      this.init();
    },
    methods: {
      ...mapMutations([
        'DEAL_REPAYAMOUNT',
        'SET_PRODUCT',
        'SET_LOCAL_PRODUCT',
        'DEAL_PRODUCT_CASE',
      ]),
      init() {
        this.page_logic(); //页面逻辑
        this.page_async(); //交互请求
      },
      /**
       * 初始化黏贴板
       */
      page_logic() {
        new Clipboard('.setcopy_gettext');
      },
      /**
       * 异步获取数据
       */
      page_async() {
        Promise.all([get_limitProductlistApi(),get_queryLoanRecordList(),get_banner()]).then(res => {
          let [productlist, queryLoanRecordList, bannerList] = res;
          if(!productlist) return;
          this.productlist = productlist;
          this.queryLoanRecordList = queryLoanRecordList;
          this.bannerList = bannerList.files_;
          return productlist.products;
        }).then( res => {
          this.SET_PRODUCT(res);
        })
      },
      /**
       * 点击复制微信提示文字
       */
      copy_to_clipboard() {
        Toask('您已复制成功,赶紧去微信关注"急速发薪"公众号吧!');
      },
      /**
       * 微信弹出层切换
       */
      toggle_popup_wx() {
        this.mask.popupWx = !this.mask.popupWx;
        try {
          document.getElementById('downloadIMG').setAttribute("href", `${require('../config').local}img/qr_code.png`);
        } catch (e) {}
      },
      /**
       * 我要还款
       */
      repayAmount() {
        get_apply_status().then(res =>{
          this.DEAL_REPAYAMOUNT(res);
        })
      },
      linkCase(pid) {
        get_apply_status(pid).then(res =>{
          this.SET_LOCAL_PRODUCT(pid);
          this.DEAL_PRODUCT_CASE(res)
        })
      },
    },
  };
  /*eslint-disable*/
</script>
<style lang="scss" scoped>
  .home{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #f5f5f5;
    .main-header{
      position: relative;
      .banner{
        height: 3.76rem;
        overflow: hidden;
      }
      .dialog{
        background: #fff;
        height:.84rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 .3rem;
        overflow: hidden;
        position: relative;
        &:after, &:before{
          content: '';
          position: absolute;
          left: 0;
          height: .2rem;
          background: #fff;
          width: 100%;
          z-index: 100;
        }
        &:after{
          top: 0;
        }
        &:before{
          bottom: 0;
        }
        img{
          width: .36rem;
        }
        ul{
          animation: turndownforwhat 20s infinite linear ;
          height: 4.2rem;
          color: #8c8c8c;
          li{
            line-height: 1.5;
            font-size: .28rem;
          }
        }
      }
      .wx{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.6rem;
        z-index: 100;
      }
    }
    .main-con{
      flex: 1;
      /*主产品*/
      .product-normal{
        &:active{
          background: rgba(255,255,255,.4);
        }
        margin-top: .1rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem .3rem;
        line-height: 1.5;
        #{&}-left{
          width: .76rem;
          img{
            background: #c8c8cd;
            padding-right: .8rem;
          }
        }
        #{&}-center{
          h2{
            display: flex;
            align-items: center;
            color: #666;
            span{
              font-size: .24rem;
              color: #1da9ff;
              border-radius: .4rem;
              border: 1px solid #1da9ff;
              padding: .02rem .2rem;
              margin-left:.3rem;
            }
          }
          p{
            color: #8c8c8c;
          }
        }
        #{&}-right{
          color: #1da9ff;
          font-size: .24rem!important;
          .arrow-right{
            padding-right: .5rem;
          }
        }
      }
    }
    .main-footer{
      /*border: 1px solid blue;*/
      margin-bottom: .1rem;
      background: #fff;
      ul{
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        color: #7e878e;
        li{
          flex: 1;
          padding: .3rem 0;
          &:active{
            background: rgba(0,0,0,.04);
          }
        }
        img{
          height:.56rem;
          width: .56rem;
          padding-bottom: .2rem;
        }
      }
    }


    /**********微信弹出框样式**********/
    .wx-con{
      @media only screen and (max-device-width: 320px) {
        .wx-con{
          padding: .5rem!important;
        }
      }
      padding:1rem;
      background: #fff;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate( -50%, -50%);
      z-index: 101;
      .wx-cancel{
        position: absolute;
        right: .2rem;
        top:.4rem;
        display: inline-block;
        transform: rotate(45deg);
        font-size: .7rem;
        line-height: 0;
      }
      .wx-img{
        img{
          width: 4.8rem;
        }
      }
      .wx-top{
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          width: 1.08rem;
        }
        p{
          line-height: 1.6;
        }
        span{
          color: #1da9ff;
        }
      }
      .wx-tip{
        p{
          text-align: center;
          font-size: .24rem;
          line-height: 1.6;
        }
      }
      .wx-btn{
        margin-top: .5rem;
        display: flex;
        a{
          color: #fff;
          text-decoration: none;
        }
        div{
          border-radius: 15px;
          padding: .2rem;
          width: 42%;
        }
        div:last-child{
          margin-left: .3rem;
          background: #f49332;
          &:active{
            background: rgba(255, 127, 0, 0.53);
          }
        }
      }
    }
  }
</style>
