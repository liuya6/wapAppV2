<template>
  <div class="agentRule flex" v-title="'代理说明'">
  <Header title="代理说明"></Header>
  </div>
</template>

<script>
export default {
  name: "agentRule",
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
.agentRule {
  padding-top: 60px;
  .headerBox {
    height: unset;
  }
}
</style>