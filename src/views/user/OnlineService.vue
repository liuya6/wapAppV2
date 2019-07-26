<template>
  <div class="onlineService flex" v-title="'我的客服'">
    <div class="top">
      <!-- <Header title="我的客服" rightI="&#xe6da;" rightTo="/service" color="#fff"></Header> -->
      <div class="header">
        <span>我的客服</span>
        <i class="iconfont backI" @click="back">&#xe629;</i>
        <i class="iconfont rightI" @click="$router.push({name:'service'})">&#xe6da;</i>
      </div>
      <div class="service-bj">
        <p>
          Hi
          <br />欢迎来到我的客服
        </p>
      </div>
    </div>
    <div class="content">
      <h2 class="yuebao-line">猜你的问题</h2>
      <div class="question-list">
        <dl class="secondForm4">
          <dd v-for="(item,index) in HelpData" :key="index">
            <div class="formIput" @click="showCont(item,index)">
              <span class="itemTxt">{{item.title}}</span>
            </div>
            <div class="question-detail" v-show="item.state" v-html="item.content"></div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { yueBaoHelp } from "../../api";
export default {
  name: "onlineService",
  data() {
    return {
      HelpData: "",
      state: false
    };
  },
  created() {
    this.initData();
  },
  computed: {},
  methods: {
    initData() {
      yueBaoHelp().then(res => {
        for (let item in res.data) {
          res.data[item].state = false;
        }
        this.HelpData = res.data;
      });
    },
    showCont: function(item) {
      item.state = !item.state;
    }
  }
};
</script>

<style scoped lang="less">
.onlineService {
  background: @BG;
  .top {
    background: @User-service-Bg;
    background-size: cover;
    width: 100%;
    height: 400px;
    .header {
      width: 100%;
      height: 100px;
      overflow: hidden;
      text-align: center;
      position: relative;
      color: #fff;
      span {
        font-size: 42px;
        line-height: 100px;
      }
      .backI {
        font-size: 46px;
        position: absolute;
        top: 0;
        padding: 0 10px;
        left: 20px;
        line-height: 100px;
      }
      .rightI {
        position: absolute;
        right: 20px;
        font-size: 44px;
        padding-top: 30px;
      }
    }
    .service-bj {
      margin-top: 90px;
      color: #fff;
      font-size: 38px;
      margin-left: 30px;
      line-height: 60px;
    }
  }
  .content {
    .yuebao-line {
      color: #444;
      font-size: 36px;
      position: relative;
      display: block;
      padding: 20px 0 0 50px;
    }
    .yuebao-line:before {
      content: "";
      display: block;
      position: absolute;
      width: 10px;
      height: 40px;
      left: 20px;
      top: 28px;
      background: @ThemeColor;
    }
    .question-list {
      padding-top: 30px;
      .formIput {
        background: #fff;
        border-bottom: 1px solid #ececec;
        padding: 15px;
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start;
        position: relative;
        .itemTxt {
          padding: 14px 0;
          font-size: 32px;
        }
      }
      .question-detail {
        padding: 20px 30px;
        font-size: 28px;
        line-height: 48px;
        margin-bottom: 1px;
        background-color: #fff;
        color: #6d6d6d;
      }
    }
  }
}
</style>
