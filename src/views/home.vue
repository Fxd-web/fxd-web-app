<template>
  <div  class="home">
    <div class="main-header">
      <div class="banner">
      </div>
      <div class="dialog">
        <img src="../assets/img/home_dialog_icon.png" alt="">
        <ul><li>2017-08-20 **骅 130****56 借款1,000 元</li><li>2017-07-26 **磊 156****19 借款500 元</li><li>2017-07-26 **磊 156****19 借款1,000 元</li><li>2017-07-26 **磊 156****19 借款500 元</li><li>2017-07-26 **端 156****19 借款500 元</li><li>2017-07-26 **磊 156****19 借款1,000 元</li><li>2017-07-25 **源 133****86 借款500 元</li><li>2017-07-25 **磊 156****19 借款500 元</li><li>2017-07-25 **波 145****00 借款1,000 元</li><li>2017-07-25 **丽 183****00 借款1,000 元</li></ul>
        <span></span>
      </div>
      <img src="../assets/img/main_qr_code.png" class="wx" v-if="isWX" @click="toggle_popup_wx">
    </div>
    <div class="main-con" id="main-con">
      <!--主产品-->
        <div class="product-normal"  >
            <img src="http://192.168.6.137/fxd/M00/00/00/wKgGiVlxnnaEW81EAAAAAKYuGXo782.png" alt="" class="product-normal-left">
            <div class="product-normal-center">
                <h2>工薪贷 <span>灵活还款</span></h2>
                <p>1000-5000元</p>
            </div>
            <div class="product-normal-right">
                <p class="arrow-right">我要借款</p>
            </div>
        </div>
      <!--拒绝导流部分-->
        <div class="product-reject"  v-if="false">
          <h2  class="product-reject-header"><div class="crying-face"><span></span></div>很抱歉，您的借款申请审核失败</h2>
            <div class="product-reject-con" :style="{'max-height': rejectHeight}">
              <p class="product-reject-tip">
                为您匹配其他第三方平台，通过率高达80%
              </p>
              <div class="product-reject-list">
                <img src="/" alt="" class="product-reject-list-left">
                <!--导流列表 s-->
                <div class="product-reject-list-con">
                    <h2>野狗金融</h2>
                    <p>额度：至少1毛钱</p>
                    <div>
                      <p>期限：<span>1-6个月</span></p>
                      <p>费用：<span>1.08%</span>/日</p>
                    </div>
                    <p><span>贵</span><span>通过率低</span><span>跑路快</span></p>
                </div>
                <!--导流列表 e-->
                <span class="product-reject-right arrow-right"></span>
              </div>
              <p class="product-reject-more">更多<span class="">>></span></p>
            </div>
        </div>
    </div>
    <div class="main-footer">
        <ul>
          <li>
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
      <transition name="smallBig">

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
          <fxd-button type="inset">复制微信号</fxd-button>
          <fxd-button type="inset">保存图片</fxd-button>
        </div>

      </div>

      </transition>

    </fxd-mask>
  </div>
</template>

<script type="text/ecmascript-6">
  /*eslint-disable*/
  import swiper from '../components/ui/swiper';
  import { isMobile } from '../util/';
  export default{
    data() {
      return {
        isWX: !isMobile('wx'),
        mask: {
          popupWx: false,
        },
        data: {
          list: [{
            img: require('../assets/img/banner_01.png'),
            link: 'home',
          }, {
            img: require('../assets/img/0107.jpg'),
            link: 'coupon',
          }, {
            img: require('../assets/img/banner_01.png'),
            link: 'home',
          }, {
            img: require('../assets/img/0107.jpg'),
            link: 'coupon',
          }],
          interval: false
        }
      };
    },
    computed:{
      rejectHeight() {
        return `${this.viewHeight.slice(0,-1)} - 7.65rem)`;
      },
    },
    props: ['viewHeight'],
    components:{
      'fxd-swiper':swiper,
    },
    mounted() {
    },
    methods:{
      toggle_popup_wx() {
        this.mask.popupWx = !this.mask.popupWx;
      },
      linkCase(pid) {
        this.$store.dispatch('get_applyStatus', {
          pid,
          linkto: true
        });
      },
    }
  };
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
        background: red;
        height: 3.76rem;
      }
      .dialog{
        background: #fff;
        height:.84rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 .3rem;
        img{
          width: .36rem;
        }
        ul{
          overflow: hidden;
          height: 50%;
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
      /*拒绝导流产品*/
      .product-reject{
        #{&}-header{
          padding: .2rem 0;
          overflow: hidden;
          text-align: center;
          color: #09adef;
          font-weight: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .32rem;
          /*  哭脸 >_<  */
          .crying-face{
            margin-right: .5rem;
            overflow: hidden;
            position: relative;
            top:-.08rem;
            span{
              display: inline-block;
              border:3px solid #09adef;
              border-radius: 50%;
              transform: translateY(90%);
              width: .32rem;
              height: .32rem;
              position: relative;
              &:after,&:before{
                content: '';
                position: absolute;
                width: .1rem;
                height: .1rem;
                background: #09adef;
                border-radius: 50%;
                top:-.2rem;
              }
              &:after{
                left: 0;
              }
              &:before{
                right: 0;
              }
            }
          }
        }
        #{&}-con{
          background: #fff;
          border-radius: 15px;
          width: calc(100% - 1rem);
          padding: .1rem;
          margin:0 auto;
          overflow-y: auto;
        }
        #{&}-tip{
          font-size: .3rem;
          padding: .2rem 0 .1rem;
          text-align: center;
          color: #4d4d4d;
        }
        #{&}-more{
          padding:.1rem 0 .3rem;
          text-align: center;
          color: #09adef;
          font-size: .32rem;
          span{
            padding-left: .1rem;
          }
        }
         /*导流列表样式*/
        #{&}-list{
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:active{
            background: #f5f5f5;
          }
          #{&}-left{
            background: #c8c8cd;
            width: 1.28rem;
            height: 1.28rem;
          }
          #{&}-con{
            flex: 1 auto;
            padding:.3rem .5rem;
            line-height: 1.5;
            h2{
              color: #1a1a1a;
              font-size: .36rem;
              font-weight: normal;
            }
            p{
              font-size: .24rem;
              color: #8c8c8c;
              span{
                color: #00aaee;
              }
            }
            &>p:nth-child(2){
              font-size: .3rem;
            }
            div{
              display: flex;
              justify-content: space-between;
              margin-bottom: .2rem;
            }
            &>p:last-child{
              &>span{
                color: #c8c8cd;
                border:1px solid #8c8c8c;
                border-radius: .1rem;
                padding:0 .1rem;
                margin-right: .2rem;
              }
            }
          }
          #{&}-right{
            display: inline-block;
          }
        }
      }
    }
    .main-footer{
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
