<template>
  <div class="hall flex">
    <Header title="官方彩" :isSlot="true">
      <i class="iconfont back" @click="$router.push({name:'GamesLobby'})">&#xe629;</i>
    </Header>
    <div class="content" v-if="newAllGame.length">
      <dl>
        <dd
            v-for="(lottery, i) in newAllGame"
            :key="i"
            :class="{ ons: lotteryType === lottery.gameType }"
            @click="changeLottery(lottery.gameType)"
        >
          {{ lottery.gameTitle }}
        </dd>
      </dl>
      <ul>
        <li v-for="(itemOne, j) in currentGameList" :key="j">
          <div
              @click="
                  playLottery(
                    itemOne.gameId,
                    itemOne.classify,
                    itemOne.title
                  )
                "
          >
            <i>
              <ImgLoading :src="itemOne.img"></ImgLoading>
            </i>
            <p>{{ itemOne.title }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex"
  import ImgLoading from "../../components/common/ImgLoading";
  export default {
    name: "Hall",
    components: {ImgLoading},
    data() {
      return {
        lotteryType: 1
      }
    },
    created () {
      console.log(this.newAllGame,"*********************")
    },
    computed: {
      ...mapGetters(["newAllGame"]),
      currentGameList (){
        return this.newAllGame.filter(item=> item.gameType === this.lotteryType)[0].gameData
      }
    },
    methods: {
      changeLottery(type) {
        this.lotteryType = type;
      },
    }
  }
</script>
<style scoped lang="less">
.hall {
  .content {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid #f0f0f0; /*no*/

    dl {
      overflow: hidden;
      width: 20%;
      height: 100%;
      background-color: #f6f6f6;

      dd {
        text-align: center;
        height: 113px;
        line-height: 113px;
        overflow: hidden;
        font-size: 30px;
        color: #666;
      }

      .ons {
        background-color: #ffffff;
      }
    }

    ul {
      flex: 1;
      overflow-y: scroll;

      li {
        float: left;
        overflow: hidden;
        width: 33.333%;
        text-align: center;
        margin: 20px 0;

        div {
          i {
            display: inline-block;
            width: 120px;
            height: 120px;
          }

          p {
            font-size: 28px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
