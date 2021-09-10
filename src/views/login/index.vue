<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="注册/登录" class="app-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <!--
      1.使用 van-form 组件包裹所有的表单项 van-field
      2.给 form 绑定 submit 事件
        当表单提交的时候会触发 submit 事件,
        提示：只有表单验证通过，它才会被触发调用
      3.使用 Field 的 rules 属性定义校验规则
    -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        icon-prefix="toutiao"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        icon-prefix="toutiao"
        :rules="formRules.code"
      >
        <template #button>
          <van-button
            :type="isSending ? 'default' : 'primary'"
            size="mini"
            @click.prevent="onSendCode"
            :disabled="isSending"
          >
            <van-count-down
              v-if="isSending"
              ref="countDown"
              :time="1000 * 60"
              :auto-start="false"
              format="ss s"
              @finish="isSending = false"
              class="btn-count-down"
            />
            <span v-else>获取验证码</span>
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>

    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isSending: false // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await login(this.user)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态(token等数据) 放到 vuex 容器中
        this.$store.commit('setUser', data.data)
        this.$store.commit('removeCachePage', 'LayoutIndex')
        // this.$router.back() // 先用这种方式，但是不太好
        this.$router.push(this.$route.query.redirect || '/')
        console.log('登录成功', data)
      } catch (err) {
        this.$toast.fail('登录失败，手机号或验证码错误')
        console.log('登录失败', err)
      }
    },
    onFailed (err) {
      if (err.errors[0]) {
        this.$toast({ message: err.errors[0].message, position: 'top' })
      }
    },
    // 校验手机号码
    // 验证通过 -> 请求发送验证码 -> 用户接收短信，输入验证码 -> 请求登录
    // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
    // 倒计时结束 -> 隐藏倒计时，显示发送按钮
    async onSendCode () {
      // 校验手机号码
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSending = true
        // 开始倒计时
        this.$nextTick(() => {
          this.$refs.countDown.start()
        })
        await sendCode(this.user.mobile)
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要不同的提示，那就需要判断了
        // console.dir(err)
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后再试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后再试'
        }
        this.$toast({ message, position: 'top' })
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .van-cell {
    align-items: center !important;
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .btn-count-down {
    width: 60px;
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
