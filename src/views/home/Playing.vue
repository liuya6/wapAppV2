<style scoped lang="less">
.body {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .loading {
    height: 100%;
    background-color: rgb(239, 239, 244);
    .loadingBox {
      width: 150px;
      height: 120px;
      text-align: center;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .van-loading {
        margin: 0 auto 20px;
      }
    }
  }
  .back {
    position: fixed;
    top: 80%;
    left: 80%;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 25px;
    color: silver;
    padding: 10px;
    z-index: 99999;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .layer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
<template>
  <div class="body" v-title="'Playing'">
    <div class="layer" v-show="showFlag"></div>
    <div class="back" v-show="!loading">
      <img src="../../assets/img/back.png" alt>
    </div>
    <div v-if="loading" class="loading">
      <div class="loadingBox">
        <van-loading type="spinner" color="#1989fa" size="40px"/>拼命加载中...
      </div>
    </div>
    <div style="width: 100%;height: 100%">
      <iframe :src="gameUrl" frameborder="0" width="100%" height="100%" id="iframeBox"></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  name: "KYchess",
  data() {
    return {
      loading: true,
      showFlag: false
    };
  },
  created() {
    this.$nextTick(() => {
      let iframe = document.getElementById("iframeBox");
      let that = this;
      let flag = true;
      console.log(iframe);
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
      let back = document.getElementsByClassName("back")[0];
      let WindowWidth = document.body.clientWidth;
      let WindowHeight = document.body.clientHeight;
      let boxWidth;
      let boxHeight;
      window.onresize = function() {
        WindowWidth = document.body.clientWidth;
        WindowHeight = document.body.clientHeight;
        boxWidth = back.offsetWidth;
        boxHeight = back.offsetHeight;
        back.style.left = "85%";
        back.style.top = "75%";
      };
      back.ontouchstart = function(e) {
        e = window.event || e;
        e.preventDefault();
        flag = true;
        that.showFlag = true;
        boxWidth = back.offsetWidth;
        boxHeight = back.offsetHeight;
      };
      back.ontouchmove = function(e) {
        e = window.event || e;
        e.preventDefault();
        flag = false;
        let endX = e.changedTouches[0].clientX - boxWidth / 2;
        let endY = e.changedTouches[0].clientY - boxHeight / 2;
        if (endX <= 0) {
          endX = 0;
        }
        if (endX > WindowWidth - boxWidth) {
          endX = WindowWidth - boxWidth;
        }
        if (endY <= 0) {
          endY = 0;
        }
        if (endY > WindowHeight - boxHeight) {
          endY = WindowHeight - boxHeight;
        }
        back.style.left = endX + "px";
        back.style.top = endY + "px";
      };
      back.ontouchend = function(e) {
        e = window.event || e;
        e.preventDefault();
        that.showFlag = false;
        if (flag) {
          Dialog.confirm({
            title: "提示",
            message: "确定退出吗?"
          })
            .then(action => {
              console.log(action);
              let pathName = sessionStorage.getItem('pathName');
              that.$router.replace({ name: pathName,params:{typeKey:that.$route.params.typeKey,classify:that.$route.params.classify}});
            })
            .catch(() => {
              console.log(e);
            });
        }
      };
    });
  },
  computed: {
    ...mapGetters(["gameUrl"])
  },
  methods: {
    goBack() {}
  }
};
</script>
