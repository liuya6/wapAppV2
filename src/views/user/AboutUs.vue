<style scoped lang="less">
.aboutUs {
  .headerBox{
    background: #fff;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
  }
  .content {
    padding-top: 30px;
    div {
      padding: 20px 50px 0 50px;
      font-size: 30px;
      line-height: 60px;
      text-align: left;
    }
  }
}
</style>
<template>
  <div class="aboutUs flex" v-title="'关于我们'" v-if="aboutUsArr.title">
    <Header :title="aboutUsArr.title"></Header>
    <div class="content">
      <div v-html="aboutUsArr.content"></div>
    </div>
  </div>
</template>

<script>
import { aboutUs } from "../../api";
import { mapGetters,mapMutations } from "vuex";
export default {
  name: "AboutUs",
  created () {
    if(typeof this.aboutUsArr === 'undefined' || !this.aboutUsArr.title){
      aboutUs().then(res => {
        if(res.status){
          this.SET_ABOUT_US(res.data);
        }
      });
    }
  },
  computed: {
    ...mapGetters(['aboutUsArr']),
  },
  methods: {
    ...mapMutations(['SET_ABOUT_US'])
  }
};
</script>
