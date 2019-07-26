import { fetch } from "../axios";

/* 注册字段 √ */
export function registerField() {
  return fetch({
    url: "/auth/registerBefore",
    method: "get",
  });
}

/* 注册 */
export function register(query) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: query,
    loading: true
  });
}

/* 登录 */
export function goLogin(query) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: query,
    loading: true
  });
}

/* 试玩账号 */
export function Play() {
  return fetch({
    url: "/auth/registerFree",
    method: "post",
    loading: true
  });
}

/* 检查登录状态 */
export function isLogin() {
  return fetch({
    url: "/auth/checkLogin",
    method: "get"
  });
}

/* 充值申请 */
export function rechargeApply(query) {
  return fetch({
    url: "/cash/rechargeApply",
    method: "post",
    data: query,
    loading: true
  });
}

/* 退出账号 */
export function loginOut() {
  return fetch({
    url: "/auth/logout",
    method: "get"
  });
}

/* 个人中心 */
export function person() {
  return fetch({
    url: "/index/member",
    method: "get",
    loading: true
  });
}

/* 账目明细 */
export function accountDetails(query) {
  return fetch({
    url: "/cash/account",
    method: "get",
    params: query,
    loading: true
  });
}

/* 第三方游戏列表 */
export function thirdGameList() {
  return fetch({
    // url: "/chess/getThirdConvertList",
    url: "/game/thirdGameList",
    method: "get",
    loading: true
  });
}

/* 额度转换游戏金额 */
export function thirdMoney(query) {
  return fetch({
    // url: "/chess/getThirdConvertList",
    url: "/game/thirdMoney",
    method: "post",
    data: query
  });
}

/* 归户 */
export function exchangeAllToLottery() {
  return fetch({
    // url: "/chess/exchangeAllToLottery",
    url: "/game/exchangeAllToLottery",
    method: "get",
    loading: true
  });
}

/* 额度转换 */
export function exchangeMoney(query) {
  return fetch({
    url: "/game/exchangeMoney",
    method: "post",
    data: query,
    loading: true
  });
}

/* 消息列表 */
export function messageList(query) {
  return fetch({
    url: "/member/message",
    method: "get",
    params: query,
    loading: true
  });
}

/* 消息详情 */
export function msgDetail(query) {
  return fetch({
    url: "/member/messageDetail",
    method: "get",
    params: query,
  });
}

/* 删除消息 */
export function deleteMessage(query) {
  return fetch({
    url: "/member/deleteMessage",
    method: "get",
    params: query,
  });
}


/* 公告列表 */
export function announcement() {
  return fetch({
    url: "/system/notice",
    method: "get",
  });
}

/* 充值准备 */
export function rechargeBefore() {
  return fetch({
    url: "/cash/rechargeBefore",
    method: "get",
    loading: true
  });
}

/* 关于我们 */
export function aboutUs() {
  return fetch({
    url: "/system/about",
    method: "get",
  });
}

/* 帮助中心 */
export function help() {
  return fetch({
    url: '/member/help',
    method: 'get',
    loading: true
  })
}

/* 修改登录密码 */
export function changeUserPwd(query) {
  return fetch({
    url: "/member/resetPassword",
    method: "post",
    data: query
  });
}
/* 修改提现密码 */
export function changeWithdrawPwd(query) {
  return fetch({
    url: "/member/resetCoinPassword",
    method: "post",
    data: query
  });
}
/* 修改取款人姓名*/
export function changeModifyAccount(query) {
  return fetch({
    url: "/member/modifyAccount",
    method: "post",
    data: query
  });
}
/* 绑定银行卡 */
export function bindingBank(query) {
  return fetch({
    url: "/member/binding",
    method: "post",
    data: query,
    loading: true
  });
}

/* 我的银行卡 */
export function myBankCard() {
  return fetch({
    url: "/member/bank",
    method: "get",
  });
}

/* 提现金额 */
export function withdrawMoney(query) {
  return fetch({
    url: "/cash/withdraw",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值申请完后提交 */
export function rechargeSubmit(query) {
  return fetch({
    url: "/cash/rechargeSubmit",
    method: "post",
    data: query,
    loading: true
  });
}

/* 会员中心*/
export function getMember(query) {
  return fetch({
    url: "/member/memberLevel",
    method: "get",
    params:query,
    loading: true
  });
}

/* 会员中心*/
export function memberLevelBonus(query) {
  return fetch({
    url: "/member/memberLevelBonus",
    method: "post",
    data:query,
    loading: true
  });
}

/* 盈亏统计 */
export function statistics(query) {
  return fetch({
    url: "/member/statistics",
    method: "get",
    params: query,
    loading: true
  })
}

/* 银行卡列表 */
export function bindingBefore () {
  return fetch({
    url: "/member/bindingBefore",
    method: "get"
  })
}

/* 分享 */
export function shareParameter () {
  return fetch({
    url: "/index/share",
    method: "get"
  })
}

/* 游戏记录列表 */
export function thirdList () {
  return fetch({
    url: '/lottery/thirdList',
    method: 'get'
  })
}

/* 游戏记录查询 */
export function getRecord (query) {
  return fetch({
    url: '/lottery/record',
    method: 'get',
    params: query,
    loading: true
  })
}

/* 投诉建议 */
export function addSuggest (query) {
  return fetch({
    url: '/member/addSuggest',
    method: 'post',
    data: query
  })
}

/* 获取手机验证码 */
export function sendSms(query) {
  return fetch({
    url: '/Auth/sendSms',
    method: 'post',
    data: query
  })
}

/* 手机号登录 */
export function loginByMobile(query) {
  return fetch({
    url: '/auth/loginByMobile',
    method: 'post',
    data: query
  })
}

/* 绑定手机号 */
export function bindMobile (query) {
  return fetch({
    url: '/member/bindMobile',
    method: 'post',
    data: query
  })
}

/* 活动申请 √ */
export function appllyActivity(query) {
  return fetch({
    // url: "/game",
    url: "/activity/apply",
    method: "post",
    data: query,
    loading: true
  });
}

/* 第三方游戏大厅 √ */
export function thirdHall(query) {
  return fetch({
    url: "/game/thirdHall",
    method: "get",
    params: query,
  });
}

/* 充值记录 */
export function rechargeRecord(query) {
  return fetch({
    url: "/cash/rechargeRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/* 提现记录 */
export function withdrawalsRecord(query) {
  return fetch({
    url: "/cash/withdrawRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/*红包页面 */
export function redPacket() {
  return fetch({
    url: "/activity/redPacket",
    method: "get",
    loading: true
  });
}

/*点击红包请求 */
export function grabRedPacket(query) {
  return fetch({
    url: "/activity/grabRedPacket",
    method: "post",
    data: query
  });
}
/*推荐码*/
export function spread() {
  return fetch({
    url: "member/spread",
    method: "get"
  });
}
/* 修改头像 */
export function modifyUser(query) {
  return fetch({
    url: "/member/modifyUser",
    method: "post",
    data: query
  })
}
/* 余额宝首页 */
export function yueBao(query) {
  return fetch({
    url: "/yuebao/index",
    method: "post",
    data: query
  })
}
/* 余额宝客服 */
export function yueBaoHelp(query) {
  return fetch({
    url: "/yuebao/help",
    method: "post",
    data: query,
    loading: true
  })
}
/* 收支明细 */
export function yuebaoLog(query) {
  return fetch({
    url: "/yuebao/log",
    method: "get",
    params: query,
    loading: true
  });
}
/* 转入记录 */
export function yuebaoRecord(query) {
  return fetch({
    url: "/yuebao/record",
    method: "get",
    params: query,
    loading: true
  });
}
/* 转入余额宝 */
export function transFerIn(query) {
  return fetch({
    url: "/yuebao/transferIn",
    method: "get",
    params: query,
    loading: true
  });
}
/* 转出余额宝 */
export function transferOut(query) {
  return fetch({
    url: "/yuebao/transferOut",
    method: "get",
    params: query,
    loading: true
  });
}

/* 签到列表 */
export function signList() {
  return fetch({
    url: "/member/signList",
    method: "get",
    loading: true
  });
}
/* 签到列表 */
export function signIn(query) {
  return fetch({
    url: "/member/signIn",
    method: "post",
    data: query,
    loading: true
  });
}

