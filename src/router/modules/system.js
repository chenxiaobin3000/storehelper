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
    name: 'system_notify', meta: { title: '系统通知', roles: ['system'] }
  }, {
    path: 'groupInfo', component: () => import('@/views/system/groupInfo'),
    name: 'system_groupInfo', meta: { title: '公司信息', roles: ['system'] }
  }, {
    path: 'getRole', component: () => import('@/views/system/getRole'),
    name: 'system_getRole', meta: { title: '角色管理', roles: ['system'] }
  }, {
    path: 'setting', component: () => import('@/views/system/setting'),
    name: 'system_setting', meta: { title: '系统设置', roles: ['system'] }
  }, {
    path: 'charge', component: () => import('@/views/system/charge'),
    name: 'system_charge', meta: { title: '充值记录', roles: ['system'] }
  }]
}

export default systemRouter
