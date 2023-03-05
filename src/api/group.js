import request from '@/utils/request'
const path = '/group'

export function addGroup(data) {
  return request({
    url: `${path}/addGroup`,
    method: 'post',
    data
  })
}

export function setGroup(data) {
  return request({
    url: `${path}/setGroup`,
    method: 'post',
    data
  })
}

export function delGroup(data) {
  return request({
    url: `${path}/delGroup`,
    method: 'post',
    data
  })
}

export function getGroup(data) {
  return request({
    url: `${path}/getGroup`,
    method: 'post',
    data
  })
}

export function getGroupList(data) {
  return request({
    url: `${path}/getGroupList`,
    method: 'post',
    data
  })
}

export function getUserGroup(data) {
  return request({
    url: `${path}/getUserGroup`,
    method: 'post',
    data
  })
}

export function setUserGroup(data) {
  return request({
    url: `${path}/setUserGroup`,
    method: 'post',
    data
  })
}
