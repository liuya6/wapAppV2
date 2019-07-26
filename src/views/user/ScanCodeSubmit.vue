<style scoped lang="less">
.body {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    background-color: #fff;
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
    .schedule {
      margin: 44px 0 66px 0;
      height: 87px;

      img {
        width: 100%;
        height: 87px;
      }
    }

    ul {
      text-align: left;
      padding-top: 15px;

      li {
        padding-left: 62px;
        line-height: 48px;
        overflow: hidden;

        span {
          float: left;
          font-size: 32px;
        }

        span:first-child {
          width: 136px;
          text-align-last: justify;
        }

        span:last-child {
          color: #999999;
          margin-left: 20px;
        }
      }

      li:last-child {
        padding-bottom: 20px;

        div {
          overflow: hidden;
          width: 390px;
          height: 390px;
          padding: 12px 0 0 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .btn {
      margin-top: 111px;
      span {
        display: block;
        margin: auto;
        width: 670px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 30px;
        border-radius: 10px;
        background: @Amount-Right-Btn;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'充值'">
    <div class="top shenLan">
      <i class="iconfont" @click="$router.push({name:'wallet'})">&#xe629;</i>
      充值提交
    </div>
    <div class="content">
      <div class="schedule">
        <img src="../../assets/img/schedule.png" alt="" />
      </div>
      <ul>
        <li>
          <span>订单号</span>
          <span>{{ order.recharge.rechargeId }}</span>
        </li>
        <li>
          <span>充值方式</span>
          <span>{{ order.rechargeMethod.rechargeName }}</span>
        </li>
        <li>
          <span>存入金额</span>
          <span>{{ deposits }}元</span>
        </li>
        <li>
          <span>收款账号</span>
          <span>{{ order.rechargeMethod.username }}</span>
        </li>
        <li>
          <span>二维码</span>
          <div>
            <img :src="order.rechargeMethod.image" alt="" />
          </div>
        </li>
      </ul>
      <div class="btn">
        <span @click="$router.push({ name: 'bill' })">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ScanCodeSubmit",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["order", "deposits"])
  },
  mounted() {
    console.log(this.order);
  }
};
</script>
