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
    name: 'report', meta: { title: '进货总览', roles: [801] }
  }, {
    path: 'purchase', component: () => import('@/views/storage/purchase'),
    name: 'purchase', meta: { title: '进货明细', roles: [802] }
  }, {
    path: 'return', component: () => import('@/views/storage/return'),
    name: 'return', meta: { title: '退货明细', roles: [803] }
  }, {
    path: 'address', component: () => import('@/views/storage/address'),
    name: 'address', meta: { title: '仓库地址', roles: [804] }
  }]
}
