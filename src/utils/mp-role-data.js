export default [{
  meta: { title: '采购权限', roles: [11] }, path: '/purchase',
  children: [{
    meta: { title: '采购进货权限', roles: [12] }, path: '/purchase'
  }, {
    meta: { title: '采购退货权限', roles: [13] }, path: '/return'
  }]
}, {
  meta: { title: '仓储权限', roles: [20] }, path: '/storage',
  children: [{
    meta: { title: '采购入库权限', roles: [21] }, path: '/purchaseIn'
  }, {
    meta: { title: '生产入库权限', roles: [23] }, path: '/productIn'
  }, {
    meta: { title: '履约入库权限', roles: [25] }, path: '/agreementIn'
  }, {
    meta: { title: '销售入库权限', roles: [27] }, path: '/offlineIn'
  }, {
    meta: { title: '仓储入库权限', roles: [29] }, path: '/dispatchIn'
  }, {
    meta: { title: '采购出库权限', roles: [22] }, path: '/purchaseOut'
  }, {
    meta: { title: '生产出库权限', roles: [24] }, path: '/productOut'
  }, {
    meta: { title: '履约出库权限', roles: [26] }, path: '/agreementOut'
  }, {
    meta: { title: '销售出库权限', roles: [28] }, path: '/offlineOut'
  }, {
    meta: { title: '仓储出库权限', roles: [30] }, path: '/dispatchOut'
  }, {
    meta: { title: '仓储损耗权限', roles: [31] }, path: '/loss'
  }]
}, {
  meta: { title: '生产权限', roles: [40] }, path: '/product',
  children: [{
    meta: { title: '生产出库权限', roles: [41] }, path: '/process'
  }, {
    meta: { title: '生产入库权限', roles: [42] }, path: '/complete'
  }, {
    meta: { title: '生产损耗权限', roles: [43] }, path: '/loss'
  }]
}, {
  meta: { title: '履约权限', roles: [50] }, path: '/agreement',
  children: [{
    meta: { title: '履约发货权限', roles: [51] }, path: '/shipped'
  }, {
    meta: { title: '履约退货权限', roles: [52] }, path: '/return'
  }]
}, {
  meta: { title: '平台权限', roles: [60] }, path: '/sale',
  children: [{
    meta: { title: '平台销售权限', roles: [61] }, path: '/sale'
  }, {
    meta: { title: '平台损耗权限', roles: [62] }, path: '/loss'
  }]
}, {
  meta: { title: '线下权限', roles: [70] }, path: '/offline',
  children: [{
    meta: { title: '线下销售权限', roles: [71] }, path: '/offline'
  }, {
    meta: { title: '线下退货权限', roles: [72] }, path: '/return'
  }]
}]
