import Layout from '@/layout'

const userRouter = {
  path: '/user', component: Layout, redirect: '/user/index',
  name: 'user', meta: { title: '用户管理', roles: ['user'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/user/getInfo'),
      name: 'getInfo', meta: { title: '用户信息', roles: ['user'] }
    },
  ]
}

export default userRouter
