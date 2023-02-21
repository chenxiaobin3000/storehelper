import request from '@/utils/request'
const path = '/finance'

export function getFinance(data) {
  return request({
    url: `${path}/getFinance`,
    method: 'post',
    data
  })
}
