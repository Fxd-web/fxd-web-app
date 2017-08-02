<template>
  <div class="auth-job rating_page">
    <p class="case_tip">
      <img src="../../assets/img/case_main_i.png" alt="" id="aaa"> 请确保填写的均为本人真实信息
    </p>
    <div class="pick" @click="showPicker('linkman0','RELATIONSHIP_')">
      <span placeholder="联系人1" v-if='!linkman0.res'></span>
      <span v-else>{{linkman0.res.desc_}}</span>
      <span></span>
    </div>
    <input class="input" placeholder='联系人姓名' v-model="item.contact_name_" v-verify="{ id: '2'}">
    <input class="input" placeholder='联系人手机号' v-model="item.contact_phone_" v-verify="{ id: '3'}">
    <div class="pick" @click="showPicker('linkman1','RELATIONSHIP_')">
      <span placeholder="联系人2" v-if='!linkman1.res'></span>
      <span v-else>{{linkman1.res.desc_}}</span>
      <span></span>
    </div>
    <input class="input" placeholder='联系人姓名' v-model="item.contact_name1_" v-verify="{ id: '2'}">
    <input class="input" placeholder='联系人手机号' v-model="item.contact_phone1_" v-verify="{ id: '3'}">
    <div class="btn" :class="[submit_btn?'':'dis']" @click="submit">
      保存
    </div>
    <transition name="bouncelnUp">
      <!--<Picker v-if='$store.state.dialog.picker' v-on:pickerCb="pickerCb" :data='pickerData'></Picker>-->
    </transition>
  </div>
</template>

<style lang="scss" scoped>
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

  .case_main {
    font-size: 12px;
    padding-bottom: 10px;
    line-height: 1.5;
  }

  p {
    margin: 1em 0;
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

  #sfz-text {
    text-align: left;
    padding-left: 15px;
    color: #a9a9a9;
  }

  #sfz-text.act {
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

  .case_btn {
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
  } from 'vuex'
  import {
    get_customer_base,
    get_dict_code_list
  } from '../../service/';

  export default {
    name: 'linkman',
    data() {
      return {
        verify_list: {
          linkman0: false,
          contact_name_: false,
          contact_phone_: false,
          linkman1: false,
          linkman2: false,
          contact_name_1: false,
          contact_phone_1: false,
        },
        submit_btn: false,
        educationCount: 0,
        item: {},
        customer: {},
        linkman0: {
          title: '联系人1',
          list: [],
          column: 1,
          nickName: 'desc_',
          res: '',
        },
        linkman1: {
          title: '联系人2',
          list: [],
          column: 1,
          nickName: 'desc_',
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
        'customerBase',
        'dictionary',
      ]),
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([get_customer_base(), get_dict_code_list({
        dict_type_: 'RELATIONSHIP_'
      })]).then(function(data) {
        let data1 = data[0].result;
        let data2 = data[1].result;
        next(_this => {
          _this.item = data1;
          _this.item.contact_name_ = data1.contactBean[0].contact_name_;
          _this.item.contact_phone_ = data1.contactBean[0].contact_phone_;
          _this.item.contact_name1_ = data1.contactBean[1].contact_name_;
          _this.item.contact_phone1_ = data1.contactBean[1].contact_name_;
          _this.setEducation_level(data2);
          _this.FETCH_DICTIONARY({
            type: 'RELATIONSHIP_',
            res: data2,
          });
          _this.verify_list = {
            linkman0: true,
            contact_name_: true,
            contact_phone_: true,
            linkman1: true,
            linkman2: true,
            contact_name_1: true,
            contact_phone_1: true,
          }
        })
      })
    },
    beforeMount() {
      //      this.fetch_dictionary('RELATIONSHIP_'); //获取联系人
      //      this.get_customerBase();
      // Promise.all([this.fetch_dictionary('RELATIONSHIP_'), this.get_customerBase()])
    },
    methods: {
      // ...mapActions([
      //   'fetch_dictionary',
      //   'get_customerBase'
      // ]),
      ...mapMutations([
        'FETCH_DICTIONARY'
      ]),
      pickerCb(res) {
        this.customer = this.$store.getters.customer;
        this[this.pickerAct].res = res;
      },
      showPicker(data, type) {
        this[data].list = this.$store.getters.dictionary[type];
        this.pickerData = this[data];
        this.pickerAct = data;
        this.$store.commit('TOGGLE_DIALOG', 'picker');
      },
      setEducation_level(data) {
        for (let i = 0; i < 2; i++) {
          filterDictionary({
            list: data,
            key: 'code_',
            val: this.item.contactBean[i].relationship_
          }).then((data) => {
            this[`linkman${i}`].res = data[0]
          });
        }
      },
      submit() {
        this.$store.dispatch('save_customerContactInfo', {
          relationship_: this.linkman0.res.code_,
          relationship1_: this.linkman1.res.code_,
          contact_name_: this.item.contact_name_,
          contact_phone_: this.item.contact_phone_,
          contact_name1_: this.item.contact_name1_,
          contact_phone1_: this.item.contact_phone1_
        });
      }
    },
    watch: {
      'linkman0': {
        handler: function(obj) {
          try {
            this.verify_list.linkman0 = !!obj.res.desc_
          } catch (err) {}
        },
        deep: true
      },
      'contact_name_' (data) {
        if (data) {
          this.verify_list.contact_name_ = true
        }
      },
      'contact_phone_' (data) {
        if (data) {
          this.verify_list.contact_phone_ = true
        }
      },
      'linkman1': {
        handler: function(obj) {
          try {
            this.verify_list.linkman1 = !!obj.res.desc_
          } catch (err) {}
        },
        deep: true
      },
      'contact_name_1' (data) {
        if (data) {
          this.verify_list.contact_name_1 = true
        }
      },
      'contact_phone_1' (data) {
        if (data) {
          this.verify_list.contact_phone_1 = true
        }
      },
      'verify_list': {
        handler: function(obj) {
          this.submit_btn = Object.values(obj).every(i => i)
        },
        deep: true
      }
    },

  }
</script>
