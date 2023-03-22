import request from '@/utils/request'
const path = '/dock'

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

export function setMarketCloud(data) {
  return request({
    url: `${path}/setMarketCloud`,
    method: 'post',
    data
  })
}

export function delMarketCloud(data) {
  return request({
    url: `${path}/delMarketCloud`,
    method: 'post',
    data
  })
}

export function getMarketCloudList(data) {
  return request({
    url: `${path}/getMarketCloudList`,
    method: 'post',
    data
  })
}
