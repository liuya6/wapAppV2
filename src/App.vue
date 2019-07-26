<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-if="allConfig">
      <audio :src="`${allConfig.staticUrl}music/stop-time.mp3`" id="eventAudio" loop="loop" preload="auto"></audio>
    </div>
    <CheckIn></CheckIn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      jackpotTimer: null
    };
  },
  beforeCreate() {
    if (sessionStorage.getItem("nowUserAgent") == null) {
      if (
        window.navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        sessionStorage.setItem("nowUserAgent", "移动");
      } else {
        sessionStorage.setItem("nowUserAgent", "PC");
      }
    }
  },
  created() {
    // console.log(sessionStorage, "sessionStorage");
    // sessionStorage.removeItem("store");
    // sessionStorage.clear();
    this.$store.dispatch("getAllConfig");
    this.$store.dispatch("newAllGames");
    this.$store.dispatch("getLotteryLists");
    this.$store.dispatch("getInitHome");
    this.jackpotRun();
    sessionStorage.touchstartNum = "1";
    this.$nextTick(() => {
      window.document.addEventListener("touchstart", () => {
        let Audios = document.getElementById("eventAudio");
        if (sessionStorage.touchstartNum == "1") {
          Audios.load();
          sessionStorage.touchstartNum = "0";
        }
      });
    });
  },
  destroyed() {
    sessionStorage.removeItem("store");
    sessionStorage.clear();
  },
  computed: {
    ...mapGetters(["userInfo","allConfig"])
  },
  watch: {
    $route(val) {
      if (
        val.name !== "bet" &&
        val.name !== "confirmpurchase" &&
        val.name !== "chasingcode"
      ) {
        // console.log("清除oldCodeList");
        if (this.oldCodeList.length) {
          this.CLEAR_OLD_CODE([]);
        }
      }
      if (val.name === "home") {
        this.jackpotRun();
      } else {
        clearInterval(this.jackpotTimer);
      }
    },
    userInfo(val) {
      if (typeof val === "string") {
        this.$router.replace({
          name: "login"
        });
      }
    }
  },
  methods: {
    jackpotRun() {
      clearInterval(this.jackpotTimer);
      this.jackpotTimer = setInterval(() => {
        this.$store.dispatch("jackpots");
      }, 5000);
    }
  }
};
</script>
