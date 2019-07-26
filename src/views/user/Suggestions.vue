<template>
  <div class="suggestions flex" v-title="'投诉建议'">
    <Header title="投诉建议"></Header>
    <div class="blank"></div>
    <div class="content">
      <ul class="user_phone">
        <li>
          <div>
            <span>★</span>姓名
          </div>
          <van-field v-model="parameter.trueName" clearable placeholder="请输入您的姓名" maxlength="10"></van-field>
        </li>
        <li>
          <div>
            <span>★</span>电话
          </div>
          <van-field v-model="parameter.mobile" clearable placeholder="请输入您的联系电话" maxlength="11"></van-field>
        </li>
        <li>
          <div>
            <span>★</span>QQ或Skype
          </div>
          <van-field v-model="parameter.contact" clearable placeholder="请输入您的QQ或Skype" maxlength="20"></van-field>
        </li>
        <li>
          <div>
            <span>★</span>邮箱
          </div>
          <van-field v-model="parameter.email" clearable placeholder="请输入您的邮箱" maxlength="20"></van-field>
        </li>
        <li>
          <div>
            <span>★</span>描述
          </div>
          <textarea rows="3" v-model="parameter.content" placeholder="请详尽描述遇到的问题，以使我们及时为您解决！(10-100字)"></textarea>
        </li>
      </ul>
      <div class="flexS">
        <van-button class="submitBtn btn1" @click="clear">清除</van-button>
        <van-button class="submitBtn btn2" @click="submit">提交</van-button>
      </div>
      <div class="main">
        <div>温馨提示</div>
        <p>我们的客服中心全年无休，提供1周7天、每天24小時的优质服务。</p>
        <p>如果您对本网站使用有任何疑问，可以通过下列任意方式与客服人员联系，享受最实时的服务。</p>
        <p>点击"在线客服"链接，即可进入在线客服系统与客服人员联系。</p>
        <p>您亦可使用Email与客服人員取得联系。</p>
        <p>会员Email: jixiang@gmail.com</p>
        <p>国际热线: +00853 66563038</p>
        <p>填写下列窗体并点击送出数据，我们也能收到您宝贵的意见，务必填写真实的Email、QQ、联络电话，以便我们能及时与您取得联系！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { addSuggest } from "../../api";
export default {
  name: "suggestions",
  data() {
    return {
      parameter:{
        trueName: '',
        mobile: '',
        contact: '',
        email: '',
        content: ''
      }
    };
  },
  methods: {
    clear(){
       this.parameter = {
         trueName: '',
         mobile: '',
         contact: '',
         email: '',
         content: ''
       }
    },
    submit() {
      if(!this.parameter.trueName){
        return this.$toast('请输入您的姓名');
      }
      if(!this.parameter.mobile){
        return this.$toast('请输入您的手机号');
      }else {
        if(!/^1[3456789]\d{9}$/.test(this.parameter.mobile)){
          return this.$toast('请输入正确的手机号')
        }
      }
      if(!this.parameter.contact){
        this.$toast('请输入您的QQ或Skype')
      }
      if(!this.parameter.email){
        this.$toast('请输入您的邮箱');
      }else {
        if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.parameter.email)){
          return this.$toast('请输入正确的邮箱')
        }
      }
      if(!this.parameter.content){
        return this.$toast('请输入描述内容')
      }
      addSuggest(this.parameter).then(res=>{
        this.$toast(res.msg);
        if(res.status) {
          this.clear()
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.suggestions {
  .blank {
    background: @BG;
    height: 30px;
  }
  .content {
    padding: 30px;
  }
  .user_phone {
    background-color: #fff;
    li {
      position: relative;
      font-size: 30px;
      padding-bottom: 30px;
      div {
        color: #000000;
        span {
          color: @red;
        }
      }
      textarea {
        border: 0;
        width: 100%;
        border-bottom: 1px solid #d6d4d4;
        margin-top: 14px;
      }
    }
  }

  .van-cell {
    padding: 10px 0;
    border-bottom: 1px solid #d6d4d4;
    // .van-field {
    //   font-size: 30px;
    // }
  }
  .btn1 {
    width: 200px;
    background-image: linear-gradient(90deg, #afafaf 0%, #d3d3d3 100%);
    margin-left: 0;
  }
  .btn2 {
    width: 460px;
  }
  .main {
    background: #f1f1f1;
    margin-top: 50px;
    width: 650px;
    height: 620px;
    padding: 20px;
    > div {
      color: #ff5d0e;margin-bottom: 10px;
    }
    p {
      color: #a5a5a5;
      margin-bottom: 30px;
    }
  }
}
</style>
