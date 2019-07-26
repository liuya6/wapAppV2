import {
  isLogin,
  myBankCard,
  signList
} from "../api";

const User = {
  state: {
    userInfo: null, //用户数据
    order: "", //充值订单数据
    deposits: "", //充值金额
    TransferMethod: "", //转账方式
    rechargeArr: [], //充值列表
    noticeArr: [], //消息列表
    myBank: [], // 我的银行卡
    boxSum: [], // 选中金额
    bankCardId: '', //当前提现的银行卡ID
    tabStatus: 'balance', //当前Tab的状态
    aboutUsArr: '', //关于我们列表
    helpList: '', //帮助中心列表
    allBankCardList: '', // 绑定银行卡准备
    thirdList: '', //游戏记录游戏列表
    rechargeMoneyType: "",
    rechargeMoney: "",
    registerNow: '',
    password: '',
    checkInShow: false, //签到页面
    checkInList: { day:0 }
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    order: state => {
      return state.order;
    },
    deposits: state => {
      return state.deposits;
    },
    TransferMethod: state => {
      return state.TransferMethod;
    },
    rechargeArr: state => {
      return state.rechargeArr
    },
    myBank: state => {
      return state.myBank
    },
    boxSum: state => {
      return state.boxSum
    },
    bankCardId: state => {
      return state.bankCardId
    },
    tabStatus: state => {
      return state.tabStatus
    },
    aboutUsArr: state => {
      return state.aboutUsArr;
    },
    helpList: state => {
      return state.helpList
    },
    allBankCardList: state => {
      return state.allBankCardList
    },
    thirdList: state => {
      return state.thirdList
    },
    rechargeMoney: state => {
      return state.rechargeMoney
    },
    rechargeMoneyType: state => {
      return state.rechargeMoneyType
    },
    fromPathName: state => {
      return state.fromPathName
    },
    checkInShow: state => {
      return state.checkInShow
    },
    checkInList: state => {
      return state.checkInList
    },
    registerNow: state => {
      return state.registerNow
    },
    password: state => {
      return state.password
    }
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    CLEAR_USER_INFO(state) {
      state.userInfo = null;
    },
    SET_RECHARGE_ARR(state, payload) {
      state.rechargeArr = payload
    },
    ORDERS(state, payload) {
      state.order = payload;
    },
    DEPOSITS(state, payload) {
      state.deposits = payload;
    },
    TRANSFER_METHOD(state, payload) {
      state.TransferMethod = payload;
    },
    GET_NOTICE(state, payload) {
      state.noticeArr = payload;
    },
    SET_MY_BANK(state, payload) {
      state.myBank = payload;
    },
    SET_BOX_SUM(state, payload) {
      state.boxSum = payload;
    },
    SET_BANK_ID(state, payload) {
      state.bankCardId = payload;
    },
    SET_TAB_ID(state, payload) {
      state.tabStatus = payload;
    },
    SET_ABOUT_US(state, payload) {
      state.aboutUsArr = payload;
    },
    SET_HELP_LIST(state, payload) {
      state.helpList = payload;
    },
    SET_ALL_BANK_CARD(state, payload) {
      state.allBankCardList = payload
    },
    SET_THIRD_LIST(state, payload) {
      state.thirdList = payload;
    },
    SET_RECHARGE_LIST(state, payload) {
      state.rechargeMoney = payload;
    },
    SET_RECHARGE_TYPE(state, payload) {
      state.rechargeMoneyType = payload;
    },
    SET_FROM_PATHNAME(state, payload) {
      state.fromPathName = payload;
    },
    SET_CHECKIN_SHOW: (state, payload) => {
      state.checkInShow = payload;
    },
    SET_CHECKIN_LIST: (state, payload) => {
      state.checkInList = payload;
    },
    SET_REGISTERNOW(state, payload) {
      state.registerNow = payload
    },
    SET_PASSWORD(state, payload) {
      state.password = payload
    }
  },
  actions: {
    checkedLogin(context) {
      isLogin().then(res => {
        if (typeof res === "string") {
          return false;
        }
        try {
          if (res.status) {
            context.commit("SET_USER_INFO", res.data);
          } else {
            context.commit("SET_USER_INFO", "");
          }
        } catch (err) {
          console.log(err, "【checkedLogin-catch】");
        }
      });
    },
    getMyBank(context) {
      myBankCard().then(res => {
        console.log(res.data, "我的银行卡");
        if (res.status) {
          context.commit('SET_MY_BANK', res.data);
          if (res.data.length) {
            if (!context.getters.bankCardId) {
              context.commit('SET_BANK_ID', res.data[0].id)
              // } else {
              //   context.commit('SET_BANK_ID', context.getters.bankCardId)
            }
          } else {
            context.commit('SET_BANK_ID', '')
            // router.replace({name:'addbankcard'});
            // Toast("请先绑定银行卡")
          }
        }
      });
    },
    getCheckInList(context) {
      signList().then(res => {
        context.commit("SET_CHECKIN_LIST", res.data);
        console.log(res.data, "签到列表")
      })
    }
  }
};

export default User;
