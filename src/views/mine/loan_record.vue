<template>
   <div>
     <div class="wrap_head" style="display: none" >
       <div >
         <img src="../../assets/img/6_my_logo.png" alt="" />
         <p class="change">您当前暂无借款记录</p>
       </div>
     </div>
     <div>
        <div>
          <div class="wrap_accut">
            <div class="accut_record">
              <ul>
                <li>
                  <div>产品名称</div>
                  <div class="record_rgt">工薪贷</div>
                </li>
                <li>
                  <div>借款金额</div>
                  <div class="record_rgt">2000元</div>
                </li>
                <li>
                  <div>借款周期</div>
                  <div class="record_rgt">30周</div>
                </li>
                <li>
                  <div>每周还款</div>
                  <div class="record_rgt">108元</div>
                </li>
                <li>
                  <div>总还款额</div>
                  <div class="record_rgt">3260元</div>
                </li>
                <li>
                  <div>申请状态</div>
                  <div class="record_rgt">已到账</div>
                </li>
                <li>
                  <div>申请时间</div>
                  <div class="record_rgt">2015-10-25</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
     </div>
   </div>
</template>
<style lang="scss" scoped>
  @import  "../../css/common.scss";
  .accut_record{
    width:80%;
    margin:.34rem auto 0;
    border: 1px solid #ddd;
    border-radius: .2rem;
    ul {
      li{
        display: flex;
        align-items: center;
        justify-content:space-between;
        height:.6rem;
        padding-left: .3rem;
        color: #666;;
        font-size:.28rem;
        .record_rgt{
          color:#4d4d4d;
          font-size:.26rem;
          margin-right: .3rem;
        }
      }
      li:nth-child(odd){
        background-color: #f5f5f5;
      }
      li:first-child{
        border-radius: .2rem .2rem 0 0;
      }
      li:last-child{
        border-radius: 0 0 .2rem .2rem;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  /*eslint-disable*/
  export default{
     data() {
        return {
         }
     },
    mounted(){

    },
    methods:{
    }
  }
</script>
