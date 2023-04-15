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

export function purchase(data) {
  return request({
    url: `${path}/purchase`,
    method: 'post',
    data
  })
}

export function reviewPurchase(data) {
  return request({
    url: `${path}/reviewPurchase`,
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

export function returnc(data) {
  return request({
    url: `${path}/returnc`,
    method: 'post',
    data
  })
}

export function reviewReturn(data) {
  return request({
    url: `${path}/reviewReturn`,
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

export function dispatch(data) {
  return request({
    url: `${path}/dispatch`,
    method: 'post',
    data
  })
}

export function reviewDispatch(data) {
  return request({
    url: `${path}/reviewDispatch`,
    method: 'post',
    data
  })
}

export function revokeDispatch(data) {
  return request({
    url: `${path}/revokeDispatch`,
    method: 'post',
    data
  })
}

export function delDispatch(data) {
  return request({
    url: `${path}/delDispatch`,
    method: 'post',
    data
  })
}

export function loss(data) {
  return request({
    url: `${path}/loss`,
    method: 'post',
    data
  })
}

export function reviewLoss(data) {
  return request({
    url: `${path}/reviewLoss`,
    method: 'post',
    data
  })
}

export function revokeLoss(data) {
  return request({
    url: `${path}/revokeLoss`,
    method: 'post',
    data
  })
}

export function delLoss(data) {
  return request({
    url: `${path}/delLoss`,
    method: 'post',
    data
  })
}

export function reviewOffline(data) {
  return request({
    url: `${path}/reviewOffline`,
    method: 'post',
    data
  })
}

export function revokeOffline(data) {
  return request({
    url: `${path}/revokeOffline`,
    method: 'post',
    data
  })
}

export function delOffline(data) {
  return request({
    url: `${path}/delOffline`,
    method: 'post',
    data
  })
}

export function backc(data) {
  return request({
    url: `${path}/backc`,
    method: 'post',
    data
  })
}

export function reviewBack(data) {
  return request({
    url: `${path}/reviewBack`,
    method: 'post',
    data
  })
}

export function revokeBack(data) {
  return request({
    url: `${path}/revokeBack`,
    method: 'post',
    data
  })
}

export function delBack(data) {
  return request({
    url: `${path}/delBack`,
    method: 'post',
    data
  })
}
