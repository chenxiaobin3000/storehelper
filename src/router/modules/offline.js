import Layout from '@/layout'

export default {
  path: '/offline',
  component: Layout,
  name: 'offline',
  meta: {
    title: '线下销售',
    roles: [550]
  },
  children: [{
    path: 'getList', component: () => import('@/views/offline/getList'),
    name: 'offline_getList', meta: { title: '销售明细', roles: [551] }
  }, {
    path: 'offline', component: () => import('@/views/offline/offline'),
    name: 'offline_offline', meta: { title: '销售录入', roles: [552] }
  }, {
    path: 'return', component: () => import('@/views/offline/return'),
    name: 'offline_return', meta: { title: '退货录入', roles: [553] }
  }]
}
