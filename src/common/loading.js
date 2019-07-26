import Load from "../components/common/Loading";
import Vue from 'vue';
const LoadingPlugin = Vue.extend(Load);
let loadVm;

export default {
  open(black) {
    if(!loadVm) {
      loadVm = new LoadingPlugin({
        el: document.createElement("div")
      })
    }
    if(loadVm.loadShow) return;
    document.body.appendChild(loadVm.$el);
    console.log(black,"loading====================================black");
    Vue.nextTick(()=>{
      if(black){
        loadVm.black = black;
      }else {
        loadVm.black = false;
      }
      loadVm.loadShow = true;
    })
  },
  close() {
    if(loadVm) {
      loadVm.loadShow = false
    }
  }
}

/**
 * 方法1
 * */
// const Loading = {};
//
// Loading.install = function (Vue) {
//   const LoadingPlugin = Vue.extend(Load);
//   const $vm = new LoadingPlugin();
//   $vm.$mount(document.createElement("div"));
//   document.body.appendChild($vm.$el);
//   let loadings = {
//     show(){
//       $vm.loadShow = true
//     },
//     hide(){
//       $vm.loadShow = false
//     }
//   };
//   Vue.prototype.$loading = loadings;
// };
//
// export default Loading;

/**
 * 方法2
 * */
// let $vm;
// export default {
//   install(Vue,option){
//     if(!$vm){
//       const LoadingPlugin = Vue.extend(Loading);
//       $vm = new LoadingPlugin({
//         el: document.createElement('div')
//       });
//       console.log($vm,"================$vm")
//       document.body.appendChild($vm.$el)
//
//       let loading = {
//         show(){
//           $vm.loadShow = true
//         },
//         hide(){
//           $vm.loadShow = false
//         }
//       };
//
//       Vue.$loading = loading;
//
//       Vue.mixin({
//         created () {
//           this.$loading = Vue.$loading
//         }
//       })
//     }
//   }
// }
