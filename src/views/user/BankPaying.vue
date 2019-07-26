<template>
  <div class="body" v-title="'充值'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      充值金额
    </div>
    <div class="content">
      <dl>
        <dd>
          <span>订单号</span>
          <span>{{ order.recharge.rechargeId }}</span>
        </dd>
        <dd>
          <span>银行</span>
          <span>{{ order.rechargeMethod.rechargeName }}</span>
        </dd>
        <dd>
          <span>收款人</span>
          <span>{{ order.rechargeMethod.username }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.username"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
        <dd>
          <span>账号</span>
          <span>{{ order.rechargeMethod.account }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.account"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
        <dd>
          <span>开户网点</span>
          <span>{{ order.rechargeMethod.bankname }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.bankname"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
      </dl>
      <ul>
        <li>
          <span>存入时间</span>
          <input
            type="text"
            :placeholder="timestampToString(order.recharge.actionTime)"
            readonly
          />
        </li>
        <li>
          <span>存款人姓名</span>
          <input
            type="text"
            placeholder="请输入存款人姓名"
            v-model="payAccountName"
          />
        </li>
        <li>
          <span>存入金额</span>
          <input
            type="tel"
            :placeholder="MaxMoney"
            v-model="parameter.amount"
          />
        </li>
        <li>
          <span>转账方式</span>
          <div @click="select = true">
            {{parameter.bankPos}}
            <i class="iconfont">&#xe620;</i>
          </div>
        </li>
      </ul>
      <van-popup v-model="select" position="bottom" class="select">
        <div><span @click="select = false">完成</span></div>
        <van-picker :columns="columns" @change="onChange" />
      </van-popup>
      <div class="btn">
        <span @click="back">上一步</span>
        <span class="onBtn" :class="{disableBtn:!parameter.amount || !payAccountName}" @click="submit" >提交订单</span>
      </div>
      <div class="remind">
        <p>*提醒您:</p>
        <p>1，请如实填写存入时间、存入金额、存款人姓名。</p>
        <p>2，每笔转账请提交一次</p>
        <p>3，如转账金额添加零头如5003.10，便于查收，加快到账速度</p>
        <p>4，转账完成后请保留单据作为核对凭证</p>
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeSubmit } from "../../api";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "BankPaying",
  data() {
    return {
      payAccountName: "",
      columns:["网银转账","ATM现金入款","手机银行转账","ATM自动柜员机","银行柜台转账","其他"],
      parameter: {
        rechargeId: "",
        methodId: this.$route.params.id,
        amount: "",
        date: "",
        payAccountNameFull: "",
        bankPos: "网银转账"
      },
      select: false
    };
  },
  created() {
    if (!this.$route.params.id) this.$router.go(-1);
    this.parameter.amount = this.$route.params.money
  },
  computed: {
    ...mapGetters(["order"]),
    MaxMoney() {
      if (
        this.order.rechargeMethod.rechargeMin &&
        this.order.rechargeMethod.rechargeMax
      ) {
        return `${this.order.rechargeMethod.rechargeMin}-${
          this.order.rechargeMethod.rechargeMax
        }元`;
      } else if (
        this.order.rechargeMethod.rechargeMin &&
        !this.order.rechargeMethod.rechargeMax
      ) {
        return `金额最低${this.order.rechargeMethod.rechargeMin}元`;
      } else if (
        !this.order.rechargeMethod.rechargeMin &&
        this.order.rechargeMethod.rechargeMax
      ) {
        return `金额最高${this.order.rechargeMethod.rechargeMax}元`;
      } else {
        return `请输入存入金额`;
      }
    }
  },
  methods: {
    ...mapMutations(["DEPOSITS", "TRANSFER_METHOD"]),
    submit() {
      console.log( this.order.rechargeMethod.orderdesc);
      if (!this.payAccountName) {
        return this.$toast("请输入存款人姓名");
      }
      if (!this.parameter.amount) {
        return this.$toast("请输入存入金额");
      }
      this.parameter.rechargeId = this.order.recharge.rechargeId;
      this.parameter.date = this.timestampToString(
        this.order.recharge.actionTime
      );
      this.parameter.payAccountNameFull = (this.order.rechargeMethod.orderdesc || this.parameter.bankPos ) +"："+  this.payAccountName;
      this.DEPOSITS(this.parameter.amount);
      this.TRANSFER_METHOD(this.parameter.bankPos);

      if (parseFloat(this.order.rechargeMethod.rechargeMin) > 0) {
        if (
          this.parameter.amount <
          parseFloat(this.order.rechargeMethod.rechargeMin)
        ) {
          return this.$toast(
            "充值金额不能低于" + this.order.rechargeMethod.rechargeMin + "元"
          );
        }
      }
      if (parseFloat(this.order.rechargeMethod.rechargeMax) > 0) {
        if (
          this.parameter.amount >
          parseFloat(this.order.rechargeMethod.rechargeMax)
        ) {
          return this.$toast(
            "充值金额不能高于" + this.order.rechargeMethod.rechargeMax + "元"
          );
        }
      }
      console.log(this.parameter);
      rechargeSubmit(this.parameter).then(res => {
        if (res.status) {
          this.$router.push({
            name: "banksubmit"
          });
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onCopy: function(e) {
      console.log(e);
      this.$toast("复制成功");
    },
    onError: function(e) {
      console.log(e);
      this.$toast("复制失败");
    },
    onChange(picker, value, index){
      this.parameter.bankPos = value;
      console.log(picker,value,index)
    }
  }
};
</script>

<style scoped lang="less">
.body {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    background: #fff;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .content {
    padding-top: 100px;
    dl {
      background-color: #fff;
      text-align: left;
      padding-top: 15px;
      dd {
        padding-left: 60px;
        font-size: 30px;
        position: relative;
        span {
          line-height: 50px;
        }
        span:first-child {
          display: inline-block;
          width: 130px;
          text-align-last: justify;
        }
        span:nth-child(2) {
          color: #999999;
          margin-left: 25px;
        }
        span:nth-child(3) {
          /*float: right;*/
          position: absolute;
          right: 50px;
          color: #999999;
          overflow: hidden;
          background-color: #fff;
          /*margin-right: 50px;*/
        }
      }
      dd:last-child {
        padding-bottom: 20px;
        border-bottom: 1px solid #e0dcd9; /*no*/
      }
    }
    ul {
      background-color: #fff;
      text-align: left;
      li {
        margin: 16px 0;
        &:last-child {
          padding-bottom: 20px;
          div {
            height: 73px;
            line-height: 73px;
            display: inline-block;
            margin-left: 30px;
            border: 1px solid #999999; /*no*/
            border-radius: 10px;
            font-size: 30px;
            padding: 0 20px;
            i {
              font-size: 32px;
            }
          }
        }
        span {
          line-height: 75px;
          font-size: 30px;
          -ms-text-align-last: right;
          text-align: right;
          display: inline-block;
          width: 188px;
        }
        input {
          margin-left: 30px;
          width: 467px;
          height: 73px;
          border: 1px solid #999999; /*no*/
          border-radius: 10px;
          padding-left: 25px;
          font-size: 30px;
        }
      }
      li:last-child {
        border-bottom: 1px solid #e0dcd9; /*no*/
      }
    }
    .btn {
      width: 95%;
      display: flex;
      margin: 30px auto 0;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 333px;
        height: 86px;
        border: 1px solid #e0dcd9; /*no*/
        text-align: center;
        line-height: 86px;
        font-size: 30px;
        border-radius: 10px;
        &:nth-child(2) {
          border: 0;
          background: @Amount-Right-Btn;
          color: #fff;
        }
      }
    }
    .remind {
      text-align: left;
      padding: 23px 43px 0 30px;
      p {
        line-height: 50px;
        color: #676767;
        font-size: 27px;
      }
    }
    .select {
      >div {
        &:first-child {
          height: 70px;
          line-height: 70px;
          background-color: #f1f1f1;
          span {
            font-size: 30px;
            float: right;
            margin-right: 30px;
            color: @Forget-Pwd-Color;
          }
        }
      }
    }
  }
}
</style>
