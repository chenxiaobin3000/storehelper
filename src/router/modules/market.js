import Layout from '@/layout'

export default {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '平台销售',
    roles: [500]
  },
  children: [{
    path: 'stockReport', component: () => import('@/views/market/stockReport'),
    name: 'market_stockReport', meta: { title: '库存总览', roles: [505] }
  }, {
    path: 'stock', component: () => import('@/views/market/stock'),
    name: 'market_stock', meta: { title: '库存明细', roles: [506] }
  }, {
    path: 'report', component: () => import('@/views/market/report'),
    name: 'market_report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', component: () => import('@/views/market/getList'),
    name: 'market_getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'sale', component: () => import('@/views/market/sale'),
    name: 'market_sale', meta: { title: '销售录入', roles: [503] }
  }, {
    path: 'loss', component: () => import('@/views/market/loss'),
    name: 'market_loss', meta: { title: '损耗录入', roles: [504] }
  }]
}
