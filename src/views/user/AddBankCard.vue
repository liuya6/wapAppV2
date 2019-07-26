<template>
  <div class="boundBankCard flex" v-title="'添加银行卡'">
    <Header title="添加银行卡"></Header>
    <div class="content">
      <div class="list">
        <van-cell-group>
          <van-field
            v-model="user.cardholder"
            label="开户名:"
            clearable
            placeholder="请输入银行卡开户人姓名"
            :disabled="isReadOnly"
          ></van-field>
          <van-field
            type="tel"
            v-model="cardNumber"
            label="银行卡号:"
            clearable
            placeholder="请输入银行卡号"
            maxlength="28"
          ></van-field>
          <div class="selectBank">
            <span>所属银行：</span>
            <div @click="bankListShow = true">
              <input type="text" placeholder="请选择所属银行" readonly v-model="user.bankName" />
              <i class="iconfont">&#xe71b;</i>
            </div>
          </div>
          <van-field
            v-show="otherBankShow"
            v-model="otherBankName"
            label="银行卡名称:"
            clearable
            placeholder="请输入银行卡名称"
          ></van-field>
          <div class="selectBank">
            <span>开户地区：</span>
            <div @click="areaShow = true">
              <input type="text" placeholder="请选择银行开户地区" readonly v-model="user.area" />
              <i class="iconfont">&#xe71b;</i>
            </div>
          </div>
          <div v-show="!userInfo.coinPassword">
            <van-field
              v-model="user.coinPassword"
              label="提现密码:"
              clearable
              maxlength="6"
              type="password"
              placeholder="请输入6位提现密码"
            ></van-field>
            <van-field
              v-model="user.reCoinPassword"
              label="确认密码:"
              clearable
              maxlength="6"
              type="password"
              placeholder="请确认6位提现密码"
            ></van-field>
          </div>
          <van-field
            v-if="homeInfo.siteConfig.isOpenSms==1"
            class="userPhone"
            v-model="user.mobile"
            label="预留手机号:"
            type="tel"
            clearable
            placeholder="请输入常用11位手机号"
            maxlength="11"
          >
            <van-button
              class="sendCode"
              :class="setCodeFlag?'on':'wait'"
              slot="button"
              size="small"
              @click="getCode"
            >{{AddBankWaitTime>0?AddBankWaitTime+'秒后重新获取':'获取验证码'}}</van-button>
          </van-field>
          <van-field
            v-if="homeInfo.siteConfig.isOpenSms==1"
            v-model="user.verifyCode"
            label="验证码:"
            type="number"
            clearable
            placeholder="请输入验证码"
          ></van-field>
        </van-cell-group>
      </div>
      <div @click="bingBankCard">
        <van-button class="submitBtn">添加</van-button>
      </div>
    </div>
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" @cancel="cancel" @confirm="confirm"></van-area>
    </van-popup>
    <van-popup v-model="bankListShow" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm"></van-picker>
    </van-popup>
  </div>
</template>

<script>
import areaList from "../../common/area.js";
import { mapMutations, mapGetters } from "vuex";
import { bindingBefore, bindingBank, sendSms } from "../../api";
export default {
  name: "BoundBankCard",
  data() {
    return {
      areaList,
      isReadOnly: false,
      areaShow: false,
      bankListShow: false,
      otherBankShow: false,
      user: {
        cardholder: "",
        binkId: "",
        bankName: "",
        area: "",
        cardNumber: "",
        coinPassword: "",
        reCoinPassword: "",
        mobile: "",
        verifyCode: ""
      },
      otherBankName: "",
      cardNumber: "",
      timer: null,
      AddBankWaitTime: 0,
      setCodeFlag: false
    };
  },
  created() {
    // this.$store.dispatch("getInitHome");

    if (this.myBank.length) {
      if (this.myBank.length >= 5) {
        return this.$router.push({ name: "user" });
      }
      this.user.cardholder = this.myBank[0].username;
      this.isReadOnly = true;
    }
    if (!this.allBankCardList) {
      this.getBankList();
    }
    if (localStorage.getItem("AddBankWaitTime")) {
      this.AddBankWaitTime = localStorage.getItem("AddBankWaitTime");
      if (this.AddBankWaitTime > 0) {
        this.times();
      }
    }
  },
  computed: {
    ...mapGetters(["myBank", "allBankCardList", "userInfo", "homeInfo"]),
    columns() {
      console.log(this.allBankCardList);
      let columns = [];
      for (let i = 0; i < this.allBankCardList.length; i++) {
        let item = this.allBankCardList[i];
        columns.push(item.name);
      }
      return columns;
    }
  },
  watch: {
    cardNumber(newVal) {
      this.cardNumber = newVal
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    "user.mobile": {
      handler(val) {
        console.log(val);
        if (val.length >= 11) {
          if (this.AddBankWaitTime <= 0) {
            this.setCodeFlag = true;
          } else {
            this.setCodeFlag = false;
          }
        } else {
          this.setCodeFlag = false;
        }
      }
    }
  },
  methods: {
    ...mapMutations(["SET_ALL_BANK_CARD"]),
    getBankList() {
      bindingBefore().then(res => {
        console.log(res, "银行卡列表");
        if (res.status) {
          this.SET_ALL_BANK_CARD(res.data);
        }
      });
    },
    confirm(val) {
      let area = "";
      for (let i = 0; i < val.length; i++) {
        let item = val[i];
        area += item.name + "/";
      }
      console.log(area);
      this.user.area = area.substr(0, area.length - 1);
      this.areaShow = false;
    },
    cancel() {
      this.areaShow = false;
    },
    onCancel() {
      this.bankListShow = false;
    },
    onConfirm(val, index) {
      this.user.bankName = val;
      this.user.bankId = this.allBankCardList[index].id;
      this.bankListShow = false;
      if (val === "其他") {
        this.otherBankShow = true;
      } else {
        this.otherBankShow = false;
      }
    },
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.AddBankWaitTime--;
        localStorage.setItem("AddBankWaitTime", this.AddBankWaitTime);
        if (this.AddBankWaitTime <= 0) {
          this.AddBankWaitTime = 0;
          clearInterval(this.timer);
          if (this.user.mobile.length >= 11) {
            this.setCodeFlag = true;
          } else {
            this.setCodeFlag = false;
          }
        }
      }, 1000);
    },
    getCode() {
      if (this.AddBankWaitTime > 0) {
        return false;
      }
      console.log(this.setCodeFlag, "this.setCodeFlag");
      if (!this.setCodeFlag) {
        return false;
      }
      if (!this.user.cardholder) {
        return this.$toast("请输入持卡人姓名");
      } else {
        if (!/^([\u4e00-\u9fa5]){2,7}$/.test(this.user.cardholder)) {
          return this.$toast("请输入正确的姓名");
        }
      }
      if (!this.cardNumber) {
        return this.$toast("请输入银行卡号");
      } else {
        this.cardNumber = this.cardNumber.replace(/\s*/g, "");
        if (!/\d{15}|\d{28}/.test(this.cardNumber)) {
          return this.$toast("请输入正确的银行卡号");
        }
      }
      if (!this.user.bankName) {
        return this.$toast("请选择开户银行");
      }
      if (this.user.bankName === "其他") {
        if (!this.otherBankName) {
          return this.$toast("请输入开户银行名称");
        } else {
          if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBankName)) {
            return this.$toast("请输入正确的开户银行名称");
          }
        }
      }
      if (!this.user.area) {
        return this.$toast("请选择开户地区");
      }

      if (!this.userInfo.coinPassword) {
        if (!this.user.coinPassword || !this.user.reCoinPassword) {
          return this.$toast("请设置提现密码");
        } else {
          if (this.user.coinPassword !== this.user.reCoinPassword) {
            return this.$toast("两次提现密码不同");
          }
        }
      }
      if (!this.user.mobile) {
        return this.$toast("请输入手机号码");
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.user.mobile)) {
          return this.$toast("请输入正确的手机号");
        }
      }
      this.AddBankWaitTime = 60;
      this.times();
      sendSms({ mobile: this.user.mobile }).then(res => {
        this.$toast(res.msg);
      });
    },
    bingBankCard() {
      if (!this.user.cardholder) {
        return this.$toast("请输入持卡人姓名");
      } else {
        if (!/^([\u4e00-\u9fa5]){2,7}$/.test(this.user.cardholder)) {
          return this.$toast("请输入正确的姓名");
        }
      }
      if (!this.cardNumber) {
        return this.$toast("请输入银行卡号");
      } else {
        this.cardNumber = this.cardNumber.replace(/\s*/g, "");
        if (!/\d{15}|\d{28}/.test(this.cardNumber)) {
          return this.$toast("请输入正确的银行卡号");
        }
      }
      if (!this.user.bankName) {
        return this.$toast("请选择开户银行");
      }
      if (this.user.bankName === "其他") {
        if (!this.otherBankName) {
          return this.$toast("请输入开户银行名称");
        } else {
          if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBankName)) {
            return this.$toast("请输入正确的开户银行名称");
          }
        }
      }
      if (!this.user.area) {
        return this.$toast("请选择开户地区");
      }
      if (!this.userInfo.coinPassword) {
        if (!this.user.coinPassword || !this.user.reCoinPassword) {
          return this.$toast("请设置提现密码");
        } else {
          if (this.user.coinPassword !== this.user.reCoinPassword) {
            return this.$toast("两次提现密码不同");
          }
        }
      }
      if (this.homeInfo.siteConfig.isOpenSms == 1) {
        if (!this.user.mobile) {
          return this.$toast("请输入手机号码");
        } else {
          if (!/^1[3456789]\d{9}$/.test(this.user.mobile)) {
            return this.$toast("请输入正确的手机号");
          }
        }
        if (!this.user.verifyCode) {
          return this.$toast("请输入短信验证码");
        }
      }
      if (this.otherBankName) {
        this.user.bankName = this.otherBankName;
      }
      this.user.cardNumber = this.cardNumber.replace(/\s*/g, "");
      console.log(this.user, "绑定银行卡数据---------------------------------");
      bindingBank(this.user).then(res => {
        if (res.status) {
          this.$router.go(-1);
          clearInterval(this.timer);
          this.timer = null;
          this.AddBankWaitTime = 0;
          this.$store.dispatch("getMyBank");
        } else {
          this.$toast(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.boundBankCard {
  .content {
    background-color: @BG;
    .list {
      margin-top: 30px;
      background-color: #fff;
      .selectBank {
        height: 100px;
        border-bottom: 1px solid #ebedf0;
        margin-left: 30px;
        display: flex;
        align-items: center;
        span {
          font-size: 28px;
          flex: 1;
          max-width: 90px; /*no*/
        }
        div {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          input {
            font-size: 28px;
            border: 0;
            width: 450px;
          }
          i {
            margin-right: 30px;
            font-size: 30px;
          }
        }
      }
      .van-cell.van-field {
        height: 100px;
        padding-left: 30px;
        font-size: 28px;
        align-items: center;
      }
      .sendCode {
        width: 100%;
        text-align: center;
        font-size: 27px;
        padding: 0 10px;
        color: #333;
        background-color: #eee;
        &.on {
          color: #fff;
          background-color: @ThemeColor;
        }
        &.wait {
          color: #333;
          background-color: #eee;
        }
        /*&::after {*/
        /*  content: '';*/
        /*  position: absolute;*/
        /*  width: 1px; !*no*!*/
        /*  height: 60px;*/
        /*  background-color: #d6d4d4;*/
        /*  left: -20px;*/
        /*  top: 10px;*/
        /*}*/
      }
    }
    > div {
      &:last-child {
        margin-top: 100px;
      }
    }
  }
}
</style>
