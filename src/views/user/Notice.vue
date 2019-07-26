<template>
  <div class="noticeWrap flex" v-title="'消息列表'">
    <div class="content">
      <i @click="back" class="iconfont back">&#xe629;</i>
      <van-tabs v-model="active" swipeable @disabled="onClickDisabled" @click="onClick">
        <van-tab title="公告">
          <div class="announcement">
            <div class="list" v-for="(item, i) in announcement" :key="i">
              <p v-show="item.addTime">{{timestampToString(item.addTime)}}</p>
              <div class="radius">
                <p>{{item.title}}</p>
                <div>{{item.content}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="消息" :disabled="noLogin">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
              >
            <div class="notice radius">
              <p v-show="notice.length" >消息</p>
              <p v-show="noData" class="notNotice" >暂无记录</p>
              <div class="list" v-for="(item, i) in notice" :key="i">
                <div class="list-box" v-move="i">
                  <div class="isRead" :class="{red:item.is_readed==0}"></div>
                  <div class="box" @click="$router.push({name:'msgdetail',query:{id:item.id}})">
                    <p>发件人：{{item.from_username}} &nbsp;&nbsp;{{timestampToString(item.time)}}</p>
                    <div>主题：{{item.content}}</div>
                  </div>
                  <i class="iconfont">&#xe629;</i>
                  <div class="deleted" @click="deleted(item.id)"><i class="iconfont">&#xe738;</i><span>删除</span></div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { messageList, announcement,deleteMessage } from "../../api";
import { mapGetters } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "notice",
  data() {
    return {
      active: 0,
      notice: [],
      announcement: [],
      noData: false,
      loading: false,
      finished: false,
      messageQuery: {
        offset: 0,
        pageSize: 20,
      }
    }
  },
  created() {
    if(this.$route.params.type) {
      this.active = this.$route.params.type*1
    }
    if(this.userInfo) {
      this.initNotice();
    }
    this.initAnnoun()
  },
  computed: {
    ...mapGetters(['userInfo']),
    noLogin() {
      return !this.userInfo
    }
  },
  methods: {
    deleted(id) {
      console.log(id);
      deleteMessage({id:id}).then(res=> {
        Toast(res.msg);
        if(res.status) {
          this.notice = [];
          this.messageQuery.offset = 0;
          this.initNotice();
        }
      })
    },
    onClick(index) {
      this.$router.replace({name:'notice',params:{type:index}})
    },
    onClickDisabled(index,title) {
      console.log(index,title,this.$router.currentRoute.fullPath);
      this.$dialog.confirm({
        title: '提示',
        message: '您还未登录，立即登录？'
      }).then(() => {
        return this.$router.push({name:"login",query: { redirect: this.$router.currentRoute.fullPath }});
      }).catch(() => {
        // on cancel
        console.log("取消");
        return false;
      });
    },
    initNotice() {
      messageList(this.messageQuery).then(res => {
        console.log(res,'messageList');
        this.notice = res.data;
        if(this.notice.length){
          this.loading = false;
          this.noData = false
        }else {
          this.finished = true;
          this.noData = true;
          this.loading = false;
        }
      });
    },
    initAnnoun() {
      announcement().then(res => {
        console.log(res,'announcement');
        this.announcement = res.data;
      });
    },
    onLoad() {
      this.messageQuery.offset += this.messageQuery.pageSize;
      messageList(this.messageQuery).then(res => {
        console.log(res);
        if(res.data.length) {
          this.loading = false;
          this.notice = this.notice.concat(res.data);
        }else {
          this.finished = true;
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.noticeWrap {
  .content {
    background: @BG;
    position: relative;
    .back {
      position: fixed;
      z-index: 100;
      top: 14px;
      left: 10px;
      font-size: 46px;
      color: #282828;
      padding: 10px 20px;
    }
    .notice {
      margin: 30px;
      background: #fff;
      padding-bottom: 30px;
      > p {
        color: #333333;
        font-size: 36px;
        height: 94px;
        line-height: 94px;
        padding-left: 30px;
        border-bottom: 1px solid #aaaaaa;
        &.notNotice {
          padding-top: 30px;
          text-align: center;
          font-size: 28px;
          padding-left: 0;
          border-bottom: 0;
        }
      }

      .list {
        overflow: hidden;
        border-bottom: 1px solid #d3d3d3; /*no*/
        /*&:last-child {*/
        /*  border-bottom: 0;*/
        /*}*/
        .list-box {
          padding: 26px 20px 26px 58px;
          position: relative;
          left: 0;
          transition: 0.2s;
          .isRead {
            position: absolute;
            width: 20px;
            height: 20px;
            background: #999999;
            left: 28px;
            top: 35px;
            border-radius: 50%;
          }

          .red {
            background: @red;
          }

          .box {
            font-size: 28px;
            color: #666666;
            max-width: 90%;
            p {
              white-space: nowrap;
            }
            div {
              margin-top: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          > i {
            color: #666666;
            font-size: 36px;
            position: absolute;
            right: 20px;
            top: 55px;
            transform: rotateY(180deg);
          }
          .deleted {
            position: absolute;
            top: 0;
            right: -180px;
            width: 180px;
            height: 100%;
            background-color: @red;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            color: #fff;
            i {
              margin-right: 15px;
              color: #fff;
              font-size: 33px;
            }
          }
        }
      }
    }

    .announcement {
      padding: 0 30px 30px 30px;

      .list {
        padding-top: 30px;
        &:first-child{
          margin-top: 30px;
        }

        > p {
          background: #969696;
          font-size: 28px;
          color: #fffefe;
          width: 340px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          border-radius: 10px;
          margin-left: 180px;
          margin-bottom: 30px;
        }

        > div {
          background: #fff;
          padding: 20px;

          p {
            font-size: 38px;
            padding-bottom: 14px;
          }

          > div {
            font-size: 30px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
