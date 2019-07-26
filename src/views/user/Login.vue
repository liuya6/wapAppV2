<template>
  <div class="login" v-title="'登录'">
    <Header title="登录" rightTitle="免费试玩" :rightClick="Play" :isSlot="true">
      <i @click="goBack" class="iconfont back">&#xe629;</i>
    </Header>
    <!--    <div class="tx">-->
    <!--      <img :src="require('../../assets/images/tx.png')" alt="" />-->
    <!--    </div>-->
    <div class="login-content">
      <!--      <div class='tabBar'>-->
      <!--        <span v-for="(item,i) in List" :key="i" :class='{"on":item.type===Type}' @click="Type=item.type">-->
      <!--          {{item.title}}-->
      <!--        </span>-->
      <!--      </div>-->
      <ul v-if="Type==='userName'" class="user_name">
        <li>
          <van-field v-model="userName.username" clearable placeholder="请输入用户名"></van-field>
          <i class="iconfont">&#xe70e;</i>
        </li>
        <li>
          <van-field v-model="userName.password" type="password" clearable placeholder="请输入密码"></van-field>
          <i class="iconfont">&#xe70b;</i>
        </li>
        <li>
          <van-field v-model="userName.verifyCode" clearable placeholder="请输入验证码" @keyup.enter="userNameLogin"></van-field>
          <i class="iconfont">&#xe713;</i>
          <div class="yanZ" @click="changeCodeImg">
            <img :src="codeImg" alt="点击重新获取" />
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="keep" v-model="keep" />
            <label for="keep">记住密码</label>
          </div>
          <router-link to="/service">忘记密码？</router-link>
        </li>
        <li>
          <van-button class="submitBtn" @click="userNameLogin">登录</van-button>
          <van-button class="sw" @click="$router.push({name: 'register'})">立即注册</van-button>
        </li>
      </ul>
      <ul v-else class="user_phone">
        <li>
          <van-field
            v-model="userPhone.mobile"
            type="tel"
            clearable
            placeholder="请输入手机号"
            maxlength="11"
          ></van-field>
          <i class="iconfont">&#xe707;</i>
        </li>
        <li>
          <van-field v-model="userPhone.verifyCode" center clearable placeholder="请输入短信验证码">
            <van-button
              class="sendCode"
              :class="{'wait':loginWaitTime>0}"
              slot="button"
              size="small"
              @click="getMobilCode"
            >{{loginWaitTime>0?loginWaitTime+'秒后重新获取':'获取验证码'}}</van-button>
          </van-field>
          <i class="iconfont">&#xe713;</i>
        </li>
        <li>
          <router-link to="/service">无法获取验证码？联系客服</router-link>
        </li>
        <li>
          <van-button class="submitBtn" @click="userPhoneLogin">登录</van-button>
          <p class="sw" @click="Play">
            <span>没有账号？</span>
            <span>免费试玩</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { goLogin, Play, sendSms, loginByMobile,redPacket } from "../../api";
import { Base64 } from "js-base64";
import { mapGetters } from "vuex";
const List = [
  { title: "用户名", type: "userName" }
  // {title: '手机号', type: 'userPhone'}
];
export default {
  name: "Login",
  data() {
    return {
      List,
      keep: false,
      codeImg: "",
      fromUrl: this.$route.query.redirect || "/",
      Type: "userName",
      loginWaitTime: 0,
      timer: null,
      userName: {
        username: "",
        password: "",
        verifyCode: ""
      },
      userPhone: {
        mobile: "",
        verifyCode: ""
      }
    };
  },
  created() {
    this.codeImg = "/api/auth/captcha";
    this.userName.username = this.$cookies.get("username")
      ? Base64.decode(this.$cookies.get("username"))
      : "";
    if (this.$cookies.get("password")) {
      this.keep = true;
      this.userName.password = Base64.decode(this.$cookies.get("password"));
    }
    if (localStorage.getItem("loginWaitTime")) {
      this.loginWaitTime = localStorage.getItem("loginWaitTime");
      if (this.loginWaitTime > 0) {
        this.times();
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    goLogin() {
      if (this.Type === "userName") {
        this.userNameLogin();
      } else {
        this.userPhoneLogin();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    changeCodeImg() {
      this.userName.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    userNameLogin() {
      /* 字段验证 */
      if (!this.userName.username) {
        return this.$toast("用户名不能为空");
      }
      if (!this.userName.password) {
        return this.$toast("密码不能为空");
      }
      if (!this.userName.verifyCode) {
        return this.$toast("请输入验证码");
      }
      /* 设置cookie */
      this.$cookies.set(
        "username",
        Base64.encode(this.userName.username),
        "7d"
      );
      if (this.keep) {
        this.$cookies.set(
          "password",
          Base64.encode(this.userName.password),
          "7d"
        );
      } else {
        if (this.$cookies.get("password")) this.$cookies.remove("password");
      }
      /* 登录 */
      goLogin(this.userName).then(res => {
        if (res.status) {
          console.log(res.data);
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.commit("SET_MY_BANK", []);
          console.log(this.fromUrl);
          if(this.fromUrl && this.fromUrl !== "/register" && this.fromUrl === "/redpack"){
            redPacket().then(res => {
              console.log(res);
              if (res.status) {
                this.$store.commit("SET_REDPACK", res.data);
                return this.$router.replace({ path: this.fromUrl });
              } else {
                return this.$router.replace({ path: "/user" });
              }
            });
          }else {
            this.$router.replace({
              path: this.fromUrl
            });
          }
        } else {
          this.changeCodeImg();
          this.$toast(res.msg);
        }
      });
    },
    Play() {
      Play().then(res => {
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.commit("SET_MY_BANK", []);
          this.$toast("试玩账号注册成功");
          if (this.fromUrl && this.fromUrl !== "/register" && this.fromUrl !== "/redpack" && this.fromUrl !== "/vip" && this.fromUrl !== "/yuebaoHome") {
            this.$router.replace({
              path: this.fromUrl
            });
          } else {
            this.$router.push({
              name: "home"
            });
          }
        } else {
          this.$toast(res.msg);
        }
      });
    },
    getMobilCode() {
      if (this.loginWaitTime > 0) {
        return false;
      }
      if (!this.userPhone.mobile) {
        return this.$toast("请输入手机号码");
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.userPhone.mobile)) {
          return this.$toast("请输入正确的手机号");
        }
      }
      this.loginWaitTime = 60;
      this.times();
      sendSms({ mobile: this.userPhone.mobile }).then(res => {
        this.$toast(res.msg);
      });
    },
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.loginWaitTime--;
        localStorage.setItem("loginWaitTime", this.loginWaitTime);
        if (this.loginWaitTime <= 0) {
          this.loginWaitTime = 0;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    userPhoneLogin() {
      if (!this.userPhone.mobile) {
        return this.$toast("请输入手机号码");
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.userPhone.mobile)) {
          return this.$toast("请输入正确的手机号");
        }
      }
      if (!this.userPhone.verifyCode) {
        return this.$toast("请输入短信验证码");
      }
      loginByMobile(this.userPhone).then(res => {
        console.log(res);
        this.$toast(res.msg);
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.commit("SET_MY_BANK", []);
          this.$router.replace({
            path: this.fromUrl
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login {
  position: relative;
  /*.tx {*/
  /*  width: 176px;*/
  /*  height: 176px;*/
  /*  border-radius: 50%;*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  left: 287px;*/
  /*  top: 180px;*/
  /*  img {*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*  }*/
  /*}*/
  .headerBox {
    //background: @ThemeColor;
    color: #333;
    border-bottom: 1px solid #f0f0f0; /*no*/
  }
  .login-content {
    /*.tabBar {*/
    /*  margin-top: 390px;*/
    /*  padding-left: 30px;*/
    /*  font-size: 28px;*/
    /*  color: #aeaeae;*/
    /*  span {*/
    /*    margin-right: 30px;*/
    /*  }*/
    /*  .on {*/
    /*    font-size: 42px;*/
    /*    color: #282828;*/
    /*  }*/
    /*}*/
    .user_name {
      padding-left: 20px;
      li {
        margin-top: 50px;
        overflow: hidden;
        position: relative;
        i {
          color: @ThemeColor;
          font-size: 50px;
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translate(0, -50%);
        }
        &:nth-child(3) {
          position: relative;
          .van-cell.van-field {
            width: 468px;
            float: left;
          }
          .yanZ {
            width: 192px;
            height: 64px;
            position: absolute;
            top: 50%;
            right: 40px;
            transform: translate(0, -50%);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        &:nth-child(4) {
          margin-top: 30px;
          height: 35px;
          line-height: 35px;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            input[type="checkbox"] {
              width: 28px;
              height: 28px;
              line-height: 28px;
              -webkit-appearance: none;
              .borderAll();
              text-align: center;
              margin: 0 10px 0 10px;
            }
            input[type="checkbox"]:checked {
              border: 1px solid @ThemeColor;
              background: #fff;
              color: @ThemeColor;
              line-height: 28px;
              &::after {
                content: "\2714";
                color: @ThemeColor;
                line-height: 28px;
              }
            }
            label {
              font-size: 25px;
            }
          }
          a {
            margin-right: 40px;
            font-size: 28px;
            color: @Forget-Pwd-Color;
          }
        }
      }
    }
    .user_phone {
      padding-left: 20px;
      li {
        margin-top: 50px;
        position: relative;
        overflow: hidden;
        i {
          color: @ThemeColor;
          font-size: 50px;
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translate(0, -50%);
        }
        &:nth-child(2) {
          .sendCode {
            width: 100%;
            text-align: center;
            font-size: 27px;
            color: #282828;
            background-color: @Login-Input-Bg;
            &.wait {
              color: @ThemeColor;
            }
            &::after {
              content: "";
              position: absolute;
              width: 1px; /*no*/
              height: 60px;
              background-color: #d6d4d4;
              left: -20px;
              top: 10px;
            }
          }
        }
        &:nth-child(3) {
          a {
            float: right;
            color: @Forget-Pwd-Color;
            margin-right: 40px;
            font-size: 28px;
          }
        }
      }
    }
    .submitBtn {
      margin-top: 15px;
    }
    .sw {
      margin-top: 30px;
      width: 690px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      border: 1px solid @Loss; /*no*/
      border-radius: 90px;
      font-size: 38px;
      color: @Loss;
    }
    .van-cell.van-field {
      width: 695px;
      border-radius: 90px;
      background-color: @Login-Input-Bg;
      padding-left: 95px;
      font-size: 30px;
    }
  }
  .submitBtn {
    margin: 0;
  }
}
</style>
