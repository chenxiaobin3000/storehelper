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
    path: 'getUserList', component: () => import('@/views/user/getUserList'),
    name: 'user_getUserList', meta: { title: '用户列表', roles: [1002] }
  }, {
    path: 'getUserInfo', component: () => import('@/views/user/getUserInfo'),
    name: 'user_getUserInfo', meta: { title: '我的信息', roles: [1001] }
  }, {
    path: 'resetPwd', component: () => import('@/views/user/resetPwd'),
    name: 'user_resetPwd', meta: { title: '重置密码', roles: [1003] }
  }]
}

export default userRouter
