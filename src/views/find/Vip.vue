<template>
  <div class="VIP flex" v-title="'我的VIP'">
    <div class="top">
      <div class="header">
        <span>我的VIP</span>
        <i class="iconfont backI" @click="back">&#xe629;</i>
        <i class="rightI" @click="$router.push({name:'vipDetails'})">VIP详情</i>
      </div>
    </div>
    <div class="content" v-if="levelList">
      <div class="vip-top">
        <div class="vip-tx">
<!--          <img src="../../assets/images/tx.png" alt />-->
          <div>
            <img :src="userInfo.avatar" alt="" />
          </div>
        </div>
        <div class="vip-info">
          <div class="vip-user">
            <span class="name">{{ userInfo.username }}</span>
            <span class="vip-dj"><span class="dj">{{ levelName }}</span></span>
          </div>
          <div class="bar__3Koza">
            <div class="progress-bar__1iDLp">
              <div class="barleft__39pzP" :style="value"></div>
            </div>
          </div>
          <div class="vip__lPmUr">
            <span>{{ levelName }}</span>
            <span>{{ nextLevelName }}</span>
          </div>
          <div class="up-info__35Qth">
            距下级还差{{ differCode }}打码量，晋级到{{nextLevelName}}
            <em>获得{{nextBonusUp}}元晋级礼金</em>
          </div>
        </div>
      </div>
      <div class="infos">
        <div class="vip-m__3sTvo">
          <div class="v-icon__Q904o">
            <img src="../../assets/images/vip_1.png" alt />
            <span>{{ changeLevelName?changeLevelName:'加载中' }}</span>
          </div>
          <div class="v-top__K8hBr">
            <div class="v-l__3yhMr">
              <img src="../../assets/images/vip_2.png" alt />
              <span @click="Last" :class="{on:levelIndex > 0}">上一等级</span>
            </div>
            <div class="v-r__2ONuC">
              <span @click="Next" :class="{on:levelIndex < levelList.length - 1}">下一等级</span>
              <img src="../../assets/images/vip_3.png" alt />
            </div>
          </div>
          <div class="v-main__nZR52">
            <div class="vm__WqPWO">
              <div class="m-list__1Y9Ly">
                <p class="t-vm__3Py4-">
                  <img src="../../assets/images/vip_4.png" alt />
                  <span>晋级彩金</span>
                </p>
                <h1 class="m-money__2EU5d">
                  {{nowBonusUp}}
                  <span>元</span>
                </h1>
                <h2>当前等级可领取</h2>
                <div class="l-btn__1Atwe">
                  <span :class="nowLevelStatus.bonusUpStatus && levelName===changeLevelName?'yes':'no'"
                    @click="getBonus((nowLevelStatus.bonusUpStatus && levelName===changeLevelName),'bonusUp')"
                  >{{(nowLevelStatus.bonusUpStatus  && levelName===changeLevelName)?'立即领取':'暂不可领取'}}</span>
                </div>
              </div>
              <div class="m-list__1Y9Ly">
                <p class="t-vm__3Py4-">
                  <img src="../../assets/images/vip_5.png" alt />
                  <span>周礼金</span>
                </p>
                <h1 class="m-money__2EU5d">
                  {{nowBonusWeek}}
                  <span>元</span>
                </h1>
                <h2>当前等级可领取</h2>
                <div class="l-btn__1Atwe">
                  <span :class="nowLevelStatus.bonusWeekStatus && levelName===changeLevelName?'yes':'no'"
                        @click="getBonus((nowLevelStatus.bonusWeekStatus && levelName===changeLevelName),'bonusWeek')"
                  >{{(nowLevelStatus.bonusWeekStatus  && levelName===changeLevelName)?'立即领取':'暂不可领取'}}</span>
                </div>
              </div>
            </div>
            <div class="vm__WqPWO">
              <div class="m-list__1Y9Ly">
                <p class="t-vm__3Py4-">
                  <img src="../../assets/images/vip_6.png" alt />
                  <span>月礼金</span>
                </p>
                <h1 class="m-money__2EU5d">
                  {{nowBonusMonth}}
                  <span>元</span>
                </h1>
                <h2>当前等级可领取</h2>
                <div class="l-btn__1Atwe">
                  <span :class="nowLevelStatus.bonusMonthStatus && levelName===changeLevelName?'yes':'no'"
                        @click="getBonus((nowLevelStatus.bonusMonthStatus && levelName===changeLevelName),'bonusMonth')"
                  >{{(nowLevelStatus.bonusMonthStatus && levelName===changeLevelName)?'立即领取':'暂不可领取'}}</span>
                </div>
              </div>
              <div class="m-list__1Y9Ly">
                <p class="t-vm__3Py4-">
                  <img src="../../assets/images/vip_7.png" alt />
                  <span>签到彩金</span>
                </p>
                <h1 class="m-money__2EU5d">
                  {{nowbonusSignTotal}}
                  <span>元</span>
                </h1>
                <h2>签到周期完成彩金</h2>
                <div class="l-btn__1Atwe">
                  <span class="yes" @click="getBonus(true,'bonusSignTotal')" >立即领取</span>
                </div>
              </div>
            </div>
          </div>
          <div class="info__2XAe-">
            <p>尊贵的{{ levelName }}会员，您可享受以上专属权益</p>
            <h1>等级越高特权越多哦！</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMember,memberLevelBonus } from "../../api";
import { mapGetters } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "vip",
  data() {
    return {
      level: "",
      levelList: "",
      levelIndex: "",
      levelName: "",
      nextLevelName: "",
      value:{width:""},
      nowLevelStatus: "",
      nextBonusUp: "",
    };
  },
  created() {
    console.log(this.userInfo);
    this.getMemberList();
  },
  computed: {
    ...mapGetters(["userInfo"]),
    changeLevelName(){
      return this.levelList[this.levelIndex].levelName
    },
    nowBonusUp() {
      return this.levelList[this.levelIndex].bonusUp
    },
    nowBonusWeek() {
      return this.levelList[this.levelIndex].bonusWeek
    },
    nowBonusMonth() {
      return this.levelList[this.levelIndex].bonusMonth
    },
    nowbonusSignTotal() {
      return this.levelList[this.levelIndex].bonusSignTotal
    }
  },
  methods: {
    getMemberList() {
      getMember({ level: this.level }).then(res => {
        if (res.status) {
          this.$store.commit("CHANGE_VIP",res.data);
          let currentCode = parseFloat(Number(this.userInfo.scoreTotal));
          let maxCode = parseInt(Number(res.data.nextLevel.minScore));
          this.differCode = maxCode - currentCode;
          this.value.width = (currentCode / maxCode) * 100 + "%";
          this.level = res.data.nowLevel.level;
          this.levelName = res.data.nowLevel.levelName;
          this.nextLevelName = res.data.nextLevel.levelName;
          this.nextBonusUp = parseInt(res.data.nextLevel.bonusUp);
          this.levelList = res.data.levelList;
          this.nowLevelStatus = res.data.nowLevelStatus;
          for(let i =0;i<this.levelList.length;i++) {
            let itemOne = this.levelList[i];
            if(this.levelName === itemOne.levelName){
              console.log(i);
              this.levelIndex = i;
            }
          }
        }
      });
    },
    Last() {
      if(this.levelIndex > 0 ) {
        this.levelIndex--;
      }else {
        this.$toast("已经最低了噢");
      }
    },
    Next() {
      if(this.levelIndex < this.levelList.length - 1) {
        this.levelIndex ++;
      }else {
        this.$toast("已经到最高等级啦");
      }
    },
    getBonus(flag,bonusType) {
      if(flag) {
        if(bonusType=="bonusSignTotal") {
          this.$store.dispatch("getCheckInList");
          return this.$store.commit("SET_CHECKIN_SHOW",1)
        }
        console.log(bonusType,this.level);
        memberLevelBonus({bonusType:bonusType,level:this.level}).then(res=>{
          if(res.status) {
            this.getMemberList()
          }
          Toast(res.msg);
        })
      }
    }
  }
};
</script>

<style scoped lang="less">
.VIP {
  background: @BG;
  .top {
    background: #f69238;
    background-size: cover;
    width: 100%;
    height: 100px;
    .header {
      width: 100%;
      height: 100px;
      overflow: hidden;
      text-align: center;
      position: relative;
      color: #fff;
      span {
        font-size: 42px;
        line-height: 100px;
      }
      .backI {
        font-size: 46px;
        position: absolute;
        top: 0;
        padding: 0 10px;
        left: 20px;
        line-height: 100px;
      }
      .rightI {
        position: absolute;
        right: 20px;
        font-size: 36px;
        line-height: 95px;
        font-style: normal;
      }
    }
  }
  .content {
    .vip-top {
      background: @User-vip-Bg;
      background-size: 100% 100%;
      display: flex;
      width: 100%;
      height: 400px;
      .vip-tx {
        width: 20%;
        padding: 30px 20px;
        div {
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .vip-info {
        flex-grow: 1;
        color: #fff;
        .vip-user {
          height: 100px;
          font-size: 42px;
          line-height: 100px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .vip-dj {
            margin-left: 20px;
            display: inline-block;
            background: url(../../assets/images/vip-dj.png) no-repeat left;
            background-size: 100%;
            width: 220px;
            height: 100px;
            font-size: 30px;
            color: #5a3900;
            position: relative;
            .dj {
              position: absolute;
              width: 140px;
              left: 70px;
              text-align: center;
              line-height: 110px;
            }
          }
        }
        .bar__3Koza {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 90%;
          margin-top: 0.133333rem;
          font-size: 0.35rem;
          .progress-bar__1iDLp {
            position: relative;
            width: 100%;
            height: 0.16rem;
            border-radius: 0.266667rem;
            margin: 0.08rem 0 0.133333rem;
            background: #734c35;
            overflow: hidden;
            .barleft__39pzP {
              position: absolute;
              left: 0;
              width: 0;
              height: 0.16rem;
              background: #f4d6a7;
              border-radius: 0.266667rem;
              transition: 0.3s;
            }
          }
        }
        .vip__lPmUr {
          width: 90%;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-bottom: 0.133333rem;
        }
        .up-info__35Qth {
          width: 510px;
          margin-right: 30px;
          font-size: 22px;
          em {
            font-style: normal;
            color: yellow;
          }
        }
      }
    }
    .infos {
      position: relative;
      margin-top: -140px;
      .vip-m__3sTvo {
        position: absolute;
        border-radius: 50px;
        width: calc(100% - 60px);
        top: 50px;
        left: 30px;
        background-color: #fff;
        .v-icon__Q904o {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: -6px;
          text-align: center;
          span {
            text-shadow: -0.026667rem -0.026667rem #f0f0f0,
              0.026667rem 0.026667rem #997660;
            font-weight: 700;
            position: absolute;
            left: 50%;
            top: 0.133333rem;
            color: #6f5620;
            font-size: 0.48rem;
            transform: translate(-50%);
            white-space: nowrap;
          }
        }
        .v-top__K8hBr {
          height: 80px;
          width: calc(100% - 60px);
          display: flex;
          justify-content: space-between;
          padding: 0 30px;
          .v-l__3yhMr {
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            font-size: 30px;
            text-indent: 10px;
            letter-spacing: 0.064rem;
            color: #949494;
            .on {
              color: #333;
            }
          }
          .v-r__2ONuC {
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            font-size: 30px;
            color: #949494;
            .on {
              color: #333;
            }
            span {
              padding-right: 10px;
            }
          }
        }
        .v-main__nZR52 {
          margin: 0 30px;
          .vm__WqPWO {
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin: 20px 0;
            display: flex;
            .m-list__1Y9Ly {
              position: relative;
              width: 48%;
              height: 4.453333rem;
              background: #eeeeee;
              border-radius: 20px;
              text-size-adjust: 100%;
              .t-vm__3Py4- {
                font-size: 0.48rem;
                color: #b1823a;
                -ms-flex-align: center;
                align-items: center;
                line-height: 2;
                img {
                  width: 0.64rem;
                  height: 0.6rem;
                  margin: 0.2rem 0.32rem 0 0.32rem;
                  float: left;
                }
              }
              .m-money__2EU5d {
                text-align: center;
                font-size: 0.933333rem;
                color: #b1823a;
                letter-spacing: 0;
                white-space: nowrap;
                span {
                  font-size: 0.48rem;
                  color: #8a6b26;
                }
              }
              h2 {
                font-size: 0.346667rem;
                color: #b1823a;
                text-align: center;
              }
              .l-btn__1Atwe {
                display: flex;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100px;
                background: #d7d4cd;
                border-radius: 0 0 20px 20px;
                span {
                  display: inline-block;
                  color: #fff;
                  width: 80%;
                  height: 60px;
                  line-height: 60px;
                  text-align: center;
                  border-radius: 50px;
                }
                .no {
                  background: linear-gradient(#b4b4b4, #6d6e6d);
                }
                .yes {
                  background: linear-gradient(#e9ad52, #ad7a2c);
                }
              }
            }
          }
        }
        .info__2XAe- {
          text-align: center;
          font-size: 28px;
          width: 100%;
          position: absolute;
          padding: 30px 0;
          color: #6d6d6d;
          line-height: 50px;
          h1 {
            color: #b87e31;
          }
        }
      }
    }
  }
}
</style>
