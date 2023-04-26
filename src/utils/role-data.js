export const MyRoleData = [{
  path: '/', meta: { title: '首页报表', roles: [100] }
}, {
  path: '/market', meta: { title: '销售管理', roles: [500] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'sale', meta: { title: '销售录入', roles: [503] }
  }, {
    path: 'loss', meta: { title: '损耗录入', roles: [504] }
  }, {
    path: 'offline', meta: { title: '线下销售', roles: [505] }
  }, {
    path: 'back', meta: { title: '线下退货', roles: [506] }
  }]
}, {
  path: '/purchase', meta: { title: '采购管理', roles: [250] },
  children: [{
    path: 'report', meta: { title: '采购总览', roles: [251] }
  }, {
    path: 'getList', meta: { title: '采购明细', roles: [252] }
  }, {
    path: 'purchase', meta: { title: '进货录入', roles: [253] }
  }, {
    path: 'return', meta: { title: '退货录入', roles: [254] }
  }]
}, {
  path: '/transport', meta: { title: '物流管理', roles: [350] },
  children: [{
    path: 'report', meta: { title: '物流总览', roles: [351] }
  }, {
    path: 'getList', meta: { title: '物流明细', roles: [352] }
  }, {
    path: 'purchase', meta: { title: '采购物流', roles: [353] }
  }, {
    path: 'storage', meta: { title: '仓储物流', roles: [354] }
  }, {
    path: 'agreement', meta: { title: '履约物流', roles: [355] }
  }]
}, {
  path: '/storage', meta: { title: '仓储管理', roles: [800] },
  children: [{
    path: 'stockReport', meta: { title: '库存总览', roles: [801] }
  }, {
    path: 'stockList', meta: { title: '库存明细', roles: [802] }
  }, {
    path: 'report', meta: { title: '订单总览', roles: [803] }
  }, {
    path: 'getList', meta: { title: '订单明细', roles: [804] }
  }, {
    path: 'purchase', meta: { title: '入库录入', roles: [805] }
  }, {
    path: 'dispatch', meta: { title: '出库录入', roles: [807] }
  }, {
    path: 'loss', meta: { title: '损耗录入', roles: [808] }
  }, {
    path: 'return', meta: { title: '退货录入', roles: [806] }
  }]
}, {
  path: '/product', meta: { title: '生产管理', roles: [600] },
  children: [{
    path: 'report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'getList', meta: { title: '生产明细', roles: [602] }
  }, {
    path: 'collect', meta: { title: '生产录入', roles: [603] }
  }]
}, {
  path: '/agreement', meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'report', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'getList', meta: { title: '履约明细', roles: [202] }
  }, {
    path: 'shipped', meta: { title: '发货录入', roles: [203] }
  }, {
    path: 'return', meta: { title: '退货录入', roles: [204] }
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
    path: 'stock', meta: { title: '库存报表', roles: [706] }
  }, {
    path: 'purchase', meta: { title: '采购报表', roles: [702] }
  }, {
    path: 'storage', meta: { title: '仓储报表', roles: [705] }
  }, {
    path: 'product', meta: { title: '生产报表', roles: [704] }
  }, {
    path: 'agreement', meta: { title: '履约报表', roles: [703] }
  }]
}, {
  path: '/dock', meta: { title: '平台管理', roles: [450] },
  children: [{
    path: 'account', meta: { title: '账号明细', roles: [451] }
  }, {
    path: 'many', meta: { title: '聚合账号', roles: [452] }
  }, {
    path: 'storage', meta: { title: '账号关联', roles: [453] }
  }, {
    path: 'commodity', meta: { title: '商品上架', roles: [454] }
  }]
}, {
  path: '/commodity', meta: { title: '商品管理', roles: [300] },
  children: [{
    path: 'report', meta: { title: '销售数据', roles: [301] }
  }, {
    path: 'commodity', meta: { title: '商品列表', roles: [302] }
  }, {
    path: 'category', meta: { title: '品类管理', roles: [306] }
  }, {
    path: 'attribute', meta: { title: '属性管理', roles: [307] }
  }]
}, {
  path: '/finance', meta: { title: '财务管理', roles: [400] },
  children: [{
    path: 'report', meta: { title: '财务总览', roles: [401] }
  }, {
    path: 'getList', meta: { title: '汇总明细', roles: [402] }
  }, {
    path: 'detail', meta: { title: '财务明细', roles: [403] }
  }, {
    path: 'label', meta: { title: '类目管理', roles: [404] }
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
    path: 'storage', meta: { title: '仓库地址', roles: [1103] }
  }, {
    path: 'supplier', meta: { title: '供应商管理', roles: [1106] }
  }, {
    path: 'roleList', meta: { title: '角色管理', roles: [1104] }
  }, {
    path: 'mpRoleList', meta: { title: '微信管理', roles: [1105] }
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
