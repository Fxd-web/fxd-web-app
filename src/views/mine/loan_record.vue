<template>
   <div>
     <div class="wrap_head" style="display:block" >
       <div v-if="loanRecordList.length == 0">
         <img src="../../assets/img/faxindai_logo.png" alt="" />
         <p class="change">您当前暂无借款记录</p>
       </div>
       <div v-else>
         <div class="wrap_accut">
           <div class="accut_record" v-for="loanRecord in loanRecordList">
             <ul>
               <li>
                 <div>产品名称</div>
                 <div class="record_rgt">{{loanRecord.product_id_}}</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>借款金额</div>
                 <div class="record_rgt">{{loanRecord.principal_amount_}}元</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>借款周期</div>
                 <div class="record_rgt">{{loanRecord.loan_staging_amount_}}周</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>每周还款</div>
                 <div class="record_rgt">{{loanRecord.staging_repayment_amount_}}元</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>总还款额</div>
                 <div class="record_rgt">{{loanRecord.repayment_amount_}}元</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>申请状态</div>
                 <div class="record_rgt">{{loanRecord.application_status_==null?'获取状态失败':loanRecord.application_status_}}</div>
                 <div class="clear"></div>
               </li>
               <li>
                 <div>申请时间</div>
                 <div class="record_rgt">{{loanRecord.create_date_}}</div>
                 <div class="clear"></div>
               </li>
             </ul>
           </div>
         </div>
       </div>
     </div>

   </div>
</template>
<style lang="scss" scoped>
  .accut_record{
    width:80%;
    margin:.34rem auto 0;
    border: 1px solid #ddd;
    border-radius: .2rem;
    ul {
      li{
        display: flex;
        align-items: center;
        justify-content:space-between;;
        height:.6rem;
        padding-left: .3rem;
        color: #666;;
        font-size:.28rem;
        .record_rgt{
          color:#4d4d4d;
          font-size:.26rem;
          margin-left: .3rem;
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
<script>
  /*eslint-disable*/
  import {
    get_LoanList,
  } from '../../service/';
  export default{
    data() {
      return {
        loanRecordList:[],
        loanRecord:'',
        pid:'P001002'
        }
      },
    mounted(){
      get_LoanList().then((res) =>{
         this.loanRecordList = res;
        })
    },
    methods:{
      linkCase(pid) {
        get_apply_status(pid).then(res=>{


        })
      },
    }


  }
  /*eslint-disable*/
</script>
