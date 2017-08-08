<template>
  <div class="wrap">
    <div class="short"></div>
    <div class="wrap_accut" id="coupon" v-cloak>
      <div id="couponList">
        <div>
          <div class="msage">
            <img src="../../assets/img/coupon.png">
            <div class="words1">
              <div>
                红包
              </div>
              <div style="display: none;">
                已过期
              </div>
            </div>
            <div class="words2">
              <span>{{coupon.total_amount_}}</span>元
              <a v-if="coupon.total_amount_!=coupon.residual_amount_">/</a>
              <span>
                <div v-if="coupon.total_amount_!=coupon.residual_amount_">
                剩余{{coupon.residual_amount_}}元
                </div>
              </span>
            </div>
            <div class="words3">
              有效期：{{coupon.validity_period_from_|myDate}}
              至{{coupon.validity_period_to_|myDate}}
            </div>
          </div>
        </div>
      </div>
      <div class="shuoming">
        <div>
          <h2>使用说明</h2>
          <ul>
            <li>1、本券只可抵扣利息使用，不可提现，不可转让；</li>
            <li>2、本券从还款第一期起即可使用；</li>
            <li>3、可分期使用，如当期本金100元，当期利息21元，
              还款总额仅100元，21元利息已抵扣，抵扣利息直至100元优惠券抵扣完毕；</li>
            <li>4、本券有效期为{{coupon.validity_period_from_|myDate}} 至 {{coupon.validity_period_to_|myDate}}；</li>
            <li>5、本券不可与其他优惠券叠加使用；</li>
            <li>6、本券最终解释权归发薪贷所有。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  /*eslint-disable*/
</script>
