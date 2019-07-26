<template>
  <div class="wallet flex" v-title="'充值'">
    <div class="header">
      <span>充值</span>
<!--      <i class="iconfont" @click="$router.push({name:'rechargerecord'})">&#xe612;</i>-->
      <i class="iconfont" @click="directionsShow = true">&#xe717;</i>
      <b @click="$router.push({name:'rechargerecord'})">充值记录</b>
    </div>
    <div class="content flex">
<!--      <div class="top">-->
<!--        <div>-->
<!--          <span @click.stop="keyboardShow=true" :class="{'placeholder':money<=0}">{{money>0?money:'请输入充值金额（元）'}}</span>-->
<!--          <b v-show="money>0" @click="money=''">-->
<!--            X-->
<!--          </b>-->
<!--        </div>-->
<!--        <ul>-->
<!--          <li v-for="item in moneyList" :key="item" :class="{'on':item===money}" @click="money=item">{{'￥'+item}}</li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="content flex">
        <div class="tabTitle">
          <div v-for="(item,i) in tabTitle" :key="i" @click="changeType(item.type)">
            <span :class="{'on':activeType===item.type}">
              {{item.title}}
            </span>
          </div>
        </div>
        <div class="content">
          <div v-if="activeType==='online'" class="online">
            <van-cell-group >
              <van-cell v-for="(item,i) in rechargeArr.online"
                        :title="item.title"
                        is-link
                        :key="i"
                        icon=""
                        @click="showTabList(item.data,item.type)"
              >
                <img :src="item.typeImg" alt="">
              </van-cell>
            </van-cell-group>
          </div>
          <div v-else class="human">
            <h1>温馨提示：复制专员微信号/QQ/支付宝等，并跳转到添加为好友索取最新入款账号，支付后可在10秒内完成充值！</h1>
            <van-cell-group >
              <van-cell v-for="(item,i) in rechargeArr.human"
                        :title="item.title"
                        is-link
                        :key="i"
                        icon=""
                        @click="showTabList(item.data,item.type)"
              >
                <img :src="item.typeImg" alt="">
              </van-cell>
            </van-cell-group>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="popupShow" class="popup" position="bottom">
      <ul>
        <li
            @click="gotoPay(item.payWay, item.id,item.rechargeMoney,item.rechargeMoneyType)"
            v-for="(item, i) in TabList"
            :key="i"
        >
          <div>
            <img :src="item.rechargeImg" alt="" />
          </div>
          <div>
            <p>{{ item.rechargeName }}</p>
            <span>{{ item.desc }}</span>
          </div>
        </li>
      </ul>
    </van-popup>

<!--    <transition name="fadeUp">-->
<!--      <div class="PopupSuccess" v-show="isSuccess">-->
<!--        <ul>-->
<!--          <li class="iconfont">&#xe600;</li>-->
<!--          <li>-->
<!--            是否充值成功？-->
<!--          </li>-->
<!--          <li>-->
<!--            稍后请查收你的账户-->
<!--          </li>-->
<!--          <li>-->
<!--            <span @click="isSuccess = false">操作失败</span>-->
<!--            <span-->
<!--                @click="$router.push({ name: 'bill' })"-->
<!--                class="onBtn"-->
<!--            >充值成功</span-->
<!--            >-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </transition>-->
    <transition name="fadeUp">
      <div class="directions" v-show="directionsShow">
        <dl>
          <dt>
            充值小贴士
            <i class="iconfont" @click="directionsShow = false">&#xe71a;</i>
          </dt>
          <dd>充值</dd>
          <dd>付款成功后5分钟内到账，如遇网络延迟的情况请耐心等待5~10分钟，如还未到账请及时联系客服。</dd>
          <dd>*建议您使用高效安全的“官方线上充值”</dd>
          <dd>
            <van-button to="/service">
              联系客服
            </van-button>
          </dd>
        </dl>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="notice" v-show="noticeShow">
        <dl>
          <dt>
            <img src="../../assets/img/rechargeNotice.png" alt="">
          </dt>
          <dd v-html="allConfig.wapRechargeNotice"></dd>
<!--          <dd>-->
<!--            1、自助充值内提供金额和支付金额必须一致，否则无法到账。-->
<!--          </dd>-->
<!--          <dd>-->
<!--            2、二维码为一次性使用，请勿保存到手机重复扫描支付造成不到账。-->
<!--          </dd>-->
<!--          <dd>-->
<!--            3、人工支付充值时<b>请务必通过客服发出的账号进行充值</b>，不要直接给以前充值过的账号私下转账、红包，这样可能会导致彩金到账<b>延迟7日以上！</b>-->
<!--          </dd>-->
          <dd>
            <input type='checkbox' id='keep' v-model="doNotShow" />
            <label For='keep'>今日不再提醒</label>
          </dd>
          <dd @click="notShow">我知道了</dd>
        </dl>
      </div>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
  import { rechargeBefore,rechargeApply } from "../../api";
  import { mapGetters,mapMutations,mapActions } from "vuex";
  const moneyList = [ "99","199","599","999","1999","2999","3999","4999" ];
  const tabTitle = [
    { title:'自助充值',type:"online"},
    { title:'人工充值',type:"human"}
  ];
  export default {
    name: "Wallet",
    data(){
      return{
        keyboardShow: false,
        popupShow: false,
        isSuccess: false,
        directionsShow: false,
        noticeShow: true,
        doNotShow: false,
        moneyList,
        tabTitle,
        money: '',
        activeType: "online",
        TabList: [],
        imgType: ''
      }
    },
    created() {
      console.log(typeof this.rechargeArr,this.rechargeArr);
      if(typeof this.rechargeArr === 'undefined' || !this.rechargeArr.online) {
        this.initRechargeArr()
      }
      let flag = sessionStorage.getItem('doNotShow');
      if(flag){
        this.noticeShow = false;
      }
      let type = sessionStorage.getItem("walletTitleType");
      if(type) {
        this.activeType = type;
      }
    },
    computed: {
      ...mapGetters(['rechargeArr','allConfig']),
    },
    methods :{
      ...mapMutations(['SET_RECHARGE_ARR']),
      ...mapActions(['SubmitOrders']),
      initRechargeArr() {
        rechargeBefore().then(res=>{
          console.log(res.data,'充值列表');
          if(res.status){
            this.SET_RECHARGE_ARR(res.data)
          }
        })
      },
      changeType(type) {
        this.activeType=type;
        sessionStorage.setItem("walletTitleType",type);
      },
      // onInput(val) {
      //   if(this.money.length<10){
      //     this.money+=val
      //   }
      // },
      // onDelete() {
      //   this.money=this.money.substring(0,this.money.length-1,1)
      // },
      showTabList(data,imaType) {
        console.log(data);
        this.TabList = data;
        this.popupShow = true;
        this.imgType = imaType;
      },
      gotoPay(payWay, id,rechargeMoney,rechargeMoneyType) {
        console.log(rechargeMoney,rechargeMoneyType);
        rechargeApply({ methodId: id }).then(res => {
          console.log(res,payWay,id);
          try {
            this.$store.commit("ORDERS", res.data);
            switch (payWay) {
              case 1:
                this.$store.commit("SET_RECHARGE_TYPE",rechargeMoneyType);
                this.$store.commit("SET_RECHARGE_LIST",rechargeMoney);
                this.$router.push({ name: "paying", query: { id: id } });
                break;
              case 2:
                this.$router.push({ name: "scancodepaying", params: { id: id ,money:this.money } });
                break;
              case 3:
                this.$router.push({ name: "bankpaying", params: { id: id ,money:this.money } });
            }
          } catch (e) {
            console.log(e);
          }
        });
      },
      notShow() {
        if(this.doNotShow) {
          sessionStorage.setItem('doNotShow',1)
        }
        this.noticeShow = false;
      }
    }
  }
</script>

<style scoped lang="less">
.wallet {
  .header{
    width: 100%;
    height: 100px;
    overflow: hidden;
    text-align: center;
    position: relative;
    span {
      font-size: 42px;
      line-height: 100px;
    }
    i {
      font-size: 46px;
      position: absolute;
      top: 0;
      padding: 0 10px;
      left: 20px;
      line-height: 100px;
    }
    b {
      position: absolute;
      right: 20px;
      font-weight: normal;
      font-size: 30px;
      padding-top: 30px;
    }
  }
  .content {
    background-color: @BG;
    .top {
      background-color: #fff;
      margin-top: 30px;
      padding: 0 30px;
      div {
        .borderBtm();
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 30px;
          display: inline-block;
          width: 90%;
          height: 40px;
          &.placeholder{
            color: #aeaeae;
          }
        }
        b {
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          background-color: #e8e8e8;
          color: #c4c4c4;
          font-weight: normal;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 50px;
        li{
          flex: 0 0 auto;
          width: 150px;
          height: 60px;
          .borderAll();
          box-sizing: border-box;
          margin-top: 30px;
          border-radius: 60px;
          text-align: center;
          line-height: 60px;
          font-size: 30px;
          color: #a5a5a5;
        }
        .on {
          background-color: @ThemeColor;
          color: #f1f1f1;
          border: 0;
        }
      }
    }
    .content {
      margin-top: 30px;
      padding: 0 30px;
      background-color: #fff;
      .content {
        margin-top: 0;
        padding: 0 0 80px 0;
      }
      .tabTitle{
        overflow: hidden;
        .borderBtm();
        height: 100px;
        display: flex;
        align-items: center;
        div{
          float: left;
          width: 50%;
          text-align: center;
          span {
            font-size: 32px;
            color: @Bill-Font-Color;
            border-bottom: 4px solid transparent;
            padding-bottom: 10px;
          }
          .on {
            color: @ThemeColor;
            border-bottom-color: @ThemeColor;
          }
        }
      }
    }
  }
  .popup {
    ul {
      width: 100%;
      height: 580px;
      background-color: #fff;
      overflow-y: scroll;

      li {
        border-bottom: 1px solid #c7ced6; /*no*/
        overflow: hidden;
        padding: 37px 0 37px 40px;
        div {
          float: left;
          text-align: left;

          p {
            font-size: 30px;
            line-height: 50px;
          }

          span {
            color: #999999;
          }
        }

        div:first-child {
          width: 90px;
          height: 90px;
          margin-right: 30px;
          line-height: 120px;

          img {
            width: 100%;
            display: inline-block;
          }
        }
        div:nth-child(2) {
          width: 550px;
          overflow: hidden;
        }
      }
    }
  }
  .PopupSuccess {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    text-align: center;

    ul {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      width: 550px;
      height: 550px;
      margin: auto;
      border-radius: 18px;
      overflow: hidden;
      li{
        padding: 0 30px;
      }
      li:first-child {
        color: #999;
        font-size: 200px;
        margin-top: 40px;
      }

      li:nth-child(2) {
        line-height: 58px;
        font-size: 36px;
      }

      li:nth-child(3) {
        color: #999999;
        line-height: 48px;
      }

      li:last-child {
        padding: 0;
        width: 100%;
        position: absolute;
        bottom: 30px;

        span {
          display: inline-block;
          width: 228px;
          height: 88px;
          border: 1px solid #dedddb; /*no*/
          border-radius: 10px;
          line-height: 88px;
          text-align: center;
          font-size: 32px;
        }

        span:first-child {
          margin-right: 5px;
          background-color: #f6f6f6;
        }

        span:last-child {
          margin-left: 5px;
          background: @Amount-Right-Btn;
          color: white;
        }
      }
    }
  }
  .directions{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    dl {
      width: 590px;
      height: 600px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 18px;
      overflow: hidden;
      background-color: #fff;
      dt {
        background: @Amount-Right-Btn;
        line-height: 100px;
        font-size: 32px;
        color: #fff;
        text-align: center;
        i {
          font-size: 30px;
          position: absolute;
          right: 30px;
        }
      }
      dd {
        padding: 0 30px;
        &:nth-child(2) {
          margin-top: 40px;
          margin-bottom: 30px;
          font-size: 32px;
        }
        &:nth-child(3) {
          font-size: 28px;
          line-height: 45px;
        }
        &:nth-child(4){
          color: @red;
          margin-top: 50px;
          margin-bottom: 66px;
        }
        &:last-child {
          padding: 0;
          text-align: center;
          margin: auto;
          width: 300px;
          height: 82px;
          line-height: 82px;
          border-radius: 82px;
          font-size: 28px;
          overflow: hidden;
          .van-button {
            width: 100%;
            height: 100%;
            background: @Amount-Right-Btn;
            color: #fff;
          }
        }
      }
    }
  }
  .notice {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    dl {
      width: 590px;
      height: 838px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 15px;
      overflow: hidden;
      dt {
        height: 170px;
        background-color: red;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd{
        margin: 0 30px;
        line-height: 50px;
        font-size: 28px;
        p {
          b {
            color: @red;
          }
        }
        &:nth-child(2) {
          margin-top: 30px;
        }
        &:nth-child(5) {
          margin-top: 30px;
          margin-bottom: 30px;
        }
        &:last-child {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translate(-50%,0);
          margin: 0;
          width: 380px;
          height: 82px;
          background: @Amount-Right-Btn;
          border-radius: 82px;
          text-align: center;
          line-height: 82px;
          color: #fff;
        }
        input[type='checkbox'] {
          width: 28px;
          height: 28px;
          line-height: 28px;
          display: inline-block;
          vertical-align: middle;
          -webkit-appearance:none;
          .borderAll();
          text-align: center;
          margin: 0 10px 0 10px;
        }
        input[type=checkbox]:checked {
          border: 1px solid @ThemeColor;
          background: #fff;
          color: @ThemeColor;
          line-height: 28px;
          &::after {
            content: '\2714';
            color: @ThemeColor;
            line-height: 28px;
          }
        }
        label {
          font-size: 25px;
          display: inline-block;
          vertical-align: middle;
          color: @Bill-Font-Color-Pale;
        }
      }
    }
  }
}
</style>
