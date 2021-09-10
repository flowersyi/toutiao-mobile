<template>
  <div class="search-suggestion">
    <van-cell
      :title="item"
      icon="search"
      v-for="(item,index) in list"
      :key="index"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="highlight(item,searchText)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    // 简写
    // searchText () {
    //  console.log('hello)
    // }
    // 监视的完整写法
    // 属性名：要监听的数据名称
    searchText: {
      // 当数据发生变化则会立即执行 handler 处理函数
      // debounce 防抖
      handler: debounce(async function () {
        // 找到数据接口
        const { data } = await getSearchSuggestions(this.searchText)
        this.list = data.data.options
        // 请求获取数据
        // 模板绑定展示
      }, 200),
      // // 当数据发生变化则会立即执行 handler 处理函数
      // async handler () {
      //   // 找到数据接口
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   this.list = data.data.options
      //   // 请求获取数据
      //   // 模板绑定展示
      // },
      // 该回调将会在监听开始之后立即调用
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    highlight (item, keyWord) {
      // a /a/gi
      // 正则表达式 / 中间的内容/  都会当成字符串来对待
      // 错误写法
      // item.replace(/keyword/gi, `<span style="color: #3296fa">${keyWord}</span>`)
      // RegExp 是正则表达式的构造函数
      //  参数1： 字符串
      //  参数2： 匹配模式
      //  参数3： 正则对象
      const reg = new RegExp(keyWord, 'gi')
      return item.replace(reg, `<span style="color: #3296fa">${keyWord}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
</style>
