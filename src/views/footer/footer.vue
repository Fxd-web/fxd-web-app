<template>
  <div class="footer">
    <div class="foot_bottom" onclick="location.href='../main.html'">
      <img src="../../assets/img/2_tab_icon_01.png" />
      <p class="dp">
        <a>首页</a>
      </p>
    </div>
    <div class="foot_bottom" onclick="location.href='../mine/main.html'">
      <img src="../../assets/img/2_tab_icon_05.png" />
      <p class="dp">
        <a>我的</a>
      </p>
    </div>
    <div class="foot_bottom" onclick="location.href='main.html'">
      <img src="../../assets/img/2_tab_icon_04.png" />
      <p class="dp active">
        <a>更多</a>
      </p>
    </div>
  </div>
</template>
<style>
  .footer{ position:fixed; bottom:0;left:0;right:0; z-index:1000;text-align:center; background:#fff;border-top:1px solid #dbdcdc; height:50px;padding-bottom: 2px;font-size: 14px;}
  .footer .foot_bottom{ width:33.33%;text-align:center;float:left;line-height:21px; cursor: pointer;   padding-top: 4px;}
  .footer .foot_bottom > img{ width:25px; margin: auto;}
  .footer .foot_bottom .dp a{ color:#9fa0a0;}
  .active a{ color:#00aaee !important;}
</style>
<script>

</script>
