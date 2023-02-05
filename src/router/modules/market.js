import Layout from '@/layout'

const marketRouter = {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: [500]
  },
  children: [{
    path: 'report', component: () => import('@/views/report/market'),
    name: 'market_report', meta: { title: '销售总览', roles: [502] }
  }, {
    path: 'pdd', name: 'market_pdd',
    component: () => import('@/views/market/pdd/index'),
    meta: { title: '拼多多', roles: [510] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/pdd/surplus'),
      name: 'market_pdd_surplus', meta: { title: '结存信息', roles: [516] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/pdd/comeIn'),
      name: 'market_pdd_comeIn', meta: { title: '入库信息', roles: [512] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/pdd/sendOut'),
      name: 'market_pdd_sendOut', meta: { title: '出库信息', roles: [514] }
    }, {
      path: 'price', component: () => import('@/views/market/pdd/price'),
      name: 'market_pdd_price', meta: { title: '前端价格', roles: [513] }
    }, {
      path: 'alarm', component: () => import('@/views/market/pdd/alarm'),
      name: 'market_pdd_alarm', meta: { title: '调价预警', roles: [511] }
    }, {
      path: 'setting', component: () => import('@/views/market/pdd/setting'),
      name: 'market_pdd_setting', meta: { title: '设置', roles: [515] }
    }]
  }, {
    path: 'meiTuan', name: 'market_meiTuan',
    component: () => import('@/views/market/meiTuan/index'),
    meta: { title: '美团', roles: [520] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/meiTuan/surplus'),
      name: 'market_meiTuan_surplus', meta: { title: '结存信息', roles: [526] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/meiTuan/comeIn'),
      name: 'market_meiTuan_comeIn', meta: { title: '入库信息', roles: [522] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/meiTuan/sendOut'),
      name: 'market_meiTuan_sendOut', meta: { title: '出库信息', roles: [524] }
    }, {
      path: 'price', component: () => import('@/views/market/meiTuan/price'),
      name: 'market_meiTuan_price', meta: { title: '前端价格', roles: [523] }
    }, {
      path: 'alarm', component: () => import('@/views/market/meiTuan/alarm'),
      name: 'market_meiTuan_alarm', meta: { title: '调价预警', roles: [521] }
    }, {
      path: 'setting', component: () => import('@/views/market/meiTuan/setting'),
      name: 'market_meiTuan_setting', meta: { title: '设置', roles: [525] }
    }]
  }, {
    path: 'kuaiLv', name: 'market_kuaiLv',
    component: () => import('@/views/market/kuaiLv/index'),
    meta: { title: '拼多多', roles: [530] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/kuaiLv/surplus'),
      name: 'market_kuaiLv_surplus', meta: { title: '结存信息', roles: [536] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/kuaiLv/comeIn'),
      name: 'market_kuaiLv_comeIn', meta: { title: '入库信息', roles: [532] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/kuaiLv/sendOut'),
      name: 'market_kuaiLv_sendOut', meta: { title: '出库信息', roles: [534] }
    }, {
      path: 'price', component: () => import('@/views/market/kuaiLv/price'),
      name: 'market_kuaiLv_price', meta: { title: '前端价格', roles: [533] }
    }, {
      path: 'alarm', component: () => import('@/views/market/kuaiLv/alarm'),
      name: 'market_kuaiLv_alarm', meta: { title: '调价预警', roles: [531] }
    }, {
      path: 'setting', component: () => import('@/views/market/kuaiLv/setting'),
      name: 'market_kuaiLv_setting', meta: { title: '设置', roles: [535] }
    }]
  }, {
    path: 'offline', component: () => import('@/views/market/offline'),
    name: 'market_offline', meta: { title: '线下客户', roles: [501] }
  }]
}

export default marketRouter
