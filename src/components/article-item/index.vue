<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--l3" v-cloak>{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-item" v-for="(image, index) in article.cover.images" :key="index">
          <van-image class="image-item" :src="image" />
        </div>
      </div>
      <div class="label-wrap">
        <span v-cloak>{{ article.aut_name }}</span>
        <span v-cloak>{{ article.comm_count }}</span>
        <span v-cloak>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image class="right-cover" v-if="article.cover.type === 1" :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .image-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
    fit: cover;
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
