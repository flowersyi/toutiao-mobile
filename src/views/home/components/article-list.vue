<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时
    会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后
      将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。-->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesList } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 文章数据列表
      finished: false, // 控制加载中的 loading 状态
      loading: false, // 控制加载结束的状态，当加载结束，不再触发加载更多（不再触发 load 事件）
      refreshing: false, // 下拉刷新的 loading 状态
      timestamp: null, // 获取下一页数据的时间戳,
      scrollTop: 0 // 列表滚动到顶部的距离
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    // 把记录到顶部的记录重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 1. 请求获取数据
      const { data } = await getArticlesList({
        // 文章频道 id
        channel_id: this.channel.id,
        // Date.now() / +new Date() 表示获取当前最新数据
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳。时间戳相当于页码
        // 下一页数据使用上一页返回的数据中的时间戳
        timestamp: this.timestamp || +new Date(),
        with_top: 0 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      console.log(data)
      this.timestamp = data.data.pre_timestamp
      const { results } = data.data
      this.list.push(...results)

      // 2.把数据放到 list 数组中
      // 注意：是 push 进去

      // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则会永远的停在这里
      this.loading = false

      // 4.数据全部加载完成
      if (results.length) {
        // 如果还有数据,更新获取下一次的代码
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 全部数据不多时,清空数据全部加载完成状态
      // this.finished = false

      // 将 loading 设置为 true，表示处于加载状态
      // this.refreshing = true
      // 下拉刷新，组件自己会展示 loading 状态
      // 1.重新获取加载数据
      const { data } = await getArticlesList({
        // 文章频道 id
        channel_id: this.channel.id,
        // Date.now() / +new Date() 表示获取当前最新数据
        timestamp: Date.now(),
        with_top: 0 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const { results } = data.data
      // 2.把数据放到数据列表中（往顶部追加）
      this.list.unshift(...results)
      // 关闭 刷新的状态 loading
      this.refreshing = false
      const message = results.length ? `更新了${results.length}条数据` : '暂无数据更新'
      this.$toast({
        message: message,
        position: 'top',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: scroll;
}
</style>
