<template>
  <div class="category">

    <header class="g-header-container">
      <category-header/>
    </header>

    <div class="g-content-container">

      <div class="sidebar">
        <!--接受tab组件中的数据 switch-tab响应调用getId函数-->
        <category-tab @switch-tab="getCurrentId"/>
      </div>

      <div class="main">
        <category-content :curId="curId"/>
      </div>

    </div>

  </div>
</template>

<script>
  import CategoryHeader from './header';
  import CategoryTab from './tab';
  import CategoryContent from './content';

  export default {
    name: 'Category',
    components: {
      CategoryHeader,
      CategoryTab,
      CategoryContent
    },
    data(){
      return{
        curId:''
      }
    },
    methods:{
      getCurrentId(id){
        this.curId = id
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";

  .category {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
  }

  .g-content-container {
    margin-top: 50px;
    display: flex;
  }

  .sidebar {
    width: 80px;
    height: 100%;
  }

  .main {
    flex: 1;
    height: 100%;
  }

</style>
