import Layout from '@/layout'

const userRouter = {
  path: '/super',
  component: Layout,
  name: 'super',
  meta: {
    title: '超级用户',
    roles: ['admin']
  },
  children: [{
    path: 'changeGroup', component: () => import('@/views/super/changeGroup'),
    name: 'changeGroup', meta: { title: '切换客户', roles: ['admin'] }
  }, {
    path: 'groupList', component: () => import('@/views/super/groupList'),
    name: 'groupList', meta: { title: '客户列表', roles: ['admin'] }
  }, {
    path: 'userList', component: () => import('@/views/super/userList'),
    name: 'userList', meta: { title: '用户列表', roles: ['admin'] }
  }]
}

export default userRouter
