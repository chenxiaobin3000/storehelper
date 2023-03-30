export const MyRoleData = [{
  path: '/', meta: { title: '首页报表', roles: [100] }
}, {
  path: '/market', meta: { title: '销售管理', roles: [500] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'saleReturn', meta: { title: '售后明细', roles: [505] }
  }, {
    path: 'input', meta: { title: '价格录入', roles: [504] }
  }]
}, {
  path: '/dock', meta: { title: '平台管理', roles: [450] },
  children: [{
    path: 'account', meta: { title: '账号明细', roles: [451] }
  }, {
    path: 'many', meta: { title: '聚合账号', roles: [452] }
  }, {
    path: 'cloud', meta: { title: '云仓明细', roles: [453] }
  }, {
    path: 'commodity', meta: { title: '商品明细', roles: [454] }
  }]
}, {
  path: '/purchase', meta: { title: '采购管理', roles: [250] },
  children: [{
    path: 'report', meta: { title: '采购总览', roles: [251] }
  }, {
    path: 'purchase', meta: { title: '仓储进货', roles: [252] }
  }, {
    path: 'return', meta: { title: '仓储退货', roles: [253] }
  }, {
    path: 'purchase2', meta: { title: '云仓进货', roles: [254] }
  }, {
    path: 'return2', meta: { title: '云仓退货', roles: [255] }
  }]
}, {
  path: '/product', meta: { title: '生产管理', roles: [600] },
  children: [{
    path: 'report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'process', meta: { title: '生产开始', roles: [602] }
  }, {
    path: 'complete', meta: { title: '生产完成', roles: [603] }
  }, {
    path: 'loss', meta: { title: '损耗明细', roles: [604] }
  }]
}, {
  path: '/agreement', meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'report', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'shipped', meta: { title: '发货明细', roles: [202] }
  }, {
    path: 'return', meta: { title: '退货明细', roles: [203] }
  }]
}, {
  path: '/storage', meta: { title: '仓储管理', roles: [800] },
  children: [{
    path: 'report', meta: { title: '仓储总览', roles: [801] }
  }, {
    path: 'purchase', meta: { title: '采购进货', roles: [802] }
  }, {
    path: 'return', meta: { title: '采购退货', roles: [806] }
  }, {
    path: 'dispatch', meta: { title: '调度出库', roles: [803] }
  }, {
    path: 'purchase2', meta: { title: '调度入库', roles: [804] }
  }, {
    path: 'back', meta: { title: '履约退货', roles: [807] }
  }, {
    path: 'loss', meta: { title: '损耗明细', roles: [805] }
  }]
}, {
  path: '/cloud', meta: { title: '云仓管理', roles: [750] },
  children: [{
    path: 'report', meta: { title: '云仓总览', roles: [751] }
  }, {
    path: 'agreement', meta: { title: '履约入库', roles: [753] }
  }, {
    path: 'back', meta: { title: '履约退货', roles: [756] }
  }, {
    path: 'purchase', meta: { title: '采购入库', roles: [752] }
  }, {
    path: 'return', meta: { title: '采购退货', roles: [755] }
  }, {
    path: 'loss', meta: { title: '损耗明细', roles: [754] }
  }]
}, {
  path: '/stock', meta: { title: '库存管理', roles: [850] },
  children: [{
    path: 'stroage', meta: { title: '库存总览', roles: [851] }
  }, {
    path: 'stroageList', meta: { title: '今日库存', roles: [852] }
  }, {
    path: 'stroageOldList', meta: { title: '库存明细', roles: [853] }
  }, {
    path: 'cloud', meta: { title: '云仓总览', roles: [854] }
  }, {
    path: 'cloudList', meta: { title: '今日云仓', roles: [855] }
  }, {
    path: 'cloudOldList', meta: { title: '云仓明细', roles: [856] }
  }]
}, {
  path: '/supplier', hidden: true, meta: { title: '供应商管理', roles: [900] },
  children: [{
    path: 'getList', meta: { title: '供应商列表', roles: [901] }
  }, {
    path: 'ledger', meta: { title: '账款明细', roles: [902] }
  }]
}, {
  path: '/report', meta: { title: '报表管理', roles: [700] },
  children: [{
    path: 'market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'purchase', meta: { title: '采购报表', roles: [702] }
  }, {
    path: 'agreement', meta: { title: '履约报表', roles: [703] }
  }, {
    path: 'product', meta: { title: '生产报表', roles: [704] }
  }, {
    path: 'storage', meta: { title: '仓储报表', roles: [705] }
  }, {
    path: 'stock', meta: { title: '仓储库存', roles: [707] }
  }, {
    path: 'cloud', meta: { title: '云仓报表', roles: [706] }
  }, {
    path: 'cloudStock', meta: { title: '云仓库存', roles: [708] }
  }]
}, {
  path: '/commodity', meta: { title: '商品管理', roles: [300] },
  children: [{
    path: 'report', meta: { title: '销售数据', roles: [301] }
  }, {
    path: 'commodityList', meta: { title: '商品列表', roles: [302] }
  }, {
    path: 'halfgoodList', meta: { title: '半成品列表', roles: [303] }
  }, {
    path: 'originalList', meta: { title: '原料列表', roles: [304] }
  }, {
    path: 'standardList', meta: { title: '标品列表', roles: [305] }
  }, {
    path: 'category', meta: { title: '品类管理', roles: [306] }
  }, {
    path: 'attributeList', meta: { title: '属性管理', roles: [307] }
  }]
}, {
  path: '/finance', meta: { title: '财务管理', roles: [400] },
  children: [{
    path: 'report', meta: { title: '财务总览', roles: [401] }
  }, {
    path: 'getList', meta: { title: '财务明细', roles: [402] }
  }]
}, {
  path: '/user', meta: { title: '用户管理', roles: [1000] },
  children: [{
    path: 'userList', meta: { title: '用户管理', roles: [1001] }
  }, {
    path: 'resetPwd', meta: { title: '重置密码', roles: [1002] }
  }, {
    path: 'setPassword', meta: { title: '修改密码', roles: [1003] }
  }]
}, {
  path: '/system', meta: { title: '系统管理', roles: [1100] },
  children: [{
    path: 'alarm', meta: { title: '预警信息', roles: [1101] }
  }, {
    path: 'groupInfo', meta: { title: '公司信息', roles: [1102] }
  }, {
    path: 'department', meta: { title: '部门信息', roles: [1107] }
  }, {
    path: 'storageAddress', meta: { title: '仓库地址', roles: [1103] }
  }, {
    path: 'cloudAddress', meta: { title: '云仓地址', roles: [1104] }
  }, {
    path: 'roleList', meta: { title: '角色管理', roles: [1105] }
  }, {
    path: 'mpRoleList', meta: { title: '微信管理', roles: [1106] }
  }]
}]

export const AdminRoleData = MyRoleData.concat([{
  path: '/super', meta: { title: '超级用户', roles: [8888] },
  children: [{
    path: 'changeGroup', meta: { title: '切换客户', roles: [8889] }
  }, {
    path: 'groupList', meta: { title: '客户列表', roles: [8890] }
  }]
}])
