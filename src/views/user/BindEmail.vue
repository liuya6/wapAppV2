<template>
  <div class="loginpwd flex">
    <Header title="绑定邮箱"></Header>
    <div class="content">
      <ul class="user_phone">
        <li>
          <van-field
            v-model="name"
            clearable
            placeholder="请输入您的邮箱"
            maxlength="11"
          ></van-field>
          <i class="iconfont icon">&#xe70a;</i>
        </li>
      </ul>
      <van-button class="submitBtn" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { changeUserPwd } from "../../api/index";
export default {
  name: "LoginPwd",
  data() {
    return {
      name: '',
    };
  },
  methods: {
    submit() {
      if (!this.user.oldPwd) {
        return this.$toast("请输入取款人姓名");
      }
      changeUserPwd(this.user).then(res => {
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
      i {
        font-size: 50px;
        position: absolute;
        top: 50%;
        color: #aeaeae;
        transform: translate(50%, -50%);
      }
    }
  }

  .van-cell.van-field {
    padding: 34px 0 34px 100px;
    font-size: 30px;
  }
  .submitBtn {
    margin-top: 220px;
  }
}
</style>
