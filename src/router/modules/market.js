import Layout from '@/layout'

const marketRouter = {
  path: '/market', component: Layout, redirect: '/market/index',
  name: 'market', meta: { title: '销售管理', roles: ['market'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/market/getInfo'),
      name: 'getInfo', meta: { title: '销售信息', roles: ['market'] }
    },
    {
      path: 'getDetail', component: () => import('@/views/market/getDetail'),
      name: 'getDetail', meta: { title: '销售详情', roles: ['market'] }
    }
  ]
}

export default marketRouter
