<style scoped lang="less">
  .body {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
      height: 100px;
      line-height: 100px;
      font-size: 37px;
      color: white;
      background-color: @ThemeColor;
      position: relative;
      text-align: center;

      i {
        position: absolute;
        left: 20px;
        font-size: 50px;
      }
    }

    .content {
      background-color: #f6f6f6;
      flex: 1;
      .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(239, 239, 244);
        .loadingBox {
          text-align: center;
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          .van-loading {
            display: inline-block;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="body" v-title="'在线客服'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      在线客服
    </div>
    <div class="content">
      <div v-if="loading" class="loading">
        <div class="loadingBox">
          <van-loading size="50px" color="#fea24d" vertical></van-loading>
          <div>连接中...</div>
        </div>
      </div>
      <iframe id="iframeBox" :src="url" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Service",
    data() {
      return {
        url: "",
        loading: true
      };
    },
    computed: {
      ...mapGetters(["allConfig"])
    },
    created() {
      this.url = this.allConfig.kefuGG;
      this.$nextTick(() => {
        let iframe = document.getElementById("iframeBox");
        let that = this;
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function() {
            // IE
            that.loading = false;
          });
        } else {
          iframe.onload = function() {
            // 非IE
            that.loading = false;
          };
        }
      });
    }
  };
</script>
