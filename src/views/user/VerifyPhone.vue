<template>
  <div class="bindMobile flex" v-title="'绑定手机号'">
    <Header title="绑定手机号"></Header>
    <div class="content">
      <ul class="user_phone">
        <li>
          <van-field
              type="tel"
              v-model="user.mobile"
              clearable
              placeholder="请输入手机号码"
              maxLength="11"
          >
            <van-button
                class="sendCode"
                :class="setCodeFlag?'on':'wait'" slot="button" size="small"
                @click="getMobilCode">
            {{bindMobileWaitTime>0?bindMobileWaitTime+'秒后重新获取':'获取验证码'}}
            </van-button>
          </van-field>
          <i class="iconfont">&#xe707;</i>
        </li>
        <li>
          <van-field v-model="user.verifyCode" clearable placeholder="请输入验证码" maxlength="10"></van-field>
          <i class="iconfont icon">&#xe713;</i>
        </li>
      </ul>
      <van-button class="submitBtn" @click="bindMobile">提交</van-button>
    </div>
  </div>
</template>

<script>
import { sendSms,bindMobile } from "../../api/index";
export default {
  name: "LoginPwd",
  data() {
    return {
      user: {
        mobile: '',
        verifyCode: ''
      },
      bindMobileWaitTime: 0,
      timer: null,
      setCodeFlag: false
    };
  },
  created(){
    if(localStorage.getItem('bindMobileWaitTime')){
      this.bindMobileWaitTime = localStorage.getItem('bindMobileWaitTime');
      if(this.bindMobileWaitTime > 0){
        this.times()
      }
    }
  },
  watch:{
    "user.mobile":{
      handler(val){
        console.log(val);
        if(val.length>=11){
          if(this.bindMobileWaitTime<=0){
            this.setCodeFlag = true;
          }else {
            this.setCodeFlag = false;
          }
        }else {
          this.setCodeFlag = false;
        }
      }
    }
  },
  methods: {
    times() {
      clearInterval(this.timer);
      this.timer = setInterval(()=>{
        this.bindMobileWaitTime--;
        localStorage.setItem('bindMobileWaitTime',this.bindMobileWaitTime);
        if(this.bindMobileWaitTime<=0){
          this.bindMobileWaitTime=0;
          clearInterval(this.timer);
          if(this.user.mobile.length>=11) {
            this.setCodeFlag = true
          }else {
            this.setCodeFlag = false
          }
        }
      },1000);
    },
    getMobilCode() {
      console.log(this.setCodeFlag,this.bindMobileWaitTime);
      if(this.bindMobileWaitTime>0) {
        return false;
      }
      if(!this.setCodeFlag){
        return false;
      }
      if(!this.user.mobile) {
        return this.$toast('请输入手机号码')
      }else {
        if(!/^1[3456789]\d{9}$/.test(this.user.mobile)) {
          return this.$toast('请输入正确的手机号')
        }
      }
      this.bindMobileWaitTime = 60;
      this.times();
      this.setCodeFlag = false;
      sendSms({mobile:this.user.mobile}).then(res=>{
        this.$toast(res.msg);
      })
    },
    bindMobile() {
      if(!this.user.mobile){
        return this.$toast('请输入手机号码')
      }else {
        if(!/^1[3456789]\d{9}$/.test(this.user.mobile)){
          return this.$toast('请输入正确的手机号')
        }
      }
      if(!this.user.verifyCode){
        return this.$toast('请输入手机号码')
      }
      bindMobile(this.user).then(res=>{
        this.$toast(res.msg);
        if(res.status){
          this.$router.go(-1)
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.bindMobile {
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
        font-size: 50px;
        position: absolute;
        top: 50%;
        color: #aeaeae;
        transform: translate(-10%, -50%);
        left: 30px;
        margin-right: 20px;
      }
      .sendCode {
        width: 100%;
        text-align: center;
        font-size: 27px;
        padding: 0 10px;
        color: #333;
        background-color: #eee;
        margin-right: 20px;
        &.on {
          color: #fff;
          background-color: @ThemeColor;
        }
        &.wait {
          color: #333;
          background-color: #eee;
        }
        /*&::after {*/
        /*  content: '';*/
        /*  position: absolute;*/
        /*  width: 1px; !*no*!*/
        /*  height: 60px;*/
        /*  background-color: #d6d4d4;*/
        /*  left: -20px;*/
        /*  top: 10px;*/
        /*}*/
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
