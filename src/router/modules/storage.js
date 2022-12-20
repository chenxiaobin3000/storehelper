import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  name: 'storage',
  meta: {
    title: '库存管理',
    roles: ['storage', 'my_storage']
  },
  children: [{
    path: 'index', component: () => import('@/views/storage/index'),
    name: 'index', meta: { title: '库存总览', roles: ['storage', 'my_storage'] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'getList', meta: { title: '库存信息', roles: ['storage', 'my_storage'] }
  }, {
    path: 'getDetail', component: () => import('@/views/storage/getDetail'),
    name: 'getDetail', meta: { title: '库存详情', roles: ['storage', 'my_storage'] }
  }, {
    path: 'address', component: () => import('@/views/storage/address'),
    name: 'address', meta: { title: '仓库地址', roles: ['storage', 'my_storage'] }
  }]
}

export default storageRouter
