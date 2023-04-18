import request from '@/utils/request'
const path = '/market'

export function setMarketCommodity(data) {
  return request({
    url: `${path}/setMarketCommodity`,
    method: 'post',
    data
  })
}

export function delMarketCommodity(data) {
  return request({
    url: `${path}/delMarketCommodity`,
    method: 'post',
    data
  })
}

export function getMarketCommodity(data) {
  return request({
    url: `${path}/getMarketCommodity`,
    method: 'post',
    data
  })
}

export function setMarketCommList(data) {
  return request({
    url: `${path}/setMarketCommList`,
    method: 'post',
    data
  })
}

export function setMarketCommDetail(data) {
  return request({
    url: `${path}/setMarketCommDetail`,
    method: 'post',
    data
  })
}

export function delMarketCommDetail(data) {
  return request({
    url: `${path}/delMarketCommDetail`,
    method: 'post',
    data
  })
}

export function getMarketCommDetail(data) {
  return request({
    url: `${path}/getMarketCommDetail`,
    method: 'post',
    data
  })
}

export function getMarketSaleDetail(data) {
  return request({
    url: `${path}/getMarketSaleDetail`,
    method: 'post',
    data
  })
}

export function getCommoditySaleInfo(data) {
  return request({
    url: `${path}/getCommoditySaleInfo`,
    method: 'post',
    data
  })
}
