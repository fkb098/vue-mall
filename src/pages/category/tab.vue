<template>
  <me-scroll :scrollbar="false" ref="scroll">
    <ul class="tab">

      <!--数据在兄弟组件中通信 vuex 借助父组件-->
      <li class="tab-item" :class="{'tab-item-active':item.id === curId}" v-for="(item,index) in items" :key="index" @click="switchTab(item.id)">{{item.name}}</li>
    </ul>
  </me-scroll>
</template>

<script>
  import MeScroll from '../../base/scroll';
  import {categoryNames} from './config'

  export default {
    name: 'CategoryTab',
    components: {
      MeScroll
    },
    created(){
      this.init()
      this.switchTab(this.items[0].id)
    },
    data(){
      //每次切换保留id 判断是否选中 所以id要存储起来 （要时刻变化）
      return{
        curId:'',
      }
    },
    methods:{
      init(){
        this.items = categoryNames
        return Promise
      },
      switchTab(id){
        if(this.curId === id){
          return
        }
        this.curId = id
        this.$emit('switch-tab',id)//触发外部事件 把id传出去 当前组件——父组件——兄弟组件
      },

    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";

  $tab-item-height: 46px;

  .tab {
    width: 100%;

    &-item {
      height: $tab-item-height;
      background-color: #fff;
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      color: #080808;
      font-size: $font-size-l;
      font-weight: bold;
      text-align: center;
      line-height: $tab-item-height;
      @include ellipsis();

      &:last-child {
        border-bottom: none;
      }
    }

    &-item-active {
      background: none;
      border-right: none;
      color: #f23030;
    }
  }
</style>
