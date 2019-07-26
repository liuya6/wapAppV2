<template>
  <div class="withdraw flex" v-title="'提现'" @click.stop="keyboardShow = false">
    <div class="top">
      <span>提现</span>
      <i class="iconfont back" @click="goBack">&#xe629;</i>
      <b @click="$router.push({name:'withdrawrecord'})">提现记录</b>
    </div>
    <div class="content">
      <ul v-if="myBankCard" class="top" @click="changeBankCard">
        <li>
          <div>
            <img :src="myBankCard.logo" alt="银行卡图片" />
          </div>
          <div>
            {{myBankCard.bankname || myBankCard.oldBankName}}
          </div>
        </li>
        <li>
          <div>
            尾号{{ myBankCard.account.substr(myBankCard.account.length-4) }}储蓄卡
          </div>
          <i class="iconfont">&#xe727;</i>
        </li>
      </ul>
      <div v-else class="addbank" @click="$router.push({name:'addbankcard'})">
        <i class="iconfont">&#xe71f;</i>
        添加银行卡
      </div>
      <dl>
        <dt>提现金额</dt>
        <dd>
          <span>
            ￥
          </span>
          <van-field ref="moneyInput" type="tel" v-model="bankWithdraw.amount" placeholder="请输入提现金额" :border="false" clearable></van-field>
        </dd>
        <dd>
          <div>
            <span>可用金额</span>
            <span>{{userInfo.coin}}</span>
          </div>
          <p @click="allWithdraw">全部提现</p>
        </dd>
        <dd v-if="isNo">
          （您当前打码量不足，可能会导致提款失败,还差{{
          (userInfo.cashCodeAmount - userInfo.codeAmount).toFixed(2)
          }}元）
        </dd>
      </dl>
      <van-button class="withdrawBtn" :class="{disableBtn:!bankWithdraw.amount}" @click="withdraw">
        提现
      </van-button>
      <div class="note">
        <h1>温馨提示</h1>
        <p>提现金额只能从主钱包余额提出，单笔提现最低{{allConfig.cashMin}}元最高{{allConfig.cashMax}}元</p>
      </div>
    </div>
    <van-popup v-model="showPwdBoard" position="bottom">
      <div class="coinpwd">
        <div class="title">
          <i class="iconfont" @click="showPwdBoard=false">&#xe71a;</i>
          输入资金密码
        </div>
        <div class="middle">
          本次可提现金额{{userInfo.coin}}
        </div>
        <van-password-input
            :value="bankWithdraw.coinpwd"
        />
        <dl class="key">
          <dt class="iconfont" @click="onPwdDelete">&#xe714;</dt>
          <dd v-for="(item,i) in keyBoard" :key="i" :class="item.num===0?'zero':(item.num===1?'one':'')" @click="onPwdInput(item.num)">
            <van-button>
              <span>{{item.num}}</span>
              <p>{{item.pinyin}}</p>
            </van-button>
          </dd>
        </dl>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import { withdrawMoney } from "../../api";
const keyBoard = [
  {num:'1',pinyin:''},
  {num:'2',pinyin:'ABC'},
  {num:'3',pinyin:'DEF'},
  {num:'4',pinyin:'GHI'},
  {num:'5',pinyin:'JKL'},
  {num:'6',pinyin:'MNO'},
  {num:'7',pinyin:'PQRS'},
  {num:'8',pinyin:'TUV'},
  {num:'9',pinyin:'WXYZ'},
  {num:"0",pinyin:''},
];
export default {
  name: "Withdraw",
  data() {
    return {
      keyBoard,
      keyboardShow: false,
      showPwdBoard: false,
      bankWithdraw: {
        coinpwd: "",
        amount: '',
        bankId: ''
      },
      isNo: ""
    }
  },
  created() {
    this.getMyBank();
    // if(!this.myBank.length) {
    // }
    this.$nextTick(()=>{
      this.$refs.moneyInput.focus();
    });
    this.isNo =
      this.userInfo.cashCodeAmount - this.userInfo.codeAmount > 0
        ? true
        : false;
  },
  computed:{
    ...mapGetters(['userInfo','myBank','allConfig','bankCardId']),
    myBankCard() {
      for (let i = 0; i < this.myBank.length; i++) {
        let item = this.myBank[i];
        if (item.id == this.bankCardId) {
          return item;
        }
      }
      return false;
    },
  },
  methods: {
    ...mapActions(['getMyBank']),
    withdraw() {
      if(!this.myBank.length) {
        return this.$toast("请先添加银行卡")
      }
      console.log(this.userInfo.coin,this.bankWithdraw.amount);
      if(!this.bankWithdraw.amount) {
        return this.$toast('请输入提现金额');
      }
      if (this.userInfo.coin <= 0) {
        return this.$toast("账户余额为空");
      }
      if (parseInt(this.userInfo.coin) < parseInt(this.bankWithdraw.amount)) {
        return this.$toast("账户余额不足");
      }
      if(this.allConfig.cashMin && this.bankWithdraw.amount < parseFloat(this.allConfig.cashMin)){
        return this.$toast('不得低于最小金额');
      }
      if (this.allConfig.cashMax && this.bankWithdraw.amount > parseFloat(this.allConfig.cashMax)) {
        return this.$toast("不得高于最大金额");
      }
      this.bankWithdraw.coinpwd = '';
      this.showPwdBoard = true;
    },
    allWithdraw() {
      this.bankWithdraw.amount = Math.abs(this.userInfo.coin)+'';
    },
    onInput(val) {
      console.log(val);
      if(this.bankWithdraw.amount.length<=6){
        this.bankWithdraw.amount+=val
      }
    },
    onDelete() {
      this.bankWithdraw.amount=this.bankWithdraw.amount.substring(0,this.bankWithdraw.amount.length-1,1)
    },
    onPwdInput(key) {
      this.bankWithdraw.coinpwd = (this.bankWithdraw.coinpwd + key).slice(0, 6);
      if(this.bankWithdraw.coinpwd.length>=6) {
        this.showPwdBoard = false;
        this.bankWithdraw.bankId = this.bankCardId;
        console.log(this.bankWithdraw,'提现数据','交易密码',this.bankWithdraw.coinpwd);
        withdrawMoney(this.bankWithdraw).then(res=>{
          this.$toast(res.msg);
          if(res.status){
            this.$store.dispatch("checkedLogin");
            this.bankWithdraw.amount = "";
          }
        })
      }
    },
    onPwdDelete() {
      this.bankWithdraw.coinpwd = this.bankWithdraw.coinpwd.slice(0, this.bankWithdraw.coinpwd.length - 1);
    },
    changeBankCard() {
      this.$router.push({name:'selectbankcard'})
    },
    goBack() {
      this.$router.push({name:'user'})
    }
  }
}
</script>
<style scoped lang="less">
.withdraw {
  >.top {
    width: 100%;
    height: 100px;
    overflow: hidden;
    text-align: center;
    position: relative;
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
    b {
      position: absolute;
      right: 20px;
      font-weight: normal;
      font-size: 30px;
      padding-top: 30px;
    }
  }
  .content {
    background-color: @BG;
    .addbank {
      height: 120px;
      background-color: #fff;
      margin: 30px 0;
      font-size: 30px;
      text-align: center;
      line-height: 120px;
      color: @Forget-Pwd-Color;
      i {
        font-size: 30px;
        color: @Forget-Pwd-Color;
      }
    }
    .top {
      display: flex;
      align-items: center;
      height: 120px;
      background-color: #fff;
      margin: 30px 0;
      justify-content: space-between;
      li{
        display: flex;
        align-items: center;
        div {
          float: left;
        }
        &:first-child{
          div {
            &:first-child {
              width: 70px;
              height: 70px;
              line-height: 70px;
              margin: 0 30px;
              img {
                width: 100%;
                display: inline-block;
                vertical-align: middle;
              }
            }
            &:nth-child(2) {
              font-size: 32px;
            }
          }
        }
        &:last-child {
          div {
            font-size: 24px;
            color:@Bill-Font-Color-Pale
          }
          i{
            font-size: 40px;
            color:@Bill-Font-Color-Pale;
            margin: 0 30px 0 5px;
          }
        }
      }
    }
    dl {
      background-color: #fff;
      padding: 30px 30px 0 30px;
      dt {
        font-size: 28px;
        color: @Bill-Font-Color-Pale;
        margin-bottom: 30px;
      }
      dd {
        &:last-child {
          line-height: 60px;
          color: @ThemeColor;
          font-size: 23px;
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
        &:nth-child(2){
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .borderBtm();
          height: 108px;
          line-height: 108px;
          .van-cell {
            font-size: 40px;
            &:not(:last-child)::after {
              border: 0;
            }
          }
          span {
            &:first-child{
              font-size: 62px;
            }
            &:nth-child(2) {
              display: inline-block;
              width: 580px;
              height: 60px;
              line-height: 60px;
              font-size: 50px;
            }
          }
        }
        &:nth-child(3) {
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            font-size: 28px;
            span {
              &:first-child {
                color: @Bill-Font-Color-Pale;
                margin-right: 25px;
              }
            }
          }
          p{
            font-size: 28px;
            color: @Forget-Pwd-Color;
          }
        }
      }
    }
    .withdrawBtn{
      margin: 70px auto;
      display: block;
      width: 690px;
      height: 90px;
      background: @Amount-Right-Btn;
      border-radius: 90px;
      color: #fff;
      font-size: 38px;
    }
    .note {
      padding-left: 30px;
      font-size: 26px;
      h1 {
        color: @ThemeColor;
        margin-bottom: 15px;
      }
      p {
        line-height: 54px;
        color: @Bill-Font-Color-Pale;
      }
    }
  }
  .coinpwd {
    width: 100%;
    .title {
      text-align: center;
      font-size: 38px;
      height: 100px;
      line-height: 100px;
      color: @Bill-Font-Color;
      .borderBtm();
      i{
        position: absolute;
        font-size: 30px;
        left: 30px;
        color: @Bill-Font-Color;
      }
    }
    .middle {
      font-size: 28px;
      color: @Bill-Font-Color;
      text-align: center;
      margin: 40px auto 30px;
    }
    .key {
      background-color: #cfd3dc;
      margin-top: 82px;
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
  }
}
</style>
