<template>
  <div class="listBox">
    <div class="list flexB">
      <p>{{title}}</p>
      <div>
        <span>{{value}}</span>
        <div class="rotate">
          <i v-if="value" class="iconfont">&#xe629;</i>
        </div>
      </div>
      <!-- <div v-if="rightTitle">
      <router-link :to="rightTo" :style="{color:color}">{{rightTitle}}</router-link>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    title: String,
    value: String
  }
};
</script>

<style scoped lang="less">
.listBox {
  background: #fff;
    border-bottom: 1px solid #e4e4e4;
  .list {
    margin-left: 30px;
    font-size: 32px;
    color: #999999;
    padding: 30px 30px 30px 0;
    p {
      color: #282828;
    }
    > div {
      display: flex;
      i {
        font-size: 32px;
        margin-right: 20px;
      }
    }
  }
}
</style>
