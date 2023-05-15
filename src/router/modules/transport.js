import Layout from '@/layout'

export default {
  path: '/transport',
  component: Layout,
  name: 'transport',
  meta: {
    title: '物流管理',
    roles: [350]
  },
  children: [{
    path: 'purchase', component: () => import('@/views/transport/purchase'),
    name: 'transport_purchase', meta: { title: '采购物流', roles: [351] }
  }, {
    path: 'storage', component: () => import('@/views/transport/storage'),
    name: 'transport_storage', meta: { title: '仓储物流', roles: [352] }
  }, {
    path: 'agreement', component: () => import('@/views/transport/agreement'),
    name: 'transport_agreement', meta: { title: '履约物流', roles: [353] }
  }, {
    path: 'product', component: () => import('@/views/transport/product'),
    name: 'transport_product', meta: { title: '生产物流', roles: [354] }
  }, {
    path: 'offline', component: () => import('@/views/transport/offline'),
    name: 'transport_offline', meta: { title: '销售物流', roles: [355] }
  }]
}
