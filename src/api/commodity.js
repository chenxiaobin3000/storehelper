import request from '@/utils/request'
const path = '/commodity'

export function addCommodityList(data) {
  return request({
    url: `${path}/addCommodityList`,
    method: 'post',
    data
  })
}

export function addCommodity(data) {
  return request({
    url: `${path}/addCommodity`,
    method: 'post',
    data
  })
}

export function setCommodity(data) {
  return request({
    url: `${path}/setCommodity`,
    method: 'post',
    data
  })
}

export function delCommodity(data) {
  return request({
    url: `${path}/delCommodity`,
    method: 'post',
    data
  })
}

export function getGroupCommodity(data) {
  return request({
    url: `${path}/getGroupCommodity`,
    method: 'post',
    data
  })
}

export function getStorageCommodity(data) {
  return request({
    url: `${path}/getStorageCommodity`,
    method: 'post',
    data
  })
}

export function getAccountCommodity(data) {
  return request({
    url: `${path}/getAccountCommodity`,
    method: 'post',
    data
  })
}

export function setCommodityOriginal(data) {
  return request({
    url: `${path}/setCommodityOriginal`,
    method: 'post',
    data
  })
}

export function setCommodityStorage(data) {
  return request({
    url: `${path}/setCommodityStorage`,
    method: 'post',
    data
  })
}
