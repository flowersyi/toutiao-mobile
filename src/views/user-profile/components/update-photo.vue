<template>
  <div class="update-photo">
    <img :src="image" alt class="avatar" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      class="toolbar"
      @click-left="$emit('cancel')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // forbidClick 属性可以禁用背景点击
        duration: 0 // 持续展示
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // 如果要求 Content-Type 是 multipart/form-data
      // 则一定要提交 FormData数据对象，专门用于文件上传的，不能提交 {}
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updateUserPhoto(fd)
      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭父组件弹出层
      this.$emit('cancel')
      this.$toast.success('保存成功')
    },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
}
.avatar {
  display: block;
  max-width: 100%;
}
</style>
