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

export function getGroupAllStorage(data) {
  return request({
    url: `${path}/getGroupAllStorage`,
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
