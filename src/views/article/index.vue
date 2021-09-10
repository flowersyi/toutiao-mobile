<template>
  <div class="article-container">
    <!-- 页头 -->
    <van-nav-bar title="文章详情" class="app-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- /页头 -->
    <div class="article-wrap">
      <h1 class="title" v-cloak>{{ article.title }}</h1>
      <van-cell center class="user-info" :border="false">
        <van-image slot="icon" round class="avatar" :src="article.aut_photo" />
        <div slot="title" class="name" v-cloak>{{ article.aut_name }}</div>
        <div slot="label" class="pubdate" v-cloak>{{ article.pubdate | relativeTime }}</div>
        <van-button
          :loading="isFollowLoading"
          round
          size="small"
          :type="article.is_followed? 'danger':'info'"
          class="follow-btn"
          :icon="article.is_followed? '':'plus'"
          @click="onFollow()"
          v-cloak
        >{{article.is_followed && user ? '已关注':'关注'}}</van-button>
      </van-cell>
      <div class="content markdown-body" v-html="article.content" ref="article-content"></div>
      <!-- 文章评论列表 -->
      <comment-list
        :source="articleId"
        :list="commentList"
        @comm-count="totalCommCount = $event"
        @reply-click="onReplyClick"
      ></comment-list>
      <!-- /文章评论列表 -->
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="article-btn"
        type="default"
        round
        size="mini"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon name="comment-o" :badge="totalCommCount" color="#777" />
      <van-icon
        :name="article.is_collected && user ?'star' : 'star-o'"
        :color="article.is_collected && user ?'orange':'#777'"
        @click="onCollect"
      />
      <van-icon
        :name="article.attitude === 1 && user ? 'like' : 'like-o'"
        :color="article.attitude === 1 && user ?'red':'#777'"
        @click="onLike"
      ></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="articleId" @post-success="onPostSuccess"></post-comment>
    </van-popup>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      class="reply-popup"
      :style="{ height: '90%' }"
    >
      <reply-comment
        :comment="replyComment"
        @close="isReplyShow = false"
        :articleId="articleId"
        v-if="isReplyShow"
      />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleDetail, addLiking, deleteLiking, addCollect, deleteCollect } from '@/api/article'
import { ImagePreview } from 'vant'
import { mapState } from 'vuex'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import ReplyComment from './components/reply-comment'
// 在组件中获取动态路由的参数：
//    方式一：this.$route.params.xxx
//    方式二：props 传参，推荐,在router/index.js 中对应路由开启props: true
//      this.articleId
export default {
  name: 'ArticleIndex',
  components: { CommentList, PostComment, ReplyComment },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false, // 关注用户按钮的 loading状态
      isPostShow: false, // 发布评论弹出框，展示状态
      commentList: [], // 文章评论列表
      totalCommCount: 0, // 评论总数量
      isReplyShow: false, // 评论回复弹出层显示状态
      replyComment: {} // 当前文章评论回复对象
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    async loadArticle () {
      const { data } = await getArticleDetail(this.articleId)
      console.log(data)
      this.article = data.data
      // 获取文章内容 DOM 容器
      // const articleContent = this.$refs['article-content']
      // 得到所有的 img 标签
      // 数据改变影响视图更新（DOM数据），不是立即的
      // 如果需要在修改数据之后马上操作DOM被该数据影响的视图DOM，
      // 需要把代码放在 $nextTick 中
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
      // 循环 img 列表，给 img 注册点击事件

      // 在事件处理函数中调用 ImagePreview() 预览
    },
    handlePreviewImage () {
      // 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']
      // 得到所有的 img 标签
      const imgs = articleContent.querySelectorAll('img')
      // 循环 img 列表，给 img 注册点击事件
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async onFollow () {
      if (!this.user) {
        this.$toast.fail('未登录，无法操作')
        return
      }
      this.isFollowLoading = true
      // 已关注，取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        // 取消关注，添加关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onLike () {
      if (!this.user) {
        this.$toast.fail('未登录，无法点赞')
        return
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      // 取消点赞
      if (this.article.attitude === 1) {
        await deleteLiking(this.article.art_id)
        this.article.attitude = 0
      } else {
        // 点赞
        await addLiking(this.article.art_id)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    async onCollect () {
      if (!this.user) {
        this.$toast.fail('未登录，无法收藏')
        return
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      // 取消收藏
      if (this.article.is_collected) {
        await deleteCollect(this.article.art_id)
      } else {
        // 收藏
        await addCollect(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    onPostSuccess (comment) {
      // 把发布成功的评论数据对象放到评论底部
      this.commentList.unshift(comment)

      // 更新评论的总数量
      this.totalCommCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    },
    onReplyClick (comment) {
      console.log(comment)
      this.replyComment = comment
      // 展示评论回复弹出层
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  background: #fff;
  min-height: 100vh;
  .article-wrap {
    position: fixed;
    bottom: 44px;
    top: 46px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
  }
  .user-info {
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-size: cover;
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  ul {
    list-style: unset;
  }
  .markdown-body {
    padding: 14px;
    background: #fff;
  }
  .article-bottom {
    border-top: 1px solid #ccc;
    width: 100%;
    background: #fff;
    height: 43px;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .article-btn {
      width: 160px;
      height: 30px;
      font-size: 14px;
      text-align: center;
    }
    .van-icon {
      font-size: 20px;
    }
  }
}
</style>
