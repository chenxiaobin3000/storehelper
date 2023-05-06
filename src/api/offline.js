import request from '@/utils/request'
const path = '/offline'

export function offline(data) {
  return request({
    url: `${path}/offline`,
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

export function setOffline(data) {
  return request({
    url: `${path}/setOffline`,
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

export function setOfflinePay(data) {
  return request({
    url: `${path}/setOfflinePay`,
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

export function setReturn(data) {
  return request({
    url: `${path}/setReturn`,
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
