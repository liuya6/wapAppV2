<template>
  <div class="transferOut flex" v-title="'转出'">
    <Header title="转出" :isSlot="true">
      <i class="iconfont back" @click="goBack">&#xe629;</i>
    </Header>
    <div class="content">
      <div class="tabTitle">
        <div v-for="(item,i) in tabTitle" :key="i">
          <span :class="{'on':tabStatus===item.type}" @click="Tabs(item.type)">{{item.title}}</span>
        </div>
      </div>
      <div v-if="tabStatus=='balance'" class="balance">
        <div class="paytype">
          <span style="line-height: 30px;">转出金额(￥)</span>
          <i class="iconfont">&#xe727;</i>
          <span class="paybankName" @click="showTabList" ref="paybankName">{{this.totals}}</span>
        </div>
<!--        <div class="item-input">-->
<!--          <span class="itemTxt">取款密码</span>-->
<!--          <div class="specialbox">-->
<!--            <input-->
<!--              type="password"-->
<!--              class="typeinput"-->
<!--              placeholder="请输入取款密码"-->
<!--              v-model="parameter.coinPwd"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
        <van-button class="button" :class="{disableBtn:!parameter.yuIds}" @click="Goout">
          确认转出
        </van-button>
      </div>
      <div v-if="tabStatus=='bank'" class="balance">
        <div class="paytype">
          <span style="line-height: 30px;">转出金额(￥)</span>
          <i class="iconfont">&#xe727;</i>
          <span class="paybankName" @click="showTabList" ref="paybankName">{{this.totals}}</span>
        </div>
        <ul v-if="myBankCard" class="top" @click="changeBankCard">
          <li>
            <div>
              <img :src="myBankCard.logo" alt="银行卡图片" />
            </div>
            <div>{{myBankCard.bankname || myBankCard.oldBankName}}</div>
          </li>
          <li>
            <div>尾号{{ myBankCard.account.substr(myBankCard.account.length-4) }}储蓄卡</div>
            <i class="iconfont">&#xe727;</i>
          </li>
        </ul>
        <div v-else class="addbank" @click="$router.push({name:'addbankcard'})">
          <i class="iconfont">&#xe71f;</i>
          添加银行卡
        </div>
<!--        <div class="item-input">-->
<!--          <span class="itemTxt">取款密码</span>-->
<!--          <div class="specialbox">-->
<!--            <input-->
<!--              type="password"-->
<!--              class="typeinput"-->
<!--              placeholder="请输入取款密码"-->
<!--              v-model="parameter.coinPwd"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
        <van-button class="button" :class="{disableBtn:!parameter.yuIds}" @click="Goout">
          确认转出
        </van-button>
      </div>
      <van-popup v-model="popupShow" class="popup" position="bottom">
        <h1>
          选择转出金额
          <span @click="complete">完成</span>
        </h1>
        <ul>
          <li
            class="totalEarnings"
            v-for="(item,index) in RecordData"
            :key="index"
            :title="item.id"
          >
            <span>总本金:{{item.money}}</span>
            <span>当前收益:{{item.profit}}</span>
            <van-checkbox v-model="item.checked"></van-checkbox>
          </li>
        </ul>
      </van-popup>
    </div>
    <van-popup v-model="showPwdBoard" position="bottom">
      <div class="coinpwd">
        <div class="title">
          <i class="iconfont" @click="showPwdBoard=false">&#xe71a;</i>
          输入资金密码
        </div>
        <div class="middle">
          本次转出金额{{totals}}
        </div>
        <van-password-input
            :value="parameter.coinPwd"
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import { yuebaoRecord, transferOut } from "../../api";
// import { close } from "fs";
const tabTitle = [
  { title: "转出至账户余额", type: "balance" },
  { title: "转出至银行卡", type: "bank" }
];
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
  name: "transferOut",
  data() {
    return {
      tabTitle,
      // activeType: "balance",
      popupShow: false,
      checked: false,
      total: 0,
      totals: "请选择转出金额",
      Ids: [],
      RecordData: [],
      RecordDatas: [],
      urlStr: {
        status: 0
      },
      parameter: {
        yuIds: "",
        bankId: "",
        coinPwd: ""
      },
      keyBoard,
      keyboardShow: false,
      showPwdBoard: false,
    };
  },
  created() {
    // this.activeType = this.tabStatus;
    console.log(this.tabStatus,this.parameter,"777777777777777777");
    if (!this.myBank.length) {
      this.getMyBank();
    }
    this.yuebaoRecords();
  },
  methods: {
    ...mapMutations(["SET_MY_BANK", "SET_TAB_ID", "SET_BOX_SUM"]),
    ...mapActions(["getMyBank"]),
    Tabs(type) {
      this.SET_TAB_ID(type);
      // if (this.tabStatus == "bank") {
      //   this.SET_TAB_ID("balance");
      // } else {
      //   this.SET_TAB_ID("bank");
      // }
    },
    yuebaoRecords() {
      this.totals = 0;
      yuebaoRecord(this.urlStr).then(res => {
        // for (let item in res.data) {
        //   if (this.boxSum.indexOf(res.data[item].id) >= 0) {
        //     res.data[item].checked = true;
        //     this.total =
        //       parseFloat(res.data[item].money) +
        //       parseFloat(res.data[item].profit);
        //     this.totals = this.totals + this.total;
        //   } else {
        //     res.data[item].checked = false;
        //   }
        // }
        res.data.forEach(element => {
          if (element.status == 1 || element.status == 2) {
            this.RecordData.push(element);
          }
        });
        this.complete();
        console.log(this.RecordData,this.totals, "账单数据-------------------------");
      });
    },
    complete() {
      this.SET_BOX_SUM([]);
      this.Ids = [];
      this.parameter.yuIds = "";
      this.totals = 0;
      for (let item in this.RecordData) {
        if (this.RecordData[item].checked) {
          this.Ids.push(this.RecordData[item].id);
          this.total =
            parseFloat(this.RecordData[item].money) +
            parseFloat(this.RecordData[item].profit);
          this.totals = this.totals + this.total;
        }
      }
      this.parameter.yuIds = this.Ids.join(",");
      this.popupShow = false;
      this.SET_BOX_SUM(this.Ids);
      console.log(this.totals,"111111111111111111");
      if (this.totals != 0) {
        this.totals = this.totals.toFixed(3);
      } else {
        this.totals = "请选择转出金额";
      }
      console.log(this.totals);
    },
    Goout() {
      // if (!this.parameter.yuIds) {
      //   return this.$toast("请选择转出金额");
      // }
      // if (!this.parameter.coinPwd) {
      //   return this.$toast("取款密码不能为空");
      // } else {
      //   transferOut(this.parameter).then(res => {
      //     if ((res.msg = 1)) {
      //       setTimeout(() => {
      //         this.$router.push({ name: "yuebaoHome" });
      //       }, 1000);
      //       return this.$toast("转出成功");
      //     } else {
      //       this.$toast(res.msg);
      //     }
      //   });
      // }
      console.log(this.parameter,this.tabStatus);
      if(this.tabStatus === "balance") {
        this.parameter.bankId = "";
        if (!this.parameter.yuIds) {
          return this.$toast("请选择转出金额");
        }
      }else {
        this.parameter.bankId = this.bankCardId;
        if (!this.parameter.yuIds) {
          return this.$toast("请选择转出金额");
        }
        if (!this.parameter.bankId) {
          return this.$toast("请选择银行卡或添加银行卡");
        }
      }
      this.parameter.coinPwd = '';
      this.showPwdBoard = true;
    },
    // GoBankout() {
    //   this.parameter.bankId = this.bankCardId;
    //   if (!this.parameter.yuIds) {
    //     return this.$toast("请选择转出金额");
    //   }
    //   if (!this.parameter.coinPwd) {
    //     return this.$toast("取款密码不能为空");
    //   }
    //   if (!this.parameter.bankId) {
    //     return this.$toast("请选择银行卡或添加银行卡");
    //   } else {
    //     transferOut(this.parameter).then(res => {
    //       if ((res.msg = 1)) {
    //         setTimeout(() => {
    //           this.$router.push({ name: "yuebaoHome" });
    //         }, 1000);
    //         return this.$toast("转出成功");
    //       } else {
    //         this.$toast(res.msg);
    //       }
    //     });
    //   }
    // },
    onPwdInput(key) {
      this.parameter.coinPwd = (this.parameter.coinPwd + key).slice(0, 6);
      if(this.parameter.coinPwd.length>=6) {
        this.showPwdBoard = false;
        transferOut(this.parameter).then(res => {
          console.log(res);
          if(res.status) {
            this.$store.dispatch("checkedLogin");
            setTimeout(() => {
              this.$router.push({name:'yuebaoHome'})
            }, 1000);
          }else {
            this.parameter.coinPwd = ''
          }
          this.$toast(res.msg);
        });
      }
    },
    onPwdDelete() {
      this.parameter.coinPwd = this.parameter.coinPwd.slice(0, this.parameter.coinPwd.length - 1);
    },
    showTabList() {
      console.log(this.RecordData);
      if(this.RecordData.length) {
        this.popupShow = true;
      }else {
        this.$toast("您的余额宝余额是空的噢")
      }
    },
    changeBankCard() {
      this.$router.push({
        name: "selectbankcard",
        params: { path: "transferOut" }
      });
    },
    goBack() {
      this.$router.push({name:"yuebaoHome"})
    }
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "myBank",
      "allConfig",
      "bankCardId",
      "tabStatus",
      "boxSum"
    ]),
    myBankCard() {
      for (let i = 0; i < this.myBank.length; i++) {
        let item = this.myBank[i];
        if (item.id == this.bankCardId) {
          return item;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped lang="less">
.transferOut {
  .headerBox {
    border-bottom: 1px solid #f0f0f0; /*no*/
  }
  .content {
    background-color: #ececec;
    .tabTitle {
      overflow: hidden;
      height: 100px;
      display: flex;
      align-items: center;
      background-color: #fff;
      div {
        float: left;
        width: 50%;
        text-align: center;
        span {
          font-size: 32px;
          display: block;
          width: 100%;
          height: 95px;
          line-height: 95px;
          border-bottom: 5px solid #fff;
        }
        .on {
          color: #fea24d;
          border-bottom: 5px solid #fea24d;
          height: 95px;
        }
      }
    }
    .balance {
      .paytype {
        background-color: #fff;
        margin-top: 20px;
        padding: 20px 30px;
        height: 55px;
        line-height: 55px;
        font-size: 32px;
        color: #343434;
        .paybankName {
          float: right;
          color: #aaa;
        }
        .iconfont {
          float: right;
          font-size: 38px;
          margin-left: 10px;
          color: #aaa;
        }
      }
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
            border: 1px solid #ececec;
          }
          .remaining-sum-text {
            font-size: 26px;
            color: #f9ac53;
            white-space: nowrap;
          }
        }
      }
      .top {
        display: flex;
        align-items: center;
        height: 120px;
        background-color: #fff;
        margin: 30px 0;
        justify-content: space-between;
        li {
          display: flex;
          align-items: center;
          div {
            float: left;
          }
          &:first-child {
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
              color: @Bill-Font-Color-Pale;
            }
            i {
              font-size: 40px;
              color: @Bill-Font-Color-Pale;
              margin: 0 30px 0 5px;
            }
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
  }
  .popup {
    h1 {
      color: #387ef5;
      border-bottom: 1px solid #ececec;
      background: #dcdcdc;
      padding: 20px;
      font-size: 32px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      span {
        float: right;
        color: #387ef5;
      }
    }
    ul {
      li {
        border-bottom: 1px solid #ddd;
        padding-left: 20px;
        padding-right: 20px;
        height: 84px;
        line-height: 84px;
        span {
          display: block;
          float: left;
          font-size: 30px;
          width: calc((100% - 50px) / 2);
        }
        span:nth-child(2) {
          color: #f98628;
        }
      }
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
</style>
