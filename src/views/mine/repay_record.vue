<template>
  <div class="wrap" id="repayRecord">
    <div class="short"></div>
    <div class="wrap_head null" style="display: none">
      <img src="../../assets/img/faxindai_logo.png" alt="" />
      <p class="change">您当前无还款记录</p>
    </div>
    <table border="0" cellpadding="5" cellspacing="0" >
      <thead>
      <tr>
        <th>期数</th>
        <th>本金</th>
        <th>利息</th>
        <th>罚金</th>
        <th>违约金</th>
        <th>日期</th>
      </tr>
      </thead>
      <!--<tbody v-for="repayRecord in repayRecordList">-->
      <!--<tr>-->
        <!--<td>{{repayRecord.no_}}</td>-->
        <!--<td>￥{{repayRecord.principal}}</td>-->
        <!--<td>￥{{repayRecord.service_fee_}}</td>-->
        <!--<td>￥{{repayRecord.penalty_interest_}}</td>-->
        <!--<td>￥{{repayRecord.liquidatetimed_damages_}}</td>-->
        <!--<td>{{repayRecord.billing_time_|myDate}}</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <tbody>
      <tr>
        <td>99</td>
        <td>￥333</td>
        <td>￥3333</td>
        <td>￥3333</td>
        <td>￥3333</td>
        <td>3333</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  table{ background: #fff; width: 100%;text-align: center;}
  table thead tr th{ height: .6rem; line-height: .6rem;background:#f5f5f5 ;font-size:.26rem;color:#9e9e9f;width:14%;}
  table tbody tr{border-bottom:1px solid #ddd;}
  table tbody tr td{height:.7rem;line-height:.7rem;font-size:.26rem;color:#4d4d4d;}
  table tbody tr td:last-child{font-size:.24rem;width:21%;}
</style>

