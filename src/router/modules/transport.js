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
    path: 'report', component: () => import('@/views/transport/report'),
    name: 'transport_report', meta: { title: '物流总览', roles: [351] }
  }, {
    path: 'getList', component: () => import('@/views/transport/getList'),
    name: 'transport_getList', meta: { title: '物流明细', roles: [352] }
  }, {
    path: 'purchase', component: () => import('@/views/transport/purchase'),
    name: 'transport_purchase', meta: { title: '采购物流', roles: [353] }
  }, {
    path: 'storage', component: () => import('@/views/transport/storage'),
    name: 'transport_storage', meta: { title: '仓储物流', roles: [354] }
  }, {
    path: 'agreement', component: () => import('@/views/transport/agreement'),
    name: 'transport_agreement', meta: { title: '履约物流', roles: [355] }
  }]
}
