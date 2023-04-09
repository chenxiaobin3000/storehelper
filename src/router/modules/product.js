import Layout from '@/layout'

export default {
  path: '/product',
  component: Layout,
  name: 'product',
  meta: {
    title: '生产管理',
    roles: [600]
  },
  children: [{
    path: 'report', component: () => import('@/views/product/report'),
    name: 'product_report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'collect', component: () => import('@/views/product/collect'),
    name: 'product_collect', meta: { title: '生产明细', roles: [602] }
  }, {
    path: 'apply', component: () => import('@/views/product/apply'),
    name: 'product_apply', meta: { title: '订单录入', roles: [603] }
  }]
}
