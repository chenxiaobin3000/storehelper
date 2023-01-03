import request from '@/utils/request'
const path = '/category'

export function addCategory(data) {
  return request({
    url: `${path}/addCategory`,
    method: 'post',
    data
  })
}

export function setCategory(data) {
  return request({
    url: `${path}/setCategory`,
    method: 'post',
    data
  })
}

export function delCategory(data) {
  return request({
    url: `${path}/delCategory`,
    method: 'post',
    data
  })
}

export function getGroupCategory(data) {
  return request({
    url: `${path}/getGroupCategory`,
    method: 'post',
    data
  })
}
