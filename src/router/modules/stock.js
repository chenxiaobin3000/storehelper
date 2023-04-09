import Layout from '@/layout'

export default {
  path: '/stock',
  component: Layout,
  name: 'stock',
  meta: {
    title: '库存管理',
    roles: [850]
  },
  children: [{
    path: 'storage', component: () => import('@/views/stock/storage'),
    name: 'stock_storage', meta: { title: '库存总览', roles: [851] }
  }, {
    path: 'storageList', component: () => import('@/views/stock/storageList'),
    name: 'stock_storageList', meta: { title: '库存明细', roles: [852] }
  }]
}
