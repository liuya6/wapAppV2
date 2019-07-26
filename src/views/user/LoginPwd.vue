<template>
  <div class="loginpwd" v-title="'忘记密码'">
    <Header title="忘记密码"></Header>
    <ul class="user_phone">
      <li>
        <van-field
            v-model="userPhone"
            type="number"
            clearable
            placeholder="请输入手机号"
            maxlength="11"
        >
        </van-field>
        <i class="iconfont">&#xe707;</i>
      </li>
      <li>
        <van-field
            v-model="phoneCode"
            center
            clearable
            placeholder="请输入短信验证码"
        >
          <van-button class="sendCode" slot="button" size="small">获取验证码</van-button>
        </van-field>
        <i class="iconfont">&#xe713;</i>
      </li>
      <li>
        <router-link to='/login'>无法获取验证码？</router-link>
      </li>
      <li>
        <van-button class="submitBtn" @click="next">
          下一步
        </van-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "LoginPwd",
    data() {
      return {
        userPhone: '',
        phoneCode: ''
      }
    },
    methods:{
      next() {
        this.$router.push("/nextloginpwd")
      }
    }
  }
</script>

<style scoped lang="less">
.loginpwd {
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
        transform: translate(0,-50%);
      }
      &:nth-child(2) {
        .sendCode {
          width: 100%;
          text-align: center;
          font-size: 30px;
          color: #282828;
          background-color: @Login-Input-Bg;

          &::after {
            content: '';
            position: absolute;
            width: 1px; /*no*/
            height: 60px;
            background-color: #d6d4d4;
            left: -20px;
            top: 10px;
          }
        }
        .sendCodeIng {
          color: @ThemeColor;
        }
      }
      &:nth-child(3) {
        margin-top: 30px;
        a {
          float: right;
          color: @Forget-Pwd-Color;
          margin-right: 30px;
          font-size: 28px;
        }
      }
      &:nth-child(4) {
        margin-top: 130px;
      }
    }
  }
  .submitBtn {
    margin: 0;
  }
  .van-cell.van-field {
    width: 695px;
    border-radius: 90px;
    background-color: @Login-Input-Bg;
    padding-left: 95px;
    font-size: 30px;
  }
}
</style>
