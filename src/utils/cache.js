import Cookies from 'js-cookie'

const CacheKey = 'storeCache'

export function getToken() {
  const cache = Cookies.get(CacheKey)
  if (cache && cache.length > 0) {
    const data = JSON.parse(cache)
    return data.token
  }
  return ''
}

export function getUserId() {
  const cache = Cookies.get(CacheKey)
  if (cache && cache.length > 0) {
    const data = JSON.parse(cache)
    return data.id
  }
  return 0
}

export function setCache(id, token) {
  return Cookies.set(CacheKey, { id: id, token: token })
}

export function removeCache() {
  return Cookies.remove(CacheKey)
}
