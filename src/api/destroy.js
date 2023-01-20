import request from '@/utils/request'
const path = '/destroy'

export function addDestroy(data) {
  return request({
    url: `${path}/addDestroy`,
    method: 'post',
    data
  })
}

export function setDestroy(data) {
  return request({
    url: `${path}/setDestroy`,
    method: 'post',
    data
  })
}

export function delDestroy(data) {
  return request({
    url: `${path}/delDestroy`,
    method: 'post',
    data
  })
}

export function getGroupDestroy(data) {
  return request({
    url: `${path}/getGroupDestroy`,
    method: 'post',
    data
  })
}
