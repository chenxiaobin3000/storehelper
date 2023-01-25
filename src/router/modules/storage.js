import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  name: 'storage',
  meta: {
    title: '库存管理',
    roles: [800]
  },
  children: [{
    path: 'alarm', component: () => import('@/views/storage/alarm'),
    name: 'storage_alarm', meta: { title: '到期提醒', roles: [801] }
  }, {
    path: 'report', component: () => import('@/views/storage/report'),
    name: 'storage_report', meta: { title: '库存总览', roles: [802] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'storage_getList', meta: { title: '库存信息', roles: [803] }
  }, {
    path: 'purchase', component: () => import('@/views/storage/purchase'),
    name: 'storage_purchase', meta: { title: '进货记录', roles: [804] }
  }, {
    path: 'product', component: () => import('@/views/product/getList'),
    name: 'storage_product', meta: { title: '生产记录', roles: [805] }
  }, {
    path: 'agreement', component: () => import('@/views/agreement/getList'),
    name: 'storage_agreement', meta: { title: '履约记录', roles: [806] }
  }, {
    path: 'address', component: () => import('@/views/storage/address'),
    name: 'storage_address', meta: { title: '仓库地址', roles: [807] }
  }]
}

export default storageRouter
