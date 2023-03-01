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
  meta: { title: '仓储申请', roles: [15] }, path: '/storageApply',
  children: [{
    meta: { title: '仓储进货申请', roles: [16] }, path: '/storagePurchaseApply'
  }, {
    meta: { title: '仓储调度申请', roles: [17] }, path: '/storageDispatchApply'
  }, {
    meta: { title: '调度入库申请', roles: [18] }, path: '/storagePurchase2Apply'
  }, {
    meta: { title: '仓储损耗申请', roles: [19] }, path: '/storageLossApply'
  }, {
    meta: { title: '仓储退货申请', roles: [20] }, path: '/storageReturnApply'
  }]
}, {
  meta: { title: '生产申请', roles: [25] }, path: '/productApply',
  children: [{
    meta: { title: '生产开始申请', roles: [26] }, path: '/productProcessApply'
  }, {
    meta: { title: '生产完成申请', roles: [27] }, path: '/productCompleteApply'
  }, {
    meta: { title: '生产损耗申请', roles: [28] }, path: '/productLossApply'
  }]
}, {
  meta: { title: '履约申请', roles: [30] }, path: '/agreementApply',
  children: [{
    meta: { title: '履约发货申请', roles: [31] }, path: '/agreementPurchaseApply'
  }, {
    meta: { title: '履约退货申请', roles: [32] }, path: '/agreementReturnApply'
  }]
}, {
  meta: { title: '云仓申请', roles: [35] }, path: '/cloudApply',
  children: [{
    meta: { title: '云仓进货申请', roles: [36] }, path: '/cloudPurchaseApply'
  }, {
    meta: { title: '云仓退货申请', roles: [37] }, path: '/cloudReturnApply'
  }, {
    meta: { title: '云仓损耗申请', roles: [39] }, path: '/cloudLossApply'
  }]
}, {
  meta: { title: '采购审核', roles: [41] }, path: '/purchaseReview',
  children: [{
    meta: { title: '采购进货审核', roles: [42] }, path: '/purchasePurchaseReview'
  }, {
    meta: { title: '采购退货审核', roles: [43] }, path: '/purchaseReturnReview'
  }]
}, {
  meta: { title: '仓储审核', roles: [45] }, path: '/storageReview',
  children: [{
    meta: { title: '仓储进货审核', roles: [46] }, path: '/storagePurchaseReview'
  }, {
    meta: { title: '仓储调度审核', roles: [47] }, path: '/storageDispatchReview'
  }, {
    meta: { title: '调度入库审核', roles: [48] }, path: '/storagePurchase2Review'
  }, {
    meta: { title: '仓储损耗审核', roles: [49] }, path: '/storageLossReview'
  }, {
    meta: { title: '仓储退货审核', roles: [50] }, path: '/storageReturnReview'
  }]
}, {
  meta: { title: '生产审核', roles: [55] }, path: '/productReview',
  children: [{
    meta: { title: '生产开始审核', roles: [56] }, path: '/productProcessReview'
  }, {
    meta: { title: '生产完成审核', roles: [57] }, path: '/productCompleteReview'
  }, {
    meta: { title: '生产损耗审核', roles: [58] }, path: '/productLossReview'
  }]
}, {
  meta: { title: '履约审核', roles: [60] }, path: '/agreementReview',
  children: [{
    meta: { title: '履约发货审核', roles: [61] }, path: '/agreementPurchaseReview'
  }, {
    meta: { title: '履约退货审核', roles: [62] }, path: '/agreementReturnReview'
  }]
}, {
  meta: { title: '云仓审核', roles: [65] }, path: '/agreementReview',
  children: [{
    meta: { title: '云仓进货审核', roles: [66] }, path: '/agreementPurchaseReview'
  }, {
    meta: { title: '云仓退货审核', roles: [67] }, path: '/agreementReturnReview'
  }, {
    meta: { title: '云仓损耗审核', roles: [69] }, path: '/agreementLossReview'
  }]
}]
