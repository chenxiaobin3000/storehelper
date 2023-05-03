import request from '@/utils/request'
const path = '/storage'

export function addStorage(data) {
  return request({
    url: `${path}/addStorage`,
    method: 'post',
    data
  })
}

export function setStorage(data) {
  return request({
    url: `${path}/setStorage`,
    method: 'post',
    data
  })
}

export function delStorage(data) {
  return request({
    url: `${path}/delStorage`,
    method: 'post',
    data
  })
}

export function getGroupStorage(data) {
  return request({
    url: `${path}/getGroupStorage`,
    method: 'post',
    data
  })
}

export function getGroupAllStorage(data) {
  return request({
    url: `${path}/getGroupAllStorage`,
    method: 'post',
    data
  })
}

export function getStorageType(data) {
  return request({
    url: `${path}/getStorageType`,
    method: 'post',
    data
  })
}

export function sin(data) {
  return request({
    url: `${path}/sin`,
    method: 'post',
    data
  })
}

export function setIn(data) {
  return request({
    url: `${path}/setIn`,
    method: 'post',
    data
  })
}

export function delIn(data) {
  return request({
    url: `${path}/delIn`,
    method: 'post',
    data
  })
}

export function reviewIn(data) {
  return request({
    url: `${path}/reviewIn`,
    method: 'post',
    data
  })
}

export function revokeIn(data) {
  return request({
    url: `${path}/revokeIn`,
    method: 'post',
    data
  })
}

export function sout(data) {
  return request({
    url: `${path}/sout`,
    method: 'post',
    data
  })
}

export function setOut(data) {
  return request({
    url: `${path}/setOut`,
    method: 'post',
    data
  })
}

export function delOut(data) {
  return request({
    url: `${path}/delOut`,
    method: 'post',
    data
  })
}

export function reviewOut(data) {
  return request({
    url: `${path}/reviewOut`,
    method: 'post',
    data
  })
}

export function revokeOut(data) {
  return request({
    url: `${path}/revokeOut`,
    method: 'post',
    data
  })
}

export function dispatchIn(data) {
  return request({
    url: `${path}/dispatchIn`,
    method: 'post',
    data
  })
}

export function setDispatchIn(data) {
  return request({
    url: `${path}/setDispatchIn`,
    method: 'post',
    data
  })
}

export function delDispatchIn(data) {
  return request({
    url: `${path}/delDispatchIn`,
    method: 'post',
    data
  })
}

export function reviewDispatchIn(data) {
  return request({
    url: `${path}/reviewDispatchIn`,
    method: 'post',
    data
  })
}

export function revokeDispatchIn(data) {
  return request({
    url: `${path}/revokeDispatchIn`,
    method: 'post',
    data
  })
}

export function dispatchOut(data) {
  return request({
    url: `${path}/dispatchOut`,
    method: 'post',
    data
  })
}

export function setDispatchOut(data) {
  return request({
    url: `${path}/setDispatchOut`,
    method: 'post',
    data
  })
}

export function delDispatchOut(data) {
  return request({
    url: `${path}/delDispatchOut`,
    method: 'post',
    data
  })
}

export function reviewDispatchOut(data) {
  return request({
    url: `${path}/reviewDispatchOut`,
    method: 'post',
    data
  })
}

export function revokeDispatchOut(data) {
  return request({
    url: `${path}/revokeDispatchOut`,
    method: 'post',
    data
  })
}

export function loss(data) {
  return request({
    url: `${path}/loss`,
    method: 'post',
    data
  })
}

export function setLoss(data) {
  return request({
    url: `${path}/setLoss`,
    method: 'post',
    data
  })
}

export function delLoss(data) {
  return request({
    url: `${path}/delLoss`,
    method: 'post',
    data
  })
}

export function reviewLoss(data) {
  return request({
    url: `${path}/reviewLoss`,
    method: 'post',
    data
  })
}

export function revokeLoss(data) {
  return request({
    url: `${path}/revokeLoss`,
    method: 'post',
    data
  })
}
