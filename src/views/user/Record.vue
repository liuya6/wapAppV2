<template>
  <div class="record" v-title="'游戏记录'">
    <Header title="游戏记录"></Header>
    <div class="record-content">
      <van-tabs :sticky="true" swipeable @change="change">
        <van-pull-refresh class="lottery" v-model="isLoading" @refresh="onRefresh">
          <van-tab v-for="(item,i) in thirdList" :key="i" :title="item.name">
            <!--            <div slot="title">-->
            <!--              {{item.name}}-->
            <!--            </div>-->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <dl class="title">
                <dd @click="typeKeyShow = true">
                  <i class="iconfont">&#xe71d;</i>
                  <span>{{ currentTypeTitle }}</span>
                  <i class="iconfont">&#xe620;</i>
                </dd>
                <dd @click="calendarShow = true">
                  <i class="iconfont">&#xe71e;</i>
                  <span>{{parameter.startTime}}</span>
                  <i class="iconfont">&#xe620;</i>
                </dd>
              </dl>
              <ul class="detail">
                <li v-for="(item,i) in recordList" :key="i">
                  <div>
                    <span>
                      <!-- 订单号： -->
                      {{item.round}}
                    </span>
                    <span>{{timeNoYear(item.time)}}</span>
                  </div>
                  <div>
                    <p>
                      <span>类型</span>
                      <span>{{item.title}}</span>
                    </p>
                    <p>
                      <span>下注</span>
                      <span>{{item.bet}}</span>
                    </p>
                    <p>
                      <span>盈亏</span>
                      <span :class="parseInt(item.win) > 0 ?'profit':'loss'">{{item.win}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
        </van-pull-refresh>
      </van-tabs>
    </div>
    <van-popup v-model="typeKeyShow" position="bottom">
      <van-picker :columns="typeKeyList" show-toolbar @cancel="onCancel" @confirm="onConfirm"></van-picker>
    </van-popup>
    <calendar
      ref="myCalendar"
      @change="onChange"
      :show.sync="calendarShow"
      :defaultDate="defaultDate"
      :monthNames="monthNames"
      :weekNames="weekNames"
    ></calendar>
  </div>
</template>

<script>
import { getRecord, thirdList } from "../../api";
import { mapMutations, mapGetters } from "vuex";
import dayjs from "dayjs";
const TabList = [
  { title: "彩票", type: "CP" },
  { title: "棋牌", type: "QP" },
  { title: "视讯", type: "SX" },
  { title: "电子", type: "DZ" },
  { title: "捕鱼", type: "BY" },
  { title: "体育", type: "TY" }
];
export default {
  name: "Record",
  data() {
    return {
      TabList,
      isLoading: false,
      loading: false,
      finished: false,
      typeKeyShow: false,
      typeKeyList: [],
      currentTypeKeyList: [],
      currentTypeTitle: "",
      noData: false,
      parameter: {
        classify: "CP",
        typeKey: "",
        timeType: 0,
        startTime: dayjs().format("YYYY-MM-DD"),
        page: 1
      },
      recordList: [],
      calendarShow: false,
      defaultDate: [dayjs()],
      weekNames: ["一", "二", "三", "四", "五", "六", "日"],
      monthNames: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ]
    };
  },
  created() {
    if (!this.thirdList) {
      this.initDataThirdList();
    } else {
      this.setDataFirst(this.thirdList);
      console.log(this.parameter, "elsethis.parameter");
      this.initRecordData();
    }
    console.log(this.thirdList, "游戏记录游戏列表------------");
  },
  computed: {
    ...mapGetters(["thirdList"])
  },
  methods: {
    ...mapMutations(["SET_THIRD_LIST"]),
    initRecordData() {
      getRecord(this.parameter).then(res => {
        console.log(res);
        if (res.status) {
          console.log(res.data.list);
          this.recordList = res.data.list;
          console.log(this.recordList);
          if (this.recordList && this.recordList.length) {
            if (this.recordList.length < 20) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            this.noData = false;
          } else {
            this.noData = true;
            this.finished = true;
          }
        }
      });
    },
    initDataThirdList() {
      thirdList().then(res => {
        console.log(res);
        if (res.status) {
          console.log(res.data, "游戏记录游戏列表--------------------");
          this.SET_THIRD_LIST(res.data);
          this.setDataFirst(res.data);
          this.initRecordData();
          console.log(this.parameter, "this.parameter-initDataThirdList");
        }
      });
    },
    setDataFirst(data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.classify === this.parameter.classify) {
          for (let j in item.list) {
            this.currentTypeKeyList.push(j);
            this.typeKeyList.push(item.list[j]);
            this.currentTypeTitle = this.typeKeyList[0];
            this.parameter.typeKey = this.currentTypeKeyList[0];
          }
          console.log(this.currentTypeKeyList, "当前游戏typeList");
        }
      }
    },
    onRefresh() {
      this.parameter.page = 1;
      let that = this;
      new Promise(function(resolve) {
        getRecord(that.parameter).then(res => {
          console.log(res, res.data.list, "刷新");
          if (res.status) {
            that.recordList = res.data.list;
            resolve(res.data.list);
            if (!that.recordList) {
              that.noData = true;
            } else {
              that.noData = false;
            }
          }
        });
      }).then(res => {
        if (res) {
          that.$toast("刷新成功");
        } else {
          that.$toast("暂无更多数据");
        }
        that.isLoading = false;
      });
    },
    onLoad() {
      this.parameter.page += 1;
      getRecord(this.parameter).then(res => {
        if (res.data.list && res.data.list.length) {
          console.log(res.data.list, "加载更多");
          this.recordList = this.recordList.concat(res.data.list);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    // changeType(classify,list) {
    //   this.finished = false;
    //   this.search(classify,list);
    // },
    change(index) {
      this.finished = false;
      let classify = this.TabList[index].type;
      let list = this.thirdList[index].list;
      this.search(classify, list);
    },
    search(classify, list) {
      console.log("11111111111");
      this.parameter.classify = classify;
      this.parameter.page = 1;
      let titleArr = [];
      let typeKeyArr = [];
      for (let i in list) {
        titleArr.push(list[i]);
        typeKeyArr.push(i);
      }
      this.typeKeyList = titleArr;
      this.currentTypeKeyList = typeKeyArr;
      this.currentTypeTitle = this.typeKeyList[0];
      this.parameter.typeKey = this.currentTypeKeyList[0];
      this.initRecordData();
    },
    onCancel() {
      this.typeKeyShow = false;
    },
    onConfirm(val, index) {
      this.parameter.page = 1;
      this.parameter.typeKey = this.currentTypeKeyList[index];
      console.log(this.parameter.typeKey, "当前游戏typeKey");
      this.currentTypeTitle = val;
      this.initRecordData();
      this.typeKeyShow = false;
      console.log(this.parameter, "请求数据--------------------");
    },
    onChange(time) {
      this.calendarShow = false;
      this.parameter.startTime = time.format("YYYY-MM-DD");
      this.parameter.page = 1;
      this.initRecordData();
    }
  }
};
</script>

<style scoped lang="less">
.record {
  min-height: 100vh;
  background-color: @BG;
  .headerBox {
    background-color: #fff;
  }
  .record-content {
    .title {
      height: 104px;
      background: @BG;
      display: flex;
      align-items: center;
      justify-content: space-around;
      dd {
        width: 330px;
        height: 64px;
        background-color: #fff;
        border: solid 1px #e7e7e7;
        border-radius: 8px;
        display: flex;
        align-items: center;
        position: relative;
        span {
          font-size: 28px;
          color: @Bill-Font-Color;
          margin-left: 10px;
        }
        i {
          color: @Bill-Font-Color-Pale;
          &:nth-child(1) {
            font-size: 40px;
            margin-left: 30px;
          }
          &:nth-child(3) {
            position: absolute;
            right: 30px;
          }
        }
      }
    }
    .detail {
      li {
        background-color: #fff;
        height: 225px;
        margin-bottom: 20px;
        overflow: hidden;
        div {
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          &:first-child {
            margin-top: 40px;
            margin-bottom: 30px;
            font-size: 28px;
            justify-content: space-around;
            span:nth-child(1) {
              flex: 0 0 auto;
              // max-width: 450px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span:nth-child(2) {
              white-space: nowrap;
              overflow: hidden;
              color: @Bill-Font-Color-Pale;
            }
          }
          &:nth-child(2) {
            padding: 0 80px;
            text-align: center;
            span {
              &:nth-child(1) {
                display: block;
                color: @Bill-Font-Color-Pale;
                font-size: 24px;
                margin-bottom: 20px;
              }
              &:nth-child(2) {
                font-size: 28px;
              }
              &.profit {
                color: @Profit;
              }
              &.loss {
                color: @Loss;
              }
            }
          }
        }
      }
    }
  }
}
</style>
