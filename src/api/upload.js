import request from '@/utils/request'
const path = '/upload'

export function addAttach(data) {
  return request({
    url: `${path}/addAttach`,
    method: 'post',
    data
  })
}
