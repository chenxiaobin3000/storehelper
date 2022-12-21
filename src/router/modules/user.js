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
    name: 'user_getList', meta: { title: '用户列表', roles: ['user'] }
  }, {
    path: 'getInfo', component: () => import('@/views/user/getInfo'),
    name: 'user_getInfo', meta: { title: '我的信息', roles: ['user'] }
  }, {
    path: 'resetPwd', component: () => import('@/views/user/resetPwd'),
    name: 'user_resetPwd', meta: { title: '重置密码', roles: ['user'] }
  }]
}

export default userRouter
