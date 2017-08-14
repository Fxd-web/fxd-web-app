<template>
  <div class="inviteFriends" id="inviteFriends">
    <div class="inviteFriends-phone">
      <h2>
        推荐好友
        就送红包
      </h2>
      <p>我的邀请码</p>
      <h3>{{invitation_code}}</h3>
      <!---------------领取奖励-------------------->
      <!--<a href="http://192.168.14.71:8000/page/mine/my_invite.html" class="receiveAward"><img src="../../img/lingqujiangli@2x.png" /></a>-->
      <div class="nviteFriends-phone-div">
        <div class="code">
          <!--<img src="../../img/qr_code.png" alt="" width="180">-->
          <div id="code"></div>
          <img src="../../assets/img/logo.png" alt="" width="20%" class="code_logo">
        </div>
        <p>我的邀请二维码</p>
      </div>
    </div>
    <div class="info_bt" @click="showMaskBtn">
      <p>
        点击分享
        领红包
      </p>
    </div>
    <!--<div>-->
    <!--6位好友共为我赚取现金红包150元-->
    <!--</div>-->
    <div class="inviteFriends-foot" style="display: none">
      <h2>活动规则</h2>
      <!--<p>新用户注册时输入方【我的邀请码】或扫描【我的邀请二维码】,注册成功后,您即可获得以下大礼:</p>-->
      <ul id="inviteFriends-foot">
        <li>1 免息卷</li>
        <li>2 现金红包</li>
        <li>3 更高额度奖励</li>
      </ul>
      <!--<p>您也可以直接截图本页面发送至朋友圈,供好友识别二维码.</p>-->
    </div>
    <div class="cover_bg1" v-if="showMask" @click="showMaskBtn">
      <img src="../../assets/img/7_gd_icon_12.png" alt="">
    </div>
  </div>
</template>
<style>
  .inviteFriends{
    background: #fff;
  }
  .inviteFriends-phone{
    text-align: center;
    overflow: hidden;
    background: #f5f5f5;
    margin:.6rem auto;
    width: 80%;
    border-radius: .2rem;
  }
  .inviteFriends-phone h2{
    line-height: .8rem;
    background: #01aaef;
    color: #fff;
    font-size: .32rem;
    font-weight: normal;
    margin-bottom: .6rem;
  }
  .inviteFriends-phone p{
    color: #8c8c8c;
    font-size: .32rem;
  }
  .inviteFriends-phone h3{
    font-weight: normal;
    line-height: .6rem;
    font-size: .56rem;
    color: #01aaef;
    margin-bottom: .4rem;
  }
  .nviteFriends-phone-div{
    background: #fff;
    width: 4.4rem;
    margin:0 auto;
    text-align: center;
    margin-bottom: .6rem;
  }
  .code{
    position: relative;
  }
  #code{
    padding: .3rem 0;
    margin:0 auto;
  }
  .code_logo{
    position: absolute;
    top:50%;
    left: 50%;
    margin-top: -10%;
    margin-left: -10%;
  }
  .nviteFriends-phone-div p{
    padding-bottom: .4rem;
    font-size: .24rem;
  }
  .inviteFriends .info_bt{
    width: 80%;
    margin:0 auto
  }
  .inviteFriends-foot{
    color: #8c8c8c;
    margin-top: 30px;
    border-top:6px solid #f5f5f5;
    padding:15px 15px 30px;
  }
  .inviteFriends-foot h2{
    color: #2a2f33;
    font-size: 16px;
    padding-bottom: 10px;
  }
  .inviteFriends-foot li{
    line-height: 22px;
  }
  .inviteFriends .cover_bg1{
    display: block;
  }
  .receiveAward {
    position: absolute;
    right:-3%;
    top:13%;
  }
  .receiveAward img{
    width:50%;
    height:50%;
  }
  .info_bt{
    margin-top:.3rem;
    text-align:center;
    color:#fff;
    width: 100%;
    font-size:.44rem;
    border: 1px solid #00aaee;
    background:#00aaee;
    height:1rem;
    line-height:1rem;
    border-radius:.12rem;
    margin-bottom: .3rem;
  }
</style>
<script>
  /*eslint-disable*/
  import {
    get_RecomfrInfoApi
  }from '../../service'
  export default{
      data(){
         return{
             showMask:false,
             invitation_code:invitation_code,
         }
      },
    mounted(){
       get_RecomfrInfoApi().then((res)=>{
           for(let i=0 ;i<res.list.length;i++){

           }
         console.log(res)
       })
    }
  }
</script>
