<template>
  <div class="auth-job rating_page">
    <fxd-cellPicker
      :defaultValue="pickerList.relationship_.defaultValue"
      class="item"
      :data="pickerList.relationship_"
      valueKey="desc_"
      @cell_picker_cancel_cb="relationship_cancel_picker"
      @cell_picker_submit_cb="relationship_submit_picker"></fxd-cellPicker>
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
        inputType="idCard" >
      </fxd-cell>
    <fxd-cellPicker
      :defaultValue="pickerList.relationship1_.defaultValue"
      class="item"
      :data="pickerList.relationship1_"
      valueKey="desc_"
      @cell_picker_cancel_cb="relationship1_level_cancel_picker"
      @cell_picker_submit_cb="relationship1_level_submit_picker"></fxd-cellPicker>
      <fxd-cell
        class="item"
        placeholder="联系人2姓名"
        @verify_cb="verify_cb"
        @input.native="e=>item.contact_name1_=e.target.value"
        v-model="item.contact_name1_">
      </fxd-cell>
    <fxd-cell
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
    mapGetters,
    mapActions,
    mapMutations,
    mapState
  } from 'vuex'
  import {
    get_customer_base,
    get_dict_code_list,
    save_customerIDInfoH5,
    save_uploadFileBase64
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
    components: {
    },
    mixins:[verify],
    computed: {
      ...mapGetters([
        'customerIDInfo',
        'deal_verify'
      ]),
    },
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
          let { contactBean } = data[0]; // 取值
//          this.item.relationship_ = contactBean[0].relationship_; // 赋值
//          this.item.contact_name_ = contactBean[0].contact_name_;
//          this.item.contact_phone_ = contactBean[0].contact_phone_;
//          this.item.relationship1_ = contactBean[1].relationship_;
//          this.item.contact_name1_ = contactBean[1].relationship_;
//          this.item.contact_phone1_ = contactBean[1].relationship_;
          contactBean.forEach(i,index=>{
            this.item[`relationship${index?index:''}_`] = contactBean[index].relationship_
            this.item[`contact_name_${index?index:''}_`] = contactBean[index].contact_name_;
            this.item[`contact_phone_${index?index:''}_`] = contactBean[index].contact_phone_;
          })

          this.pickerList.relationship_.values = this.pickerList.relationship1_.values = data[1]; // picker赋值
          this.pickerList.relationship_.defaultValue = filterDictionary(data[1], relationship_); // 关系人1赋值
          this.pickerList.relationship1_.defaultValue = filterDictionary(data[1], relationship1_); // 关系人2赋值
          this.submit_dis = false;
        })
      },
      /**
       * 取消联系人1关系
       * @param data
       */
      relationship_cancel_picker() {
         this.item.relationship_ = '';
      },
      /**
       * 设置联系人1关系
       * @param data
       */
      relationship_submit_picker(data) {
         this.item.relationship_ = data[0].code_;
      },
      /**
       * 取消联系人2关系
       * @param data
       */
      relationship1_cancel_picker() {
        this.item.relationship1_ = '';
      },
      /**
       * 设置联系人2关系
       * @param data
       */
      relationship1_submit_picker(data) {
        this.item.relationship1_ = data[0].code_;
      },
      home_address_picker() {
      },
      /**
       * 提交
       */
      submit() {
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
