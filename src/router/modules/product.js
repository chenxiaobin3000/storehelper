import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  name: 'product',
  meta: {
    title: '生产管理',
    roles: ['product']
  },
  children: [{
    path: 'alarm', component: () => import('@/views/product/alarm'),
    name: 'alarm', meta: { title: '损耗预警', roles: ['product'] }
  }, {
    path: 'index', component: () => import('@/views/product/index'),
    name: 'index', meta: { title: '生产总览', roles: ['product'] }
  }, {
    path: 'getList', component: () => import('@/views/product/getList'),
    name: 'getList', meta: { title: '生产记录', roles: ['product'] }
  }, {
    path: 'rawOrder', component: () => import('@/views/product/rawOrder'),
    name: 'rawOrder', meta: { title: '原料出入库', roles: ['product'] }
  }, {
    path: 'productOrder', component: () => import('@/views/product/productOrder'),
    name: 'productOrder', meta: { title: '成品出入库', roles: ['product'] }
  }]
}

export default productRouter
