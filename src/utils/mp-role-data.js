export default [{
  meta: { title: '报表', roles: [10] }, path: '/report'
}, {
  meta: { title: '采购申请', roles: [11] }, path: '/purchaseApply',
  children: [{
    meta: { title: '采购仓储进货申请', roles: [12] }, path: '/purchasePurchaseApply'
  }, {
    meta: { title: '采购仓储退货申请', roles: [13] }, path: '/purchaseReturnApply'
  }, {
    meta: { title: '采购云仓进货申请', roles: [14] }, path: '/purchasePurchase2Apply'
  }, {
    meta: { title: '采购云仓退货申请', roles: [47] }, path: '/purchaseReturn2Apply'
  }]
}, {
  meta: { title: '仓储申请', roles: [15] }, path: '/storageApply',
  children: [{
    meta: { title: '仓储采购进货申请', roles: [16] }, path: '/storagePurchaseApply'
  }, {
    meta: { title: '仓储调度出库申请', roles: [17] }, path: '/storageDispatchApply'
  }, {
    meta: { title: '调度调度入库申请', roles: [18] }, path: '/storagePurchase2Apply'
  }, {
    meta: { title: '仓储损耗申请', roles: [19] }, path: '/storageLossApply'
  }, {
    meta: { title: '仓储采购退货申请', roles: [20] }, path: '/storageReturnApply'
  }, {
    meta: { title: '仓储履约退货申请', roles: [21] }, path: '/storageBackApply'
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
    meta: { title: '云仓履约进货申请', roles: [40] }, path: '/cloudAgreementApply'
  }, {
    meta: { title: '云仓履约退货申请', roles: [39] }, path: '/cloudBackApply'
  }, {
    meta: { title: '云仓采购进货申请', roles: [36] }, path: '/cloudPurchaseApply'
  }, {
    meta: { title: '云仓采购退货申请', roles: [37] }, path: '/cloudReturnApply'
  }, {
    meta: { title: '云仓损耗申请', roles: [38] }, path: '/cloudLossApply'
  }]
}, {
  meta: { title: '销售申请', roles: [45] }, path: '/saleApply',
  children: [{
    meta: { title: '销售售后申请', roles: [50] }, path: '/saleReturnApply'
  }]
}, {
  meta: { title: '采购审核', roles: [51] }, path: '/purchaseReview',
  children: [{
    meta: { title: '采购仓储进货审核', roles: [52] }, path: '/purchasePurchaseReview'
  }, {
    meta: { title: '采购仓储退货审核', roles: [53] }, path: '/purchaseReturnReview'
  }, {
    meta: { title: '采购云仓进货审核', roles: [54] }, path: '/purchasePurchase2Review'
  }, {
    meta: { title: '采购云仓退货审核', roles: [87] }, path: '/purchaseReturn2Review'
  }]
}, {
  meta: { title: '仓储审核', roles: [55] }, path: '/storageReview',
  children: [{
    meta: { title: '仓储采购进货审核', roles: [56] }, path: '/storagePurchaseReview'
  }, {
    meta: { title: '仓储调度出库审核', roles: [57] }, path: '/storageDispatchReview'
  }, {
    meta: { title: '调度调度入库审核', roles: [58] }, path: '/storagePurchase2Review'
  }, {
    meta: { title: '仓储损耗审核', roles: [59] }, path: '/storageLossReview'
  }, {
    meta: { title: '仓储采购退货审核', roles: [60] }, path: '/storageReturnReview'
  }, {
    meta: { title: '仓储履约退货审核', roles: [61] }, path: '/storageBackReview'
  }]
}, {
  meta: { title: '生产审核', roles: [65] }, path: '/productReview',
  children: [{
    meta: { title: '生产开始审核', roles: [66] }, path: '/productProcessReview'
  }, {
    meta: { title: '生产完成审核', roles: [67] }, path: '/productCompleteReview'
  }, {
    meta: { title: '生产损耗审核', roles: [68] }, path: '/productLossReview'
  }]
}, {
  meta: { title: '履约审核', roles: [70] }, path: '/agreementReview',
  children: [{
    meta: { title: '履约发货审核', roles: [71] }, path: '/agreementPurchaseReview'
  }, {
    meta: { title: '履约退货审核', roles: [72] }, path: '/agreementReturnReview'
  }]
}, {
  meta: { title: '云仓审核', roles: [75] }, path: '/cloudReview',
  children: [{
    meta: { title: '云仓履约进货审核', roles: [80] }, path: '/cloudAgreementReview'
  }, {
    meta: { title: '云仓履约退货审核', roles: [79] }, path: '/cloudBackReview'
  }, {
    meta: { title: '云仓采购进货审核', roles: [76] }, path: '/cloudPurchaseReview'
  }, {
    meta: { title: '云仓采购退货审核', roles: [77] }, path: '/cloudReturnReview'
  }, {
    meta: { title: '云仓损耗审核', roles: [78] }, path: '/cloudLossReview'
  }]
}, {
  meta: { title: '销售审核', roles: [85] }, path: '/saleReview',
  children: [{
    meta: { title: '销售售后审核', roles: [90] }, path: '/saleReturnReview'
  }]
}]
