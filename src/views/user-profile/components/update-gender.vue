<template>
  <div class="update-genger">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('cancel')"
      @change="onGenderChange"
      :default-index="gender"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGenger',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onGenderChange (picker, value, index) {
      this.gender = index
    },
    async onConfirm () {
      if (this.gender === this.value) {
        console.log('...')
        this.$emit('cancel')
        return
      }
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // forbidClick 属性可以禁用背景点击
      })
      await updateUserProfile({
        gender: this.gender
      })
      this.$toast.success('保存成功')
      this.$emit('input', this.gender)
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="less">
</style>
