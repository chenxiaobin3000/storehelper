import request from '@/utils/request'
const path = '/market'

export function addMarketAccount(data) {
  return request({
    url: `${path}/addMarketAccount`,
    method: 'post',
    data
  })
}

export function setMarketAccount(data) {
  return request({
    url: `${path}/setMarketAccount`,
    method: 'post',
    data
  })
}

export function delMarketAccount(data) {
  return request({
    url: `${path}/delMarketAccount`,
    method: 'post',
    data
  })
}

export function getMarketAccountList(data) {
  return request({
    url: `${path}/getMarketAccountList`,
    method: 'post',
    data
  })
}

export function getMarketAllAccount(data) {
  return request({
    url: `${path}/getMarketAllAccount`,
    method: 'post',
    data
  })
}

export function setMarketCommodity(data) {
  return request({
    url: `${path}/setMarketCommodity`,
    method: 'post',
    data
  })
}

export function setAccountCommodity(data) {
  return request({
    url: `${path}/setAccountCommodity`,
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

export function getMarketCommodityList(data) {
  return request({
    url: `${path}/getMarketCommodityList`,
    method: 'post',
    data
  })
}

export function getMarketCommodityStock(data) {
  return request({
    url: `${path}/getMarketCommodityStock`,
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
