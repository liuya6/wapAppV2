import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import Home from "./home";
import User from "./user";
import System from "./system"
import Lottery from "./lottery"
import Car from "./cart"
import Bet from "./bet"
import Find from "./find"

const handleStore = store => {
  let storage = window.sessionStorage;
  if (!storage) {
    return console.warn("当前浏览器不支持sessionStorage!");
  }
  // if (sessionStorage.store) {
  //   let state = JSON.parse(sessionStorage.store);
  //   store.replaceState(state);
  // }
  // console.log(sessionStorage.store, 'sessionStorage.store')
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    if (sessionStorage.getItem("nowUserAgent") == "PC") {
      sessionStorage.setItem("nowUserAgent", "移动");
    } else {
      if (sessionStorage.store) {
        // console.log(sessionStorage.store, 'sessionStorage.store')
        let state = JSON.parse(sessionStorage.store);
        store.replaceState(state);
      }
    }
  } else {
    if (sessionStorage.getItem("nowUserAgent") == "移动") {
      sessionStorage.setItem("nowUserAgent", "PC");
    } else {
      if (sessionStorage.store) {
        let state = JSON.parse(sessionStorage.store);
        store.replaceState(state);
      }
    }
  }

  store.subscribe((mutation, state) => {
    sessionStorage.setItem("store", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    Home,
    User,
    System,
    Lottery,
    Car,
    Bet,
    Find
  },
  plugins: [handleStore]
});