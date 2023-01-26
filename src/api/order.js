import request from '@/utils/request'
const path = '/order'

export function getStorageOrder(data) {
  return request({
    url: `${path}/getStorageOrder`,
    method: 'post',
    data
  })
}
