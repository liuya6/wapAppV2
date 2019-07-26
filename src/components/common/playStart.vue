<template>
  <transition name="fadeUp">
    <div class="playStart" @click="close" v-show="playStartShow">
      <div class="playBox" @click.stop>
        <div>余额提醒<i class="iconfont" @click="close">&#xe71a;</i></div>
        <div v-if="userInfo">
          <span>您的余额</span>
          <span>{{userInfo.coin}}</span>
          <i class="iconfont" @click="Refresh" :class="{'refresh':refreshFlag}">&#xe65e;</i>
        </div>
        <van-button @click="deposit">
          <i class="iconfont">&#xe63a;</i>
          <span>去存款</span>
        </van-button>
        <van-button @click="play">
          <i class="iconfont">&#xe614;</i>
          <span>进入游戏</span>
        </van-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from "vuex";
  import { isLogin } from "../../api";
  export default {
    name: "playStart",
    data() {
      return {
        refreshFlag: false
      }
    },
    computed:{
      ...mapGetters([
        'playStartShow',
        'userInfo',
        'gameUrl'
      ])
    },
    methods: {
      Refresh(){
        this.refreshFlag = true;
        isLogin().then(res=> {
          if (res.status) {
            this.$toast("刷新成功");
            this.refreshFlag = false;
            this.$store.commit("SET_USER_INFO", res.data);
          } else {
            this.$store.commit("SET_USER_INFO", "");
          }
        })
      },
      play() {
        this.winOpen(this.gameUrl)
      },
      deposit() {
        this.$router.push({name:'wallet'});
        this.$store.commit("SET_PLAY_START_SHOW",false)
      },
      close() {
        this.$store.commit("SET_PLAY_START_SHOW",false)
      }
    }
  }
</script>

<style scoped lang="less">
.playStart {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  .playBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 650px;
    background-color: #fff;
    > div {
      position: relative;
      &:nth-child(1) {
        line-height: 80px;
        background: @ThemeColor;
        color: #fff;
        text-align: center;
        font-size: 30px;
        i {
          position: absolute;
          right: 30px;
          font-size: 30px;
          color: #fff;
        }
      }
      &:nth-child(2) {
        margin-top: 20px;
        padding: 0 20px;
        span {
          display: inline-block;
          text-align: center;
          line-height: 60px;
          font-size: 28px;
          &:nth-child(1) {
            width: 150px;
            background: @Add-BankCard-Bg;
            color: #fff;
          }
          &:nth-child(2) {
            width: 400px;
            background-color: rgb(221, 221, 221);
            color: @Profit;
          }
        }
        i {
          display: inline-block;
          font-size: 30px;
          margin-left: 25px;
          color: @User-Font-Color;
          transition: 0.5s;
          &.refresh {
            color: @ThemeColor;
            animation: rotate 0.5s infinite ease;
          }
        }
      }
    }
    .van-button {
      width: 600px;
      margin-left: 20px;
      margin-top: 20px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 30px;
        margin-right: 10px;
      }
      &:nth-child(3) {
        background: @Amount-Left-Btn;
      }
      &:nth-child(4) {
        background: @Amount-Right-Btn;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
