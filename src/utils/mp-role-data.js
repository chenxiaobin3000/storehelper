export default [{
  meta: { title: '报表', roles: [10] }, path: '/report'
}, {
  meta: { title: '采购权限', roles: [11] }, path: '/purchaseReview',
  children: [{
    meta: { title: '采购进货权限', roles: [12] }, path: '/purchasePurchaseReview'
  }, {
    meta: { title: '采购退货权限', roles: [13] }, path: '/purchaseReturnReview'
  }]
}, {
  meta: { title: '仓储权限', roles: [20] }, path: '/storageReview',
  children: [{
    meta: { title: '仓储进货权限', roles: [21] }, path: '/storagePurchaseReview'
  }, {
    meta: { title: '仓储退货权限', roles: [22] }, path: '/storageReturnReview'
  }, {
    meta: { title: '仓储出库权限', roles: [23] }, path: '/storageDispatchReview'
  }, {
    meta: { title: '仓储损耗权限', roles: [24] }, path: '/storageLossReview'
  }]
}, {
  meta: { title: '生产权限', roles: [30] }, path: '/productReview',
  children: [{
    meta: { title: '生产权限', roles: [31] }, path: '/productCollectReview'
  }]
}, {
  meta: { title: '履约权限', roles: [40] }, path: '/agreementReview',
  children: [{
    meta: { title: '履约发货权限', roles: [41] }, path: '/agreementPurchaseReview'
  }, {
    meta: { title: '履约退货权限', roles: [42] }, path: '/agreementReturnReview'
  }]
}, {
  meta: { title: '销售权限', roles: [50] }, path: '/saleReview',
  children: [{
    meta: { title: '平台销售权限', roles: [51] }, path: '/afterReview'
  }, {
    meta: { title: '平台损耗权限', roles: [52] }, path: '/lossReview'
  }, {
    meta: { title: '线下销售权限', roles: [53] }, path: '/agreementOfflineReview'
  }, {
    meta: { title: '线下退货权限', roles: [54] }, path: '/agreementBackReview'
  }]
}]
