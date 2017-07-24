<template>
  <div class="user-form forgetPwd">
    <p><img width="29" src="../../assets/img/mobile.png" alt=""><input
      type="phone" placeholder="输入手机号"
      v-model='data.mobile_phone_'></p>
    <p><img width="29" src="../../assets/img/1_Signin_icon_02.png" alt=""><input
      type="text" placeholder="输入验证码"
      v-model='data.verify_code_'><span
      class="sendCode" @click='sendCode'>发送验证码</span></p>
    <p><img width="29" src="../../assets/img/password.png" alt=""><input
      placeholder="输入至少6位密码"
      v-model='data.password_'><img width="30" :src='password.type==="password"?password.hideUrl:password.showUrl' @click = 'changePsdType'></p>
    <p href="" class='btn login-submit' @click='submit'>确认找回</p>
  </div>
</template>
<style  lang="scss" scoped>

</style>
<script>
    export default{
      data(){
        return {
          data:{
            last_login_from_:'4',
            mobile_phone_:'',
            verify_code_:'',
            password_:''
          },
          password:{
            type: 'password',
            hideUrl:require('../../assets/img/1_Signin_icon_06.png'),
            showUrl:require('../../assets/img/1_Signin_icon_07.png')
          },
        }
      },
      methods:{
        submit(){
          this.$store.dispatch('user_forgetPwd', this.data);
          this.$store.commit('NEXT_PAGE','register');
        },
        sendCode(){
          let data = {
            mobile_phone_: this.data.mobile_phone_,
            flag: 'MSG_FIND_PASSWORD_'
          }
          this.$store.dispatch('user_picCodeH5', data);
        },
        changePsdType(){

        }
      }
    }
</script>
