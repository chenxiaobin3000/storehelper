import Layout from '@/layout'

export default {
  path: '/supplier',
  component: Layout,
  name: 'supplier',
  hidden: true,
  meta: {
    title: '供应商管理',
    roles: [900]
  },
  children: [{
    path: 'getList', component: () => import('@/views/supplier/getList'),
    name: 'getList', meta: { title: '供应商列表', roles: [901] }
  }, {
    path: 'ledger', component: () => import('@/views/supplier/ledger'),
    name: 'ledger', meta: { title: '账款明细', roles: [902] }
  }]
}
