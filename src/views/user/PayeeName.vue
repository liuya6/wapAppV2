<template>
  <div class="loginpwd flex" v-title="'绑定取款人姓名'">
    <Header title="绑定取款人姓名"></Header>
    <div class="content">
      <ul class="user_phone">
        <li>
          <div class="title">姓名：</div>
          <van-field
            v-model="name"
            clearable
            placeholder="请输入取款人姓名"
            maxlength="11"
          ></van-field>
        </li>
      </ul>
      <van-button class="submitBtn" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { changeModifyAccount } from "../../api/index";
export default {
  name: "LoginPwd",
  data() {
    return {
      name: '',
    };
  },
  methods: {
    submit() {
      if (!this.name) {
        return this.$toast("请输入取款人姓名");
      }
      changeModifyAccount(this.name).then(res => {
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
      .title {
        position: absolute;
        left: 30px;
        top: 40px;
        color: #000000;
        font-size: 28px;
        z-index: 1;
      }
    }
  }

  .van-cell.van-field {
    padding: 34px 0 34px 130px;
    font-size: 30px;
  }
  .submitBtn {
    margin-top: 220px;
  }
}
</style>
