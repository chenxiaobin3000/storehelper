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
    name: 'cloud_report', meta: { title: '云仓总览', roles: [751] }
  }, {
    path: 'purchase', component: () => import('@/views/cloud/purchase'),
    name: 'cloud_purchase', meta: { title: '入库明细', roles: [752] }
  }, {
    path: 'sale', component: () => import('@/views/cloud/sale'),
    name: 'cloud_sale', meta: { title: '销售明细', roles: [753] }
  }, {
    path: 'loss', component: () => import('@/views/storage/loss'),
    name: 'cloud_loss', meta: { title: '损耗明细', roles: [754] }
  }, {
    path: 'return', component: () => import('@/views/storage/return'),
    name: 'cloud_return', meta: { title: '退货明细', roles: [754] }
  }]
}
