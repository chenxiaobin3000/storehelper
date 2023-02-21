import Layout from '@/layout'

export const marketRouter = {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: [500]
  },
  children: [{
    path: 'report', component: () => import('@/views/market/report'),
    name: 'report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', component: () => import('@/views/market/getList'),
    name: 'getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'commodity', component: () => import('@/views/market/commodity'),
    name: 'commodity', meta: { title: '对接模板', roles: [503] }
  }, {
    path: 'input', component: () => import('@/views/market/input'),
    name: 'input', meta: { title: '价格录入', roles: [504] }
  }, {
    path: 'offline', hidden: true, component: () => import('@/views/market/offline'),
    name: 'offline', meta: { title: '线下客户', roles: [505] }
  }]
}
