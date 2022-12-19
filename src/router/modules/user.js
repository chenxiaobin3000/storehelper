import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理',
    roles: ['user', 'my_user']
  },
  children: [{
    path: 'index', component: () => import('@/views/user/index'),
    name: 'index', meta: { title: '用户总览', roles: ['user'] }
  }, {
    path: 'getList', component: () => import('@/views/user/getList'),
    name: 'getList', meta: { title: '用户总览', roles: ['my_user'] }
  }, {
    path: 'getInfo', component: () => import('@/views/user/getInfo'),
    name: 'getInfo', meta: { title: '我的信息', roles: ['user', 'my_user'] }
  }, {
    path: 'resetPwd', component: () => import('@/views/user/resetPwd'),
    name: 'resetPwd', meta: { title: '重置密码', roles: ['user', 'my_user'] }
  }]
}

export default userRouter
