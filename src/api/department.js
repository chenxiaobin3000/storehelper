import request from '@/utils/request'
const path = '/department'

export function addDepartment(data) {
  return request({
    url: `${path}/addDepartment`,
    method: 'post',
    data
  })
}

export function setDepartment(data) {
  return request({
    url: `${path}/setDepartment`,
    method: 'post',
    data
  })
}

export function delDepartment(data) {
  return request({
    url: `${path}/delDepartment`,
    method: 'post',
    data
  })
}

export function getGroupDepartmentList(data) {
  return request({
    url: `${path}/getGroupDepartmentList`,
    method: 'post',
    data
  })
}

export function getGroupDepartmentTree(data) {
  return request({
    url: `${path}/getGroupDepartmentTree`,
    method: 'post',
    data
  })
}

export function setUserDepartment(data) {
  return request({
    url: `${path}/setUserDepartment`,
    method: 'post',
    data
  })
}
