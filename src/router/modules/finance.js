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
    name: 'finance_report', meta: { title: '财务总览', roles: [401] }
  }, {
    path: 'getList', component: () => import('@/views/finance/getList'),
    name: 'finance_getList', meta: { title: '汇总明细', roles: [402] }
  }, {
    path: 'detail', component: () => import('@/views/finance/detail'),
    name: 'finance_detail', meta: { title: '财务明细', roles: [403] }
  }, {
    path: 'label', component: () => import('@/views/finance/label'),
    name: 'finance_label', meta: { title: '类目管理', roles: [404] }
  }]
}
