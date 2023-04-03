import request from '@/utils/request'
const path = '/finance'

export function getFinance(data) {
  return request({
    url: `${path}/getFinance`,
    method: 'post',
    data
  })
}

export function getLabelList(data) {
  return request({
    url: `${path}/getLabelList`,
    method: 'post',
    data
  })
}

export function insertLabelDetail(data) {
  return request({
    url: `${path}/insertLabelDetail`,
    method: 'post',
    data
  })
}

export function addLabel(data) {
  return request({
    url: `${path}/addLabel`,
    method: 'post',
    data
  })
}

export function setLabel(data) {
  return request({
    url: `${path}/setLabel`,
    method: 'post',
    data
  })
}

export function delLabel(data) {
  return request({
    url: `${path}/delLabel`,
    method: 'post',
    data
  })
}

export function getGroupLabelList(data) {
  return request({
    url: `${path}/getGroupLabelList`,
    method: 'post',
    data
  })
}

export function getGroupLabelTree(data) {
  return request({
    url: `${path}/getGroupLabelTree`,
    method: 'post',
    data
  })
}
