import request from '@/utils/request'
const path = '/purchase'

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

export function revokePurchase2(data) {
  return request({
    url: `${path}/revokePurchase2`,
    method: 'post',
    data
  })
}

export function delPurchase2(data) {
  return request({
    url: `${path}/delPurchase2`,
    method: 'post',
    data
  })
}

export function revokeReturn2(data) {
  return request({
    url: `${path}/revokeReturn2`,
    method: 'post',
    data
  })
}

export function delReturn2(data) {
  return request({
    url: `${path}/delReturn2`,
    method: 'post',
    data
  })
}
