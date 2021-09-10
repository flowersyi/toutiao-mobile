<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list v-model="loading" :finished="finished" finished-text="已加载全部评论" @load="onLoad">
      <comment-item
        v-for="(comment,index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
        :reply-count="replyCount"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticleComm } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    // 如果获取文章评论，则传递评论id
    // 如果获取评论回复，则传递评论id
    source: {
      type: [String, Number, Object],
      required: true
    },
    // 获取文章评论，使用字符 a,
    // 获取评论回复, 使用字符 c
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      // default: [] 报错
      // 数组或对象的默认值必须通过函数返回
      // 简写方式
      default: () => []
      // default: function () {
      //   return []
      // }
    },
    replyCount: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticleComm({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      this.$emit('comm-count', data.data.total_count)
      // 2.把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // console.log(data)
      console.log('.....')
      console.log(data)
      console.log(this.list)
      // 3.加载状态结束
      this.loading = false

      // 4.判断是否还有数据，
      //  有就继续获取下一页数据
      //  没有数据，则将finished状态设置为true，不在触发加载更多
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
      // if (this.list.length >= 10) {
      // }
    }
  }
}
</script>

<style scoped lang="less">
</style>
