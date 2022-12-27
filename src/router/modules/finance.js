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
    name: 'finance_report', meta: { title: '财务总览', roles: [402] }
  }, {
    path: 'getInfo', component: () => import('@/views/finance/getInfo'),
    name: 'finance_getInfo', meta: { title: '财务信息', roles: [401] }
  }]
}

export default financeRouter
