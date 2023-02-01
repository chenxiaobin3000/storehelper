import request from '@/utils/request'
const path = '/stock'

export function getStockCommodity(data) {
  return request({
    url: `${path}/getStockCommodity`,
    method: 'post',
    data
  })
}

export function getStockHalfgood(data) {
  return request({
    url: `${path}/getStockHalfgood`,
    method: 'post',
    data
  })
}

export function getStockOriginal(data) {
  return request({
    url: `${path}/getStockOriginal`,
    method: 'post',
    data
  })
}

export function getStockStandard(data) {
  return request({
    url: `${path}/getStockStandard`,
    method: 'post',
    data
  })
}

export function getStockDestroy(data) {
  return request({
    url: `${path}/getStockDestroy`,
    method: 'post',
    data
  })
}
