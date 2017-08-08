<template>
  <div class="auth-job rating_page">
      <p class="case_tip">
        <img src="../../assets/img/case_main_i.png" alt="">请确保填写的均为本人真实信息
     </p>
    <fxd-cell-picker
      :defaultValue="pickerList.relationship_.defaultValue"
      class="item"
      :data="pickerList.relationship_"
      valueKey="desc_"
      @cell_picker_cancel_cb="relationship_cancel_picker(1)"
      @cell_picker_submit_cb="relationship_submit_picker($event, 1)"></fxd-cell-picker>
      <fxd-cell
        class="item"
        placeholder="联系人1姓名"
        @verify_cb="verify_cb"
        @input.native="e=>item.contact_name_=e.target.value"
        v-model="item.contact_name_"
        inputType="name" >
      </fxd-cell>
      <fxd-cell
        class="item"
        placeholder="联系人1号码"
        @verify_cb="verify_cb"
        @input.native="e=>item.contact_phone_=e.target.value"
        v-model="item.contact_phone_"
        inputType="mobile" >
      </fxd-cell>
    <fxd-cell-picker
      :defaultValue="pickerList.relationship1_.defaultValue"
      class="item"
      :data="pickerList.relationship1_"
      valueKey="desc_"
      @cell_picker_cancel_cb="relationship_cancel_picker(0)"
      @cell_picker_submit_cb="relationship_submit_picker($event, 0)"></fxd-cell-picker>
      <fxd-cell
        inputType="name"
        class="item"
        placeholder="联系人2姓名"
        @verify_cb="verify_cb"
        @input.native="e=>item.contact_name1_=e.target.value"
        v-model="item.contact_name1_">
      </fxd-cell>
    <fxd-cell
      inputType="mobile"
      class="item"
      placeholder="联系人2号码"
      @verify_cb="verify_cb"
      @input.native="e=>item.contact_phone1_=e.target.value"
      v-model="item.contact_phone1_">
    </fxd-cell>
      <fxd-button class="item" :disabled="submit_dis" @click.native="submit">保存</fxd-button>
  </div>
</template>


<script>
  import {
    compress,
    isEmptyValObj,
    filterDictionary
  } from '../../util/';
  import {
    mapMutations,
  } from 'vuex'
  import {
    get_customer_base,
    get_dict_code_list,
    save_customer_contact_info
  } from '../../service/';
  import { verify } from '../../mixins/verify';
  import { Toask } from 'fxd-components-example';
  export default {
    name: 'authUserInfo',
    data() {
      return {
        item:{
          relationship_: '',
          relationship1_: '',
          contact_name_: '',
          contact_name1_: '',
          contact_phone_: '',
          contact_phone1_: '',
        },
        pickerList:{  // picker部分
          relationship_: {
            placeholder: '联系人关系1', //提示语
            values: [],
            defaultValue:'',
          },
          relationship1_: {  // 地址
            placeholder: '联系人关系2', //提示语
            values: [],
            defaultValue:'',
          }
        },
        submit_dis: true, // 确定按钮
      }
    },
    mixins:[verify],
    created() {
      this.init();
    },
    methods: {
      ...mapMutations([
        'FETCH_ADDR_LIST',
        'FETCH_DICTIONARY',
        'SAVE_CUSTOMERIDINFOH5',
        'NEXT_PAGE'
      ]),
      /**
       * 初始化
       **/
      init() {
        Promise.all([
          get_customer_base(),
          get_dict_code_list({
            dict_type_: 'RELATIONSHIP_'
          }),
        ]).then(data=> {
          if(data[1]){
            this.pickerList.relationship_.values = this.pickerList.relationship1_.values = data[1]; // picker赋值
          }
          if(!data[0]) return;
          let { contactBean } = data[0]; // 取值
          try{
            contactBean.forEach((i, index) => {   // 赋值
              this.item[`relationship${index?index:''}_`] = i.relationship_;
              this.item[`contact_name${index?index:''}_`] = i.contact_name_;
              this.item[`contact_phone${index?index:''}_`] = i.contact_phone_;
              this.pickerList[`relationship${index?index:''}_`].defaultValue = filterDictionary(data[1], i.relationship_);
            });
            this.submit_dis = false;
          }catch (e){}
        })
      },
      /**
       * 取消联系人关系
       * @param type 1联系人1，0联系人2(为什么用0和1呢，因为0和1会被if隐式转换为true和false)
       */
      relationship_cancel_picker(type) {
         this.item[`relationship${type?'':'1'}_`] = '';
      },
      /**
       * 设置联系人关系
       * @param type 同上
       */
      relationship_submit_picker(data, type) {
         this.item[`relationship${type?'':'1'}_`] = data[0].code_;
      },
      /**
       * 提交
       */
      submit() {

        save_customer_contact_info(this.item)
      }
    },
    watch: {
      'item': {
        handler(obj) {
          this.submit_dis = true;
          if(isEmptyValObj(obj)) {
            this.submit_dis = false;
          }
        },
        deep: true
      }
    },
  }
</script>

<style scoped lang="scss">
  .auth-job {
    .item{
      margin-bottom: .2rem;
      &:last-child{
        margin-top: 1rem;
      }
    }
    span{
      font-size: .24rem;
    }
    input{
      font-size: .36rem;
    }
  }
</style>
