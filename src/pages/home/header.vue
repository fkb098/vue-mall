<template>

    <me-navbar class="header" title="">
      <i class="iconfont icon-scan" slot="left"></i>
      <!--<div slot="center"></div>-->
      <me-search-box placeholder="开学季有礼,好货五折起"  slot="center" @query="getQuery" fake @click.native="goToSearch"/>
      <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>

</template>

<script>
import MeNavbar from '../../base/navbar'
import MeSearchBox from '../../base/search-box'
export default {
  name: 'HomeHeader',
  components: {
    MeNavbar,
    MeSearchBox
  },
  methods:{
    getQuery(query){
      console.log(query)
    },
    goToSearch(){
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";

  .header{
    &.mine-navbar {
      background-color: transparent;
    }

    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
