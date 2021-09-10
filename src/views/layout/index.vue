<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
    <!-- 底部导航栏 v-model="active" -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="home" icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="video-o" to="/vedio">视频</van-tabbar-item>
      <van-tabbar-item name="my" icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 'my'
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
