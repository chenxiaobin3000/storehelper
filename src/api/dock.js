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

export function getMarketStorageAccount(data) {
  return request({
    url: `${path}/getMarketStorageAccount`,
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

export function setMarketStorage(data) {
  return request({
    url: `${path}/setMarketStorage`,
    method: 'post',
    data
  })
}

export function delMarketStorage(data) {
  return request({
    url: `${path}/delMarketStorage`,
    method: 'post',
    data
  })
}

export function getMarketStorageList(data) {
  return request({
    url: `${path}/getMarketStorageList`,
    method: 'post',
    data
  })
}
