<template>
  <div>
    <fxd-cellPiker :data="list" value="desc_" @cell_picker_submit_cb = "cell_picker_submit_cb"></fxd-cellPiker>

  </div>
</template>
<style>

</style>
<script>
  /*eslint-disable*/
export default {
    data(){
        return {
            list:{
                placeholder:'银行卡'
            }
        }
    },
    methods:{
        cell_picker_submit_cb(cb){
            Toask(`你选择了${cb[0].desc_},你的code值为${cb[0].code_}`)
        }
    }
}

</script>
