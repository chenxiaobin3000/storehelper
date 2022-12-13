import Layout from '@/layout'

const financeRouter = {
  path: '/finance',
  component: Layout,
  redirect: '/finance/index',
  name: 'finance',
  meta: {
    title: '财务管理',
    roles: ['finance']
  },
  children: [{
    path: 'index', component: () => import('@/views/finance/index'),
    name: 'index', meta: { title: '财务总览', roles: ['finance'] }
  }, {
    path: 'getInfo', component: () => import('@/views/finance/getInfo'),
    name: 'getInfo', meta: { title: '财务信息', roles: ['finance'] }
  }, {
    path: 'getDetail', component: () => import('@/views/finance/getDetail'),
    name: 'getDetail', meta: { title: '财务详情', roles: ['finance'] }
  }]
}

export default financeRouter
