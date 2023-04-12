import request from '@/utils/request'
const path = '/order'

export function addOrderFare(data) {
  return request({
    url: `${path}/addOrderFare`,
    method: 'post',
    data
  })
}

export function delOrderFare(data) {
  return request({
    url: `${path}/delOrderFare`,
    method: 'post',
    data
  })
}

export function addOrderRemark(data) {
  return request({
    url: `${path}/addOrderRemark`,
    method: 'post',
    data
  })
}

export function delOrderRemark(data) {
  return request({
    url: `${path}/delOrderRemark`,
    method: 'post',
    data
  })
}

export function getAgreementOrder(data) {
  return request({
    url: `${path}/getAgreementOrder`,
    method: 'post',
    data
  })
}

export function getCloudOrder(data) {
  return request({
    url: `${path}/getCloudOrder`,
    method: 'post',
    data
  })
}

export function getProductOrder(data) {
  return request({
    url: `${path}/getProductOrder`,
    method: 'post',
    data
  })
}

export function getPurchaseOrder(data) {
  return request({
    url: `${path}/getPurchaseOrder`,
    method: 'post',
    data
  })
}

export function getStorageOrder(data) {
  return request({
    url: `${path}/getStorageOrder`,
    method: 'post',
    data
  })
}

export function getSaleOrder(data) {
  return request({
    url: `${path}/getSaleOrder`,
    method: 'post',
    data
  })
}
