<template>
  <div class="yuebaoHome flex" v-title="'余额宝'">
    <div class="top">
      <!-- <Header title="余额宝" color="#fff" :isSlot = true><router-link to="/" class="iconfont">&#xe629;</router-link></Header> -->
      <div class="header">
        <span>余额宝</span>
        <i class="iconfont" @click="goBack">&#xe629;</i>
      </div>
      <div class="yuebao-info">
        <div class="yuebao-mony">
          <p>
            总余额（¥）
            <i class="iconfont" @click="showCont">{{Show?'&#xe723;':'&#xe722;'}}</i>
          </p>
          <h3 v-if="Show1">{{yueBaoData.yuebaoCoin}}</h3>
          <h3 v-if="Show">****</h3>
        </div>
        <div class="yue-earnings">
          <div class="yuebao-mony">
            <p>总本金（¥）</p>
            <h3 v-if="Show1">{{yueBaoData.baseCoin}}</h3>
            <h3 v-if="Show">****</h3>
          </div>
          <div class="yuebao-mony">
            <p>当前收益（¥）</p>
            <h3 v-if="Show1">{{yueBaoData.currentProfit}}</h3>
            <h3 v-if="Show">****</h3>
          </div>
          <div class="yuebao-mony">
            <p>累计收益（¥）</p>
            <h3 v-if="Show1">{{yueBaoData.totalProfit}}</h3>
            <h3 v-if="Show">****</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="yue-interest-rate">
        <p>当前日利率：</p>
        <p>
          <span>基准利率：{{yueBaoData.yuebaoBaseRate}}%</span>
          <span>额外利率：{{yueBaoData.yuebaoAdditionalRate}}%</span>
        </p>
      </div>
      <div class="yue-serve">
        <h2 class="yo-headline2 yuebao-line">我的服务</h2>
        <dl>
          <dd>
            <router-link to="/yuebaoList">
              <img src="../../assets/images/zhuanru.svg" />
              <p>转入记录</p>
            </router-link>
          </dd>
          <dd>
            <router-link to="/incomeExpenses">
              <img src="../../assets/images/shouzhimingxi.svg" />
              <p>收支明细</p>
            </router-link>
          </dd>
          <dd>
            <router-link to="/onlineService">
              <img src="../../assets/images/yuebaoshuoming.svg" />
              <p>余额宝说明</p>
            </router-link>
          </dd>
        </dl>
      </div>
    </div>
    <div class="two-buttons">
      <div>
        <router-link to="/transferOut" class="btn-default">转出</router-link>
        <router-link to="/transferIn" class="btn-primary">转入</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { yueBao } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "yuebaoHome",
  data() {
    return {
      yueBaoData: "",
      Show: false,
      Show1: true
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapGetters(['fromPathName'])
  },
  methods: {
    goBack () {
      this.$router.push({name:this.fromPathName})
    },
    initData() {
      yueBao().then(res => {
        this.yueBaoData = res.data;
      });
    },
    showCont: function() {
      this.Show = !this.Show;
      this.Show1 = !this.Show1;
    }
  }
};
</script>

<style scoped lang="less">
.yuebaoHome {
  background: @BG;
  .top {
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
      i {
        font-size: 46px;
        position: absolute;
        top: 0;
        padding: 0 10px;
        left: 20px;
        line-height: 100px;
      }
    }
    background: @User-yuebao-Bg;
    background-size: cover;
    width: 100%;
    height: 400px;
    .yuebao-info {
      margin-top: 6px;
      .yuebao-mony {
        margin: 0 auto;
        text-align: center;
        line-height: 60px;
        p {
          font-size: 30px;
          color: hsla(0, 0%, 100%, 0.6);
          i {
            color: #fff;
            font-size: 38px;
          }
        }
        h3 {
          font-size: 42px;
          color: #fff;
        }
      }
      .yue-earnings {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 40px;
        .yuebao-mony {
          flex-grow: 1;
          margin-top: 15px;
          p {
            font-size: 22px;
            line-height: 46px;
          }
          h3 {
            font-size: 36px;
            line-height: 56px;
          }
        }
      }
    }
  }
  .content {
    position: relative;
    margin-top: -40px;
    .yue-interest-rate {
      background: #fff;
      box-shadow: 0 2px 4px 0 #d1d1d1;
      border-radius: 10px;
      margin: 8px 40px 10px;
      padding: 15px 35px;
      p {
        display: flex;
        -moz-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-pack: justify;
        justify-content: space-between;
        font-size: 32px;
        color: #666;
        line-height: 60px;
        margin-bottom: 5px;
      }
    }
    .yue-serve {
      padding: 0 40px;
      h2.yo-headline2 {
        color: #444;
        font-size: 32px;
        position: relative;
        display: block;
        padding: 20px 0 0 25px;
      }
      .yo-headline2:before {
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        height: 32px;
        left: 0;
        top: 23px;
        background: @ThemeColor;
      }
      dl {
        width: 100%;
        padding-top: 20px;
        dd {
          display: block;
          float: left;
          width: 30%;
          text-align: center;
          background: #fff;
          border-radius: 4px;
          padding: 8px 0 12px;
          img {
            display: inline-block;
          }
          p {
            color: #343434;
            font-size: 26px;
          }
        }
        dd:nth-child(2) {
          margin: 0 5%;
        }
      }
    }
  }
  .two-buttons {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 120px;
    z-index: 5;
    div {
      padding: 15px 30px;
      display: flex;
      a {
        height: 84px;
        display: inline-block;
        flex-grow: 1;
        line-height: 84px;
        text-align: center;
        border-radius: 50px;
        font-size: 32px;
      }
      a.btn-default {
        border: 2px solid @ThemeColor;
        color: @ThemeColor;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      a.btn-primary {
        border: 2px solid @ThemeColor;
        background: @ThemeColor;
        color: #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>
