<template>
    <div class="banner" id="slide">
        <transition :name="transitionName">
            <img :src="data.file_store_path_" width="100%" @click="linkto" v-if='key' :key='key'>
        </transition>
        <ul>
          <li v-for='(i,index) in list' :class="index==tag?'act':''" @click='touch(null,null,index)'></li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
  .banner{
    width: 100%;
    position: relative;
    height: 234px;
    img{
      position: absolute;
      top:0;
      left: 0;
      z-index: 10;
    }
    ul{
      position: absolute;
      display: flex;
      justify-content: center;
      width: 100%;
      height: .1rem;
      z-index: 11;
      bottom: .2rem;
      li{
        width: .1rem;
        height: .1rem;
        display: inline-block;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        margin:.1rem .05rem;
        &.act{
          background:#fff
        }
      }
    }
  }
</style>
<script>
  import touch from 'touchjs'
  export default{
    name: 'swiper',
    props:['value'],
    data(){
      return{
        list:[],
        data:{},
        key:'a',
        tag:0,
        transitionName:'slide-right',
        time:null,
      }
    },
    computed:{
      myvalue(){
        return this.value;
      },
      slide(){
        return document.getElementById('slide');
      }
    },
    methods:{
      init(){
        let _this = this;
        this.data = this.list[this.tag];
        touch.on( _this.slide, 'swipeleft', ()=>{
          _this.transitionName = 'slide-right';
          _this.touch(1,'swipeleft');
        });
        touch.on( _this.slide, 'swiperight', ()=>{
          _this.transitionName = 'slide-left';
          _this.touch(-1,'swiperight');
        });
        _this.list.interval && _this.interval(_this, _this.list.interval);
      },
      touch(parms, type, index){
        this.list.interval&&clearInterval(this.time);
        this.list.interval&&this.interval(this, this.list.interval);
        let num = this.tag;
        let len = this.list.list.length-1;
        if(index==num){
          return
        }
        if(num==0&&type=='swiperight'){
          num = len;
        }
        else if(num==len&&type=='swipeleft'){
          num = 0;
        }else{
          num = num+parms
        }
        if(!parms&&!type&&index.toString()){
          num = index;
        }
        this.key = false;
        this.$nextTick(function () {
          this.data = this.list.list[num];
          this.tag = num;
        })
      },
      linkto(){
          location.href='';
//        let link = this.list.list[this.tag].link;
//        this.$store.commit('NEXT_PAGE', link);
      },
      interval(self, data){
        self.time = setInterval(()=>{
          self.touch(-1,'swiperight');
        },data||3000)
      }
    },
    watch:{
      'data' (a,b) {
       if(a!=b&&!!b){
         this.key = 'b'
       }
      },
      'myvalue' (val){
        this.list = val;
        this.init();
      }
    },
  }
</script>
