<template>
  <div class="transferIn flex" v-title="'转入余额宝'">
    <Header title="转入余额宝"></Header>
    <div class="content">
      <div class="depositMain">
        <dl class="rechargebox">
          <dd>
            <div class="item-input">
              <span class="itemTxt">转入金额</span>
              <div class="specialbox">
<!--                <input-->
<!--                  type="tel"-->
<!--                  placeholder="请输入100-5000000元"-->
<!--                  class="typeinput"-->
<!--                  v-model="transferIn.money"-->
<!--                >-->
                <van-field class="typeinput" ref="moneyInput" type="tel"
                           v-model="transferIn.money"
                           :placeholder="'请输入'+allConfig.cashMin+'-'+allConfig.cashMax+'元'" :border="false" clearable></van-field>
                <van-button class="all-take-out" :class="{disableBtn:!parseInt(userInfo.coin)}" @click="RemainingSum">
                  全部转入
                </van-button>
                <span class="remaining-sum-text">当前余额：{{ userInfo.coin }}元</span>
              </div>
            </div>
          </dd>
<!--          <dd>-->
<!--            <div class="item-input">-->
<!--              <span class="itemTxt">取款密码</span>-->
<!--              <div class="specialbox">-->
<!--                <input-->
<!--                  type="password"-->
<!--                  placeholder="请输入取款密码"-->
<!--                  class="typeinput"-->
<!--                  v-model="transferIn.coinPwd"-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
<!--          </dd>-->
        </dl>
        <van-button class="button" :class="{disableBtn:!transferIn.money}" @click="transFerIns">
          确认转入
        </van-button>
      </div>
    </div>
    <van-popup v-model="showPwdBoard" position="bottom">
      <div class="coinpwd">
        <div class="title">
          <i class="iconfont" @click="showPwdBoard=false">&#xe71a;</i>
          输入资金密码
        </div>
        <div class="middle">
          本次转入金额{{transferIn.money}}
        </div>
        <van-password-input
            :value="transferIn.coinPwd"
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
import { mapGetters } from "vuex";
import { transFerIn } from "../../api";
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
  name: "transferIn",
  data () {
    return {
      keyBoard,
      keyboardShow: false,
      showPwdBoard: false,
      transferIn: {
        money: "",
        coinPwd: ""
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "allConfig"])
  },
  methods: {
    RemainingSum () {
      this.transferIn.money = this.userInfo.coin;
    },
    transFerIns () {
      if (!this.transferIn.money) {
        return this.$toast("请输入转入金额");
      }
      if (this.transferIn.money < parseFloat(this.allConfig.cashMin)) {
        return this.$toast("金额不能低于" + this.allConfig.cashMin + "元");
      }
      if (this.transferIn.money > parseFloat(this.allConfig.cashMax)) {
        return this.$toast("金额不能高于" + this.allConfig.cashMax + "元");
      }
      this.showPwdBoard = true;

      // if (!this.transferIn.coinPwd) {
      //   return this.$toast("取款密码不能为空");
      // }
      // transFerIn(this.transferIn).then(res => {
      //   console.log(res);
      //   if(res.status) {
      //     setTimeout(() => {
      //       this.$router.push({name:'yuebaoHome'})
      //     }, 1000);
      //   }else {
      //     this.transferIn.coinPwd = ''
      //   }
      //   this.$toast(res.msg);
      // });
    },
    onPwdInput (key) {
      this.transferIn.coinPwd = (this.transferIn.coinPwd + key).slice(0, 6);
      if (this.transferIn.coinPwd.length >= 6) {
        this.showPwdBoard = false;
        transFerIn(this.transferIn).then(res => {
          console.log(res);
          if (res.status) {
            this.$store.dispatch("checkedLogin");
            this.transferIn.money = '';
            setTimeout(() => {
              this.$router.push({name: 'yuebaoHome'})
            }, 1000);
          } else {
            this.transferIn.coinPwd = ''
          }
          this.$toast(res.msg);
        });
      }
    },
    onPwdDelete () {
      this.transferIn.coinPwd = this.transferIn.coinPwd.slice(0, this.transferIn.coinPwd.length - 1);
    },
  },

};
</script>

<style scoped lang="less">
.transferIn {
  .content {
    background: #ececec;
    .depositMain {
      .item-input {
        padding: 15px;
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start;
        background: #fff;
        margin-top: 30px;
        .itemTxt {
          padding: 15px 0;
          width: 150px;
          font-size: 32px;
        }
        .specialbox {
          position: relative;
          width: calc(100% - 150px) !important;
          margin-right: 20px !important;
          .typeinput {
            padding-left: 10px;
            line-height: 68px;
            padding-top: 0;
            width: calc(100% - 130px);
            // border: 1px solid #ececec;
            border: 0;
            margin-top: 5px;
          }
          .all-take-out {
            position: absolute;
            width: 130px;
            height: 68px;
            line-height: 68px;
            text-align: center;
            font-size: 28px;
            top: 0;
            right: 0;
            background: @Amount-Out-Btn;
            color: #fff;
            border-radius: 5px;
          }
          .remaining-sum-text {
            font-size: 26px;
            color: @ThemeColor;
            white-space: nowrap;
          }
        }
      }
      .button {
        margin: 70px auto;
        display: block;
        width: 690px;
        height: 90px;
        background: @Amount-Right-Btn;
        border-radius: 90px;
        color: #fff;
        font-size: 38px;
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
