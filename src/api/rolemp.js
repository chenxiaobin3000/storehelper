import request from '@/utils/request'
const path = '/rolemp'

export function addRoleMp(data) {
  return request({
    url: `${path}/addRoleMp`,
    method: 'post',
    data
  })
}

export function setRoleMp(data) {
  return request({
    url: `${path}/setRoleMp`,
    method: 'post',
    data
  })
}

export function delRoleMp(data) {
  return request({
    url: `${path}/delRoleMp`,
    method: 'post',
    data
  })
}

export function getRoleMp(data) {
  return request({
    url: `${path}/getRoleMp`,
    method: 'post',
    data
  })
}

export function getRoleMpList(data) {
  return request({
    url: `${path}/getRoleMpList`,
    method: 'post',
    data
  })
}

export function getUserRoleMp(data) {
  return request({
    url: `${path}/getUserRoleMp`,
    method: 'post',
    data
  })
}

export function setUserRoleMp(data) {
  return request({
    url: `${path}/setUserRoleMp`,
    method: 'post',
    data
  })
}

export function getGroupRoleMp(data) {
  return request({
    url: `${path}/getGroupRoleMp`,
    method: 'post',
    data
  })
}
