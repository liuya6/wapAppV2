<template>
  <div class="help flex" v-title="'帮助中心'">
    <Header title="帮助中心" :style="{borderBottom:(detailShow?'1px solid #ccc':'')}" :isSlot="true">
      <i class="iconfont back" @click="goBack">&#xe629;</i>
    </Header>
    <div class="content">
      <div class="fg" v-show="!detailShow"></div>
      <div class="detail" v-if="detailShow">
        <h1>{{detailContent.title}}</h1>
        <p v-html="detailContent.content"></p>
      </div>
      <div v-else>
        <van-collapse v-model="activeNames" v-if="helpList.length">
          <van-collapse-item :name="i" v-for="(item,i) in helpList" :key="i">
            <div slot="title" class="title">
              <div>
                <img :src="item.typeImg" alt="">
              </div>
              <span>{{item.typeName}}</span>
            </div>
            <van-cell v-for="(child,j) in item.list" :key="j" :title="j+1+'. '+child.title" is-link @click="lookDetail(child)" />
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from "vuex";
  import { help } from "../../api";
  export default {
    name: "Help",
    data() {
      return{
        activeNames: [],
        detailShow: false,
        detailContent: ''
      }
    },
    created(){
      if(typeof this.helpList === 'undefined' || !this.helpList.length){
        this.initData()
      }
    },
    computed:{
      ...mapGetters(['helpList']),
    },
    methods:{
      ...mapMutations(['SET_HELP_LIST']),
      initData(){
        help().then(res=>{
          console.log(res);
          if(res.status){
            this.SET_HELP_LIST(res.data);
          }
        })
      },
      lookDetail(detail){
        this.detailContent = detail;
        this.detailShow = true;
      },
      goBack(){
        if(this.detailShow){
          this.detailShow = false;
          this.detailContent = '';
          return;
        }
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
.help {
  .fg {
    height: 30px;
    background-color: @BG;
  }
  .detail{
    padding: 30px;
    h1{
      font-size: 34px;
      line-height: 60px;
      margin-bottom: 20px;
    }
    p {
      line-height: 40px;
      margin-bottom: 20px;
      font-size: 28px;
    }
  }
  .van-collapse {
    .van-collapse-item{
      .van-cell{
        .van-cell__title{
          .title {
            display: flex;
            align-items: center;
            div {
              width: 56px;
              height: 56px;
              float: left;
              img {
                width: 100%;
                height: 100%;
              }
            }
            span {
              margin-left: 20px;
              font-size: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
