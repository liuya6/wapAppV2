<template>
  <div class="bankCard flex" v-title="'我的银行卡'">
    <Header title='绑定银行卡'></Header>
    <div class="content">
      <ul v-if="myBank.length">
        <li v-for="(item,i) in myBank" :key="i" >
          <div>
            <div class="iconfont" v-html="item.icon" :class="{'qt':item.oldBankName === '其他'}">
<!--              <img :src="item.logo" alt="" />-->
            </div>
            <div>
              <h1>{{ item.bankname || item.oldBankName}}</h1>
              <span>储蓄卡</span>
            </div>
          </div>
          <p>{{ bankNum(item.account) }}</p>
        </li>

      </ul>
      <div class="addBankCard" @click="addBankCard">
        <i class="iconfont">&#xe71f;</i>
        <span>点击添加银行卡</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { mapMutations,mapActions } from "vuex"
  import { Dialog } from 'vant';
  export default {
    name: "BankCard",
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['userInfo','myBank'])
    },
    created() {
      // console.log(this.myBank,'myBank')
      this.getMyBank();
      // if(!this.myBank.length) {
      //   this.getMyBank();
      // }
    },
    methods: {
      ...mapMutations(['SET_MY_BANK']),
      ...mapActions(['getMyBank']),
      addBankCard() {
        if (this.myBank.length < 5) {
          this.$router.push({
            name: "addbankcard",
            query: { showWithdrawalFlag: "1" }
          });
        } else {
          Dialog.alert({
            title: "提示",
            message: "最多只能绑定5张银行卡哦！"
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
.bankCard {
  .content {
    background-color: @BG;
    ul {
      li{
        width: 690px;
        margin: 30px auto 0;
        background: url("../../assets/images/bank-bg.png") bottom no-repeat @ThemeColor;
        background-size: 100%;
        /*background: @Login-Btn-Bg;*/
        border-radius: 18px;
        overflow: hidden;
        height: 291px;
        >div {
          overflow: hidden;
          div {
            float: left;
            &:first-child {
              /*width: 58px;*/
              height: 90px;
              line-height: 90px;
              color: #fff;
              font-size: 120px;
              /*background-color: #fff;*/
              /*border-radius: 50%;*/
              padding: 5px;
              margin: 50px 15px 0 50px;
              text-align: center;
              /*img {*/
              /*  display: inline-block;*/
              /*  width: 100%;*/
              /*  vertical-align: middle;*/
              /*}*/
              &.qt {
                font-size: 105px;
                padding: 0 15px;
              }
            }
            &:nth-child(2) {
              overflow: hidden;
              margin-top: 50px;
              color: #fff;
              h1 {
                font-size: 38px;
              }
              span{
                display: inline-block;
                font-size: 28px;
                margin-top: 10px;
              }
            }
          }
        }
        p{
          overflow: hidden;
          text-align: center;
          font-size: 42px;
          letter-spacing: 10px;
          color: #fff;
          margin-top: 25px;
        }
      }
    }
    .addBankCard{
      width: 690px;
      margin: 30px auto;
      background: @Add-BankCard-Bg;
      text-align: center;
      color: #b9bfcb;
      border-radius: 18px;
      overflow: hidden;
      height: 291px;
      i{
        display: inline-block;
        font-size: 150px;
        margin-top: 40px;
      }
      span {
        display: block;
        margin-bottom: 70px;
        font-size: 24px;
      }
    }
  }
}
</style>
