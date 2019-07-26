<template>
  <div class="recommend" v-title="'代理赚钱'">
    <Header title="代理赚钱" rightTitle="代理说明" rightTo="/agentRule"></Header>
    <div class="top"></div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      isLoading: false,
      activity: []
    };
  },
  created() {},
  methods: {
    init() {}
  }
};
</script>

<style scoped lang="less">
.recommend {
  .headerBox {
    height: unset;
    color: #fff;
    .header{
      .rightText {
        a {
          color: #fff
        }
      }
    }
  }
  .top {
    width: 100%;
    height: 500px;
    background: linear-gradient(#fe9739, #fd6c30);
  }
}
</style>
