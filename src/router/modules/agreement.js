import Layout from '@/layout'

export default {
  path: '/agreement',
  component: Layout,
  name: 'agreement',
  meta: { title: '履约管理', roles: [200] },
  children: [{
    path: 'report', component: () => import('@/views/agreement/report'),
    name: 'agreement_report', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'getList', component: () => import('@/views/agreement/getList'),
    name: 'agreement_getList', meta: { title: '履约明细', roles: [202] }
  }, {
    path: 'shipped', component: () => import('@/views/agreement/shipped'),
    name: 'agreement_shipped', meta: { title: '发货录入', roles: [203] }
  }, {
    path: 'return', component: () => import('@/views/agreement/return'),
    name: 'agreement_return', meta: { title: '退货录入', roles: [204] }
  }, {
    path: 'again', component: () => import('@/views/agreement/again'),
    name: 'agreement_again', meta: { title: '退转入录入', roles: [205] }
  }]
}
