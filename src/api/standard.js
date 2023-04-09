import request from '@/utils/request'
const path = '/standard'

export function addStandard(data) {
  return request({
    url: `${path}/addStandard`,
    method: 'post',
    data
  })
}

export function setStandard(data) {
  return request({
    url: `${path}/setStandard`,
    method: 'post',
    data
  })
}

export function delStandard(data) {
  return request({
    url: `${path}/delStandard`,
    method: 'post',
    data
  })
}

export function getGroupStandard(data) {
  return request({
    url: `${path}/getGroupStandard`,
    method: 'post',
    data
  })
}

export function getStorageStandard(data) {
  return request({
    url: `${path}/getStorageStandard`,
    method: 'post',
    data
  })
}

export function setStandardStorage(data) {
  return request({
    url: `${path}/setStandardStorage`,
    method: 'post',
    data
  })
}
