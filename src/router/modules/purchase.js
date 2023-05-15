import Layout from '@/layout'

export default {
  path: '/purchase',
  component: Layout,
  name: 'purchase',
  meta: {
    title: '采购管理',
    roles: [250]
  },
  children: [{
    path: 'getList', component: () => import('@/views/purchase/getList'),
    name: 'purchase_getList', meta: { title: '采购明细', roles: [251] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/purchase'),
    name: 'purchase_purchase', meta: { title: '进货录入', roles: [252] }
  }, {
    path: 'return', component: () => import('@/views/purchase/return'),
    name: 'purchase_return', meta: { title: '退货录入', roles: [253] }
  }]
}
