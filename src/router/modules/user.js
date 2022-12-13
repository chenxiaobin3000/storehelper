import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: '用户管理',
    roles: ['user']
  },
  children: [{
    path: 'index', component: () => import('@/views/user/index'),
    name: 'index', meta: { title: '用户总览', roles: ['user'] }
  }, {
    path: 'getInfo', component: () => import('@/views/user/getInfo'),
    name: 'getInfo', meta: { title: '用户信息', roles: ['user'] }
  }, {
    path: 'getDetail', component: () => import('@/views/user/getDetail'),
    name: 'getDetail', meta: { title: '用户详情', roles: ['user'] }
  }]
}

export default userRouter
