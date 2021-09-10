<template>
  <div class="my-container">
    <!-- 用户已登录头部 -->
    <van-cell-group class="my-info" v-if="user">
      <van-cell title="单元格" value="内容" center class="base-info" :border="false">
        <van-image class="avatar" slot="icon" fit="cover" :src="userInfo.photo" round />
        <div slot="title" class="name" v-cloak>{{ userInfo.name }}</div>
        <van-button size="small" class="update-btn" round to="/user/profile">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="num" v-cloak>{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="num" v-cloak>{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="num" v-cloak>{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="num" v-cloak>{{ Math.abs(userInfo.like_count) }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- /用户已登录头部 -->
    <!-- 用户未登录头部 -->
    <div class="not-login" v-else>
      <img src="./mobile.png" alt class="not-login-avatar" @click="$router.push('/login')" />
      <div class="not-login-name">点击登录</div>
    </div>
    <!-- /用户未登录头部 -->
    <van-grid :column-num="2" class="nav-grid">
      <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
      <van-grid-item icon="browsing-history-o" text="历史" class="nav-grid-item" />
    </van-grid>
    <!-- <van-cell title="消息通知" is-link to="/" class="cell-top" />
    <van-cell title="小智同学" is-link to="/" class="cell-top" />-->
    <van-cell title="退出登录" to class="cell-top login-btn" v-if="user" @click="toExit(user)" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import { getUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUser()
    }
  },
  mounted () { },
  methods: {
    async loadUser () {
      const { data } = await getUser()
      this.userInfo = data.data
    },
    toExit (user) {
      Dialog.confirm({
        title: '退出确认',
        message: '退出当前头条账号，将不能同步收藏，发布评论和云端分享等'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .base-info {
      background: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 22px;
        font-size: 10px;
        color: #666666;
      }
    }
    /deep/ .van-grid-item__content {
      background: unset;
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          text-align: center;
          .num {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 70px;
      /deep/ .van-grid-item__icon {
        font-size: 22px;
      }
      /deep/ .van-icon-star-o {
        color: #eb5253;
      }
      /deep/ .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .cell-top {
    margin-top: 10px;
  }
  .login-btn {
    text-align: center;
    color: #db6262;
  }
  // 未登录头部样式
  .not-login {
    background: url('./banner.png') no-repeat;
    background-size: cover;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .not-login-avatar {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .not-login-name {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
