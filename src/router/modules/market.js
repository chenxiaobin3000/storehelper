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
    name: 'market_report', meta: { title: '全网总览', roles: [501] }
  }, {
    path: 'pdd', name: 'market_pdd',
    component: () => import('@/views/market/pdd/index'),
    meta: { title: '拼多多', roles: [510] },
    children: [{
      path: 'report', component: () => import('@/views/market/pdd/report'),
      name: 'market_pdd_report', meta: { title: '销售总览', roles: [511] }
    }, {
      path: 'getList', component: () => import('@/views/market/pdd/getList'),
      name: 'market_pdd_getList', meta: { title: '销售明细', roles: [512] }
    }, {
      path: 'commodity', component: () => import('@/views/market/pdd/commodity'),
      name: 'market_pdd_commodity', meta: { title: '对接模板', roles: [513] }
    }, {
      path: 'alarm', component: () => import('@/views/market/pdd/alarm'),
      name: 'market_pdd_alarm', meta: { title: '调价预警', roles: [514] }
    }]
  }, {
    path: 'meituan', name: 'market_meituan',
    component: () => import('@/views/market/meituan/index'),
    meta: { title: '美团', roles: [520] },
    children: [{
      path: 'report', component: () => import('@/views/market/meituan/report'),
      name: 'market_meituan_report', meta: { title: '销售总览', roles: [521] }
    }, {
      path: 'getList', component: () => import('@/views/market/meituan/getList'),
      name: 'market_meituan_getList', meta: { title: '销售明细', roles: [522] }
    }, {
      path: 'commodity', component: () => import('@/views/market/meituan/commodity'),
      name: 'market_meituan_commodity', meta: { title: '对接模板', roles: [523] }
    }, {
      path: 'alarm', component: () => import('@/views/market/meituan/alarm'),
      name: 'market_meituan_alarm', meta: { title: '调价预警', roles: [524] }
    }]
  }, {
    path: 'kuailv', name: 'market_kuailv',
    component: () => import('@/views/market/kuailv/index'),
    meta: { title: '快驴', roles: [530] },
    children: [{
      path: 'report', component: () => import('@/views/market/kuailv/report'),
      name: 'market_kuailv_report', meta: { title: '销售总览', roles: [531] }
    }, {
      path: 'getList', component: () => import('@/views/market/kuailv/getList'),
      name: 'market_kuailv_getList', meta: { title: '销售明细', roles: [532] }
    }, {
      path: 'commodity', component: () => import('@/views/market/kuailv/commodity'),
      name: 'market_kuailv_commodity', meta: { title: '对接模板', roles: [533] }
    }, {
      path: 'alarm', component: () => import('@/views/market/kuailv/alarm'),
      name: 'market_kuailv_alarm', meta: { title: '调价预警', roles: [534] }
    }]
  }, {
    path: 'offline', hidden: true, component: () => import('@/views/market/offline'),
    name: 'market_offline', meta: { title: '线下客户', roles: [502] }
  }]
}

export default marketRouter
