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
    path: 'getList', component: () => import('@/views/purchase/getList'),
    name: 'purchase_getList', meta: { title: '采购明细', roles: [252] }
  }, {
    path: 'purchase', component: () => import('@/views/purchase/purchase'),
    name: 'purchase_purchase', meta: { title: '进货录入', roles: [253] }
  }, {
    path: 'return', component: () => import('@/views/purchase/return'),
    name: 'purchase_return', meta: { title: '退货录入', roles: [254] }
  }]
}
