<template>
  <div>
    <ul>
      <li v-for="i in list">
        <router-link :to="i.link" class="item">
          <img :src="i.icon" width="27">
          <span>{{ i.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  li {
    background: #fff;
    padding-left: .3rem;
    font-size: .32rem;
    line-height: 1rem;
    vertical-align: middle;
    position: relative;
    .item{
      color:#333;

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
    /*&:first-child {*/
      /*border-top: none;*/
    /*}*/
    /*&:nth-child(5), &:nth-child(6) {*/
      /*border-top: none;*/
      /*margin-top: .46rem;*/
    /*}*/
    /*&:nth-child(4):after,&:nth-child(5):after, &:nth-child(6):after{*/
      /*!*content: none;*!*/
    /*}*/
    img {
      float:left;
      margin-top:.25rem;
      width:.5rem;
      height:.5rem;
      margin-right: .24rem;
    }
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
