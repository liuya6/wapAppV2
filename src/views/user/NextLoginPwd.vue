<template>
  <div class="nextloginpwd"  v-title="'新密码'">
    <Header title="新密码"></Header>
    <ul>
      <li>
        <van-field
            v-model="userPwd"
            type="password"
            clearable
            placeholder="请设置新密码">
        </van-field>
        <i class="iconfont">&#xe70b;</i>
      </li>
      <li>
        <van-field
            v-model="userPwdAgain"
            type="password"
            clearable
            placeholder="请确认新密码">
        </van-field>
        <i class="iconfont">&#xe70b;</i>
      </li>
      <li>
        <van-button class="loginBtn">
          完成
        </van-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "NextLoginPwd",
    data(){
      return{
        userPwd:'',
        userPwdAgain:''
      }
    },
  }
</script>

<style scoped lang="less">
.nextloginpwd {
  ul {
    padding-left: 20px;
    li{
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
      &:last-child {
        margin-top: 180px;
      }
    }
  }
  .loginBtn {
    width: 690px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    background: @Login-Btn-Bg;
    color: #fff;
    border-radius: 90px;
    font-size: 38px;
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
