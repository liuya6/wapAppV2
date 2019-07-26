<style scoped lang="less">
.body {
  .top {
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    text-align: center;
    font-size: 38px;
    color: @Bill-Font-Color;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }

  .content {
    font-size: 30px;
    line-height: 50px;
    .fg {
      height: 30px;
      background-color: @BG;
    }
    h3 {
      font-size: 35px;
      padding-left: 20px;
      padding-top: 20px;
    }

    p {
      padding-left: 20px;
      text-align: left;
      margin-top: 20px;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'消息内容'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      消息内容
    </div>
    <div class="content">
      <div class="fg"></div>
      <h3>{{ msgDetail.title }}</h3>
      <p v-html="msgDetail.content"></p>
    </div>
  </div>
</template>

<script>
import { msgDetail } from "../../api";
export default {
  name: "MsgDetail",
  data() {
    return {
      msgDetail: ""
    };
  },
  mounted() {
    if (!this.$route.query.id) this.$router.go(-1);
    msgDetail({
      id: this.$route.query.id
    }).then(res => {
      console.log(res);
      this.msgDetail = res.data;
    });
  }
};
</script>
