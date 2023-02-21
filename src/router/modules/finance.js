import Layout from '@/layout'

export default {
  path: '/finance',
  component: Layout,
  name: 'finance',
  meta: {
    title: '财务管理',
    roles: [400]
  },
  children: [{
    path: 'report', component: () => import('@/views/finance/report'),
    name: 'report', meta: { title: '财务总览', roles: [401] }
  }, {
    path: 'getList', component: () => import('@/views/finance/getList'),
    name: 'getList', meta: { title: '财务明细', roles: [402] }
  }]
}
