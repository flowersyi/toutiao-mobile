import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  },
  {
    // 一级路由渲染到根组件中的 router-view
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      // 子路由渲染到父路由的 router-view 中
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/vedio',
        name: 'vedio',
        component: () => import('@/views/vedio'),
        meta: { requiresAuth: true }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      },
      {
        path: '/user/profile',
        name: 'user-profile',
        component: () => import('@/views/user-profile'),
        meta: { requiresAuth: true } // 添加额外的自定义数据
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将动态路由参数映射到路由组件的 props 中，无论是访问还是维护性都很方便
    props: true,
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

// 路由前置守卫
// to: 要访问的页面路由信息
// from: 来自哪个页面的路由信息
// next: 放行的标记
router.beforeEach((to, from, next) => {
  // 需要用户登录才能访问
  // to.name === 'login' || to.meta.requiresAuth
  if (to.meta.requiresAuth) {
    // 如果已经登录就直接通过
    if (store.state.user) {
      return next()
    }
    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    })
      .then(() => {
        // 确认执行这里
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 取消执行这里
        // 取消了，中断路由导航
        next(false)
      })
  } else {
    // 不需要登录状态的页面直接过去
    next()
  }
})

export default router
