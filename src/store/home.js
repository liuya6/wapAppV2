import { allGame,initHome,jackpot  } from "../api";

const Home = {
  state: {
    homeInfo: "",
    allGame: "",
    gameUrl: "", //游戏url
    jackpotNum: "", //老虎机奖池
    playStartShow: false, // 开始游戏准备窗口
    redPackContent: "" // 红包
  },
  getters: {
    homeInfo: state => {
      return state.homeInfo
    },
    allGame: state => {
      return state.allGame
    },
    gameUrl: state => {
      return state.gameUrl;
    },
    jackpotNum: state => {
      return state.jackpotNum
    },
    playStartShow: state => {
      return state.playStartShow
    },
    redPackContent: state => {
      return state.redPackContent
    }
  },
  mutations: {
    SET_INITHOME:(state,payload)=>{
      // console.log(state,payload);
      state.homeInfo = payload
    },
    SET_ALL_GAME:(state,payload)=>{
      // console.log(state,payload);
      state.allGame = payload
    },
    SET_GAME_URL: (state, payload) => {
      state.gameUrl = payload
    },
    SET_JACKPOT: (state,payload) => {
      state.jackpotNum = payload
    },
    SET_PLAY_START_SHOW: (state,payload) => {
      state.playStartShow = payload
    },
    SET_REDPACK: (state,payload) => {
      state.redPackContent = payload
    }
  },
  actions: {
    getInitHome(context) {
      initHome().then(res => {
        if (res.status) {
          // console.log(res.data, "homeInfo---------------");
          context.commit("SET_INITHOME", res.data);
        }
      });
    },
    getAllGame(context) {
      allGame().then(res => {
        try {
          console.log(res,"游戏大厅---------------------");
          if (res.status) {
            context.commit("SET_ALL_GAME", res.data);
          } else {
            context.commit("SET_ALL_GAME", null);
          }
        } catch (err) {
          console.log(err, "getAllGame err");
        }
      })
    },
    jackpots(context){
      jackpot().then(res=>{
        if(res.status){
          // console.log(res.data);
          context.commit('SET_JACKPOT',res.data)
        }
      })
    }
  }
};
export default Home;
