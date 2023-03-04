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
    name: 'report_market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/report'),
    name: 'report_purchase', meta: { title: '采购报表', roles: [702] }
  }, {
    path: 'agreement', component: () => import('@/views/agreement/report'),
    name: 'report_agreement', meta: { title: '履约报表', roles: [703] }
  }, {
    path: 'product', component: () => import('@/views/product/report'),
    name: 'report_product', meta: { title: '生产报表', roles: [704] }
  }, {
    path: 'storage', component: () => import('@/views/storage/report'),
    name: 'report_storage', meta: { title: '仓储报表', roles: [705] }
  }, {
    path: 'cloud', component: () => import('@/views/cloud/report'),
    name: 'report_cloud', meta: { title: '云仓报表', roles: [706] }
  }, {
    path: 'stock', component: () => import('@/views/stock/storage'),
    name: 'report_stock', meta: { title: '仓储库存', roles: [707] }
  }, {
    path: 'cloudStock', component: () => import('@/views/stock/cloud'),
    name: 'report_cloudStock', meta: { title: '云仓库存', roles: [708] }
  }]
}
