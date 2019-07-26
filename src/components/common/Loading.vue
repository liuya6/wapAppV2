<template>
<!--  <transition name="fadeUp">-->
  <div>
    <div class="loading" :class="{black:black}" v-show="loadShow">
      <div class="jump">
        <img :src="require('../../assets/img/Loading.gif')" alt="">
      </div>
    </div>
  </div>
<!--  </transition>-->
</template>

<script>
export default {
  name: "Loading",
  data(){
    return {
      loadShow: false,
      black: false
    }
  }
}
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  &.black {
    background-color: rgba(0,0,0,0.6);
  }
  .jump {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    box-shadow:3px 3px 10px rgba(0,0,0,0.5);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
