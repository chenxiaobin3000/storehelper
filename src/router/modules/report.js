import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: '/report/index',
  name: 'report',
  meta: {
    title: '报表管理',
    roles: ['report']
  },
  children: [{
    path: 'index', component: () => import('@/views/report/index'),
    name: 'index', meta: { title: '报表总览', roles: ['report'] }
  }, {
    path: 'getInfo', component: () => import('@/views/report/getInfo'),
    name: 'getInfo', meta: { title: '报表信息', roles: ['report'] }
  }, {
    path: 'getDetail', component: () => import('@/views/report/getDetail'),
    name: 'getDetail', meta: { title: '报表详情', roles: ['report'] }
  }]
}

export default reportRouter
