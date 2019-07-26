<template>
  <div class="bill" v-title="'转入记录'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      <span>转入记录</span>
      <i class="iconfont" @click="changeData">&#xe62b;</i>
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
    <div class="bill-content">
      <van-tabs :sticky="true" @change="change" swipeable>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-tab v-for="(item,i) in TabList" :key="i" :title="item.title">
<!--            <div slot="title" @click="changeTab(item.type)">-->
<!--              {{item.title}}-->
<!--            </div>-->
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
                    <i class="iconfont"
                    :class="[
                      {'cz':child.status===1},
                      {'tx':child.status===2},
                      {'fd':child.status===3},
                      {'pj':child.status===4},
                    ]"
                    >{{ child.status===10?'&#xe700;':(child.status===20?'&#xe702;':(child.status===30?'&#xe703;':(child.status===40?'&#xe706;':(child.status===50?'&#xe737;':(child.status===60?'&#xe705;':(child.status===70?'&#xe734;':(child.status===80?'&#xe735;':'&#xe701;'))))))) }}</i>
                  </div>
                  <dl>
                    <dd>
                      <h1>订单号：{{child.orderId}}</h1>
                      <p>本金：{{child.money}} </p><p> 收益：{{child.profit}}</p>
                      <span>开始时间：{{timestampToString(child.startTime)}}</span>
                    </dd>
                    <dd>
                      <span :class="parseInt(child.coin) > 0 ?'profit':'loss'"
                      >{{child.coin}}</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </van-list>
          </van-tab>
        </van-pull-refresh>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import { yuebaoRecord } from "../../api";
  const TabList = [
    { title:'全部',type:'0',className:''},
    { title:'进行中',type:'1',className:'cz'},
    { title:'已终止',type:'2',className:'tx'},
    { title:'赎回中',type:'3',className:'fd'},
    { title:'已赎回',type:'4',className:'pj'},
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
        defaultDate: [dayjs(), dayjs().add(1, 'day')],
        weekNames: ['一', '二', '三', '四', '五', '六', '日'],
        monthNames:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dataTime: '',
        typeId: 0,
        list: 20,
        accountArr: [],
        noData: false,
        activeType: '',
        parameter:{
          status: 0,
          offset: 0,
          pageSize: 30,
          startTime: '',
          endTime: ''
        }
      }
    },
    created(){
      this.yuebaoRecords();
    },
    methods: {
      yuebaoRecords() {
        yuebaoRecord(this.parameter).then(res => {
          try {
            this.accountArr = res.data;
            console.log(this.accountArr, "账单数据-------------------------");
            if (!this.accountArr.length) {
              this.noData = true;
              this.finished = true;
            } else {
              if(this.accountArr.length<this.parameter.pageSize){
                this.finished = true;
              }else {
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
        new Promise(function (resolve) {
          yuebaoRecord(that.parameter).then(res => {
            console.log(res.data,'刷新');
            if(res.status){
              that.accountArr = res.data;
              resolve(res.data);
              if (!that.accountArr.length) {
                that.noData = true;
              } else {
                that.noData = false;
              }
            }
          });
        }).then(res=>{
          if (res.length) {
            that.$toast("刷新成功");
          } else {
            that.$toast("暂无更多数据");
          }
          that.isLoading = false;
        })
      },
      onLoad() {
        console.log("load-------------------------------");
        this.parameter.offset += this.parameter.pageSize;
        yuebaoRecord(this.parameter).then(res=>{
          if (res.data.length) {
            console.log(res.data,'加载更多');
            this.accountArr = this.accountArr.concat(res.data);
            this.loading = false;
          } else {
            this.loading = false;
            this.finished = true;
          }
        })
      },
      changeData(){
        this.calendarShow = true;
      },
      onChange(date) {
        this.dataTime = date.map((item) => item.format('YYYY-MM-DD'));
        if(date.length > 1){
          console.log(this.dataTime);
          this.calendarShow = false;
          this.finished = false;
          this.parameter.startTime = this.dataTime[0];
          this.parameter.endTime = this.dataTime[1];
          this.parameter.offset = 0;
          this.yuebaoRecords();
        }
      },
      change(index){
        console.log(index);
        this.finished = false;
        let type = this.TabList[index].type;
        if(this.parameter.status === type){
          return;
        }
        this.parameter.status = type;
        this.parameter.offset = 0;
        this.parameter.startTime = '';
        this.parameter.endTime = '';
        this.yuebaoRecords();
      },
      // changeTab(type){
      //   console.log(type);
      //   this.finished = false;
      //   if(this.parameter.status === type){
      //     return;
      //   }
      //   console.log(this.$refs);
      //   this.parameter.status = type;
      //   this.parameter.offset = 0;
      //   this.parameter.startTime = '';
      //   this.parameter.endTime = '';
      //   this.yuebaoRecords();
      // }
    }
  }
</script>

<style scoped lang="less">
  .bill {
    .top {
      height: 100px;
      line-height: 100px;
      font-size: 42px;
      text-align: center;
      i {
        font-size: 48px;
        &:first-child{
          position: absolute;
          left: 30px;
        }
        &:nth-child(3){
          position: absolute;
          right: 30px;
          font-weight: bold;
        }
      }
    }
    .bill-content {
      .detail{
        li {
          overflow: hidden;
          padding: 30px 0 0 30px;
          div,dl,dd{
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
            .cz {
              background-color: @ThemeColor;
            }
            .tx {
              background-color: #2698e8;
            }
            .fd {
              background-color: #f1b513;
            }
            .pj {
              background-color: #08b88c;
            }
            .cd {
              background-color: #999999;
            }
            .tz {
              background-color: #943ced;
            }
            .hd {
              background-color: #31c468;
            }
            .qt {
              background-color: #e147dc;
            }
            .zh {
              background-color: #e147dc;
            }
          }
          dl {
            .borderBtm();
            width: 85%;
            dd{
              &:first-child{
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
                span{
                  font-size: 38px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
