/*
  频道相关请求模块
*/
import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 登录用户的频道添加
export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除用户指定频道
export const deleteUserChannel = targetId => {
  return request({
    method: 'DELETE',
    url: ` /app/v1_0/user/channels/${targetId}`
  })
}
