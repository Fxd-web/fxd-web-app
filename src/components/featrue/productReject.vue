<template>
  <div class="product-reject">
    <h2  class="product-reject-header"><div class="crying-face"><span></span></div>{{productlist.refuseMsg}}</h2>
    <div class="product-reject-con" :style="{'max-height': rejectHeight}">
      <p class="product-reject-tip">
        为您匹配其他第三方平台，通过率高达80%
      </p>
      <div class="product-reject-list" v-for="i in productlist.products" >
        <img :src="i.ext_attr_.icon_" alt="" class="product-reject-list-left">
        <!--导流列表 s-->
        <div class="product-reject-list-con">
          <h2>{{i.name_}}</h2>
          <p>额度：{{i.ext_attr_.amt_desc_ || '-'}}</p>
          <div>
            <p>期限：<span>{{i.ext_attr_.period_desc_ || '-'}}</span></p>
            <p>费用：<span>{{i.ext_attr_.charge_desc_ ? i.ext_attr_.charge_desc_.split('/')[0] : ''}}</span>{{i.ext_attr_.charge_desc_ ? i.ext_attr_.charge_desc_.split('/')[1] : '-'}}</p>
          </div>
          <p><span v-for="j in i.ext_attr_.tags">{{j}}</span></p>
        </div>
        <!--导流列表 e-->
        <span class="product-reject-right arrow-right"></span>
      </div>
      <p class="product-reject-more" @click="product_reject_link">更多<span class="">>></span></p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
</style>
<script>
    export default{
        data(){
          return{
            productlist: [],
          }
        },
        props: ['viewHeight','data'],
        computed:{
          rejectHeight() {
            return `${this.viewHeight.slice(0,-1)} - 7.65rem)`;
          },
        },
        mounted() {
          this.productlist = this.data;
        },
        methods: {
          product_reject_link() {
            location.href = '';
          },
        }
    }
</script>
