import Layout from '@/layout'

const marketRouter = {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: ['market', 'my_market']
  },
  children: [{
    path: 'index', component: () => import('@/views/market/index'),
    name: 'index', meta: { title: '销售总览', roles: ['market'] }
  }, {
    path: 'pdd', component: () => import('@/views/market/pdd'),
    name: 'pdd', meta: { title: '拼多多', roles: ['my_market'] }
  }, {
    path: 'meituan', component: () => import('@/views/market/meituan'),
    name: 'meituan', meta: { title: '美团', roles: ['my_market'] }
  }, {
    path: 'kuailv', component: () => import('@/views/market/kuailv'),
    name: 'kuailv', meta: { title: '快驴', roles: ['my_market'] }
  }, {
    path: 'offline', component: () => import('@/views/market/offline'),
    name: 'offline', meta: { title: '线下客户', roles: ['market', 'my_market'] }
  }, {
    path: 'getInfo', component: () => import('@/views/market/getInfo'),
    name: 'getInfo', meta: { title: '前端价格', roles: ['market', 'my_market'] }
  }, {
    path: 'getDetail', component: () => import('@/views/market/getDetail'),
    name: 'getDetail', meta: { title: '调价预警', roles: ['market', 'my_market'] }
  }]
}

export default marketRouter
