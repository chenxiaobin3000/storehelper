import Layout from '@/layout'

export default {
  path: '/system',
  component: Layout,
  name: 'system',
  meta: {
    title: '系统管理',
    roles: [1100]
  },
  children: [{
    path: 'groupInfo', component: () => import('@/views/system/groupInfo'),
    name: 'system_groupInfo', meta: { title: '公司信息', roles: [1101] }
  }, {
    path: 'storageList', component: () => import('@/views/system/storageList'),
    name: 'system_storageList', meta: { title: '仓库管理', roles: [1102] }
  }, {
    path: 'roleList', component: () => import('@/views/system/roleList'),
    name: 'system_roleList', meta: { title: '角色管理', roles: [1103] }
  }, {
    path: 'mpRoleList', component: () => import('@/views/system/mpRoleList'),
    name: 'system_mpRoleList', meta: { title: '微信管理', roles: [1104] }
  }, {
    path: 'charge', component: () => import('@/views/system/charge'),
    name: 'system_charge', meta: { title: '充值管理', roles: [1105] }
  }]
}
