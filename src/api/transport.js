import request from '@/utils/request'
const path = '/transport'

export function addOrderFare(data) {
  return request({
    url: `${path}/addOrderFare`,
    method: 'post',
    data
  })
}

export function delOrderFare(data) {
  return request({
    url: `${path}/delOrderFare`,
    method: 'post',
    data
  })
}
