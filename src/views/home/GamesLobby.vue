<template>
  <div class="gamesLobby" v-title="'游戏大厅'">
    <Header title="游戏大厅" :isSlot="true">
      <i class="iconfont back" @click="goHome">&#xe629;</i>
    </Header>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab v-for="(arr,i) in allGame" :key="i">
          <div slot="title" @click="changeTab(i,arr.classify)">{{arr.name}}</div>
          <div
            v-for="(item,i) in arr.list"
            :key="i"
            class="wrap"
            :class="{'goRight':item.show=='right'}"
          >
            <div
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              class="box flexB"
              :class="[{'small':arr.classify=='DZ'}]"
            >
              <img class="imgBg" :src="item.show=='left'?item.bgImg:item.img" alt />
              <img class="people" :src="item.person" alt />
              <div class="text">
                <p>{{item.title}}</p>
                <div class="tip">{{item.desc}}</div>
                <div class="enter">进入游戏</div>
              </div>
              <img class="imgLogo" :src="item.show=='left'?item.img:item.bgImg" alt />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <playStart></playStart>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GamesLobby",
  data() {
    return {
      active: 0
    };
  },
  created() {
    // console.log(this.allGame);
    this.$nextTick(() => {
      this.slidingPage();
    });
    if (!this.allGame) {
      this.getAllGame();
    }
  },
  activated() {
    if (this.allGame) {
      this.getActive(this.allGame);
    }
  },
  computed: {
    ...mapGetters(["allGame"])
  },
  watch: {
    allGame(newVal) {
      if (newVal) {
        this.getActive(newVal);
      }
    }
  },
  methods: {
    ...mapActions(["getAllGame"]),
    slidingPage() {
      let Slider = document.getElementsByClassName("gamesLobby")[0];
      // console.log(Slider, "Slider");
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
      // console.log(that.active,that.allGame.length-1, "that.allGame.length");
          if (that.active==that.allGame.length-1) return
          that.active++
        } else if (startX - endX <= -70) {
          // console.log(that.active,that.allGame.length-1, "that.allGame.length");
          if (that.active==0) return
          that.active--
        }
      // console.log(startX,endX,startX - endX, "startXendX");
      });
      
    },
    getActive(newVal) {
      let classify = this.$route.params.classify;
      newVal.forEach((e, i) => {
        // console.log(e, e.classify, classify, e.classify == classify, "e");
        if (e.classify == classify) {
          this.active = i;
        }
      });
    },
    // goBack() {
    //   this.$router.push({ name: "home" });
    // },
    changeTab(index, classify) {
      this.$router.replace({ name: "GamesLobby", params: { classify: classify } });
      this.active = index;
    },
    goHome(){
      this.$router.replace({ name: "home" });
    }
  }
};
</script>

<style scoped lang="less">
.gamesLobby {
  min-height: 100%;
  background: @BG;
  .headerBox {
    position: fixed;
    top: 0;
    z-index: 100;
    background: #fff;
  }
  .content {
    padding-top: 100px;
    padding-bottom: 20px;
    .wrap {
      display: flex;
      .box {
        box-shadow: 0 4px 8px 0 rgba(28, 28, 28, 0.42);
        margin-top: 74px;
        width: 690px;
        height: 200px;
        border-radius: 0 100px 100px 0;
        background: #f9f9fa;
        position: relative;
        .people {
          position: absolute;
          bottom: 0;
          left: 20px;
          // width: 180px;
          height: 260px;
        }
        .imgBg {
          min-width: 290px;
          max-width: 340px;
          height: 200px;
        }
        .imgLogo {
          height: 90px;
          margin-right: 40px;
        }
        .text {
          width: 300px;
          position: absolute;
          left: 240px;
          top: 30px;
          font-size: 32px;
          text-align: right;
          p {
            color: #333333;
            margin-bottom: 4px;
          }
          .tip {
            font-size: 26px;
            color: #666666;
            white-space: nowrap;
          }
          .enter {
            color: #fea24d;
            margin-top: 20px;
          }
        }
      }
      .small {
        margin-top: 40px;
        height: 186px;
        .imgBg {
          height: 186px;
        }
        .text {
          top: 20px;
        }
      }
    }
    .goRight {
      justify-content: flex-end;
      .box {
        border-radius: 100px 0 0 100px;
        position: relative;
        .people {
          bottom: 0;
          left: unset;
          right: 20px;
        }
        .imgLogo {
          width: 340px;
          height: 200px;
          margin-right: 0;
        }
        .imgBg {
          min-width: 90px;
          height: 90px;
          margin-left: 40px;
        }
        .text {
          text-align: left;
          position: absolute;
          left: 146px;
        }
      }
    }
  }
}
</style>
