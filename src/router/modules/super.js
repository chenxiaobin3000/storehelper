import Layout from '@/layout'

export default {
  path: '/super',
  component: Layout,
  name: 'super',
  meta: {
    title: '超级用户',
    roles: [8888]
  },
  children: [{
    path: 'changeGroup', component: () => import('@/views/super/changeGroup'),
    name: 'super_changeGroup', meta: { title: '切换客户', roles: [8889] }
  }, {
    path: 'groupList', component: () => import('@/views/super/groupList'),
    name: 'super_groupList', meta: { title: '客户列表', roles: [8890] }
  }]
}
