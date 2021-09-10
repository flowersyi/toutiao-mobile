<template>
  <div class="comment-item">
    <van-cell class="comment-info">
      <van-image slot="icon" round class="avatar" :src="comment.aut_photo" />
      <div slot="title">
        <div class="title-wrap">
          <div class="name" v-cloak>{{ comment.aut_name }}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              :color="comment.is_liking && user ? 'red': '#777'"
              :name="comment.is_liking && user ? 'like': 'like-o'"
              class="like-icon"
            ></van-icon>
            <span class="like-count" v-cloak>{{ comment.like_count}}</span>
          </div>
        </div>
        <div>
          <div class="content" v-cloak>{{ comment.content }}</div>
          <div class="info-bottom">
            <span class="pubdate" v-cloak>{{ comment.pubdate | dateTime('MM-DD HH:mm') }}</span>
            <van-button
              type="default"
              size="mini"
              class="reply-btn"
              @click="$emit('reply-click',comment)"
              v-if="reply"
              v-cloak
            >{{replyCount ? comment.reply_count : ''}} 回复</van-button>
          </div>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { commentAddLike, commentDeleteLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    },
    reply: {
      type: Boolean,
      default: true
    },
    replyCount: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCommentLike () {
      if (!this.user) {
        this.$toast.fail('未登录，无法点赞')
        return
      }
      const commentId = this.comment.com_id.toString()
      // 取消点赞
      if (this.comment.is_liking) {
        await commentDeleteLike(commentId)
        this.comment.like_count--
      } else {
        // 点赞
        await commentAddLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-size: cover;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 12px;
    color: #b4b4b4;
  }
  .like-wrap {
    display: flex;
    align-items: center;
    .like-icon {
      font-size: 16px;
      margin-right: 2px;
    }
  }

  .info-bottom {
    height: 30px;
    display: flex;
    align-items: center;
    .reply-btn {
      font-size: 11px;
      margin-left: 8px;
      width: 50px;
    }
  }
}
</style>
