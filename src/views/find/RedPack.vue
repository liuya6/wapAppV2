<template>
  <div class="redPack" v-title="'红包'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
<!--      <span>红包记录</span>-->
    </div>
    <div class="content">
      <div class="chai" @click="redPack">
        <img src="../../assets/img/chai.png" alt="">
      </div>
      <transition name="fadeUp">
        <div class="goodLuck" v-show="goodLuckShow">
          <div>
            <b @click="goodLuckShow = false">x</b>
            <span>{{money}}元</span>
            <span>您的彩金已放入您的账号请注意查看!</span>
            <span @click="redPack">继续拆红包</span>
          </div>
        </div>
      </transition>
      <div class="textBox">
        <div>
          <h3>【活动说明】</h3>
          <p v-html="redContent"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { grabRedPacket } from "../../api";
import { mapGetters } from "vuex";

export default {
  name: "RedPack",
  data() {
    return {
      redID: "",
      redContent: "",
      goodLuckShow: false,
      money: ""
    }
  },
  created () {
    this.redID = this.redPackContent.id;
    this.redContent = this.redPackContent.content;
  },
  computed: {
    ...mapGetters(["redPackContent"])
  },
  methods:{
    redPack() {
      this.goodLuckShow = false;
      grabRedPacket({ id: this.redID }).then(res => {
        if(res.status) {
          this.money = res.data;
          this.goodLuckShow = true
        }else {
          this.goodLuckShow = false;
          this.$toast(res.msg)
        }
      });
    }
  }
}
</script>

<style scoped lang="less">
.redPack {
  background: @Red-Pack-Bg;
  background-size: 100%;
  overflow: hidden;
  .top {
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    z-index: 1;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
    span {
      position: absolute;
      right: 20px;
      font-size: 30px;
    }
  }
  .content{
    min-height: 100vh;
    position: relative;
    .goodLuck {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      > div{
        width: 630px;
        height: 750px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: @Red-Good-Luck;
        -webkit-background-size: 100%;
        b {
          position: absolute;
          right: 30px;
          top: 40px;
          width: 50px;
          height: 50px;
          line-height: 40px;
          text-align: center;
          font-weight: normal;
          font-size: 40px;
          border-radius: 50%;
          border: 1px solid #fff1a3; /*no*/
          color: #fff1a3;
        }
        span {
          &:nth-child(2) {
            color: #fff1a3;
            font-size: 68px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,0);
          }
          &:nth-child(3) {
            color: #fff1a3;
            font-size: 28px;
            position: absolute;
            top: 70%;
            left: 55%;
            width: 500px;
            transform: translate(-50%,0);
            white-space: normal;
          }
          &:nth-child(4) {
            width: 370px;
            height: 90px;
            background-color: #ffc586;
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%,0);
            color: #ec2618;
            text-align: center;
            line-height: 90px;
            border-radius: 90px;
            font-size: 32px;
          }
        }
      }
    }
    .chai {
      position: absolute;
      left: 50%;
      top: 35%;
      width: 260px;
      height: 260px;
      transform: translate(-50%,0);
      animation: scale 0.5s ease-in-out infinite;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .textBox {
      background-color: #fdde46;
      margin-top: 1200px;
      padding-bottom: 50px;
      min-height: 500px;
      >div {
        width: 630px;
        margin: auto;
        background-color: #ffcc33;
        padding: 30px;
        border-radius: 15px;
        h3 {
          text-align: center;
          color: #333333;
          font-size: 38px;
          margin-bottom: 35px;
        }
        p {
          line-height: 55px;
          font-size: 32px;
          margin-bottom: 35px;
        }
      }
    }
  }
}
  @keyframes scale {
    0% {
      transform:translate(-50%,0) scale(1.1);
    }
    50% {
      transform:translate(-50%,0) scale(1);
    }
    100%{
      transform:translate(-50%,0) scale(1.1);
    }
  }
</style>
