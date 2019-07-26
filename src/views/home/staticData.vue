<template>
  <div class="gamesLobby flex" v-title="'游戏大厅'">
    <Header title="游戏大厅"></Header>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab v-for="(arr,i) in gamesLobby" :key="i" :title="arr.name">
          <div v-for="(item,i) in arr.list" :key="i" class="wrap" :class="{'goRight':i%2 !=0}">
            <div class="box flexB" :class="[{'small':arr.name=='电子'}]">
              <img class="imgBg" :src="item.bg">
              <img class="people" :src="item.people">
              <div class="text">
                <p>{{item.title}}</p>
                <div class="tip">{{item.tip}}</div>
                <div class="enter">进入游戏</div>
              </div>
              <img class="imgLogo" :src="item.logo">
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "GamesLobby",
  data() {
    return {
      active: 0,
      gamesLobby: [
        {
          name: "彩票",
          list: [
            {
              bg: "/gamesLobby/lottery/jxBg.png",
              title: "吉祥官方彩",
              tip: "全新玩法 超高品质体验",
              logo: "/gamesLobby/lottery/jxLogo.png"
            },
            {
              logo: "/gamesLobby/lottery/vrBg.png",
              title: "VR视讯彩",
              tip: "真人视讯超真实意境",
              bg: "/gamesLobby/lottery/vrLogo.png"
            },
            {
              bg: "/gamesLobby/lottery/qgBg.png",
              title: "QG刮刮彩",
              tip: "以小博大 刮出精彩",
              logo: "/gamesLobby/lottery/qgLogo.png"
            }
          ]
        },
        {
          name: "棋牌",
          list: [
            {
              bg: "/gamesLobby/chess/csBg.png",
              people: "/gamesLobby/chess/cs.png",
              title: "CS易游",
              tip: "“线上棋牌室” 方便快捷",
              logo: "/gamesLobby/chess/csLogo.png"
            },
            {
              logo: "/gamesLobby/chess/cqBg.png",
              people: "/gamesLobby/chess/cq.png",
              title: "CQ9",
              tip: "稳定游戏公平性及获利率",
              bg: "/gamesLobby/chess/cqLogo.png"
            },
            {
              bg: "/gamesLobby/chess/blBg.png",
              people: "/gamesLobby/chess/bl.png",
              title: "博乐棋牌",
              tip: "博出精彩 乐在其中",
              logo: "/gamesLobby/chess/blLogo.png"
            },
            {
              logo: "/gamesLobby/chess/fgBg.png",
              people: "/gamesLobby/chess/fg.png",
              title: "FG",
              tip: "给你完美的用户体验",
              bg: "/gamesLobby/chess/fgLogo.png"
            },
            {
              bg: "/gamesLobby/chess/vgBg.png",
              people: "/gamesLobby/chess/vg.png",
              title: "VG",
              tip: "久经市场考验 稳定可靠",
              logo: "/gamesLobby/chess/vgLogo.png"
            }
          ]
        },
        {
          name: "视讯",
          list: [
            {
              bg: "/gamesLobby/video/bbBg.png",
              people: "/gamesLobby/video/bb.png",
              title: "BBIN",
              tip: "高规格打造 绝佳游戏体验",
              logo: "/gamesLobby/video/bbLogo.png"
            },
            {
              logo: "/gamesLobby/video/bgBg.png",
              people: "/gamesLobby/video/bg.png",
              title: "BG",
              tip: "玩家如临其境的感官体验",
              bg: "/gamesLobby/video/bgLogo.png"
            },
            {
              bg: "/gamesLobby/video/lbBg.png",
              people: "/gamesLobby/video/lb.png",
              title: "LEBO",
              tip: "标准化的真人视讯摄影棚",
              logo: "/gamesLobby/video/lbLogo.png"
            },
            {
              logo: "/gamesLobby/video/agBg.png",
              people: "/gamesLobby/video/ag.png",
              title: "AG",
              tip: "多元化娱乐服务",
              bg: "/gamesLobby/video/agLogo.png"
            },
            {
              bg: "/gamesLobby/video/ogBg.png",
              people: "/gamesLobby/video/og.png",
              title: "OG",
              tip: "美女主播、专业荷官",
              logo: "/gamesLobby/video/ogLogo.png"
            }
          ]
        },
        {
          name: "电子",
          list: [
            {
              bg: "/gamesLobby/electronic/mgBg.png",
              title: "MG",
              tip: "元素多样化 应有尽有",
              logo: "/gamesLobby/electronic/mgLogo.png"
            },
            {
              logo: "/gamesLobby/electronic/ptBg.png",
              title: "PT",
              tip: "玩家如临其境的感官体验",
              bg: "/gamesLobby/electronic/ptLogo.png"
            },
            {
              bg: "/gamesLobby/electronic/cqBg.png",
              title: "CQ9",
              tip: "标准化的真人视讯摄影棚",
              logo: "/gamesLobby/chess/cqLogo.png"
            },
            {
              logo: "/gamesLobby/electronic/agBg.png",
              title: "AG",
              tip: "多元化娱乐服务",
              bg: "/gamesLobby/video/agLogo.png"
            },
            {
              bg: "/gamesLobby/electronic/bbBg.png",
              title: "BBIN",
              tip: "美女主播、专业荷官",
              logo: "/gamesLobby/video/bbLogo.png"
            },
            {
              logo: "/gamesLobby/electronic/fgBg.png",
              title: "FG",
              tip: "创新技术 开发多样化",
              bg: "/gamesLobby/chess/fgLogo.png"
            },
            {
              bg: "/gamesLobby/electronic/bgBg.png",
              title: "BG",
              tip: "高质量、风格独特",
              logo: "/gamesLobby/video/bgLogo.png"
            },
            {
              logo: "/gamesLobby/electronic/jdbBg.png",
              title: "JDB",
              tip: "公平 安全 获利第一",
              bg: "/gamesLobby/electronic/jdbLogo.png"
            },
            {
              bg: "/gamesLobby/electronic/csBg.png",
              title: "CS",
              tip: "百种老虎机供君挑选",
              logo: "/gamesLobby/chess/csLogo.png"
            },
            {
              logo: "/gamesLobby/electronic/blBg.png",
              title: "博乐",
              tip: "百万大奖 随机出现",
              bg: "/gamesLobby/chess/blLogo.png"
            }
          ]
        },
        {
          name: "电竞",
          list: [
            {
              bg: "/gamesLobby/esports/fyBg.png",
              people: "/gamesLobby/esports/fy.png",
              title: "泛亚电竞",
              tip: "元素多样化 应有尽有",
              logo: "/gamesLobby/esports/fyLogo.png"
            },
            {
              logo: "/gamesLobby/esports/djnBg.png",
              people: "/gamesLobby/esports/djn.png",
              title: "电竞牛",
              tip: "玩家如临其境的感官体验",
              bg: "/gamesLobby/sports/imLogo.png"
            }
          ]
        },
        {
          name: "体育",
          list: [
            {
              bg: "/gamesLobby/sports/bbBg.png",
              people: "/gamesLobby/sports/bb.png",
              title: "BBIN体育",
              tip: "多种玩法任你挑选",
              logo: "/gamesLobby/video/bbLogo.png"
            },
            {
              logo: "/gamesLobby/sports/imBg.png",
              people: "/gamesLobby/sports/im.png",
              title: "IM体育",
              tip: "玩家如临其境的感官体验",
              bg: "/gamesLobby/sports/imLogo.png"
            }
          ]
        }
      ],
      activity: [
        {
          name: "全部活动",
          list: [
            {
              bg: "/home/banner1.png",
              title: "棕香情浓，棕礼相送",
              content:
                "棕香情意浓，吉祥娱乐送好礼；万水千山总是情，优惠送你送不停。五月五，端午佳节，吉祥娱乐为您奉上精心准备的福棕礼盒，VIP4及以上贵宾，免费赠送。祝您财源广进，中！中！中！"
            },
            {
              bg: "/home/banner1.png",
              title: "网银转账大赠送，存款即送0.5%",
              content:
                "棕香情意浓，吉祥娱乐送好礼；万水千山总是情，优惠送你送不停。五月五，端午佳节，吉祥娱乐为您奉上精心准备的福棕礼盒，VIP4及以上贵宾，免费赠送。祝您财源广进，中！中！中！"
            },
            {
              bg: "/home/banner1.png",
              title: "网银转账大赠送，存款即送0.5%",
              content:
                "棕香情意浓，吉祥娱乐送好礼；万水千山总是情，优惠送你送不停。五月五，端午佳节，吉祥娱乐为您奉上精心准备的福棕礼盒，VIP4及以上贵宾，免费赠送。祝您财源广进，中！中！中！"
            }
          ]
        },
        {
          name: "彩票活动",
          list: [
            {
              bg: "/home/banner1.png",
              title: "棕香情浓，棕礼相送"
            }
          ]
        },
        {
          name: "彩票活动",
          list: [
            {
              bg: "/home/banner1.png",
              title: "棕香情浓，棕礼相送"
            }
          ]
        },
        {
          name: "彩票活动",
          list: [
            {
              bg: "/home/banner1.png",
              title: "棕香情浓，棕礼相送"
            }
          ]
        },
        {
          name: "彩票活动",
          list: [
            {
              bg: "/home/banner1.png",
              title: "棕香情浓，棕礼相送"
            }
          ]
        }
      ]
    };
  },
  created() {
    // this.active = this.$route.query.type;
    // if (!this.allGame) {
    //   this.getAllGame();
    // }
    // console.log(this.allGame,'allGame')
  },
  // computed: {
  //   ...mapGetters(["allGame"])
  // },
  // methods: {
  //   ...mapActions(["getAllGame"]),
  // }
};
</script>

<style scoped lang="less">
.gamesLobby {
  .content {
    background: @BG;
    padding-bottom: 20px;
    .wrap {
      display: flex;
      .box {
        box-shadow: 0px 4px 8px 0px rgba(28, 28, 28, 0.42);
        margin-top: 64px;
        width: 690px;
        height: 200px;
        border-radius: 0 100px 100px 0;
        background: #f9f9fa;
        position: relative;
        .people {
          position: absolute;
          bottom: 0;
          left: 20px;
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
          text-align-last: left;
          position: absolute;
          left: 146px;
        }
      }
    }
  }
}
</style>
