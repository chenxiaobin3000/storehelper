import Layout from '@/layout'

const groupRouter = {
  path: '/group',
  component: Layout,
  redirect: '/group/index',
  name: 'group',
  meta: {
    title: '客户管理',
    roles: ['group']
  },
  children: [{
    path: 'index', component: () => import('@/views/group/index'),
    name: 'index', meta: { title: '客户列表', roles: ['group'] }
  }, {
    path: 'getInfo', component: () => import('@/views/group/getInfo'),
    name: 'getInfo', meta: { title: '客户信息', roles: ['group'] }
  }, {
    path: 'getDetail', component: () => import('@/views/group/getDetail'),
    name: 'getDetail', meta: { title: '客户详情', roles: ['group'] }
  }]
}

export default groupRouter
