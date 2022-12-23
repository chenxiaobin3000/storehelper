import Layout from '@/layout'

const financeRouter = {
  path: '/finance',
  component: Layout,
  name: 'finance',
  meta: {
    title: '财务管理',
    roles: ['finance']
  },
  children: [{
    path: 'report', component: () => import('@/views/finance/report'),
    name: 'finance_report', meta: { title: '财务总览', roles: ['finance'] }
  }, {
    path: 'getInfo', component: () => import('@/views/finance/getInfo'),
    name: 'finance_getInfo', meta: { title: '财务信息', roles: ['finance'] }
  }]
}

export default financeRouter
