<template>
  <div class="auth-job rating_page">
    <p class="case_tip">
      <img src="../../assets/img/case_main_i.png" alt="" id="aaa"> 请确保填写的均为本人真实信息
    </p>
    <div id="customerBase">
      <div class="info case_sfz">
        <p class="sfz-text" :class="sfztext?'act':''">身份证识别</p>
        <p class="sfz-img"><span :class="sfzimg1?'act':'init'"><img src="../../assets/img/sfz1.png" alt="" height="49"><input type="file"  name="image" capture="camera"  accept="image/*" @change="fileChange($event,0)" /></span></p>
        <p class="sfz-img"><span :class="sfzimg2?'act':'init'"><img src="../../assets/img/sfz2.png" alt=""  height="49"><input type="file" name="image" capture="camera"  accept="image/*" @change="fileChange($event,1)"/></span></p>
      </div>
      <input class="input" type="text" placeholder="真实姓名" v-model="item.customer_name_" required minlength="2" maxlength="20" readonly/>
      <input class="input" type="text" placeholder="身份证号" required pattern="" maxlength="18" v-model="item.id_code_" readonly/>
      <div class="pick" @click="showPicker('education_level_','EDUCATION_LEVEL_')">
        <span placeholder="学历" v-if='!education_level_.res'></span>
        <span v-else>{{education_level_.res.desc_}}</span>
        <span></span>
      </div>
      <div class="pick" @click="showPicker('nowIn')">
        <span placeholder="现居地" v-if='!nowIn.res'></span>
        <span v-for='(i,index) in nowIn.res' v-else>{{i.name}}</span>
        <span></span>
      </div>
      <input class="input" placeholder="居住地详址" v-model.lazy="item.home_address_" />
    </div>
    <div class="btn" :class="[submit_btn?'':'dis']" @click="submit">
      保存
    </div>
    <transition name="bouncelnUp">
      <!--<Picker v-if='$store.state.dialog.picker' v-on:pickerCb="pickerCb" :data='pickerData'></Picker>-->
    </transition>
  </div>
</template>


<script>
  import {
    filterDictionary,
    compress
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
    get_region_byOrder_H5List,
    save_customerIDInfoH5,
  } from '../../service/';

  export default {
    name: 'authUserInfo',
    data() {
      return {
        verify_list: {
          sfztext: false,
          education_level_: false,
          addlocal: false,
          home_address_: false
        },
        submit_btn: false,
        educationCount: 0,
        sfztext: false,
        sfzimg1: false,
        sfzimg2: false,
        item: {},
        params: {},
        customer_name_: '',
        id_code_: '',
        home_address_: '',
        education_level_: {
          title: '学历',
          list: [],
          column: 1,
          nickName: 'desc_',
          res: '',
        },
        nowIn: {
          title: '选择省市区',
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
        'customerIDInfo',
        'deal_verify'
      ]),
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([
        get_customer_base(),
        get_region_byOrder_H5List(),
        get_dict_code_list({
          dict_type_: 'EDUCATION_LEVEL_'
        }),
      ]).then(function(data) {
        let data1 = data[0].result;
        let data2 = data[1].result;
        let data3 = data[2].result;
        next(_this => {
          if (!!data1) {
            _this.sfztext = data1.ocr_status_ == '2';
            _this.sfzimg1 = data1.ocr_status_ == '2';
            _this.sfzimg2 = data1.ocr_status_ == '2';
            _this.item = data1;
            _this.nowIn.res = [{
              name: data1.province_name_,
            }, {
              name: data1.city_name_,
            }, {
              name: data1.county_name_,
            }];
          }
          _this.verify_list.home_address_ = true
          _this.setEducation_level(data3);
          _this.FETCH_ADDR_LIST(data2);
          _this.FETCH_DICTIONARY({
            type: 'EDUCATION_LEVEL_',
            res: data3,
          });
        })
      })
    },
    mounted() {},
    methods: {
      // ...mapActions([
      //   'fetch_dictionary',
      //   'fetch_addrList',
      //   'get_customerBase'
      // ]),
      ...mapMutations([
        'FETCH_ADDR_LIST',
        'FETCH_DICTIONARY',
        'SAVE_CUSTOMERIDINFOH5'
      ]),
      pickerCb(res) {
        this.customer = this.$store.getters.customer;
        this[this.pickerAct].res = res;
      },
      showPicker(data, type) {
        this[data].list = !!type ? this.$store.getters.dictionary[type] : this.$store.getters.addrList;
        this.pickerData = this[data];
        this.pickerAct = data;
        this.$store.commit('TOGGLE_DIALOG', 'picker');
      },
      next() {
        if (!this.showNext) {
          this.showNext = !this.showNext;
          return false;
        }
        this.$store.commit('NEXT_PAGE', 'case/userInfo/authMain');
      },
      fileChange(e, type) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        compress(files)
          .then((url) => {
            // this.$store.dispatch('save_customerIDInfoH5', {
            //   side: !type ? 'front' : 'back',
            //   idCardSelf: url.split(',')[1],
            // });
            save_customerIDInfoH5({
              side: !type ? 'front' : 'back',
              idCardSelf: url.split(',')[1],
            }).then(data => {
              if (data) {
                data.side = type;
                this.SAVE_CUSTOMERIDINFOH5(data);
              }
            })
          })
      },
      setEducation_level(data) {
        filterDictionary({
          list: data,
          key: 'code_',
          val: this.item.education_level_,
        }).then((data) => {
          this.education_level_.res = data[0]
        });
      },
      submit() {
        this.$store.dispatch('save_customerBaseInfo', {
          customer_name_: this.item.customer_name_,
          id_code_: this.item.id_code_,
          education_level_: this.education_level_.res.code_,
          province_: this.nowIn.res[0].name || '',
          city_: this.nowIn.res[1].name || '',
          county_: this.nowIn.res[2].name || '',
          home_address_: this.item.home_address_,
        });
      }
    },
    watch: {
      'customerIDInfo': {
        handler: function(data) {
          if (data.front) {
            this.sfzimg1 = true;
          }
          if (data.back) {
            this.sfzimg2 = true;
          }
          if (data.front && data.back) {
            this.item.customer_name_ = data.customer_name_;
            this.item.id_code_ = data.id_code_;
            this.sfztext = true;
          }
        },
        deep: true
      },
      'sfztext' (data) {
        if (data) {
          this.verify_list.sfztext = true
        }
      },
      'education_level_': {
        handler: function(obj) {
          try {
            this.verify_list.education_level_ = !!obj.res.desc_
          } catch (err) {}
        },
        deep: true
      },
      'nowIn': {
        handler: function(obj) {
          try {
            this.verify_list.addlocal = !!obj.res.length
          } catch (err) {}
        },
        deep: true
      },
      'deal_verify'(data){
        this.verify_list.home_address_ = data.config.id==1&&data.succ;
      },
      'verify_list': {
        handler: function(obj) {
          this.submit_btn = Object.values(obj).every(i =>i)
          // this.submit_btn = ans
          // console.log(ans)
        },
        deep: true
      }
    },
  }
</script>

<style scoped lang="scss">
  .auth-job {
    padding: 15px;
  }

  .info {
    width: 100%;
    position: relative;
    border: 1px solid #00aaee;
    height: 50px;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    -o-border-radius: 6px;
    font-size: 16px;
    color: #00aaee;
    margin-bottom: 10px;
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

  .info_head {
    padding-top: 0;
  }

  .info_head .info {
    text-align: left;
  }

  .info_head .info input {
    padding-left: 15px;
    width: 326px
  }

  .case_sfz {
    height: 66px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
  }

  .sfz-text {
    text-align: left;
    padding-left: 15px;
    color: #a9a9a9;
  }

  .sfz-text.act {
    color: #00aaee;
  }

  .case_sfz p {
    text-align: center;
    flex: 1 auto;
  }

  .case_sfz p:first-child {
    text-align: left;
    padding-left: 15px;
  }

  .case_sfz p span {
    text-align: center;
    position: relative;
    display: inline-block;
  }

  .case_sfz p span.act:after {
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

  @mixin case_sfz_init {
    color: rgba(255, 255, 255, .8);
    font-size: 14px;
    background-color: rgba(000, 000, 000, .4);
    width: 100%;
    height: 50%;
    display: inline-block;
    position: absolute;
    left: 0;
  }

  .case_sfz span.init:before {
    @include case_sfz_init;
    content: '点击';
    top: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .case_sfz p span.init:after {
    @include case_sfz_init;
    content: '上传正面';
    bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .case_sfz p:last-child span.init:after {
    @include case_sfz_init;
    content: '上传反面';
    bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .case_sfz p img {
    margin: 0 auto;
  }

  .sfz-img input {
    border: 1px solid red;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%!important;
    padding-left: 0!important;
    opacity: 0;
  }

  .sfz-img.dis {
    pointer-events: none;
  }

  .bar .button-link {
    color: #ff7f28!important;
  }

  .btn {
    margin: 15px 0;
  }
</style>
