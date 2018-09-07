<template>
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hots.length">
      <me-loading/>
    </div>
    <ul class="hot-list" v-else>
      <li class="hot-item" v-for="(item,index) in hots" :key="index" @click="$_selectItem(item.hotWord)">{{item.hotWord}}</li>
    </ul>
  </div>
</template>

<script>
  import MeLoading from '../../base/loading';
  import {getSearchHotKeyword} from '../../api/search';
  import {searchMixin} from '../../assets/js/mixins';


  export default {
    name: 'SearchHot',
    components: {
      MeLoading
    },
    data(){
     return{
       hots:[]
     }
    },
    //点击后 加入缓存方法 写在mixins中
    mixins:[searchMixin],
    created(){
      //加载数据 在created中调用加载方法返回Promise对象 更新滚动条
      this.getHotKeyword().then(()=>{
        this.$emit('loaded')//发出事件更新滚动条 在search-index父组件中
      })
    },
    methods:{
      getHotKeyword(){
        return getSearchHotKeyword().then(data=>{
          return new Promise(resolve => {
            if(data){
              this.hots = data
              resolve()
            }
          })
        })

      },

    }

  };
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins";

  .hot {
    padding-left: 10px;
    background-color: #fff;
    border-bottom: 1px solid $border-color;
    margin-bottom: 10px;

    &-title {
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      padding: 8px;
      background-color: #f0f2f5;
      border-radius: 4px;
      margin: 0 10px 10px 0;
      color: #686868;
    }
  }

  .loading-container {
    padding: 10px 0;
  }
</style>
