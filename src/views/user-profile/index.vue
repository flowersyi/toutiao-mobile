<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="app-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 导航栏 -->
    <!--accept接收文件的类型 image/jpg .jpg image/png-->
    <input type="file" ref="file" hidden accept="image/*" @change="onFileChange" />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '女':'男'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthShow = true"></van-cell>
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
      <!--
        当你传递给子组件的数据既要使用，又要修改，例如name
        这种情况下可以使用 v-model 简写
      -->
      <!--
        :name="user.name"
        @update-name="user.name = $event"
      -->
      <!--
         语法：v-model="user.name"
         :value="user.name"  默认往子组件里传递一个叫value的数据
         @input="user.name = $event" 默认监听input事件
         子组件
         props接收value
         this.$emit('input', xxx)
         v-model 的本质还是父子组件通信，它仅仅是简化了父组件的使用
      -->
      <!--
          且 v-model只能使用一次
          如果有多个数据需要保持同步,使用 .sync 修饰符
          语法： :gender.sync="user.gender"

          :gender="user.gender"
          @update:gender="user.gender = $event"

          子组件
          props接收gender
          this.$emit('update:gender', xxx)
      -->
      <!--
         一般我们把常用的数据设置为 v-model
         不常用设置为 .sync
      -->
      <update-name @cancel="isEditNameShow = false" v-model="user.name" v-if="isEditNameShow" />
    </van-popup>

    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender
        v-model="user.gender"
        @cancel="isEditGenderShow = false"
        v-if="isEditGenderShow"
      />
    </van-popup>

    <van-popup v-model="isEditBirthShow" position="bottom">
      <update-birthday
        v-model="user.birthday"
        @cancel="isEditBirthShow = false"
        v-if="isEditBirthShow"
      />
    </van-popup>

    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
      class="update-photo-popup"
    >
      <update-photo
        :file="previewImage"
        @cancel="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
        v-if="isEditPhotoShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data () {
    return {
      user: {},
      isEditNameShow: false, // 编辑昵称的显示状态
      isEditGenderShow: false, // 编辑性别的显示状态
      isEditBirthShow: false, // 编辑出生日期显示状态
      isEditPhotoShow: false, // 编辑头像显示状态
      previewImage: null // 上传预览图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () { },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
      this.user.birthday = '1998-10-01'
    },
    onFileChange () {
      console.log('change')
      // 弹出层
      this.isEditPhotoShow = true
      // 在弹出层预览图片
      const file = this.$refs.file.files[0]
      this.previewImage = file
      // 为了解决相同文件不触发 change 事件
      // 所以手动清空 file 的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background: #000;
}
</style>
