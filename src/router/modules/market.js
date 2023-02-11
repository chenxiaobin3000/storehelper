import Layout from '@/layout'

export const marketRouter = {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: [500]
  },
  children: [{
    path: 'report', component: () => import('@/views/report/market'),
    name: 'market_report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', component: () => import('@/views/market/getList'),
    name: 'market_getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'commodity', component: () => import('@/views/market/commodity'),
    name: 'market_commodity', meta: { title: '对接模板', roles: [503] }
  }, {
    path: 'alarm', component: () => import('@/views/market/alarm'),
    name: 'market_alarm', meta: { title: '调价预警', roles: [504] }
  }, {
    path: 'offline', hidden: true, component: () => import('@/views/market/offline'),
    name: 'market_offline', meta: { title: '线下客户', roles: [505] }
  }]
}
