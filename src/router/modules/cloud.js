import Layout from '@/layout'

export default {
  path: '/cloud',
  component: Layout,
  name: 'cloud',
  meta: {
    title: '云仓管理',
    roles: [750]
  },
  children: [{
    path: 'report', component: () => import('@/views/cloud/report'),
    name: 'report', meta: { title: '云仓总览', roles: [751] }
  }, {
    path: 'getList', component: () => import('@/views/cloud/getList'),
    name: 'getList', meta: { title: '云仓明细', roles: [752] }
  }, {
    path: 'input', component: () => import('@/views/cloud/input'),
    name: 'input', meta: { title: '云仓录入', roles: [753] }
  }, {
    path: 'address', component: () => import('@/views/storage/address'),
    name: 'address', meta: { title: '云仓地址', roles: [754] }
  }]
}
