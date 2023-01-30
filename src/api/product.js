import request from '@/utils/request'
const path = '/product'

export function revokeProcess(data) {
  return request({
    url: `${path}/revokeProcess`,
    method: 'post',
    data
  })
}

export function delProcess(data) {
  return request({
    url: `${path}/delProcess`,
    method: 'post',
    data
  })
}

export function revokeComplete(data) {
  return request({
    url: `${path}/revokeComplete`,
    method: 'post',
    data
  })
}

export function delComplete(data) {
  return request({
    url: `${path}/delComplete`,
    method: 'post',
    data
  })
}
