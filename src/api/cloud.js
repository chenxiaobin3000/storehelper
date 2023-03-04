import request from '@/utils/request'
const path = '/cloud'

export function addCloud(data) {
  return request({
    url: `${path}/addCloud`,
    method: 'post',
    data
  })
}

export function setCloud(data) {
  return request({
    url: `${path}/setCloud`,
    method: 'post',
    data
  })
}

export function delCloud(data) {
  return request({
    url: `${path}/delCloud`,
    method: 'post',
    data
  })
}

export function getGroupCloud(data) {
  return request({
    url: `${path}/getGroupCloud`,
    method: 'post',
    data
  })
}

export function getGroupAllCloud(data) {
  return request({
    url: `${path}/getGroupAllCloud`,
    method: 'post',
    data
  })
}

export function revokePurchase(data) {
  return request({
    url: `${path}/revokePurchase`,
    method: 'post',
    data
  })
}

export function delPurchase(data) {
  return request({
    url: `${path}/delPurchase`,
    method: 'post',
    data
  })
}

export function revokeReturn(data) {
  return request({
    url: `${path}/revokeReturn`,
    method: 'post',
    data
  })
}

export function delReturn(data) {
  return request({
    url: `${path}/delReturn`,
    method: 'post',
    data
  })
}
