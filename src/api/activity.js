import { fetch } from "../axios";

/* 全部活动 */
export function activity(query) {
  return fetch({
    url: "/activity/index",
    method: "get",
    params: query,
    loading: true
  });
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
/* 活动申请列表 */
export function activityApplyList(query) {
  return fetch({
    url: "/activity/applyList",
    method: "post",
    data: query,
  });
}
/* 活动申请记录详情 */
export function getActivityDetail(query) {
  return fetch({
    url: "/activity/applyDetail",
    method: "get",
    params: query,
  });
}
