import request from '@/utils/request'
const path = '/sale'

export function revokeReturn(data) {
  return request({
    url: `${path}/revokeReturn`,
    method: 'post',
    data
  })
}

export function delReturn(data) {
  return request({
    url: `${path}/delReturn`,
    method: 'post',
    data
  })
}
