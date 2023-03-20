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
    path: 'agreement', component: () => import('@/views/cloud/agreement'),
    name: 'cloud_agreement', meta: { title: '履约入库', roles: [753] }
  }, {
    path: 'back', component: () => import('@/views/cloud/back'),
    name: 'cloud_back', meta: { title: '履约退货', roles: [756] }
  }, {
    path: 'purchase', component: () => import('@/views/cloud/purchase'),
    name: 'cloud_purchase', meta: { title: '采购入库', roles: [752] }
  }, {
    path: 'return', component: () => import('@/views/cloud/return'),
    name: 'cloud_return', meta: { title: '采购退货', roles: [755] }
  }, {
    path: 'loss', component: () => import('@/views/cloud/loss'),
    name: 'cloud_loss', meta: { title: '损耗明细', roles: [754] }
  }]
}
