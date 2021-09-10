<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancel')"
      @click-right="onConfirm"
    />
    <div class="name-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    // props数据 子组件不能直接修改 ，由父组件来修改
    // 除了 数组，对象 子组件可以通过obj.name 来修改，array.push(XX),
    // 且不能在子组件直接重新赋值数组和对象类型 把 obj = {} ,Array= []
    // 所以不能让输入框 v-model = name, 会报错

    // 声明接收父组件 v-model 传递的 value 数据
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      try {
        // 请求更新用户昵称
        await updateUserProfile({
          name: this.localName
        })
        // console.log(data)
        this.$toast.success('保存成功')
        // 更新成功 -> 修改父组件的昵称，关闭父组件昵称修改弹出层
        // console.log(this.localName)

        // 发布 input 事件， 更新父组件 v-model 绑定数据
        this.$emit('input', this.localName)
        this.$emit('cancel')
      } catch (error) {
        if (error && error === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.name-wrap {
  padding: 10px;
}
</style>
