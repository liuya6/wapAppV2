import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import { Toast } from "vant";
import { Dialog } from 'vant';

import Home from './home'
import Activity from './activity'
import Wallet from './wallet'
import User from './user'
import Game from "./game"
import Find from "./find"

const router = new Router({
  mode: 'history',
  routes: [
    ...Home,
    ...Activity,
    ...Wallet,
    ...User,
    ...Game,
    ...Find,
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = router.app.$options.store.getters.userInfo;
  if (to.meta.denyAuth) {
    if (userInfo) {
      return next({
        name: "user"
      });
    }
  }
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      // 登录验证
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // next = push
      console.log(to.fullPath);
      Dialog.confirm({
        title: '提示',
        message: '您还未登录，立即登录？'
      }).then(() => {
        return next({
          path: "/login",
          query: { redirect: to.fullPath }
        });
      }).catch(() => {
        // on cancel
        console.log("取消");
        return next(false);
      });
      return false;
    }
    if (userInfo.parentId == 312 && to.meta.testIsNo) {
      // 试玩账号验证
      Toast("试玩账号无法进入");
      return next(false);
    }
  }
  return next();
});


export default router;
