import request from '@/utils/request'
const path = '/role'

export function addRole(data) {
  return request({
    url: `${path}/addRole`,
    method: 'post',
    data
  })
}

export function setRole(data) {
  return request({
    url: `${path}/setRole`,
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: `${path}/delRole`,
    method: 'post',
    data
  })
}

export function getRole(data) {
  return request({
    url: `${path}/getRole`,
    method: 'post',
    data
  })
}

export function getRoleList(data) {
  return request({
    url: `${path}/getRoleList`,
    method: 'post',
    data
  })
}

export function getUserRole(data) {
  return request({
    url: `${path}/getUserRole`,
    method: 'post',
    data
  })
}

export function setUserRole(data) {
  return request({
    url: `${path}/setUserRole`,
    method: 'post',
    data
  })
}

export function setUserRoleAdmin(data) {
  return request({
    url: `${path}/setUserRoleAdmin`,
    method: 'post',
    data
  })
}

export function getGroupRole(data) {
  return request({
    url: `${path}/getGroupRole`,
    method: 'post',
    data
  })
}
