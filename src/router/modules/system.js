import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'system',
  meta: {
    title: '系统管理',
    roles: ['system']
  },
  children: [{
    path: 'notify', component: () => import('@/views/system/notify'),
    name: 'notify', meta: { title: '系统通知', roles: ['system'] }
  }, {
    path: 'setting', component: () => import('@/views/system/setting'),
    name: 'setting', meta: { title: '系统设置', roles: ['system'] }
  }, {
    path: 'getRole', component: () => import('@/views/system/getRole'),
    name: 'getRole', meta: { title: '角色管理', roles: ['system'] }
  }]
}

export default systemRouter
