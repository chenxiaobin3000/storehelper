import request from '@/utils/request'
const path = '/api/user'

export function getInfo(data) {
  return request({
    url: `${path}/getInfo`,
    method: 'post',
    data
  })
}
