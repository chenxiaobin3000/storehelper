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
    path: 'report', component: () => import('@/views/storage/report'),
    name: 'storage_report', meta: { title: '仓储总览', roles: [801] }
  }, {
    path: 'purchase', component: () => import('@/views/storage/purchase'),
    name: 'storage_purchase', meta: { title: '进货明细', roles: [802] }
  }, {
    path: 'dispatch', component: () => import('@/views/storage/dispatch'),
    name: 'storage_dispatch', meta: { title: '调度明细', roles: [803] }
  }, {
    path: 'purchase2', component: () => import('@/views/storage/purchase2'),
    name: 'storage_purchase2', meta: { title: '入库明细', roles: [804] }
  }, {
    path: 'loss', component: () => import('@/views/storage/loss'),
    name: 'storage_loss', meta: { title: '损耗明细', roles: [805] }
  }, {
    path: 'return', component: () => import('@/views/storage/return'),
    name: 'storage_return', meta: { title: '退货明细', roles: [806] }
  }]
}
