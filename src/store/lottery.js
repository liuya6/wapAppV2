import { newAllGame,getLotteryList } from "../api";

const Lottery = {
  state: {
    lotteryData: {},
    groupData: {},
    playData: {},
    awardData: {},
    newAllGame: [],
    lotteryList: []
  },
  getters: {
    lotteryData: state => {
      return state.lotteryData;
    },
    groupData: state => {
      return state.groupData;
    },
    playData: state => {
      return state.playData;
    },
    optionsHash: (state, getters) => {
      return getters.playData.options;
    },
    awardData: state => {
      return state.awardData;
    },
    awardNext: (state, getters) => {
      return getters.awardData.next;
    },
    newAllGame: state => {
      return state.newAllGame.filter(item=> item.typeKey==='Lottery')[0].list.filter(item=> item.gameType !==8).filter(item=> item.gameType !== 9)
    },
    lotteryList: state => {
      return state.lotteryList
    }
  },
  mutations: {
    SET_LOTTERY_DATA: (state, payload) => {
      state.lotteryData = payload;
    },
    SET_GROUP_DATA: (state, payload) => {
      state.groupData = payload;
    },
    SET_PLAY_DATA: (state, payload) => {
      state.playData = payload;
    },
    SET_AWARD_DATA: (state, payload) => {
      state.awardData = payload;
    },
    SET_AWARD_NEXT: (state, payload) => {
      state.awardNext = payload;
    },
    SET_GROUP_DATA_ID: (state, payload) => {
      state.groupData.id = payload;
    },
    SET_PLAY_DATA_ID: (state, payload) => {
      state.playData.id = payload;
    },
    NEW_ALL_GAME: (state, payload) => {
      state.newAllGame = payload;
    },
    SET_LOTTERY_LIST:(state, payload) => {
      state.lotteryList = payload;
    }
  },
  actions: {
    setLotteryData: (context, payload) => {
      context.commit("SET_LOTTERY_DATA", payload);
    },
    setGroupData: (context, payload) => {
      context.commit("SET_GROUP_DATA", payload);
    },
    setPlayData: (context, payload) => {
      context.commit("SET_PLAY_DATA", payload);
    },
    setAwardData: (context, payload) => {
      context.commit("SET_AWARD_DATA", payload);
    },
    setAwardNext: (context, payload) => {
      context.commit("SET_AWARD_NEXT", payload);
    },
    newAllGames({ commit }) {
      newAllGame().then(res => {
        commit("NEW_ALL_GAME", res.data);
      });
    },
    getLotteryLists({commit}) {
      getLotteryList().then(res => {
        if (res.status) {
          this.lotteryList = res.data;
          commit("SET_LOTTERY_LIST",res.data)
        }
      });
    },
  }
};

export default Lottery;
