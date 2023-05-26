export const MyRoleData = [{
  path: '/', meta: { title: '首页报表', roles: [100] }
}, {
  path: '/market', meta: { title: '平台销售', roles: [500] },
  children: [{
    path: 'stock', meta: { title: '库存明细', roles: [501] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'sale', meta: { title: '销售录入', roles: [503] }
  }, {
    path: 'loss', meta: { title: '损耗录入', roles: [504] }
  }]
}, {
  path: '/offline', meta: { title: '线下销售', roles: [550] },
  children: [{
    path: 'getList', meta: { title: '销售明细', roles: [551] }
  }, {
    path: 'offline', meta: { title: '销售录入', roles: [552] }
  }, {
    path: 'back', meta: { title: '退货录入', roles: [553] }
  }]
}, {
  path: '/purchase', meta: { title: '采购管理', roles: [250] },
  children: [{
    path: 'getList', meta: { title: '采购明细', roles: [251] }
  }, {
    path: 'purchase', meta: { title: '进货录入', roles: [252] }
  }, {
    path: 'return', meta: { title: '退货录入', roles: [253] }
  }]
}, {
  path: '/transport', meta: { title: '物流管理', roles: [350] },
  children: [{
    path: 'purchase', meta: { title: '采购物流', roles: [351] }
  }, {
    path: 'storage', meta: { title: '仓储物流', roles: [352] }
  }, {
    path: 'agreement', meta: { title: '履约物流', roles: [353] }
  }, {
    path: 'product', meta: { title: '生产物流', roles: [354] }
  }, {
    path: 'offline', meta: { title: '销售物流', roles: [355] }
  }]
}, {
  path: '/storage', meta: { title: '仓储管理', roles: [800] },
  children: [{
    path: 'stock', meta: { title: '库存明细', roles: [801] }
  }, {
    path: 'getList', meta: { title: '订单明细', roles: [802] }
  }, {
    path: 'purchase', meta: { title: '入库录入', roles: [803] }
  }, {
    path: 'dispatch', meta: { title: '出库录入', roles: [804] }
  }, {
    path: 'loss', meta: { title: '损耗录入', roles: [805] }
  }]
}, {
  path: '/product', meta: { title: '生产管理', roles: [600] },
  children: [{
    path: 'getList', meta: { title: '生产明细', roles: [601] }
  }, {
    path: 'process', meta: { title: '出库录入', roles: [602] }
  }, {
    path: 'complete', meta: { title: '入库录入', roles: [603] }
  }, {
    path: 'loss', meta: { title: '损耗录入', roles: [604] }
  }]
}, {
  path: '/agreement', meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'getList', meta: { title: '履约明细', roles: [201] }
  }, {
    path: 'shipped', meta: { title: '发货录入', roles: [202] }
  }, {
    path: 'return', meta: { title: '退货录入', roles: [203] }
  }]
}, {
  path: '/report', meta: { title: '报表管理', roles: [700] },
  children: [{
    path: 'market', meta: { title: '平台报表', roles: [701] }
  }, {
    path: 'marketStock', meta: { title: '平台库存', roles: [702] }
  }, {
    path: 'offline', meta: { title: '线下报表', roles: [703] }
  }, {
    path: 'stockReport', meta: { title: '仓储库存', roles: [704] }
  }, {
    path: 'purchase', meta: { title: '采购报表', roles: [705] }
  }, {
    path: 'storage', meta: { title: '仓储报表', roles: [706] }
  }, {
    path: 'product', meta: { title: '生产报表', roles: [707] }
  }, {
    path: 'agreement', meta: { title: '履约报表', roles: [708] }
  }]
}, {
  path: '/commodity', meta: { title: '商品管理', roles: [300] },
  children: [{
    path: 'report', meta: { title: '销售数据', roles: [301] }
  }, {
    path: 'commodity', meta: { title: '商品列表', roles: [302] }
  }, {
    path: 'category', meta: { title: '品类管理', roles: [303] }
  }, {
    path: 'attribute', meta: { title: '属性管理', roles: [304] }
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
    path: 'account', meta: { title: '账号管理', roles: [1108] }
  }, {
    path: 'roleList', meta: { title: '角色管理', roles: [1104] }
  }, {
    path: 'mpRoleList', meta: { title: '审核管理', roles: [1105] }
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
