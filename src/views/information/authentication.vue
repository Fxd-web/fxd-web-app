<template>
    <div class="info_head rating_page">
      <p class="case_tip">
        <img src="../../assets/img/case_main_i.png" alt="" id="aaa"> 请确保填写的均为本人真实信息
      </p>
      <div id="customerBase">
        <div class="info case_sfz" >
          <p id="sfz-text">身份证识别</p>
          <p class="sfz-img"><span><img src="../../assets/img/sfz1.png" alt="" height="49"><input type="file"  name="image" capture="camera"  accept="image/*" onchange="fileChange(this,0)" /></span></p>
          <p class="sfz-img"><span ><img src="../../assets/img/sfz2.png" alt=""  height="49"><input type="file" name="image" capture="camera"  accept="image/*" onchange="fileChange(this,1)"/></span></p>
        </div>
        <div class="info">
          <input class="info_name username" type="text" name="customer_name_" id="customer_name_" placeholder="真实姓名" v-model="customer_name_" required minlength="2" maxlength="20" readonly/>
        </div>
        <div class="info">
          <input type="hidden" name="id_type_" value="1" />
          <input class="info_name idcard" type="text" name="id_code_" id="id_code_" placeholder="身份证号" v-model="id_code_" required pattern="" maxlength="18"
                 readonly/>
        </div>
        <div class="info">
          <input type="hidden" id="education_level_" name="education_level_"/>
          <input class="info_name " type="text" id="xl" placeholder="学历" required readonly/>
          <div class="info_select"><span class="down_arrow"></span></div>
        </div>
        <div class="info">
          <input type="hidden" id="province_" name="province_" />
          <input type="hidden" id="city_" name="city_" />
          <input type="hidden" id="county_" name="county_" />

          <input class="info_name " id="city-picker" type="text" placeholder="现居住地" required readonly/>
          <div class="info_select"><span class="down_arrow"></span></div>
        </div>
        <div class="info">
          <input class="info_name required containChina" id="home_address_" type="text" name="home_address_" placeholder="居住地详址" v-model="home_address_" minlength="2" maxlength="20" />
        </div>
      </div>
      <a href="javascript:void(0)" onclick="caseMine.submit()" class="case_btn" id='case_btn'>保存</a>
  </div>
</template>
<style lang="scss" scoped>
  .case_main{
    font-size: 12px;
    padding-bottom: 10px;
    line-height: 1.5;
  }
  p {
    margin: 1em 0;
  }
  .info_head{
    padding-top: 0;
  }
  .info_head .info{
    text-align: left;
  }
  .info_head .info input{
    padding-left: 15px;
    width: 326px
  }
  .case_sfz{
    height: 66px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
  }
  #sfz-text{
    text-align: left;
    padding-left: 15px;
    color: #a9a9a9;
  }
  #sfz-text.act{
    color: #00aaee;
  }
  .case_sfz p{
    text-align: center;
    flex: 1 auto;
  }
  .case_sfz p:first-child{
    text-align: left;
    padding-left: 15px;
  }
  .case_sfz p span{
    position: relative;
    display: inline-block;
  }
  .case_sfz p span.act:after{
    content: '';
    position: absolute;
    right: -5px;
    bottom: -5px;
    background: url("../../assets/img/sfz3.png") no-repeat;
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .case_sfz p img{
    margin:0 auto;
  }
  .sfz-img input{
    border:1px solid red;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%!important;
    padding-left: 0!important;
    opacity: 0;
  }
  .sfz-img.dis{
    pointer-events: none;
  }
  .case_btn{
    width: 90%;
  }
  .case_btn {
    background-color: #9d9ea0;
    pointer-events: none;
    display: block;
    color: #fff;
    text-align: center;
    line-height: 50px;
    border-radius: 7px;
    margin: 60px auto 0;
    font-size: 20px;
  }
</style>
<script>
    export default{
        data(){
          return{
            customer_name_:'',
            id_code_:'',
            education_level_:'',
            province_:'',
            city_:'',
            county_:'',
            home_address_:'',
          }
        }

    }

</script>
