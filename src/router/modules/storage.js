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
    path: 'report', component: () => import('@/views/storage/report'),
    name: 'storage_report', meta: { title: '库存总览', roles: [801] }
  }, {
    path: 'stock', component: () => import('@/views/storage/stock'),
    name: 'storage_stock', meta: { title: '库存信息', roles: [802] }
  }, {
    path: 'getList', component: () => import('@/views/storage/getList'),
    name: 'storage_getList', meta: { title: '进货记录', roles: [803] }
  }, {
    path: 'alarm', component: () => import('@/views/storage/alarm'),
    name: 'storage_alarm', meta: { title: '到期提醒', roles: [804] }
  }]
}

export default storageRouter
