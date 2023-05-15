import request from '@/utils/request'
const path = '/transport'

export function addOrderFare(data) {
  return request({
    url: `${path}/addOrderFare`,
    method: 'post',
    data
  })
}

export function setOrderFare(data) {
  return request({
    url: `${path}/setOrderFare`,
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

export function getAgreementFareList(data) {
  return request({
    url: `${path}/getAgreementFareList`,
    method: 'post',
    data
  })
}

export function getOfflineFareList(data) {
  return request({
    url: `${path}/getOfflineFareList`,
    method: 'post',
    data
  })
}

export function getProductFareList(data) {
  return request({
    url: `${path}/getProductFareList`,
    method: 'post',
    data
  })
}

export function getPurchaseFareList(data) {
  return request({
    url: `${path}/getPurchaseFareList`,
    method: 'post',
    data
  })
}

export function getStorageFareList(data) {
  return request({
    url: `${path}/getStorageFareList`,
    method: 'post',
    data
  })
}
