import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  name: 'product',
  meta: {
    title: '生产管理',
    roles: [600]
  },
  children: [{
    path: 'report', component: () => import('@/views/report/product'),
    name: 'product_report', meta: { title: '生产总览', roles: [601] }
  }, {
    path: 'getList', component: () => import('@/views/product/getList'),
    name: 'product_getList', meta: { title: '生产记录', roles: [602] }
  }, {
    path: 'alarm', component: () => import('@/views/product/alarm'),
    name: 'product_alarm', meta: { title: '损耗预警', roles: [603] }
  }]
}

export default productRouter
