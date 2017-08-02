<template>
  <div class="me">
    <ul>
      <li v-for="i in list">
        <router-link :to="i.link" class="item ">
          <img :src="i.icon" width="27">
          <span >{{ i.title }}</span>
          <span class="arrow-right"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  @import  "../css/common.scss";
  .me{
    width:100%;
    background-color: #f5f5f5;
  }
  ul{
     display: flex;
     flex-direction: column;
    /*align-items: center;*/
  }
  li {
    a{
      display: block;
    }
    width:97%;
    background: #fff;
    padding-left: .3rem;
    font-size: .34rem;
    line-height: 1rem;
    position: relative;
    .item{
      color:#333;
      text-decoration: none;
    }
    &:after {
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: .3rem;
      content: '';
      height: 1px;
      background: #e7e7e7;
      width: 100%;
    }
    img {
      float:left;
      margin-top:.27rem;
      width:.55rem;
      height:.55rem;
      margin-right: .24rem;
    }
  .arrow-right{
    margin-right:0.3rem;
    float: right;
    margin-top:.45rem;
  }
  }
  li:nth-child(5), li:nth-child(6) {
    border-top: none;
    margin-top: .46rem;
  }
</style>
<script>
  /*eslint-disable*/
    export default{
        data(){
          return {
            list:[{
              title:'完善资料',
              icon:require('../assets/img/6_my_icon_01.png'),
              link:'/information'
            },
            {
              title:'我要还款',
              icon:require('../assets/img/6_my_icon_02.png'),
              link:'/home'
            },
            {
              title:'借款记录',
              icon:require('../assets/img/6_my_icon_03.png'),
              link:'/loanRecord'
            },
            {
              title:'我的红包',
              icon:require('../assets/img/coupon_01.png'),
              link:'/coupon'
            },
            {
              title:'我的银行卡',
              icon:require('../assets/img/6_my_icon_05.png'),
              link:'/bank'
            },
            {
              title:'邀请好友',
              icon:require('../assets/img/mine_main_yqhy.png'),
              link:'/inviteFriends'
            }
            ],
          }
        },
    }
</script>
