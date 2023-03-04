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
    path: 'report', component: () => import('@/views/purchase/report'),
    name: 'purchase_report', meta: { title: '采购总览', roles: [251] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/purchase'),
    name: 'purchase_purchase', meta: { title: '进货明细', roles: [252] }
  }, {
    path: 'return', component: () => import('@/views/purchase/return'),
    name: 'purchase_return', meta: { title: '退货明细', roles: [253] }
  }]
}
