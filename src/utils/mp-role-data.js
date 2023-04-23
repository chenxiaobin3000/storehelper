export default [{
  meta: { title: '报表', roles: [10] }, path: '/report'
}, {
  meta: { title: '采购申请', roles: [11] }, path: '/purchaseApply',
  children: [{
    meta: { title: '采购进货申请', roles: [12] }, path: '/purchasePurchaseApply'
  }, {
    meta: { title: '采购退货申请', roles: [13] }, path: '/purchaseReturnApply'
  }]
}, {
  meta: { title: '仓储申请', roles: [20] }, path: '/storageApply',
  children: [{
    meta: { title: '仓储进货申请', roles: [21] }, path: '/storagePurchaseApply'
  }, {
    meta: { title: '仓储退货申请', roles: [22] }, path: '/storageReturnApply'
  }, {
    meta: { title: '仓储调度申请', roles: [23] }, path: '/storageDispatchApply'
  }, {
    meta: { title: '仓储损耗申请', roles: [24] }, path: '/storageLossApply'
  }]
}, {
  meta: { title: '生产申请', roles: [15] }, path: '/productApply',
  children: [{
    meta: { title: '生产申请', roles: [16] }, path: '/productCollectApply'
  }]
}, {
  meta: { title: '履约申请', roles: [30] }, path: '/agreementApply',
  children: [{
    meta: { title: '履约发货申请', roles: [31] }, path: '/agreementPurchaseApply'
  }, {
    meta: { title: '履约退货申请', roles: [32] }, path: '/agreementReturnApply'
  }, {
    meta: { title: '线下销售申请', roles: [33] }, path: '/agreementOfflineApply'
  }, {
    meta: { title: '线下退货申请', roles: [34] }, path: '/agreementBackApply'
  }]
}, {
  meta: { title: '销售申请', roles: [40] }, path: '/saleApply',
  children: [{
    meta: { title: '平台销售申请', roles: [41] }, path: '/saleApply'
  }, {
    meta: { title: '平台损耗申请', roles: [42] }, path: '/lossApply'
  }]
}, {
  meta: { title: '采购审核', roles: [51] }, path: '/purchaseReview',
  children: [{
    meta: { title: '采购进货审核', roles: [52] }, path: '/purchasePurchaseReview'
  }, {
    meta: { title: '采购退货审核', roles: [53] }, path: '/purchaseReturnReview'
  }]
}, {
  meta: { title: '仓储审核', roles: [60] }, path: '/storageReview',
  children: [{
    meta: { title: '仓储进货审核', roles: [61] }, path: '/storagePurchaseReview'
  }, {
    meta: { title: '仓储退货审核', roles: [62] }, path: '/storageReturnReview'
  }, {
    meta: { title: '仓储调度审核', roles: [63] }, path: '/storageDispatchReview'
  }, {
    meta: { title: '仓储损耗审核', roles: [64] }, path: '/storageLossReview'
  }]
}, {
  meta: { title: '生产审核', roles: [55] }, path: '/productReview',
  children: [{
    meta: { title: '生产审核', roles: [56] }, path: '/productCollectReview'
  }]
}, {
  meta: { title: '履约审核', roles: [70] }, path: '/agreementReview',
  children: [{
    meta: { title: '履约发货审核', roles: [71] }, path: '/agreementPurchaseReview'
  }, {
    meta: { title: '履约退货审核', roles: [72] }, path: '/agreementReturnReview'
  }, {
    meta: { title: '线下销售审核', roles: [73] }, path: '/agreementOfflineReview'
  }, {
    meta: { title: '线下退货审核', roles: [74] }, path: '/agreementBackReview'
  }]
}, {
  meta: { title: '销售审核', roles: [80] }, path: '/saleReview',
  children: [{
    meta: { title: '平台销售审核', roles: [81] }, path: '/afterReview'
  }, {
    meta: { title: '平台损耗审核', roles: [82] }, path: '/lossReview'
  }]
}]
