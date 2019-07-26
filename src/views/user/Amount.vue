<template>
  <div class="amount flex" v-title="'额度转换'" @click.stop="keyboardShow = false">
    <Header title="额度转换" color="#fff"></Header>
    <div class="content">
      <div class='top'>
        <div>
          <span>主钱包余额</span>
          <van-button @click="returnHome">
            一键归户
          </van-button>
        </div>
        <p>{{userInfo.coin}}</p>
      </div>
      <ul>
        <li v-for="(item,i) in thirdGameList" :key="i">
          <div>
            <img :src="imgUrl(item.img)" />
          </div>
          <div>
            {{ item.name }}
          </div>
          <div>
            {{moneyList[i]}}
          </div>
          <div>
            <van-button @click.stop="confirm(2,item.name,item.typeKey,i,moneyList[i])">
              转入
            </van-button>
          </div>
          <div>
            <van-button @click.stop="confirm(1,item.name,item.typeKey,i)">
              转出
            </van-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="popup">
      <van-popup v-model="show" position="top" :overlay="true">
        <h1>
          转{{parameter.type===1?'出':'入'}}账户
        </h1>
        <p>
          {{parameter.type===2?'主钱包余额':gameTitle}}
        </p>
        <h1>
          转{{parameter.type===1?'出':'入'}}金额/￥
        </h1>
        <p>
<!--          <span class="money" @click.stop="keyboardShow = true">{{ parameter.money }}</span>-->
          <van-field ref="moneyInput" type="tel" v-model="parameter.money" :placeholder="'请输入转'+(parameter.type===1?'出':'入')+'金额'" :border="false" clearable></van-field>
          <span @click="parameter.money = allMoney">全部转{{parameter.type===1?'出':'入'}}</span>
        </p>
        <div>
          <span v-for="(item,i) in List"
                :key="i"
                :class="{'on':item.id===moneyId}"
                @click="[moneyId=item.id,parameter.money=item.money]"
          >{{'￥'+item.money}}</span>
        </div>
        <div>
          <van-button @click="show=false">
            取消
          </van-button>
          <van-button :class="parameter.type===1?'out':'transfer'" @click="transfer">
            确认转{{parameter.type===1?'出':'入'}}
          </van-button>
        </div>
      </van-popup>
<!--      <van-number-keyboard-->
<!--          :show="keyboardShow"-->
<!--          extra-key="."-->
<!--          close-button-text="完成"-->
<!--          @input="onInput"-->
<!--          @delete="onDelete"-->
<!--      ></van-number-keyboard>-->
    </div>
  </div>
</template>

<script>
  import { thirdGameList,thirdMoney,exchangeAllToLottery,exchangeMoney } from "../../api";
  import { mapGetters,mapActions } from "vuex";
  const List = [
    { id:1,money: "500" },
    { id:2,money: "1000" },
    { id:3,money: "1500" },
    { id:4,money: "2000" }
  ];
  export default {
    name: "Amount",
    data(){
      return{
        List,
        show: false,
        moneyId: '',
        gameTitle: '',
        gameIndex: "",
        allMoney: '',
        parameter:{
          type: 1,// 1 转出,其他 转入
          apiKey: '',
          money: '0'
        },
        thirdGameList: {},
        moneyList: [],
        keyboardShow: false
      }
    },
    created () {
      this.getThirdGameList()
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'checkedLogin'
      ]),
      onInput(val) {
        if(this.parameter.money.length<=6){
          this.parameter.money+=val
        }
      },
      onDelete() {
        this.parameter.money=this.parameter.money.substring(0,this.parameter.money.length-1,1)
      },
      getThirdGameList() {
        thirdGameList().then(res => {
          this.thirdGameList = res.data;
          console.log(res.data);
          this.initMoney();
        });
      },
      initMoney() {
        for (let i in this.thirdGameList) {
          let item = this.thirdGameList[i];
          this.moneyList[i] = "获取中...";
          thirdMoney({ type: item.typeKey })
            .then(res => {
              if (res.status) {
                this.moneyList.splice(
                  i,
                  1,
                  parseInt(res.data.money) == "0" ? "0.00" : res.data.money
                );
              } else {
                this.moneyList.splice(i, 1, "0.00");
              }
            })
            .catch(err => {
              console.warn(err);
              this.moneyList.splice(i, 1, "获取失败");
            });
        }
      },
      getThirdMoney(typekey) {
        console.log(typekey);
        thirdMoney({ type: typekey })
          .then(res => {
            if (res.status) {
              this.moneyList.splice(
                this.gameIndex,
                1,
                parseInt(res.data.money) == "0" ? "0.00" : res.data.money
              );
            } else {
              this.moneyList.splice(this.gameIndex, 1, "0.00");
            }
          })
          .catch(err => {
            console.warn(err);
            this.moneyList.splice(this.gameIndex, 1, "获取失败");
          });
      },
      returnHome() {
        exchangeAllToLottery().then(res => {
          if (res.status) {
            this.initMoney();
            this.checkedLogin();
          }
          this.$toast(res.msg);
        });
      },
      confirm(type,name,typeKey,index,allMoney) {
        console.log(this.$refs);
        this.parameter.type = type;
        this.parameter.apiKey = typeKey;
        this.parameter.money = "";
        this.moneyId = '';
        this.gameTitle = name;
        this.gameIndex = index;
        console.log(this.gameIndex,allMoney);
        if(type===1){
          this.allMoney = this.userInfo.coin
        }else {
          this.allMoney =allMoney
        }
        this.keyboardShow = true;
        this.show = true;
        this.$nextTick(() => {
          this.$refs.moneyInput.focus();
        });
      },
      transfer(){
        if(!this.parameter.money){
          return this.$toast('请输入金额');
        }
        exchangeMoney(this.parameter).then(res => {
          if (res.status) {
            this.getThirdMoney(this.parameter.apiKey);
            this.checkedLogin();
            this.show = false;
          }
          this.$toast(res.msg);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .amount {
    background: @Amount-bg @BG;
    background-size: 100%;
    .content {
      padding-bottom: 100px;
      .top {
        margin-top: 20px;
        div {
          padding: 0 30px;
          height: 46px;
          line-height: 46px;
          overflow: hidden;
          span {
            display: inline-block;
            vertical-align: middle;
            color: #fff;
            font-size: 28px;
          }
          .van-button {
            padding: 0;
            width: 134px;
            height: 46px;
            line-height: 46px;
            border-radius: 46px;
            background-color: #fff;
            text-align: center;
            float: right;
            span {
              color: @ThemeColor;
            }
          }
        }
        p {
          margin: 20px 0 40px 0;
          font-size: 72px;
          color: #ffffff;
          text-align: center;
        }
      }
      ul {
        width: 690px;
        margin: auto;
        background-color: #ffffff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        li{
          margin: 0 30px;
          height: 120px;
          line-height: 120px;
          overflow: hidden;
          .borderBtm();
          &:last-child {
            border-bottom: none;
          }
          >div{
            float: left;
            color: @FontColor-Foot;
            &:first-child{
              width: 54px;
              height: 54px;
              line-height: 54px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 15px;
              margin-top: 32px;
              overflow: hidden;
              border: 0;
              img {
                width: 100%;
                display: inline-block;
                vertical-align: middle;
              }
            }
            &:nth-child(2) {
              font-size: 26px;
              margin-left: 20px;
              width: 130px;
              overflow: hidden;
            }
            &:nth-child(3) {
              width: 190px;
              overflow: hidden;
              font-size: 30px;
              color: @Amount-Money-Color;
            }
            &:nth-child(4),&:nth-child(5) {
              .van-button {
                height: 44px;
                border-radius: 44px;
                color: #fff;
                font-size: 26px;
                margin-left: 10px;
                overflow: hidden;
                width: 100px;
                text-align: center;
              }
            }
            &:nth-child(4) {
              .van-button{
                background: @Amount-Left-Btn;
              }
            }
            &:nth-child(5) {
              .van-button{
                background: @Amount-Right-Btn;
              }
            }
          }
        }
      }
    }
    .popup {
      h1 {
        font-size: 30px;
        color: @FontColor-Foot;
        margin: 50px 30px 30px 30px;
      }
      p{
        margin: 0 30px;
        .borderBtm();
        padding-bottom: 20px;
        font-size: 34px;
        span {
          color: @Forget-Pwd-Color;
          font-size: 30px;
          float: right;
        }
        .van-cell {
          display: inline-block;
          width: 520px;
          height: 45px;
          color: red;
          font-size: 35px;
          padding: 0 0 0 20px;
        }
      }
      div {
        &:nth-child(5){
          margin: 30px 30px 60px 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          span {
            display: inline-block;
            width: 150px;
            height: 60px;
            line-height: 60px;
            color: @FontColor-Foot;
            border-radius: 60px;
            .borderAll();
            text-align: center;
            font-size: 30px;
            box-sizing: border-box;
          }
          .on {
            background-color: @ThemeColor;
            border: 0;
            color: #fff;
          }
        }
        &:last-child {
          margin: 0 30px 70px 30px;
          .van-button {
            height: 90px;
            line-height: 90px;
            border-radius: 45px;
            margin-right: 30px;
            font-size: 30px;
            color: #fff;
            &:first-child {
              width: 200px;
              background: @Amount-Close-Btn;
            }
            &:last-child {
              width: 455px;
              margin-right: 0;
            }
            &.transfer {
              background: @Amount-In-Btn;
            }
            &.out {
              background: @Amount-Out-Btn;
            }
          }
        }
      }
    }
  }
</style>
