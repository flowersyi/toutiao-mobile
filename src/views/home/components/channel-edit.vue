<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        size="mini"
        type="danger"
        plain
        round
        class="edit-btn"
        @click="isEdit = !isEdit"
        v-cloak
      >{{ isEdit? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in channels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        :class="{'active': index === active}"
        :icon="(isEdit && index !== 0) ? 'clear': ''"
        @click="onUserChannelClick(channel.id, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        class="grid-item"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannel: [], // 所有频道数据列表
      isEdit: false // 控制编辑的显示状态
    }
  },
  computed: {
    // 推荐的频道列表
    // 计算属性会观测内部依赖的数据变化而重新求值
    recommendChannels () {
      // 计算属性依赖的数据（计算属性用到的数据）发生改变，重新计算结果
      // 我的频道增加了数据，那么剩下的推荐频道就会减少相应数据
      // 思路 所有频道 - 我的频道 = 剩下的推荐频道
      // filter 方法：过滤数据，根据方法返回的布尔值 true来收集数据
      // filter 方法查找满足条件的所有元素
      return this.allChannel.filter(channel => {
        // 判断 channel 是否属于用户的频道
        // find 方法查找满足条件的单个元素
        return !this.channels.find(item => {
          // 找到满足该条件的元素
          return item.id === channel.id
        })
      })

      // // for 循环遍历的方法 （不推荐）
      // const arr = []
      // // 遍历所有频道
      // this.allChannel.forEach(channel => {
      //   let flag = false
      //   for (let i = 0; i < this.channels.length; i++) {
      //     if (this.channels[i].id === channel.id) {
      //       flag = true
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(channel)
      //   }
      // })
      // return arr
    },
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannel = data.data.channels
      console.log(data)
    },
    async onAdd (channel) {
      console.log(channel)
      this.channels.push(channel)
      // TODO: 数据持久化
      // 登录了，存储到线上
      if (this.user) {
        await addUserChannel({
          channels: [
            { id: channel.id },
            { sqe: this.channels.length }
          ]
        })
      } else {
        // 没有登录存储到本地
        setItem('user-channels', this.channels)
      }
    },
    onUserChannelClick (channelId, index) {
      if (this.isEdit && index !== 0) {
        // 如果是编辑状态，那就是删除频道
        this.deleteChannel(channelId, index)
      } else {
        // 如果是非编辑状态，那就是切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channelId, index) {
      console.log('删除频道')
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.channels.splice(index, 1)
      if (this.user) {
        // 登录了持久化到线上
        await deleteUserChannel(channelId)
      } else {
        // 没有登录存储到本地
        // 删除本地数据
        setItem('user-channels', this.channels)
      }
    },
    switchChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
      console.log('切换频道')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 50px;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
