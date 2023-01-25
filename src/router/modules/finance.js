import Layout from '@/layout'

const financeRouter = {
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
    name: 'finance_getList', meta: { title: '财务信息', roles: [402] }
  }]
}

export default financeRouter
