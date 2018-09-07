<template>
    <div class="home">

      <!--home-->
      <header class="g-header-container">
        <home-header/>
      </header>

      <!--事件监听pull-down下拉是否完成-->
        <me-scroll :data="recommends" pullDown @pull-down="pullToRefresh" pullUp @pull-up="pullToLoadMore" @scroll-end="scrollEnd" ref="scroll">

        <home-slider ref="slider"/>
        <home-nav/>
        <home-recommend @loaded="getRecommends" ref="recommend"/>

        </me-scroll>

      <div class="g-backtop-container">
        <!--//调用backToTop方法 子组件里有backtop的emit调用 所以父组件就要有@backtop来响应-->
        <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
      </div>

      <router-view></router-view>

    </div>
</template>

<script>
import HomeHeader from './header'
import HomeSlider from './slider'
import MeScroll from '../../base/scroll'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import MeBacktop from '../../base/backtop'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeSlider,
    MeScroll,
    HomeNav,
    HomeRecommend,
    MeBacktop

  },
  data () {
    return {
      recommends: [],
      isBacktopVisible:false
    }
  },
  methods: {
    updateScroll () {

    },
    getRecommends (recommends) {
      this.recommends = recommends
    },
    //下拉刷新完成 事件延迟 end()
    pullToRefresh(end){
      // this.$refs.slider.update().then(end)
      // end()
      setTimeout(()=>{
        this.$refs.slider.update().then(end)
        // end()//刷新后的API方法 end()方法API表示刷新结束后回到初始状态
      },500)
    },
    pullToLoadMore(end){
      this.$refs.recommend.update().then(end).catch(err=>{
        if(err){
          console.log(err)
        }
        end()
        //处理没有更多数据的情况：禁止加载更多数据 替换上拉时的loading，改为没有更多数据了
      })
      // setTimeout(()=>{
      //   console.log('下拉刷新')
      //   end()//刷新后的API方法 end()方法API表示刷新结束后回到初始状态
      // },500)
    },
    scrollEnd(translate,scroll){
      this.isBacktopVisible = translate < 0 && -translate > scroll.height;
    },

    backToTop(){
      this.$refs.scroll && this.$refs.scroll.scrollToTop(); //调用返回顶部的API
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "../../assets/scss/mixins";
  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
