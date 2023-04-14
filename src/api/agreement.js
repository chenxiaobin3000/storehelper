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

export function again(data) {
  return request({
    url: `${path}/again`,
    method: 'post',
    data
  })
}

export function reviewAgain(data) {
  return request({
    url: `${path}/reviewAgain`,
    method: 'post',
    data
  })
}

export function revokeAgain(data) {
  return request({
    url: `${path}/revokeAgain`,
    method: 'post',
    data
  })
}

export function delAgain(data) {
  return request({
    url: `${path}/delAgain`,
    method: 'post',
    data
  })
}
