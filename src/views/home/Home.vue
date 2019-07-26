<template>
  <div class="home" id="home" v-title="''">
    <div class="homeTop flexB" :class="{'getLine':ifShowLine}">
      <img :src="siteConfig.wapLogo" alt />
      <div class="flexC">
        <div class="login" v-if="!userInfo" @click="$router.push({name:'login'})">登录/注册</div>
        <a v-if="siteConfig.showOldSwitch == 1" class="login" :href="oldUrl">返回旧版</a>
        <i class="iconfont" @click="$router.push({name:'service'})">&#xe6da;</i>
        <i class="iconfont icon2" @click="$router.push({name:'download'})">&#xe754;</i>
      </div>
    </div>
    <div v-if="banners.length" class="content" id="content">
      <div class="top">
        <div class="flexC">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, i) in banners" :key="i">
              <ImgLoading :src="item.img"></ImgLoading>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="timeNotice radius">
          <div class="allRecommend">
            <div class="title flexS">
              <i class="iconfont">&#xe757;</i>
              <p>
                快速入口
                <span>Fast</span>
              </p>
            </div>
            <div class="wrap" v-if="allRecommend">
              <div
                v-for="(item, i) in allRecommend"
                :key="i"
                @click="$router.push( {name: 'GamesLobby', params: { classify: item.classify }} )"
              >
                <ImgLoading :src="item.img" :small="true"></ImgLoading>
                <van-button class="flexC">{{item.name}}</van-button>
              </div>
            </div>
          </div>
          <div class="notice" @click="$router.push({name:'notice',params:{type:'0'}})">
            <img class="left" :src="cdnImg('icons/notices.png')" alt />
            <van-notice-bar color="#282828" background="#fff">{{text}}</van-notice-bar>
            <i class="iconfont">&#xe733;</i>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="common lotteryBox" v-if="AllLottery">
          <router-link :to="{ name: 'GamesLobby',params:{ classify: AllLottery.classify}}">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72a;</i>
                <div class="text">
                  <div>{{AllLottery.name}}</div>
                  <span>{{AllLottery.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="sphereBox sphereBox1">
            <div class="sphere sphere1"></div>
          </div>
          <span class="span span1"></span>
          <span class="span span2"></span>
          <div class="sphereBox sphereBox2">
            <div class="sphere sphere2"></div>
          </div>
          <div class="box">
            <div class="left">
              <div
                @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
                class="lottery"
                v-for="(item, i) in lotteryList"
                :key="i"
              >
                <ImgLoading :src="item.img" :small="true"></ImgLoading>
                <p :class="i==0?'p1':'p2'">{{item.title}}</p>
                <div class="commonStar" :class="i==0?'div1':'div2'">
                  <i class="iconfont i1" v-for="i in 5" :key="i">&#xe728;</i>
                </div>
              </div>
            </div>
            <div
              class="right"
              @click="playGame(lotteryList1.classify,lotteryList1.typeKey,lotteryList1.isHall,lotteryList1.link,lotteryList1.title)"
            >
              <ImgLoading :src="lotteryList1.img" :small="true"></ImgLoading>
              <p>{{lotteryList1.title}}</p>
              <div class="commonStar">
                <i class="iconfont i1" v-for="i in 5" :key="i">&#xe728;</i>
              </div>
            </div>
          </div>
        </div>

        <div class="common CasinoBox" v-if="AllCasino">
          <router-link :to="{ name: 'GamesLobby', params: { classify: AllCasino.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72f;</i>
                <div class="text">
                  <div>{{AllCasino.name}}</div>
                  <span>{{AllCasino.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="casino">
            <ImgLoading :src="AllCasino.recommend[0].img" :small="true"></ImgLoading>
            <div
              v-for="(item, i) in AllCasino.recommend"
              :key="i"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              class="link"
              :class="i==0?'link1':'link2'"
            ></div>
          </div>
          <div class="entrance">
            <div
              v-for="(item, i) in AllCasino.list"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <img :src="item.img" alt />
              <van-button>{{item.typeKey}}</van-button>
            </div>
          </div>
        </div>

        <div class="common SlotsBox" v-if="AllSlots">
          <router-link :to="{ name: 'GamesLobby', params: { classify: AllSlots.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72b;</i>
                <div class="text">
                  <div>{{AllSlots.name}}</div>
                  <span>{{AllSlots.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="imgBox">
            <div class="jackpot">{{jackpotNum.jackpot}}</div>
            <ImgLoading class="img1" :src="AllSlots.jackpot.img" :small="true"></ImgLoading>
          </div>
          <div class="imgBox">
            <ImgLoading class="img2" :src="AllSlots.recommend[0].img" :small="true"></ImgLoading>
            <div
              class="childBox"
              v-for="(item, i) in AllSlots.recommend"
              :class="i==0?'box1':'box2'"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <p>{{item.title}}</p>
              <div>{{item.desc}}</div>
              <div class="commonStar">
                <i class="iconfont i1" v-for="i in 4" :key="i">&#xe728;</i>
                <i class="iconfont">&#xe729;</i>
              </div>
            </div>
          </div>
          <div class="entrance">
            <div
              v-for="(item, i) in AllSlots.list"
              :key="i"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
            >
              <img :src="item.img" alt />
              <van-button>{{item.title}}</van-button>
            </div>
          </div>
        </div>

        <div class="common PokerBox" v-if="AllPoker">
          <router-link :to="{ name: 'GamesLobby', params: { classify: AllPoker.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72d;</i>
                <div class="text">
                  <div>{{AllPoker.name}}</div>
                  <span>{{AllPoker.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="poker">
            <div
              class="imgBox"
              v-for="(item, i) in AllPoker.list"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <ImgLoading :src="item.img" :small="true"></ImgLoading>
              <div class="shadow">
                <p>{{item.title}}</p>
                <div>在线人数{{item.onlineCount}}人</div>
              </div>
            </div>
          </div>
        </div>

        <div class="common fishingBox" v-if="ALLFishing">
          <router-link :to="{ name: 'GamesLobby', params: { classify: ALLFishing.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72c;</i>
                <div class="text">
                  <div>{{ALLFishing.name}}</div>
                  <span>{{ALLFishing.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="flexB fishing">
            <ImgLoading :src="ALLFishing.recommend[0].img" :small="true"></ImgLoading>
            <div
              class="fishBox"
              v-for="(item, i) in ALLFishing.recommend"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <p>{{item.title}}</p>
              <div class="commonStar">
                <i class="iconfont i1" v-for="i in 5" :key="i">&#xe728;</i>
              </div>
            </div>
          </div>
          <div class="entrance">
            <div
              v-for="(item, i) in ALLFishing.list"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <img :src="item.img" alt />
              <van-button>{{item.title}}</van-button>
            </div>
          </div>
        </div>

        <div class="common gamingBox" v-if="ALLGame  ">
          <router-link :to="{ name: 'GamesLobby', params: { classify: ALLGame.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe730;</i>
                <div class="text">
                  <div>{{ALLGame.name}}</div>
                  <span>{{ALLGame.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="gaming">
            <div
              v-for="(item, i) in ALLGame.list"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <img class="bg" :src="item.bg" alt />
              <div class="imgBox flexC">
                <img :src="item.img" alt />
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="common gamingBox sportsBox" v-if="allSports">
          <router-link :to="{ name: 'GamesLobby', params: { classify: allSports.classify } }">
            <div class="titleBox flexB">
              <div class="title flexS">
                <i class="iconfont">&#xe72e;</i>
                <div class="text">
                  <div>{{allSports.name}}</div>
                  <span>{{allSports.enName}}</span>
                </div>
              </div>
              <i class="iconfont">&#xe71b;</i>
            </div>
          </router-link>
          <div class="gaming sports">
            <div
              v-for="(item, i) in allSports.list"
              @click="playGame(item.classify,item.typeKey,item.isHall,item.link,item.title)"
              :key="i"
            >
              <img class="bg" :src="item.bg" alt />
              <div class="imgBox flexC">
                <img :class="{'bbinImg':i==0}" :src="item.img" alt />
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="home-loading">
      <van-loading size="50px" color="#fea24d" vertical></van-loading>
      <div>拼命加载中...</div>
    </div>
    <div class="download" v-show="showDownloadFlag">
      <p>
        <span class="cha" @click="DownloadHide">
          <i class="iconfont">&#xe71a;</i>
        </span>
        <span>
          下载{{
          siteConfig ? siteConfig.webName : ""
          }}APP，随时随地玩
        </span>
        <span>
          <router-link :to="{
            name: 'download'
          }">立即下载</router-link>
        </span>
      </p>
    </div>
    <van-popup v-model="NoticeShow">
      <div class="notice">
        <div class="notice-top">
          <img :src="cdnImg('icons/notice-laba.png')" alt />
          <i class="iconfont" @click="closeNotice">&#xe71a;</i>
        </div>
        <div class="notice-content">
          <div class="notice-title">{{siteConfig.H5picGGTitle}}</div>
          <div class="notice-text" v-html="siteConfig.H5picGG"></div>
        </div>
      </div>
    </van-popup>
    <playStart></playStart>
    <Footer></Footer>
  </div>
</template>

<script>
import { initHome } from "../../api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      oldUrl: "/api/auth/sLogin",
      siteConfig: "",
      allRecommend: [],
      thirdList: [],
      current: 0,
      ifShowLine: false,
      text: "",
      banners: [],
      AllLottery: null,
      lotteryList: [],
      lotteryList1: [],
      AllPoker: null,
      AllCasino: null,
      AllSlots: null,
      ALLFishing: null,
      ALLGame: null,
      allSports: null,
      NoticeShow: false,
      showDownloadFlag: true,
      skip: "/api/common/appapi/appDownload"
    };
  },
  computed: {
    ...mapGetters(["homeInfo", "userInfo", "jackpotNum", "allConfig"])
  },
  created() {
    initHome().then(res => {
      if (res.status) {
        let home = res.data;
        this.siteConfig = home.siteConfig;
        this.banners = home.banner;
        this.allRecommend = home.recommend;
        this.thirdList = home.thirdList;
        let notice = " ";
        let homeNotice = home.notice;
        console.log(home, "home");
        homeNotice.forEach(e => {
          notice += "" + e.content;
        });
        this.text = notice;
        home.thirdList.forEach(e => {
          let c = e.classify;
          if (c == "CP") {
            this.AllLottery = e;
            let list = e.list;
            for (let i = 0; i < list.length; i++) {
              this.lotteryList[i] = { ...list[i] };
            }
            this.lotteryList1 = this.lotteryList.pop();
          } else if (c == "SX") {
            this.AllCasino = e;
          } else if (c == "DZ") {
            this.AllSlots = e;
          } else if (c == "QP") {
            this.AllPoker = e;
          } else if (c == "BY") {
            this.ALLFishing = e;
          } else if (c == "DJ") {
            this.ALLGame = e;
          } else if (c == "TY") {
            this.allSports = e;
          }
        });
        if (this.$cookies.get("NoticeShow")) {
          return (this.NoticeShow = Boolean(
            this.$cookies.get("NoticeShow") * 1
          ));
        }
        this.NoticeShow = Boolean(this.siteConfig.H5ispicgg * 1);
        if (
          !this.siteConfig.isOpenFromApp &&
          sessionStorage.showDownloadFlag != 1
        ) {
          console.log(sessionStorage.showDownloadFlag != 1, "1111");

          this.showDownloadFlag = true;
        } else {
          this.showDownloadFlag = false;
        }
      }
    });
    if (this.$route.path !== "/") return;
    window.addEventListener("scroll", this.handleScroll, true);
  },

  methods: {
    ...mapActions(["getInitHome"]),
    handleScroll() {
      if (this.$route.path !== "/") return;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop < 70) {
        this.ifShowLine = false;
      } else {
        this.ifShowLine = true;
      }
    },
    onChange(index) {
      this.current = index;
    },
    closeNotice() {
      this.$cookies.set("NoticeShow", 0, 24 - new Date().getHours() + "H");
      this.NoticeShow = false;
    },
    DownloadHide() {
      this.showDownloadFlag = false;
      sessionStorage.showDownloadFlag = 1; // 存在sessionStorage中数据会变为string，true/false都是字符串
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped lang="less">
.home {
  .homeTop {
    position: fixed;
    top: 0;
    padding: 22px 0;
    // width: 690px;
    width: 100%;
    background: #fff;
    z-index: 100;
    font-size: 26px;
    color: @ThemeColor;
    .login {
      border: 1.1px solid @ThemeColor;
      padding: 4px 6px;
      border-radius: 6px;
      margin-right: 10px;
    }
    a {
      padding: 4px 6px;
      color: @ThemeColor;
      border: 1.1px solid @ThemeColor;
      border-radius: 6px;
      margin-right: 10px;
    }
    img {
      margin-left: 30px;
      width: 190px;
      max-height: 56px;
    }
    > div {
      margin-right: 30px;
    }
    i {
      font-size: 50px;
      margin-left: 6px;
    }
    .icon2 {
      font-size: 44px;
    }
  }
  .getLine {
    border-bottom: 1px solid #d8d8d8;
  }
  .content {
    margin-top: 104px;
    .top {
      position: relative;
      >.flexC{
        margin-right: 1px;
      }
      .mint-swipe {
        width: 90%;
        height: 300px !important;
        border-radius: 20px;
        box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3);
      }
      .timeNotice {
        margin: 30px 30px 30px 30px;
        background: #fff;
        font-size: 22px;
        color: #000000;
        text-align: center;
        .allRecommend {
          padding: 20px 21px 0 21px;
          .title {
            padding-left: 6px;
            i {
              font-size: 48px;
              color: #e53439;
              margin-right: 20px;
              margin-left: 14px;
            }
            // div {
            //   font-size: 26px;
            //   display: flex;
            //   color: @ThemeColor;
            //   i {
            //     transform: rotate(-90deg);
            //     margin-left: 4px;
            //   }
            // }
          }
          p {
            font-size: 32px;
            text-align: left;
            span {
              font-size: 26px;
              color: #999999;
              margin-left: 6px;
            }
          }
          .wrap {
            padding: 22px 0;
            display: flex;
            overflow-x: auto;
            .loading {
              width: 76px;
              height: 76px;
              margin: auto;
            }
            button {
              min-width: 115px;
              height: 56px;
              font-size: 26px;
              // overflow: hidden;
              // border: solid 1.1px #c2c2c2;
              // border-radius: 8px;
              // box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.2);
              // margin-right: 7px;
            }
            .allGameBtn {
              color: @ThemeColor;
              // border: solid 1.1px @ThemeColor;
            }
          }
          .wrap::-webkit-scrollbar {
            display: none !important;
            overflow-y: hidden;
          }
        }
        .notice {
          position: relative;
          padding: 10px 0;
          border-top: 1px solid #e2e2e2;
          .van-notice-bar {
            margin-left: 86px;
            width: 500px;
            padding: 0;
          }
          i {
            position: absolute;
            top: 18px;
            font-size: 40px;
            color: @ThemeColor;
            right: 30px;
          }
          .left {
            position: absolute;
            top: 20px;
            width: 40px;
            height: 37px;
            left: 30px;
          }
        }
      }
    }

    .main {
      padding-bottom: 130px;
      .common {
        background: #fff;
        width: 654px;
        margin: auto;
        padding: 0 18px 40px 18px;
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.16);
        border-radius: 12px;
        margin-bottom: 34px;

        .titleBox {
          padding: 0 20px;
          border-bottom: 1px solid #f0f0f0;
          .title {
            height: 83px;
            // align-items: flex-end;
            i {
              font-size: 60px;
              color: #e53439;
            }
            .text {
              display: flex;
              align-items: flex-end;
              div {
                color: #282828;
                font-size: 32px;
                // padding: 0 26px;
                padding-left: 20px;
                padding-right: 10px;
              }

              span {
                color: #999999;
                font-size: 26px;
              }
            }
          }
          > i {
            font-size: 36px;
            color: #cccccc;
            transform: rotate(-90deg);
          }
        }
      }

      .star {
        color: #fff;
        font-size: 28px;
      }
      .commonStar {
        display: flex;
        i {
          font-size: 26px;
          opacity: 0.8;
        }
        .i1 {
          color: #fff;
        }
      }

      .lotteryBox {
        position: relative;

        .sphereBox {
          position: absolute;
          overflow: hidden;
          width: 18px;
          height: 36px;
          top: 66px;
          background: #fff;
        }

        .sphereBox1 {
          left: 0;
        }

        .span {
          width: 10px;
          height: 36px;
          background: #fff;
          // background: @BG;
          position: absolute;
          top: 66px;
          overflow: hidden;
          &.span1 {
            left: -10px;
          }

          &.span2 {
            right: -10px;
          }
        }

        .sphereBox2 {
          right: 0;
        }

        .sphere {
          width: 36px;
          height: 36px;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        .sphere1 {
          border-radius: 0 50% 50% 0;
          margin-left: -18px;
        }

        .sphere2 {
          border-radius: 50% 0 0 50%;
          margin-right: -18px;
        }

        .box {
          display: flex;
          margin-top: 30px;
          padding: 0 12px;

          .lottery {
            width: 300px;
            height: 118px;
            position: relative;

            .loading {
              width: 100%;
              height: 100%;
            }

            p {
              position: absolute;
              color: #fff;
              font-size: 28px;
              top: 22px;
            }
            .commonStar {
              position: absolute;
              bottom: 20px;
            }
            .p1 {
              left: 20px;
            }
            .div1 {
              left: 16px;
            }
            .p2 {
              right: 20px;
            }
            .div2 {
              right: 16px;
              bottom: 26px;
            }
          }

          .lottery:first-child {
            height: 110px;
            margin-bottom: 6px;
          }

          .right {
            position: relative;

            .loading {
              width: 301px;
              height: 230px;
              margin-left: 30px;
            }

            p {
              position: absolute;
              top: 29px;
              left: 50px;
              color: #fff;
              font-size: 28px;
            }

            .commonStar {
              position: absolute;
              top: 66px;
              left: 48px;
              font-size: 30px;
            }
          }
        }
      }

      .CasinoBox {
        .casino {
          margin: 30px 0 30px 14px;
          width: 630px;
          height: 230px;
          padding-left: 14px;
          position: relative;
          img {
            position: absolute;
            left: 0;
            width: 630px;
            height: 230px;
          }
          .link {
            position: absolute;
            width: 46%;
            height: 100%;
          }
          .link1 {
            left: 0;
          }
          .link2 {
            right: 0;
          }
        }
      }

      .entrance {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 14px;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        > div {
          position: relative;
          margin-right: 10px;
          height: 90px;

          img {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 22px;
          }

          button {
            overflow: hidden;
            width: 140px;
            text-align: center;
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            span {
              font-size: 32px;
              color: #fff;
            }
          }
        }

        div:last-child {
          margin-right: 0;
        }
      }
      .entrance::-webkit-scrollbar {
        display: none !important;
        overflow-y: hidden;
      }

      .SlotsBox {
        .imgBox {
          margin-left: 12px;
          margin-top: 16px;
          position: relative;
          .jackpot {
            font-family: "bigFont" !important;
            position: absolute;
            width: 460px;
            // line-height: 80px;
            text-align: center;
            color: #fff;
            left: 40px;
            top: 70px;
            font-size: 70px;
          }
          .img1 {
            width: 103%;
            margin-bottom: 26px;
          }

          .img2 {
            width: 630px;
            height: 230px;
            margin-bottom: 14px;
          }

          .childBox {
            position: absolute;
            color: #fff;
            // font-weight: bold;
            bottom: 15px;

            p {
              font-size: 36px;
              margin-bottom: 6px;
            }

            div {
              margin-bottom: 8px;
            }
          }

          .box1 {
            left: 50px;

            p {
              color: #f4ff40;
            }
          }

          .box2 {
            right: 55px;
            text-align: right;

            p {
              color: #f4ff40;
            }
          }
        }
      }

      .poker {
        margin-top: 26px;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;

        .imgBox {
          flex: 0 0 auto;
          width: 221px;
          height: 320px;
          position: relative;
          margin-right: 20px;
          border-radius: 10px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }

          .shadow {
            position: absolute;
            bottom: 14px;
            color: #fff;
            width: 100%;
            text-align: center;

            p {
              font-size: 32px;
              margin-bottom: 6px;
            }

            div {
              font-size: 20px;
            }
          }
        }
      }

      .fishingBox {
        .fishing {
          margin: 30px 0 22px 14px;
          font-size: 28px;
          color: #fff;
          position: relative;
          img {
            width: 630px;
            height: 230px;
          }
          .fishBox {
            position: absolute;
            top: 140px;
            left: 60px;
          }
          .fishBox:last-child {
            left: 380px;
          }

          p {
            margin-bottom: 8px;
          }

          .spacing {
            width: 10px;
            height: 1px;
          }
        }
      }

      .gamingBox {
        .gaming {
          display: flex;
          padding-left: 12px;

          > div {
            position: relative;

            img {
              width: 300px;
              height: 142px;
            }

            .bg:first-child {
              margin-right: 30px;
            }

            button {
              width: 300px;
              height: 112px;
              line-height: 112px;
              font-size: 28px;
              color: #fff;
              position: absolute;
              left: 0px;
              bottom: 0px;
              border-radius: 18px;
              background: transparent;
              span {
                margin-left: -120px;
              }
            }
          }
          .imgBox {
            font-size: 28px;
            width: 300px;
            margin-top: 16px;
            img {
              width: 38px;
              height: 38px;
              margin-right: 7px;
            }
            .bbinImg {
              width: 65px;
              height: 24px;
            }
          }
        }
      }

      .sportsBox {
        .sports {
          padding-top: 30px;

          > div {
            img {
              width: 300px;
              height: 110px;
            }

            button {
              span {
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
  }
  .home-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .van-loading {
      display: inline-block;
      margin-bottom: 15px;
    }
  }
  .download {
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-size: 26px;
    color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 100px;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    z-index: 101;
    p {
      overflow: hidden;
    }
    .cha {
      display: block;
      width: 72px;
      height: 88px;
      float: left;
      i {
        font-size: 20px;
      }
    }
    span {
      display: block;
      font-size: 26px;
      height: 88px;
      line-height: 88px;
      float: left;
      width: 480px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    span:last-child {
      width: 190px;
      float: right;
      background: @Amount-Right-Btn;
      opacity: 0.9;
      a {
        display: block;
        width: 100%;
        color: #ffffff;
        height: 100%;
      }
    }
  }
  .van-popup {
    border-radius: 20px;
    overflow-y: initial;
    .notice {
      background: url("../../assets/images/notice-bg.png") no-repeat;
      background-size: 100%;
      .notice-top {
        width: 653px;
        height: 220px;
        position: relative;
        img {
          width: 265px;
          height: 170px;
          position: absolute;
          left: -20px;
          top: 38px;
        }
        i {
          color: #fff;
          font-size: 40px;
          position: absolute;
          right: 30px;
          top: 30px;
        }
      }
      .notice-content {
        width: 593px;
        height: 630px;
        overflow-y: scroll;
        padding: 0 30px;
        text-align: left;
        img {
          max-width: 100%;
        }
        .notice-title {
          font-size: 38px;
          color: #282828;
          margin-bottom: 30px;
          text-align: center;
        }
        .notice-text {
          line-height: 60px;
          text-align: left;
          font-size: 28px;
          color: #333;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
  }
}
</style>
