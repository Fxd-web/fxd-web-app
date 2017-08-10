<template>
  <div class="auth-job rating_page">
    <p class="case_tip">
      <img src="../../assets/img/case_main_i.png" alt="">请确保填写的均为本人真实信息
     </p>
    <fxd-cell
      class="item"
      placeholder="单位名称"
      @verify_cb="verify_cb"
      @input.native="e=>item.organization_name_=e.target.value"
      v-model="item.organization_name_">
    </fxd-cell>
    <div class="organization_telephone">
      <fxd-cell
        class="item"
        placeholder="区号"
        @verify_cb="verify_cb"
        @input.native="e=>filter_organization_telephone.areaCode=e.target.value"
        v-model="filter_organization_telephone.areaCode">
      </fxd-cell>
      <fxd-cell
        class="item"
        placeholder="单位电话"
        @verify_cb="verify_cb"
        @input.native="e=>filter_organization_telephone.unitPhone=e.target.value"
        v-model="filter_organization_telephone.unitPhone">
      </fxd-cell>
    </div>
    <fxd-cell-picker
      :defaultValue="pickerList.industry_.defaultValue"
      class="item"
      :data="pickerList.industry_"
      valueKey="desc_"
      @cell_picker_cancel_cb="industry_cancel_picker(1)"
      @cell_picker_submit_cb="industry_submit_picker($event, 1)"></fxd-cell-picker>
    <fxd-add-picker
      :defaultValueArr="pickerList.home_address_.defaultValueArr"
      :data="pickerList.home_address_"
      @addPicker_change_cb="home_address_cancel_picker"
      @addPicker_submit_cb="home_address_submit_picker"></fxd-add-picker>
    <fxd-cell
      class="item"
      placeholder="单位详址"
      @verify_cb="verify_cb"
      @input.native="e=>item.organization_address_=e.target.value"
      v-model="item.organization_address_">
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
    get_customer_carrer,
    get_dict_code_list,
    save_customer_carrer,
    get_region_byOrder_H5List
  } from '../../service/';
  import { verify } from '../../mixins/verify';
  import { Toask } from 'fxd-components-example';
  export default {
    name: 'authUserInfo',
    data() {
      return {
        filter_organization_telephone: {
          areaCode: '',
          unitPhone: ''
        },
        item:{
          organization_name_: '',
          organization_telephone_: '',
          industry_: '',
          province_: '',
          city_: '',
          country_: '',
          organization_address_: '',
        },
        pickerList:{  // picker部分
          industry_: {
            placeholder: '行业', //提示语
            values: [],
            defaultValue:'',
          },
          home_address_: {  // 地址
            placeholder: '居住地', // 提示语
            defaultValueArr: [],
            values: [],
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
        'NEXT_PAGE'
      ]),
      /**
       * 初始化
       **/
      init() {
        Promise.all([
          get_customer_carrer(),
          get_dict_code_list({
            dict_type_: 'INDUSTRY_'
          }),
          get_region_byOrder_H5List(),
        ]).then(data=> {

          this.pickerList.industry_.values = data[1]; // picker赋值

          if(data[2]) {
            this.pickerList.home_address_ = { // 地址picker赋值
              values : data[2]
            };
          }
          try {
            let { organization_name_, organization_telephone_, industry_, province_name_, city_name_, country_name_,  organization_address_ } = data[0]; // 取值
            this.pickerList.industry_.defaultValue = filterDictionary(data[1], industry_); // 学历赋值
//            this.pickerList.home_address_.defaultValueArr = [province_name_, city_name_, country_name_]; // 地址赋值
            Object.assign(this.item, {organization_name_}, {organization_telephone_}, {organization_address_} ,{industry_});
            let telephone = organization_telephone_.split('-');
            this.filter_organization_telephone.areaCode = telephone[0];
            this.filter_organization_telephone.unitPhone = telephone[1];
            this.submit_dis = false;

          } catch (e) {}
        })
      },
      /**
       * 取消行业
       * @param type
       */
      industry_cancel_picker() {
        this.item.industry_ = '';
      },
      /**
       * 设置行业
       * @param type 同上
       */
      industry_submit_picker(data) {
        this.item.industry_ = data[0].code_;
      },
      /**
       * 设置地址
       * @param data
       */
      home_address_submit_picker(data) {
        this.item.province_ = data[0].name;
        this.item.city_ = data[1].name;
        this.item.county_ = data[2].name;
      },
      /**
       * 取消地址
       * @param data
       */
      home_address_cancel_picker() {
        this.item.education_level_ = '';
      },
      /**
       * 提交
       */
      submit() {
//        save_customer_carrer(this.item).then(data=>{
//          if(!data) return;
//          this.NEXT_PAGE('information');
//        })
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
      },
      'filter_organization_telephone': {
        handler(obj) {
          if(isEmptyValObj(obj)) {
              let { areaCode, unitPhone } = obj;
            this.item.organization_telephone_ = `${areaCode}-${unitPhone}`;
          }
        },
        deep: true
      }
    },
  }
</script>

<style scoped lang="scss">
  .auth-job {
    .organization_telephone{
      display: flex;
      width: 95%;
      margin: auto;
      & > div:first-child {
         width: 30%;
      }
      & > div:last-child {
        margin-top: 0;
        width: 60%;
      }
    }
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
