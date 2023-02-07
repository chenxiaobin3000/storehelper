export const MyRoleData = [{
  path: '/market', meta: { title: '销售管理', roles: [500] },
  children: [{
    path: 'report', meta: { title: '全网总览', roles: [501] }
  }, {
    path: 'offline', hidden: true, meta: { title: '线下客户', roles: [502] }
  }]
}, {
  path: '/product', meta: { title: '生产管理', roles: [600] },
  children: [{
    path: 'report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'getList', meta: { title: '生产明细', roles: [602] }
  }, {
    path: 'alarm', meta: { title: '损耗预警', roles: [603] }
  }]
}, {
  path: '/storage', meta: { title: '仓储管理', roles: [800] },
  children: [{
    path: 'reportStock', meta: { title: '库存总览', roles: [801] }
  }, {
    path: 'stock', meta: { title: '库存明细', roles: [802] }
  }, {
    path: 'reportStorage', meta: { title: '进货总览', roles: [803] }
  }, {
    path: 'getList', meta: { title: '进货明细', roles: [804] }
  }, {
    path: 'alarm', meta: { title: '到期提醒', roles: [805] }
  }]
}, {
  path: '/agreement', meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'report', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'getList', meta: { title: '履约明细', roles: [202] }
  }, {
    path: 'alarm', meta: { title: '退货预警', roles: [203] }
  }]
}, {
  path: '/supplier', hidden: true, meta: { title: '供应商管理', roles: [900] },
  children: [{
    path: 'getList', meta: { title: '供应商列表', roles: [901] }
  }, {
    path: 'keepBook', meta: { title: '账款明细', roles: [902] }
  }]
}, {
  path: '/report', meta: { title: '报表管理', roles: [700] },
  children: [{
    path: 'market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'agreement', meta: { title: '履约报表', roles: [702] }
  }, {
    path: 'product', meta: { title: '生产报表', roles: [703] }
  }, {
    path: 'storage', meta: { title: '仓储报表', roles: [704] }
  }, {
    path: 'stock', meta: { title: '库存报表', roles: [705] }
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
    path: 'destroyList', meta: { title: '废料列表', roles: [306] }
  }, {
    path: 'setCategory', meta: { title: '品类管理', roles: [307] }
  }, {
    path: 'attributeList', meta: { title: '属性管理', roles: [308] }
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
    path: 'groupInfo', meta: { title: '公司信息', roles: [1101] }
  }, {
    path: 'storageList', meta: { title: '仓库管理', roles: [1102] }
  }, {
    path: 'roleList', meta: { title: '角色管理', roles: [1103] }
  }, {
    path: 'mpRoleList', meta: { title: '微信管理', roles: [1104] }
  }, {
    path: 'charge', meta: { title: '充值管理', roles: [1105] }
  }]
}]

export const MyRoleDataPdd = {
  path: 'pdd', meta: { title: '拼多多', roles: [510] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [511] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [512] }
  }, {
    path: 'commodity', meta: { title: '对接模板', roles: [513] }
  }, {
    path: 'alarm', meta: { title: '调价预警', roles: [514] }
  }]
}

export const MyRoleDataMeiTuan = {
  path: 'meituan', meta: { title: '美团', roles: [520] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [521] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [522] }
  }, {
    path: 'commodity', meta: { title: '对接模板', roles: [523] }
  }, {
    path: 'alarm', meta: { title: '调价预警', roles: [524] }
  }]
}

export const MyRoleDataKuaiLv = {
  path: 'kuailv', meta: { title: '快驴', roles: [530] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [531] }
  }, {
    path: 'getList', meta: { title: '销售明细', roles: [532] }
  }, {
    path: 'commodity', meta: { title: '对接模板', roles: [533] }
  }, {
    path: 'alarm', meta: { title: '调价预警', roles: [534] }
  }]
}
