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
    name: 'market', meta: { title: '销售报表', roles: [701] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/report'),
    name: 'purchase', meta: { title: '采购报表', roles: [702] }
  }, {
    path: 'agreement', component: () => import('@/views/agreement/report'),
    name: 'agreement', meta: { title: '履约报表', roles: [703] }
  }, {
    path: 'product', component: () => import('@/views/product/report'),
    name: 'product', meta: { title: '生产报表', roles: [704] }
  }, {
    path: 'storage', component: () => import('@/views/storage/report'),
    name: 'storage', meta: { title: '仓储报表', roles: [705] }
  }, {
    path: 'cloud', component: () => import('@/views/cloud/report'),
    name: 'cloud', meta: { title: '云仓报表', roles: [706] }
  }, {
    path: 'stock', component: () => import('@/views/stock/storage'),
    name: 'stock', meta: { title: '仓储库存', roles: [707] }
  }, {
    path: 'cloudStock', component: () => import('@/views/stock/cloud'),
    name: 'cloudStock', meta: { title: '云仓库存', roles: [708] }
  }]
}
