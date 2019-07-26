<template>
  <div class="activity flex" v-title="'活动'">
    <fixHead title="活动" rightTitle="申请记录" rightTo="/applyactivitylist" :isSlot="true"></fixHead>
    <div class="content">
      <van-tabs v-model="active" :swipe-threshold=7>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-tab v-for="(arr,i) in allConfig.activityNavList" :key="i" :class="{vanTab5:i>4}">
            <div slot="title" @click="changeTab(arr.type)">{{arr.name}}</div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <div v-for="(item,i) in activity" :key="i" class="wrap">
                <div @click="showContant(i)">
                <img v-if="item.endTime==0" :src="cdnImg('icons/always.png')" alt />
                <img v-else-if="item.startTime>newDate" :src="cdnImg('icons/soon.png')" alt />
                <img v-else-if="item.endTime>0&&item.endTime>=newDate" :src="cdnImg('icons/now.png')" alt />
                <img v-else :src="cdnImg('icons/end.png')" alt />
                <div class="banner">
                  <ImgLoading :src="item.image" alt />
                </div>
                <div class="headTitle">{{item.title}}</div>
                <div class="description">{{item.description}}</div>
                <div class="time" v-if="item.startTime>newDate">
                  距离活动开始：
                  <activityTimer :time="item.startTime - newDate" @changeDate="changeDate"></activityTimer>
                </div>
                <div class="time" v-else-if="item.endTime>0&&item.endTime>=newDate">
                  距离活动结束：
                  <activityTimer :time="item.endTime - newDate" @changeDate="changeDate"></activityTimer>
                </div>
                <div class="flexB" :class="{'radiu':showIndex!==i}">
                  <div class="title">
<!--                     <img class="fire" :src="cdnImg('/find/fire.png')" alt />-->
                    <p>查看详情</p>
                  </div>
                  <i class="iconfont" :class="{'rotate':showIndex===i}">&#xe71b;</i>
                </div>
                </div>
                <div :class="[i === showIndex ? 'show1' : 'hide1']" class="activityDetail">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </van-list>
          </van-tab>
        </van-pull-refresh>
      </van-tabs>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { activity, appllyActivity } from "../../api";
import { mapGetters } from "vuex";
import ImgLoading from "../../components/common/ImgLoading";
export default {
  name: "Activity",
  components: { ImgLoading },
  data() {
    return {
      newDate: "",
      isLoading: false,
      loading: false,
      finished: false,
      active: 0,
      showIndex: "",
      parameter: {
        type: "",
        page: 1,
        pageSize: 10
      },
      activity: []
    };
  },
  created() {
    this.init();
    this.$nextTick(() => {
      this.slidingPage();
    });
  },
  updated() {
    let that = this;
    let id;
    let ApplyBtn = document.querySelectorAll(".apply");
    for (let i = 0; i < ApplyBtn.length; i++) {
      let ApplyBtnOne = ApplyBtn[i];
      ApplyBtnOne.onclick = function() {
        id = this.getAttribute("id");
        if (!id) {
          id = this.getAttribute("data-id");
        }
        that.getApplication(id);
      };
    }
  },
  computed: {
    ...mapGetters(["allConfig"])
  },
  methods: {
    changeDate(){
      this.newDate = parseInt(new Date().getTime() / 1000);
    },
    slidingPage() {
      let Slider = document.getElementsByClassName("activity")[0];
      let startX;
      let endX;
      let that = this;
      Slider.addEventListener("touchstart", function(e) {
        e = window.event || e;
        startX = e.changedTouches[0].clientX;
      });
      Slider.addEventListener("touchend", function(e) {
        e = window.event || e;
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 70) {
          if (that.active == that.allConfig.activityNavList.length - 1) return;
          that.active++;
          that.changeTab(that.allConfig.activityNavList[that.active].type);
        } else if (startX - endX <= -70) {
          if (that.active == 0) return;
          that.active--;
          that.changeTab(that.allConfig.activityNavList[that.active].type);
        }
      });
    },
    showContant(i) {
      this.showIndex = this.showIndex === i ? "" : i;
    },
    changeTab(type) {
      this.activity = [];
      this.finished = false;
      this.parameter.page = 1;
      this.parameter.type = type;
      this.init();
    },
    init() {
      this.newDate = parseInt(new Date().getTime() / 1000);
      activity(this.parameter).then(res => {
        if (res.status) {
          this.activity = res.data.list;
          console.log(res.data.list, "res.data.list111111111111");
          if (res.data.list.length < this.parameter.pageSize) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        }
      });
    },
    getApplication(id) {
      appllyActivity({ articleId: id })
        .then(res => {
          this.$toast(res.msg);
        })
        .catch(err => {
          console.log(err);
          this.$toast("活动申请失败");
        });
    },
    onRefresh() {
      this.parameter.page = 1;
      this.finished = false;
      let that = this;
      new Promise(function(resolve) {
        activity(that.parameter).then(res => {
          if (res.status) {
            that.activity = res.data.list;
            resolve(res.data.list);
          }
        });
      }).then(res => {
        if (res.length) {
          that.$toast("刷新成功");
        } else {
          that.$toast("暂无更多数据");
        }
        that.isLoading = false;
      });
    },
    onLoad() {
      this.parameter.page++;
      activity(this.parameter).then(res => {
        if (res.data.list.length) {
          console.log(res.data.list, "加载更多");
          this.activity = this.activity.concat(res.data.list);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.activity {
  .fixHead {
    background: #fff;
  }
  .content {
    padding: 210px 0 80px 0;
    .wrap {
      position: relative;
      margin: 0 22px 40px 22px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.24);
      >div{
        > img {
          position: absolute;
          right: 0;
          width: 120px;
        }
      }
      .banner {
        height: 220px;
        margin: 0 auto 20px;
      }
      .headTitle {
        color: #cf453a;
        font-size: 30px;
        padding-left: 20px;
      }
      .description,
      .time {
        color: #999999;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 1px;
      }
      .description {
        padding: 20px 0 30px 20px;
      }
      .time {
        padding: 0 0 30px 20px;
        span {
          color: red;
        }
      }
      .flexB {
        padding: 26px 20px 26px 20px;
        border-top: 1.6px solid #e1e1e1;
        background: #fff;
        .title {
          display: flex;
          .fire {
            width: 40px;
            height: 40px;
          }
          p {
            font-size: 26px;
            color: #282828;
          }
        }
        i {
          font-size: 34px;
          color: #cccccc;
          transition: 0.4s;
        }
      }
      .radiu {
        border-radius: 0 0 18px 18px;
      }
    }
    .activityDetail {
      margin: auto;
      background: #fff;
      overflow: hidden;
      line-height: 40px;
      letter-spacing: 2px;
      height: 0;
      max-height: 0;
      transition: 2s;
      width: 650px;
      border-radius: 0 0 15px 15px;
      table {
        width: 100%;
      }
      .application {
        width: 97%;
        height: 50px;
        display: block;
        line-height: 50px;
        margin: 20px auto;
        background: @red;
        color: #fff;
        border: 0;
        outline: none;
      }
      .gray {
        background: gray;
      }
      img {
        max-width: 100%;
      }
      .MsoNormalTable {
        max-width: 100% !important;
      }
    }
    .show1 {
      max-height: 25000px;
      height: auto;
      transition: 3s;
      overflow: hidden;
    }
    .hide1 {
      max-height: 0;
      height: 0;
      transition: 3s;
    }
  }
}
</style>
