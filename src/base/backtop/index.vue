<template>
  <transition name="mine-backtop">
    <a href="javascript:"
       class="mine-backtop"
       v-show="visible"
       @click="backToTop">
      <i class="inconfont icon-backtop"></i>
    </a>
  </transition>

</template>

<script>
  export default {
    name: 'Mebacktop',
    props:{
      //变量确定显示隐藏
      visible:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      backToTop(){
        this.$emit('backtop')//调用backtop方法 点击回顶部
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  /*@import "../../assets/scss/icons";*/

  .mine-backtop{
    overflow: hidden;
    @include flex-center();
    background-color: rgba(0,0,0,0.6);//透明层
    border:none;
    width: 45px;
    height: 45px;
    border-radius: 50%;//圆角

    .iconfont{
      color:#fff;
      font-size: 38px;
    }
  }

  .mine-backtop{
    &-enter-active,
    &-leave-active{
      transition:opacity 0.4s
    }

    &-enter,
    &-leave-to{
      opacity: 0;
    }
  }

</style>
