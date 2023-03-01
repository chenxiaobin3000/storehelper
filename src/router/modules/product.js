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
    name: 'report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'process', component: () => import('@/views/product/process'),
    name: 'process', meta: { title: '生产明细', roles: [602] }
  }, {
    path: 'complete', component: () => import('@/views/product/complete'),
    name: 'complete', meta: { title: '完成明细', roles: [603] }
  }, {
    path: 'loss', component: () => import('@/views/product/loss'),
    name: 'loss', meta: { title: '损耗明细', roles: [604] }
  }]
}
