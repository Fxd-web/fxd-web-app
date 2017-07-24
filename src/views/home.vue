<template>
  <div  id="main" style='height:calc(100vh - 50px)'>
    <div class="main-banner">
      <cSwiper :list='data'></cSwiper>
    </div>
    <div class="main-borrow" @click="linkCase('P001002')">
      <div>
        <img src="../assets/img/home_01.png" alt="" width = '38' >
      </div>
      <div class="main-borrow-center">
        <p>最高<span>5000元</span> <span>灵活还款</span></p>
        <p>周期：5~50周<img src="../assets/img/home_03.png" alt="" width="17" class="main-costdes"></p>
      </div>
      <div>
        <h2>我要借款</h2>
        <img src="../assets/img/home_08.png" alt="" width="13" class="main-borrow-img">
      </div>
    </div>
    <div class="main-borrow" @click="linkCase('P001004')">
      <div>
        <img src="../assets/img/home_02.png" alt="" width="38" ></div>
      <div class="main-borrow-center">
        <p>最高<span>5000元</span><span class="main-borrow-yellow">极速审核</span></p>
        <p>周期：5~50周</p>
      </div>
      <div>
        <h2>我要借款</h2>
        <img src="../assets/img/home_08.png" alt="" width="13" class="main-borrow-img">
      </div>
    </div>
    <div class="main-my">
      <div class="main-my--refund">
        <img src="../assets/img/home_06.png" alt="" width="28">
        <span>我要还款</span>
      </div>
      <div class="main-my--borrow">
        <img src="../assets/img/home_07.png" alt="" width="28">
        <span>我的借款</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  #main{
    z-index: 9;
    overflow: hidden;
    width:100%;
  }
  .main-banner{
    max-width: 600px;
  }
  .main-borrow{
    height: 110px;
    background: #fff;
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-around;
  }
  .main-borrow:active{
    background: rgba(255,255,255,.4)
  }
  .main-borrow img,.main-borrow h2{
    display: inline-block;
  }
  .main-borrow h2{
    color: #1da9ff;
    font-weight: normal;
    font-size: 12px;
  }
  .main-borrow>div{
    box-sizing: border-box;
    display: inline-block;
  }
  .main-borrow .main-costdes{
    margin-left: 10px;
    vertical-align: middle;
  }
  .main-borrow .main-borrow-img{
    vertical-align: middle;
  }
  .main-borrow .main-borrow-center p{
    font-size: 14px;
    line-height: 28px;
    color: #7e878e;
  }
  .main-borrow .main-borrow-center span:first-child{
    color: #1da9ff;
    font-size:20px;
    padding-left: 10px;
    padding-right: 20px;
  }
  .main-borrow .main-borrow-center span:last-child{
    color: #1da9ff;
    border-radius: 20px;
    border:1px solid #1da9ff;
    padding: 2px 10px;
    font-size: 12px;
  }
  .main-borrow .main-borrow-center span.main-borrow-yellow{
    color: #ffb43c;
    border: 1px solid #ffb43c;
  }
  .main-my{
    color: #7e878e;
    margin-top: 15px;
    background: #fff;
    height: 60px;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    position: relative;
  }
  .main-my:after{
    content: '';
    position: absolute;
    height: 30px;
    top: 15px;
    left: 50%;
    border-left:1px solid rgba(126,135,142,.2);

  }
  .main-my>div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .main-my>div:active{
    background: rgb(249, 249, 249)
  }
  .main-my img{
    padding-right: 10px;
  }

</style>
<script type="text/ecmascript-6">
  import cSwiper from '../components/ui/swiper';
  import { product_process } from '../util';

  export default{
    data(){
      return{
        data:{
          list:[{
            img: require('../assets/img/banner_01.png'),
            link:'home',
          },{
            img: require('../assets/img/0107.jpg'),
            link:'coupon',
          },{
            img: require('../assets/img/banner_01.png'),
            link:'home',
          },{
            img: require('../assets/img/0107.jpg'),
            link:'coupon',
          }],
          interval:false
        }

      }
    },
    mounted() {

    },
    components:{
      cSwiper,
    },
    methods:{
      linkCase(pid){
        this.$store.dispatch('get_applyStatus',{
          pid,
          linkto:true
        });
      },
    }
  }
</script>
