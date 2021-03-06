import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 定义常量，防止setItem getItem 传入字符串名字写错，让代码更安全
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // 当前用户的登录状态( token等数据)
    // user: JSON.parse(window.localStorage.getItem('user))
    user: getItem(USER_KEY),
    cachePages: ['LayoutIndex'] // 组件缓存页面
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失我们需要把数据放到本地存储中，
      // 这里仅仅是为了持久化数据
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
