/**
 * 平台标签
 */
export const marketData = [{
  meta: { title: '拼多多', roles: [1] }, path: '/pdd'
}, {
  meta: { title: '美团', roles: [2] }, path: '/meituan'
}, {
  meta: { title: '快驴', roles: [3] }, path: '/kuailv'
}, {
  meta: { title: '美莱', roles: [4] }, path: '/meilai'
}, {
  meta: { title: '淘菜菜', roles: [5] }, path: '/taocaicai'
}]

export const marketArr = ['', '拼多多', '美团', '快驴', '美莱', '淘菜菜']

/**
 * 筛选平台标签
 */
export function filterMarket(roles, all) {
  const ret = []
  if (all) {
    ret.push({ id: 0, label: '全部' })
  }
  if (roles.includes(1)) {
    ret.push({ id: 1, label: '拼多多' })
  }
  if (roles.includes(2)) {
    ret.push({ id: 2, label: '美团' })
  }
  if (roles.includes(3)) {
    ret.push({ id: 3, label: '快驴' })
  }
  if (roles.includes(4)) {
    ret.push({ id: 4, label: '美莱' })
  }
  if (roles.includes(5)) {
    ret.push({ id: 5, label: '淘菜菜' })
  }
  return ret
}
