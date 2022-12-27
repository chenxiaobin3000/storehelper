import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  name: 'report',
  meta: {
    title: '报表管理',
    roles: [700]
  },
  children: [{
    path: 'day', component: () => import('@/views/report/day'),
    name: 'report_day', meta: { title: '日报表', roles: [701] }
  }, {
    path: 'week', component: () => import('@/views/report/week'),
    name: 'report_week', meta: { title: '周报表', roles: [703] }
  }, {
    path: 'month', component: () => import('@/views/report/month'),
    name: 'report_month', meta: { title: '月度报表', roles: [702] }
  }, {
    path: 'year', component: () => import('@/views/report/year'),
    name: 'report_year', meta: { title: '年度报表', roles: [704] }
  }]
}

export default reportRouter
