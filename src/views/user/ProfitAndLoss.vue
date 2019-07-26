<template>
  <div class="ProfitAndLoss flex" v-title="'盈亏统计'">
    <Header title="盈亏统计"></Header>
    <div class="content flex">
      <div class="top">
        <div v-for="(item, i) in tabList" :key="i" :class="{'on':item.type===timeType}" @click="changeTime(item.type)">
          {{item.title}}
        </div>
      </div>
      <ul class="content">
        <li v-for="(item,i) in list" :key="i">
          <h1>
            <span>{{item.name}}</span>
            <span>总盈亏：<b>{{(item.profit*1).toFixed(2)}}</b></span>
          </h1>
          <dl>
            <dd>
              <p>{{i==='all'?'充值':'投注金额'}}</p>
              <span>{{i==='all'?(item.rechargeAmount*1).toFixed(2):(item.allBet*1).toFixed(2)}}</span>
            </dd>
<!--            <dd>-->
<!--              <p>活动</p>-->
<!--              <span>0.00</span>-->
<!--            </dd>-->
            <dd>
              <p>{{i==='all'?'提现':'有效投注'}}</p>
              <span>{{i==='all'?(item.withdrawAmount*1).toFixed(2):(item.cellScore*1).toFixed(2)}}</span>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { statistics } from "../../api";
  import dayjs from 'dayjs';
  export default {
    name: "ProfitAndLoss",
    data() {
      return {
        list: '',
        tabList:[
          { title: dayjs().format('YYYY-MM-DD'), type: '1' },
          { title:'昨天', type:'2' },
          { title:'近一周', type:'3' },
        ],
        timeType: '1'
      }
    },
    created(){
      this.initData()
    },
    methods: {
      initData() {
        statistics({timeType:this.timeType}).then(res=>{
          console.log(res,"盈亏统计");
          if(res.status) {
            this.list = res.data;
          }
        })
      },
      changeTime(type) {
        this.timeType = type;
        this.initData()
      }
    }
  }
</script>

<style scoped lang="less">
.ProfitAndLoss{
  .content{
    background-color: @BG;
    .top {
      display: flex;
      justify-content: space-around;
      div {
        flex: 0 0 auto;
        width: 210px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        .borderAll();
        box-sizing: border-box;
        border-radius: 10px;
        color: @Bill-Font-Color-Pale;
        margin: 20px 0;
        font-size: 28px;
        background-color: #fff;
        &.on {
          background-color: @ThemeColor;
          color: #fff;
          border: 0;
        }
      }
    }
    ul{
      width: 710px;
      margin: auto;
      li {
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 1px 12px 0 rgba(98, 98, 98, 0.1);
        margin-bottom: 20px;
        overflow: hidden;
        h1 {
          display: flex;
          justify-content: space-between;
          height: 70px;
          align-items: center;
          .borderBtm();
          padding-left: 48px;
          span{
            padding-right: 48px;
            color: @Bill-Font-Color-Pale;
            &:first-child {
              font-size: 28px;
              color: @ThemeColor;
            }
            b {
              font-size: 34px;
              font-weight: normal;
              color: @Bill-Font-Color;
            }
          }
        }
        dl{
          background-color: #fafafa;
          display: flex;
          justify-content: space-between;
          padding: 0 48px;
          dd {
            flex: 0 0 auto;
            margin: 30px 0;
            p {
              color: @Bill-Font-Color-Pale;
              font-size: 24px;
            }
            span {
              font-size: 34px;
              font-weight: normal;
              color: @Bill-Font-Color;
            }
          }
          &:nth-child(3) {
            dd {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
