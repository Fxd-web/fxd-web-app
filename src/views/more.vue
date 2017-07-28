<template>
  <div class="more">
    <ul>
      <li v-for="(i,index) in list" @click='linkto(i.link,index)'>
        <img :src="i.icon" width="27"/>
        {{ i.title }}
        <span class="arrow-right"></span>
      </li>
    </ul>
    <div class="logout" @click="$store.commit('TOGGLE_DIALOG','alert')">
      退出登录
    </div>
  </div>
</template>
<style  lang="scss" scoped>
  @import  "../css/common.scss";
  .more{
    height:100%;
    background-color: #f5f5f5;
  }
  ul{
    margin-bottom: .8rem;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 li{
    width:97%;
    background: #fff;
    padding-left:.3rem;
    font-size: .32rem;
    line-height: 1rem;
    position: relative;
    &:after{
      display: inline-block;
      position: absolute;
      bottom:0;
      left: .3rem;
      content: '';
      height: 1px;
      background: #e7e7e7;
      width: 100%;
    }
    &:first-child{
      border-top:none;
    }
    &:last-child:after{
      content: none;
    }
    img{
      width:.5rem;
      height:.54rem;
      float: left;
      margin-top:.3rem;
      margin-right: .24rem;
    }
  .arrow-right{
    margin-right:0.3rem;
    float: right;
    margin-top:.45rem;
  }
  }
  .logout{
    background: #fff;
    margin-top: .5rem;
    font-size: .32rem;
    line-height: 1rem;
    height:1rem;
    text-align: center;
  }
</style>
<script type="text/ecmascript-6">
  /*eslint-disable*/
    export default{
        data(){
          return {
            msg:'您确认要退出登录吗？',
            list:[{
              title:'关于我们',
              icon:require('../assets/img/7_gd_icon_05.png'),
              link:'https://h5.faxindai.com:8028/fxd-h5/page/more/about.html'
            },
            {
              title:'常见问题',
              icon:require('../assets/img/7_gd_icon_06.png'),
              link:'https://h5.faxindai.com:8028/fxd-h5/page/more/question.html'
            },
            {
              title:'意见反馈',
              icon:require('../assets/img/7_gd_icon_07.png'),
              link:'https://h5.faxindai.com:8028/fxd-h5/page/more/feedBack.html'
            },
            {
              title:'客服热线',
              icon:require('../assets/img/7_gd_icon_10.png'),
            },
            {
              title:'修改密码',
              icon:require('../assets/img/7_gd_icon_07.png'),
              link:'https://h5.faxindai.com:8028/fxd-h5/page/more/feedBack.html'
            }],
          }
        },
        mounted() {
        },
        methods:{
          alertCb(bool){
            !bool||this.$store.dispatch('user_logout', this.$store.getters.user);
          },
          linkto(data,index){
            if(index == (this.list.length-1)){
              this.$store.commit('TOGGLE_DIALOG','actionsheet');
              return
            }
            location.href = data;
          }
        }
    }
</script>
