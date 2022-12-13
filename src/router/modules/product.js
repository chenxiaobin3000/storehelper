import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/index',
  name: 'product',
  meta: {
    title: '生产管理',
    roles: ['product']
  },
  children: [{
    path: 'index', component: () => import('@/views/product/index'),
    name: 'index', meta: { title: '生产总览', roles: ['product'] }
  }, {
    path: 'getInfo', component: () => import('@/views/product/getInfo'),
    name: 'getInfo', meta: { title: '生产信息', roles: ['product'] }
  }, {
    path: 'getDetail', component: () => import('@/views/product/getDetail'),
    name: 'getDetail', meta: { title: '生产详情', roles: ['product'] }
  }]
}

export default productRouter
