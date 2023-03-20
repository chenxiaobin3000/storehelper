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
    path: 'alarm', component: () => import('@/views/system/alarm'),
    name: 'system_alarm', meta: { title: '预警信息', roles: [1101] }
  }, {
    path: 'groupInfo', component: () => import('@/views/system/groupInfo'),
    name: 'system_groupInfo', meta: { title: '公司信息', roles: [1102] }
  }, {
    path: 'department', component: () => import('@/views/system/department'),
    name: 'system_department', meta: { title: '部门信息', roles: [1107] }
  }, {
    path: 'storageAddress', component: () => import('@/views/system/storageAddress'),
    name: 'system_storageAddress', meta: { title: '仓库地址', roles: [1103] }
  }, {
    path: 'cloudAddress', component: () => import('@/views/system/cloudAddress'),
    name: 'system_cloudAddress', meta: { title: '云仓地址', roles: [1104] }
  }, {
    path: 'roleList', component: () => import('@/views/system/roleList'),
    name: 'system_roleList', meta: { title: '角色管理', roles: [1105] }
  }, {
    path: 'mpRoleList', component: () => import('@/views/system/mpRoleList'),
    name: 'system_mpRoleList', meta: { title: '微信管理', roles: [1106] }
  }]
}
