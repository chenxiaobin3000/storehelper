export default [{
  path: '/market', meta: { title: '销售管理', roles: [500] },
  children: [{
    path: 'report', meta: { title: '销售总览', roles: [502] }
  }, {
    path: 'pdd', meta: { title: '拼多多', roles: [510] },
    children: [{
      path: 'surplus', meta: { title: '结存信息', roles: [516] }
    }, {
      path: 'comeIn', meta: { title: '入库信息', roles: [512] }
    }, {
      path: 'sendOut', meta: { title: '出库信息', roles: [514] }
    }, {
      path: 'price', meta: { title: '前端价格', roles: [513] }
    }, {
      path: 'alarm', meta: { title: '调价预警', roles: [511] }
    }, {
      path: 'setting', meta: { title: '设置', roles: [515] }
    }]
  }, {
    path: 'meiTuan', meta: { title: '美团', roles: [520] },
    children: [{
      path: 'surplus', meta: { title: '结存信息', roles: [526] }
    }, {
      path: 'comeIn', meta: { title: '入库信息', roles: [522] }
    }, {
      path: 'sendOut', meta: { title: '出库信息', roles: [524] }
    }, {
      path: 'price', meta: { title: '前端价格', roles: [523] }
    }, {
      path: 'alarm', meta: { title: '调价预警', roles: [521] }
    }, {
      path: 'setting', meta: { title: '设置', roles: [525] }
    }]
  }, {
    path: 'kuaiLv', meta: { title: '拼多多', roles: [530] },
    children: [{
      path: 'surplus', meta: { title: '结存信息', roles: [536] }
    }, {
      path: 'comeIn', meta: { title: '入库信息', roles: [532] }
    }, {
      path: 'sendOut', meta: { title: '出库信息', roles: [534] }
    }, {
      path: 'price', meta: { title: '前端价格', roles: [533] }
    }, {
      path: 'alarm', meta: { title: '调价预警', roles: [531] }
    }, {
      path: 'setting', meta: { title: '设置', roles: [535] }
    }]
  }, {
    path: 'offline', meta: { title: '线下客户', roles: [501] }
  }]
}, {
  path: '/product', meta: { title: '生产管理', roles: [600] },
  children: [{
    path: 'alarm', meta: { title: '损耗预警', roles: [601] }
  }, {
    path: 'report', meta: { title: '生产总览', roles: [602] }
  }, {
    path: 'getList', meta: { title: '生产记录', roles: [603] }
  }]
}, {
  path: '/storage', meta: { title: '库存管理', roles: [800] },
  children: [{
    path: 'alarm', meta: { title: '到期提醒', roles: [801] }
  }, {
    path: 'report', meta: { title: '库存总览', roles: [802] }
  }, {
    path: 'getList', meta: { title: '库存信息', roles: [803] }
  }, {
    path: 'purchase', meta: { title: '进货记录', roles: [804] }
  }, {
    path: 'product', meta: { title: '生产记录', roles: [805] }
  }, {
    path: 'agreement', meta: { title: '履约记录', roles: [806] }
  }, {
    path: 'address', meta: { title: '仓库地址', roles: [807] }
  }]
}, {
  path: '/agreement', meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'alarm', meta: { title: '退货预警', roles: [201] }
  }, {
    path: 'report', meta: { title: '履约总览', roles: [202] }
  }, {
    path: 'getList', meta: { title: '履约记录', roles: [203] }
  }]
}, {
  path: '/supplier', meta: { title: '供应商管理', roles: [900] },
  children: [{
    path: 'getList', meta: { title: '供应商列表', roles: [901] }
  }, {
    path: 'keepBook', meta: { title: '账款记录', roles: [902] }
  }]
}, {
  path: '/report', meta: { title: '报表管理', roles: [700] },
  children: [{
    path: 'day', meta: { title: '日报表', roles: [701] }
  }, {
    path: 'week', meta: { title: '周报表', roles: [703] }
  }, {
    path: 'month', meta: { title: '月度报表', roles: [702] }
  }, {
    path: 'year', meta: { title: '年度报表', roles: [704] }
  }]
}, {
  path: '/commodity', meta: { title: '商品管理', roles: [300] },
  children: [{
    path: 'saleReport', meta: { title: '销售数据', roles: [301] }
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
    path: 'setCategory', meta: { title: '品类设置', roles: [307] }
  }, {
    path: 'attributeList', meta: { title: '属性管理', roles: [308] }
  }]
}, {
  path: '/finance', meta: { title: '财务管理', roles: [400] },
  children: [{
    path: 'report', meta: { title: '财务总览', roles: [401] }
  }, {
    path: 'getList', meta: { title: '财务信息', roles: [402] }
  }]
}, {
  path: '/user', meta: { title: '用户管理', roles: [1000] },
  children: [{
    path: 'userList', meta: { title: '用户列表', roles: [1002] }
  }, {
    path: 'resetPwd', meta: { title: '重置密码', roles: [1003] }
  }, {
    path: 'setPassword', meta: { title: '修改密码', roles: [1001] }
  }]
}, {
  path: '/system', meta: { title: '系统管理', roles: [1100] },
  children: [{
    path: 'groupInfo', meta: { title: '公司信息', roles: [1103] }
  }, {
    path: 'roleList', meta: { title: '角色管理', roles: [1102] }
  }, {
    path: 'mpRoleList', meta: { title: '微信管理', roles: [1104] }
  }, {
    path: 'charge', meta: { title: '充值记录', roles: [1101] }
  }]
}]
