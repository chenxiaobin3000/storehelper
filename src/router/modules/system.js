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
    name: 'alarm', meta: { title: '预警信息', roles: [1101] }
  }, {
    path: 'groupInfo', component: () => import('@/views/system/groupInfo'),
    name: 'groupInfo', meta: { title: '公司信息', roles: [1102] }
  }, {
    path: 'roleList', component: () => import('@/views/system/roleList'),
    name: 'roleList', meta: { title: '角色管理', roles: [1103] }
  }, {
    path: 'mpRoleList', component: () => import('@/views/system/mpRoleList'),
    name: 'mpRoleList', meta: { title: '微信管理', roles: [1104] }
  }]
}
