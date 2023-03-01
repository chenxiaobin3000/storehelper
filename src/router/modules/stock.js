import Layout from '@/layout'

export default {
  path: '/stock',
  component: Layout,
  name: 'stock',
  meta: {
    title: '库存管理',
    roles: [850]
  },
  children: [{
    path: 'storage', component: () => import('@/views/stock/storage'),
    name: 'storage', meta: { title: '库存总览', roles: [851] }
  }, {
    path: 'storageList', component: () => import('@/views/stock/storageList'),
    name: 'storageList', meta: { title: '库存明细', roles: [852] }
  }, {
    path: 'cloud', component: () => import('@/views/stock/cloud'),
    name: 'cloud', meta: { title: '云仓总览', roles: [853] }
  }, {
    path: 'cloudList', component: () => import('@/views/stock/cloudList'),
    name: 'cloudList', meta: { title: '云仓明细', roles: [854] }
  }, {
    path: 'storageAddress', component: () => import('@/views/stock/storageAddress'),
    name: 'storageAddress', meta: { title: '仓库地址', roles: [855] }
  }, {
    path: 'cloudAddress', component: () => import('@/views/stock/cloudAddress'),
    name: 'cloudAddress', meta: { title: '云仓地址', roles: [856] }
  }]
}
