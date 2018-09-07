<template>

  <!--<swiper :options="swiperOption" ref="swiper" :key="keyId">-->
  <swiper :options="swiperOption" ref="swiper" >

    <!--下拉  pullDown传值 css样式默认藏在bottom100%里,出可视区 下拉时才被看到-->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"/>
    </div>

    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>

    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>

  </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import MeLoading from '../loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from './config';


export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown:{
      type:Boolean,
      default: false
    },
    pullUp:{
      type:Boolean,
      default:false
    }

  },
  watch:{
    data(){
      this.update()
    }
  },
  created(){
    this.init()//生命周期钩子
  },
  methods: {

    //更新swiper的api
    update () {
      //Dom渲染完毕 nextTick 待用滚动条的更新
      this.$nextTick(()=>{
        this.$refs.swiper && this.$refs.swiper.swiper.update()
      })
    },
    //返回顶部的swiper的api
    scrollToTop(speed,runCallbacks){
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0,speed,runCallbacks)
    },
    //初始化数据 数据不需要随时监听所以不用卸载data()里
    init(){
      // keyId:Math.random(),
      this.pulling=false
        this.pullDownText=PULL_DOWN_TEXT_INIT
        this.pullUpText=PULL_UP_TEXT_INIT
        this. swiperOption= {
          direction: 'vertical', // 垂直滚动
          slidesPerView: 'auto', // 一页能看到几张图片 自适应
          freeMode: true, // 任意滚动高度
          setWrapperSize: true, // swiper-wrapper高度
          scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null, // scrollbar是否存在
            hide: true // 默认隐藏
        },
          //监听事件 拉动事件 slide-move touchEnd调用API监听 swiper.translate end()
        on: {
            sliderMove: this.scroll,//滚动
            touchEnd:this.touchEnd,
            transitionend:this.scrollEnd
        }
      }
    },

    scroll(){
      if(this.pulling){
        return
      }
      const swiper = this.$refs.swiper.swiper
      // console.log(swiper.translate)
      //下拉

      //滚动时触发的事件 滚动时监听一下 什么时候按钮显示隐藏
      this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper)

      if(swiper.translate>0){
        if(!this.pullDown){
          return
        }
        if(swiper.translate > PULL_DOWN_HEIGHT){
          // this.pullDownText = '111'//传值改变text

          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        }else{
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      }else if(swiper.isEnd){//是不是到底部了
        if(!this.pullUp){
          return
        }
        //是否超过该拉的地方
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
        }

      }
    },

    scrollEnd(){

      // this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper)
      const swiper = this.$refs.swiper.swiper;

      this.$emit('scroll-end', swiper.translate, swiper, this.pulling);
    },
    touchEnd() {
      if (this.pulling) {
        return;
      }
      const swiper = this.$refs.swiper.swiper;

      if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
        if (!this.pullDown) {
          return;
        }
        this.pulling = true;
        swiper.allowTouchMove = false;// 禁止触摸
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(PULL_DOWN_HEIGHT);
        swiper.params.virtualTranslate = true;// 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
        this.$emit('pull-down', this.pullDownEnd);// 触发一个事件
      } else if (swiper.isEnd) { // 判断是否到底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          this.$emit('pull-up', this.pullUpEnd);//调用事件，派发事件
        }
      }
    },
    pullDownEnd() {
      const swiper = this.$refs.swiper.swiper;
      this.pulling = false;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);//改变文字
      swiper.params.virtualTranslate = false;//
      swiper.allowTouchMove = true;//可以触摸
      swiper.setTransition(swiper.params.speed);//动画速度
      swiper.setTranslate(0);

      //下拉后的操作
      setTimeout(() => {
        this.$emit('pull-down-transition-end');
      }, swiper.params.speed);
    },
    pullUpEnd() {
      //还原值
      const swiper = this.$refs.swiper.swiper;
      this.pulling = false;
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      swiper.params.virtualTranslate = false;
      swiper.allowTouchMove = true;
    },


  }

}
</script>

<style lang="scss" scoped>
  .swiper-container{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .swiper-slide{
    height: auto;
  }
  .mine-scroll-pull-down{
    position: absolute;
    left: 0;
    bottom:100%;//出可视区
    width: 100%;
    height: 80px;
  }
  .mine-scroll-pull-up{
    top: 100%;
    height: 30px;
  }
</style>
