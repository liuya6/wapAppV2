<style scoped lang="less">
.paying {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: #333;
    background-color: #fff;
    position: relative;
    text-align: center;
    border-bottom: 1px solid #f0f0f0; /*no*/
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .content {
    padding: 46px 40px 0;
    .content-top {
      background-color: #fff;
      .submitBtn {
        margin-top: 30px;
        width: 669px;
        height: 87px;
        line-height: 87px;
        margin-left: 0;
      }
      > div {
        .borderBtm();
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .van-cell {
          font-size: 35px;
        }
        span {
          font-size: 30px;
          display: inline-block;
          width: 90%;
          height: 40px;
          &.placeholder{
            color: #aeaeae;
          }
        }
        b {
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          background-color: #e8e8e8;
          color: #c4c4c4;
          font-weight: normal;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        li{
          flex: 0 0 auto;
          width: 150px;
          height: 60px;
          margin-left: 13px;
          .borderAll();
          box-sizing: border-box;
          margin-top: 30px;
          border-radius: 60px;
          text-align: center;
          line-height: 60px;
          font-size: 30px;
          color: #a5a5a5;
        }
        .on {
          background-color: @ThemeColor;
          color: #fff;
          border: 0;
        }
      }

    }
  }
  .key {
    background-color: #cfd3dc;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 10px;
    position: relative;
    dt {
      position: absolute;
      width: 238px;
      height: 90px;
      background-color: #cfd3dc;
      right: 10px;
      bottom: 10px;
      text-align: center;
      line-height: 90px;
      font-size: 60px;
    }
    dd{
      flex: 0 0 auto;
      width: 238px;
      height: 90px;
      text-align: center;
      background-color: #fff;
      margin-top: 10px;
      margin-left: 10px;
      border-radius: 7px;
      overflow: hidden;
      box-shadow:1px 1px 2px #333333;
      &:nth-of-type(3n+1){
        margin-left: 0;
      }
      &.zero,&.one{
        line-height: 90px;
      }
      .van-button {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 36px;
      }
      p{
        font-size: 24px;
      }
    }
  }
  .PopupSuccess {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    text-align: center;

    ul {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      width: 550px;
      height: 550px;
      margin: auto;
      border-radius: 18px;
      overflow: hidden;
      li{
        padding: 0 30px;
      }
      li:first-child {
        color: #999;
        font-size: 200px;
        margin-top: 40px;
      }

      li:nth-child(2) {
        line-height: 58px;
        font-size: 36px;
      }

      li:nth-child(3) {
        color: #999999;
        line-height: 48px;
      }

      li:last-child {
        padding: 0;
        width: 100%;
        position: absolute;
        bottom: 30px;

        span {
          display: inline-block;
          width: 228px;
          height: 88px;
          border: 1px solid #dedddb; /*no*/
          border-radius: 10px;
          line-height: 88px;
          text-align: center;
          font-size: 32px;
        }

        span:first-child {
          margin-right: 5px;
          background-color: #f6f6f6;
        }

        span:last-child {
          margin-left: 5px;
          background: @Amount-Right-Btn;
          color: white;
        }
      }
    }
  }
}
</style>
<template>
  <div class="paying" @click.stop="keyboardShow = false">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      充值金额
    </div>
    <div class="content">
      <div class="content-top">
        <div>
<!--          <span @click.stop="keyboardShow=true" :class="{'placeholder':data.amount<=0}">{{data.amount>0?data.amount:'请输入充值金额（元）'}}</span>-->
          <van-field
              ref="moneyInput"
              type="tel"
              v-model="data.amount"
              :placeholder="MaxMoney"
              :border="false"
              clearable
              :readonly=isReadonly
          ></van-field>
<!--          <b v-show="data.amount>0" @click="data.amount=''">X</b>-->
        </div>
        <ul v-if="rechargeMoney.length">
          <li v-for="item in rechargeMoney" :key="item" :class="{'on':item===data.amount}" @click="data.amount=item">{{'￥'+item}}</li>
        </ul>
        <van-button class="submitBtn" :class="{disableBtn:!data.amount}" @click="submit">确认</van-button>
      </div>
    </div>
<!--    <van-number-keyboard-->
<!--        :show="keyboardShow"-->
<!--        extra-key="."-->
<!--        close-button-text="完成"-->
<!--        @input="onInput"-->
<!--        @delete="onDelete"-->
<!--    ></van-number-keyboard>-->
<!--    <transition name="fadeUp">-->
<!--      <div class="PopupSuccess" v-show="isSuccess">-->
<!--        <ul>-->
<!--          <li class="iconfont">&#xe600;</li>-->
<!--          <li>-->
<!--            是否充值成功？-->
<!--          </li>-->
<!--          <li>-->
<!--            稍后请查收你的账户-->
<!--          </li>-->
<!--          <li>-->
<!--            <span @click="isSuccess = false">操作失败</span>-->
<!--            <span-->
<!--                @click="$router.push({ name: 'bill' })"-->
<!--                class="onBtn"-->
<!--            >充值成功</span-->
<!--            >-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </transition>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// const payNum = [ "99","199","599","999","1999","2999","3999","4999" ];
export default {
  name: "Paying",
  data() {
    return {
      orderLimit: {},
      // payNum,
      isSuccess: false,
      // keyboardShow: true,
      data: {
        methodId: this.$route.query.id,
        amount: ""
      }
    };
  },
  created() {
    console.log(this.$store.getters.order);
    this.orderLimit = this.$store.getters.order.rechargeMethod;
    if (!this.$route.query.id) this.$router.go(-1);
    this.$nextTick(()=>{
      if(!this.isReadonly){
        this.$refs.moneyInput.focus();
      }
    });
    console.log(this.rechargeMoneyType);
  },
  computed: {
    ...mapGetters([
      "rechargeMoney",
      "rechargeMoneyType"
    ]),
    isReadonly() {
      return this.rechargeMoneyType == 1
    },
    MaxMoney() {
      if (this.orderLimit.rechargeMin && this.orderLimit.rechargeMax) {
        return `输入金额${this.orderLimit.rechargeMin}~${
          this.orderLimit.rechargeMax
        }元`;
      } else if (this.orderLimit.rechargeMin && !this.orderLimit.rechargeMax) {
        return `最低金额${this.orderLimit.rechargeMin}元`;
      } else if (!this.orderLimit.rechargeMin && this.orderLimit.rechargeMax) {
        return `最高金额${this.orderLimit.rechargeMax}元`;
      } else {
        return `请输入金额`;
      }
    }
  },
  methods: {
    submit() {
      if (!this.data.amount) {
        return this.$toast("请输入金额");
      }
      if (parseFloat(this.orderLimit.rechargeMin) > this.data.amount) {
        return this.$toast("金额不能少于" + this.orderLimit.rechargeMin + "元");
      }
      if (parseFloat(this.orderLimit.rechargeMax) < this.data.amount) {
        return this.$toast("金额不能大于" + this.orderLimit.rechargeMax + "元");
      }
      // this.isSuccess = true;
      this.winOpen(
        "/api/common/pay/create/methodId/" +
          this.data.methodId +
          "/money/" +
          this.data.amount
      );
    },
    // onInput(val) {
    //   if(this.data.amount.length<10){
    //     this.data.amount+=val
    //   }
    // },
    // onDelete() {
    //   this.data.amount=this.data.amount.substring(0,this.data.amount.length-1,1)
    // },
  }
};
</script>
