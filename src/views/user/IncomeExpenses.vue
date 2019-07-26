<template>
  <div class="incomeExpenses bill" v-title="'收支明细'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      <span>收支明细</span>
      <div class="time">
        <span>交易时间</span>
        <span class="times" @click="changeData">
          {{this.Timeslot}}
          <i class="iconfont">{{calendarShow?'&#xe608;':'&#xe63d;'}}</i>
        </span>
        <span class="types" @click="popupShow = true">类型</span>
      </div>
      <calendar
        ref="myCalendar"
        @change="onChange"
        :show.sync="calendarShow"
        mode="during"
        :defaultDate="defaultDate"
        :monthNames="monthNames"
        :weekNames="weekNames"
      ></calendar>
    </div>
    <div class="incomeExpenses-content">
      <van-tabs :sticky="true">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-tab v-for="(item,i) in TabList" :key="i">
            <div slot="title" @click="changeTab(item.type)">{{item.title}}</div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <ul class="detail">
                <li v-for="(child,j) in accountArr" :key="j">
                  <div>
                    <i
                      class="iconfont"
                      :class="[
                      {'cz':child.liqType===160},
                      {'tx':child.liqType===161},
                      {'fd':child.liqType===162},
                      {'pj':child.liqType===163},
                      {'cd':child.liqType===164},
                    ]"
                    >{{ child.liqType===160?'&#xe706;':(child.liqType===161?'&#xe737;':(child.liqType===162?'&#xe705;':(child.liqType===163?'&#xe734;':(child.liqType===164?'&#xe735;':'&#xe701;')))) }}</i>
                  </div>
                  <dl>
                    <dd>
                      <h1>{{child.billTitle}}</h1>
                      <p>{{child.info}}</p>
                      <span>{{timestampToString(child.actionTime)}}</span>
                    </dd>
                    <dd>
                      <span :class="parseInt(child.coin) > 0 ?'profit':'loss'">{{child.coin}}</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </van-list>
          </van-tab>
        </van-pull-refresh>
      </van-tabs>
    </div>
    <van-popup v-model="popupShow" class="popup" position="bottom">
      <h1><span @click="popupShow =false">取消</span> 类型筛选</h1>
      <ul>
        <li class="totalEarnings" v-for="(item,index) in TabList" :key="index" :title="item.id">
          <span @click="changeTab(item.type)">{{item.title}}</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { yuebaoLog } from "../../api";
const TabList = [
  { title: "全部", type: "0", className: "" },
  { title: "转入余额宝", type: "160", className: "cz" },
  { title: "余额宝转出至余额", type: "161", className: "tx" },
  { title: "余额宝转出至银行卡", type: "162", className: "fd" },
  { title: "收益转出至余额", type: "163", className: "pj" },
  { title: "收益转出至银行卡", type: "164", className: "cd" }
];
export default {
  name: "Bill",
  data() {
    return {
      TabList,
      isLoading: false,
      loading: false,
      finished: false,
      calendarShow: false,
      Timeslot:"选择查询时间段",
      popupShow: false,
      defaultDate: [dayjs(), dayjs().add(1, "day")],
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
      ],
      dataTime: "",
      typeId: 0,
      list: 20,
      accountArr: [],
      noData: false,
      activeType: "",
      parameter: {
        billType: 0,
        offset: 0,
        pageSize: 30,
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.YuebaoLogs();
  },
  methods: {
    YuebaoLogs() {
      yuebaoLog(this.parameter).then(res => {
        try {
          this.accountArr = res.data;
          console.log(this.accountArr, "账单数据-------------------------");
          if (!this.accountArr.length) {
            this.noData = true;
            this.finished = true;
          } else {
            if (this.accountArr.length < this.parameter.pageSize) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.accountArr;
    },
    onRefresh() {
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve) {
        yuebaoLog(that.parameter).then(res => {
          console.log(res.data, "刷新");
          if (res.status) {
            that.accountArr = res.data;
            resolve(res.data);
            if (!that.accountArr.length) {
              that.noData = true;
            } else {
              that.noData = false;
            }
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
      console.log("load-------------------------------");
      this.parameter.offset += this.parameter.pageSize;
      yuebaoLog(this.parameter).then(res => {
        if (res.data.length) {
          console.log(res.data, "加载更多");
          this.accountArr = this.accountArr.concat(res.data);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    changeData() {
      this.calendarShow = true;
    },
    onChange(date) {
      this.dataTime = date.map(item => item.format("YYYY-MM-DD"));
      if (date.length > 1) {
        this.Timeslot =this.dataTime.join("-")
        this.calendarShow = false;
        this.finished = false;
        this.parameter.startTime = this.dataTime[0];
        this.parameter.endTime = this.dataTime[1];
        this.parameter.offset = 0;
        this.YuebaoLogs();
      }
    },
    changeTab(type) {
      this.finished = false;
      this.popupShow = false;
      if (this.parameter.billType === type) {
        return;
      }
      console.log(type);
      this.parameter.billType = type;
      this.parameter.offset = 0;
      this.parameter.startTime = "";
      this.parameter.endTime = "";
      this.YuebaoLogs();
    }
  }
};
</script>

<style scoped lang="less">
.incomeExpenses {
  .top {
    height: 200px;
    line-height: 100px;
    font-size: 42px;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    border-top: 1px solid #d6d4d4;
    border-bottom: 1px solid #d6d4d4;
    .time {
      display: flex;
      padding: 20px;
      height: 60px;
      line-height: 60px;
      font-size: 32px;
      .types {
        color: #2698e8;
      }
      .times {
        padding: 0 50px 0 10px;
        flex-grow: 1;
        color: #999;
        position: relative;
        i {
          right: 10px;
          left: inherit;
          width: 50px;
        }
      }
    }
    i {
      font-size: 48px;
      &:first-child {
        position: absolute;
        left: 30px;
      }
      &:nth-child(3) {
        position: absolute;
        right: 30px;
        font-weight: bold;
      }
    }
  }
  .incomeExpenses-content {
    padding-top: 200px;
    .detail {
      li {
        overflow: hidden;
        padding: 30px 0 0 30px;
        div,
        dl,
        dd {
          float: left;
          overflow: hidden;
        }
        div {
          margin-right: 30px;
          i {
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            border-radius: 50%;
            text-align: center;
            font-size: 56px;
            color: #fff;
          }
          i.cz {
            background-color: @ThemeColor;
          }
          i.tx {
            background-color: #2698e8;
          }
          i.fd {
            background-color: #f1b513;
          }
          i.pj {
            background-color: #08b88c;
          }
          i.cd {
            background-color: #999999;
          }
        }
        dl {
          .borderBtm();
          width: 85%;
          dd {
            &:first-child {
              h1 {
                font-size: 28px;
                color: @Bill-Font-Color;
                line-height: 40px;
              }
              p {
                font-size: 24px;
                color: @Bill-Font-Color;
                line-height: 50px;
              }
              span {
                font-size: 24px;
                color: @Bill-Font-Color-Pale;
                line-height: 50px;
              }
            }
            &:last-child {
              float: right;
              span {
                font-size: 38px;
              }
            }
          }
        }
      }
    }
  }
  .popup {
    h1 {
      color: #387ef5;
      border-bottom: 1px solid #ececec;
      background: #dcdcdc;
      padding: 20px;
      font-size: 32px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      span {
        float: right;
        color: red;
      }
    }
    ul {
      padding: 20px;
      overflow: hidden;
      li {
        width: calc((100% - 40px) / 2);
        height: 84px;
        line-height: 84px;
        float: left;
        margin-bottom: 20px;
        &:nth-child(2n+2){
          margin-left:40px;
        }
        span {
          display: block;
          float: left;
          font-size: 30px;
          text-align: center;
          width: 100%;
          border-radius: 10px;
          background: #ececec;
          color: #666;
        }
      }
    }
  }
  .van-tabs--line {
    padding-top: 0;
  }
}
</style>
