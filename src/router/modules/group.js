import Layout from '@/layout'

const groupRouter = {
  path: '/group',
  component: Layout,
  name: 'group',
  meta: {
    title: '公司管理',
    roles: ['group', 'my_group']
  },
  children: [{
    path: 'getList', component: () => import('@/views/group/getList'),
    name: 'getList', meta: { title: '公司总览', roles: ['group'] }
  }, {
    path: 'getInfo', component: () => import('@/views/group/getInfo'),
    name: 'getInfo', meta: { title: '我的公司', roles: ['group', 'my_group'] }
  }, {
    path: 'getDetail', component: () => import('@/views/group/getDetail'),
    name: 'getDetail', meta: { title: '充值记录', roles: ['group', 'my_group'] }
  }]
}

export default groupRouter
