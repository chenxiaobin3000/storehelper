import request from '@/utils/request'
const path = '/order'

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
