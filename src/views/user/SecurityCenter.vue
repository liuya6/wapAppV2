<template>
  <div class="securityCenter flex" v-title="'安全中心'">
    <div class="top">
      <Header title="安全中心" rightI="&#xe6da;" rightTo="/service" color="#fff"></Header>
      <div class="grade radius">
        <img :src="require('../../assets/images/safety.png')" alt />
        <p>安全等级：{{userInfo.safe}}</p>
        <div>{{ userInfo.safeMsg }}</div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li class="radius" v-for="(item, i) in list" :key="i" @click="routerPush(item.to)">
          <div class="circle flexC">
            <i class="iconfont" v-html="item.i"></i>
          </div>
          <div class="flexB">
            <div>
              <p>{{item.title}}</p>
              <div>{{item.tip}}</div>
            </div>
            <div class="flexC">
              <span
                :class="{active:!userInfo[item.ifSet]}"
              >{{ifSet(userInfo[item.ifSet],item.title)}}</span>
              <i class="iconfont rotate">&#xe629;</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "securityCenter",
  data() {
    return {
      grade: "",
      list: [
        {
          i: "&#xe6fc;",
          title: "登录密码",
          tip: "建议字母和数字组合",
          ifSet: "password",
          to: "modifyPwd"
        },
        // {
        //   i: "&#xe6fd;",
        //   title: "绑定取款人姓名",
        //   tip: "请输入真实的取款人姓名",
        //   ifSet: 'name',
        //   to: "payeeName"
        // },
        {
          i: "&#xe6ff;",
          title: "资金密码",
          tip: "设置资金密码，提高资金操作安全性",
          ifSet: "coinPassword",
          to: "fundPwd"
        },
        {
          i: "&#xe6fa;",
          title: "绑定银行卡",
          tip: "请使用真实的银行卡",
          ifSet: "bankNum",
          to: "bankcard"
        },
        // {
        //   i: "&#xe6fb;",
        //   title: "绑定邮箱",
        //   tip: "忘记密码会发送到绑定邮箱",
        //   ifSet: false,
        //   to: "bindEmail"
        // },
        {
          i: "&#xe6fe;",
          title: "手机验证",
          tip: "手机验证",
          ifSet: "mobile",
          to: "verifyPhone"
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("getInitHome");
    console.log(this.userInfo, "userInfo");
    if (this.homeInfo.siteConfig.isOpenSms != 1) {
      this.list.pop();
    }
    let num = 0;
    this.list.forEach(item => {
      if (item.ifSet) {
        num++;
      }
    });
    if (num > 3) {
      this.grade = "高";
    } else {
      this.grade = "低";
    }
  },
  computed: {
    ...mapGetters(["userInfo", "homeInfo"])
  },
  methods: {
    routerPush(to) {
      if (to === "fundPwd") {
        if (!this.userInfo.coinPassword) {
          return this.$toast("请先绑定银行卡噢");
        }
      }
      if (to === "verifyPhone") {
        if (this.userInfo.mobile) {
          return this.$toast("你已经绑定过手机号了噢");
        }
      }
      this.$router.push({ name: to });
    },
    ifSet(ifSet, title) {
      if (title == "登录密码" || title == "资金密码") {
        if (ifSet) {
          return "已设置";
        } else {
          return "未设置";
        }
      } else if (
        title == "绑定取款人姓名" ||
        title == "绑定银行卡" ||
        title == "绑定邮箱"
      ) {
        if (ifSet) {
          return "已绑定";
        } else {
          return "未绑定";
        }
      } else {
        if (ifSet) {
          return "已验证";
        } else {
          return "未验证";
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.securityCenter {
  background: @BG;
  .top {
    background: @User-Bg;
    background-size: 100% 71%;
    width: 100%;
    height: 400px;
    .grade {
      margin-top: 56px;
      padding: 48px 160px 40px 114px;
      margin-left: 111px;
      background: #fff;
      width: 334px;
      position: relative;
      img {
        width: 146px;
        height: 146px;
        position: absolute;
        left: -73px;
        top: -40px;
      }
      p {
        font-size: 32px;
        margin-bottom: 20px;
      }
      div {
        font-size: 24px;
        color: #aeaeae;
      }
    }
  }
  ul {
    li {
      display: flex;
      align-items: center;
      width: 690px;
      height: 150px;
      margin-left: 30px;
      background: #fff;
      margin-bottom: 30px;
      .circle {
        width: 72px;
        height: 72px;
        background: @ThemeColor;
        border-radius: 50%;
        margin: 0 28px;
        i {
          font-size: 70px;
          color: #fff;
        }
      }
      .flexB {
        width: 532px;
        font-size: 24px;
        color: #aeaeae;
        p {
          font-size: 28px;
          color: #000000;
          margin-bottom: 20px;
        }
        i {
          font-size: 36px;
          color: #aeaeae;
          margin-left: 12px;
        }
      }
      .active {
        color: @ThemeColor;
      }
    }
  }
}
</style>
