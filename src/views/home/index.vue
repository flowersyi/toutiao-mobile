<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button icon="search" type="info" slot="title" round size="small" class="search-btn" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 文章列表频道 -->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs v-model="channel_active" class="channel-tabs">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id" class="tab-item">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
      <!-- 汉堡按钮定位把最后的标签页位置挡住了，解决办法就是添加一个占位元素 -->
      <!-- 域名插槽可以多个，最终都会插到同一个位置 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" class="channel-nav-right" @click="isChannelEditshow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- /文章列表频道 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isChannelEditshow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      get-container="body"
      :overlay="false"
    >
      <!-- <channel-edit
        :channels="channels"
        @close="isChannelEditshow = false"
        @update-active="onUpdateActive"
      />-->
      <!-- 模板中的 $event 表示事件参数  -->
      <channel-edit
        :channels="channels"
        :active="channel_active"
        @close="isChannelEditshow = false"
        @update-active="channel_active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  props: {},
  data () {
    return {
      channel_active: 0, // 控制被激活的标签
      channels: [], // 文章频道列表
      isChannelEditshow: false // 控制编辑频道的显示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () { },
  methods: {
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 已登录，获取用户线上频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录，判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          // 如果有本地存储的频道列表就使用
          channels = localChannels
        } else {
          // 如果没有本地存储的文章列表频道，那就请求获取默认推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    }
    // onUpdateActive (index) {
    //   this.channel_active = index
    // }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      flex-basis: 22%;
      padding: 0;
    }
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      background: #3296fa;
      bottom: 22px;
    }
    // /deep/ .van-tabs__nav--line {
    //   padding-bottom: 0;
    // }
    /deep/ .van-tabs__nav--complete {
      padding-right: 0px;
      padding-left: 0px;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0; // flex布局，该子元素占固定大小，不参与平分父元素宽度
  }
  /deep/ .channel-nav-right {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    opacity: 0.9;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-icon {
      font-size: 24px;
    }
  }
}
</style>
