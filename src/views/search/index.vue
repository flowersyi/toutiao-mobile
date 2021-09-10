<template>
  <div class="search-index">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <!-- 模板中的 $event 表示事件参数  -->
    <search-history
      v-else
      :search-historys="searchHistorys"
      @search="onSearch"
      @update-histories="searchHistorys = $event"
    ></search-history>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: { SearchSuggestion, SearchHistory, SearchResult },
  props: {},
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistorys: [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 监听搜索历史记录的变化和，存储到本地存储
    // 父子组件里其他地方的 setItem('search-history',this.SearchHistorys)可以注释
    // searchHistorys () {
    //   setItem('search-history', this.SearchHistorys)
    // }
  },
  created () {
    this.loadSearchHistory()
  },
  mounted () { },
  methods: {
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      // 记录搜索历史记录
      // 判断是否有重复的历史记录，重复的就不加入历史记录数组中
      const index = this.searchHistorys.indexOf(searchText)
      if (index === -1) {
        // 最新的搜索历史记录放到顶部
        this.searchHistorys.unshift(searchText)
      }
      // 如果用户已登录，则把搜索结果记录到线上
      //   提示：只要我们调用获取搜索结果的数据接口，后端会帮我们自动存储用户的搜索历史记录
      // 如果没有登录，则把历史记录存储到本地
      if (!this.user) {
        setItem('search-history', this.searchHistorys)
      }
      // 显示搜索结果
      this.isResultShow = true
      console.log('search')
    },
    async loadSearchHistory () {
      // 因为后端帮我们存储的用户搜索记录只有四条，太少了
      // 所以我们自动存储用户的历史记录
      // 如果没有登录，则把搜索历史记录存储到本地

      // 我把合并都注册了，因为合并会影响后面的删除
      let searchHistorys = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        searchHistorys = data.data.keywords
        // const onlineHistorys = data.data.keywords
        // console.log(onlineHistorys)
        // 合并数组：[...数组, ...数组]
        // 把 Set对象 转为数组：[...Set对象]
        // 数组去重：[...new Set([...数组, ...数组])]
        // searchHistorys = [...new Set([...searchHistorys, ...onlineHistorys])]
        // console.log(searchHistorys)
      }
      this.searchHistorys = searchHistorys
    }
  }
}
</script>

<style scoped lang="less">
</style>
