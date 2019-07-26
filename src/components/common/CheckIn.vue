<template>
  <transition name="fadeUp">
    <div class="checkInBox" v-show="checkInShow" @click="close">
      <div v-if="!success" class="checkIn" key="check" @click.stop>
        <div class="check-logo">
          <img :src="cdnImg('signIn/check-logo.png')" alt="" />
        </div>
        <div class="check-title">
          VIP等级越高连续签到天数越多，签到礼金越多
        </div>
        <div class="check-fg"></div>
        <ul class="check-content">
          <li v-for="(item,i) in List" :key="i" :class="{ yqd:checkInList.day >= (i+1) }">
            <div>
              <img :src="cdnImg(`signIn/${item.img}.png`)" alt="" />
            </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
        <van-button class="checkIn-btn" :class="{ no:parseInt(checkInList.bonus) <= 0 || checkInList.todaySign }" @click="goSignIn">
          {{checkInList.todaySign?'已签到':'立即签到'}}
        </van-button>
        <div class="close" @click="close">
          <img :src="cdnImg('signIn/close.png')" alt="" />
        </div>
      </div>
      <div v-else class="success" key="success">
        <div class="top">
          <p>{{money}}<span>元</span></p>
          <p>恭喜获得</p>
        </div>
<!--        <div class="fg"></div>-->
<!--          <div class="btm">-->
<!--            <p>第二天签到可获得0.5元</p>-->
<!--            <p>晋级到下一等级，第二天签到可获得3.8元</p>-->
<!--          </div>-->
        <div class="close" @click="close">
          <img :src="cdnImg('signIn/close.png')" alt="" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const List = [
  { title:"第一天",img:"one-days" },
  { title:"第二天",img:"two-days" },
  { title:"第三天",img:"three-days" },
  { title:"第四天",img:"four-days" },
  { title:"第五天",img:"five-days" },
  { title:"第六天",img:"six-days" },
  { title:"第七天",img:"seven-days" },
];
import { mapGetters } from "vuex";
import { signIn } from "../../api";
export default {
  name: "CheckIn",
  data() {
    return {
      List,
      success: false,
      money: ""
    }
  },
  created() {
    console.log(this.checkInList);
  },
  computed: {
    ...mapGetters(['checkInShow',"checkInList"])
  },
  watch: {
    checkInShow(newVal) {
      if(!newVal) {
        this.success = false;
      }
    }
  },
  methods: {
    close() {
      this.$store.commit("SET_CHECKIN_SHOW",0);
    },
    goSignIn() {
      console.log(this.checkInList,Number(this.checkInList.bonus));
      if(this.checkInList.todaySign) {
        return this.$toast("您今天已经签过了，明天再继续噢")
      }
      if(Number(this.checkInList.bonus) <= 0) {
        return this.$toast("敬请期待！")
      }
      signIn().then(res=>{
        console.log(res);
        if(res.status) {
          this.success = true;
          this.money = res.data.bonus;
          this.$store.dispatch("getCheckInList");
          if(this.$router.currentRoute.name == "user") {
            this.$store.dispatch("checkedLogin");
          }
        }else {
          console.log('1111111111',res.msg);
          this.$toast(res.msg);
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.checkInBox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2000;
  .checkIn {
    position: absolute;
    left: 50%;
    top: 47%;
    transform: translate(-50%,-50%);
    width: 670px;
    background-color: @Check-Bg;
    border-radius: 30px;
    .check-logo {
      position: absolute;
      width: 387px;
      height: 100px;
      top: -50px;
      left: 50%;
      transform: translate(-50%);
    }
    .check-title {
      text-align: center;
      margin-top: 80px;
      color: @Check-Title-FontColor;
      font-size: 24px;
    }
    .check-fg {
      width: 630px;
      height: 31px;
      background-color: @Check-Fg-Color;
      margin: 26px auto 0;
      border-radius: 31px;
    }
    .check-content {
      width: 590px;
      height: 610px;
      background-image: linear-gradient(#e3af65 0%, #fcf3e3 5%), linear-gradient(#fff4e6, #fff4e6);
      margin: -20px auto 0;
      overflow: hidden;
      padding-top: 20px;
      li {
        width: 170px;
        height: 170px;
        float: left;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 18px;
        box-sizing: border-box;
        background-image: linear-gradient(-35deg,
        #f7cc8e 0%,
        #fcf3e3 100%),
        linear-gradient(
            #ffffff,
            #ffffff);
        border: solid 1px #ae6a09; /*no*/
        position: relative;
        &.yqd {
          &:after {
            content: "";
            display: block;
            position: absolute;
            top: .133333rem;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background: url("../../assets/images/yqd.png") no-repeat;
            background-size: 78% auto;
            background-position-x: center;
          }
        }
        >div {
          width: 110px;
          height: 120px;
          line-height: 110px;
          margin: auto;
          img {
            display: inline-block;
            vertical-align: middle;
            width: 100%;
          }
        }
        p {
          text-align: center;
          color: @Check-Item-FontColor;
          font-size: 26px;
        }
        &:last-child {
          width: 550px;
          display: flex;
          &:after {
            background-size: 35% auto !important;
          }
          div {
            width: 50%;
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 126px;
              height: 116px;
            }
          }
          p{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .checkIn-btn {
      width: 381px;
      height: 82px;
      background-image: linear-gradient(90deg,
      #fd6c30 0%,
      #fe9739 100%);
      border-radius: 41px;
      color: #fff;
      position: relative;
      left: 50%;
      transform: translate(-50%);
      margin: 20px 0 20px;
      &.no {
        background: silver !important;
      }
    }
    .close {
      position: absolute;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      left: 50%;
      bottom: -100px;
      transform: translate(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .success {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 670px;
    height: 735px;
    background: url("../../assets/images/success-bg.png") no-repeat;
    background-size: 100% 100%;
    .top {
      margin-top: 300px;
      text-align: center;
      color: @red;
      p {
        &:nth-child(1) {
          font-size: 140px;
          span {
            font-size: 40px;
          }
        }
        &:nth-child(2) {
          font-size: 88px;
        }
      }
    }
    .fg {
      width: 610px;
      height: 2px;
      background-color: #d3a96d;
      margin: 30px auto 30px;
    }
    .btm {
      text-align: center;
      color: @Check-Item-FontColor;
      font-size: 30px;
      p {
        line-height: 50px;
      }
    }
    .close {
      position: absolute;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      left: 50%;
      bottom: -120px;
      transform: translate(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
