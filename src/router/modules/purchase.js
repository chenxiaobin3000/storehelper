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
    name: 'purchase_purchase', meta: { title: '仓储进货', roles: [252] }
  }, {
    path: 'return', component: () => import('@/views/purchase/return'),
    name: 'purchase_return', meta: { title: '仓储退货', roles: [253] }
  }, {
    path: 'purchase2', component: () => import('@/views/purchase/purchase2'),
    name: 'purchase_purchase2', meta: { title: '云仓进货', roles: [254] }
  }, {
    path: 'return2', component: () => import('@/views/purchase/return2'),
    name: 'purchase_return2', meta: { title: '云仓退货', roles: [255] }
  }]
}
