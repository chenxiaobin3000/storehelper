/**
 * 平台标签
 */
export const marketData = [{
  meta: { title: '拼多多', roles: [1] }, path: '/pdd'
}, {
  meta: { title: '美团', roles: [2] }, path: '/meituan'
}, {
  meta: { title: '快驴', roles: [3] }, path: '/kuailv'
}]

/**
 * 筛选平台标签
 */
export function filterMarket(roles, all) {
  const ret = []
  if (all) {
    ret.push({ value: 0, label: '全部' })
  }
  if (roles.includes(1)) {
    ret.push({ value: 1, label: '拼多多' })
  }
  if (roles.includes(2)) {
    ret.push({ value: 2, label: '美团' })
  }
  if (roles.includes(3)) {
    ret.push({ value: 3, label: '快驴' })
  }
  return ret
}
