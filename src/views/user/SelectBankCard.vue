<template>
  <div class="selectbankcard flex" v-title="'选择银行卡'">
    <Header title="选择银行卡" rightI="&#xe71f;" rightTo="/bankcard"></Header>
    <div class="content">
      <ul>
        <li v-for="(item,i) in myBank" :key="i" @click="changeBank(item.id)">
          <div>
            <img :src="item.logo" alt>
          </div>
          <div>
            <p>{{ item.bankname || item.oldBankName}}</p>
            <span>尾号{{item.account.substr(item.account.length-4)}}储蓄卡</span>
          </div>
          <i class="iconfont" v-show="bankCardId===item.id">&#xe71c;</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "SelectBankCard",
  data() {
    return {
      urlStr: ""
    };
  },
  created() {
    this.getMyBank();
    // if (!this.myBank.length) {
    // }
    this.urlStr = this.$route.params.path;
  },
  computed: {
    ...mapGetters(["myBank", "bankCardId"])
  },
  methods: {
    ...mapActions(["getMyBank"]),
    ...mapMutations(["SET_MY_BANK", "SET_BANK_ID"]),
    changeBank(id) {
      this.SET_BANK_ID(id);
      if (this.urlStr != "transferOut") {
        this.$router.push({ name: "withdraw" });
      }else{
        this.$router.push({ name: "transferOut",params:{ path: "bank" } });
      }
    }
  }
};
</script>

<style scoped lang="less">
.selectbankcard {
  .content {
    background-color: @BG;
    ul {
      margin-top: 20px;
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        height: 120px;
        div {
          &:first-child {
            width: 70px;
            height: 70px;
            line-height: 70px;
            margin-left: 30px;
            margin-right: 20px;
            img {
              width: 100%;
              vertical-align: middle;
              display: inline-block;
            }
          }
          &:nth-child(2) {
            p {
              font-size: 32px;
            }
            span {
              color: @Bill-Font-Color-Pale;
            }
          }
        }
        i {
          position: absolute;
          right: 50px;
          color: @ThemeColor;
          font-size: 40px;
        }
      }
    }
  }
}
</style>
