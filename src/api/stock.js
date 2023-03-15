import request from '@/utils/request'
const path = '/stock'

export function getStockList(data) {
  return request({
    url: `${path}/getStockList`,
    method: 'post',
    data
  })
}

export function getStockDetail(data) {
  return request({
    url: `${path}/getStockDetail`,
    method: 'post',
    data
  })
}

export function getStockDay(data) {
  return request({
    url: `${path}/getStockDay`,
    method: 'post',
    data
  })
}

export function getStockWeek(data) {
  return request({
    url: `${path}/getStockWeek`,
    method: 'post',
    data
  })
}

export function getCloudList(data) {
  return request({
    url: `${path}/getCloudList`,
    method: 'post',
    data
  })
}

export function getCloudDetail(data) {
  return request({
    url: `${path}/getCloudDetail`,
    method: 'post',
    data
  })
}

export function getCloudDay(data) {
  return request({
    url: `${path}/getCloudDay`,
    method: 'post',
    data
  })
}

export function getCloudWeek(data) {
  return request({
    url: `${path}/getCloudWeek`,
    method: 'post',
    data
  })
}
