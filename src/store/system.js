import { allSetting } from "../api";

const system = {
  state: {
    isRun: 1,
    allConfig: "",
    musicFlag: true
  },
  getters: {
    webName: (state, getters) => {
      return getters.allConfig.webName || "彩票";
    },
    isRun: state => {
      return state.isRun;
    },
    allConfig: state => {
      return state.allConfig;
    },
    tjShowFlag: (state, getters) => {
      return getters.allConfig.enableTuijian === "1";
    },
    musicFlag: state => {
      return state.musicFlag;
    }
  },
  mutations: {
    CHANGE_IS_RUN: (state, payload) => {
      state.isRun = payload;
    },
    SET_ALL_CONFIG: (state, payload) => {
      // console.log(payload,"allConfig")
      state.allConfig = payload;
    },
    CHANGE_MUSIC_FLAG: state => {
      state.musicFlag = !state.musicFlag;
    }
  },
  actions: {
    getAllConfig(context) {
      allSetting().then(res => {
        // console.log(res,'设置项-------------');
        if (res.status) {
          context.commit("SET_ALL_CONFIG", res.data);
        }
      });
    }
  }
};

export default system;
