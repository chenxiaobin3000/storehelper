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

export function addMarketDetail(data) {
  return request({
    url: `${path}/addMarketDetail`,
    method: 'post',
    data
  })
}

export function setMarketDetail(data) {
  return request({
    url: `${path}/setMarketDetail`,
    method: 'post',
    data
  })
}

export function delMarketDetail(data) {
  return request({
    url: `${path}/delMarketDetail`,
    method: 'post',
    data
  })
}

export function getMarketDetail(data) {
  return request({
    url: `${path}/getMarketDetail`,
    method: 'post',
    data
  })
}
