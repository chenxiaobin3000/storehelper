import request from '@/utils/request'
const path = '/storage'

export function addStorage(data) {
  return request({
    url: `${path}/addStorage`,
    method: 'post',
    data
  })
}

export function setStorage(data) {
  return request({
    url: `${path}/setStorage`,
    method: 'post',
    data
  })
}

export function delStorage(data) {
  return request({
    url: `${path}/delStorage`,
    method: 'post',
    data
  })
}

export function getGroupStorage(data) {
  return request({
    url: `${path}/getGroupStorage`,
    method: 'post',
    data
  })
}
