import Layout from '@/layout'

const marketRouter = {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: ['market']
  },
  children: [{
    path: 'report', component: () => import('@/views/market/report'),
    name: 'market_report', meta: { title: '销售总览', roles: ['market'] }
  }, {
    path: 'pdd', name: 'market_pdd',
    component: () => import('@/views/market/pdd/index'),
    meta: { title: '拼多多', roles: ['market_pdd'] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/pdd/surplus'),
      name: 'market_pdd_surplus', meta: { title: '结存信息', roles: ['market_pdd'] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/pdd/comeIn'),
      name: 'market_pdd_comeIn', meta: { title: '入库信息', roles: ['market_pdd'] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/pdd/sendOut'),
      name: 'market_pdd_sendOut', meta: { title: '出库信息', roles: ['market_pdd'] }
    }, {
      path: 'price', component: () => import('@/views/market/pdd/price'),
      name: 'market_pdd_price', meta: { title: '前端价格', roles: ['market_pdd'] }
    }, {
      path: 'alarm', component: () => import('@/views/market/pdd/alarm'),
      name: 'market_pdd_alarm', meta: { title: '调价预警', roles: ['market_pdd'] }
    }, {
      path: 'setting', component: () => import('@/views/market/pdd/setting'),
      name: 'market_pdd_setting', meta: { title: '设置', roles: ['market_pdd'] }
    }]
  }, {
    path: 'meiTuan', name: 'market_meiTuan',
    component: () => import('@/views/market/meiTuan/index'),
    meta: { title: '美团', roles: ['market_meituan'] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/meiTuan/surplus'),
      name: 'market_meiTuan_surplus', meta: { title: '结存信息', roles: ['market_meituan'] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/meiTuan/comeIn'),
      name: 'market_meiTuan_comeIn', meta: { title: '入库信息', roles: ['market_meituan'] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/meiTuan/sendOut'),
      name: 'market_meiTuan_sendOut', meta: { title: '出库信息', roles: ['market_meituan'] }
    }, {
      path: 'price', component: () => import('@/views/market/meiTuan/price'),
      name: 'market_meiTuan_price', meta: { title: '前端价格', roles: ['market_meituan'] }
    }, {
      path: 'alarm', component: () => import('@/views/market/meiTuan/alarm'),
      name: 'market_meiTuan_alarm', meta: { title: '调价预警', roles: ['market_meituan'] }
    }, {
      path: 'setting', component: () => import('@/views/market/meiTuan/setting'),
      name: 'market_meiTuan_setting', meta: { title: '设置', roles: ['market_meituan'] }
    }]
  }, {
    path: 'kuaiLv', name: 'market_kuaiLv',
    component: () => import('@/views/market/kuaiLv/index'),
    meta: { title: '拼多多', roles: ['market_kuailv'] },
    children: [{
      path: 'surplus', component: () => import('@/views/market/kuaiLv/surplus'),
      name: 'market_kuaiLv_surplus', meta: { title: '结存信息', roles: ['market_kuailv'] }
    }, {
      path: 'comeIn', component: () => import('@/views/market/kuaiLv/comeIn'),
      name: 'market_kuaiLv_comeIn', meta: { title: '入库信息', roles: ['market_kuailv'] }
    }, {
      path: 'sendOut', component: () => import('@/views/market/kuaiLv/sendOut'),
      name: 'market_kuaiLv_sendOut', meta: { title: '出库信息', roles: ['market_kuailv'] }
    }, {
      path: 'price', component: () => import('@/views/market/kuaiLv/price'),
      name: 'market_kuaiLv_price', meta: { title: '前端价格', roles: ['market_kuailv'] }
    }, {
      path: 'alarm', component: () => import('@/views/market/kuaiLv/alarm'),
      name: 'market_kuaiLv_alarm', meta: { title: '调价预警', roles: ['market_kuailv'] }
    }, {
      path: 'setting', component: () => import('@/views/market/kuaiLv/setting'),
      name: 'market_kuaiLv_setting', meta: { title: '设置', roles: ['market_kuailv'] }
    }]
  }, {
    path: 'offline', component: () => import('@/views/market/offline'),
    name: 'market_offline', meta: { title: '线下客户', roles: ['market'] }
  }]
}

export default marketRouter
