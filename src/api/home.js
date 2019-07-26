import { fetch } from "../axios";

/* 系统设置 */
export function allSetting() {
  return fetch({
    url: "/system/settings",
    method: "get",
  });
}

/* 首页数据 */
export function initHome() {
  return fetch({
    url: "/Index/initHome",
    method: "get",
  });
}

/* 游戏大厅 */
export function allGame() {
  return fetch({
    url: "/index/hall",
    method: "get",
  });
}

/* 老虎机奖池 */
export function jackpot() {
  return fetch({
    url: '/index/jackpot',
    method: 'get'
  })
}
