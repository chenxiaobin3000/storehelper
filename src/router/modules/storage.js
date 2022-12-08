import Layout from '@/layout'

const storageRouter = {
  path: '/storage', component: Layout, redirect: '/storage/index',
  name: 'storage', meta: { title: '库存管理', roles: ['storage'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/storage/getInfo'),
      name: 'getInfo', meta: { title: '库存信息', roles: ['storage'] }
    },
    {
      path: 'getDetail', component: () => import('@/views/storage/getDetail'),
      name: 'getDetail', meta: { title: '库存详情', roles: ['storage'] }
    }
  ]
}

export default storageRouter
