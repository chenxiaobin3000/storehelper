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
    path: 'storageToday', component: () => import('@/views/stock/storageToday'),
    name: 'stock_storageToday', meta: { title: '今日库存', roles: [852] }
  }, {
    path: 'storageList', component: () => import('@/views/stock/storageList'),
    name: 'stock_storageList', meta: { title: '库存明细', roles: [853] }
  }, {
    path: 'cloud', component: () => import('@/views/stock/cloud'),
    name: 'stock_cloud', meta: { title: '云仓总览', roles: [854] }
  }, {
    path: 'cloudToday', component: () => import('@/views/stock/cloudToday'),
    name: 'stock_cloudToday', meta: { title: '今日云仓', roles: [855] }
  }, {
    path: 'cloudList', component: () => import('@/views/stock/cloudList'),
    name: 'stock_cloudList', meta: { title: '云仓明细', roles: [856] }
  }]
}
