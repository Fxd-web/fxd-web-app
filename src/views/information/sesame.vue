<template>
  <div id="case-main-sesame">
    <div class="sesame-head">
      <ul class="sesame-head_num">
        <li v-for='i in 3'><span>{{i}}</span></li>
      </ul>
      <ul class="sesame-head-tip">
        <li>立即授权</li>
        <li>同意协议</li>
        <li>短信验证</li>
      </ul>
    </div>
    <div class="sesame-body">
      <p class="input"><input type="text" name="" value="" placeholder="姓名" v-model='item.user_name_' readonly></p>
      <p class="input"><input type="text" placeholder="身份证号" v-model='item.id_code_' maxlength="18" readonly></p>
      <p class="p">以上信息用于确认您的身份</p>
    </div>
    <div class="sesame-btn">
      <span class="" @click='submit'>立即授权</span>
    </div>
    <iframe scrolling="auto" frameborder="0" :src="iframeUrl" :class="[iframeUrl?'iframe':'']"></iframe>
  </div>
</template>
<style lang="scss" >
  #case-main-sesame {
    background: #f5f5f5;
    height: 100vh;
    width: 100%;
  }

  .sesame-head {
    text-align: center;
    padding: .3rem 0
  }

  .sesame-head>ul {
    display: flex;
  }

  .sesame-head li {
    color: #c8c8ca;
    flex: 1;
  }

  .sesame-head_num {
    padding-bottom: .3rem
  }

  .sesame-head_num span {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    color: #fff;
    line-height: .5rem;
    border-radius: 50%;
    background: #c8c8ca;
    position: relative;
  }

  .sesame-head_num span:first-child::after {
    position: absolute;
    /*content: '';*/
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #c8c8ca;
  }

  .sesame-head_num li {
    position: relative;
  }


  .sesame-head_num li:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #c8c8ca;
  }

  .sesame-head_num li:first-child:after,
  .sesame-head_num li:last-child:after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc( 50% - 2.5rem);
    height: 1px;
    background: #fff;
    z-index: 1
  }

  .sesame-head_num li:first-child:after {
    left: 0
  }

  .sesame-head_num li:last-child:after {
    right: 0
  }

  .sesame-head li span {
    position: relative;
    z-index: 2
  }

  .sesame-head li:first-child span {
    background: #01aaef
  }

  .sesame-body {}

  .sesame-body .input input {
    font-size: .3rem;
    width: 100%
  }

  .sesame-body .input {
    width: 100%;
    padding: .3rem;
    background: #fff;
    color: #000;
    display: block;
    position: relative;
  }

  .sesame-body .input input::-webkit-input-placeholder {
    color: rgba(000, 000, 000, .7)
  }

  .sesame-body .input:first-child::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: .3rem;
    width: 85%;
    height: 1px;
    background: #c8c8ca
  }

  .sesame-body .p {
    padding: .3rem;
    color: #c8c8ca;
  }

  .sesame-btn {
    margin: .3rem;
  }

  .sesame-btn span {
    display: block;
    color: #fff;
    background: #01aaef;
    line-height: .8rem;
    text-align: center;
    font-size: .36rem;
    border-radius: 5px;
  }

  .sesame-btn span.dis {
    background: #c8c8ca;
    pointer-events: none
  }
  .iframe {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    z-index: 101;
  }
</style>
<script>
  import {
    get_customer_base,
    submit_zhima_credit_auth
  } from '../../service/';
    export default{
        data(){
          return{
            submit_dis: true,
            iframeUrl: null,
            item: {
              user_name_: '',
              id_code_: '',
            }
          }
        },
        created() {
          this.init();
        },
        methods: {
          /**
           * 初始化
           **/
          init() {
            get_customer_base().then(res => {
              this.item.user_name_ = res.customer_name_;
              this.item.id_code_ = res.id_code_;
            })
          },
          submit() {
            submit_zhima_credit_auth(this.item).then(res => {
                this.iframeUrl = res.auth_url;
            })
          }
        },
    }

</script>
