<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        :title="item.title"
        v-for="(item, index) in list"
        :key="index"
        :to="`/article/${item.art_id}`"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      perPage: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      const { results } = data.data
      // 2.将数据放到数据列表中
      this.list.push(...results)
      console.log(this.list)
      // 3.fun关闭本次 loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        //    如果有，则更新获取下一页数据的页码
        this.page++
      } else {
        //    如果没有，则把 finish 设置为 true，关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
