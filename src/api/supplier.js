import request from '@/utils/request'
const path = '/supplier'

export function addSupplier(data) {
  return request({
    url: `${path}/addSupplier`,
    method: 'post',
    data
  })
}

export function setSupplier(data) {
  return request({
    url: `${path}/setSupplier`,
    method: 'post',
    data
  })
}

export function delSupplier(data) {
  return request({
    url: `${path}/delSupplier`,
    method: 'post',
    data
  })
}

export function getGroupSupplier(data) {
  return request({
    url: `${path}/getGroupSupplier`,
    method: 'post',
    data
  })
}

export function getGroupAllSupplier(data) {
  return request({
    url: `${path}/getGroupAllSupplier`,
    method: 'post',
    data
  })
}
