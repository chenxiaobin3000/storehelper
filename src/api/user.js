import request from '@/utils/request'
const path = '/user'

export function addUser(data) {
  return request({
    url: `${path}/addUser`,
    method: 'post',
    data
  })
}

export function setUser(data) {
  return request({
    url: `${path}/setUser`,
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: `${path}/delUser`,
    method: 'post',
    data
  })
}

export function getUser(data) {
  return request({
    url: `${path}/getUser`,
    method: 'post',
    data
  })
}

export function getUserByPhone(data) {
  return request({
    url: `${path}/getUserByPhone`,
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: `${path}/getUserList`,
    method: 'post',
    data
  })
}
