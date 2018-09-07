<template>
    <div class="product">
      product123
    </div>
</template>

<script>
export default {
  name: 'product'
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  .product{
    overflow: hidden;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;

  }
</style>
