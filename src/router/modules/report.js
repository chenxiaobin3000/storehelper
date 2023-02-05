import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  name: 'report',
  meta: {
    title: '报表管理',
    roles: [700]
  },
  children: [{
    path: 'market', component: () => import('@/views/market/report'),
    name: 'report_market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'agreement', component: () => import('@/views/agreement/report'),
    name: 'report_agreement', meta: { title: '履约报表', roles: [702] }
  }, {
    path: 'product', component: () => import('@/views/product/report'),
    name: 'report_product', meta: { title: '生产报表', roles: [703] }
  }, {
    path: 'storage', component: () => import('@/views/storage/report'),
    name: 'report_storage', meta: { title: '仓储报表', roles: [704] }
  }, {
    path: 'stock', component: () => import('@/views/report/stock'),
    name: 'report_stock', meta: { title: '库存报表', roles: [705] }
  }]
}

export default reportRouter
