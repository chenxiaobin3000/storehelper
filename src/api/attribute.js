import request from '@/utils/request'
const path = '/attr'

export function addAttr(data) {
  return request({
    url: `${path}/addAttr`,
    method: 'post',
    data
  })
}

export function setAttr(data) {
  return request({
    url: `${path}/setAttr`,
    method: 'post',
    data
  })
}

export function delAttr(data) {
  return request({
    url: `${path}/delAttr`,
    method: 'post',
    data
  })
}

export function getGroupAttr(data) {
  return request({
    url: `${path}/getGroupAttr`,
    method: 'post',
    data
  })
}

export function updateAttrTemp(data) {
  return request({
    url: `${path}/updateAttrTemp`,
    method: 'post',
    data
  })
}

export function getGroupAttrTemp(data) {
  return request({
    url: `${path}/getGroupAttrTemp`,
    method: 'post',
    data
  })
}
