import request from '@/utils/request'
const path = '/product'

export function collect(data) {
  return request({
    url: `${path}/collect`,
    method: 'post',
    data
  })
}

export function reviewCollect(data) {
  return request({
    url: `${path}/reviewCollect`,
    method: 'post',
    data
  })
}

export function revokeCollect(data) {
  return request({
    url: `${path}/revokeCollect`,
    method: 'post',
    data
  })
}

export function delCollect(data) {
  return request({
    url: `${path}/delCollect`,
    method: 'post',
    data
  })
}
