<template>
  <div class="headerBox">
    <div class="header" :style="{color: color}">
      <slot v-if="isSlot"></slot>
      <i v-else @click="back" class="iconfont back">&#xe629;</i>
      <span>{{title}}</span>
      <div class="rightText" v-if="rightTitle">
        <div v-if="rightClick" @click="rightClick">{{rightTitle}}</div>
        <router-link v-else :to="rightTo" :style="{color:color}">{{rightTitle}}</router-link>
      </div>
      <router-link class="link" v-if="rightI" :to="rightTo">
        <i class="iconfont" :style="{color:color}" v-html="rightI"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    rightTitle: String,
    rightClick: Function,
    rightI: String,
    rightTo: String,
    color: String,
    isSlot: Boolean
  }
};
</script>

<style scoped lang="less">
.headerBox {
  width: 100%;
  height: 100px;
  overflow: hidden;
  .header {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 100px;
    span {
      font-size: 42px;
    }
    i {
      font-size: 46px;
    }
    .back {
      position: absolute;
      padding: 0 10px;
      left: 16px;
    }
    .rightText {
      position: absolute;
      right: 30px;
      top: 0;
      font-size: 32px;
    }
    .link {
      position: absolute;
      top: 0;
      right: 20px;
      padding: 0 10px;
    }
  }
}
</style>
