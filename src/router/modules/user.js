import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理',
    roles: ['user']
  },
  children: [{
    path: 'getList', component: () => import('@/views/user/getList'),
    name: 'getList', meta: { title: '用户列表', roles: ['user'] }
  }, {
    path: 'getInfo', component: () => import('@/views/user/getInfo'),
    name: 'getInfo', meta: { title: '我的信息', roles: ['user'] }
  }, {
    path: 'resetPwd', component: () => import('@/views/user/resetPwd'),
    name: 'resetPwd', meta: { title: '重置密码', roles: ['user'] }
  }]
}

export default userRouter
