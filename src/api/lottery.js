import { fetch } from "../axios";
/* 新游戏大厅 √ */
export function newAllGame() {
  return fetch({
    url: "/index/hallNew",
    method: "get",
  });
}

/* 彩票列表 */
export function getLotteryList() {
  return fetch({
    url: "/lottery/index",
    method: "get",
  });
}

/* 彩票开奖 */
export function lotteryAward(query) {
  return fetch({
    url: "/lottery/award",
    method: "get",
    params: query
  });
}

/* 彩票玩法 */
export function lotteryGroup(query) {
  return fetch({
    // url: "/game/lotteryGroup",
    url: "/lottery/group",
    method: "get",
    params: query,
    loadingBlack: true
  });
}

/* 随机号码 */
export function lotteryRandom(query) {
  return fetch({
    url: "/lottery/random",
    method: "get",
    params: query,
  });
}

/*消息实时通知*/
export function getMessage() {
  return fetch({
    url: "member/getMessage",
    method: "get"
  });
}

/* 购买彩票 */
export function lotteryBuy(query) {
  return fetch({
    url: "/lottery/buy",
    method: "post",
    data: query,
    loading: true
  });
}

/* 追号 */
export function lotteryFuture(query) {
  return fetch({
    url: "/lottery/future",
    method: "get",
    params: query,
    loading: true
  });
}

/* 历史开奖 */
export function lotteryHistory(query) {
  return fetch({
    url: "/lottery/history",
    method: "get",
    params: query,
    loading: true
  });
}

/* 彩票记录 */
export function lotteryRecord(query) {
  return fetch({
    url: "/lottery/oldRecord",
    method: "get",
    params: query,
    loading: true
  });
}
/*长龙列表*/
export function changLongList() {
  return fetch({
    url: "/lottery/changLong",
    method: "get"
  });
}

/* 六合彩生肖号码 */
export function sixZodiacNumber(query) {
  return fetch({
    url: "/lottery/sixZodiacNumber",
    method: "get",
    params: query
  });
}

/* 彩票详情 */
export function lotteryDetail(query) {
  return fetch({
    url: "/lottery/recordDetail",
    method: "get",
    params: query,
    loading: true
  });
}

// 撤销投注
export function lotteryCancel(query) {
  return fetch({
    url: "/lottery/cancel",
    method: "post",
    data: query
  });
}
