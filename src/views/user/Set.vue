<template>
  <div class="set flex" v-title="'设置'">
    <Header title="设置"></Header>
    <div class="content">
      <div class="main">
        <List
          v-for="(item,i) in list"
          :key="i"
          :title="item.title"
          :value="value(item.value,item.title)"
          @click.native="showAlert(item.title,i)"
        ></List>
      </div>
    </div>

    <div v-if="show" class="alertWrap" @click="close">
      <div class="alert" @click.stop>
        <p>{{alertName}}</p>
        <div v-if="alertName=='性别'" class="sex">
          <div class="flexC" @click="nan">
            <span :class="sex == '男' ? 'on' : ''"></span>男
          </div>
          <div class="flexC" @click="nv">
            <span :class="sex == '女' ? 'on' : ''"></span>女
          </div>
        </div>
        <div v-else class="text flexC">
          <input
            type="text"
            :placeholder="'请输入要修改的'+alertName"
            v-model="inputValue"
          >
        </div>
        <div class="btn">
          <div class="flexC" @click="determine(index)">确定</div>
          <div class="flexC" @click="cancel">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Set",
  data() {
    return {
      show: false,
      changeGender: false,
      sex: "男",
      alertName: "",
      inputValue: "",
      index: "",
      list: [
        { title: "头像", value: "", ifText: true },
        { title: "昵称", value: "superstar", ifText: true },
        { title: "账号", value: "abc123456", ifText: true },
        { title: "手机号", value: "185 **** 4762", ifText: true },
        { title: "微信号", value: "", ifText: true },
        { title: "性别", value: "", ifText: false },
        { title: "生日", value: "1990/05/09", ifText: true }
      ]
    };
  },
  methods: {
    showAlert(title,i) {
      this.alertName = title;
      this.show = true;
      this.inputValue = '';
      this.index = i;
      console.log(title,this.inputValue, 111111);
      if (title == "头像") {
      } else if (title == "性别") {
        this.changeGender = true;
      } else {
        if (this.changeGender == true) {
          this.changeGender = false;
        }
      }
    },
    value(value, title) {
      if (value) {
        return value;
      }
      if (title == "头像") {
        return " ";
      } else if (title == "昵称") {
        return "未设置";
      } else if (title == "性别") {
        return "保密";
      } else {
        return "未绑定";
      }
    },
    cancel() {
      this.show = false;
      this.list1 = [];
    },
    close() {
      // this.changeGender = false;
      this.show = false;
    },
    nan() {
      this.sex = "男";
    },
    nv() {
      this.sex = "女";
    },
    determine(i) {
      if (this.alertName == "昵称") {
        this.name = this.inputValue;
      } else if (this.alertName == "账号") {
        this.account = this.inputValue;
      } else if (this.alertName == "手机号") {
        this.phone = this.inputValue;
      } else if (this.alertName == "微信号") {
        this.wechat = this.inputValue;
      } else if (this.alertName == "生日") {
        this.birthday = this.inputValue;
      }
      this.changeGender = false;
      this.show = false;
      this.list[i].value=this.inputValue
    }
  }
};
</script>

<style scoped lang="less">
.set {
  .content {
    background: @BG;
    .main {
      margin-top: 30px;
      .listBox:first-child {
        padding: 60px 0 !important;
      }
    }
  }
  .alertWrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;

    .alert {
      width: 560px;
      background: #fff;
      font-size: 36px;
      color: #282828;
      position: absolute;
      top: 380px;
      left: 98px;
      box-shadow: 0 2px 10px 0 #d6d6d6;
      border-radius: 10px;

      p {
        height: 80px;
        line-height: 80px;
        text-align: center;
        margin: 0 26px;
        border-bottom: 1px solid #cecece;
      }

      .text {
        height: 206px;
        width: 100%;
        input {
          width: 440px;
          height: 72px;
          border-radius: 36px;
          border: 2px solid #cecece;
          text-align: center;
        }
        border-bottom: 1px solid #d6d6d6;
      }

      .sex {
        border-bottom: 1px solid #d6d6d6;
        display: flex;
        padding: 0 40px;

        > div {
          width: 50%;
          height: 206px;

          span {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #cccccc;
            margin-right: 20px;
          }

          .on {
            background: @ThemeColor;
          }
        }
      }

      .btn {
        display: flex;
        height: 80px;

        div {
          width: 50%;
          color: #999999;
        }

        div:first-child {
          color: @ThemeColor;
          border-right: 1px solid #cecece;
        }
      }
    }
  }
}
</style>
