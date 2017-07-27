<template>
  <div class="navOutline">
    <ul id="nav">
      <li v-for="i in list">
        <router-link :to="i.link">
          <img :src="i.link === $route.path?i.icon2:i.icon1">
          <span>{{ i.title }}</span>
        </router-link>
        <span class="circle"></span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .navOutline{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  ul {
    border-top: 1px solid #dbdcdc;
    background: #fff;
    display: flex;
    li {
      position: relative;
      overflow: hidden;
      flex: 1;
      font-size: .28rem;
      list-style: none;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #9fa0a0;
        text-decoration: none;
        &.router-link-active {
          transition: all .5s;
          color: #00aaee;
        }
        img {
          margin-top: 2px;
          height: .5rem;
        }
        span {
          height: 48px;
          line-height: 48px;
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
