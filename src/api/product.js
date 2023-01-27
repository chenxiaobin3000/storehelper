import request from '@/utils/request'
const path = '/product'

export function delProcess(data) {
  return request({
    url: `${path}/delProcess`,
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
