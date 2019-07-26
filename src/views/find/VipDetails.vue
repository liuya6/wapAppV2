<template>
  <div class="vipDetails" v-title="'VIP详情'">
    <fixHead title="VIP详情" :class="{getBg:ifGetBg}"></fixHead>
    <div class="top">
      <img src="../../assets/images/vipLevel.png" alt />
      <div>{{getVip.nowLevel.levelName}}</div>
      <p>{{userInfo.username}}</p>
    </div>
    <div class="vipBox radius" v-for="(item,i) in getVip.levelList" :key="i">
      <div class="title flexB">
        <div class="flexS">
          等级：
          <span class="flexC">{{item.levelName}}</span>
        </div>
        <p>
          晋级要求：累计有效投注
          <span>{{item.minScore}}</span>+
        </p>
      </div>
      <div class="box flexB">
        <img src="../../assets/images/vipLevel.png" alt />
        <div class="vip">{{item.levelName}}</div>
        <div class="left">
          <h6>特权:</h6>
          <div class="item flexS">
            <div class="itemBall flexC">
              <i v-if="item.bonusUp>0" class="iconfont">&#xe71c;</i>
            </div>
            <p>
              晋级礼金:
              <span>{{item.bonusUp}}</span>元
            </p>
          </div>
          <div class="item flexS">
            <div class="itemBall flexC">
              <i v-if="item.bonusSignTotal>0" class="iconfont">&#xe71c;</i>
            </div>
            <p>
              签到礼金:
              <span>{{item.bonusSignTotal}}</span>元
            </p>
          </div>
        </div>
        <div class="right">
          <h6>&nbsp;</h6>
          <div class="item flexS">
            <div class="itemBall flexC">
              <i v-if="item.bonusWeek>0" class="iconfont">&#xe71c;</i>
            </div>
            <p>
              周礼金:
              <span>{{item.bonusWeek}}</span>元
            </p>
          </div>
          <div class="item flexS">
            <div class="itemBall flexC">
              <i v-if="item.bonusMonth>0" class="iconfont">&#xe71c;</i>
            </div>
            <p>
              月礼金:
              <span>{{item.bonusMonth}}</span>元
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ifGetBg: false
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop, "scrollTop");
      if (scrollTop < 160) {
        if (this.ifGetBg == false) return;
        this.ifGetBg = false;
      } else {
        if (this.ifGetBg == true) return;
        this.ifGetBg = true;
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo", "getVip"])
  }
};
</script>
<style lang="less" scoped>
.vipDetails {
  color: #fff;
  .getBg {
    background: #f69238;
  }
  .top {
    height: 290px;
    background: @User-vip-Bg;
    background-size: 100% 100%;
    padding-top: 120px;
    position: relative;
    div {
      // width: 194px;
      text-align: center;
      position: absolute;
      left: 50%;
      bottom: 26.4%;
      transform: translate(-50%, -50%);

      font-size: 38px;
    }
    img {
      width: 253px;
      // height: 200px;
      margin: 0 auto;
    }
    p {
      text-align: center;
      font-size: 40px;
      margin-top: 14px;
    }
  }
  .vipBox {
    border-radius: 18px;
    overflow: hidden;
    width: 690px;
    margin: 30px auto;
    color: #5c5c5c;
    font-size: 26px;
    .title {
      height: 80px;
      padding: 0 30px;
      background-color: #e9d2b5;
      div {
        color: #000000;
        span {
          width: 120px;
          height: 44px;
          background-color: #b1762b;
          color: #fff;
          border-radius: 22px;
        }
      }
      p {
        font-size: 24px;
      }
    }
    .box {
      padding: 28px 0 28px 10px;
      position: relative;
      .vip {
        width: 110px;
        text-align: center;
        position: absolute;
        left: 34px;
        bottom: 54px;
        color: #fff;
        white-space: nowrap;
      }
      img {
        width: 156px;
      }
      .left,
      .right {
        line-height: 46px;
        font-size: 24px;
      }
      .item {
        .itemBall {
          width: 24px;
          height: 24px;
          background-color: #cccccc;
          border-radius: 50%;
          margin-right: 10px;
          i {
            color: #b1762b;
            font-size: 28px;
            margin-left: 8px;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}
</style>
