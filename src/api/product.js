import request from '@/utils/request'
const path = '/product'

export function addProduct(data) {
  return request({
    url: `${path}/addProduct`,
    method: 'post',
    data
  })
}
