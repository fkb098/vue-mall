<template>
  <div class="mine-loading" :class="{'mine-loading-inline': inline}" >
      <span class="mine-loading-indicator" v-if="indicator==='on'">
        <slot><img src="./loading.gif" alt="loading"></slot>
      </span>
      <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
    </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    indicator: {
      type: String,
      default: 'on',
      validtor (value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    text: {
      //父组件
      type: String,
      default: '加载中...'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    setText(text){
      this.loadingText = text
    }
  },
  data(){
    return{
      //子组件的loadingtext值 初始为父组件的text值
      loadingText: this.text
    }
  },
  watch:{
    text(text){
      this.loadingText = text
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  .mine-loading{
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);

    &.mine-loading-inline {
      flex-direction: row;

       .mine-loading-text {
        margin-top: 0;
        margin-left: 8px;
      }
    }
  }
  .mine-loading-text{
    margin-top: 8px;
  }
</style>
