<template>
  <div class="download" v-title="'APP下载'">
    <div class="content">
      <div class="top">
        <i class="iconfont" @click="back">&#xe629;</i>
        <img class="downloadImg" :src="cdnImg('download/download.png')" alt /> <!--/images/download/download.png-->
        <img class="logo" :src="allConfig.wapLogo" alt />
        <div v-if="ios">
          <div v-if="allConfig.iphoneUrl2" class="flexC button button1" @click="go1">
            <i class="iconfont">&#xe6d9;</i>轻盈版下载
          </div>
          <!-- <div v-if="ceshi.length" class="flexC button button1" @click="go1">
            <i class="iconfont">&#xe6d9;</i>轻盈版下载
          </div> -->
          <div class="flexC button button2" @click="go2">
            <i class="iconfont">&#xe6d9;</i>专业版下载
          </div>
        </div>
        <div v-else class="flexC button button2" @click="go3">
          <i class="iconfont">&#xe6d9;</i>立即下载
        </div>
      </div>
      <div class="bottom">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, i) in banner" :key="i">
            <p class="title">{{item.title}}</p>
            <div class="tip">{{item.tip}}</div>
            <ImgLoading v-if="ios" :src="cdnImg(`download/ios/${i}.png`)"></ImgLoading>
            <ImgLoading v-else :src="cdnImg(`download/android/${i}.png`)"></ImgLoading>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ios: false,
      // ceshi: " ",
      banner: []
    };
  },
  computed: {
      ...mapGetters(["allConfig"])
    },
  created() {
    // let text=this.ceshi.replace(/(^\s*)|(\s*$)/g, "");
    // console.log(text.length,!!text,'text')
    // console.log(this.ceshi.length,!!this.ceshi,'ceshi')
    // console.log(this.allConfig.iphoneUrl2.length,!!this.allConfig.iphoneUrl2,'allConfig.iphoneUrl2')
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      this.ios = true;
      this.banner = [
        {
          title: "出现下图请滑动查看",
          tip: "安全被阻止的教程"
        },
        {
          title: "第一步：打开【设置】",
          tip: ""
        },
        {
          title: "第二步：打开【通用】",
          tip: ""
        },
        {
          title: "第三步：打开【设备管理】",
          tip: ""
        },
        {
          title: "第四步:找到对应的选项",
          tip: "【RESTAURANT ***  **】"
        },
        {
          title: "第五步：点击“信任”选项",
          tip: "信任“RESTAURANT ***  **”"
        },
        {
          title: "第六步：点击【信任】",
          tip: "回到桌面重新打开，即可正常使用"
        }
      ];
    } else if (/(Android)/i.test(navigator.userAgent)) {
      //判断Android
      this.ios = false;
      this.banner = [
        {
          title: "出现下图请滑动查看",
          tip: "安全被阻止的教程"
        },
        {
          title: "第一步：打开【设定】",
          tip: ""
        },
        {
          title: "第二步：点击允许【未知来源】",
          tip: ""
        },
        {
          title: "第三步：点击【确认】",
          tip: ""
        },
        {
          title: "第四步:点击【下一步】",
          tip: "【RESTAURANT ***  **】"
        },
        {
          title: "第五步：点击【安装】",
          tip: "回到桌面重新打开，即可正常使用"
        }
      ];
    }
  },
  methods: {
    go1() {
      window.open(this.allConfig.iphoneUrl2)
    },
    go2() {
      window.open(this.allConfig.iphoneUrl)
    },
    go3() {
      window.open(this.allConfig.androidUrl)
    },
  }
};
</script>
<style scoped lang="less">
.download {
  height: 100%;
  overflow: hidden;
  .content {
    height: 100%;
    overflow: hidden;
    .top {
      position: relative;
        width: 100%;
        height: 68%;
      > i {
        font-size: 46px;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 20px;
        line-height: 100px;
      }
      .downloadImg {
        width: 100%;
        height: 100%;
      }
      .logo{
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%);
      }
      .button {
        position: absolute;
        width: 571px;
        height: 100px;
        left: 90px;
        border-radius: 50px;
        color: #fff;
        font-size: 42px;
        i {
          font-size: 50px;
          margin-right: 14px;
        }
      }
      .button1 {
        background-image: linear-gradient(90deg, #5c67fe 0%, #54b5ff 100%);
        bottom: 160px;
      }
      .button2 {
        bottom: 44px;
        background-image: linear-gradient(90deg, #fd6c30 0%, #fe9739 100%);
      }
    }
    .bottom {
      background-color: #2a2a2a;
      width: 100%;
      height: 32%;
      .mint-swipe {
        height: 428px;
        text-align: center;
        margin: auto;
        .title {
          font-size: 31px;
          color: #fff;
          letter-spacing: 2px;
          padding: 34px 0 22px 0;
        }
        .tip {
          padding-bottom: 16px;
          font-size: 22px;
          letter-spacing: 1px;
          color: #febf39;
        }
        .loading {
          img {
          }
          width: 550px;
          height: 220px;
          margin: auto;
        }
      }
    }
  }
}
</style>
