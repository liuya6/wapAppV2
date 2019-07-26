<template>
  <div class="body" v-title="'玩法说明'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      玩法说明
    </div>
    <div class="content">
      <div class="content_title">
        {{ playData.name }}-{{ playData.playName }}
      </div>
      <div class="content_middle" v-html="playData.info"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GameDescription",
  data() {
    return {
      description: ""
    };
  },
  computed: {
    ...mapGetters(["playData"])
  }
};
</script>

<style scoped lang="less">
.body {
  text-align: center;
  .top {
    height: 100px;
    width: 100%;
    line-height: 100px;
    font-size: 37px;
    color: #333;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    position: fixed;
    top: 0;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .content {
    margin-top: 120px;
    padding: 0 20px 0;
    .content_title {
      font-size: 30px;
      line-height: 70px;
      font-weight: bold;
    }
    .content_middle {
      font-size: 30px;
      line-height: 50px;
      text-align: left;
    }
  }
}
</style>
