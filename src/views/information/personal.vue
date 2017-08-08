<template>
  <div class="auth-job rating_page">
    <p class="case_tip">
      <img src="../../assets/img/case_main_i.png" alt="" id="aaa"> 请确保填写的均为本人真实信息
    </p>
    <div id="customerBase">
      <div class="info case_sfz item">
        <p class="sfz-text" :class="id_card.front&&id_card.back?'act':''">身份证识别</p>
        <p class="sfz-img"><span :class="id_card.front?'act':'init'"><img src="../../assets/img/sfz1.png" alt="" height="90"><input type="file"  name="image" capture="camera"  accept="image/*" @change="fileChange($event,0)" /></span></p>
        <p class="sfz-img"><span :class="id_card.back?'act':'init'"><img src="../../assets/img/sfz2.png" alt=""  height="90"><input type="file" name="image" capture="camera"  accept="image/*" @change="fileChange($event,1)"/></span></p>
      </div>
      <div class="info case_sfz case_sfz_idcard item">
        <p class="sfz-text" :class="body_file?'act':''">手持身份证照片</p>
        <p class="sfz-img"><span :class="body_file?'act':'init'"><img src="../../assets/img/self_id_card.png" alt="" height="90"><input type="file"  name="image" capture="camera"  accept="image/*" @change="fileChange($event,0,1)" /></span></p>
      </div>
      <fxd-cell
        class="item"
        placeholder="真实姓名"
        :readonly='editable_field.customer_name_'
        @verify_cb="verify_cb"
        @input.native="e=>item.customer_name_=e.target.value"
        v-model="item.customer_name_"
        inputType="name" >
      </fxd-cell>
      <fxd-cell
        class="item"
        placeholder="身份证号"
        :readonly='editable_field.id_code_'
        @verify_cb="verify_cb"
        @input.native="e=>item.id_code_=e.target.value"
        v-model="item.id_code_"
        inputType="idCard" >
      </fxd-cell>
      <fxd-cell-picker
        :defaultValue="pickerList.education_level_.defaultValue"
        class="item"
        :data="pickerList.education_level_"
        valueKey="desc_"
        @cell_picker_cancel_cb="education_level_cancel_picker"
        @cell_picker_submit_cb="education_level_submit_picker"></fxd-cell-picker>
      <fxd-cell
        class="item"
        placeholder="居住地详址"
        @verify_cb="verify_cb"
        @input.native="e=>item.home_address_=e.target.value"
        v-model="item.home_address_">
      </fxd-cell>
      <fxd-button class="item" :disabled="submit_dis" @click.native="submit">保存</fxd-button>
    </div>
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
    get_region_byOrder_H5List,
    save_customerIDInfoH5,
    save_uploadFileBase64,
    save_customer_base_info
  } from '../../service/';
  import { verify } from '../../mixins/verify';
  import { Toask } from 'fxd-components-example';
  export default {
    name: 'authUserInfo',
    data() {
      return {
        item:{
          customer_name_: '',
          id_code_: '',
          education_level_: '',
          province_: '1',
          city_: '1',
          county_: '1',
          home_address_: '',
          body_file_id_: '',
        },
        pickerList:{  // picker部分
          education_level_: {  // 学历
            placeholder: '学历', //提示语
            values: [],
            defaultValue:'',
          },
          home_address_: {  // 地址
          }
        },
        editable_field: { // 控制身份证姓名和号码是否手动修改默认不能修改
          customer_name_ : true,
          id_code_: true
        },
        id_card: { // 身份证部分默认没有通过
          front: false, //正面
          back: false, // 反面
          cache_info: null // 缓存身份证信息，因为只有正面才会返回信息，反面不会返回，但是需要显示的条件必须是身份证正反面都认证完成，所以此处做个缓存
        },
        body_file: null, // 手持身份证图片和文字高亮
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
          get_region_byOrder_H5List(),
          get_dict_code_list({
            dict_type_: 'EDUCATION_LEVEL_'
          }),
        ]).then(data=> {
          if(data[2]){
            this.pickerList.education_level_.values = data[2]; // 学历picker赋值
          }
          if(!data[0]) return;
           try{
             let { customer_name_, id_code_, education_level_, province_, city_, county_, home_address_, body_file_id_ } = data[0]; // 取值
             Object.assign(this.item, {customer_name_}, {id_code_}, {education_level_}, {province_}, {city_}, {county_}, {home_address_}, {body_file_id_}); // 赋值
             this.pickerList.education_level_.defaultValue = filterDictionary(data[2], education_level_); // 学历赋值
             // 图片高亮
             if(customer_name_&&id_code_){
               this.id_card.front = this.id_card.back = true;
               this.body_file = true;
               this.submit_dis = false;
             }
           }catch (e){}
        })
      },
      /**
       * 身份证识别
       * @param e event
       * @param type 类型 0正面，1 反面
       * @param selfIdCard 手持身份证
       */
      fileChange(e, type, selfIdCard) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        compress(files) // 压缩图片
          .then(url => {
            if (!selfIdCard) {
              save_customerIDInfoH5({ // 上传身份证图片
                side: !type ? 'front' : 'back',
                idCardSelf: url.split(',')[1],
              }).then(data => {
                if(!data){
                  return
                }
                this.id_card[!type ? 'front' : 'back'] = true;
                // 正面返回的信息放到缓存中
                if( !type ){
                  this.cache_info = data
                }
                // 真反面都通过了才显示
                if (this.id_card.front && this.id_card.back) {
                  this.item.customer_name_ =  this.cache_info.customer_name_;
                  this.item.id_code_ = this.cache_info.id_code_;
                  // 设置可以修改姓名或者身份证号码
                  try{
                    data.editable_field_.split(',').forEach(i=>{
                      this.editable_field[i] = false;
                    })
                  }catch (e){}
                }
              })
              return
            }
            save_uploadFileBase64({ // 上传手持身份证图片
              file_context_: url.split(',')[1],
              file_name_: '手持身份证',
              file_type_: '1',
              file_ext_name_: 'jpeg',
            }).then(data => {
              if(!data){
                return
              }
              this.body_file = true;
              this.item.body_file_id_ = data.fileId
            })
          })
      },
      /**
       * 设置学历
       * @param data
       */
      education_level_submit_picker(data) {
        this.item.education_level_ = data[0].code_;
      },
      /**
       * 取消学历
       * @param data
       */
      education_level_cancel_picker() {
        this.item.education_level_ = '';
      },
      home_address_picker() {
      },
      /**
       * 提交
       */
      submit() {
        save_customer_base_info(this.item)
//          if( !this.item.education_level_ ){
//            Toask('请选择学历')
//            return
//          }
//          if( !this.item.home_address_ ){
//            Toask('居住地详址')
//            return
//          }


//        this.$store.dispatch('save_customerBaseInfo', {
//          customer_name_: this.item.customer_name_,
//          id_code_: this.item.id_code_,
//          education_level_: this.education_level_.res.code_,
//          province_: this.nowIn.res[0].name || '',
//          city_: this.nowIn.res[1].name || '',
//          county_: this.nowIn.res[2].name || '',
//          home_address_: this.item.home_address_,
//        });
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

  .info {
    width: 100%;
    position: relative;
    border: 1px solid #00aaee;
    height: 1rem;
    border-radius: .12rem;
    font-size: .32rem;
    color: #00aaee;
    margin-bottom: .2rem;
  }

  .info_head {
    padding-top: 0;
  }

  .info_head .info {
    text-align: left;
  }

  .info_head .info input {
    padding-left: .3rem;
    width: 326px
  }

  .case_sfz {
    width: 90%;
    margin: 0 auto;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sfz-text {
    text-align: left;
    padding-left: .3rem;
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
    padding-left: .3rem;
  }

  .case_sfz p span {
    text-align: center;
    position: relative;
    display: inline-block;
  }

  .case_sfz p span.act:after {
    content: '';
    position: absolute;
    right: -.1rem;
    bottom: -.1rem;
    background: url("../../assets/img/sfz3.png") no-repeat;
    background-size: .4rem .4rem;
    display: inline-block;
    width: .4rem;
    height: .4rem;
  }

  @mixin case_sfz_init {
    color: rgba(255, 255, 255, .8);
    font-size: .28rem;
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
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
  }

  .case_sfz p span.init:after {
    @include case_sfz_init;
    content: '上传正面';
    bottom: 0;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }

  .case_sfz p:last-child span.init:after {
    @include case_sfz_init;
    content: '上传反面';
    bottom: 0;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }

  .case_sfz_idcard p:last-child span.init:after {
    @include case_sfz_init;
    content: '上传';
    bottom: 0;
    border-radius: 0;
  }
  .case_sfz_idcard span.init:before {
    border-radius: 0;
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
</style>
