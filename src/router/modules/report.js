import Layout from '@/layout'

export default {
  path: '/report',
  component: Layout,
  name: 'report',
  meta: {
    title: '报表管理',
    roles: [700]
  },
  children: [{
    path: 'market', component: () => import('@/views/market/report'),
    name: 'report_market', meta: { title: '平台报表', roles: [701] }
  }, {
    path: 'marketStock', component: () => import('@/views/market/stockReport'),
    name: 'report_marketStock', meta: { title: '平台库存', roles: [702] }
  }, {
    path: 'offline', component: () => import('@/views/offline/report'),
    name: 'report_offline', meta: { title: '线下报表', roles: [703] }
  }, {
    path: 'stockReport', component: () => import('@/views/storage/stockReport'),
    name: 'report_stockReport', meta: { title: '仓储库存', roles: [704] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/report'),
    name: 'report_purchase', meta: { title: '采购报表', roles: [705] }
  }, {
    path: 'storage', component: () => import('@/views/storage/report'),
    name: 'report_storage', meta: { title: '仓储报表', roles: [706] }
  }, {
    path: 'product', component: () => import('@/views/product/report'),
    name: 'report_product', meta: { title: '生产报表', roles: [707] }
  }, {
    path: 'agreement', component: () => import('@/views/agreement/report'),
    name: 'report_agreement', meta: { title: '履约报表', roles: [708] }
  }, {
    path: 'transport', component: () => import('@/views/transport/report'),
    name: 'report_transport', meta: { title: '物流报表', roles: [709] }
  }]
}
