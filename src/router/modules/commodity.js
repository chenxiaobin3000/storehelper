import Layout from '@/layout'

const commodityRouter = {
  path: '/commodity', component: Layout, redirect: '/commodity/index',
  name: 'commodity', meta: { title: '商品管理', roles: ['commodity'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/commodity/getInfo'),
      name: 'getInfo', meta: { title: '商品信息', roles: ['commodity'] }
    },
    {
      path: 'getDetail', component: () => import('@/views/commodity/getDetail'),
      name: 'getDetail', meta: { title: '商品详情', roles: ['commodity'] }
    }
  ]
}

export default commodityRouter
