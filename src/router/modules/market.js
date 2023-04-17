import Layout from '@/layout'

export default {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: [500]
  },
  children: [{
    path: 'report', component: () => import('@/views/market/report'),
    name: 'market_report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', component: () => import('@/views/market/getList'),
    name: 'market_getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'sale', component: () => import('@/views/market/sale'),
    name: 'market_sale', meta: { title: '销售录入', roles: [503] }
  }, {
    path: 'after', component: () => import('@/views/market/after'),
    name: 'market_after', meta: { title: '售后录入', roles: [504] }
  }, {
    path: 'loss', component: () => import('@/views/market/loss'),
    name: 'market_loss', meta: { title: '损耗录入', roles: [505] }
  }]
}
