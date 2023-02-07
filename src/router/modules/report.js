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
    path: 'market', component: () => import('@/views/report/market'),
    name: 'report_market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'agreement', component: () => import('@/views/report/agreement'),
    name: 'report_agreement', meta: { title: '履约报表', roles: [702] }
  }, {
    path: 'product', component: () => import('@/views/report/product'),
    name: 'report_product', meta: { title: '生产报表', roles: [703] }
  }, {
    path: 'storage', component: () => import('@/views/report/storage'),
    name: 'report_storage', meta: { title: '仓储报表', roles: [704] }
  }, {
    path: 'stock', component: () => import('@/views/report/stock'),
    name: 'report_stock', meta: { title: '库存报表', roles: [705] }
  }]
}
