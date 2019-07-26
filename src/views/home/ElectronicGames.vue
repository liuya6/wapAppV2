<template>
  <div class="electronic" v-title="'游戏大厅'">
    <div class="top">
      <i class="iconfont" @click="goBack">&#xe629;</i>
      {{ gameName }}
    </div>
    <div class="content">
      <ul v-if="gameList.length">
        <li v-for="(other, j) in gameList" :key="j">
          <div @click="playGame('','','',other.link)">
            <i>
              <ImgLoading :src="imgUrl(other.img, '')" />
            </i>
            <p>{{ other.title }}</p>
          </div>
        </li>
      </ul>
      <div v-else class="ele-loading">
        <van-loading size="50px" color="#fea24d" vertical></van-loading>
        <div>拼命加载中...</div>
      </div>
    </div>
    <playStart></playStart>
  </div>
</template>

<script>
import { thirdHall } from "../../api";
import ImgLoading from "../../components/common/ImgLoading";
export default {
  name: "ElectronicGames",
  components: {ImgLoading},
  data() {
    return {
      gameList: [],
      title: ""
    };
  },
  created() {
    // document.documentElement.scrollTop = 0;
    this.initHall();
  },
  beforeDestroy() {
    this.gameList = []
  },
  computed: {
    gameName() {
      switch (this.$route.params.classify) {
        case "BY":
          return this.$route.params.typeKey + "捕鱼";
        default:
          return this.$route.params.typeKey + "电子";
      }
    }
  },
  methods: {
    initHall() {
      thirdHall({
        typeKey: this.$route.params.typeKey,
        classify: this.$route.params.classify
      }).then(res => {
        this.gameList = res.data;
        console.log(this.gameList);
      });
    },
    goBack() {
      this.gameList = [];
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped lang="less">
.electronic {
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    z-index: 1;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }

    span {
      color: white;
      font-weight: normal;
      position: absolute;
      right: 25px;
      font-size: 30px;
    }
  }
  .content {
    padding-top: 100px;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      li {
        overflow: hidden;
        width: 25%;
        text-align: center;
        margin: 20px 0;

        div {
          i {
            display: inline-block;
            width: 120px;
            height: 120px;
            line-height: 120px;

            img {
              display: inline-block;
              vertical-align: middle;
              width: 100%;
              height: 100%;
            }
          }

          p {
            font-size: 28px;
            color: #666;
          }
        }
      }
    }
    .ele-loading {
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
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
