import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  name: 'storage',
  meta: {
    title: '库存管理',
    roles: ['storage']
  },
  children: [{
    path: 'alarm', component: () => import('@/views/storage/alarm'),
    name: 'storage_alarm', meta: { title: '到期提醒', roles: ['storage'] }
  }, {
    path: 'report', component: () => import('@/views/storage/report'),
    name: 'storage_report', meta: { title: '库存总览', roles: ['storage'] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'storage_getList', meta: { title: '库存信息', roles: ['storage'] }
  }, {
    path: 'rawOrder', component: () => import('@/views/storage/rawOrder'),
    name: 'storage_rawOrder', meta: { title: '原料出入库', roles: ['storage'] }
  }, {
    path: 'productOrder', component: () => import('@/views/storage/productOrder'),
    name: 'storage_productOrder', meta: { title: '成品出入库', roles: ['storage'] }
  }, {
    path: 'batchList', component: () => import('@/views/storage/batchList'),
    name: 'storage_batchList', meta: { title: '批次信息', roles: ['storage'] }
  }, {
    path: 'address', component: () => import('@/views/storage/address'),
    name: 'storage_address', meta: { title: '仓库地址', roles: ['storage'] }
  }]
}

export default storageRouter
