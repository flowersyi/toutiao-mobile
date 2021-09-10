<template>
  <div class="search-history">
    <van-cell title="搜索历史" center>
      <div v-if="isdeleteShow">
        <span class="all-delete" @click="AllDelete">全部删除</span>
        <span @click="isdeleteShow=!isdeleteShow">完成</span>
      </div>
      <div @click="isdeleteShow = !isdeleteShow" v-else>
        <van-icon name="delete"></van-icon>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistorys"
      :key="index"
      @click="itemOperation(item,index)"
    >
      <van-icon name="close" v-show="isdeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
import { deleteHistory } from '@/api/search'
export default {
  name: 'SearchHistory',
  components: {},
  // prop 数据如果是引用类型 （对象，数组）可以修改，
  // 注意这个修改是指： user.name = 'jack', arr.push('123')
  // 但是如何 prop 数据不能直接重新赋值 xxx = xxx
  // 如果你想要让 prop = 新数据： 让父组件自己去修改
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isdeleteShow: false // 搜索历史 删除图标显示与否
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
  },
  mounted () { },
  methods: {
    itemOperation (item, index) {
      // 删除状态 点击
      if (this.isdeleteShow) {
        // 用户已登录
        if (this.user) {
          // 接口有问题，没有删除单个历史记录的接口，只有删除整个历史记录的接口
        } else {
          // 用户未登录
          this.searchHistorys.splice(index, 1)
          setItem('search-history', this.searchHistorys)
        }
      } else {
        // 非删除状态 点击
        this.$emit('search', item)
      }
    },
    async AllDelete () {
      // 向父组件传值，让 searchHistory = []
      this.$emit('update-histories', [])
      if (this.user) {
        await deleteHistory()
      } else {
        setItem('search-history', [])
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-history {
  .all-delete {
    margin-right: 10px;
  }
}
</style>
