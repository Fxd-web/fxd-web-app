<template>
  <div>
    <ul id="nav">
      <li v-for="i in list">
        <router-link :to="i.link">
          <img :src="i.link === $route.path?i.icon2:i.icon1" width="25">
          <span>{{ i.title }}</span>
        </router-link>
        <span class="circle"></span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  ul {
    padding-left: 0;
    display: flex;
    li {
      &:active{
        background:#fff;
      }
      position: relative;
      overflow: hidden;
      flex: 1;
      font-size: 14px;
      list-style: none;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #9fa0a0;
        &.router-link-active {
          transition: all .5s;
          color: #00aaee;
        }
        img {
          margin-top: 2px;
        }
        span {
          height: 23px;
          line-height: 23px;
        }
      }
    }
    .circle{
      position: absolute;
      background: rgba(86,187,247,.1);
      width: 1px;
      height: 1px;
      top:50%;
      left: 50%;
      border-radius: 50%;
      &.act{
        animation: myfirst .4s;
      }
    }
  }

  @keyframes myfirst
  {
    from {transform: scale(0);border-radius: 50%;}
    to {transform:scale(200);border-radius: 50%;}
  }

</style>
<script>
    export default{
        data(){
          return {
            isAct:false,
            list:[{
              title:'首页',
              icon1:require('../assets/img/2_tab_icon_01.png'),
              icon2:require('../assets/img/2_tab_icon_02.png'),
              link:'/home'
            },
            {
              title:'我的',
              icon1:require('../assets/img/2_tab_icon_05.png'),
              icon2:require('../assets/img/2_tab_icon_06.png'),
              link:'/me'
            },
            {
              title:'更多',
              icon1:require('../assets/img/2_tab_icon_03.png'),
              icon2:require('../assets/img/2_tab_icon_04.png'),
              link:'/more'
            }],
          }
        },
        mounted(){
            this.init();
        },
        methods: {
          init() {
              let li = document.getElementById('nav').querySelectorAll('li');
              let circle = document.getElementById('nav').querySelectorAll('.circle');
//              li.forEach((t,i)=>{
//                t.addEventListener('click',(e)=>{
//                  circle[i].setAttribute('class','circle act');
//                  circle[i].setAttribute('style','top:'+e.layerY+'px;left:'+e.layerX+'px');
//                });
//                t.addEventListener('touchend',()=>{
//                  circle[i].setAttribute('class','circle');
//                })
//              })

            for(var i=0,len = li.length;i<len;i++){
              ((i)=>{
                li[i].addEventListener('click',(e)=>{
                  circle[i].setAttribute('class','circle act');
                  circle[i].setAttribute('style','top:'+e.layerY+'px;left:'+e.layerX+'px');
                });

                li[i].addEventListener('touchend',()=>{
                  circle[i].setAttribute('class','circle');
                })
              })(i)

            }
          },
        }
    }
</script>
