<template>
  <div class="user flex" v-title="'个人中心'">
    <div class="content">
      <!--      <van-button class="edit" to="/set">-->
      <!--        <i class="iconfont">&#xe60c;</i>-->
      <!--        <span>编辑</span>-->
      <!--      </van-button>-->
      <div class="top">
        <div class="top-content" v-if="userInfo">
          <div v-if="hasTx" @click="[txChange = true,avatarId = '']">
            <ImgLoading :src="userInfo.avatar" />
          </div>
          <div v-else>
            <ImgLoading :src="require('../../assets/images/tx.png')" />
          </div>
          <div>
            <h5>
              <span>{{ userInfo.username }}</span>
              <span v-if="VipShow" @click="$router.push({name:'vip'})">{{userInfo.levelName}}</span>
            </h5>
            <p>
              <span>余额：</span>
              <span>{{ moneyShow?userInfo.coin:'****' }}</span>
              <i
                class="iconfont"
                :class="moneyShow?'mHide':'mShow'"
                @click="moneyShow=!moneyShow"
              >{{moneyShow?'&#xe722;':'&#xe723;'}}</i>
            </p>
          </div>
          <van-button class="guiHu" @click="returnHome">
            <span>一键归户</span>
          </van-button>
        </div>
      </div>
      <ul class="money">
        <li v-for="(item,i) in topList" :key="i">
          <van-button :class="item.type" :to="item.to">
            <i class="iconfont" v-html="item.icon"></i>
            <span>{{item.title}}</span>
          </van-button>
        </li>
      </ul>
      <div class="record">
        <div v-for="(item,i) in recordList" :key="i">
          <van-button :to="item.to" @click="shares(i)">
            <i class="iconfont" v-html="item.icon"></i>
            <span>{{item.title}}</span>
          </van-button>
        </div>
      </div>
      <div class="safety">
        <div v-for="(item,i) in safetyList" :key="i">
          <van-cell-group>
            <van-cell
              :title="item.title"
              :icon="item.icon"
              is-link
              center
              @click="goRouter(item.to)"
            >
              <i class="iconfont" v-html="item.icon"></i>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <div class="msg">
        <div v-for="(item,i) in msgList" :key="i">
          <van-cell-group>
            <van-cell :title="item.title" :icon="item.icon" is-link center :to="item.to">
              <i class="iconfont" v-html="item.icon"></i>
              <span v-if="item.to==='/notice/1' && userInfo.unread > 0" class="noticeNum">{{userInfo.unread}}</span>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <div class="loginOut">
        <van-button @click="LoginOut">
          <i class="iconfont">&#xe6db;</i>
          <span>退出登录</span>
        </van-button>
      </div>
    </div>
    <van-popup class="sharePopup" v-model="showShare" position="bottom">
      <div class="shareContent">
        <dl>
          <dd v-for="(item,i) in Share" :key="i" @click="goShare(item.type)">
            <div>
              <img :src="cdnImg(`find/${item.type}.png`)" alt />
            </div>
            <p>{{item.title}}</p>
          </dd>
        </dl>
        <div class="flexC" @click="showShare = false">取消分享</div>
      </div>
    </van-popup>
    <van-popup v-model="txChange" class="txPopup">
      <div>
        <div class="title">选择头像</div>
        <mt-swipe :auto="0" @change="handleChange" :show-indicators="false">
          <mt-swipe-item v-for="(item,i) in txList" :key="i">
            <ul>
              <li
                v-for="(child,j) in item"
                :key="j"
                :class="{on:avatarId==child.id}"
                @click="avatarId = child.id"
              >
                <ImgLoading :src="child.avatar" alt />
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
        <div class="page">{{current}}/{{txList.length}}</div>
        <div class="btn" @click="changeUserAvatar">
          <van-button>确定</van-button>
        </div>
      </div>
    </van-popup>
    <div v-if="registerPopup" class="registerWrap flexC">
      <div class="registerPopup">
        <i class="iconfont" @click="closePopup">&#xe753;</i>
        <div class="line"></div>
        <h1>恭喜您，注册成功!</h1>
        <h5>简单、方便、适合最好的你</h5>
        <div class="box flexS">
          <p>您的账号</p>
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="box flexS">
          <p>您的密码</p>
          <span>{{password}}</span>
        </div>
        <div class="box flexB">
          <p>
            您的余额
            <span>{{ userInfo.coin }}</span>
          </p>
          <p>元</p>
        </div>
        <div class="button flexC" @click="depositNow">立即存款</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Dialog, ImagePreview } from "vant";
import { loginOut, exchangeAllToLottery, modifyUser } from "../../api";
const topList = [
  { title: "转换", icon: "&#xe6ec;", type: "amount", to: "/amount" },
  { title: "充值", icon: "&#xe6f5;", type: "recharge", to: "/wallet" },
  { title: "提现", icon: "&#xe6f6;", type: "withdraw", to: "/withdraw" },
  { title: "账单", icon: "&#xe6f7;", type: "bill", to: "/bill" }
];
const recordList = [
  { title: "游戏记录", icon: "&#xe6d7;", type: "", to: "/record" },
  { title: "盈亏统计", icon: "&#xe6d2;", type: "", to: "/profitandloss" },
  { title: "分享好友", icon: "&#xe6f4;", type: "" }
];
const safetyList = [
  { title: "安全中心", icon: "&#xe6d8;", to: "/securityCenter" },
  { title: "我的推广", icon: "&#xe741;", to: "/myspread" },
  { title: "APP下载", icon: "&#xe6d9;", to: "/download" }
];
const msgList = [
  { title: "消息列表", icon: "&#xe6d4;", to: "/notice/1" },
  { title: "帮助中心", icon: "&#xe6ce;", to: "/help" },
  { title: "投诉建议", icon: "&#xe6d6;", to: "/suggestions" },
  { title: "关于我们", icon: "&#xe6d5;", to: "/aboutus" },
  { title: "在线客服", icon: "&#xe6da;", to: "/service" }
];
export default {
  name: "User",
  data() {
    return {
      topList,
      recordList,
      safetyList,
      msgList,
      Share: [
        { title: "微信", type: "weChat" },
        // { title: "朋友圈", type: "friends"},
        { title: "QQ", type: "qq" },
        { title: "微博", type: "weibo" },
        { title: "复制链接", type: "copy" }
      ],
      showShare: false,
      txChange: false,
      current: 1,
      avatarId: "",
      skip: "/api/common/appapi/appDownload",
      moneyShow: false,
      VipShow: true,
      registerPopup: false
    };
  },
  created() {
    console.log(this.userInfo);
    this.checkedLogin();
    if (
      this.userInfo.parentId == 312 ||
      this.allConfig.isWapUserLevel !== "1"
    ) {
      this.VipShow = false;
    } else {
      this.VipShow = true;
    }
    if (this.allConfig.enableTuijian !== "1") {
      this.safetyList = [
        { title: "安全中心", icon: "&#xe6d8;", to: "/securityCenter" },
        { title: "APP下载", icon: "&#xe6d9;", to: "/download" }
      ];
    }
    // console.log(this.userInfo.parentId, this.allConfig, "111111");
  },
  updated() {
    if (this.registerNow) {
      this.registerPopup = true;
    }
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "allConfig",
      "tjShowFlag",
      "registerNow",
      "password"
    ]),
    hasTx() {
      return this.userInfo.avatar;
    },
    txList() {
      let showNum = 9;
      let num = 0;
      let txList = [];
      for (let i = 0; i < this.allConfig.avatarList.length / showNum; i++) {
        txList[i] = [];
        let count = 0;
        for (let j = num; j < this.allConfig.avatarList.length; j++) {
          count++;
          txList[i].push(this.allConfig.avatarList[j]);
          if (count === showNum) {
            num += showNum;
            break;
          }
        }
      }
      return txList;
    }
  },
  methods: {
    ...mapMutations(["SET_USER_INFO", "CLEAR_USER_INFO"]),
    ...mapActions(["checkedLogin"]),
    shares(i) {
      if (i == 2) {
        this.showShare = true;
      }
    },
    goShare(type) {
      if (type == "weChat") {
        let target_url = this.allConfig.share.picUrl;
        ImagePreview({
          images: [target_url],
          closeOnPopstate: true,
          showIndex: false
        });
      } else if (type == "friends") {
        let url = this.allConfig.share.url;
        let title = this.allConfig.share.title;
        let content = this.allConfig.share.content;
        let picurl = this.allConfig.share.picurl;
        let friendsUrl =
          "http://api.bshare.cn/share/sinaminiblog?url=" +
          url +
          "&title=" +
          title +
          "&content=" +
          content +
          "&pic=" +
          picurl +
          "&publisherUuid=[UUID]";
        window.open(friendsUrl, "朋友圈", "height=568, width=320");
      } else if (type == "qq") {
        let title = "分享到QQ";
        let pic = "";
        let p = {
          url: this.allConfig.share
            .url /*获取URL，可加上来自分享到QQ标识，方便统计*/,
          desc:
            "来自" +
            this.allConfig.webName +
            "用户" +
            this.userInfo.username +
            "的分享" /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/,
          title: title /*分享标题(可选)*/,
          summary: title /*分享描述(可选)*/,
          pics: pic /*分享图片(可选)*/,
          flash: "" /*视频地址(可选)*/,
          //commonClient : true, /*客户端嵌入标志*/
          site: this.allConfig.webName /*分享来源 (可选) ，如：QQ分享*/
        };
        let s = [];
        for (let i in p) {
          s.push(i + "=" + encodeURIComponent(p[i] || ""));
        }
        let target_url =
          "http://connect.qq.com/widget/shareqq/iframe_index.html?" +
          s.join("&");
        window.open(target_url, "QQ", "height=568, width=320");
      } else if (type == "weibo") {
        // console.log
        let title = "分享吉祥娱乐" + window.location.origin + "到微博";
        let url = "http://t.sina.com.cn";
        let picurl = "";
        let sharesinastring =
          "http://v.t.sina.com.cn/share/share.php?title=" +
          title +
          "&url=" +
          url +
          "&content=utf-8&sourceUrl=" +
          url +
          "&pic=" +
          picurl;
        window.open(
          sharesinastring,
          "newwindow",
          "height=300,width=300,top=100,left=100"
        );
      } else {
        console.log("11111111", this.allConfig.share.url);
        this.$copyText(this.allConfig.share.url).then(e => {
          console.log(e);
          this.$toast("复制链接成功");
          this.showShare = false;
        });
      }
    },
    returnHome() {
      exchangeAllToLottery().then(res => {
        if (res.status) {
          this.checkedLogin();
        }
        this.$toast(res.msg);
      });
    },
    LoginOut() {
      Dialog.confirm({
        title: "提示",
        message: "确定退出账号吗?"
      }).then(() => {
        loginOut().then(res => {
          console.log(res);
          sessionStorage.clear();
          this.$toast(res.data);
        });
        this.CLEAR_USER_INFO();
        this.$router.replace({
          name: "login",
          query: {
            redirect: "/"
          }
        });
      });
    },
    onChange(index) {
      this.current = index;
    },
    changeUserAvatar() {
      if (this.avatarId) {
        modifyUser({ avatar: this.avatarId }).then(res => {
          this.$toast(res.msg);
          if (res.status) {
            this.txChange = false;
            this.$store.dispatch("checkedLogin");
          }
        });
      } else {
        this.txChange = false;
      }
    },
    handleChange(i) {
      this.current = i + 1;
    },
    goRouter(to) {
      // console.log(to);
      // if(to) {
      this.$router.push({ path: to });
      // }else {
      //   window.open(this.skip);
      // }
    },
    closePopup() {
      this.registerPopup = false;
      this.$store.commit("SET_REGISTERNOW", false);
      this.$store.commit("SET_PASSWORD", "");
    },
    depositNow() {
      this.$router.push({ name: "wallet" });
      this.registerPopup = false;
      this.$store.commit("SET_REGISTERNOW", false);
      this.$store.commit("SET_PASSWORD", "");
    }
  }
};
</script>

<style scoped lang="less">
.user {
  .content {
    position: relative;
    .edit {
      width: 148px;
      height: 57px;
      line-height: 57px;
      position: absolute;
      right: 0;
      top: 30px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 57px 0 0 57px;
      text-align: center;
      font-size: 28px;
      color: #fff;
      z-index: 1;
      padding: 0;
      i {
        margin-right: 5px;
        font-size: 28px;
      }
    }
    .top {
      background: @User-Bg;
      background-size: 100%;
      position: relative;
      padding: 120px 0;
      .top-content {
        position: relative;
        > div {
          display: inline-block;
          vertical-align: top;
          &:nth-child(1) {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 30px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-child(2) {
            margin-left: 25px;
            h5 {
              line-height: 50px;
              span {
                text-align: center;
                &:nth-child(1) {
                  font-size: 40px;
                  color: #fff;
                }
                &:nth-child(2) {
                  display: inline-block;
                  vertical-align: middle;
                  padding: 0 20px;
                  height: 40px;
                  line-height: 40px;
                  margin-left: 35px;
                  background: url("../../assets/images/vipBg.png");
                  -webkit-background-size: 100% 100%;
                  background-size: 100% 100%;
                  font-size: 26px;
                  color: #ffc71b;
                  position: relative;
                  &::after {
                    content: "";
                    position: absolute;
                    width: 55px;
                    height: 55px;
                    background: url("../../assets/images/vip.png");
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                    top: -33px;
                    right: -25px;
                  }
                }
              }
            }
            p {
              display: inline-block;
              margin-top: 20px;
              span {
                color: #fff;
                &:nth-child(1) {
                  font-size: 28px;
                  opacity: 0.7;
                }
                &:nth-child(2) {
                  font-size: 40px;
                }
              }

              .iconfont {
                font-size: 45px;
                margin-left: 30px;
                &.mShow {
                  color: #fff;
                }
                &.mHide {
                  color: #fff;
                }
              }
            }
          }
        }
        .guiHu {
          position: absolute;
          width: 128px;
          height: 46px;
          text-align: center;
          line-height: 46px;
          border-radius: 46px;
          font-size: 26px;
          right: 30px;
          top: 75px;
          background-color: #fff;
          color: #fd8d41;
        }
      }
    }
    .money {
      width: 670px;
      height: 96px;
      line-height: 96px;
      background-color: #ffffff;
      box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      margin: auto;
      display: flex;
      justify-content: space-around;
      padding: 0 10px;
      li {
        .van-button {
          width: 148px;
          height: 56px;
          text-align: center;
          line-height: 56px;
          vertical-align: middle;
          color: #fff;
          font-size: 26px;
          i {
            margin-right: 10px;
            font-size: 40px;
          }
          span {
            display: inline-block;
            vertical-align: top;
          }
          &.amount {
            background: url("../../assets/images/amount.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          &.recharge {
            background: url("../../assets/images/recharge.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          &.withdraw {
            background: url("../../assets/images/withdraw.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          &.bill {
            background: url("../../assets/images/bill.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
      }
    }
    .record {
      width: 690px;
      height: 170px;
      margin: 30px auto;
      box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: hidden;
      > div {
        display: inline-block;
        height: 100%;
        width: 33.33%;
        position: relative;
        background-color: #fff;

        &::before {
          content: " ";
          width: 1px; /*no*/
          height: 126px;
          background: #d6d4d4;
          position: absolute;
          right: 0;
          top: 22px;
          z-index: 1;
        }
        &:nth-child(3)::before {
          background-color: transparent;
        }
        .van-button {
          text-align: center;
          height: 100%;
          width: 100%;
          i {
            display: block;
            color: @ThemeColor;
            font-size: 55px;
            margin: 10px 0 10px 0;
          }
          span {
            font-size: 28px;
            color: @User-Font-Color;
          }
        }
      }
    }
    .safety,
    .msg {
      width: 690px;
      margin: auto;
      box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: hidden;
      .van-cell {
        font-size: 28px;
        position: relative;
        height: 100px;
        line-height: 100px;
        .van-cell__value {
          position: absolute;
          left: 30px;
          overflow: initial;
        }
        .van-cell__title {
          margin-left: 12px;
        }
      }
      i.iconfont {
        color: @ThemeColor;
        font-size: 33px;
        margin-right: 15px;
      }
      .noticeNum {
        position: absolute;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        background-color: @red;
        opacity: 0.9;
        color: #fff;
        z-index: 10;
        left: 200px;
        top: 30px;
      }
    }
    .msg {
      margin-top: 30px;
    }
    .loginOut {
      margin: 60px auto 100px;
      width: 690px;
      height: 90px;
      box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      text-align: center;
      overflow: hidden;
      i {
        font-size: 35px;
        display: inline-block;
        vertical-align: top;
        margin-right: 5px;
      }
      .van-button {
        width: 100%;
        height: 100%;
        background-color: #ff4242;
        color: #fff;
        font-size: 28px;
        line-height: 90px;
      }
    }
  }
  .sharePopup {
    width: 100%;
    .shareContent {
      width: 100%;
      background-color: #fff;
      dl {
        display: flex;
        flex-wrap: wrap;
        padding-top: 60px;
        dd {
          flex: 0 0 auto;
          width: 25%;
          text-align: center;
          margin-bottom: 60px;
          div {
            display: inline-block;
            width: 90px;
            height: 90px;
            margin-bottom: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            text-align: center;
            font-size: 28px;
          }
        }
      }
      > div {
        height: 100px;
        font-size: 32px;
        border-top: 1px solid #e0e0e0;
      }
    }
  }
  .txPopup {
    width: 510px;
    text-align: center;
    border-radius: 10px;
    .title {
      font-size: 32px;
      padding-top: 30px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      padding-left: 25px;
      padding-bottom: 10px;
      li {
        flex: 0 0 auto;
        width: 150px;
        height: 150px;
        box-sizing: border-box;
        border: 2px solid transparent; /*no*/
        margin: 2px;
        &.on {
          border-color: @ThemeColor;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .btn {
      margin-top: 10px;
      border-top: 1px solid #f0f0f0; /*no*/
      .van-button {
        border-top: 1px solid #f0f0f0;
        width: 100%;
        font-size: 30px;
        color: #108ee9;
      }
    }
  }
  .registerWrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .registerPopup {
      position: relative;
      width: 594px;
      height: 810px;
      border-radius: 30px;
      background: url("/home/registerBg.png") no-repeat;
      background-size: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      i {
        font-size: 64px;
        position: absolute;
        top: -106px;
        right: 32px;
        color: #fff;
      }
      .line {
        width: 2px;
        height: 40px;
        background: #fff;
        position: absolute;
        top: -40px;
        right: 63px;
      }
      h1 {
        font-size: 54px;
        margin-top: 80px;
        margin-bottom: 30px;
        color: #ff4b00;
      }
      h5 {
        font-size: 32px;
        margin-bottom: 70px;
        color: #ff9b83;
      }
      .box {
        width: 388px;
        height: 85px;
        background-color: #fff3e8;
        border-radius: 20px;
        padding-left: 32px;
        font-size: 28px;
        margin-bottom: 30px;
        p {
          color: #666666;
        }
        p:last-child {
          margin-right: 24px;
        }
        span {
          color: #999999;
          margin-left: 24px;
        }
      }
      .button {
        margin-top: 28px;
        width: 502px;
        height: 90px;
        border-radius: 45px;
        color: #fff;
        background: linear-gradient(0deg, #fd6c30, #fe9739);
        font-size: 32px;
      }
    }
  }
}
</style>
