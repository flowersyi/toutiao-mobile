/*
  评论相关模块请求
*/
import request from '@/utils/request'
// 获取文章评论或评论回复
export const getArticleComm = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 文章评论或评论回复点赞
export const commentAddLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消文章评论或评论回复点赞
export const commentDeleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

// 添加评论或评论回复
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
