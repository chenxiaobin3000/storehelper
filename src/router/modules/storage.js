import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  name: 'storage',
  meta: {
    title: '仓储管理',
    roles: [800]
  },
  children: [{
    path: 'reportStock', component: () => import('@/views/report/stock'),
    name: 'storage_reportStock', meta: { title: '库存总览', roles: [801] }
  }, {
    path: 'stock', component: () => import('@/views/storage/stock'),
    name: 'storage_stock', meta: { title: '库存明细', roles: [802] }
  }, {
    path: 'reportStorage', component: () => import('@/views/report/storage'),
    name: 'storage_reportStorage', meta: { title: '进货总览', roles: [803] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'storage_getList', meta: { title: '进货明细', roles: [804] }
  }, {
    path: 'alarm', component: () => import('@/views/storage/alarm'),
    name: 'storage_alarm', meta: { title: '到期提醒', roles: [805] }
  }]
}

export default storageRouter
