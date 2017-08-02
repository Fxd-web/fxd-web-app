<template>
  <div class="auth-job rating_page">
    <p class="case_tip">
      <img src="../../assets/img/case_main_i.png" alt="" id="aaa"> 请确保填写的均为本人真实信息
    </p>
    <input class="input" placeholder='单位名称' v-model="item.organization_name_">
    <div class="div-input">
      <input class="input" placeholder='区号' v-model="areaCode">
      <input class="input" placeholder='单位电话' v-model="unitPhone">
    </div>
    <div class="pick" @click="showPicker('schooling','INDUSTRY_')">
      <span placeholder="行业" v-if='!schooling.res'></span>
      <span v-else>{{schooling.res.desc_}}</span>
      <span></span>
    </div>
    <div class="pick" @click="showPicker('nowIn')">
      <span placeholder="单位所在地" v-if='!nowIn.res'></span>
      <span v-for='(i,index) in nowIn.res' v-else>{{i.name}}</span>
      <span></span>
    </div>
    <input class="input" placeholder='单位详址' v-model="item.organization_address_">
    <div class="btn" @click="submit">
      保存
    </div>
    <transition name="bouncelnUp">
      <!--<Picker v-if='$store.state.dialog.picker' v-on:pickerCb="pickerCb" :data='pickerData'></Picker>-->
    </transition>
  </div>
</template>

<style scoped lang="scss">
  .auth-job {
    padding: 15px;
  }

  .div-input {
    display: flex;
    input {
      width: auto;
      flex: 1 auto;
      &:first-child {
        max-width: 105px;
        margin-right: 15px;
      }
    }
  }

  .case_tip {
    img {
      display: inline-block;
      width: 22px;
      vertical-align: middle;
    }
    color: red;
    font-size: 14px;
    text-align: left;
    padding-bottom: 20px;
  }

  .auth-job-btn {
    display: flex;
    width: 100%;
    margin-top: 15px;
    justify-content: space-between;
    .btn {
      border-radius: 6px;
      margin: 0;
      width: 48%;
      &:first-child {
        background: #60bae2;
      }
    }
  }

  .btn {
    margin: 15px 0;
  }
</style>

<script>
  import {
    filterDictionary
  } from '../../util/';
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex';
  import {
    get_dict_code_list,
    get_region_byOrder_H5List,
    get_customer_carrer,
  } from '../../service/';
  export default {
    name: 'profession',
    data() {
      return {
        educationCount: 0,
        areaCode: '',
        unitPhone: '',
        item: {},
        schooling: {
          title: '选择行业',
          list: [],
          column: 1,
          nickName: 'desc_',
          res: '',
        },
        nowIn: {
          title: '选择单位所在地',
          list: [],
          column: 3,
          nickName: 'name',
          nickChildren: 'sub',
          res: '',
        },
        pickerData: null,
        pickerAct: null,
        showNext: false,
      }
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'customerCarrer',
        'dictionary',
      ]),
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([
        get_customer_carrer(),
        get_region_byOrder_H5List(),
        get_dict_code_list({
          dict_type_: 'INDUSTRY_'
        }),
      ]).then(function(data) {
        let data1 = data[0].result;
        let data2 = data[1].result;
        let data3 = data[2].result;
        next(_this => {
          _this.item = data1;
          let organization_telephone_ = !!data1.organization_telephone_ && data1.organization_telephone_.split('-');
          _this.areaCode = organization_telephone_[0];
          _this.unitPhone = organization_telephone_[1];
          _this.nowIn.res = [{
            name: data1.province_name_,
          }, {
            name: data1.city_name_,
          }, {
            name: data1.country_name_,
          }];
          _this.setEducation_level(data3);
          _this.FETCH_ADDR_LIST(data2);
          _this.FETCH_DICTIONARY({
            type: 'INDUSTRY_',
            res: data3,
          });
        })
      })
    },
    methods: {
      // ...mapActions([
      //   'fetch_dictionary',
      //   'fetch_addrList',
      //   'get_customerCarrer'
      // ]),
      ...mapMutations([
        'FETCH_ADDR_LIST',
        'FETCH_DICTIONARY'
      ]),
      pickerCb(res) {
        this[this.pickerAct].res = res;
      },
      showPicker(data, type) {
        this[data].list = !!type ? this.$store.getters.dictionary[type] : this.$store.getters.addrList;
        this.pickerData = this[data];
        this.pickerAct = data;
        this.$store.commit('TOGGLE_DIALOG', 'picker');
      },
      setEducation_level(data) {
        filterDictionary({
          list: data,
          key: 'code_',
          val: this.item.industry_,
        }).then((data) => {
          this.schooling.res = data[0]
        });
      },
      submit() {
        this.$store.dispatch('get_regionCodeByName', {
          provinceName: this.nowIn.res[0].name,
          cityName: this.nowIn.res[1].name,
          districtName: this.nowIn.res[2].name
        });
        let _this = this;
        setTimeout(function() {
          _this.$store.dispatch('save_customerCarrer', {
            organization_name_: _this.item.organization_name_,
            organization_telephone_: _this.areaCode.toString() + _this.unitPhone,
            industry_: _this.schooling.res.code_,
            province_: _this.$store.getters.dictionary.codeByName.provinceCode,
            city_: _this.$store.getters.dictionary.codeByName.cityCode,
            country_: _this.$store.getters.dictionary.codeByName.provinceCode,
            organization_address_: _this.item.organization_address_,
          });
        }, 100)

      }
    },
  }
</script>
