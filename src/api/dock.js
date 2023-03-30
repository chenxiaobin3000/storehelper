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

export function getMarketAllAccount(data) {
  return request({
    url: `${path}/getMarketAllAccount`,
    method: 'post',
    data
  })
}

export function getMarketSubAccount(data) {
  return request({
    url: `${path}/getMarketSubAccount`,
    method: 'post',
    data
  })
}

export function addMarketMany(data) {
  return request({
    url: `${path}/addMarketMany`,
    method: 'post',
    data
  })
}

export function setMarketMany(data) {
  return request({
    url: `${path}/setMarketMany`,
    method: 'post',
    data
  })
}

export function delMarketMany(data) {
  return request({
    url: `${path}/delMarketMany`,
    method: 'post',
    data
  })
}

export function getMarketManyList(data) {
  return request({
    url: `${path}/getMarketManyList`,
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
