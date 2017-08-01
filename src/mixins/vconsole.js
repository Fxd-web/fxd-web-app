/**
 * Created by gxx on 2017/7/27.
 */
export default {
  data(){
    return{
      vconsole: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (process.env.NODE_ENV === 'development') {
        this.init_vconsole();
      }
    });
  },
  methods:{
    /**
     * 初始化加载vconsole，如果是生产默认则不加载
     */
    init_vconsole() {
      this.vconsole = require('vconsole');
      setTimeout(()=> {
        document.body.click();
        this.tap_console();
      },1000);
    },
    /***
     * 不知道什么原因vconsole初始化之后获取不到dom元素，所以只能通过点击屏幕来唤醒vconsole实例
     * 默认meta标签里面的缩放大小为0.5，所以显得vconsole会缩小一半，通过flex(100, 1, 1)将缩放比例
     * 扩大到1，显示正常。之后的取消操作再将缩放比例还原。
     */
    tap_console() {
      try {
        if (this.vconsole.isReady) {
          this.vconsole.$.bind(document.querySelector('.vc-switch'), 'click', function() {
            flex(100, 1, 1);
          });
          this.vconsole.$.bind(document.querySelector('.vc-hide'), 'click', function() {
            flex(100, 1);
          });
          this.vconsole.$.bind(document.querySelector('.vc-mask'), 'click', function() {
            flex(100, 1);
          });
        }
      } catch (e) {}
    },
  },
};







