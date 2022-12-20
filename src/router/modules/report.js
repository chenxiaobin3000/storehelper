import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  name: 'report',
  meta: {
    title: '报表管理',
    roles: ['report']
  },
  children: [{
    path: 'day', component: () => import('@/views/report/day'),
    name: 'day', meta: { title: '日报表', roles: ['report'] }
  }, {
    path: 'week', component: () => import('@/views/report/week'),
    name: 'week', meta: { title: '周报表', roles: ['report'] }
  }, {
    path: 'month', component: () => import('@/views/report/month'),
    name: 'month', meta: { title: '月度报表', roles: ['report'] }
  }, {
    path: 'year', component: () => import('@/views/report/year'),
    name: 'year', meta: { title: '年度报表', roles: ['report'] }
  }]
}

export default reportRouter
