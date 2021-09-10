<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('cancel')"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async confirm (value) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      // 因为当前选中的是时间对象，后端要的是 YYYY-MM-DD 格式的字符串
      // const data = `${value.getFullYear()}-${value.getMouth() + 1}-${value.getDate()}`
      const data = dayjs(value).format('YYYY-MM-DD')
      // console.log(data)
      // 请求提交更新用户生日
      await updateUserProfile({
        birthday: data
      })
      // 更新父组件中的用户生日
      this.$emit('input', data)
      this.$toast.success('保存成功')
      // 关闭弹出层
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="less">
</style>
