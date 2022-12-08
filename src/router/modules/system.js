import Layout from '@/layout'

const systemRouter = {
  path: '/system', component: Layout, redirect: '/system/index',
  name: 'system', meta: { title: '系统管理', roles: ['system'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/system/getInfo'),
      name: 'getInfo', meta: { title: '系统信息', roles: ['system'] }
    },
    {
      path: 'getDetail', component: () => import('@/views/system/getDetail'),
      name: 'getDetail', meta: { title: '系统详情', roles: ['system'] }
    }
  ]
}

export default systemRouter
