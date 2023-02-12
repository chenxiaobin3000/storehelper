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

export function setMarketStandard(data) {
  return request({
    url: `${path}/setMarketStandard`,
    method: 'post',
    data
  })
}

export function delMarketStandard(data) {
  return request({
    url: `${path}/delMarketStandard`,
    method: 'post',
    data
  })
}

export function getMarketStandard(data) {
  return request({
    url: `${path}/getMarketStandard`,
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

export function setMarketStanDetail(data) {
  return request({
    url: `${path}/setMarketStanDetail`,
    method: 'post',
    data
  })
}

export function delMarketStanDetail(data) {
  return request({
    url: `${path}/delMarketStanDetail`,
    method: 'post',
    data
  })
}

export function getMarketStanDetail(data) {
  return request({
    url: `${path}/getMarketStanDetail`,
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

export function getStandardSaleInfo(data) {
  return request({
    url: `${path}/getStandardSaleInfo`,
    method: 'post',
    data
  })
}
