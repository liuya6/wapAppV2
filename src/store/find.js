// import { getMember } from "../api";

const find = {
  state: {
    getVip: ''
  },
  getters: {
    getVip: state => {
      return state.getVip;
    }
  },
  mutations: {
    CHANGE_VIP: (state, payload) => {
        console.log(payload,"find.js--------------------");
        state.getVip = payload;
    }
  },
//   actions: {
//     getAllConfig(context) {
//       allSetting().then(res => {
//         // console.log(res,'设置项-------------');
//         if (res.status) {
//           context.commit("SET_ALL_CONFIG", res.data);
//         }
//       });
//     }
//   }
};

export default find;
