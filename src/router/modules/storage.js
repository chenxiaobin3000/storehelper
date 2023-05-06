import Layout from '@/layout'

export default {
  path: '/storage',
  component: Layout,
  name: 'storage',
  meta: {
    title: '仓储管理',
    roles: [800]
  },
  children: [{
    path: 'stockReport', component: () => import('@/views/storage/stockReport'),
    name: 'storage_stockReport', meta: { title: '库存总览', roles: [801] }
  }, {
    path: 'stock', component: () => import('@/views/storage/stock'),
    name: 'storage_stock', meta: { title: '库存明细', roles: [802] }
  }, {
    path: 'report', component: () => import('@/views/storage/report'),
    name: 'storage_report', meta: { title: '订单总览', roles: [803] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'storage_getList', meta: { title: '订单明细', roles: [804] }
  }, {
    path: 'purchase', component: () => import('@/views/storage/purchase'),
    name: 'storage_purchase', meta: { title: '入库录入', roles: [805] }
  }, {
    path: 'dispatch', component: () => import('@/views/storage/dispatch'),
    name: 'storage_dispatch', meta: { title: '出库录入', roles: [806] }
  }, {
    path: 'loss', component: () => import('@/views/storage/loss'),
    name: 'storage_loss', meta: { title: '损耗录入', roles: [807] }
  }]
}
