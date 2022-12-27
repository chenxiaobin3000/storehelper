import request from '@/utils/request'
const path = '/user'

export function getUserInfo(data) {
  return request({
    url: `${path}/getUserInfo`,
    method: 'post',
    data
  })
}
