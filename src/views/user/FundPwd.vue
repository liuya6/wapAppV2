<template>
  <div class="loginpwd flex" v-title="'修改资金密码'">
    <Header title="修改资金密码"></Header>
    <div class="content">
      <ul class="user_phone">
        <li>
          <van-field
            v-model="user.oldPassword"
            clearable
            placeholder="请输入旧密码"
            maxlength="12"
            :type="show1?'text':'password'"
          ></van-field>
          <i class="iconfont icon">&#xe724;</i>
          <i @click="ifShow1" :class="{'active':show1}" class="iconfont eye">{{show1?'&#xe722;':'&#xe723;'}}</i>
        </li>
        <li>
          <van-field
            v-model="user.newPassword"
            :type="show2?'text':'password'"
            clearable
            placeholder="请输入新密码"
            maxlength="12"
          ></van-field>
          <i class="iconfont icon">&#xe726;</i>
          <i @click="ifShow2" :class="{'active':show2}" class="iconfont eye">{{show2?'&#xe722;':'&#xe723;'}}</i>
        </li>
        <li>
          <van-field
            v-model="user.newPassword_confirm"
            :type="show3?'text':'password'"
            clearable
            placeholder="请确认新密码"
            maxlength="12"
          ></van-field>
          <i class="iconfont icon">&#xe725;</i>
          <i @click="ifShow3" :class="{'active':show3}" class="iconfont eye">{{show3?'&#xe722;':'&#xe723;'}}</i>
        </li>
      </ul>
      <van-button class="submitBtn" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { changeWithdrawPwd } from "../../api";
export default {
  name: "LoginPwd",
  data() {
    return {
      user: {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      },
      show1: true,
      show2: false,
      show3: false
    };
  },
  methods: {
    ifShow1() {
      this.show1 = !this.show1;
    },
    ifShow2() {
      this.show2 = !this.show2;
    },
    ifShow3() {
      this.show3 = !this.show3;
    },
    submit() {
      if (!this.user.oldPassword) {
        return this.$toast("请输入旧密码");
      }
      if (!this.user.newPassword || !this.user.newPassword_confirm) {
        return this.$toast("请输入新密码");
      } else {
        if (
          !/^\d{6}$/.test(
            this.user.newPassword
          )
        ) {
          return this.$toast("请按要求填写密码（6位数字的组合）");
        }
        if (this.user.newPassword != this.user.newPassword_confirm) {
          return this.$toast("两次输入密码不同");
        }
      }
        console.log(this.user,'this.user')
        // console.log(changeWithdrawPwd,'changeWithdrawPwd')
      changeWithdrawPwd(this.user).then(res => {
        console.log(res.msg,'res.msg')
        this.$toast(res.msg);
        if (res.status) {
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.loginpwd {
  .content {
    background: @BG;
  }
  .user_phone {
    background-color: #fff;
    margin-top: 40px;
    li {
      position: relative;
      overflow: hidden;
      i {
        position: absolute;
        top: 50%;
        color: #aeaeae;
        transform: translate(-10%, -50%);
      }
      .icon {
        font-size: 50px;
        left: 30px;
        margin-right: 20px;
      }
      .eye {
        font-size: 50px;
        right: 20px;
      }
      .active {
        color: @ThemeColor;
      }
    }
  }

  .van-cell.van-field {
    padding: 34px 100px 34px 110px;
    font-size: 30px;
  }
  .submitBtn {
    margin-top: 120px;
  }
}
</style>
