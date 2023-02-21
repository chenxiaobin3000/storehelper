import Layout from '@/layout'

export default {
  path: '/loss',
  component: Layout,
  name: 'loss',
  meta: {
    title: '损耗管理',
    roles: [650]
  },
  children: [{
    path: 'report', component: () => import('@/views/loss/report'),
    name: 'report', meta: { title: '损耗总览', roles: [651] }
  }, {
    path: 'getList', component: () => import('@/views/loss/getList'),
    name: 'getList', meta: { title: '损耗明细', roles: [652] }
  }]
}
