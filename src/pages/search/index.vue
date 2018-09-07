<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header @query="getQuery"/>
      </header>
      <div class="g-content-container">
        <me-scorll ref="scroll">
          <search-hot v-show="!query" @loaded="updateScroll"/>
          <search-history @show-confirm="showConfirm" ref="history" v-show="!query" @remove-item="updateScroll"/>
          <search-result :query="query" v-show="query"/>
        </me-scorll>
      </div>

      <me-confirm
      msg="确定要清空吗"
      ref="confirm"
      @confirm="clearAllSearchHistorys"/>

    </div>
  </transition>
</template>



<script>
  import MeConfirm from '../../base/confirm';
  import SearchHeader from './header';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import SearchResult from './result';
  import MeScorll from '../../base/scroll'

export default {
  name: 'search',
  components:{
    MeConfirm,
    SearchHeader,
    SearchHot,
    SearchHistory,
    SearchResult,
    MeScorll
  },
  data(){
    return {
      query:''
    }
  },
  methods:{
    getQuery(query){
      this.query = query
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    clearAllSearchHistorys(){
      //删除子组件 最好的方法：子组件提供一个API接口 父组件内完成操作后调用接口删除子组件
      this.$refs.history.clear()
      this.$refs.history.update()
    },
    updateScroll(){
      this.$refs.scroll.update()
    }
  },

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  .search{
       position: absolute;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: $search-z-index;
       background-color: $bgc-theme;
  }

  .searched-enter-active,
  .searched-leave-active{
    transition: all 0.3s;
  }

  .searched-enter,
  .searched-leave-to{
    transform: translate3d(100%,0,0);
  }
  .g-content-container{
    margin-top: 50px;
    width: 100%;
    height: auto;
  }


</style>
