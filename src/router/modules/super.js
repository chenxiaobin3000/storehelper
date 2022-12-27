import Layout from '@/layout'

const userRouter = {
  path: '/super',
  component: Layout,
  name: 'super',
  meta: {
    title: '超级用户',
    roles: [8888]
  },
  children: [{
    path: 'changeGroup', component: () => import('@/views/super/changeGroup'),
    name: 'admin_changeGroup', meta: { title: '切换客户', roles: [88881] }
  }, {
    path: 'groupList', component: () => import('@/views/super/groupList'),
    name: 'admin_groupList', meta: { title: '客户列表', roles: [88882] }
  }, {
    path: 'userList', component: () => import('@/views/super/userList'),
    name: 'admin_userList', meta: { title: '用户列表', roles: [88883] }
  }]
}

export default userRouter
