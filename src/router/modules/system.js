import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'system',
  meta: {
    title: '系统管理',
    roles: [1100]
  },
  children: [{
    path: 'notify', component: () => import('@/views/system/notify'),
    name: 'system_notify', meta: { title: '系统通知', roles: [1104] }
  }, {
    path: 'groupInfo', component: () => import('@/views/system/groupInfo'),
    name: 'system_groupInfo', meta: { title: '公司信息', roles: [1103] }
  }, {
    path: 'getRoleList', component: () => import('@/views/system/getRoleList'),
    name: 'system_getRole', meta: { title: '角色管理', roles: [1102] }
  }, {
    path: 'setting', component: () => import('@/views/system/setting'),
    name: 'system_setting', meta: { title: '系统设置', roles: [1105] }
  }, {
    path: 'charge', component: () => import('@/views/system/charge'),
    name: 'system_charge', meta: { title: '充值记录', roles: [1101] }
  }]
}

export default systemRouter
