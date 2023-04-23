import request from '@/utils/request'
const path = '/agreement'

export function shipped(data) {
  return request({
    url: `${path}/shipped`,
    method: 'post',
    data
  })
}

export function reviewShipped(data) {
  return request({
    url: `${path}/reviewShipped`,
    method: 'post',
    data
  })
}

export function revokeShipped(data) {
  return request({
    url: `${path}/revokeShipped`,
    method: 'post',
    data
  })
}

export function delShipped(data) {
  return request({
    url: `${path}/delShipped`,
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

export function offline(data) {
  return request({
    url: `${path}/offline`,
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

export function setOfflinePay(data) {
  return request({
    url: `${path}/setOfflinePay`,
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
