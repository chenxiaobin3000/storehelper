import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理',
    roles: [1000]
  },
  children: [{
    path: 'userList', component: () => import('@/views/user/userList'),
    name: 'user_userList', meta: { title: '用户列表', roles: [1002] }
  }, {
    path: 'resetPwd', component: () => import('@/views/user/resetPwd'),
    name: 'user_resetPwd', meta: { title: '重置密码', roles: [1003] }
  }]
}

export default userRouter
