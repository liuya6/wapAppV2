import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./style/index.less"
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { exchangeAllToLottery } from "./api";
import { Dialog } from 'vant';

const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components/common",
  // 是否查询其子目录
  true
  // 匹配基础组件文件名的正则表达式
  // /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

import BetFunc from "./common/betFunc";
Vue.use(BetFunc);

import Loadings from "./common/loading";
Vue.prototype.$loading = Loadings;
Vue.use(Loadings);

// 日历
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);

import VueClipboard from "vue-clipboard2"; //银行卡复制模块
Vue.use(VueClipboard);

Vue.prototype.$_eval = function(fn) {
  return new Function("return " + fn)();
};

Vue.prototype.bankNum = function(card) {
  return card
    .replace(/\s/g, "")
    .replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2");
};

Vue.directive("focus", {
  //全局input聚焦
  inserted: function(el) {
    el.focus();
  }
});

Vue.prototype.playGame = function(classify,typeKey,isHall,link = false,title = "",id = false) {
  console.log(classify,typeKey,isHall,link,title,id);
  if (classify === "CP") {
    if (link) {
      console.log(link, typeKey);
      if (!this.$store.getters.userInfo) {
        Dialog.confirm({
          title: '提示',
          message: '您还未登录，立即登录？'
        }).then(() => {
          // on confirm
          return router.push({
            name: "login",
            query: { redirect: router.currentRoute.fullPath }
          });
        }).catch(() => {
          // on cancel
          return false;
        });
        return false;
      }
      if(this.$store.getters.userInfo.parentId == 312) {
        return this.$toast("试玩账号无法进入")
      }
      // if(typeKey === 'VR'){
      //   return this.winOpen(link)
      // }
      sessionStorage.setItem('pathName',this.$route.name);
      exchangeAllToLottery().then(res=>{
        console.log(res);
        this.$store.commit("SET_GAME_URL", link);
        this.$store.commit("SET_PLAY_START_SHOW",true)
        // this.$router.replace({name: "playing",params:{typeKey,classify}});
      });
      return false;
    }
    exchangeAllToLottery().then(res=> {
      console.log(res);
      return this.$router.push({
        name: "hall"
      })
    })
  } else {
    if (isHall) {
      console.log(typeKey,classify);
      return this.$router.push({
        name: "electronicGames",
        params: { typeKey, classify }
      });
    }
    if (!link) {
      return this.$toast("敬请期待");
    }
    // if (typeKey === "AG") {
    //   return this.winOpen(link);
    // }
    if (!this.$store.getters.userInfo) {
      Dialog.confirm({
        title: '提示',
        message: '您还未登录，立即登录？'
      }).then(() => {
        // on confirm
        return router.push({
          name: "login",
          query: { redirect: router.currentRoute.fullPath }
        });
      }).catch(() => {
        // on cancel
        return false;
      });
      return false;
    }
    if(this.$store.getters.userInfo.parentId == 312) {
      return this.$toast("试玩账号无法进入")
    }
    // if(!typeKey || !classify){
    //   typeKey = this.$route.params.typeKey;
    //   classify = this.$route.params.classify;
    // }
    sessionStorage.setItem('pathName',this.$route.name);
    exchangeAllToLottery().then(res=>{
      console.log(res);
      this.$store.commit("SET_GAME_URL", link);
      this.$store.commit("SET_PLAY_START_SHOW",true)
      // this.$router.replace({name: "playing",params:{typeKey,classify}});
    })
  }
};

Vue.prototype.timestampToString = function(timestamp = +new Date()) {
  //解析时间戳
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};
Vue.prototype.timeNoYear = function(timestamp = +new Date()) {
  //解析时间戳
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.prototype.back = function() {
  //全局返回
  if (window.history.length < 3) {
    return router.push({ name: "home" });
  }
  router.go(-1);
};

Vue.filter("timeRun", function(timeVal) {
  if (timeVal > 0) {
    let house =
      parseInt(timeVal / 60 / 60) >= 10
        ? parseInt(timeVal / 60 / 60)
        : "0" + parseInt(timeVal / 60 / 60);
    let mins =
      parseInt((timeVal / 60) % 60) >= 10
        ? parseInt((timeVal / 60) % 60)
        : "0" + parseInt((timeVal / 60) % 60);
    let sec = timeVal % 60 >= 10 ? timeVal % 60 : "0" + (timeVal % 60);
    return house + ":" + mins + ":" + sec;
  } else {
    return "开奖中...";
  }
});

Vue.filter("activityTime", function (timeVal) {
  if (timeVal > 0) {
    let getHour = parseInt(timeVal / 60 / 60)
    let day = parseInt(getHour / 24) == 0 ? '' : parseInt(getHour / 24) + ' 天 '
    let hour = getHour % 24 >= 10 ? getHour % 24 : "0" + getHour % 24;
    let mins =
      parseInt((timeVal / 60) % 60) >= 10 ?
      parseInt((timeVal / 60) % 60) :
      "0" + parseInt((timeVal / 60) % 60);
    let sec = timeVal % 60 >= 10 ? timeVal % 60 : "0" + (timeVal % 60);
    return day + hour + " 时 " + mins + " 分 " + sec + " 秒";
  }
});

Vue.prototype.imgUrl = function(url, type = "") {
  //图片地址获取
  if (type === "Lottery") {
    // 带有图片格式
    if (url.indexOf('/images') >= 0) {
      return url;
    } else {
      return `/images${url}`;
    }
  } else if (type === "lottery") {
    return `/images/lottery/${url}.png`;
  } else {
    return `${url}`;
  }
};

Vue.prototype.cdnImg = function(type) {
  return `${this.$store.getters.allConfig.staticZhpUrl}${type}`
};
Vue.prototype.commonImg = function(type) {
  return `${this.$store.getters.allConfig.staticUrl}${type}`
};
Vue.prototype.winOpen = function(url) {
  this.$store.commit("SET_PLAY_START_SHOW",false);
  window.open(url);
};

Vue.directive("title", {
  // 指令的定义
  inserted: function(el, binding) {
    if (!router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.webName;
      if (binding.value !== "") {
        titles = binding.value + " - " + titles;
      }
      document.title = titles;
    }
  },
  update: function(el, binding) {
    let routerName = router.history.current.name;
    if (routerName === "bet" || router.currentRoute.meta.keepAlive) {
      if(routerName==="home"){
        document.title = router.app.$options.store.getters.webName;
        return;
      }
      let titles = router.app.$options.store.getters.webName;
      let bindingVal = router.currentRoute.meta.DocumentTitle;
      if (routerName === "bet") {
        bindingVal = binding.value;
      }
      titles = bindingVal + " - " + titles;
      document.title = titles;
    }
  }
});

Vue.directive("move",{
  inserted:function (el, binding, vnode) {
    let startX;
    let moveX;
    let maxX;
    let flag = false;
    el.ontouchstart = function(e) {
      e = window.event || e;
      startX = e.changedTouches[0].clientX;
      maxX = vnode.children[vnode.children.length-1].elm.clientWidth;
      if(el.style.left == -maxX+"px") {
        flag = true;
      }
    };
    el.ontouchmove = function (e) {
      e= window.event || e;
      moveX = e.changedTouches[0].clientX - startX;
      console.log(moveX);
      if(moveX < 0) {
        el.style.left = parseInt(moveX) + "px";
        if(Math.abs(moveX) >= maxX) {
          el.style.left = -maxX + "px";
        }
      }else {
        if(flag) {
          e.stopPropagation();
          el.style.left = "0px"
        }
      }
    };
    el.ontouchend = function () {
      flag = false;
      if(moveX <0 && Math.abs(moveX) > ( maxX *(2/3))) {
        el.style.left = -maxX + "px";
      }else {
        if(el.style.left == (-maxX+"px")) {
          return;
        }
        el.style.left = 0 + "px";
      }
    };
  },
});

Vue.prototype.playAudio = () => {
  let Audios = document.getElementById("eventAudio");
  Audios.play();
};
Vue.prototype.pauseAudio = () => {
  let Audios = document.getElementById("eventAudio");
  Audios.pause();
};

Vue.prototype.times = function() {
  this.$store.commit("CHANGE_IS_RUN", 1);
  clearInterval(this.setTimer);
  let that = this;
  if (!!this.awardData.next.actionTime && !!this.awardData.nowTime) {
    var time = this.awardData.next.actionTime - this.awardData.nowTime;
  }
  if (time > 0) {
    this.setTimer = setInterval(function() {
      time--;
      if (time / 60 > 60) {
        var house =
          parseInt(time / 60 / 60) >= 10
            ? parseInt(time / 60 / 60)
            : "0" + parseInt(time / 60 / 60);
        var mins =
          parseInt((time / 60) % 60) >= 10
            ? parseInt((time / 60) % 60)
            : "0" + parseInt((time / 60) % 60);
      }
      let min =
        parseInt(time / 60) >= 10
          ? parseInt(time / 60)
          : "0" + parseInt(time / 60);
      let sec = time % 60 >= 10 ? time % 60 : "0" + (time % 60);
      if (house) {
        that.time = house + ":" + mins + ":" + sec;
        return;
      } else {
        that.time = "00:" + min + ":" + sec;
      }
      if (time <= that.lotteryData.data_ftime) {
        if (that.$store.getters.isRun) {
          that.$emit("timeOver", time);
          that.$store.commit("CHANGE_IS_RUN", 0);
        }
        if (time <= 0) {
          that.time = "00:00:00";
        }
      }
    }, 1000);
  }
};

Vue.prototype.playLottery = function(id,classify,title){
  console.log(id,classify,title);
  this.$router.push({
    name: "bet",
    params: { id: id, classify: classify },
    query: { title: title }
  });
  // this.$store.dispatch("clearCartCode");
};

/**
 * vant
 * */
import {
  Tab,
  Tabs,
  // Swipe,
  // SwipeItem,
  Button,
  List,
  PullRefresh,
  Toast,
  Cell,
  CellGroup,
  NoticeBar,
  Popup,
  Field,
  NumberKeyboard,
  PasswordInput,
  Collapse,
  CollapseItem,
  Picker,
  Loading,
  Area,
  Checkbox,
} from "vant";
Vue.use(Tab)
  .use(Tabs)
  // .use(Swipe)
  // .use(SwipeItem)
  .use(Button)
  .use(List)
  .use(PullRefresh)
  .use(Toast)
  .use(Cell)
  .use(CellGroup)
  .use(Popup)
  .use(NoticeBar)
  .use(Field)
  .use(NumberKeyboard)
  .use(PasswordInput)
  .use(Collapse)
  .use(CollapseItem)
  .use(Picker)
  .use(Loading)
  .use(Area)
  .use(Checkbox);
Toast.setDefaultOptions({ duration: 2000 });

/**
 * mint-ui
 * */
import 'mint-ui/lib/style.css'
import { Loadmore,Navbar,TabItem,InfiniteScroll,TabContainer,TabContainerItem,Spinner,Range,Swipe,SwipeItem} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Range.name, Range);

window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
}
setHtmlFontSize();

import "lib-flexible/flexible.js"; // 移动端自适应
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
