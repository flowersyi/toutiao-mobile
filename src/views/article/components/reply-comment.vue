<template>
  <div class="reply-comment">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条评论`">
      <van-icon name="cross" slot="left" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- /头部信息 -->
    <van-cell title="所有回复"></van-cell>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" :reply="false" :reply-count="false" />
    <!-- /当前评论项 -->
    <!-- 所有评论回复 -->
    <comment-list
      :source="comment.com_id"
      type="c"
      :list="commentList"
      @reply-click="onClickReply"
      :reply-count="false"
    />
    <!-- /所有评论回复 -->
    <!-- 发布评论按钮 -->
    <div class="comment-bottom">
      <van-button class="comment-btn" type="default" round size="mini" @click="onWriteClick">写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <post-comment
        :target="target"
        :article-id="articleId"
        @post-success="onPostSuccess"
        :reply-to="replyTo"
      ></post-comment>
    </van-popup>
    <!-- /发布评论 -->
    <!-- /发布评论回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'ReplyComment',
  components: { CommentItem, CommentList, PostComment },
  props: {
    // 文章id
    articleId: {
      type: [String, Object, Number],
      rquired: true
    },
    // 查看评论回复项
    comment: {
      type: Object,
      rquired: true
    }
  },
  data () {
    return {
      isReplyShow: false, // 输入评论弹出层
      commentList: [], // 回复评论列表
      target: this.comment.com_id,
      replyTo: null // 回复列表里 回复哪个用户的评论项
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onPostSuccess (comment) {
      // 将发布成功的评论，放到评论列表的顶部
      this.commentList.unshift(comment)
      // 更新评论回复的数量
      this.comment.reply_count++
      // 关闭发布评论的弹出层
      this.isReplyShow = false
    },
    // 回复 评论回复列表里的评论
    onClickReply (comment) {
      this.target = comment.com_id
      this.replyTo = comment
      this.isReplyShow = true
    },
    // 文章评论列表回复当前评论项的评论
    onWriteClick () {
      this.target = this.comment.com_id
      this.replyTo = null
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
.comment-bottom {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 43px;
  border-top: 1px solid #d8d8d8;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .comment-btn {
    width: 80%;
    height: 30px;
  }
}
</style>
