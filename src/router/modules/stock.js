import Layout from '@/layout'

export default {
  path: '/stock',
  component: Layout,
  name: 'stock',
  meta: {
    title: '库存管理',
    roles: [850]
  },
  children: [{
    path: 'report', component: () => import('@/views/stock/report'),
    name: 'report', meta: { title: '库存总览', roles: [851] }
  }, {
    path: 'getList', component: () => import('@/views/stock/getList'),
    name: 'getList', meta: { title: '库存明细', roles: [852] }
  }]
}
