<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .headerBox {
    border-bottom: 1px solid #f0f0f0; /*no*/
  }

  .content {
    flex: 1;
    overflow-y: scroll;
    .laji {
      padding-top: 20px;
    }
    .cash-text,
    .cash-txt,
    .cash-list {
      background: #ffffff;
      border: 1px solid #f0f0f0; /*no*/
    }

    .cash-txt {
      border: 0;
    }

    .cash-text ul {
      margin: 0 10px;
    }

    .cash-text ul li,
    .cash-list ul li {
      border-bottom: 1px solid #f0f0f0;
      line-height: 80px;
      font-size: 30px;
    }

    .cash-text:nth-child(2) {
      border-left-width: 0;
      border-right-width: 0;
    }

    .cash-text ul li:last-child,
    .cash-list ul li:last-child {
      border-bottom: 0;
    }

    .cash-text ul li .text-left {
      float: left;
    }
    .cash-text .text-left {
      font-size: 30px;
      margin-left: 10px;
    }
    .ps {
      line-height: 40px;
      color: @ThemeColor;
      font-size: 80%;
      padding: 0 10px;
      margin-bottom: 10px;
    }
    .copy {
      vertical-align: top;
      height: 80px;
      line-height: 80px;
      margin: 0 20px;
      color: @Loss;
    }
    .info {
      padding: 20px;
      line-height: 56px;
      font-size: 28px;
      text-align: left;
    }

    .cash-txt h3 {
      font-size: 34px;
      text-align: left;
      text-indent: 20px;
      margin-top: 20px;
    }

    .cash-txt ul {
      overflow: hidden;
    }

    .cash-txt ul li {
      float: left;
      width: 33.33%;
      text-indent: 20px;
      text-align: left;
      font-size: 30px;
      padding: 10px 0;
      color: #999999;
      white-space: nowrap;
    }
    .ThemeColor {
      color: @ThemeColor;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'我的推广'">
    <Header title="我的推广"></Header>
    <div class="content">
      <div class="sub_ScorllCont">
        <div class="cash-text" style="border:0">
          <ul>
            <li>
              <div style="overflow: hidden"><span class="text-left">我的推荐码：{{ userInfo.uid }}</span></div>
              <div>
                <span class="text-left ">
                   我的推荐网址：<span>{{txUrl}}</span>
                   <van-button class="copy"
                               v-clipboard:copy="txUrl"
                               v-clipboard:success="onCopy"
                               v-clipboard:error="onError"
                   >[复制]</van-button>
                </span>
              </div>
              <div class="ps">
                您可以复制推荐网址给您的好友赚取更多丰厚收益
              </div>
            </li>
          </ul>
        </div>
        <div class="cash-text">
          <div class="text-left laji">
            <span class="text-left">本月推荐收益：</span>
            <span class="ThemeColor">{{ mySpread }}</span>
          </div>
          <div class="info">
            说明：每天的7点更新收益，如3号7点，会计算2号0点-24点之间所有数据，然后增加您的收益。您的收益=推荐会员的有效投注额度总和
            ÷ 100 ×0.1(转换率),小数部份四舍五入! &nbsp;&nbsp;
            <span class="ThemeColor">(风险账号不参与收益计算)</span>
          </div>
        </div>
        <div class="cash-txt">
          <h3>
            我的推荐会员(共计
            <span>{{ memberCount }}</span
            >位)：
          </h3>
          <ul>
            <li v-for="(item, i) in memberList" :key="i">
              <span>{{ item.username }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { spread } from "../../api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      memberCount: 0,
      memberList: [],
      mySpread: 0
    };
  },
  computed: {
    ...mapGetters([
      "userInfo"
    ]),
    txUrl() {
      console.log(window.location);
      return window.location.origin+'/register/'+this.userInfo.uid
    }
  },
  created() {
    this.getSpread();
  },
  methods: {
    getSpread() {
      spread().then(res => {
        this.memberCount = res.data.num;
        this.memberList = res.data.child;
        this.mySpread = res.data.money;
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
  }
};
</script>
