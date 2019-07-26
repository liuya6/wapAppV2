<template>
  <div class="register flex" v-title="'注册'">
    <Header title="注册"></Header>
    <div class="content">
      <ul>
        <li>
          <van-field v-model="user.username" clearable placeholder="用户名为字母开头的6-14个字符"></van-field>
          <i class="iconfont">&#xe70e;</i>
        </li>
        <li>
          <van-field
            v-model="user.password"
            type="password"
            clearable
            placeholder="密码由6-14位数字或字母组成"
          ></van-field>
          <i class="iconfont">&#xe70b;</i>
        </li>
        <li>
          <van-field v-model="user.password_confirm" type="password" clearable placeholder="请确认密码"></van-field>
          <i class="iconfont">&#xe708;</i>
        </li>
        <li v-for="(FieldItem, i) in registerField" :key="i">
          <div v-if="FieldItem.formtype != 'select'">
            <van-field
              clearable
              :type="FieldItem.formtype"
              :placeholder="'请输入'+FieldItem.name +(FieldItem.isrequired ? '(必填)' : '(选填)')"
              v-model="user[FieldItem.field]"
              :readonly="readOnly && FieldItem.field == 'xcode'"
            ></van-field>
            <i class="iconfont" v-html="FieldItem.icon"></i>
          </div>
          <div v-else class="bank">
            <select v-model="user[FieldItem.field]">
              <option disabled value>{{ FieldItem.tips }}</option>
              <option v-for="(item, i) in bankList" :key="i" :value="item.id">{{ item.name }}</option>
            </select>
            <i class="iconfont">&#xe70c;</i>
          </div>
        </li>
        <li class="otherBankName" v-show="otherBankShowFlag">
          <input type="text" placeholder="请输入银行名称" v-model="otherBankName" />
          <i class="iconfont">&#xe70c;</i>
        </li>
        <li class="code">
          <van-field v-model="user.verifyCode" clearable placeholder="请输入验证码"></van-field>
          <i class="iconfont">&#xe713;</i>
          <div class="yanZ">
            <img :src="codeImg" alt="点击重新获取" @click="changeCode" />
          </div>
        </li>
      </ul>
      <div class="protocol">
        <input type="checkbox" name id="keep" checked v-model="user.accept" />
        <span>我已年满18周岁，并且同意接受</span>
        <router-link to="/usertreaty">《开户条约》</router-link>
      </div>
      <div>
        <van-button class="submitBtn" @click="Register">立即注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerField, register } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      codeImg: "",
      registerField: [],
      bankList: [],
      xcode: "",
      otherBankShowFlag: false,
      otherBankName: "",
      user: {
        username: "",
        password: "",
        password_confirm: "",
        verifyCode: "",
        accept: true,
        name: "",
        qq: "",
        mobile: "",
        email: "",
        coinPassword: "",
        bankId: "",
        cardNo: "",
        weixin: "",
        xcode: "",
        mobileNum: ""
      }
    };
  },
  watch: {
    "user.bankId": {
      handler(newVal) {
        if (newVal === 10000) {
          this.otherBankShowFlag = true;
          return;
        }
        this.otherBankShowFlag = false;
      },
      deep: true
    }
  },
  created() {
    console.log(
      window.location.pathname.split("/register/"),
      "window.location"
    );

    this.codeImg = "/api/auth/captcha";
    registerField().then(res => {
      this.setXcode();
      let list = res.data.paramsList;
      this.registerField = list;
      for (let i = 0; i < list.length; i++) {
        let tempField = list[i].field;
        if (tempField === "xcode") {
          this.user[tempField] = this.xcode;
        } else {
          this.user[tempField] = "";
        }
      }
      this.bankList = res.data.bankList;
    });
  },
  computed: {
    ...mapGetters(["userInfo"]),
    readOnly() {
      return !!this.xcode;
    }
  },
  methods: {
    bankName(bank) {
      for (let i = 0; i < this.bankList.length; i++) {
        let bankListOne = this.bankList[i];
        if (bankListOne.id === bank) {
          return bankListOne.name;
        }
      }
    },
    setXcode() {
      let xcode =
        this.$route.path.split("/register/")[1] ||
        this.$route.params.xcode ||
        "";
      if (xcode !== "") {
        this.setCookie("xcode", xcode, 1);
      }
      if (!xcode) {
        let cookieXcode = this.getCookie("xcode") || "";
        if (cookieXcode !== "" && /^[1-9]\d*$/.test(cookieXcode)) {
          xcode = cookieXcode;
        }
        if (xcode !== "" && !/^[1-9]\d*$/.test(xcode)) {
          xcode = "";
        }
      }
      this.xcode = xcode;
    },
    changeCode() {
      this.user.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    Register() {
      if (!this.user.username) {
        return this.$toast("用户名不能为空");
      } else {
        if (!/^[a-zA-Z0-9_-]{5,15}$/.test(this.user.username)) {
          return this.$toast("请按照要求填写用户名（5~15个字母或数字）");
        }
      }
      if (!this.user.password || !this.user.password_confirm) {
        return this.$toast("密码不能为空");
      } else {
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,12}$/.test(
            this.user.password
          )
        ) {
          return this.$toast("请按要求填写密码（6~12个包含字母和数字的组合）");
        } else {
          if (this.user.password !== this.user.password_confirm) {
            return this.$toast("两次输入的密码不同");
          }
        }
      }
      if (!this.user.verifyCode) {
        return this.$toast("请输入验证码");
      }
      for (var i = 0; i < this.registerField.length; i++) {
        var item = this.registerField[i];
        if (item.isrequired) {
          if (!this.user[item.field]) {
            return this.$toast("请输入" + item.name);
          } else {
            if (item.pattern) {
              if (!this.$_eval(item.pattern).test(this.user[item.field])) {
                return this.$toast(item.errortips);
              }
            }
          }
        }
      }
      if (!this.user.accept) {
        return this.$toast("请阅读并同意法律声明");
      }
      let users = { ...this.user };
      if (this.otherBankShowFlag) {
        if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBankName)) {
          return this.$toast("请输入正确的开户银行名称");
        }
        users.bankName = this.otherBankName;
      } else {
        users = {
          ...this.user,
          bankName: this.bankName(this.user.bankId)
        };
      }

      console.log(users, "注册数据--------------");
      register(users).then(res => {
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$store.commit("SET_MY_BANK", []);
          this.$store.commit("SET_REGISTERNOW", true);
          this.$store.commit("SET_PASSWORD", this.user.password);
            this.$router.replace({
              path: "/user"
            });
        } else {
          this.changeCode();
        }
        this.$toast(res.msg);
      });
    }
  }
};
</script>

<style scoped lang="less">
.register {
  .headerBox {
    border-bottom: 1px solid #f0f0f0; /*no*/
  }
  ul {
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
      &.code {
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
    }
  }
  .protocol {
    margin-top: 30px;
    color: #666666;
    font-size: 26px;
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    input[type="checkbox"] {
      width: 28px;
      height: 28px;
      -webkit-appearance: none;
      .borderAll();
      text-align: center;
      margin: 0 10px;
    }
    input[type="checkbox"]:checked {
      border: 1px solid @ThemeColor;
      background: #fff;
      color: @ThemeColor;
      line-height: 28px;
      &::after {
        content: "\2714";
        color: @ThemeColor;
      }
    }
    a {
      color: @ThemeColor;
    }
  }
  .submitBtn {
    margin-bottom: 50px;
  }
  .van-cell.van-field {
    width: 695px;
    border-radius: 90px;
    background-color: @Login-Input-Bg;
    padding-left: 95px;
    font-size: 30px;
  }
  .bank,
  .otherBankName {
    width: 695px;
    height: 90px;
    border-radius: 90px;
    background-color: @Login-Input-Bg;
    font-size: 30px;
    display: flex;
    align-items: center;
    input,
    select {
      width: 80%;
      margin-left: 95px;
      border: 0;
      background-color: @Login-Input-Bg;
      font-size: 30px;
    }
    select {
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }
}
</style>
