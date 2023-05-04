import request from '@/utils/request'
const path = '/product'

export function process(data) {
  return request({
    url: `${path}/process`,
    method: 'post',
    data
  })
}

export function setProcess(data) {
  return request({
    url: `${path}/setProcess`,
    method: 'post',
    data
  })
}

export function delProcess(data) {
  return request({
    url: `${path}/delProcess`,
    method: 'post',
    data
  })
}

export function reviewProcess(data) {
  return request({
    url: `${path}/reviewProcess`,
    method: 'post',
    data
  })
}

export function revokeProcess(data) {
  return request({
    url: `${path}/revokeProcess`,
    method: 'post',
    data
  })
}

export function complete(data) {
  return request({
    url: `${path}/complete`,
    method: 'post',
    data
  })
}

export function setComplete(data) {
  return request({
    url: `${path}/setComplete`,
    method: 'post',
    data
  })
}

export function delComplete(data) {
  return request({
    url: `${path}/delComplete`,
    method: 'post',
    data
  })
}

export function reviewComplete(data) {
  return request({
    url: `${path}/reviewComplete`,
    method: 'post',
    data
  })
}

export function revokeComplete(data) {
  return request({
    url: `${path}/revokeComplete`,
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

export function setLoss(data) {
  return request({
    url: `${path}/setLoss`,
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
