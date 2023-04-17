import request from '@/utils/request'
const path = '/sale'

export function sale(data) {
  return request({
    url: `${path}/sale`,
    method: 'post',
    data
  })
}

export function reviewSale(data) {
  return request({
    url: `${path}/reviewSale`,
    method: 'post',
    data
  })
}

export function revokeSale(data) {
  return request({
    url: `${path}/revokeSale`,
    method: 'post',
    data
  })
}

export function delSale(data) {
  return request({
    url: `${path}/delSale`,
    method: 'post',
    data
  })
}

export function setSalePay(data) {
  return request({
    url: `${path}/setSalePay`,
    method: 'post',
    data
  })
}

export function after(data) {
  return request({
    url: `${path}/after`,
    method: 'post',
    data
  })
}

export function reviewAfter(data) {
  return request({
    url: `${path}/reviewAfter`,
    method: 'post',
    data
  })
}

export function revokeAfter(data) {
  return request({
    url: `${path}/revokeAfter`,
    method: 'post',
    data
  })
}

export function delAfter(data) {
  return request({
    url: `${path}/delAfter`,
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
