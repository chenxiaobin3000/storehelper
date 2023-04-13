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
    path: 'getList', component: () => import('@/views/product/getList'),
    name: 'product_getList', meta: { title: '生产明细', roles: [602] }
  }, {
    path: 'collect', component: () => import('@/views/product/collect'),
    name: 'product_collect', meta: { title: '生产录入', roles: [603] }
  }]
}
