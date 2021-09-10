<template>
  <div class="post-comment">
    <!-- v-model.trim自动去除内容首尾的空格 -->
    <van-field
      class="content"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="postPlaceholder"
      show-word-limit
    />
    <van-button type="info" size="mini" @click="onPostComment" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
import { mapState } from 'vuex'
export default {
  name: 'PostComment',
  components: {},
  props: {
    // 如果是发布文章评论，则传递文章ID
    // 如果是发布评论回复，则传递的是评论ID
    target: {
      type: [String, Number, Object],
      required: true
    },
    // 如果发布文章评论，则需要传递文章id
    // 如果发布评论回复，则不需要传文章id，即为null
    articleId: {
      type: [String, Number, Object],
      default: null
    },
    replyTo: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState(['user']),
    postPlaceholder () {
      const replyTo = this.replyTo
      return replyTo ? `回复 ${replyTo.aut_name}` : '优质评论将会被优先展示'
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPostComment () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      if (!this.user) {
        this.$toast.fail('用户未登录，无法评论')
        return
      }
      if (this.replyTo) {
        this.message += `//@${this.replyTo.aut_name}: ${this.replyTo.content}`
      }
      const { data } = await postComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(data)
      const newComment = data.data.new_obj
      // 后端返回数据中没有该字段，所以这里手动添加，否则会影响新添加的评论的点赞功能
      // 更好的做法是建议后端在返回的数据中包含该字段
      newComment.is_liking = false
      // 把响应结果，传递给父组件
      this.$emit('post-success', newComment)
      this.$toast.success('发布评论成功')
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  .content {
    width: 85%;
    background: #f5f7f9;
  }
}
</style>
