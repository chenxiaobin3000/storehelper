import request from '@/utils/request'
const path = '/halfgood'

export function addHalfgood(data) {
  return request({
    url: `${path}/addHalfgood`,
    method: 'post',
    data
  })
}

export function setHalfgood(data) {
  return request({
    url: `${path}/setHalfgood`,
    method: 'post',
    data
  })
}

export function delHalfgood(data) {
  return request({
    url: `${path}/delHalfgood`,
    method: 'post',
    data
  })
}

export function getGroupHalfgood(data) {
  return request({
    url: `${path}/getGroupHalfgood`,
    method: 'post',
    data
  })
}
